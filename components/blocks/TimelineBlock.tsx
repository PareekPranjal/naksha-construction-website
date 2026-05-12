import { SectionContainer, Eyebrow } from "../SectionContainer";
import { Paragraphs } from "../Paragraphs";
import type { TimelineBlockData } from "./types";

export function TimelineBlock({ block }: { block: TimelineBlockData }) {
  const items = block.items ?? [];
  if (!items.length) return null;
  return (
    <SectionContainer size="lg">
      <Eyebrow>Our story</Eyebrow>
      <h2 className="serif mt-6 text-h1">A decade of builds.</h2>
      <ol className="relative mt-16 space-y-14 border-l border-rule-ink pl-10">
        {items.map((it, i) => (
          <li key={i} className="relative">
            <span className="absolute -left-[45px] top-1 inline-flex h-3 w-3 rounded-full bg-accent" />
            <p className="eyebrow text-accent">{it.year}</p>
            <h3 className="serif mt-3 text-h3 text-ink">{it.title}</h3>
            <div className="mt-3 text-body text-concrete-text">
              <Paragraphs text={it.body} as="div" paragraphClassName="text-concrete-text" />
            </div>
          </li>
        ))}
      </ol>
    </SectionContainer>
  );
}
