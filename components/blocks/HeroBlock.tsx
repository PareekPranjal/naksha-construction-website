import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Paragraphs } from "../Paragraphs";
import type { HeroBlockData } from "./types";

const SIZE_CLASSES: Record<NonNullable<HeroBlockData["size"]>, string> = {
  full: "min-h-screen pb-20 pt-32 md:pb-28 md:pt-40 lg:pb-32",
  lg: "min-h-[78vh] pb-16 pt-28 md:pb-24 md:pt-36",
  md: "min-h-[55vh] pb-12 pt-24 md:pb-20 md:pt-28",
  sm: "min-h-[40vh] pb-10 pt-20 md:pb-14 md:pt-24",
};

export function HeroBlock({ block }: { block: HeroBlockData }) {
  const sizeClass = SIZE_CLASSES[block.size ?? "full"];
  return (
    <section className="relative isolate overflow-hidden bg-ink text-paper">
      {block.image && (
        <>
          <Image
            src={block.image}
            alt={block.imageAlt ?? ""}
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-70"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-ink/40 via-ink/40 to-ink/85" />
        </>
      )}
      <div className={`relative z-10 mx-auto flex w-full max-w-7xl flex-col justify-end px-6 lg:px-8 ${sizeClass}`}>
        {block.eyebrow && (
          <p className="eyebrow text-accent">{block.eyebrow}</p>
        )}
        {block.title && (
          <h1 className="serif mt-6 max-w-4xl text-display-lg leading-[1.05] md:text-[88px]">
            {block.title}
          </h1>
        )}
        {block.subtitle && (
          <div className="mt-8 max-w-2xl text-lead text-paper/85">
            <Paragraphs text={block.subtitle} as="div" paragraphClassName="text-paper/85" />
          </div>
        )}
        {block.ctaLabel && block.ctaHref && (
          <div className="mt-12">
            <Link
              href={block.ctaHref}
              className="inline-flex items-center gap-2 rounded-card bg-accent px-7 py-4 text-button text-paper hover:bg-accent-hi"
            >
              {block.ctaLabel} <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
