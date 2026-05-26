export type CardThemeId =
  | "minimal-light"
  | "midnight-dark"
  | "gradient-purple"
  | "cyber-green"
  | "sunset-orange"
  | "ocean-blue"
  | "rose-gold"
  | "graphite"
  | "aurora"
  | "github-dark"
  | "candy-pink"
  | "forest-moss";

export interface CardTheme {
  id: CardThemeId;
  name: string;
  preview: string;
  card: string;
  header: string;
  text: string;
  muted: string;
  border: string;
  accent: string;
  statBg: string;
  pill: string;
  pillText: string;
  repoBg: string;
  footer: string;
  avatarRing: string;
}

export const CARD_THEMES: CardTheme[] = [
  {
    id: "minimal-light",
    name: "Minimal Light",
    preview: "bg-white border border-zinc-200",
    card: "bg-white",
    header: "border-b border-zinc-200",
    text: "text-zinc-900",
    muted: "text-zinc-500",
    border: "border-zinc-200",
    accent: "text-zinc-900",
    statBg: "bg-zinc-50 border border-zinc-100",
    pill: "bg-zinc-100 border border-zinc-200",
    pillText: "text-zinc-700",
    repoBg: "bg-zinc-50/80 border border-zinc-100",
    footer: "text-zinc-400 border-t border-zinc-100",
    avatarRing: "ring-2 ring-zinc-200",
  },
  {
    id: "midnight-dark",
    name: "Midnight Dark",
    preview: "bg-slate-950 border border-slate-800",
    card: "bg-[#020617]",
    header: "border-b border-slate-800",
    text: "text-slate-50",
    muted: "text-slate-400",
    border: "border-slate-800",
    accent: "text-indigo-400",
    statBg: "bg-slate-900/80 border border-slate-800",
    pill: "bg-indigo-500/15 border border-indigo-500/30",
    pillText: "text-indigo-300",
    repoBg: "bg-slate-900/60 border border-slate-800",
    footer: "text-slate-500 border-t border-slate-800",
    avatarRing: "ring-2 ring-indigo-500/40",
  },
  {
    id: "gradient-purple",
    name: "Gradient Purple",
    preview: "bg-gradient-to-br from-violet-600 to-fuchsia-600",
    card: "bg-gradient-to-br from-violet-600 via-purple-600 to-fuchsia-600",
    header: "border-b border-white/15",
    text: "text-white",
    muted: "text-white/70",
    border: "border-white/15",
    accent: "text-white",
    statBg: "bg-white/10 border border-white/20 backdrop-blur-sm",
    pill: "bg-white/15 border border-white/25",
    pillText: "text-white",
    repoBg: "bg-white/10 border border-white/15 backdrop-blur-sm",
    footer: "text-white/50 border-t border-white/15",
    avatarRing: "ring-2 ring-white/30",
  },
  {
    id: "cyber-green",
    name: "Cyber Green",
    preview: "bg-zinc-950 border border-emerald-500/30",
    card: "bg-zinc-950",
    header: "border-b border-emerald-500/20",
    text: "text-emerald-50",
    muted: "text-emerald-400/70",
    border: "border-emerald-500/20",
    accent: "text-emerald-400",
    statBg: "bg-emerald-500/5 border border-emerald-500/20",
    pill: "bg-emerald-500/10 border border-emerald-500/30",
    pillText: "text-emerald-300",
    repoBg: "bg-emerald-500/5 border border-emerald-500/15",
    footer: "text-emerald-600 border-t border-emerald-500/20",
    avatarRing: "ring-2 ring-emerald-500/50",
  },
  {
    id: "sunset-orange",
    name: "Sunset Orange",
    preview: "bg-gradient-to-br from-orange-500 via-pink-500 to-amber-400",
    card: "bg-gradient-to-br from-orange-500 via-pink-500 to-amber-400",
    header: "border-b border-white/20",
    text: "text-white",
    muted: "text-white/75",
    border: "border-white/20",
    accent: "text-white",
    statBg: "bg-white/15 border border-white/25 backdrop-blur-sm",
    pill: "bg-white/20 border border-white/30",
    pillText: "text-white",
    repoBg: "bg-white/12 border border-white/20 backdrop-blur-sm",
    footer: "text-white/55 border-t border-white/20",
    avatarRing: "ring-2 ring-white/35",
  },
  {
    id: "ocean-blue",
    name: "Ocean Blue",
    preview: "bg-gradient-to-br from-sky-600 to-blue-800",
    card: "bg-gradient-to-br from-sky-500 via-blue-600 to-indigo-700",
    header: "border-b border-white/15",
    text: "text-white",
    muted: "text-sky-100/80",
    border: "border-white/15",
    accent: "text-white",
    statBg: "bg-white/10 border border-white/20 backdrop-blur-sm",
    pill: "bg-white/15 border border-white/25",
    pillText: "text-white",
    repoBg: "bg-white/10 border border-white/15 backdrop-blur-sm",
    footer: "text-white/50 border-t border-white/15",
    avatarRing: "ring-2 ring-sky-200/40",
  },
  {
    id: "rose-gold",
    name: "Rose Gold",
    preview: "bg-gradient-to-br from-rose-400 to-amber-500",
    card: "bg-gradient-to-br from-rose-400 via-pink-500 to-amber-400",
    header: "border-b border-white/20",
    text: "text-white",
    muted: "text-white/75",
    border: "border-white/20",
    accent: "text-white",
    statBg: "bg-white/15 border border-white/25 backdrop-blur-sm",
    pill: "bg-white/20 border border-white/30",
    pillText: "text-white",
    repoBg: "bg-white/12 border border-white/20 backdrop-blur-sm",
    footer: "text-white/55 border-t border-white/20",
    avatarRing: "ring-2 ring-amber-100/50",
  },
  {
    id: "graphite",
    name: "Graphite",
    preview: "bg-zinc-800 border border-zinc-600",
    card: "bg-zinc-900",
    header: "border-b border-zinc-700",
    text: "text-zinc-100",
    muted: "text-zinc-400",
    border: "border-zinc-700",
    accent: "text-zinc-200",
    statBg: "bg-zinc-800/80 border border-zinc-700",
    pill: "bg-zinc-800 border border-zinc-600",
    pillText: "text-zinc-300",
    repoBg: "bg-zinc-800/60 border border-zinc-700",
    footer: "text-zinc-500 border-t border-zinc-700",
    avatarRing: "ring-2 ring-zinc-600",
  },
  {
    id: "aurora",
    name: "Aurora",
    preview: "bg-gradient-to-br from-teal-500 via-violet-600 to-emerald-500",
    card: "bg-gradient-to-br from-teal-500 via-violet-600 to-emerald-500",
    header: "border-b border-white/15",
    text: "text-white",
    muted: "text-white/70",
    border: "border-white/15",
    accent: "text-emerald-100",
    statBg: "bg-white/10 border border-white/20 backdrop-blur-sm",
    pill: "bg-white/15 border border-white/25",
    pillText: "text-white",
    repoBg: "bg-white/10 border border-white/15 backdrop-blur-sm",
    footer: "text-white/50 border-t border-white/15",
    avatarRing: "ring-2 ring-teal-200/40",
  },
  {
    id: "github-dark",
    name: "GitHub Dark",
    preview: "bg-[#0d1117] border border-[#30363d]",
    card: "bg-[#0d1117]",
    header: "border-b border-[#30363d]",
    text: "text-[#e6edf3]",
    muted: "text-[#8b949e]",
    border: "border-[#30363d]",
    accent: "text-[#58a6ff]",
    statBg: "bg-[#161b22] border border-[#30363d]",
    pill: "bg-[#21262d] border border-[#30363d]",
    pillText: "text-[#79c0ff]",
    repoBg: "bg-[#161b22] border border-[#30363d]",
    footer: "text-[#484f58] border-t border-[#30363d]",
    avatarRing: "ring-2 ring-[#388bfd66]",
  },
  {
    id: "candy-pink",
    name: "Candy Pink",
    preview: "bg-gradient-to-br from-pink-400 to-yellow-300",
    card: "bg-gradient-to-br from-pink-400 via-fuchsia-400 to-yellow-300",
    header: "border-b border-white/25",
    text: "text-white",
    muted: "text-white/80",
    border: "border-white/25",
    accent: "text-white",
    statBg: "bg-white/20 border border-white/30 backdrop-blur-sm",
    pill: "bg-white/25 border border-white/35",
    pillText: "text-white",
    repoBg: "bg-white/15 border border-white/25 backdrop-blur-sm",
    footer: "text-white/60 border-t border-white/25",
    avatarRing: "ring-2 ring-pink-100/50",
  },
  {
    id: "forest-moss",
    name: "Forest Moss",
    preview: "bg-gradient-to-br from-green-900 to-lime-800",
    card: "bg-gradient-to-br from-green-900 via-emerald-900 to-lime-900",
    header: "border-b border-lime-500/20",
    text: "text-lime-50",
    muted: "text-lime-200/70",
    border: "border-lime-500/20",
    accent: "text-lime-300",
    statBg: "bg-lime-500/10 border border-lime-500/25",
    pill: "bg-lime-500/15 border border-lime-500/30",
    pillText: "text-lime-200",
    repoBg: "bg-lime-500/10 border border-lime-500/20",
    footer: "text-lime-600 border-t border-lime-500/20",
    avatarRing: "ring-2 ring-lime-400/40",
  },
];

export function getCardTheme(id: CardThemeId): CardTheme {
  return CARD_THEMES.find((t) => t.id === id) ?? CARD_THEMES[0];
}

export type CardSizeId = "square" | "wide" | "compact";

export interface CardSize {
  id: CardSizeId;
  label: string;
  description: string;
  width: number;
  height: number;
}

export const CARD_SIZES: CardSize[] = [
  {
    id: "square",
    label: "Square",
    description: "1080 × 1080",
    width: 1080,
    height: 1080,
  },
  {
    id: "wide",
    label: "Wide",
    description: "1200 × 630",
    width: 1200,
    height: 630,
  },
  {
    id: "compact",
    label: "Compact",
    description: "600 × 900",
    width: 600,
    height: 900,
  },
];

export function getCardSize(id: CardSizeId): CardSize {
  return CARD_SIZES.find((s) => s.id === id) ?? CARD_SIZES[0];
}
