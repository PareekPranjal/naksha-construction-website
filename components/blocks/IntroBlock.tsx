import { SectionContainer, Eyebrow } from "../SectionContainer";
import { Paragraphs } from "../Paragraphs";
import type { IntroBlockData } from "./types";

// Strip the wrapping <p>…</p> off a paragraph and normalize whitespace so the
// inner inline HTML (links, <strong>, <em>, …) can be dropped into the styled
// lead <p>. Real HTML stays as HTML — only the outer paragraph wrapper goes.
function unwrapParagraph(s: string): string {
  let inner = s.trim();
  const m = inner.match(/^<p\b[^>]*>([\s\S]*)<\/p>\s*$/i);
  if (m) inner = m[1];
  return inner.replace(/&nbsp;/gi, " ").replace(/ /g, " ").trim();
}

/**
 * Split a body into (leadHtml, rest) — lead is the first paragraph as inline
 * HTML (preserves links, emphasis, etc.), rest is everything after.
 * Plain text: split on blank lines. HTML: split on the first </p>.
 */
function splitLead(body: string): { lead: string; rest: string | null; leadIsHtml: boolean } {
  const trimmed = body.trim();
  if (/<[a-z!\/]/i.test(trimmed)) {
    const m = trimmed.match(/^([\s\S]*?<\/p>)([\s\S]*)$/i);
    if (m) {
      const rest = m[2].trim();
      return { lead: unwrapParagraph(m[1]), rest: rest || null, leadIsHtml: true };
    }
    return { lead: unwrapParagraph(trimmed), rest: null, leadIsHtml: true };
  }
  const parts = trimmed.split(/\n{2,}/);
  if (parts.length < 2) {
    const lines = trimmed.split(/\n/).filter(Boolean);
    if (lines.length < 2) return { lead: trimmed, rest: null, leadIsHtml: false };
    return { lead: lines[0], rest: lines.slice(1).join("\n\n"), leadIsHtml: false };
  }
  return { lead: parts[0], rest: parts.slice(1).join("\n\n"), leadIsHtml: false };
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
  const { lead, rest, leadIsHtml } = splitLead(block.body);
  // Lead paragraph styling — plus brand-green link styling for any inline
  // <a> the editor put inside the first paragraph.
  const leadClass =
    "serif mt-6 text-[28px] leading-[1.25] tracking-tight text-ink md:text-[40px] md:leading-[1.15] [&_a]:text-accent [&_a]:underline [&_a]:underline-offset-4 [&_a]:decoration-accent/40 hover:[&_a]:text-accent-hi hover:[&_a]:decoration-accent-hi [&_a]:transition-colors";
  return (
    <SectionContainer size="md">
      <div className="max-w-reading">
        {block.heading && <Eyebrow>{block.heading}</Eyebrow>}
        {leadIsHtml ? (
          <p className={leadClass} dangerouslySetInnerHTML={{ __html: lead }} />
        ) : (
          <p className={leadClass}>{lead}</p>
        )}
        {rest && (
          <div className="mt-7 text-[17px] leading-[1.75] text-ink/80 md:text-[18px]">
            <Paragraphs text={rest} as="div" paragraphClassName="mt-5 first:mt-0" />
          </div>
        )}
      </div>
    </SectionContainer>
  );
}
