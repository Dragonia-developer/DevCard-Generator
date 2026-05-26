import type { CardTheme } from "@/lib/themes";
import { cn, formatNumber } from "@/lib/utils";

interface StatsGridProps {
  followers: number;
  following: number;
  repos: number;
  totalStars: number;
  theme: CardTheme;
  accentHex?: string;
  compact?: boolean;
  horizontal?: boolean;
}

export function StatsGrid({
  followers,
  following,
  repos,
  totalStars,
  theme,
  accentHex,
  compact = false,
  horizontal = false,
}: StatsGridProps) {
  const stats = [
    { label: "Followers", value: followers },
    { label: "Following", value: following },
    { label: "Repos", value: repos },
    { label: "Stars", value: totalStars },
  ];

  return (
    <div
      className={cn(
        "grid gap-2",
        horizontal ? "grid-cols-4" : "grid-cols-2",
        compact && !horizontal && "gap-1.5"
      )}
    >
      {stats.map((stat) => (
        <div
          key={stat.label}
          className={cn(
            "rounded-xl text-center",
            theme.statBg,
            compact ? "px-2 py-2" : "px-3 py-3"
          )}
        >
          <p
            className={cn(
              "font-semibold",
              theme.text,
              compact ? "text-base" : "text-lg"
            )}
            style={accentHex ? { color: accentHex } : undefined}
          >
            {formatNumber(stat.value)}
          </p>
          <p
            className={cn(
              theme.muted,
              compact ? "text-[10px]" : "text-xs"
            )}
          >
            {stat.label}
          </p>
        </div>
      ))}
    </div>
  );
}
