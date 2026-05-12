import type { Metadata } from "next";
import { SITE } from "./site";
import type { ApiPage } from "./api";

type Args = {
  title: string;
  description?: string;
  path?: string;
  image?: string;
  page?: ApiPage | null;
  defaults?: SeoDefaults;
};

export type SeoDefaults = {
  titleTemplate?: string; // "%s — Naksha"
  description?: string;
  keywords?: string;
  robots?: string;
  ogImage?: string;
  twitterHandle?: string;
  googleVerification?: string;
};

export function pageMetadata({ title, description, path = "/", image, page, defaults }: Args): Metadata {
  // Resolve title
  const baseTitle = page?.seoTitle || title;
  const tpl = defaults?.titleTemplate || `%s — ${SITE.name}`;
  const fullTitle = baseTitle === SITE.name ? baseTitle : tpl.replace("%s", baseTitle);

  // Resolve description
  const desc =
    page?.seoDescription ||
    description ||
    defaults?.description ||
    "Naksha Construction — Jaipur-based construction services for residential and commercial projects across Rajasthan.";

  // URL + canonical
  const baseUrl = SITE.url;
  const url = `${baseUrl}${path}`;
  const canonical = page?.seoCanonical || url;

  // Image fallback chain: page.ogImage → arg.image → defaults.ogImage → placeholder
  const ogImage =
    page?.seoOgImage ||
    image ||
    defaults?.ogImage ||
    "https://placehold.co/1200x630/0E0E0E/F5F1EC?text=Naksha+Construction";

  // Open Graph (per-page overrides → fall back)
  const ogTitle = page?.ogTitle || fullTitle;
  const ogDescription = page?.ogDescription || desc;
  const ogType = (page?.ogType as "website" | "article" | undefined) || "website";

  // Twitter (per-page overrides → fall back)
  const twitterCard = (page?.twitterCard as "summary" | "summary_large_image" | undefined) || "summary_large_image";
  const twitterTitle = page?.twitterTitle || ogTitle;
  const twitterDescription = page?.twitterDescription || ogDescription;
  const twitterImage = page?.twitterImage || ogImage;

  // Robots / keywords
  const robots = page?.seoRobots || defaults?.robots;
  const keywords = page?.seoKeywords || defaults?.keywords;

  const meta: Metadata = {
    title: fullTitle,
    description: desc,
    metadataBase: new URL(baseUrl),
    alternates: { canonical },
    openGraph: {
      title: ogTitle,
      description: ogDescription,
      url,
      siteName: SITE.name,
      images: [{ url: ogImage, width: 1200, height: 630 }],
      type: ogType,
    },
    twitter: {
      card: twitterCard,
      title: twitterTitle,
      description: twitterDescription,
      images: [twitterImage],
      ...(defaults?.twitterHandle ? { creator: defaults.twitterHandle } : {}),
    },
  };
  if (keywords) meta.keywords = keywords;
  if (robots) meta.robots = robots;
  if (defaults?.googleVerification) {
    meta.verification = { google: defaults.googleVerification };
  }
  return meta;
}
