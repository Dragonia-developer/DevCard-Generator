export type AccentColorId =
  | "violet"
  | "blue"
  | "cyan"
  | "emerald"
  | "amber"
  | "rose"
  | "orange"
  | "fuchsia"
  | "slate"
  | "red";

export type BorderRadiusId = "none" | "md" | "xl" | "2xl" | "3xl";
export type AvatarShapeId = "square" | "rounded" | "circle";
export type FontScaleId = "compact" | "default" | "large";
export type ShadowId = "none" | "soft" | "strong";
export type PatternId = "none" | "dots" | "grid" | "noise";

export interface AccentColor {
  id: AccentColorId;
  name: string;
  hex: string;
}

export const ACCENT_COLORS: AccentColor[] = [
  { id: "violet", name: "Violet", hex: "#8b5cf6" },
  { id: "blue", name: "Blue", hex: "#3b82f6" },
  { id: "cyan", name: "Cyan", hex: "#06b6d4" },
  { id: "emerald", name: "Emerald", hex: "#10b981" },
  { id: "amber", name: "Amber", hex: "#f59e0b" },
  { id: "rose", name: "Rose", hex: "#f43f5e" },
  { id: "orange", name: "Orange", hex: "#f97316" },
  { id: "fuchsia", name: "Fuchsia", hex: "#d946ef" },
  { id: "slate", name: "Slate", hex: "#64748b" },
  { id: "red", name: "Red", hex: "#ef4444" },
];

export interface CardCustomization {
  accentColor: AccentColorId;
  borderRadius: BorderRadiusId;
  avatarShape: AvatarShapeId;
  fontScale: FontScaleId;
  shadow: ShadowId;
  pattern: PatternId;
  showBio: boolean;
  showMeta: boolean;
  showLanguages: boolean;
  showRepos: boolean;
  showStats: boolean;
  showFooter: boolean;
  showJoinDate: boolean;
  footerText: string;
  topRepoCount: 3 | 5;
  languageCount: 4 | 6;
}

export const DEFAULT_CUSTOMIZATION: CardCustomization = {
  accentColor: "violet",
  borderRadius: "3xl",
  avatarShape: "rounded",
  fontScale: "default",
  shadow: "strong",
  pattern: "none",
  showBio: true,
  showMeta: true,
  showLanguages: true,
  showRepos: true,
  showStats: true,
  showFooter: true,
  showJoinDate: true,
  footerText: "Generated with DevCard Generator",
  topRepoCount: 3,
  languageCount: 4,
};

const STORAGE_KEY = "devcard-customization";

export function getAccentColor(id: AccentColorId): AccentColor {
  return ACCENT_COLORS.find((c) => c.id === id) ?? ACCENT_COLORS[0];
}

export function loadCustomization(): CardCustomization {
  if (typeof window === "undefined") return DEFAULT_CUSTOMIZATION;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_CUSTOMIZATION;
    const parsed = JSON.parse(raw) as Partial<CardCustomization>;
    return { ...DEFAULT_CUSTOMIZATION, ...parsed };
  } catch {
    return DEFAULT_CUSTOMIZATION;
  }
}

export function saveCustomization(customization: CardCustomization): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(customization));
  } catch {
    // ignore
  }
}

export const BORDER_RADIUS_CLASSES: Record<BorderRadiusId, string> = {
  none: "rounded-none",
  md: "rounded-xl",
  xl: "rounded-2xl",
  "2xl": "rounded-2xl",
  "3xl": "rounded-3xl",
};

export const AVATAR_SHAPE_CLASSES: Record<AvatarShapeId, string> = {
  square: "rounded-lg",
  rounded: "rounded-2xl",
  circle: "rounded-full",
};

export const SHADOW_CLASSES: Record<ShadowId, string> = {
  none: "shadow-none",
  soft: "shadow-lg",
  strong: "shadow-2xl",
};

export const FONT_SCALE_CLASSES: Record<
  FontScaleId,
  { title: string; body: string; small: string }
> = {
  compact: {
    title: "text-xl sm:text-2xl",
    body: "text-xs",
    small: "text-[10px]",
  },
  default: {
    title: "text-2xl sm:text-3xl",
    body: "text-sm",
    small: "text-xs",
  },
  large: {
    title: "text-3xl sm:text-4xl",
    body: "text-base",
    small: "text-sm",
  },
};
