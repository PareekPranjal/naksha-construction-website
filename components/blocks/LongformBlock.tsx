import { SectionContainer } from "../SectionContainer";
import { RichText } from "../RichText";
import type { LongformBlockData } from "./types";

export function LongformBlock({ block }: { block: LongformBlockData }) {
  if (!block.body) return null;
  return (
    <SectionContainer size="md">
      <article className="mx-auto max-w-reading">
        <RichText html={block.body} className="prose-p:mt-6 prose-p:first:mt-0 prose-p:text-body prose-p:leading-relaxed prose-p:text-concrete-text" />
      </article>
    </SectionContainer>
  );
}
