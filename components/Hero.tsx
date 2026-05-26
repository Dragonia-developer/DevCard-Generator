import { UsernameForm } from "@/components/UsernameForm";

interface HeroProps {
  username: string;
  onUsernameChange: (value: string) => void;
  onSubmit: () => void;
  isLoading: boolean;
  recentSearches: string[];
  onRecentSelect: (username: string) => void;
}

export function Hero({
  username,
  onUsernameChange,
  onSubmit,
  isLoading,
  recentSearches,
  onRecentSelect,
}: HeroProps) {
  return (
    <section className="mx-auto max-w-4xl px-4 py-12 text-center sm:px-6 sm:py-16 lg:py-20">
      <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-violet-200/60 bg-violet-50/80 px-3 py-1 text-xs font-medium text-violet-700 dark:border-violet-800/60 dark:bg-violet-950/40 dark:text-violet-300">
        <span className="h-1.5 w-1.5 rounded-full bg-violet-500" aria-hidden="true" />
        Free · No API token required
      </div>

      <h1 className="text-4xl font-bold tracking-tight text-zinc-900 sm:text-5xl lg:text-6xl dark:text-zinc-50">
        Create beautiful GitHub profile cards{" "}
        <span className="bg-gradient-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-transparent">
          in seconds
        </span>
      </h1>

      <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-zinc-600 sm:text-lg dark:text-zinc-400">
        Enter any GitHub username, customize the style, and export your developer
        card as PNG.
      </p>

      <div className="mt-10 flex justify-center">
        <UsernameForm
          username={username}
          onUsernameChange={onUsernameChange}
          onSubmit={onSubmit}
          isLoading={isLoading}
          recentSearches={recentSearches}
          onRecentSelect={onRecentSelect}
        />
      </div>
    </section>
  );
}
