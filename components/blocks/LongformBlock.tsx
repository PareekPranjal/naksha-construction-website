import { SectionContainer } from "../SectionContainer";
import type { LongformBlockData } from "./types";

export function LongformBlock({ block }: { block: LongformBlockData }) {
  if (!block.body) return null;
  const paragraphs = block.body.split(/\n+/).map((s) => s.trim()).filter(Boolean);
  return (
    <SectionContainer size="md">
      <article className="mx-auto max-w-reading">
        {paragraphs.map((p, i) => (
          <p key={i} className="mt-6 text-body leading-relaxed text-concrete-text first:mt-0">
            {p}
          </p>
        ))}
      </article>
    </SectionContainer>
  );
}
