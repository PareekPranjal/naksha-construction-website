---
project: Naksha Construction
deliverable: Step 1 — Reference Analysis
purpose: Structural blueprint distilled from turnerconstruction.com to drive a brand-original clone for Naksha. No copy, imagery, fonts, or branding from the reference will be reproduced. This document captures *patterns only*.
---

# Reference Analysis — Structural Blueprint

> Source observed: turnerconstruction.com (homepage + inner page templates).
> Use: pattern reference for layout, IA, component composition, type/spacing/motion. **All copy, names, projects, hex values, fonts, and imagery in the final build are 100% original — none of the reference's brand assets are carried over.**

---

## 1. Sitemap (target IA for Naksha)

The reference site organises around five top-level categories plus contact and a persistent secondary CTA. Naksha will mirror this IA but with our own taxonomy.

```
/                                Home
/about                           About
  └── (sub-blocks rendered inline: who-we-are, leadership, history, values)
/markets                         Markets index
  ├── /markets/aviation
  ├── /markets/commercial
  ├── /markets/education
  ├── /markets/healthcare
  ├── /markets/pharmaceutical
  ├── /markets/sports
  ├── /markets/government
  └── /markets/data-centers
/services                        Services index
  ├── /services/construction-management
  ├── /services/general-contracting
  ├── /services/design-build
  ├── /services/preconstruction
  └── /services/special-projects
/projects                        Filterable portfolio grid
  └── /projects/[slug]           12 case-study detail pages
/sustainability                  Single long-form page
/careers                         Careers hub
  ├── /careers/why-naksha
  ├── /careers/openings
  └── /careers/[role-slug]
/insights                        Editorial index
  └── /insights/[slug]           8 article detail pages
/locations                       Office-locations grid
/contact                         Multi-purpose contact page
/legal/privacy
/legal/terms
```

**Total routes (static + dynamic):** ~28 top-level + dynamic detail pages.

---

## 2. Header

| Trait | Pattern |
|---|---|
| **Logo position** | Left-aligned wordmark. Two-tone variant for light vs. dark contexts (swap on scroll / per page). |
| **Top-level nav** | 5 categories: About / Markets / Services / Projects / Insights / Careers (+ Contact link, + persistent secondary CTA). |
| **Menu type** | Mega-menu on desktop (full-width, multi-column reveal under each top-level item). Categories with deep IA (Markets, Services) expand to a 2–3 column list of sub-pages with a small image teaser on the right. |
| **Search** | Search icon in the top bar. Click reveals an overlay with input field + recent/popular suggestions. |
| **Persistent CTA** | One outlined button to the right of nav, e.g. "Start a Project" (analogous to the reference's "Become a Subcontractor"). |
| **Sticky behavior** | Header is fixed. Starts transparent over hero on home + landing pages, transitions to a solid surface (paper) on scroll past hero. Adds a hairline border + subtle shadow when solid. |
| **Mobile pattern** | Hamburger toggles a full-screen drawer. Mega-menu collapses to nested accordion. Search and CTA pinned to drawer header/footer. |
| **Header height** | ~80px desktop / ~64px mobile. Compresses ~10–15% on scroll. |

---

## 3. Footer

| Trait | Pattern |
|---|---|
| **Treatment** | Dark background (charcoal). Light text. Generous top padding (~96px). |
| **Columns** | 3 primary link columns + 1 brand/contact column = 4-column grid at desktop; collapses to single accordion on mobile. |
| **Column 1** | About / Leadership / Markets / Sustainability / Locations |
| **Column 2** | Services / Preconstruction / Design-Build / Project Management / Insights |
| **Column 3** | Careers / Why Naksha / Open Roles / Contact / Press |
| **Brand column** | Wordmark, short positioning line, address block, phone, email, social icons (LinkedIn, Instagram, Facebook, YouTube). |
| **Newsletter signup** | The reference does **not** include one. Naksha brief asks for one — add a single inline email-only field above the columns, on a contrasting paper-strip band. |
| **Legal sub-row** | Below the columns, hairline divider, then row with copyright left + Privacy / Terms / Cookie Settings on the right. Smaller type. |

---

## 4. Hero pattern (homepage)

| Trait | Pattern |
|---|---|
| **Media** | Full-bleed background — image on the reference; brief allows full-bleed video for Naksha (use one royalty-free construction b-roll loop, muted, low frame budget). Dark gradient overlay (~40% opacity, top-to-bottom) for legibility. |
| **Headline placement** | Center-aligned vertically and horizontally on the reference. Recommend left-aligned for Naksha to give the editorial serif a stronger hold. |
| **Headline scale** | Display 56–80px desktop, 40–48px mobile. |
| **Subhead** | Single supporting line, ~18–20px, ~60ch max. |
| **CTA** | Primary solid button + secondary text-link with arrow. (Reference also experiments with three expandable "intent" cards: A Project / A Career / A Better Future. Naksha can adopt this as an optional variant.) |
| **Scroll cue** | Small downward chevron + "Scroll" micro-label, bottom-center, with subtle bounce loop. |

---

## 5. Section types observed across the site

The reference reuses a small library of section primitives. Naksha's component library should map 1-to-1 to these so any page can be composed from them.

| Section type | Where it appears | Notes |
|---|---|---|
| **Full-bleed hero** | Home, About, Markets, Services, Careers, Insights index, Project detail | Image or video; centered or left-aligned headline. |
| **Intro paragraph block** | After most heroes | Single column, max ~70ch, large type (~22–24px), generous padding (~120px top/bottom). |
| **Two-column split (image + text)** | About, Markets index, Service detail | 50/50 desktop, image either side, stacks on mobile. Text column has eyebrow + H2 + body + link. |
| **Stat-counter strip** | About, Sustainability, Careers | 3–4 cells horizontally; large number + label + tiny caption. Counts up on scroll. |
| **Card grid: Markets** | Home, About, Markets index | 3-column desktop / 2 tablet / 1 mobile. Card = full-bleed image + bottom-overlay label. Hover = brightness lift + chevron slide. |
| **Card grid: Services** | Home, Services index | 3-column desktop. Card = icon top, title, 2-line description, arrow link. Lighter visual weight than Markets. |
| **Card grid: Projects** | Home (latest 3), Projects index, Project detail (related) | 2-column desktop on the index, 3-column on home teasers. Card = 4:3 image + category eyebrow + title + location subtitle. Hover = image zoom 1.04× + caption color shift. |
| **Card grid: Insights / Articles** | Home (latest 3–4), Insights index, Article detail (related) | 3- or 4-column on home teasers, single-column stacked list on the index (reference uses stacked). Card = 16:9 cover + tag pill + title + date. |
| **Leader card grid** | About / Leadership block | 3- or 4-column. Square portrait + name + title + small bio expand on hover or click-to-modal. |
| **Testimonial / quote block** | About, Careers, Project detail | Single large pull-quote, optional small portrait + attribution. ~28–32px italic serif on paper background. |
| **Carousel: commitments / values** | Home, About | 5–7 tabs along the top, content swap below = image left + headline + body + link. Auto-advance ~6s; pause on hover. |
| **Tabbed content (career stages)** | Careers | 3–4 tabs (Campus / Experienced / Trade / Military analogue). Each tab swaps a hero-like card with portrait + headline + dual CTA. |
| **Numbered list / process timeline** | Services, Sustainability | Vertical timeline desktop, alternating left/right; horizontal step strip optional. Numeric markers (01, 02, 03). |
| **Logo grid** | About / Partners block | 6-column desktop, mono-color treatment. |
| **Filterable index** | Projects, Insights | Sidebar/accordion filters on the reference. Naksha brief asks for filter chips — use horizontal pill bar at top instead, more contemporary. |
| **CTA banner (full-bleed)** | Bottom of nearly every page above the footer | Background image with dark overlay + centered headline + primary button. ~320–400px tall desktop. |
| **Map block** | Contact, Locations | Embedded map (Google Maps or Mapbox) at ~16:9, with a card overlay containing the office address. |
| **Office card grid** | Locations | 3-column. Card = city name H3, address block, phone, "Get directions" link. |
| **FAQ accordion** | Optional on Service detail pages | Single-column, full-width, hairline dividers, plus/minus toggle. |
| **Multi-step contact form** | Contact | Brief asks for multi-step. Reference uses single-step per purpose. We will implement: Step 1 intent (Project / Careers / Press / General), Step 2 contact details, Step 3 message + submit. |

---

## 6. Typography scale

The reference uses an all-sans system. Naksha will pair **Fraunces** (serif, display + editorial) with **Inter** (sans, UI + body) per the brief.

| Role | Token | Desktop | Mobile | Weight | Line-height | Family |
|---|---|---|---|---|---|---|
| Display XL (hero) | `display-xl` | 80px | 48px | 500 | 1.05 | Fraunces |
| Display L | `display-lg` | 64px | 40px | 500 | 1.08 | Fraunces |
| H1 | `h1` | 48px | 36px | 500 | 1.1 | Fraunces |
| H2 | `h2` | 36px | 28px | 500 | 1.15 | Fraunces |
| H3 | `h3` | 24px | 22px | 600 | 1.2 | Inter |
| H4 | `h4` | 20px | 18px | 600 | 1.3 | Inter |
| Lead paragraph | `lead` | 22px | 18px | 400 | 1.55 | Inter |
| Body | `body` | 16px | 16px | 400 | 1.6 | Inter |
| Body small / meta | `body-sm` | 14px | 14px | 400 | 1.5 | Inter |
| Eyebrow / caps label | `eyebrow` | 12px | 12px | 600 (tracked +0.12em uppercase) | 1.4 | Inter |
| Button | `button` | 15px | 15px | 600 | 1 | Inter |

**Step ratio:** ~1.33 (perfect fourth) between H-levels. Headlines: tight letter-spacing (-0.01em). Eyebrows: +0.12em. Body: 0.

---

## 7. Color tokens

The reference's palette: near-black surface, cream paper, a warm orange accent, and a mid-grey neutral. Naksha replaces all hex values with our own brand tokens (already defined by the brief):

| Role | Token | Hex |
|---|---|---|
| Surface dark / ink | `--ink` | `#0E0E0E` |
| Surface paper | `--paper` | `#F5F1EC` |
| Accent (CTA, link, hover) | `--accent` | `#C0532A` |
| Neutral grey (secondary text, borders) | `--concrete` | `#8A8A87` |
| Accent hover (derived) | `--accent-hi` | tint of `#C0532A` ~10% lighter |
| Hairline / divider | `--rule` | `rgba(14,14,14,0.12)` on paper, `rgba(255,255,255,0.12)` on ink |
| Inverse text on ink | `--paper-on-ink` | `#F5F1EC` |
| Muted text on paper | `--concrete-text` | `#5C5C58` (derived for AA contrast) |

All foreground/background pairings will be checked against WCAG AA (4.5:1 body, 3:1 large).

---

## 8. Spacing & grid

| Token | Value |
|---|---|
| Container max-width | 1320px |
| Wide container | 1440px (full-bleed media insets) |
| Reading column max | 720px |
| Gutter (desktop) | 32px |
| Gutter (mobile) | 16px |
| Section padding Y (desktop) | 120px (large) / 96px (medium) / 64px (compact) |
| Section padding Y (mobile) | 72px / 56px / 40px |
| Card inner padding | 32px desktop / 20px mobile |
| Border radius (cards, buttons) | 4px (the reference uses near-square; keep restrained) |
| Grid columns | 12-column desktop / 6 tablet / 4 mobile |
| Spacing scale (Tailwind) | use default 4px base — we'll alias `section-y-lg = 120px`, etc. in tokens.ts |

**Breakpoints:** 375 / 768 / 1024 / 1440 (per brief).

---

## 9. Animation / motion

The reference is restrained — most motion is on enter and on hover.

| Pattern | Where | Implementation |
|---|---|---|
| Header transparency → solid on scroll | Global | Listen to `scrollY > 80`. Animate `background-color` and `border-bottom` over 200ms. |
| Fade-in-up on section enter | All section primitives | Framer Motion `whileInView` — `opacity 0 → 1`, `translateY 24px → 0`, 600ms, ease-out, once. Stagger children by 80ms in grids. |
| Counter animation | Stat-counter strip | Animate from 0 to target on enter, 1.6s, ease-out. |
| Hover zoom on project / market cards | Card grids | `transform: scale(1.04)` on inner image, 500ms cubic-bezier(.2,.7,.2,1). Caption color shift to accent. |
| Carousel transitions | Commitments, Career tabs | 400ms cross-fade + 8px translate. |
| Page transitions | Route changes | Fade + 12px lift on enter (200ms). Lenis smooth-scroll resets to top on navigation. |
| Parallax | Hero only | Background translates at 0.3× scroll speed; brief explicitly asks for hero parallax. |
| Scroll cue | Hero | 6px vertical bounce loop, 1.6s ease-in-out infinite. |
| Smooth scroll | Global | Lenis with default easing. Respect `prefers-reduced-motion` — disable parallax, counters, and lift on enter; keep static fade only. |

---

## 10. Mega-menu sub-page categories (for nav build)

| Top-level | Sub-items rendered in mega-menu |
|---|---|
| **About** | Who We Are · Leadership · Our Story · Locations · Sustainability · Press |
| **Markets** | Aviation · Commercial · Education · Healthcare · Pharmaceutical · Sports · Government · Data Centers |
| **Services** | Construction Management · General Contracting · Design-Build · Preconstruction · Special Projects |
| **Projects** | (no submenu — link goes straight to filterable index) Optional small "Featured" thumbnail card teaser. |
| **Insights** | (no submenu — link to index) Optional 2 latest article thumbnails as teaser. |
| **Careers** | Why Naksha · Open Roles · Life at Naksha · Apprenticeships |
| **Contact** | (no submenu — direct link) |

---

## 11. Page-template recipes (Step 3 build order)

Each page below is composed from the section primitives in §5. This is the build manifest for Step 3.

| Page | Section stack |
|---|---|
| **/** Home | hero (video) → intro paragraph → markets card grid → stat strip → services card grid → featured projects (3) → commitments carousel → latest insights (3) → CTA banner |
| **/about** | hero (image) → intro → two-col split (mission) → stat strip → timeline (history) → leader grid → values carousel → CTA banner |
| **/markets** index | hero → intro → 2×4 markets card grid (8 sectors) → CTA banner |
| **/markets/[sector]** | hero (sector image) → breadcrumbs → intro → two-col split (capabilities) → featured projects in sector (carousel) → stat strip → testimonial → CTA banner |
| **/services** index | hero → intro → 5-card services grid → process timeline → CTA banner |
| **/services/[slug]** | hero → breadcrumbs → intro → two-col split (what we do / how) → process timeline → FAQ accordion → related projects (3) → CTA banner |
| **/projects** index | hero → filter pill bar → 2-col project grid (12) → pagination → CTA banner |
| **/projects/[slug]** | full-bleed cover → meta strip (location · sqft · year · sector) → intro paragraph → image gallery / carousel + lightbox → two-col split (challenge / solution) → stat strip → testimonial → related projects (3) → CTA banner |
| **/sustainability** | hero → intro → values 3-col → stat strip → timeline → image-text alternating (3 commitments) → CTA banner |
| **/careers** | hero → intro → career-stage tabs (4) → benefits 4-col grid → testimonial carousel (employee stories) → open-roles teaser → CTA banner |
| **/careers/openings** | hero (compact) → filter pill bar (department, location, type) → job card list → CTA banner |
| **/careers/[role]** | breadcrumbs → role hero → role meta strip → two-col split (about / requirements) → benefits → apply-now CTA |
| **/insights** | compact hero → filter pill bar → article grid (3-col, contemporary upgrade over the reference's stacked list) → pagination → CTA banner |
| **/insights/[slug]** | cover image → meta (date · category · author) → article body (max 720px) → pull-quote variants → related articles (3) → CTA banner |
| **/locations** | hero → office card grid (3-col) → map block → CTA banner |
| **/contact** | compact hero → multi-step form (intent → details → message) ←→ side card (HQ address, phone, email, hours) → map block → FAQ accordion |

---

## 12. Notable deviations from the reference (intentional)

| Area | Reference | Naksha plan | Why |
|---|---|---|---|
| Hero media | Image | Looping muted video | Brief explicitly requests video hero. |
| Typography | All sans | Serif (Fraunces) + sans (Inter) pairing | Brief specifies — gives Naksha an editorial, premium feel distinct from the reference. |
| Filter UI | Sidebar accordion | Horizontal pill chips at top | More contemporary, better mobile UX, brief calls for filterable grid with category chips. |
| Insights index card layout | Stacked single-column list | 3-column responsive grid | Density + visual variety. |
| Newsletter signup in footer | Absent | Inline email field above footer columns | Brief requires it. |
| Contact form | Single-step per purpose | Single multi-step form with intent picker | Brief requires multi-step validated form. |
| Color palette | Near-black + cream + warm orange | Charcoal `#0E0E0E` + warm off-white `#F5F1EC` + terracotta `#C0532A` + concrete grey `#8A8A87` | Original Naksha brand tokens. |
| Logo | Reference's wordmark | Plain "NAKSHA" wordmark in Fraunces | No reproduction of reference branding. |

---

## 13. What is *not* being copied (compliance line)

To be explicit for the record:

- **No** copy, headlines, taglines, or body text from the reference is used anywhere — all copy will be Lorem Ipsum or faker-generated.
- **No** images, photographs, video, illustrations, icons, or logos from the reference are downloaded, embedded, hot-linked, or recreated.
- **No** fonts from the reference are loaded — Naksha uses Fraunces + Inter from Google Fonts.
- **No** color hex values from the reference are reused — Naksha uses the four brand tokens specified in the brief.
- **No** project names, leader names, office addresses, or other proper nouns from the reference appear in Naksha's content; placeholder content uses faker (fictional people, fictional Rajasthan/India locations, fictional sqft and durations).

The reference informed only **layout, IA, component composition, type scale ratios, spacing rhythm, and motion patterns** — none of which are protectable expression on their own.

---

## 14. Open decisions to confirm before Step 2

Quick checklist for your sign-off:

1. **Hero video:** OK to use one royalty-free Pexels/Coverr construction b-roll site-wide as the hero loop? (vs. a per-page image set)
2. **Header CTA label:** "Start a Project" — OK, or prefer "Get a Quote" / "Book a Consultation"?
3. **Filter UI direction:** chip pills at top (recommended), or replicate reference's sidebar-accordion?
4. **Insights index:** 3-column grid (recommended) vs. stacked list?
5. **Project meta on detail page:** confirm fields = Location · Sector · Sq. ft. · Duration · Year. Add Client (placeholder)?
6. **Mega-menu teasers:** include small thumbnail teasers in the dropdowns (Markets, Services, Insights), or text-only?
7. **Multi-step contact form:** confirm 3 steps = Intent → Contact details → Message + Submit. Add file-upload (RFP attachment) on Step 2?

Once you confirm (or override) the above, I'll proceed to Step 2 — design tokens — and then scaffold.
