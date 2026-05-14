import { cn } from "@/lib/utils";

// Typography for HTML-rich-text content: headings, lists, emphasis, quotes
// and links — all styled via Tailwind descendant selectors so the same
// rendered <div> works whether the source is plain text or full HTML.
const HTML_PROSE_STYLES = [
  // paragraphs — larger, more readable body text in near-ink instead of gray
  "[&_p]:mt-6 [&_p:first-child]:mt-0",
  "[&_p]:text-[17px] md:[&_p]:text-[18px] [&_p]:leading-[1.75] [&_p]:text-ink/85",
  // headings (serif, brand ink) — tighter to their following paragraph
  "[&_h1]:serif [&_h1]:text-h1 [&_h1]:text-ink [&_h1]:mt-14 [&_h1]:mb-4 [&_h1:first-child]:mt-0 [&_h1]:tracking-tight",
  "[&_h2]:serif [&_h2]:text-h2 [&_h2]:text-ink [&_h2]:mt-14 [&_h2]:mb-4 [&_h2:first-child]:mt-0 [&_h2]:tracking-tight",
  "[&_h3]:serif [&_h3]:text-h3 [&_h3]:text-ink [&_h3]:mt-12 [&_h3]:mb-3 [&_h3:first-child]:mt-0",
  "[&_h4]:serif [&_h4]:text-h4 [&_h4]:text-ink [&_h4]:mt-10 [&_h4]:mb-2 [&_h4:first-child]:mt-0",
  "[&_h5]:font-semibold [&_h5]:text-ink [&_h5]:mt-8 [&_h5]:mb-2",
  "[&_h6]:font-semibold [&_h6]:text-ink [&_h6]:mt-8 [&_h6]:mb-2 [&_h6]:uppercase [&_h6]:tracking-wider [&_h6]:text-body-sm",
  // lists — larger text, generous spacing, brand-accent markers
  "[&_ul]:my-6 [&_ul]:pl-6 [&_ul]:list-disc [&_ul_ul]:my-2",
  "[&_ol]:my-6 [&_ol]:pl-6 [&_ol]:list-decimal [&_ol_ol]:my-2",
  "[&_li]:mt-2 [&_li]:text-[17px] md:[&_li]:text-[18px] [&_li]:leading-[1.7] [&_li]:text-ink/85 [&_li:first-child]:mt-0 [&_li::marker]:text-accent [&_li::marker]:font-semibold",
  // emphasis
  "[&_strong]:text-ink [&_strong]:font-semibold",
  "[&_em]:italic",
  // quotes + code
  "[&_blockquote]:my-10 [&_blockquote]:border-l-2 [&_blockquote]:border-accent [&_blockquote]:pl-6 [&_blockquote]:serif [&_blockquote]:text-h3 [&_blockquote]:text-ink [&_blockquote]:leading-snug",
  "[&_code]:rounded-md [&_code]:bg-rule-ink/30 [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:text-[0.92em]",
  "[&_pre]:my-6 [&_pre]:overflow-x-auto [&_pre]:rounded-card [&_pre]:bg-ink [&_pre]:p-4 [&_pre]:text-paper",
  "[&_hr]:my-12 [&_hr]:border-rule-ink",
  // images + iframes (videos)
  "[&_img]:my-8 [&_img]:rounded-card",
  "[&_iframe]:my-8 [&_iframe]:w-full [&_iframe]:rounded-card",
  // links (brand green)
  "[&_a]:text-accent [&_a]:underline [&_a]:underline-offset-4 [&_a]:decoration-accent/40 hover:[&_a]:text-accent-hi hover:[&_a]:decoration-accent-hi [&_a]:transition-colors",
].join(" ");

/**
 * Render a multi-line text field as a sequence of <p> tags.
 * Treats every line break (single or double) as a paragraph boundary so that
 * editors who type Enter once still get visual paragraphs.
 *
 * Defaults render the body-text style used across the site.
 *
 * Stays synchronous so it can be used from both server and client components.
 * Server-only pages that need internal-link slug resolution should call
 * <RichText> directly instead.
 */
export function Paragraphs({
  text,
  className,
  paragraphClassName,
  as: Tag = "p",
}: {
  text: string | null | undefined;
  className?: string;
  paragraphClassName?: string;
  as?: "p" | "div";
}) {
  if (!text) return null;
  // Rich-text HTML (from the admin editor) → render as innerHTML. Content is
  // already sanitized server-side. Strip stray &nbsp;/U+00A0 so words wrap.
  if (/<[a-z!\/]/i.test(text)) {
    const cleaned = text.replace(/&nbsp;/gi, " ").replace(/ /g, " ");
    return (
      <div
        className={cn(className, paragraphClassName, HTML_PROSE_STYLES)}
        dangerouslySetInnerHTML={{ __html: cleaned }}
      />
    );
  }
  const paragraphs = text.split(/\n+/).map((s) => s.trim()).filter(Boolean);
  if (paragraphs.length === 0) return null;
  if (Tag === "div") {
    return (
      <div className={className}>
        {paragraphs.map((p, i) => (
          <p
            key={i}
            className={cn(
              "text-[17px] leading-[1.75] text-ink/85 md:text-[18px]",
              i > 0 && "mt-5",
              paragraphClassName,
            )}
          >
            {p}
          </p>
        ))}
      </div>
    );
  }
  // Single paragraph — render a single <p> for callers that explicitly
  // expected a paragraph element with className.
  if (paragraphs.length === 1) {
    return <p className={cn(className, paragraphClassName)}>{paragraphs[0]}</p>;
  }
  return (
    <>
      {paragraphs.map((p, i) => (
        <p
          key={i}
          className={cn(
            i === 0 ? className : undefined,
            "text-[17px] leading-[1.75] md:text-[18px]",
            i > 0 && "mt-5",
            paragraphClassName,
          )}
        >
          {p}
        </p>
      ))}
    </>
  );
}
