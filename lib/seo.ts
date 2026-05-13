import type { Metadata } from "next";
import { SITE } from "./site";
import type { ApiPage } from "./api";

// ─── Existing API (kept for backwards compatibility with the 16 routes that
// already call pageMetadata directly). New code should prefer
// generatePageMetadata() and the per-collection generators below.
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
    `${baseUrl}/og-default.jpg`;

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
    alternates: {
      canonical,
      languages: { "en-IN": canonical, "x-default": canonical },
    },
    openGraph: {
      title: ogTitle,
      description: ogDescription,
      url,
      siteName: SITE.name,
      locale: "en_IN",
      images: [{ url: ogImage, width: 1200, height: 630, alt: ogTitle }],
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

// ─────────────────────────────────────────────────────────────────────────────
// New SEO surface — global + per-page fetchers, generators, schema builders
// ─────────────────────────────────────────────────────────────────────────────

const API = process.env.NEXT_PUBLIC_API_URL ?? process.env.API_URL ?? "http://localhost:4000";
const PROD_URL_FALLBACK = "https://naksha-construction-website.vercel.app";

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ?? PROD_URL_FALLBACK;

export type Address = {
  street?: string;
  city?: string;
  state?: string;
  postalCode?: string;
  country?: string;
};

export type GlobalSEO = {
  siteName: string;
  siteUrl: string;
  defaultTitle: string;
  titleTemplate: string;
  defaultDescription: string;
  defaultKeywords: string[];
  defaultOgImage: string;
  favicon: string;
  appleTouchIcon: string;
  socialLinks: {
    facebook?: string;
    twitter?: string;
    instagram?: string;
    linkedin?: string;
    youtube?: string;
    whatsapp?: string;
  };
  contactInfo: {
    phone?: string;
    email?: string;
    address?: Address;
  };
  organizationSchema: {
    type: string;
    name: string;
    logo?: string;
    description?: string;
  };
  localBusiness: {
    telephone?: string;
    email?: string;
    priceRange?: string;
    openingHours?: string[];
    address?: Address;
    geo?: { latitude?: number; longitude?: number };
  };
  faqItems: { question: string; answer: string }[];
  googleSiteVerification: string;
  googleAnalyticsId: string;
  googleTagManagerId: string;
  facebookPixelId: string;
  customHeadScripts: string;
  robotsTxt: string;
};

export type PageSEO = {
  id: string;
  path: string;
  title: string | null;
  description: string | null;
  keywords: string[];
  ogTitle: string | null;
  ogDescription: string | null;
  ogImage: string | null;
  canonicalUrl: string | null;
  noIndex: boolean;
  noFollow: boolean;
};

const DEFAULT_GLOBAL: GlobalSEO = {
  siteName: "Naksha Construction",
  siteUrl: SITE_URL,
  defaultTitle: "Naksha Construction — Building Construction Company in Jaipur",
  titleTemplate: "%s | Naksha Construction",
  defaultDescription:
    "Naksha Construction is a Jaipur-based design-build contractor delivering residential, commercial, industrial and infrastructure projects across Rajasthan and India. Construction management, turnkey delivery, interior fit-out and renovation services.",
  defaultKeywords: [
    "building construction company Jaipur",
    "construction services Jaipur",
    "design-build contractor Rajasthan",
    "commercial construction Jaipur",
    "residential construction Jaipur",
    "turnkey construction Jaipur",
    "interior fit-out Jaipur",
    "renovation contractor Jaipur",
    "industrial construction India",
    "construction management Rajasthan",
  ],
  defaultOgImage: `${SITE_URL}/og-default.jpg`,
  favicon: "",
  appleTouchIcon: "",
  socialLinks: {},
  contactInfo: {
    address: {
      street: "Plot 12, Civil Lines",
      city: "Jaipur",
      state: "Rajasthan",
      postalCode: "302006",
      country: "IN",
    },
  },
  organizationSchema: {
    type: "GeneralContractor",
    name: "Naksha Construction",
    description:
      "Naksha Construction is a building construction, design-build and construction management firm headquartered in Jaipur, India.",
  },
  localBusiness: {
    priceRange: "$$$",
    openingHours: ["Mo-Sa 09:00-18:00"],
    address: {
      street: "Plot 12, Civil Lines",
      city: "Jaipur",
      state: "Rajasthan",
      postalCode: "302006",
      country: "IN",
    },
    geo: { latitude: 26.9124, longitude: 75.7873 },
  },
  faqItems: [],
  googleSiteVerification: "",
  googleAnalyticsId: "",
  googleTagManagerId: "",
  facebookPixelId: "",
  customHeadScripts: "",
  robotsTxt: "",
};

function deepMerge<T extends Record<string, unknown>>(base: T, override: unknown): T {
  if (!override || typeof override !== "object" || Array.isArray(override)) return base;
  const out: Record<string, unknown> = { ...base };
  for (const [k, v] of Object.entries(override as Record<string, unknown>)) {
    const existing = out[k];
    if (
      existing &&
      typeof existing === "object" &&
      !Array.isArray(existing) &&
      v &&
      typeof v === "object" &&
      !Array.isArray(v)
    ) {
      out[k] = deepMerge(existing as Record<string, unknown>, v);
    } else {
      out[k] = v;
    }
  }
  return out as T;
}

async function fetchWithTimeout(url: string, ms: number, revalidate: number): Promise<Response | null> {
  try {
    const res = await fetch(url, {
      signal: AbortSignal.timeout(ms),
      next: { revalidate },
    });
    return res;
  } catch {
    return null;
  }
}

export async function getGlobalSEO(): Promise<GlobalSEO> {
  const res = await fetchWithTimeout(`${API}/api/seo/global`, 3000, 3600);
  if (!res || !res.ok) return DEFAULT_GLOBAL;
  try {
    const data = (await res.json()) as { settings?: Partial<GlobalSEO> };
    return deepMerge(DEFAULT_GLOBAL, data.settings ?? {});
  } catch {
    return DEFAULT_GLOBAL;
  }
}

export async function getPageSEO(path: string): Promise<PageSEO | null> {
  const encoded = encodeURIComponent(path);
  const res = await fetchWithTimeout(`${API}/api/seo/pages/${encoded}`, 3000, 60);
  if (!res || !res.ok) return null;
  try {
    const data = (await res.json()) as { page?: PageSEO | null };
    return data.page ?? null;
  } catch {
    return null;
  }
}

// ─── generatePageMetadata: merge order pageSEO > fallbacks > globalSEO ───────

export type PageMetadataFallbacks = {
  title?: string;
  description?: string;
  keywords?: string[];
  ogImage?: string;
  canonicalUrl?: string;
  noIndex?: boolean;
  noFollow?: boolean;
};

function buildRobots(noIndex?: boolean, noFollow?: boolean): Metadata["robots"] {
  return {
    index: !noIndex,
    follow: !noFollow,
    googleBot: {
      index: !noIndex,
      follow: !noFollow,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  };
}

export async function generatePageMetadata(
  path: string,
  fallbacks: PageMetadataFallbacks = {},
): Promise<Metadata> {
  const [global, page] = await Promise.all([getGlobalSEO(), getPageSEO(path)]);

  const title = page?.title || fallbacks.title || global.defaultTitle;
  const description =
    page?.description || fallbacks.description || global.defaultDescription;
  const keywords =
    page?.keywords?.length ? page.keywords :
    fallbacks.keywords?.length ? fallbacks.keywords :
    global.defaultKeywords;
  const ogImage =
    page?.ogImage || fallbacks.ogImage || global.defaultOgImage;
  const canonical =
    page?.canonicalUrl || fallbacks.canonicalUrl || `${global.siteUrl}${path}`;
  const noIndex = page?.noIndex ?? fallbacks.noIndex ?? false;
  const noFollow = page?.noFollow ?? fallbacks.noFollow ?? false;

  const ogTitle = page?.ogTitle || title;
  const ogDescription = page?.ogDescription || description;

  const meta: Metadata = {
    title: { default: title, template: global.titleTemplate },
    description,
    keywords: keywords.join(", "),
    authors: [{ name: global.siteName }],
    metadataBase: new URL(global.siteUrl),
    alternates: {
      canonical,
      languages: { "en-IN": canonical, "x-default": canonical },
    },
    openGraph: {
      type: "website",
      locale: "en_IN",
      url: canonical,
      siteName: global.siteName,
      title: ogTitle,
      description: ogDescription,
      images: ogImage
        ? [{ url: ogImage, width: 1200, height: 630, alt: ogTitle }]
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description: ogDescription,
      images: ogImage ? [ogImage] : undefined,
    },
    robots: buildRobots(noIndex, noFollow),
  };
  if (global.googleSiteVerification) {
    meta.verification = { google: global.googleSiteVerification };
  }
  return meta;
}

// ─── Per-collection metadata generators ──────────────────────────────────────

type CollectionSeo = {
  seoTitle?: string | null;
  seoDescription?: string | null;
  seoOgImage?: string | null;
  seoKeywords?: string[] | null;
  seoOgTitle?: string | null;
  seoOgDescription?: string | null;
  seoCanonicalUrl?: string | null;
  seoNoIndex?: boolean | null;
  seoNoFollow?: boolean | null;
};

export type ProjectForSEO = CollectionSeo & {
  slug: string;
  title: string;
  market?: string | null;
  location?: string | null;
  summary?: string | null;
  coverImage?: string | null;
};

export type ServiceForSEO = CollectionSeo & {
  slug: string;
  title: string;
  summary?: string | null;
  icon?: string | null;
};

export type ArticleForSEO = CollectionSeo & {
  slug: string;
  title: string;
  excerpt?: string | null;
  cover?: string | null;
  author?: string | null;
  publishedAt?: string | null;
  category?: string | null;
};

export type MarketForSEO = CollectionSeo & {
  slug: string;
  title: string;
  summary?: string | null;
  image?: string | null;
};

export type JobForSEO = CollectionSeo & {
  slug: string;
  title: string;
  summary?: string | null;
  department?: string | null;
  location?: string | null;
};

export type LeaderForSEO = CollectionSeo & {
  slug: string;
  name: string;
  role?: string | null;
  bio?: string | null;
  portrait?: string | null;
};

function collectionFallbacks(
  c: CollectionSeo,
  defaultTitle: string,
  defaultDescription: string,
  defaultImage?: string | null,
): PageMetadataFallbacks {
  return {
    title: c.seoTitle ?? defaultTitle,
    description: c.seoDescription ?? defaultDescription,
    keywords: c.seoKeywords ?? undefined,
    ogImage: c.seoOgImage ?? defaultImage ?? undefined,
    canonicalUrl: c.seoCanonicalUrl ?? undefined,
    noIndex: c.seoNoIndex ?? false,
    noFollow: c.seoNoFollow ?? false,
  };
}

export async function generateProjectMetadata(p: ProjectForSEO): Promise<Metadata> {
  const desc =
    p.summary ??
    `${p.title}${p.market ? ` — ${p.market}` : ""}${p.location ? ` project in ${p.location}` : ""}.`;
  return generatePageMetadata(
    `/projects/${p.slug}`,
    collectionFallbacks(p, p.title, desc, p.coverImage),
  );
}

export async function generateServiceMetadata(s: ServiceForSEO): Promise<Metadata> {
  return generatePageMetadata(
    `/services/${s.slug}`,
    collectionFallbacks(s, s.title, s.summary ?? `${s.title} services in Jaipur.`, s.icon),
  );
}

export async function generateArticleMetadata(a: ArticleForSEO): Promise<Metadata> {
  return generatePageMetadata(
    `/insights/${a.slug}`,
    collectionFallbacks(a, a.title, a.excerpt ?? a.title, a.cover),
  );
}

export async function generateMarketMetadata(m: MarketForSEO): Promise<Metadata> {
  return generatePageMetadata(
    `/markets/${m.slug}`,
    collectionFallbacks(m, m.title, m.summary ?? `${m.title} construction services.`, m.image),
  );
}

export async function generateJobMetadata(j: JobForSEO): Promise<Metadata> {
  return generatePageMetadata(
    `/careers/${j.slug}`,
    collectionFallbacks(
      j,
      j.title,
      j.summary ?? `${j.title}${j.location ? ` in ${j.location}` : ""}.`,
    ),
  );
}

export async function generateLeaderMetadata(l: LeaderForSEO): Promise<Metadata> {
  return generatePageMetadata(
    `/about/${l.slug}`,
    collectionFallbacks(l, l.name, l.bio ?? `${l.name}${l.role ? `, ${l.role}` : ""}.`, l.portrait),
  );
}

// ─── JSON-LD schema generators (return plain objects ready for JSON.stringify) ─

export type SchemaObject = Record<string, unknown>;

export function generateOrganizationSchema(g: GlobalSEO): SchemaObject {
  const o = g.organizationSchema;
  return {
    "@context": "https://schema.org",
    "@type": o.type || "Organization",
    name: o.name || g.siteName,
    url: g.siteUrl,
    ...(o.logo ? { logo: o.logo } : {}),
    ...(o.description ? { description: o.description } : {}),
    ...(g.contactInfo.phone || g.contactInfo.email
      ? {
          contactPoint: [
            {
              "@type": "ContactPoint",
              ...(g.contactInfo.phone ? { telephone: g.contactInfo.phone } : {}),
              ...(g.contactInfo.email ? { email: g.contactInfo.email } : {}),
              contactType: "customer service",
              areaServed: "IN",
              availableLanguage: ["en", "hi"],
            },
          ],
        }
      : {}),
    ...(g.socialLinks
      ? {
          sameAs: Object.values(g.socialLinks).filter(
            (v): v is string => typeof v === "string" && v.length > 0,
          ),
        }
      : {}),
  };
}

export function generateLocalBusinessSchema(g: GlobalSEO): SchemaObject {
  const lb = g.localBusiness;
  const addr = lb.address ?? g.contactInfo.address ?? {};
  return {
    "@context": "https://schema.org",
    "@type": g.organizationSchema.type || "GeneralContractor",
    "@id": `${g.siteUrl}#localbusiness`,
    name: g.organizationSchema.name || g.siteName,
    url: g.siteUrl,
    ...(g.organizationSchema.logo ? { image: g.organizationSchema.logo } : {}),
    ...(g.organizationSchema.description ? { description: g.organizationSchema.description } : {}),
    ...(lb.telephone ? { telephone: lb.telephone } : {}),
    ...(lb.email ? { email: lb.email } : {}),
    ...(lb.priceRange ? { priceRange: lb.priceRange } : {}),
    address: {
      "@type": "PostalAddress",
      ...(addr.street ? { streetAddress: addr.street } : {}),
      ...(addr.city ? { addressLocality: addr.city } : {}),
      ...(addr.state ? { addressRegion: addr.state } : {}),
      ...(addr.postalCode ? { postalCode: addr.postalCode } : {}),
      ...(addr.country ? { addressCountry: addr.country } : {}),
    },
    ...(lb.geo
      ? {
          geo: {
            "@type": "GeoCoordinates",
            latitude: lb.geo.latitude,
            longitude: lb.geo.longitude,
          },
        }
      : {}),
    ...(lb.openingHours?.length ? { openingHours: lb.openingHours } : {}),
  };
}

export function generateBreadcrumbSchema(items: { name: string; url: string }[]): SchemaObject {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: it.url,
    })),
  };
}

export function generateFAQSchema(faqs: { question: string; answer: string }[]): SchemaObject | null {
  if (!faqs.length) return null;
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };
}

export function generateProjectSchema(p: ProjectForSEO, g: GlobalSEO): SchemaObject {
  const url = `${g.siteUrl}/projects/${p.slug}`;
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: p.title,
    url,
    ...(p.coverImage ? { image: p.coverImage } : {}),
    ...(p.summary ? { description: p.summary } : {}),
    ...(p.market ? { genre: p.market } : {}),
    ...(p.location
      ? {
          locationCreated: {
            "@type": "Place",
            name: p.location,
          },
        }
      : {}),
    creator: {
      "@type": g.organizationSchema.type || "GeneralContractor",
      name: g.organizationSchema.name || g.siteName,
      url: g.siteUrl,
    },
  };
}

export function generateServiceSchema(s: ServiceForSEO, g: GlobalSEO): SchemaObject {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: s.title,
    url: `${g.siteUrl}/services/${s.slug}`,
    ...(s.summary ? { description: s.summary } : {}),
    ...(s.icon ? { image: s.icon } : {}),
    provider: {
      "@type": g.organizationSchema.type || "GeneralContractor",
      name: g.organizationSchema.name || g.siteName,
      url: g.siteUrl,
    },
    areaServed: { "@type": "Country", name: "India" },
  };
}

export function generateArticleSchema(a: ArticleForSEO, g: GlobalSEO): SchemaObject {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: a.title,
    url: `${g.siteUrl}/insights/${a.slug}`,
    ...(a.excerpt ? { description: a.excerpt } : {}),
    ...(a.cover ? { image: a.cover } : {}),
    ...(a.author ? { author: { "@type": "Person", name: a.author } } : {}),
    ...(a.publishedAt ? { datePublished: a.publishedAt } : {}),
    publisher: {
      "@type": "Organization",
      name: g.organizationSchema.name || g.siteName,
      ...(g.organizationSchema.logo
        ? { logo: { "@type": "ImageObject", url: g.organizationSchema.logo } }
        : {}),
    },
  };
}

export function generatePersonSchema(l: LeaderForSEO, g: GlobalSEO): SchemaObject {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: l.name,
    ...(l.role ? { jobTitle: l.role } : {}),
    ...(l.portrait ? { image: l.portrait } : {}),
    ...(l.bio ? { description: l.bio } : {}),
    worksFor: {
      "@type": g.organizationSchema.type || "GeneralContractor",
      name: g.organizationSchema.name || g.siteName,
      url: g.siteUrl,
    },
  };
}
