import type { DevCardData } from "@/types/github";

export const DEMO_CARD_DATA: DevCardData = {
  user: {
    avatar_url: "https://avatars.githubusercontent.com/u/9919?v=4",
    name: "The Octocat",
    login: "octocat",
    bio: "GitHub's mascot and demo profile for DevCard Generator.",
    location: "San Francisco",
    blog: "https://github.com",
    company: "@github",
    twitter_username: "github",
    followers: 9000,
    following: 9,
    public_repos: 8,
    html_url: "https://github.com/octocat",
    created_at: "2011-01-25T18:44:36Z",
  },
  stats: {
    totalStars: 12400,
    topLanguages: ["TypeScript", "JavaScript", "Go", "Python"],
    topRepos: [
      {
        name: "Hello-World",
        description: "My first repository on GitHub!",
        html_url: "https://github.com/octocat/Hello-World",
        stargazers_count: 2400,
        language: "TypeScript",
      },
      {
        name: "Spoon-Knife",
        description: "This repo is for demonstration purposes only.",
        html_url: "https://github.com/octocat/Spoon-Knife",
        stargazers_count: 1800,
        language: "JavaScript",
      },
      {
        name: "octocat.github.io",
        description: "My portfolio and developer profile site.",
        html_url: "https://github.com/octocat/octocat.github.io",
        stargazers_count: 920,
        language: "HTML",
      },
    ],
  },
};
