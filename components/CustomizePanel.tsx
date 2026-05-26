"use client";

import { RotateCcw } from "lucide-react";
import { SizeSelector } from "@/components/SizeSelector";
import { ThemeSelector } from "@/components/ThemeSelector";
import {
  ACCENT_COLORS,
  DEFAULT_CUSTOMIZATION,
  type AccentColorId,
  type AvatarShapeId,
  type BorderRadiusId,
  type CardCustomization,
  type FontScaleId,
  type PatternId,
  type ShadowId,
} from "@/lib/customization";
import type { CardSizeId, CardThemeId } from "@/lib/themes";
import { cn } from "@/lib/utils";

interface CustomizePanelProps {
  themeId: CardThemeId;
  sizeId: CardSizeId;
  customization: CardCustomization;
  onThemeChange: (id: CardThemeId) => void;
  onSizeChange: (id: CardSizeId) => void;
  onCustomizationChange: (patch: Partial<CardCustomization>) => void;
  onReset: () => void;
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
      {children}
    </h3>
  );
}

function ToggleRow({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <label className="flex cursor-pointer items-center justify-between gap-2 text-sm text-zinc-700 dark:text-zinc-300">
      <span>{label}</span>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        aria-label={label}
        onClick={() => onChange(!checked)}
        className={cn(
          "relative h-6 w-11 shrink-0 rounded-full transition",
          checked ? "bg-violet-600" : "bg-zinc-300 dark:bg-zinc-600"
        )}
      >
        <span
          className={cn(
            "absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white shadow transition",
            checked && "translate-x-5"
          )}
        />
      </button>
    </label>
  );
}

function OptionPills<T extends string | number>({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: { id: T; label: string }[];
  value: T;
  onChange: (id: T) => void;
}) {
  return (
    <div className="space-y-2">
      <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
        {label}
      </p>
      <div className="flex flex-wrap gap-1.5">
        {options.map((opt) => (
          <button
            key={opt.id}
            type="button"
            onClick={() => onChange(opt.id)}
            aria-pressed={value === opt.id}
            className={cn(
              "rounded-lg border px-2.5 py-1 text-xs font-medium transition",
              value === opt.id
                ? "border-violet-500/60 bg-violet-50 text-violet-700 dark:border-violet-500/40 dark:bg-violet-950/50 dark:text-violet-300"
                : "border-zinc-200/80 bg-white/50 text-zinc-600 hover:border-zinc-300 dark:border-zinc-700 dark:bg-zinc-900/50 dark:text-zinc-400"
            )}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export function CustomizePanel({
  themeId,
  sizeId,
  customization,
  onThemeChange,
  onSizeChange,
  onCustomizationChange,
  onReset,
}: CustomizePanelProps) {
  return (
    <div className="max-h-[calc(100vh-7rem)] space-y-6 overflow-y-auto pr-1">
      <div className="flex items-center justify-between gap-2">
        <SectionTitle>Customize</SectionTitle>
        <button
          type="button"
          onClick={onReset}
          className="inline-flex items-center gap-1 rounded-lg border border-zinc-200/80 px-2 py-1 text-xs font-medium text-zinc-600 transition hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-400 dark:hover:bg-zinc-800"
          aria-label="Reset all customization options"
        >
          <RotateCcw className="h-3 w-3" aria-hidden="true" />
          Reset
        </button>
      </div>

      <ThemeSelector value={themeId} onChange={onThemeChange} />
      <SizeSelector value={sizeId} onChange={onSizeChange} />

      <div className="space-y-3">
        <SectionTitle>Accent color</SectionTitle>
        <p className="text-xs text-zinc-500 dark:text-zinc-400">
          Highlights avatar ring, links, and accents on any theme.
        </p>
        <div className="grid grid-cols-5 gap-2">
          {ACCENT_COLORS.map((color) => (
            <button
              key={color.id}
              type="button"
              onClick={() =>
                onCustomizationChange({
                  accentColor: color.id as AccentColorId,
                })
              }
              aria-label={`Accent color ${color.name}`}
              aria-pressed={customization.accentColor === color.id}
              title={color.name}
              className={cn(
                "h-8 w-full rounded-lg border-2 transition hover:scale-105",
                customization.accentColor === color.id
                  ? "border-zinc-900 dark:border-white"
                  : "border-transparent"
              )}
              style={{ backgroundColor: color.hex }}
            />
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <SectionTitle>Style</SectionTitle>
        <OptionPills<BorderRadiusId>
          label="Corner radius"
          value={customization.borderRadius}
          onChange={(borderRadius) => onCustomizationChange({ borderRadius })}
          options={[
            { id: "none", label: "Sharp" },
            { id: "md", label: "MD" },
            { id: "xl", label: "XL" },
            { id: "2xl", label: "2XL" },
            { id: "3xl", label: "3XL" },
          ]}
        />
        <OptionPills<AvatarShapeId>
          label="Avatar shape"
          value={customization.avatarShape}
          onChange={(avatarShape) => onCustomizationChange({ avatarShape })}
          options={[
            { id: "square", label: "Square" },
            { id: "rounded", label: "Rounded" },
            { id: "circle", label: "Circle" },
          ]}
        />
        <OptionPills<FontScaleId>
          label="Font size"
          value={customization.fontScale}
          onChange={(fontScale) => onCustomizationChange({ fontScale })}
          options={[
            { id: "compact", label: "Compact" },
            { id: "default", label: "Default" },
            { id: "large", label: "Large" },
          ]}
        />
        <OptionPills<ShadowId>
          label="Shadow"
          value={customization.shadow}
          onChange={(shadow) => onCustomizationChange({ shadow })}
          options={[
            { id: "none", label: "None" },
            { id: "soft", label: "Soft" },
            { id: "strong", label: "Strong" },
          ]}
        />
        <OptionPills<PatternId>
          label="Background pattern"
          value={customization.pattern}
          onChange={(pattern) => onCustomizationChange({ pattern })}
          options={[
            { id: "none", label: "None" },
            { id: "dots", label: "Dots" },
            { id: "grid", label: "Grid" },
            { id: "noise", label: "Noise" },
          ]}
        />
      </div>

      <div className="space-y-3">
        <SectionTitle>Display</SectionTitle>
        <div className="space-y-2.5">
          <ToggleRow
            label="Statistics"
            checked={customization.showStats}
            onChange={(showStats) => onCustomizationChange({ showStats })}
          />
          <ToggleRow
            label="Bio"
            checked={customization.showBio}
            onChange={(showBio) => onCustomizationChange({ showBio })}
          />
          <ToggleRow
            label="Location & links"
            checked={customization.showMeta}
            onChange={(showMeta) => onCustomizationChange({ showMeta })}
          />
          <ToggleRow
            label="Join date"
            checked={customization.showJoinDate}
            onChange={(showJoinDate) => onCustomizationChange({ showJoinDate })}
          />
          <ToggleRow
            label="Languages"
            checked={customization.showLanguages}
            onChange={(showLanguages) => onCustomizationChange({ showLanguages })}
          />
          <ToggleRow
            label="Repositories"
            checked={customization.showRepos}
            onChange={(showRepos) => onCustomizationChange({ showRepos })}
          />
          <ToggleRow
            label="Footer"
            checked={customization.showFooter}
            onChange={(showFooter) => onCustomizationChange({ showFooter })}
          />
        </div>
      </div>

      <div className="space-y-3">
        <SectionTitle>Data density</SectionTitle>
        <OptionPills<3 | 5>
          label="Top repositories"
          value={customization.topRepoCount}
          onChange={(topRepoCount) => onCustomizationChange({ topRepoCount })}
          options={[
            { id: 3, label: "3 repos" },
            { id: 5, label: "5 repos" },
          ]}
        />
        <OptionPills<4 | 6>
          label="Top languages"
          value={customization.languageCount}
          onChange={(languageCount) => onCustomizationChange({ languageCount })}
          options={[
            { id: 4, label: "4 langs" },
            { id: 6, label: "6 langs" },
          ]}
        />
      </div>

      <div className="space-y-2">
        <SectionTitle>Footer text</SectionTitle>
        <input
          type="text"
          value={customization.footerText}
          onChange={(e) =>
            onCustomizationChange({ footerText: e.target.value })
          }
          maxLength={80}
          placeholder={DEFAULT_CUSTOMIZATION.footerText}
          className="w-full rounded-xl border border-zinc-200/80 bg-white/80 px-3 py-2 text-sm text-zinc-900 outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-500/20 dark:border-zinc-700 dark:bg-zinc-900/80 dark:text-zinc-100"
          aria-label="Custom footer text"
        />
      </div>
    </div>
  );
}
