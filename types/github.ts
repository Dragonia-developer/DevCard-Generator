export interface GitHubUser {
  avatar_url: string;
  name: string | null;
  login: string;
  bio: string | null;
  location: string | null;
  blog: string | null;
  company: string | null;
  twitter_username: string | null;
  followers: number;
  following: number;
  public_repos: number;
  html_url: string;
  created_at: string;
}

export interface GitHubRepo {
  name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  language: string | null;
}

export interface DevCardStats {
  totalStars: number;
  topLanguages: string[];
  topRepos: GitHubRepo[];
}

export interface DevCardData {
  user: GitHubUser;
  stats: DevCardStats;
  allRepos?: GitHubRepo[];
  reposError?: string;
}

export type GitHubFetchErrorCode =
  | "empty"
  | "not_found"
  | "rate_limit"
  | "network"
  | "unknown";

export class GitHubFetchError extends Error {
  code: GitHubFetchErrorCode;

  constructor(code: GitHubFetchErrorCode, message: string) {
    super(message);
    this.code = code;
    this.name = "GitHubFetchError";
  }
}
