"use client";

import { CARD_THEMES, type CardThemeId } from "@/lib/themes";
import { cn } from "@/lib/utils";

interface ThemeSelectorProps {
  value: CardThemeId;
  onChange: (theme: CardThemeId) => void;
}

export function ThemeSelector({ value, onChange }: ThemeSelectorProps) {
  return (
    <div className="space-y-3">
      <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
        Card theme
      </h3>
      <div className="grid max-h-48 grid-cols-2 gap-2 overflow-y-auto pr-1 sm:grid-cols-2">
        {CARD_THEMES.map((theme) => (
          <button
            key={theme.id}
            type="button"
            onClick={() => onChange(theme.id)}
            aria-pressed={value === theme.id}
            aria-label={`Select ${theme.name} card theme`}
            className={cn(
              "flex items-center gap-3 rounded-2xl border px-3 py-2.5 text-left text-sm transition",
              value === theme.id
                ? "border-violet-500/60 bg-violet-50/80 ring-1 ring-violet-500/30 dark:border-violet-500/40 dark:bg-violet-950/30"
                : "border-zinc-200/80 bg-white/50 hover:border-zinc-300 dark:border-zinc-800 dark:bg-zinc-900/50 dark:hover:border-zinc-700"
            )}
          >
            <span
              className={cn("h-8 w-8 shrink-0 rounded-lg", theme.preview)}
              aria-hidden="true"
            />
            <span className="font-medium text-zinc-800 dark:text-zinc-200">
              {theme.name}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
