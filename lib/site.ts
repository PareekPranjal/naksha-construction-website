// Site-wide constants — easy single-place edits when client supplies real content.

// Production canonical URL. Override via NEXT_PUBLIC_SITE_URL when a custom
// domain is wired up; otherwise we point at the Vercel preview URL so sitemap,
// canonical, and OG tags resolve to a real, crawlable host.
const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
  "https://naksha-construction-website.vercel.app";

export const SITE = {
  name: "Naksha Construction",
  shortName: "Naksha",
  wordmark: "NAKSHA",
  tagline: "Building Rajasthan, brick by considered brick.",
  founded: 2014,
  yearsExperience: 11,
  teamSize: "50+",
  url: SITE_URL,
  email: "hello@nakshaconstruction.example",
  phone: "+91 98765 43210",
  address: {
    line1: "Plot 12, Civil Lines",
    line2: "Jaipur, Rajasthan 302006",
    country: "India",
  },
  social: {
    linkedin: "#",
    instagram: "#",
    facebook: "#",
    youtube: "#",
  },
  // Replace this URL with your hosted hero video (Pexels / Coverr / your own MP4).
  // Until then the hero falls back to a poster image gracefully.
  heroVideoUrl: "",
  heroPosterImage:
    "https://picsum.photos/seed/naksha-hero/1920/1080",
} as const;

export const NAV: NavItem[] = [
  {
    label: "About",
    href: "/about",
    children: [
      { label: "Who We Are", href: "/about" },
      { label: "Leadership", href: "/about#leadership" },
      { label: "Our Story", href: "/about#history" },
      { label: "Locations", href: "/locations" },
      { label: "Sustainability", href: "/sustainability" },
    ],
  },
  {
    label: "Markets",
    href: "/markets",
    children: [
      { label: "Aviation", href: "/markets/aviation" },
      { label: "Commercial", href: "/markets/commercial" },
      { label: "Education", href: "/markets/education" },
      { label: "Healthcare", href: "/markets/healthcare" },
      { label: "Pharmaceutical", href: "/markets/pharmaceutical" },
      { label: "Sports", href: "/markets/sports" },
      { label: "Government", href: "/markets/government" },
      { label: "Data Centers", href: "/markets/data-centers" },
    ],
  },
  {
    label: "Services",
    href: "/services",
    children: [
      { label: "Construction Management", href: "/services/construction-management" },
      { label: "General Contracting", href: "/services/general-contracting" },
      { label: "Design-Build", href: "/services/design-build" },
      { label: "Preconstruction", href: "/services/preconstruction" },
      { label: "Special Projects", href: "/services/special-projects" },
    ],
  },
  { label: "Projects", href: "/projects" },
  { label: "Insights", href: "/insights" },
  {
    label: "Careers",
    href: "/careers",
    children: [
      { label: "Why Naksha", href: "/careers/why-naksha" },
      { label: "Open Roles", href: "/careers/openings" },
    ],
  },
];

export type NavItem = {
  label: string;
  href: string;
  children?: { label: string; href: string }[];
};

export const FOOTER_COLUMNS: { heading: string; links: { label: string; href: string }[] }[] = [
  {
    heading: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Leadership", href: "/about#leadership" },
      { label: "Markets", href: "/markets" },
      { label: "Sustainability", href: "/sustainability" },
      { label: "Locations", href: "/locations" },
    ],
  },
  {
    heading: "Services",
    links: [
      { label: "Construction Management", href: "/services/construction-management" },
      { label: "General Contracting", href: "/services/general-contracting" },
      { label: "Design-Build", href: "/services/design-build" },
      { label: "Preconstruction", href: "/services/preconstruction" },
      { label: "Insights", href: "/insights" },
    ],
  },
  {
    heading: "Careers",
    links: [
      { label: "Why Naksha", href: "/careers/why-naksha" },
      { label: "Open Roles", href: "/careers/openings" },
      { label: "Contact", href: "/contact" },
      { label: "Press", href: "/contact" },
    ],
  },
];
