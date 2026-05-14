import { SectionContainer } from "../SectionContainer";
import { Paragraphs } from "../Paragraphs";
import type { LongformBlockData } from "./types";

export function LongformBlock({ block }: { block: LongformBlockData }) {
  if (!block.body) return null;
  return (
    <SectionContainer size="md">
      <article className="mx-auto max-w-reading text-body leading-relaxed text-concrete-text">
        <Paragraphs text={block.body} as="div" />
      </article>
    </SectionContainer>
  );
}
