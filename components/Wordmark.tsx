"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { useSiteShell } from "@/lib/site-context";

export function Wordmark({
  className,
  variant = "ink",
}: {
  className?: string;
  variant?: "ink" | "paper";
}) {
  const { siteSettings } = useSiteShell();
  // Pick logo by variant — paper variant means we're on a dark background.
  const logo = variant === "paper" ? siteSettings.logoLight : siteSettings.logoDark;

  return (
    <Link
      href="/"
      className={cn(
        "inline-flex items-center",
        logo ? "" : "serif gap-1 text-[22px] tracking-tight",
        !logo && (variant === "paper" ? "text-paper" : "text-ink"),
        className,
      )}
      aria-label={`${siteSettings.name} — home`}
    >
      {logo ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={logo} alt={siteSettings.name} className="h-8 w-auto" />
      ) : (
        <>
          <span className="font-semibold">{siteSettings.wordmark}</span>
          <span className="text-accent">.</span>
        </>
      )}
    </Link>
  );
}
