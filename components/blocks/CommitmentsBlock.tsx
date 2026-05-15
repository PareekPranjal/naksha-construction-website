import Image from "next/image";
import { SectionContainer, Eyebrow } from "../SectionContainer";
import { Paragraphs } from "../Paragraphs";
import type { CommitmentsBlockData } from "./types";

export function CommitmentsBlock({ block }: { block: CommitmentsBlockData }) {
  const items = block.items ?? [];
  if (!items.length) return null;
  return (
    <SectionContainer size="lg">
      <Eyebrow>Commitments</Eyebrow>
      <div className="mt-14 grid grid-cols-1 gap-x-12 gap-y-16 md:grid-cols-2">
        {items.map((c, i) => (
          <article key={c.key ?? i} className="overflow-hidden rounded-card border border-rule-ink bg-paper">
            {c.image && (
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-ink/5">
                <Image
                  src={c.image}
                  alt={c.imageAlt || c.title || ""}
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
            )}
            <div className="p-8 md:p-10">
              <h3 className="serif text-h2 text-ink">{c.title}</h3>
              {c.body && (
                <div className="mt-6 text-body text-concrete-text">
                  <Paragraphs text={c.body} as="div" paragraphClassName="text-concrete-text" />
                </div>
              )}
            </div>
          </article>
        ))}
      </div>
    </SectionContainer>
  );
}
