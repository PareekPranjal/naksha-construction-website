import { SectionContainer, Eyebrow } from "../SectionContainer";
import { Paragraphs } from "../Paragraphs";
import type { IntroBlockData } from "./types";

export function IntroBlock({ block }: { block: IntroBlockData }) {
  return (
    <SectionContainer size="md">
      <div className="max-w-reading">
        {block.heading && <Eyebrow>{block.heading}</Eyebrow>}
        {/*
          Editorial typography: first paragraph rendered as a serif lead in
          ink, subsequent paragraphs in body-size concrete-text. Works for
          plain text (split on \n) and for HTML rich-text bodies — Tailwind's
          arbitrary `:first-child` selector targets the first <p> either way.
        */}
        <div
          className={[
            "mt-6",
            "[&>p:first-child]:serif [&>p:first-child]:text-h3 [&>p:first-child]:leading-[1.3] [&>p:first-child]:text-ink md:[&>p:first-child]:text-h2",
            "[&>p:not(:first-child)]:mt-6 [&>p:not(:first-child)]:text-body [&>p:not(:first-child)]:text-concrete-text [&>p:not(:first-child)]:leading-relaxed",
          ].join(" ")}
        >
          <Paragraphs text={block.body} as="div" />
        </div>
      </div>
    </SectionContainer>
  );
}
