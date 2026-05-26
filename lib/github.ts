import type { DevCardData, DevCardStats, GitHubRepo, GitHubUser } from "@/types/github";
import { GitHubFetchError } from "@/types/github";

const GITHUB_API = "https://api.github.com";

export function getTopLanguages(
  repos: GitHubRepo[],
  limit = 4
): string[] {
  const counts = new Map<string, number>();

  for (const repo of repos) {
    if (!repo.language) continue;
    counts.set(repo.language, (counts.get(repo.language) ?? 0) + 1);
  }

  return [...counts.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([lang]) => lang);
}

export function getTotalStars(repos: GitHubRepo[]): number {
  return repos.reduce((sum, repo) => sum + repo.stargazers_count, 0);
}

export function getTopRepos(repos: GitHubRepo[], limit = 3): GitHubRepo[] {
  return [...repos]
    .sort((a, b) => b.stargazers_count - a.stargazers_count)
    .slice(0, limit);
}

function buildStats(
  repos: GitHubRepo[],
  languageCount = 4,
  topRepoCount = 3
): DevCardStats {
  return {
    totalStars: getTotalStars(repos),
    topLanguages: getTopLanguages(repos, languageCount),
    topRepos: getTopRepos(repos, topRepoCount),
  };
}

async function githubFetch<T>(url: string): Promise<T> {
  let response: Response;

  try {
    response = await fetch(url, {
      headers: {
        Accept: "application/vnd.github+json",
      },
    });
  } catch {
    throw new GitHubFetchError(
      "network",
      "Network error. Please check your connection and try again."
    );
  }

  if (response.status === 404) {
    throw new GitHubFetchError(
      "not_found",
      "GitHub user not found. Please check the username and try again."
    );
  }

  if (response.status === 403) {
    throw new GitHubFetchError(
      "rate_limit",
      "GitHub API rate limit reached. Please wait a few minutes and try again."
    );
  }

  if (!response.ok) {
    throw new GitHubFetchError(
      "unknown",
      `Something went wrong while fetching data (status ${response.status}).`
    );
  }

  return response.json() as Promise<T>;
}

export async function fetchGitHubProfile(username: string): Promise<GitHubUser> {
  const trimmed = username.trim();
  if (!trimmed) {
    throw new GitHubFetchError("empty", "Please enter a GitHub username.");
  }

  return githubFetch<GitHubUser>(`${GITHUB_API}/users/${encodeURIComponent(trimmed)}`);
}

export async function fetchGitHubRepos(username: string): Promise<GitHubRepo[]> {
  const trimmed = username.trim();
  const repos = await githubFetch<GitHubRepo[]>(
    `${GITHUB_API}/users/${encodeURIComponent(trimmed)}/repos?sort=updated&per_page=100`
  );
  return repos;
}

export interface FetchDevCardOptions {
  languageCount?: number;
  topRepoCount?: number;
}

export async function fetchDevCardData(
  username: string,
  options: FetchDevCardOptions = {}
): Promise<DevCardData> {
  const { languageCount = 4, topRepoCount = 3 } = options;
  const user = await fetchGitHubProfile(username);

  try {
    const repos = await fetchGitHubRepos(user.login);
    return {
      user,
      stats: buildStats(repos, languageCount, topRepoCount),
      allRepos: repos,
    };
  } catch (error) {
    const message =
      error instanceof GitHubFetchError
        ? error.message
        : "Could not load repository data. Showing profile only.";

    return {
      user,
      stats: {
        totalStars: 0,
        topLanguages: [],
        topRepos: [],
      },
      allRepos: [],
      reposError: message,
    };
  }
}

export function rebuildStats(
  repos: GitHubRepo[],
  languageCount: number,
  topRepoCount: number
): DevCardStats {
  return buildStats(repos, languageCount, topRepoCount);
}
