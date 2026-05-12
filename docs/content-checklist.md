# Content Checklist

A page-by-page punch list of every text slot and image slot you need to fill, with recommended dimensions and word counts. Cross items off as you ship them.

---

## Global

| Slot | Where | Type | Recommended length / size |
|---|---|---|---|
| Logo / wordmark | `components/Wordmark.tsx` | text or SVG | 1–2 words; SVG ≤ 200×60 |
| Tagline | `lib/site.ts → SITE.tagline` | text | ≤ 12 words |
| Phone | `lib/site.ts → SITE.phone` | text | – |
| Email | `lib/site.ts → SITE.email` | text | – |
| HQ address | `lib/site.ts → SITE.address` | text | 2 lines + country |
| Social URLs (LinkedIn/IG/FB/YT) | `lib/site.ts → SITE.social` | URLs | – |
| Hero video URL | `lib/site.ts → SITE.heroVideoUrl` | MP4 URL | 1920×1080, < 5 MB, ~10s loop, muted |
| Hero poster image | `lib/site.ts → SITE.heroPosterImage` | image URL | 1920×1080 |
| Open Graph default | `https://placehold.co/...` in `lib/seo.ts` | image URL | 1200×630 |
| Favicon (currently default) | `app/favicon.ico` | ico/png | 32×32 |

---

## Navigation & footer

| Slot | Where | Notes |
|---|---|---|
| Main nav labels | `lib/site.ts → NAV` | 6 top-level + sub-items |
| Footer column headings + links | `lib/site.ts → FOOTER_COLUMNS` | 3 columns |
| Persistent CTA label | `components/Header.tsx` (currently "Start a Project") | – |

---

## Home (`app/page.tsx`)

| Slot | Type | Recommended |
|---|---|---|
| Hero headline | text | 6–12 words, two-line |
| Hero sub | text | 18–32 words |
| Hero primary CTA label / link | text + URL | 2–3 words |
| Hero secondary CTA label / link | text + URL | 2–3 words |
| About intro headline | text | 12–22 words, serif |
| About intro paragraph | text | 40–80 words |
| Markets section eyebrow + heading | text | 1–4 words / 3–5 words |
| Markets shown (cards) | data — `MARKETS` (first 6) | – |
| Stats strip heading | text | 6–14 words |
| Stats × 4 | data — `COMPANY_STATS` | numeric value + label |
| Services section heading + intro | text | 3–5 words / 30–60 words |
| Services shown (cards) | data — `SERVICES` (first 4) | – |
| Featured projects | data — `PROJECTS` (first 3) | – |
| Commitments carousel | data — `COMMITMENTS` (5 tabs) | image + heading + body per tab |
| Testimonial #1 | data — `TESTIMONIALS[0]` | quote ≤ 40 words |
| Latest insights | data — `ARTICLES` (first 3) | – |
| Closing CTA banner | text | heading 4–8 words / sub 14–24 words |

---

## About (`app/about/page.tsx`)

| Slot | Type | Recommended |
|---|---|---|
| Hero image | image URL | 1920×1080 |
| Hero eyebrow / title / sub | text | 1 / 6–10 words / 18–32 words |
| Intro split — heading | text | 6–10 words |
| Intro split — body | text | 60–120 words |
| Intro split — bullets | text × 4 | ≤ 8 words each |
| Intro split — image | image URL | 1400×1000 |
| History timeline | data — `TIMELINE` | 6 milestones |
| Leadership cards | data — `LEADERS` | 8 portraits @ 800×800 |
| Testimonial | data — `TESTIMONIALS[1]` | quote ≤ 40 words |
| Closing CTA banner | text | – |

---

## Markets index (`app/markets/page.tsx`)

| Slot | Type | Recommended |
|---|---|---|
| Hero image | image URL | 1920×1080 |
| Hero copy | text | – |
| Intro paragraph | text | 30–60 words |
| Cards | data — `MARKETS` (8) | each: title, short, image (1600×1000) |

## Markets detail (`app/markets/[sector]/page.tsx`)

| Slot | Type | Recommended |
|---|---|---|
| Per-market: title, short, intro, capabilities, image, stats | data — `MARKETS[i]` | title 1–3 words; short ≤ 22 words; intro 60–120 words; capabilities × 4; image 1600×1000; stats × 3 |
| Capabilities split image | image URL | 1400×1000 |

---

## Services index (`app/services/page.tsx`)

| Slot | Type | Recommended |
|---|---|---|
| Hero copy + image | text + 1920×1080 | – |
| Service cards | data — `SERVICES` (5) | – |
| Process timeline (4 steps) | inline `PROCESS` array on the page | – |

## Services detail (`app/services/[slug]/page.tsx`)

| Slot | Type | Recommended |
|---|---|---|
| Per-service: title, short, description, outcomes, process, faq, image | data — `SERVICES[i]` | description 80–140 words; outcomes × 4; process × 4 steps; FAQ × 4 |

---

## Projects index (`app/projects/page.tsx`)

| Slot | Type | Recommended |
|---|---|---|
| Hero copy + image | text + 1920×1080 | – |
| Project cards | data — `PROJECTS` | 12 entries |

## Project detail (`app/projects/[slug]/page.tsx`)

| Slot | Type | Recommended |
|---|---|---|
| Cover image | data — `Project.cover` | 1600×1000 (or larger) |
| Title, category, location | text | – |
| Meta strip (location, sector, sq ft, duration, year) | data | – |
| Overview paragraph | text | 60–120 words |
| Gallery (4 images) | data — `Project.gallery` | each 1400×900 |
| Challenge body | text | 80–140 words |
| Solution body + outcomes | text + bullets × 4 | – |
| Testimonial | data — `Project.testimonial` | optional |

---

## Sustainability (`app/sustainability/page.tsx`)

| Slot | Type | Recommended |
|---|---|---|
| Hero image | 1920×1080 | – |
| Hero copy | – | – |
| Intro paragraph (long) | text | 100–180 words |
| Stats × 4 | inline `SUSTAINABILITY_STATS` | – |
| Each commitment block (5) | data — `COMMITMENTS` | image 1400×900 + body 80–140 words |

---

## Careers — hub (`app/careers/page.tsx`)

| Slot | Type | Recommended |
|---|---|---|
| Hero image | 1920×1080 | – |
| Hero copy | – | – |
| Intro headline / link | text | – |
| Career-stage tabs (4) | inline `STAGES` | image 1200×1500 portrait + 60–100 words per tab |
| Benefits (5) | inline `BENEFITS` | icon + title + 1-line body |
| Testimonial | data — `TESTIMONIALS[2]` | – |
| Open roles teaser (4) | data — `JOBS` | – |

## Careers — Why Naksha (`app/careers/why-naksha/page.tsx`)

| Slot | Type | Recommended |
|---|---|---|
| Hero | image + copy | – |
| Studio split | text + 1400×1000 | – |
| Values × 3 | inline `VALUES` | – |
| Stats × 4 | inline `STATS` | – |

## Careers — Openings (`app/careers/openings/page.tsx`)

| Slot | Type | Recommended |
|---|---|---|
| All open roles | data — `JOBS` | each: title, department, location, type, summary, responsibilities, requirements, benefits |

## Careers — Role detail (`app/careers/[role]/page.tsx`)

Driven entirely by the role's entry in `JOBS`. Replace items in that array.

---

## Insights index (`app/insights/page.tsx`)

| Slot | Type | Recommended |
|---|---|---|
| Hero image + copy | image + text | 1920×1080 |
| Articles | data — `ARTICLES` | 8 entries |

## Article detail (`app/insights/[slug]/page.tsx`)

| Slot | Type | Recommended |
|---|---|---|
| Cover image | data — `Article.cover` | 1600×1000 |
| Title | text | 8–16 words |
| Author + date | data | – |
| Excerpt (lead paragraph) | text | 30–60 words |
| Body paragraphs | data — `Article.body` | array of paragraphs |
| Pull-quote | inline on the page | optional |

---

## Locations (`app/locations/page.tsx`)

| Slot | Type | Recommended |
|---|---|---|
| Hero | image + copy | 1920×1080 |
| Each office card | data — `LOCATIONS` | image 1200×800, address, phone, email |
| Map embed | iframe | already pointed at OpenStreetMap — swap for Google Maps embed if preferred |

---

## Contact (`app/contact/page.tsx`)

| Slot | Type | Recommended |
|---|---|---|
| Heading + sub | text | – |
| Address / phone / email / hours | `lib/site.ts` | – |
| Form intent options | inline `INTENTS` in `components/ContactForm.tsx` | – |
| Form submission endpoint | currently a no-op | wire to your backend / form service (e.g. Formspree, Resend, or your own API route) |
| Map embed | iframe | – |
| FAQ × 4 | inline on the page | – |

---

## Legal

| Slot | Type | Recommended |
|---|---|---|
| Privacy body | `app/legal/privacy/page.tsx` | – |
| Terms body | `app/legal/terms/page.tsx` | – |

These are scaffolded with section headings and Lorem paragraphs — replace with your actual legal copy.

---

## Image-source attribution

Every image group on the site has a `<!-- attribution -->` HTML comment near it (left in the JSX) showing the source (currently `picsum.photos`). Update or remove these comments when you replace placeholders with your own photography.

---

## Recommended image dimensions (summary)

| Use | Recommended |
|---|---|
| Hero (full-bleed) | 1920×1080 |
| Page hero | 1920×1080 |
| Market card | 1600×1000 (4:5 crop on display) |
| Project card | 1600×1000 (displayed 4:3) |
| Project gallery | 1400×900 |
| Service detail / TwoColumnSplit | 1400×1000 |
| Article cover | 1600×1000 (displayed 16:9) |
| Leader portrait | 800×800 (square) |
| Career stage portrait | 1200×1500 (4:5) |
| Location office | 1200×800 (3:2) |
| CTA banner | 2000×1100 (gets darkened overlay) |
| OG default | 1200×630 |

Use lossy JPEG (quality 75–82) for photography, WebP/AVIF if you can. `next/image` handles modern formats automatically.
