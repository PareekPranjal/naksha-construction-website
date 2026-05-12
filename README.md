# Naksha Construction — Website

Next.js 14 (App Router) + TypeScript + Tailwind website for **Naksha Construction**, a Jaipur-based construction firm. The site is fully scaffolded with placeholder copy, placeholder photography, and a placeholder hero video so the studio can swap real content in section by section.

> Reference architecture is documented in [`docs/reference-analysis.md`](docs/reference-analysis.md). All copy, imagery, fonts, colours, and brand assets in this build are **original** — no third-party brand assets are reproduced anywhere.

---

## Quick start

Requires Node 18.17+ (Node 20 LTS recommended) and npm 9+.

```bash
npm install
npm run dev          # http://localhost:3000
```

Other useful scripts:

```bash
npm run build        # production build
npm run start        # serve the production build on :3000
npm run typecheck    # tsc --noEmit
npm run lint         # next lint
npm run format       # prettier --write
```

---

## Stack

- **Next.js 14** (App Router, React Server Components where possible)
- **TypeScript** strict mode
- **Tailwind CSS** with project tokens in [`styles/tokens.ts`](styles/tokens.ts) and [`tailwind.config.ts`](tailwind.config.ts)
- **Framer Motion** for entrance + page transitions
- **Lenis** for smooth scrolling (respects `prefers-reduced-motion`)
- **react-hook-form + zod** for the multi-step contact form
- **lucide-react** for icons
- **next/image** for image optimisation
- ESLint + Prettier (with `prettier-plugin-tailwindcss`)

---

## Project structure

```
.
├── app/                            App Router routes
│   ├── (home)        page.tsx
│   ├── about/        page.tsx
│   ├── markets/      page.tsx + [sector]/page.tsx
│   ├── services/     page.tsx + [slug]/page.tsx
│   ├── projects/     page.tsx + [slug]/page.tsx
│   ├── sustainability/ page.tsx
│   ├── careers/      page.tsx + why-naksha + openings + [role]
│   ├── insights/     page.tsx + [slug]/page.tsx
│   ├── locations/    page.tsx
│   ├── contact/      page.tsx
│   ├── legal/        privacy + terms
│   ├── sitemap.ts    /sitemap.xml
│   ├── robots.ts     /robots.txt
│   └── not-found.tsx 404
├── components/                     Reusable UI primitives
├── lib/
│   ├── data.ts       All placeholder content (single source of truth)
│   ├── site.ts       Brand strings, nav structure, footer columns
│   ├── seo.ts        Per-page metadata helper
│   ├── utils.ts      cn(), slugify(), date format, picsum/placeholder helpers
│   └── lenis-provider.tsx
├── styles/
│   └── tokens.ts     Design tokens (colour, type, spacing, motion)
├── docs/
│   ├── reference-analysis.md   Structural blueprint behind the build
│   └── content-checklist.md    Every text + image slot the client needs to fill
├── app/globals.css
├── tailwind.config.ts
├── next.config.mjs
├── tsconfig.json
└── package.json
```

---

## How to swap placeholder content for real content

The intention is that the client can swap content in **without touching component code** for 95% of pages — almost every text string and image URL on the site reads from one of the three files below.

### 1. Brand-level strings (`lib/site.ts`)

Edit the `SITE` object to update:

- Company name, tagline, founding year, team size
- Email, phone, headquarters address
- Social links
- Hero video URL (paste your hosted MP4 here when ready)
- Hero poster image URL

The `NAV` and `FOOTER_COLUMNS` arrays drive the header mega-menu and footer link columns; edit labels or add/remove items here.

### 2. Page content (`lib/data.ts`)

This single file holds **all** the content for the dynamic and content-heavy parts of the site:

| Export | Drives |
|---|---|
| `LOREM` | Reusable Lorem-Ipsum strings (replace with real copy as you migrate sections) |
| `MARKETS` | Markets index page + 8 market detail pages |
| `SERVICES` | Services index page + 5 service detail pages |
| `PROJECTS` | Projects index, every project detail page, all "related projects" blocks |
| `LEADERS` | Leadership grid on `/about` |
| `ARTICLES` | Insights index + 8 article detail pages |
| `JOBS` | Careers openings + each role detail page |
| `LOCATIONS` | Locations page |
| `COMPANY_STATS`, `TESTIMONIALS`, `COMMITMENTS`, `TIMELINE` | Reused across the home, about, sustainability pages |

Each item has a clearly typed shape (see `Project`, `Market`, `Service`, etc. types). Replace the placeholder strings/images with real content; the pages will reflect the change automatically.

### 3. Page-level copy that lives directly in JSX

A handful of headlines, eyebrows, and intro paragraphs are inline on the page files (e.g. the home hero headline). Search for the relevant string and edit in place. The full list is in [`docs/content-checklist.md`](docs/content-checklist.md).

---

## Replacing placeholder media

### Images

All image URLs use either:

- `picsum.photos/seed/<seed>/<w>/<h>` — deterministic random photos
- `placehold.co/...` — typed placeholders

When you have real photography:

1. Drop the assets in `public/images/<section>/...`
2. Replace the URL string in `lib/data.ts` (or the page file) with `/images/<section>/your-file.jpg`
3. `next/image` will automatically optimise local files

`next.config.mjs` already whitelists picsum, placehold.co, Unsplash, and Pexels — add any other CDN domain you use.

Recommended dimensions are listed in [`docs/content-checklist.md`](docs/content-checklist.md).

### Hero video

Open `lib/site.ts` and set `heroVideoUrl` to a public URL of your hosted MP4 (e.g. a Pexels/Coverr free video, or your own footage on a CDN). The hero will gracefully fall back to the poster image if the URL is empty. Recommended source: **1920×1080, H.264 MP4, < 5 MB, ~10s loop**, muted.

### Logo

The wordmark is a typographic treatment in [`components/Wordmark.tsx`](components/Wordmark.tsx) (renders `NAKSHA.` in Fraunces). To swap to a graphic logo, replace the inner content of that component with a `next/image` referencing your SVG/PNG.

---

## Design tokens

Edit `styles/tokens.ts` and the matching keys in `tailwind.config.ts` to change:

- Brand colours (`--ink`, `--paper`, `--accent`, `--concrete`)
- Typography scale
- Spacing scale, container widths
- Motion durations and easing

Both files must be edited together — Tailwind's content scan only picks up class strings literally present in the source.

---

## SEO

- Per-page `<title>` and meta description live in each `page.tsx` via the `pageMetadata({ title, description, path })` helper in `lib/seo.ts`
- Open Graph and Twitter card tags are populated from the same helper
- `app/sitemap.ts` generates `/sitemap.xml` at build time, including all dynamic routes
- `app/robots.ts` generates `/robots.txt`
- Set the canonical site URL in `lib/site.ts` (`SITE.url`) before deploying

---

## Accessibility

- Semantic HTML throughout (`<header>`, `<main>`, `<nav>`, `<footer>`, `<article>`, `<section>`, `<address>`, `<blockquote>`)
- `alt` text on every image (currently empty for decorative imagery — add meaningful alt when swapping in real photography of identifiable people / projects)
- Visible focus rings on all interactive elements
- Keyboard-navigable mega-menu and mobile drawer
- `prefers-reduced-motion` respected — Lenis, Framer Motion entrance animations, and counters all disable
- Colour contrast meets WCAG AA on the chosen palette

---

## Performance

- All routes are statically generated by default
- `next/image` for every photographic asset (lazy by default, eager on hero/above-fold)
- Google Fonts loaded via `next/font` (zero CLS, self-hosted)
- Lenis only initialises in the browser and respects reduced motion
- Target Lighthouse 90+ on Performance, Accessibility, Best Practices, SEO

---

## Deployment

Built for Vercel. Push to GitHub and import the repository — Vercel will detect Next.js automatically. No environment variables are required for the placeholder build.

---

## Compliance / IP

This site is a **brand-original** build. No copy, photography, video, fonts, logo, colour values, or branding from any third-party site are reproduced. Layout, information architecture, component composition, and motion patterns are informed by best-practice patterns common across the construction industry — these are not protectable expression. See [`docs/reference-analysis.md`](docs/reference-analysis.md) for the full compliance line.

All placeholder copy is generic Lorem Ipsum (public domain Latin filler text). All placeholder imagery is from free-licence sources (picsum.photos, placehold.co). All placeholder names are clearly fictional.

---

## License

Proprietary — Naksha Construction. All rights reserved.
