import { SectionContainer, Eyebrow } from "../SectionContainer";
import { Paragraphs } from "../Paragraphs";
import type { IntroBlockData } from "./types";

// Extract plain text from a string that may contain HTML — strips tags so the
// lead paragraph renders cleanly as a single styled <p> instead of inheriting
// the prose rules.
function stripTags(s: string): string {
  return s
    .replace(/<\/?[^>]+>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * Split a body into (leadText, rest) — lead is the first paragraph as plain
 * text, rest is everything after. Plain text: split on blank lines. HTML:
 * split on the first </p>.
 */
function splitLead(body: string): { lead: string; rest: string | null } {
  const trimmed = body.trim();
  if (/<[a-z!\/]/i.test(trimmed)) {
    const m = trimmed.match(/^([\s\S]*?<\/p>)([\s\S]*)$/i);
    if (m) {
      const rest = m[2].trim();
      return { lead: stripTags(m[1]), rest: rest || null };
    }
    return { lead: stripTags(trimmed), rest: null };
  }
  const parts = trimmed.split(/\n{2,}/);
  if (parts.length < 2) {
    const lines = trimmed.split(/\n/).filter(Boolean);
    if (lines.length < 2) return { lead: trimmed, rest: null };
    return { lead: lines[0], rest: lines.slice(1).join("\n\n") };
  }
  return { lead: parts[0], rest: parts.slice(1).join("\n\n") };
}

export function IntroBlock({ block }: { block: IntroBlockData }) {
  if (!block.body) {
    return (
      <SectionContainer size="md">
        <div className="max-w-reading">
          {block.heading && <Eyebrow>{block.heading}</Eyebrow>}
        </div>
      </SectionContainer>
    );
  }
  const { lead, rest } = splitLead(block.body);
  return (
    <SectionContainer size="md">
      <div className="max-w-reading">
        {block.heading && <Eyebrow>{block.heading}</Eyebrow>}
        <p className="serif mt-6 text-[28px] leading-[1.25] tracking-tight text-ink md:text-[40px] md:leading-[1.15]">
          {lead}
        </p>
        {rest && (
          <div className="mt-7 text-[17px] leading-[1.75] text-ink/80 md:text-[18px]">
            <Paragraphs text={rest} as="div" paragraphClassName="mt-5 first:mt-0" />
          </div>
        )}
      </div>
    </SectionContainer>
  );
}
