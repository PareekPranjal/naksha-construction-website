import Image from "next/image";
import { SectionContainer, Eyebrow } from "../SectionContainer";
import { Paragraphs } from "../Paragraphs";
import type { GalleryBlockData } from "./types";

const COLS: Record<NonNullable<GalleryBlockData["columns"]>, string> = {
  2: "md:grid-cols-2",
  3: "md:grid-cols-3",
  4: "md:grid-cols-4",
};

export function GalleryBlock({ block }: { block: GalleryBlockData }) {
  const items = (block.items ?? []).filter((it) => it && it.url);
  if (items.length === 0) return null;
  const colClass = COLS[block.columns ?? 3];
  return (
    <SectionContainer size="lg">
      {block.heading && <Eyebrow>{block.heading}</Eyebrow>}
      {block.intro && (
        <div className="mt-4 max-w-reading text-lead text-concrete-text">
          <Paragraphs text={block.intro} as="div" paragraphClassName="text-lead text-concrete-text" />
        </div>
      )}
      <div className={`mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 ${colClass}`}>
        {items.map((it, i) => (
          <figure
            key={i}
            className="group relative aspect-[4/3] overflow-hidden rounded-card bg-ink/5"
          >
            <Image
              src={it.url}
              alt={it.alt ?? ""}
              fill
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              className="object-cover transition-transform duration-700 ease-out-expo group-hover:scale-[1.04]"
            />
            {it.alt && (
              <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/70 to-transparent p-4 text-body-sm text-paper opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                {it.alt}
              </figcaption>
            )}
          </figure>
        ))}
      </div>
    </SectionContainer>
  );
}
