import { Suspense } from "react";
import { HomePage } from "@/components/HomePage";

function HomeFallback() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      <div className="mx-auto h-16 max-w-7xl px-4 sm:px-6" />
      <div className="mx-auto max-w-4xl px-4 py-20 text-center">
        <div className="mx-auto h-10 w-64 animate-pulse rounded-xl bg-zinc-200 dark:bg-zinc-800" />
        <div className="mx-auto mt-4 h-5 w-96 max-w-full animate-pulse rounded-lg bg-zinc-200 dark:bg-zinc-800" />
      </div>
    </div>
  );
}

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ username?: string }>;
}) {
  const { username } = await searchParams;

  return (
    <Suspense fallback={<HomeFallback />}>
      <HomePage initialUsername={username ?? ""} />
    </Suspense>
  );
}
