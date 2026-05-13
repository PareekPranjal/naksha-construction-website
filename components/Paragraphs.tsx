import { cn } from "@/lib/utils";
import { RichText } from "./RichText";

/**
 * Render a multi-line text field as a sequence of <p> tags.
 * Treats every line break (single or double) as a paragraph boundary so that
 * editors who type Enter once still get visual paragraphs.
 *
 * Defaults render the body-text style used across the site.
 */
export async function Paragraphs({
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
  // Rich-text HTML (from the admin editor) → delegate to RichText so internal
  // links, headings, iframes etc. render correctly. `raw` skips the prose
  // wrapper so existing layouts don't shift.
  if (/<[a-z!\/]/i.test(text)) {
    return (
      <div className={cn(className, paragraphClassName)}>
        <RichText html={text} raw />
      </div>
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
