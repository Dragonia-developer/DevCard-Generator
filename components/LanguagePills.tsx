import { Code2 } from "lucide-react";
import type { CardTheme } from "@/lib/themes";
import { cn } from "@/lib/utils";

interface LanguagePillsProps {
  languages: string[];
  theme: CardTheme;
  accentHex?: string;
  compact?: boolean;
}

export function LanguagePills({
  languages,
  theme,
  accentHex,
  compact = false,
}: LanguagePillsProps) {
  return (
    <div className="space-y-2">
      <p
        className={cn(
          "flex items-center gap-1.5 font-medium uppercase tracking-wider",
          theme.muted,
          compact ? "text-[10px]" : "text-xs"
        )}
      >
        <Code2 className={compact ? "h-3 w-3" : "h-3.5 w-3.5"} aria-hidden="true" />
        Top languages
      </p>
      {languages.length > 0 ? (
        <div className="flex flex-wrap gap-2">
          {languages.map((lang) => (
            <span
              key={lang}
              className={cn(
                "rounded-full border font-medium",
                theme.pill,
                theme.pillText,
                compact ? "px-2.5 py-0.5 text-[10px]" : "px-3 py-1 text-xs"
              )}
              style={
                accentHex
                  ? { borderColor: `${accentHex}55`, color: accentHex }
                  : undefined
              }
            >
              {lang}
            </span>
          ))}
        </div>
      ) : (
        <p className={cn(theme.muted, compact ? "text-xs" : "text-sm")}>
          No language data
        </p>
      )}
    </div>
  );
}
