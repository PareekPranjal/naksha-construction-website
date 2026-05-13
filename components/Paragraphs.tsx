import { cn } from "@/lib/utils";

// Tailwind classes applied to <a> tags rendered from HTML rich-text. Mirrors
// the brand link styling used by the server-side <RichText> renderer.
const HTML_LINK_STYLES =
  "[&_a]:text-accent [&_a]:underline [&_a]:underline-offset-4 [&_a]:decoration-accent/40 hover:[&_a]:text-accent-hi hover:[&_a]:decoration-accent-hi [&_a]:transition-colors";

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
        className={cn(className, paragraphClassName, HTML_LINK_STYLES)}
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
              "leading-relaxed text-concrete-text",
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
            "leading-relaxed",
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
