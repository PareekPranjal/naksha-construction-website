import Link from "next/link";
import React from "react";
import { parseDocument } from "htmlparser2";
import type { ChildNode, Document, Element, Text } from "domhandler";
import DOMPurify from "isomorphic-dompurify";
import { buildInternalUrl, isInternalDocType, type InternalDocType } from "@/lib/internalUrl";

const API = process.env.NEXT_PUBLIC_API_URL ?? process.env.API_URL ?? "http://localhost:4000";

type ResolvedLink = { id: string; type: InternalDocType; title: string; slug: string; url: string };

async function resolveInternal(refs: { id: string; type: InternalDocType }[]): Promise<Record<string, ResolvedLink>> {
  if (refs.length === 0) return {};
  try {
    const res = await fetch(`${API}/internal-links/resolve`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refs }),
      next: { revalidate: 60 },
    });
    if (!res.ok) return {};
    return (await res.json()) as Record<string, ResolvedLink>;
  } catch {
    return {};
  }
}

function collectInternalRefs(node: Document | ChildNode, out: Map<string, { id: string; type: InternalDocType }>): void {
  if ("children" in node && Array.isArray((node as Document | Element).children)) {
    for (const c of (node as Document | Element).children) collectInternalRefs(c, out);
  }
  if (node.type === "tag") {
    const el = node as Element;
    if (el.name === "a" && el.attribs["data-internal"] === "true") {
      const id = el.attribs["data-doc-id"];
      const t = el.attribs["data-doc-type"];
      if (id && t && isInternalDocType(t)) out.set(`${t}:${id}`, { id, type: t });
    }
  }
}

function textContent(el: Element): string {
  let s = "";
  const walk = (n: ChildNode) => {
    if (n.type === "text") s += (n as Text).data;
    else if ("children" in n) (n as Element).children.forEach(walk);
  };
  el.children.forEach(walk);
  return s;
}

function slugify(s: string): string {
  return s
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80) || undefined as unknown as string;
}

// Brand link styling — matches the site's accent (secondary green) palette.
const LINK_CLASS =
  "text-accent underline underline-offset-4 decoration-accent/40 hover:text-accent-hi hover:decoration-accent-hi transition-colors";

const VOID_TAGS = new Set(["br", "hr", "img"]);
const ALLOWED_TAGS = new Set([
  "p", "br", "strong", "b", "em", "i", "u", "s", "del", "ins", "span",
  "a", "ol", "ul", "li", "blockquote", "pre", "code",
  "h1", "h2", "h3", "h4", "h5", "h6",
  "sub", "sup", "img", "iframe", "figure", "figcaption", "hr",
  "div",
]);

const SAFE_STYLE_PROPS = new Set([
  "color", "background-color", "text-align", "padding-left",
]);

function cleanStyle(style: string | undefined): React.CSSProperties | undefined {
  if (!style) return undefined;
  const out: Record<string, string> = {};
  for (const part of style.split(";")) {
    const [k, ...vs] = part.split(":");
    const key = k?.trim().toLowerCase();
    const value = vs.join(":").trim();
    if (!key || !value) continue;
    if (!SAFE_STYLE_PROPS.has(key)) continue;
    if (/javascript:|expression\(|url\(/i.test(value)) continue;
    const reactKey = key.replace(/-([a-z])/g, (_, ch) => ch.toUpperCase());
    out[reactKey] = value;
  }
  return Object.keys(out).length ? (out as React.CSSProperties) : undefined;
}

function renderNode(
  node: ChildNode,
  ctx: { resolved: Record<string, ResolvedLink>; keyPath: string },
): React.ReactNode {
  if (node.type === "text") return (node as Text).data;
  if (node.type !== "tag") return null;
  const el = node as Element;
  const tag = el.name.toLowerCase();
  if (!ALLOWED_TAGS.has(tag)) return null;

  const children = el.children.map((c, i) =>
    renderNode(c, { ...ctx, keyPath: `${ctx.keyPath}.${i}` }),
  );
  const key = ctx.keyPath;
  const style = cleanStyle(el.attribs.style);
  const className = el.attribs.class || undefined;

  // Internal link → Next Link with resolved URL
  if (tag === "a" && el.attribs["data-internal"] === "true") {
    const docId = el.attribs["data-doc-id"];
    const docType = el.attribs["data-doc-type"];
    const stored = el.attribs.href || "#";
    const resolvedHit = docId && docType ? ctx.resolved[`${docType}:${docId}`] : undefined;
    if (!resolvedHit && docId) {
      // Doc no longer exists → render plain text
      return <span key={key}>{children}</span>;
    }
    const href = resolvedHit?.url ?? stored;
    return (
      <Link key={key} href={href} className={`${LINK_CLASS} ${className ?? ""}`.trim()}>
        {children}
      </Link>
    );
  }

  if (tag === "a") {
    const href = el.attribs.href || "#";
    const isExternal = /^https?:\/\//i.test(href);
    if (isExternal) {
      return (
        <a
          key={key}
          href={href}
          rel="noopener noreferrer"
          target="_blank"
          className={`${LINK_CLASS} ${className ?? ""}`.trim()}
          style={style}
        >
          {children}
        </a>
      );
    }
    return (
      <Link key={key} href={href} className={`${LINK_CLASS} ${className ?? ""}`.trim()}>
        {children}
      </Link>
    );
  }

  if (tag === "iframe") {
    const src = el.attribs.src || "";
    return (
      <div key={key} className="relative my-6 aspect-video w-full overflow-hidden rounded-md bg-black/5">
        <iframe
          src={src}
          allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          loading="lazy"
          className="absolute inset-0 h-full w-full border-0"
        />
      </div>
    );
  }

  if (tag === "img") {
    const src = el.attribs.src || "";
    const alt = el.attribs.alt || "";
    return (
      <img
        key={key}
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        className={className}
        style={style}
      />
    );
  }

  if (tag === "br" || tag === "hr") {
    return tag === "br" ? <br key={key} /> : <hr key={key} />;
  }

  if (/^h[1-6]$/.test(tag)) {
    const HTag = tag as "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
    const id = slugify(textContent(el));
    return React.createElement(HTag, { key, id, className, style }, children);
  }

  if (VOID_TAGS.has(tag)) {
    return React.createElement(tag, { key, className, style });
  }

  return React.createElement(tag, { key, className, style }, children);
}

type Props = {
  html: string | null | undefined;
  /** Extra classes appended to the wrapping prose container. */
  className?: string;
  /** Disable the prose typography wrapper if you want raw output. */
  raw?: boolean;
};

export async function RichText({ html, className, raw }: Props) {
  if (!html || typeof html !== "string") return null;
  const trimmed = html.trim();
  if (!trimmed) return null;

  // Plain text (no HTML tags) → wrap paragraphs by blank lines so old data still renders.
  const hasHtml = /<[a-z!\/]/i.test(trimmed);
  if (!hasHtml) {
    const paragraphs = trimmed.split(/\n{2,}/).map((p) => p.trim()).filter(Boolean);
    const content = paragraphs.map((p, i) => <p key={i}>{p}</p>);
    return raw ? <>{content}</> : <div className={`prose prose-neutral max-w-none ${className ?? ""}`}>{content}</div>;
  }

  // Old plain-text imports got every space converted to &nbsp; by the Quill
  // editor on first save. Normalize back to regular spaces so words wrap.
  // Keep an intentional single &nbsp; if surrounded by punctuation that
  // suggests deliberate use (rare in this CMS — collapse everywhere).
  const normalizedHtml = trimmed.replace(/&nbsp;/gi, " ").replace(/ /g, " ");

  const clean = DOMPurify.sanitize(normalizedHtml, {
    ALLOWED_TAGS: Array.from(ALLOWED_TAGS),
    ALLOWED_ATTR: [
      "href", "src", "alt", "title", "class", "style", "target", "rel",
      "data-internal", "data-doc-id", "data-doc-type",
      "allowfullscreen", "frameborder", "allow", "width", "height", "loading",
    ],
    ALLOW_DATA_ATTR: false,
  });

  const dom = parseDocument(clean);
  const refMap = new Map<string, { id: string; type: InternalDocType }>();
  collectInternalRefs(dom, refMap);
  const resolved = await resolveInternal(Array.from(refMap.values()));

  const tree = dom.children.map((c, i) =>
    renderNode(c, { resolved, keyPath: String(i) }),
  );

  if (raw) return <>{tree}</>;
  return (
    <div
      className={`prose prose-neutral max-w-none prose-headings:scroll-mt-24 prose-a:text-accent prose-a:no-underline hover:prose-a:text-accent-hi ${className ?? ""}`}
    >
      {tree}
    </div>
  );
}
