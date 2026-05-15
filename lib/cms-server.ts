// Server-side fetchers for global site data. Falls back to lib/site.ts
// values when the API is unreachable, so the site still renders.

import { cms } from "./api";
import { NAV, SITE, FOOTER_COLUMNS, type NavItem } from "./site";

export type SocialLink = { icon: string; label?: string; url: string };

export type ImageRef = { url: string; alt: string };

// Named hero-image slots controlled from admin Site Settings → Page heroes.
// Used by pages whose hero isn't authored as a CMS block (home, insights
// index, why-naksha, CTA banner fallback). Add a new key here, in the admin
// settings page, AND in the page that consumes it.
export type HeroImages = {
  homePoster: ImageRef;
  insightsIndex: ImageRef;
  careersWhyNaksha: ImageRef;
  whyNakshaSection: ImageRef;
  ctaDefault: ImageRef;
};

export type SiteSettings = {
  name: string;
  shortName: string;
  wordmark: string;
  tagline: string;
  url: string;
  email: string;
  phone: string;
  address: { line1: string; line2: string; country: string };
  // Brand assets
  logoLight?: string;
  logoDark?: string;
  favicon?: string;
  // SEO defaults
  seo?: {
    titleTemplate?: string;
    description?: string;
    keywords?: string;
    robots?: string;
    ogImage?: string;
    twitterHandle?: string;
    googleVerification?: string;
  };
  // Page hero images (named slots).
  heroImages?: Partial<HeroImages>;
  // Social links (managed list with icon picker in admin)
  socials?: SocialLink[];
  // Legacy single-key social shape (still supported as fallback)
  social?: { linkedin: string; instagram: string; facebook: string; youtube: string };
};

export type SiteShell = {
  navbar: {
    items: NavItem[];
    cta: { label: string; href: string };
  };
  footer: {
    callout: { heading: string; body: string; ctaLabel: string; ctaHref: string };
    columns: { heading: string; links: { label: string; href: string }[] }[];
    bottom: { copyright: string; links: { label: string; href: string }[] };
  };
  siteSettings: SiteSettings;
};

const FALLBACK_NAVBAR = {
  items: NAV,
  cta: { label: "Start a Project", href: "/contact" },
};

const FALLBACK_FOOTER = {
  callout: {
    heading: "Build with us.",
    body: "Tell us what you're planning — we'll come back within two business days with the right team to talk to.",
    ctaLabel: "Start a Project",
    ctaHref: "/contact",
  },
  columns: FOOTER_COLUMNS,
  bottom: {
    copyright: "© {{year}} Naksha Construction. All rights reserved.",
    links: [
      { label: "Privacy", href: "/legal/privacy" },
      { label: "Terms", href: "/legal/terms" },
      { label: "Sitemap", href: "/sitemap.xml" },
    ],
  },
};

const FALLBACK_SETTINGS: SiteSettings = {
  name: SITE.name,
  shortName: SITE.shortName,
  wordmark: SITE.wordmark,
  tagline: SITE.tagline,
  url: SITE.url,
  email: SITE.email,
  phone: SITE.phone,
  address: { ...SITE.address },
  social: { ...SITE.social },
  socials: [],
  heroImages: {
    homePoster: { url: "", alt: "" },
    insightsIndex: { url: "", alt: "" },
    careersWhyNaksha: { url: "", alt: "" },
    whyNakshaSection: { url: "", alt: "" },
    ctaDefault: { url: "", alt: "" },
  },
};

// Resolve one hero slot with safe fallbacks. Returns the admin-saved url+alt
// when present, otherwise the supplied fallbacks. Always returns a usable
// ImageRef so call sites don't need null checks.
export function getHero(
  settings: SiteSettings,
  slot: keyof HeroImages,
  fallback: ImageRef,
): ImageRef {
  const saved = settings.heroImages?.[slot];
  return {
    url: saved?.url || fallback.url,
    alt: saved?.alt || fallback.alt,
  };
}

export async function getSiteShell(): Promise<SiteShell> {
  const [nav, foot, settings] = await Promise.all([
    cms.global("navbar").catch(() => null),
    cms.global("footer").catch(() => null),
    cms.global("siteSettings").catch(() => null),
  ]);

  return {
    navbar: (nav?.value as SiteShell["navbar"]) ?? FALLBACK_NAVBAR,
    footer: (foot?.value as SiteShell["footer"]) ?? FALLBACK_FOOTER,
    siteSettings: { ...FALLBACK_SETTINGS, ...(settings?.value as SiteSettings | undefined) },
  };
}
