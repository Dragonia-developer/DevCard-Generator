import { AlertTriangle, Star } from "lucide-react";
import type { CardTheme } from "@/lib/themes";
import { cn } from "@/lib/utils";
import type { GitHubRepo } from "@/types/github";

interface RepoListProps {
  repos: GitHubRepo[];
  theme: CardTheme;
  accentHex?: string;
  error?: string;
  compact?: boolean;
}

export function RepoList({
  repos,
  theme,
  accentHex,
  error,
  compact = false,
}: RepoListProps) {
  return (
    <div className="space-y-2">
      <p
        className={cn(
          "font-medium uppercase tracking-wider",
          theme.muted,
          compact ? "text-[10px]" : "text-xs"
        )}
      >
        Top repositories
      </p>

      {error ? (
        <div
          className={cn(
            "flex items-start gap-2 rounded-xl border border-amber-300/40 bg-amber-50/20 px-3 py-2",
            compact ? "text-[10px]" : "text-xs"
          )}
        >
          <AlertTriangle
            className="mt-0.5 h-3.5 w-3.5 shrink-0 text-amber-500"
            aria-hidden="true"
          />
          <p className={theme.muted}>{error}</p>
        </div>
      ) : repos.length > 0 ? (
        <ul className="space-y-2">
          {repos.map((repo) => (
            <li
              key={repo.name}
              className={cn("rounded-xl", theme.repoBg, compact ? "p-2.5" : "p-3")}
            >
              <div className="flex items-start justify-between gap-2">
                <a
                  href={repo.html_url}
                  target="_blank"
                  rel="noreferrer"
                  className={cn(
                    "font-semibold hover:underline",
                    !accentHex && theme.accent,
                    compact ? "text-xs" : "text-sm"
                  )}
                  style={accentHex ? { color: accentHex } : undefined}
                >
                  {repo.name}
                </a>
                <span
                  className={cn(
                    "flex shrink-0 items-center gap-1",
                    theme.muted,
                    compact ? "text-[10px]" : "text-xs"
                  )}
                >
                  <Star className="h-3 w-3" aria-hidden="true" />
                  {repo.stargazers_count}
                </span>
              </div>
              {repo.description && (
                <p
                  className={cn(
                    "mt-1 line-clamp-2",
                    theme.muted,
                    compact ? "text-[10px]" : "text-xs"
                  )}
                >
                  {repo.description}
                </p>
              )}
              {repo.language && (
                <p
                  className={cn(
                    "mt-1",
                    theme.muted,
                    compact ? "text-[10px]" : "text-xs"
                  )}
                >
                  {repo.language}
                </p>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p className={cn(theme.muted, compact ? "text-xs" : "text-sm")}>
          No public repositories found.
        </p>
      )}
    </div>
  );
}
