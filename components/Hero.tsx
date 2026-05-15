"use client";

import Link from "next/link";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import { useRef } from "react";
import { SITE } from "@/lib/site";

export function Hero({
  eyebrow = "Naksha Construction",
  headline,
  sub,
  primaryCta = { label: "Start a Project", href: "/contact" },
  secondaryCta = { label: "View our work", href: "/projects" },
  posterUrl,
  posterAlt = "",
}: {
  eyebrow?: string;
  headline: string;
  sub: string;
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  /** Admin-controlled poster image (siteSettings.heroImages.homePoster). */
  posterUrl?: string;
  posterAlt?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 600], [0, reduce ? 0 : 120]);
  const poster = posterUrl || SITE.heroPosterImage;
  const alt = posterAlt || "Construction site";

  return (
    <section
      ref={ref}
      className="relative h-[100svh] min-h-[640px] w-full overflow-hidden bg-ink text-paper"
    >
      <motion.div style={{ y }} className="absolute inset-0">
        {SITE.heroVideoUrl ? (
          <video
            className="h-full w-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            poster={poster}
          >
            <source src={SITE.heroVideoUrl} type="video/mp4" />
          </video>
        ) : (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={poster}
            alt={alt}
            className="h-full w-full object-cover"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-ink/30 via-ink/40 to-ink/70" />
      </motion.div>

      <div className="relative z-10 flex h-full flex-col justify-end pb-24 md:pb-32">
        <div className="wrap">
          <motion.div
            initial={reduce ? { opacity: 1 } : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.2, 0.7, 0.2, 1] }}
            className="max-w-3xl"
          >
            <p className="eyebrow text-accent">{eyebrow}</p>
            <h1 className="serif mt-5 text-display-lg md:text-display-xl">
              {headline}
            </h1>
            <p className="mt-6 max-w-xl text-lead text-paper/85">{sub}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href={primaryCta.href}
                className="inline-flex items-center gap-2 rounded-card bg-accent px-6 py-3 text-button text-paper hover:bg-accent-hi"
              >
                {primaryCta.label} <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href={secondaryCta.href}
                className="inline-flex items-center gap-2 rounded-card border border-paper/40 px-6 py-3 text-button text-paper hover:border-paper"
              >
                {secondaryCta.label}
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-6 z-10 flex justify-center">
        <div className="flex flex-col items-center gap-2 text-paper/70">
          <span className="eyebrow">Scroll</span>
          <ChevronDown className="h-4 w-4 animate-scroll-bounce" />
        </div>
      </div>
    </section>
  );
}
