// Block schemas mirror what the seed/admin emit. Fields are forgiving — most
// are optional so admins can author partial blocks.

export type BlockBase = { type: string };

export type HeroBlockData = {
  type: "hero";
  title?: string;
  subtitle?: string;
  ctaLabel?: string;
  ctaHref?: string;
  image?: string;
  imageAlt?: string;
  eyebrow?: string;
  /** Banner height. "full" = home-page-sized (default for backward compat). */
  size?: "full" | "lg" | "md" | "sm";
};

export type StatsBlockData = {
  type: "stats";
  items?: { value: string | number; label: string }[];
};

export type IntroBlockData = {
  type: "intro";
  heading?: string;
  body?: string;
};

export type SourceBlockData =
  | { type: "marketsGrid"; source?: "markets" }
  | { type: "servicesGrid"; source?: "services" }
  | { type: "projectsGrid"; source?: "projects"; limit?: number }
  | { type: "projectsFeatured"; source?: "projects"; limit?: number }
  | { type: "articlesGrid"; source?: "articles"; limit?: number }
  | { type: "openRoles"; source?: "jobs"; filterable?: boolean }
  | { type: "locationsGrid"; source?: "locations"; compact?: boolean }
  | { type: "leadership"; source?: "leaders" }
  | { type: "testimonials"; source?: "testimonials" };

export type CtaBlockData = {
  type: "cta";
  heading?: string;
  sub?: string;
  ctaLabel?: string;
  ctaHref?: string;
};

export type TimelineBlockData = {
  type: "timeline";
  items?: { year: string; title: string; body: string }[];
};

export type CommitmentsBlockData = {
  type: "commitments";
  items?: { key?: string; title: string; body: string; image?: string; imageAlt?: string }[];
};

export type ContactFormBlockData = { type: "contactForm" };

export type LongformBlockData = {
  type: "longform";
  body?: string;
};

export type GalleryBlockData = {
  type: "gallery";
  heading?: string;
  intro?: string;
  items?: { url: string; alt?: string }[];
  /** Cards per row at md+. Defaults to 3. */
  columns?: 2 | 3 | 4;
};

export type EmailQueryBlockData = {
  type: "emailQuery";
  heading?: string;
  intro?: string;
  ctaLabel?: string;
};

export type MapBlockData = {
  type: "map";
  heading?: string;
  /** Latitude. */
  lat?: number;
  /** Longitude. */
  lng?: number;
  /** Zoom level 1–20. Default 16. */
  zoom?: number;
  /** Optional pre-built Google embed URL (overrides lat/lng/zoom if set). */
  embedUrl?: string;
  /** Banner height. Default 'md'. */
  height?: "sm" | "md" | "lg";
  /** Label text for the "Open in Google Maps" link. */
  linkLabel?: string;
  /** Optional override for the open-in-maps URL. Defaults to a Google Maps search at the coordinates. */
  linkHref?: string;
};

export type Block =
  | HeroBlockData
  | StatsBlockData
  | IntroBlockData
  | SourceBlockData
  | CtaBlockData
  | TimelineBlockData
  | CommitmentsBlockData
  | ContactFormBlockData
  | LongformBlockData
  | GalleryBlockData
  | EmailQueryBlockData
  | MapBlockData;
