import { SectionContainer, Eyebrow } from "../SectionContainer";
import { Paragraphs } from "../Paragraphs";
import type { IntroBlockData } from "./types";

export function IntroBlock({ block }: { block: IntroBlockData }) {
  return (
    <SectionContainer size="md">
      <div className="max-w-reading">
        {block.heading && <Eyebrow>{block.heading}</Eyebrow>}
        <div className="mt-5 text-lead text-concrete-text">
          <Paragraphs text={block.body} as="div" paragraphClassName="text-lead text-concrete-text" />
        </div>
      </div>
    </SectionContainer>
  );
}
