"use client";

import { Clock } from "lucide-react";
import { cn } from "@/lib/utils";

interface RecentSearchesProps {
  searches: string[];
  onSelect: (username: string) => void;
  className?: string;
}

export function RecentSearches({
  searches,
  onSelect,
  className,
}: RecentSearchesProps) {
  if (searches.length === 0) return null;

  return (
    <div className={cn("space-y-2", className)}>
      <p className="flex items-center gap-1.5 text-xs font-medium text-zinc-500 dark:text-zinc-400">
        <Clock className="h-3.5 w-3.5" aria-hidden="true" />
        Recent searches
      </p>
      <div className="flex flex-wrap gap-2">
        {searches.map((username) => (
          <button
            key={username}
            type="button"
            onClick={() => onSelect(username)}
            className="rounded-full border border-zinc-200/80 bg-white/60 px-3 py-1 text-xs font-medium text-zinc-700 transition hover:border-zinc-300 hover:bg-white dark:border-zinc-700 dark:bg-zinc-900/60 dark:text-zinc-300 dark:hover:border-zinc-600 dark:hover:bg-zinc-900"
          >
            @{username}
          </button>
        ))}
      </div>
    </div>
  );
}
