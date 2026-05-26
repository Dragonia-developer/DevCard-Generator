"use client";

import { Loader2, Search } from "lucide-react";
import { RecentSearches } from "@/components/RecentSearches";
const EXAMPLE_USERNAMES = ["torvalds", "gaearon", "sindresorhus", "vercel"];

interface UsernameFormProps {
  username: string;
  onUsernameChange: (value: string) => void;
  onSubmit: () => void;
  isLoading: boolean;
  recentSearches: string[];
  onRecentSelect: (username: string) => void;
}

export function UsernameForm({
  username,
  onUsernameChange,
  onSubmit,
  isLoading,
  recentSearches,
  onRecentSelect,
}: UsernameFormProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-xl space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="flex-1">
          <label htmlFor="github-username" className="sr-only">
            GitHub username
          </label>
          <div className="relative">
            <Search
              className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400"
              aria-hidden="true"
            />
            <input
              id="github-username"
              type="text"
              value={username}
              onChange={(e) => onUsernameChange(e.target.value)}
              placeholder="Enter GitHub username"
              autoComplete="off"
              spellCheck={false}
              disabled={isLoading}
              className="w-full rounded-2xl border border-zinc-200/80 bg-white/80 py-3.5 pl-11 pr-4 text-sm text-zinc-900 shadow-sm outline-none transition placeholder:text-zinc-400 focus:border-violet-400 focus:ring-2 focus:ring-violet-500/20 disabled:opacity-60 dark:border-zinc-700 dark:bg-zinc-900/80 dark:text-zinc-100 dark:placeholder:text-zinc-500 dark:focus:border-violet-500"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-violet-600 to-fuchsia-600 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-violet-500/25 transition hover:from-violet-500 hover:to-fuchsia-500 disabled:cursor-not-allowed disabled:opacity-60"
          aria-label="Generate developer card"
        >
          {isLoading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
              Generating…
            </>
          ) : (
            "Generate Card"
          )}
        </button>
      </div>

      <div className="space-y-2">
        <p className="text-xs text-zinc-500 dark:text-zinc-400">Try an example:</p>
        <div className="flex flex-wrap gap-2">
          {EXAMPLE_USERNAMES.map((name) => (
            <button
              key={name}
              type="button"
              disabled={isLoading}
              onClick={() => onRecentSelect(name)}
              className="rounded-full border border-zinc-200/80 bg-white/50 px-3 py-1 text-xs font-medium text-zinc-600 transition hover:border-violet-300 hover:text-violet-600 disabled:opacity-50 dark:border-zinc-700 dark:bg-zinc-900/50 dark:text-zinc-400 dark:hover:border-violet-600 dark:hover:text-violet-400"
            >
              @{name}
            </button>
          ))}
        </div>
      </div>

      <RecentSearches searches={recentSearches} onSelect={onRecentSelect} />
    </form>
  );
}
