// Design tokens — single source of truth for color, type, spacing, motion.
// Mirror these in tailwind.config.ts when adding/changing.

export const colors = {
  ink: "#0E0E0E",
  paper: "#F5F1EC",
  accent: "#5CBA3C",
  accentHi: "#71D04E",
  concrete: "#8A8A87",
  concreteText: "#5C5C58",
  ruleOnInk: "rgba(255,255,255,0.12)",
  ruleOnPaper: "rgba(14,14,14,0.12)",
} as const;

export const typography = {
  families: {
    serif: "Fraunces, Georgia, serif",
    sans: "Inter, ui-sans-serif, system-ui, sans-serif",
  },
  scale: {
    displayXl: { size: 80, lineHeight: 1.05, weight: 500, family: "serif" as const },
    displayLg: { size: 64, lineHeight: 1.08, weight: 500, family: "serif" as const },
    h1: { size: 48, lineHeight: 1.1, weight: 500, family: "serif" as const },
    h2: { size: 36, lineHeight: 1.15, weight: 500, family: "serif" as const },
    h3: { size: 24, lineHeight: 1.2, weight: 600, family: "sans" as const },
    h4: { size: 20, lineHeight: 1.3, weight: 600, family: "sans" as const },
    lead: { size: 22, lineHeight: 1.55, weight: 400, family: "sans" as const },
    body: { size: 16, lineHeight: 1.6, weight: 400, family: "sans" as const },
    bodySm: { size: 14, lineHeight: 1.5, weight: 400, family: "sans" as const },
    eyebrow: {
      size: 12,
      lineHeight: 1.4,
      weight: 600,
      tracking: 0.12,
      uppercase: true,
      family: "sans" as const,
    },
  },
} as const;

export const spacing = {
  containerMax: 1320,
  wideMax: 1440,
  readingMax: 720,
  gutterDesktop: 32,
  gutterMobile: 16,
  sectionLg: 120,
  sectionMd: 96,
  sectionSm: 64,
  sectionLgMobile: 72,
  sectionMdMobile: 56,
  sectionSmMobile: 40,
  cardPad: 32,
  cardPadMobile: 20,
  radius: 4,
} as const;

export const breakpoints = {
  sm: 375,
  md: 768,
  lg: 1024,
  xl: 1320,
  xxl: 1440,
} as const;

export const motion = {
  ease: {
    out: [0.2, 0.7, 0.2, 1] as [number, number, number, number],
    inOut: [0.65, 0, 0.35, 1] as [number, number, number, number],
  },
  duration: {
    fast: 0.2,
    base: 0.4,
    slow: 0.6,
    slower: 0.9,
  },
  stagger: 0.08,
} as const;
