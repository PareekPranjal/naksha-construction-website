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
          <article key={c.key ?? i} className="rounded-card border border-rule-ink bg-paper p-10">
            <h3 className="serif text-h2 text-ink">{c.title}</h3>
            <div className="mt-6 text-body text-concrete-text">
              <Paragraphs text={c.body} as="div" paragraphClassName="text-concrete-text" />
            </div>
          </article>
        ))}
      </div>
    </SectionContainer>
  );
}
