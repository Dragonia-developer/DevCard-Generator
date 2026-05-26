"use client";

import { useCallback, useEffect, useMemo, useRef, useState, useSyncExternalStore } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toPng } from "html-to-image";
import { Download, Loader2 } from "lucide-react";
import { CardPreview } from "@/components/CardPreview";
import { CustomizePanel } from "@/components/CustomizePanel";
import { ErrorMessage } from "@/components/ErrorMessage";
import { Hero } from "@/components/Hero";
import { Navbar } from "@/components/Navbar";
import { SkeletonCard } from "@/components/SkeletonCard";
import { DEMO_CARD_DATA } from "@/lib/demo";
import {
  DEFAULT_CUSTOMIZATION,
  loadCustomization,
  saveCustomization,
  type CardCustomization,
} from "@/lib/customization";
import { fetchDevCardData, rebuildStats } from "@/lib/github";
import {
  getPageThemeServerSnapshot,
  getPageThemeSnapshot,
  subscribePageTheme,
  togglePageTheme,
} from "@/lib/page-theme";
import {
  addRecentSearch,
  getRecentSearchesServerSnapshot,
  getRecentSearchesSnapshot,
  subscribeRecentSearches,
} from "@/lib/storage";
import {
  getCardSize,
  getCardTheme,
  type CardSizeId,
  type CardThemeId,
} from "@/lib/themes";
import { cn } from "@/lib/utils";
import { GitHubFetchError } from "@/types/github";
import type { DevCardData } from "@/types/github";

interface HomePageProps {
  initialUsername?: string;
}

function subscribeClient(listener: () => void) {
  window.addEventListener("storage", listener);
  return () => window.removeEventListener("storage", listener);
}

function getClientSnapshot() {
  return true;
}

function getServerSnapshot() {
  return false;
}

export function HomePage({ initialUsername = "" }: HomePageProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isClient = useSyncExternalStore(
    subscribeClient,
    getClientSnapshot,
    getServerSnapshot
  );
  const pageTheme = useSyncExternalStore(
    subscribePageTheme,
    getPageThemeSnapshot,
    getPageThemeServerSnapshot
  );
  const recentSearches = useSyncExternalStore(
    subscribeRecentSearches,
    getRecentSearchesSnapshot,
    getRecentSearchesServerSnapshot
  );

  const [username, setUsername] = useState(initialUsername);
  const [cardData, setCardData] = useState<DevCardData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [exportError, setExportError] = useState<string | null>(null);
  const [cardThemeId, setCardThemeId] = useState<CardThemeId>("minimal-light");
  const [cardSizeId, setCardSizeId] = useState<CardSizeId>("square");
  const [customization, setCustomization] =
    useState<CardCustomization>(DEFAULT_CUSTOMIZATION);

  const cardRef = useRef<HTMLDivElement>(null);
  const initialLoadDone = useRef(false);
  const customizationLoaded = useRef(false);

  const cardTheme = getCardTheme(cardThemeId);
  const cardSize = getCardSize(cardSizeId);

  const displayData = useMemo(() => {
    const base = cardData ?? DEMO_CARD_DATA;
    if (!cardData?.allRepos?.length) return base;
    return {
      ...base,
      stats: rebuildStats(
        cardData.allRepos,
        customization.languageCount,
        customization.topRepoCount
      ),
    };
  }, [cardData, customization.languageCount, customization.topRepoCount]);

  const isDemo = !cardData && !isLoading;

  const patchCustomization = useCallback((patch: Partial<CardCustomization>) => {
    setCustomization((prev) => {
      const next = { ...prev, ...patch };
      saveCustomization(next);
      return next;
    });
  }, []);

  const resetCustomization = useCallback(() => {
    setCustomization(DEFAULT_CUSTOMIZATION);
    saveCustomization(DEFAULT_CUSTOMIZATION);
    setCardThemeId("minimal-light");
    setCardSizeId("square");
  }, []);

  const updateUrl = useCallback(
    (value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value.trim()) {
        params.set("username", value.trim().toLowerCase());
      } else {
        params.delete("username");
      }
      const query = params.toString();
      router.replace(query ? `?${query}` : "/", { scroll: false });
    },
    [router, searchParams]
  );

  const generateCard = useCallback(
    async (rawUsername: string, custom = customization) => {
      const trimmed = rawUsername.trim();
      setError(null);
      setExportError(null);

      if (!trimmed) {
        setError("Please enter a GitHub username.");
        setCardData(null);
        updateUrl("");
        return;
      }

      setIsLoading(true);
      setUsername(trimmed);
      updateUrl(trimmed);

      try {
        const data = await fetchDevCardData(trimmed, {
          languageCount: custom.languageCount,
          topRepoCount: custom.topRepoCount,
        });
        setCardData(data);
        addRecentSearch(trimmed);
      } catch (err) {
        setCardData(null);
        if (err instanceof GitHubFetchError) {
          setError(err.message);
        } else {
          setError("An unexpected error occurred. Please try again.");
        }
      } finally {
        setIsLoading(false);
      }
    },
    [customization, updateUrl]
  );

  const handleDownload = async () => {
    if (!cardRef.current || !cardData) return;

    setIsExporting(true);
    setExportError(null);

    try {
      const dataUrl = await toPng(cardRef.current, {
        cacheBust: true,
        pixelRatio: 2,
        width: cardSize.width,
        height: cardSize.height,
      });

      const link = document.createElement("a");
      link.download = `devcard-${cardData.user.login}.png`;
      link.href = dataUrl;
      link.click();
    } catch {
      setExportError(
        "Failed to export PNG. Try again or switch to a different browser."
      );
    } finally {
      setIsExporting(false);
    }
  };

  useEffect(() => {
    if (!isClient || customizationLoaded.current) return;
    customizationLoaded.current = true;
    setCustomization(loadCustomization());
  }, [isClient]);

  useEffect(() => {
    if (!isClient || initialLoadDone.current || !initialUsername) return;
    initialLoadDone.current = true;
    void generateCard(initialUsername);
  }, [isClient, initialUsername, generateCard]);

  const handleRecentSelect = (name: string) => {
    setUsername(name);
    void generateCard(name);
  };

  if (!isClient) {
    return (
      <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
        <div className="h-16" />
      </div>
    );
  }

  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-zinc-50 dark:bg-zinc-950" />
        <div className="absolute -left-32 top-0 h-[500px] w-[500px] rounded-full bg-violet-400/20 blur-3xl dark:bg-violet-600/10" />
        <div className="absolute -right-32 top-32 h-[400px] w-[400px] rounded-full bg-fuchsia-400/20 blur-3xl dark:bg-fuchsia-600/10" />
        <div className="absolute bottom-0 left-1/2 h-[300px] w-[600px] -translate-x-1/2 rounded-full bg-indigo-400/10 blur-3xl" />
      </div>

      <Navbar pageTheme={pageTheme} onToggleTheme={togglePageTheme} />

      <main>
        <Hero
          username={username}
          onUsernameChange={setUsername}
          onSubmit={() => void generateCard(username)}
          isLoading={isLoading}
          recentSearches={recentSearches}
          onRecentSelect={handleRecentSelect}
        />

        {error && (
          <div className="mx-auto max-w-xl px-4 pb-4">
            <ErrorMessage message={error} />
          </div>
        )}

        <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[320px_1fr] xl:grid-cols-[340px_1fr]">
            <aside className="rounded-3xl border border-zinc-200/60 bg-white/60 p-5 shadow-xl backdrop-blur-xl dark:border-zinc-800/60 dark:bg-zinc-900/40 lg:sticky lg:top-24 lg:max-h-[calc(100vh-6rem)] lg:self-start">
              <CustomizePanel
                themeId={cardThemeId}
                sizeId={cardSizeId}
                customization={customization}
                onThemeChange={setCardThemeId}
                onSizeChange={setCardSizeId}
                onCustomizationChange={patchCustomization}
                onReset={resetCustomization}
              />

              {cardData && (
                <button
                  type="button"
                  onClick={() => void handleDownload()}
                  disabled={isExporting || isLoading}
                  aria-label="Download card as PNG"
                  className={cn(
                    "mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-violet-600 to-fuchsia-600 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-500/25 transition hover:from-violet-500 hover:to-fuchsia-500 disabled:cursor-not-allowed disabled:opacity-60"
                  )}
                >
                  {isExporting ? (
                    <>
                      <Loader2
                        className="h-4 w-4 animate-spin"
                        aria-hidden="true"
                      />
                      Exporting…
                    </>
                  ) : (
                    <>
                      <Download className="h-4 w-4" aria-hidden="true" />
                      Download PNG
                    </>
                  )}
                </button>
              )}

              {exportError && (
                <div className="mt-3">
                  <ErrorMessage message={exportError} />
                </div>
              )}
            </aside>

            <div className="rounded-3xl border border-zinc-200/60 bg-white/40 p-4 shadow-xl backdrop-blur-xl sm:p-6 dark:border-zinc-800/60 dark:bg-zinc-900/30">
              <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
                <h2 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                  {isDemo ? "Demo preview" : "Live preview"}
                </h2>
                <div className="flex flex-wrap gap-2">
                  {isDemo && (
                    <span className="rounded-full bg-zinc-100 px-2.5 py-0.5 text-xs text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400">
                      Enter a username to generate
                    </span>
                  )}
                  <span className="rounded-full bg-violet-100 px-2.5 py-0.5 text-xs font-medium text-violet-700 dark:bg-violet-950/60 dark:text-violet-300">
                    {cardTheme.name}
                  </span>
                </div>
              </div>

              {isLoading ? (
                <div className="flex justify-center py-8">
                  <SkeletonCard />
                </div>
              ) : (
                <CardPreview
                  data={displayData}
                  theme={cardTheme}
                  size={cardSize}
                  customization={customization}
                  cardRef={cardRef}
                  isDemo={isDemo}
                />
              )}
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-zinc-200/60 py-8 text-center text-sm text-zinc-500 dark:border-zinc-800 dark:text-zinc-400">
        <p>
          Built with Next.js · Data from{" "}
          <a
            href="https://docs.github.com/en/rest"
            target="_blank"
            rel="noreferrer"
            className="text-violet-600 hover:underline dark:text-violet-400"
          >
            GitHub Public API
          </a>
        </p>
      </footer>
    </div>
  );
}
