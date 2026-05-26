"use client";

import { GitBranch, Moon, Sparkles, Sun } from "lucide-react";
import { APP_NAME, GITHUB_REPO_URL } from "@/lib/constants";
import { cn } from "@/lib/utils";

interface NavbarProps {
  pageTheme: "light" | "dark";
  onToggleTheme: () => void;
}

export function Navbar({ pageTheme, onToggleTheme }: NavbarProps) {
  return (
    <header className="sticky top-0 z-50 border-b border-zinc-200/60 bg-white/70 backdrop-blur-xl dark:border-zinc-800/60 dark:bg-zinc-950/70">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <a href="#" className="flex items-center gap-2 font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
          <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-500 text-white shadow-lg shadow-violet-500/25">
            <Sparkles className="h-4 w-4" aria-hidden="true" />
          </span>
          <span>{APP_NAME}</span>
        </a>

        <div className="flex items-center gap-2">
          <a
            href={GITHUB_REPO_URL}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-xl border border-zinc-200/80 bg-white/60 px-3 py-2 text-sm font-medium text-zinc-700 transition hover:bg-white dark:border-zinc-700 dark:bg-zinc-900/60 dark:text-zinc-300 dark:hover:bg-zinc-900"
            aria-label="View on GitHub"
          >
            <GitBranch className="h-4 w-4" aria-hidden="true" />
            <span className="hidden sm:inline">GitHub</span>
          </a>

          <button
            type="button"
            onClick={onToggleTheme}
            className={cn(
              "inline-flex h-10 w-10 items-center justify-center rounded-xl border border-zinc-200/80 bg-white/60 text-zinc-700 transition hover:bg-white dark:border-zinc-700 dark:bg-zinc-900/60 dark:text-zinc-300 dark:hover:bg-zinc-900"
            )}
            aria-label={
              pageTheme === "dark"
                ? "Switch to light mode"
                : "Switch to dark mode"
            }
          >
            {pageTheme === "dark" ? (
              <Sun className="h-4 w-4" aria-hidden="true" />
            ) : (
              <Moon className="h-4 w-4" aria-hidden="true" />
            )}
          </button>
        </div>
      </nav>
    </header>
  );
}
