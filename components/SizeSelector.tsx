"use client";

import { CARD_SIZES, type CardSizeId } from "@/lib/themes";
import { cn } from "@/lib/utils";

interface SizeSelectorProps {
  value: CardSizeId;
  onChange: (size: CardSizeId) => void;
}

export function SizeSelector({ value, onChange }: SizeSelectorProps) {
  return (
    <div className="space-y-3">
      <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
        Card size
      </h3>
      <div className="flex flex-wrap gap-2">
        {CARD_SIZES.map((size) => (
          <button
            key={size.id}
            type="button"
            onClick={() => onChange(size.id)}
            aria-pressed={value === size.id}
            aria-label={`Select ${size.label} size (${size.description})`}
            className={cn(
              "rounded-xl border px-4 py-2 text-left transition",
              value === size.id
                ? "border-violet-500/60 bg-violet-50/80 ring-1 ring-violet-500/30 dark:border-violet-500/40 dark:bg-violet-950/30"
                : "border-zinc-200/80 bg-white/50 hover:border-zinc-300 dark:border-zinc-800 dark:bg-zinc-900/50 dark:hover:border-zinc-700"
            )}
          >
            <span className="block text-sm font-medium text-zinc-800 dark:text-zinc-200">
              {size.label}
            </span>
            <span className="block text-xs text-zinc-500 dark:text-zinc-400">
              {size.description}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
