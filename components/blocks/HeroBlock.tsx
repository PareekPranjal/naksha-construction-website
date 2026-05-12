import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Paragraphs } from "../Paragraphs";
import type { HeroBlockData } from "./types";

export function HeroBlock({ block }: { block: HeroBlockData }) {
  return (
    <section className="relative isolate overflow-hidden bg-ink text-paper">
      {block.image && (
        <>
          <Image
            src={block.image}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-70"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-ink/40 via-ink/40 to-ink/85" />
        </>
      )}
      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-7xl flex-col justify-end px-6 pb-20 pt-32 md:pb-28 md:pt-40 lg:px-8 lg:pb-32">
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
