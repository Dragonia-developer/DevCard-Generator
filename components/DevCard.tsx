"use client";

import { forwardRef } from "react";
import {
  AtSign,
  Building2,
  Globe,
  MapPin,
} from "lucide-react";
import { CardPattern } from "@/components/CardPattern";
import { LanguagePills } from "@/components/LanguagePills";
import { RepoList } from "@/components/RepoList";
import { StatsGrid } from "@/components/StatsGrid";
import {
  AVATAR_SHAPE_CLASSES,
  BORDER_RADIUS_CLASSES,
  FONT_SCALE_CLASSES,
  getAccentColor,
  SHADOW_CLASSES,
  type CardCustomization,
} from "@/lib/customization";
import type { CardSize, CardTheme } from "@/lib/themes";
import { cn, ensureUrl, formatDate } from "@/lib/utils";
import type { DevCardData } from "@/types/github";

interface DevCardProps {
  data: DevCardData;
  theme: CardTheme;
  size: CardSize;
  customization: CardCustomization;
  isDemo?: boolean;
}

export const DevCard = forwardRef<HTMLDivElement, DevCardProps>(
  function DevCard(
    { data, theme, size, customization, isDemo = false },
    ref
  ) {
    const { user, stats, reposError } = data;
    const displayName = user.name ?? user.login;
    const isWide = size.id === "wide";
    const isCompact = size.id === "compact";
    const blogUrl = user.blog ? ensureUrl(user.blog) : null;
    const accent = getAccentColor(customization.accentColor);
    const fonts = FONT_SCALE_CLASSES[customization.fontScale];

    const metaItems = [
      user.location && {
        id: "location",
        icon: MapPin,
        text: user.location,
      },
      user.company && {
        id: "company",
        icon: Building2,
        text: user.company,
      },
      blogUrl && {
        id: "blog",
        icon: Globe,
        text: user.blog,
        href: blogUrl,
      },
      user.twitter_username && {
        id: "twitter",
        icon: AtSign,
        text: `@${user.twitter_username}`,
        href: `https://twitter.com/${user.twitter_username}`,
      },
    ].filter(Boolean) as {
      id: string;
      icon: typeof MapPin;
      text: string;
      href?: string;
    }[];

    const titleSize = isCompact
      ? "text-xl"
      : isWide
        ? "text-2xl"
        : fonts.title.split(" ").pop();

    return (
      <div
        ref={ref}
        data-devcard
        className={cn(
          "relative flex shrink-0 flex-col overflow-hidden",
          BORDER_RADIUS_CLASSES[customization.borderRadius],
          SHADOW_CLASSES[customization.shadow],
          theme.card,
          isDemo && "opacity-90"
        )}
        style={{
          width: size.width,
          height: size.height,
          // Accent overrides for links & ring
          ["--card-accent" as string]: accent.hex,
        }}
      >
        <CardPattern pattern={customization.pattern} />

        <div
          className={cn(
            "relative z-10 flex flex-1 flex-col",
            isWide ? "p-8" : isCompact ? "p-6" : "p-10"
          )}
        >
          <div
            className={cn(
              "flex gap-5",
              theme.header,
              isWide
                ? "flex-row items-center border-b pb-6"
                : "flex-col border-b pb-6 sm:flex-row sm:items-center",
              isCompact && "pb-4"
            )}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={user.avatar_url}
              alt={`${displayName}'s GitHub avatar`}
              width={isCompact ? 72 : isWide ? 96 : 112}
              height={isCompact ? 72 : isWide ? 96 : 112}
              className={cn(
                "object-cover",
                AVATAR_SHAPE_CLASSES[customization.avatarShape],
                isCompact
                  ? "h-[72px] w-[72px]"
                  : isWide
                    ? "h-24 w-24"
                    : "h-28 w-28"
              )}
              style={{
                boxShadow: `0 0 0 3px ${accent.hex}55`,
              }}
            />

            <div className="min-w-0 flex-1">
              <h2
                className={cn(
                  "truncate font-bold tracking-tight",
                  theme.text,
                  titleSize
                )}
              >
                {displayName}
              </h2>
              <a
                href={user.html_url}
                target="_blank"
                rel="noreferrer"
                className={cn(
                  "mt-0.5 inline-block font-medium hover:underline",
                  isCompact ? "text-sm" : "text-base"
                )}
                style={{ color: accent.hex }}
              >
                @{user.login}
              </a>
              {customization.showBio && user.bio && (
                <p
                  className={cn(
                    "mt-2 line-clamp-2",
                    theme.muted,
                    isCompact ? fonts.small : fonts.body
                  )}
                >
                  {user.bio}
                </p>
              )}
              {customization.showMeta && metaItems.length > 0 && (
                <div
                  className={cn(
                    "mt-2 flex flex-wrap gap-x-3 gap-y-1",
                    theme.muted,
                    isCompact ? fonts.small : fonts.small
                  )}
                >
                  {metaItems.map((item) => (
                    <span key={item.id} className="flex items-center gap-1">
                      <item.icon
                        className="h-3 w-3 shrink-0"
                        aria-hidden="true"
                      />
                      {item.href ? (
                        <a
                          href={item.href}
                          target="_blank"
                          rel="noreferrer"
                          className="hover:underline"
                          style={{ color: accent.hex }}
                        >
                          {item.text}
                        </a>
                      ) : (
                        item.text
                      )}
                    </span>
                  ))}
                </div>
              )}
              {customization.showJoinDate && (
                <p
                  className={cn(
                    "mt-1",
                    theme.muted,
                    isCompact ? fonts.small : fonts.small
                  )}
                >
                  GitHub since {formatDate(user.created_at)}
                </p>
              )}
            </div>
          </div>

          <div
            className={cn(
              "flex flex-1 gap-6 pt-6",
              isWide ? "flex-row" : "flex-col",
              isCompact && "gap-4 pt-4"
            )}
          >
            <div className={cn("space-y-5", isWide && "w-[38%] shrink-0")}>
              {customization.showStats && (
                <StatsGrid
                  followers={user.followers}
                  following={user.following}
                  repos={user.public_repos}
                  totalStars={stats.totalStars}
                  theme={theme}
                  accentHex={accent.hex}
                  compact={isCompact}
                  horizontal={isWide}
                />
              )}
              {customization.showLanguages && (
                <LanguagePills
                  languages={stats.topLanguages}
                  theme={theme}
                  accentHex={accent.hex}
                  compact={isCompact}
                />
              )}
            </div>

            {customization.showRepos && (
              <div className={cn("min-w-0 flex-1", isWide && "pt-0")}>
                <RepoList
                  repos={stats.topRepos}
                  theme={theme}
                  accentHex={accent.hex}
                  error={reposError}
                  compact={isCompact}
                />
              </div>
            )}
          </div>
        </div>

        {customization.showFooter && (
          <div
            className={cn(
              "relative z-10 px-6 py-3 text-center",
              theme.footer,
              isCompact ? fonts.small : fonts.small
            )}
          >
            {customization.footerText.trim() || "Generated with DevCard Generator"}
            {isDemo && " · Demo preview"}
          </div>
        )}
      </div>
    );
  }
);
