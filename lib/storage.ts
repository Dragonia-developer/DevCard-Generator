const RECENT_KEY = "devcard-recent-searches";
const PAGE_THEME_KEY = "devcard-page-theme";
const RECENT_EVENT = "devcard-recent-update";
const MAX_RECENT = 5;

/** Stable empty array for useSyncExternalStore server snapshots */
export const EMPTY_RECENT_SEARCHES: string[] = [];

let recentSnapshot: string[] = EMPTY_RECENT_SEARCHES;
let recentSnapshotRaw: string | null = null;

export function subscribeRecentSearches(listener: () => void): () => void {
  if (typeof window === "undefined") return () => {};
  window.addEventListener(RECENT_EVENT, listener);
  return () => window.removeEventListener(RECENT_EVENT, listener);
}

export type PageTheme = "light" | "dark";

export function getRecentSearchesServerSnapshot(): string[] {
  return EMPTY_RECENT_SEARCHES;
}

export function getRecentSearchesSnapshot(): string[] {
  if (typeof window === "undefined") return EMPTY_RECENT_SEARCHES;

  try {
    const raw = localStorage.getItem(RECENT_KEY) ?? "";
    if (raw === recentSnapshotRaw) return recentSnapshot;

    recentSnapshotRaw = raw;

    if (!raw) {
      recentSnapshot = EMPTY_RECENT_SEARCHES;
      return recentSnapshot;
    }

    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) {
      recentSnapshot = EMPTY_RECENT_SEARCHES;
      return recentSnapshot;
    }

    recentSnapshot = parsed.filter(
      (item): item is string => typeof item === "string"
    );
    return recentSnapshot;
  } catch {
    recentSnapshot = EMPTY_RECENT_SEARCHES;
    recentSnapshotRaw = null;
    return recentSnapshot;
  }
}

export function getRecentSearches(): string[] {
  return getRecentSearchesSnapshot();
}

export function addRecentSearch(username: string): void {
  if (typeof window === "undefined") return;
  const normalized = username.trim().toLowerCase();
  if (!normalized) return;

  const current = getRecentSearchesSnapshot().filter((u) => u !== normalized);
  const updated = [normalized, ...current].slice(0, MAX_RECENT);

  try {
    localStorage.setItem(RECENT_KEY, JSON.stringify(updated));
    recentSnapshotRaw = null;
    window.dispatchEvent(new Event(RECENT_EVENT));
  } catch {
    // ignore quota errors
  }
}

export function getPageTheme(): PageTheme | null {
  if (typeof window === "undefined") return null;
  try {
    const value = localStorage.getItem(PAGE_THEME_KEY);
    if (value === "light" || value === "dark") return value;
    return null;
  } catch {
    return null;
  }
}

export function setPageTheme(theme: PageTheme): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(PAGE_THEME_KEY, theme);
  } catch {
    // ignore
  }
}
