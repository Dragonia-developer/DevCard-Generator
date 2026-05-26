import { cn } from "@/lib/utils";

interface SkeletonCardProps {
  className?: string;
}

export function SkeletonCard({ className }: SkeletonCardProps) {
  return (
    <div
      className={cn(
        "w-full max-w-md overflow-hidden rounded-3xl border border-zinc-200/80 bg-white/70 p-6 shadow-xl backdrop-blur-xl dark:border-zinc-800 dark:bg-zinc-900/70",
        className
      )}
      aria-busy="true"
      aria-label="Loading developer card"
    >
      <div className="flex items-center gap-4">
        <div className="h-16 w-16 animate-pulse rounded-2xl bg-zinc-200 dark:bg-zinc-700" />
        <div className="flex-1 space-y-2">
          <div className="h-5 w-36 animate-pulse rounded-lg bg-zinc-200 dark:bg-zinc-700" />
          <div className="h-4 w-24 animate-pulse rounded-lg bg-zinc-200 dark:bg-zinc-700" />
        </div>
      </div>

      <div className="mt-5 space-y-2">
        <div className="h-3 w-full animate-pulse rounded bg-zinc-200 dark:bg-zinc-700" />
        <div className="h-3 w-4/5 animate-pulse rounded bg-zinc-200 dark:bg-zinc-700" />
      </div>

      <div className="mt-6 grid grid-cols-2 gap-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="h-14 animate-pulse rounded-xl bg-zinc-200 dark:bg-zinc-700"
          />
        ))}
      </div>

      <div className="mt-6 flex gap-2">
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className="h-6 w-16 animate-pulse rounded-full bg-zinc-200 dark:bg-zinc-700"
          />
        ))}
      </div>

      <div className="mt-6 space-y-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className="h-16 animate-pulse rounded-xl bg-zinc-200 dark:bg-zinc-700"
          />
        ))}
      </div>
    </div>
  );
}
