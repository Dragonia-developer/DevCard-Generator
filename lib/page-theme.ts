import { getPageTheme, setPageTheme, type PageTheme } from "@/lib/storage";

type Listener = () => void;

const SERVER_PAGE_THEME: PageTheme = "light";

const listeners = new Set<Listener>();

function notify() {
  listeners.forEach((listener) => listener());
}

export function subscribePageTheme(listener: Listener): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function getPageThemeServerSnapshot(): PageTheme {
  return SERVER_PAGE_THEME;
}

export function getPageThemeSnapshot(): PageTheme {
  if (typeof window === "undefined") return SERVER_PAGE_THEME;

  const stored = getPageTheme();
  if (stored) return stored;

  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

export function applyPageTheme(theme: PageTheme): void {
  setPageTheme(theme);
  document.documentElement.classList.toggle("dark", theme === "dark");
  notify();
}

export function togglePageTheme(): PageTheme {
  const next: PageTheme =
    getPageThemeSnapshot() === "dark" ? "light" : "dark";
  applyPageTheme(next);
  return next;
}
