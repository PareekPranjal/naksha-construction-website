// Server-side API client. Use from server components / route handlers only.
// Public pages set `export const revalidate = 60` so reads are cached.

import type { Project, Article, Job, Location, Leader } from "./data";

const API = process.env.NEXT_PUBLIC_API_URL ?? process.env.API_URL ?? "http://localhost:4000";

async function get<T>(path: string, opts: { revalidate?: number } = {}): Promise<T> {
  const res = await fetch(`${API}${path}`, {
    next: { revalidate: opts.revalidate ?? 60 },
  });
  if (!res.ok) throw new Error(`API ${path} → ${res.status}`);
  return res.json();
}

async function getOrNull<T>(path: string, opts: { revalidate?: number } = {}): Promise<T | null> {
  const res = await fetch(`${API}${path}`, {
    next: { revalidate: opts.revalidate ?? 60 },
  });
  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`API ${path} → ${res.status}`);
  return res.json();
}

// Embedded SEO columns (now present on Project / Service / Market / Article / Leader / Job).
export type ApiCollectionSEO = {
  seoTitle: string | null;
  seoDescription: string | null;
  seoOgImage: string | null;
  seoKeywords: string[] | null;
  seoOgTitle: string | null;
  seoOgDescription: string | null;
  seoCanonicalUrl: string | null;
  seoNoIndex: boolean | null;
  seoNoFollow: boolean | null;
};

// ── API row shapes (mirror Prisma) ───────────────────────────────────────────
export type ApiProject = ApiCollectionSEO & {
  id: string;
  slug: string;
  title: string;
  market: string;
  location: string;
  year: number;
  client: string | null;
  size: string | null;
  duration: string | null;
  summary: string;
  description: string;
  coverImage: string | null;
  coverImageAlt: string | null;
  gallery: { url: string; alt: string }[];
  highlights: string[];
  updatedAt: string;
};

export type ApiArticle = ApiCollectionSEO & {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  body: string;
  cover: string | null;
  coverAlt: string | null;
  author: string;
  category: string | null;
  publishedAt: string;
  updatedAt: string;
};

export type ApiJob = ApiCollectionSEO & {
  id: string;
  slug: string;
  title: string;
  department: string;
  location: string;
  type: "Full-time" | "Contract" | "Apprenticeship";
  summary: string;
  responsibilities: string[];
  requirements: string[];
  benefits: string[];
  updatedAt: string;
};

type ApiLocation = {
  id: string;
  slug: string;
  city: string;
  address: string[];
  phone: string | null;
  email: string | null;
  image: string | null;
  imageAlt: string | null;
};

export type ApiLeader = ApiCollectionSEO & {
  id: string;
  slug: string;
  name: string;
  role: string;
  bio: string;
  portrait: string | null;
  portraitAlt: string | null;
  updatedAt: string;
};

// ── Adapters: API row → legacy lib/data type so existing components work ─────
function adaptProject(p: ApiProject): Project {
  return {
    slug: p.slug,
    title: p.title,
    category: p.market,
    location: p.location,
    year: p.year,
    squareFeet: p.size ?? "",
    duration: p.duration ?? "",
    client: p.client ?? "",
    cover: p.coverImage ?? "",
    coverAlt: p.coverImageAlt ?? `${p.title}, ${p.location}`,
    gallery: p.gallery.map((g) => ({ url: g.url, alt: g.alt ?? p.title })),
    challenge: p.summary,
    solution: p.description,
    outcomes: p.highlights ?? [],
  };
}

function adaptArticle(a: ApiArticle): Article {
  return {
    slug: a.slug,
    title: a.title,
    category: a.category ?? "",
    date: a.publishedAt,
    excerpt: a.excerpt,
    author: a.author,
    cover: a.cover ?? "",
    coverAlt: a.coverAlt ?? a.title,
    body: a.body ? a.body.split(/\n\n+/).map((s) => s.trim()).filter(Boolean) : [],
  };
}

function adaptJob(j: ApiJob): Job {
  return {
    slug: j.slug,
    title: j.title,
    department: j.department,
    location: j.location,
    type: j.type,
    summary: j.summary,
    responsibilities: j.responsibilities ?? [],
    requirements: j.requirements ?? [],
    benefits: j.benefits ?? [],
  };
}

function adaptLocation(l: ApiLocation) {
  return {
    city: l.city,
    address: l.address,
    phone: l.phone ?? "",
    email: l.email ?? "",
    image: l.image ?? "",
    imageAlt: l.imageAlt ?? `${l.city} office`,
  };
}

function adaptLeader(l: ApiLeader): Leader {
  return {
    name: l.name,
    role: l.role,
    bio: l.bio,
    avatar: l.portrait ?? "",
    avatarAlt: l.portraitAlt ?? `${l.name}, ${l.role}`,
  };
}

// ── Additional types for markets, services, page docs, globals ───────────────
export type ApiMarket = ApiCollectionSEO & {
  id: string;
  slug: string;
  title: string;
  summary: string;
  image: string | null;
  imageAlt: string | null;
  body: string;
  updatedAt: string;
};

export type ApiService = ApiCollectionSEO & {
  id: string;
  slug: string;
  title: string;
  summary: string;
  icon: string | null;
  iconAlt: string | null;
  bullets: string[];
  body: string;
  updatedAt: string;
};

type ApiTestimonial = {
  id: string;
  quote: string;
  author: string;
  role: string | null;
  company: string | null;
  avatar: string | null;
  avatarAlt: string | null;
};

export type ApiPage = {
  id: string;
  key: string;
  path: string;
  title: string;
  blocks: unknown;
  seoTitle: string | null;
  seoDescription: string | null;
  seoOgImage: string | null;
  seoKeywords: string | null;
  seoRobots: string | null;
  seoCanonical: string | null;
  ogTitle: string | null;
  ogDescription: string | null;
  ogType: string | null;
  twitterCard: string | null;
  twitterTitle: string | null;
  twitterDescription: string | null;
  twitterImage: string | null;
};

export type ApiGlobal = {
  id: string;
  key: string;
  value: unknown;
};

// ── Public fetchers ──────────────────────────────────────────────────────────
export const cms = {
  async projects(): Promise<Project[]> {
    const list = await get<ApiProject[]>("/projects");
    return list.map(adaptProject);
  },
  async project(slug: string): Promise<Project | null> {
    const p = await getOrNull<ApiProject>(`/projects/by-slug/${encodeURIComponent(slug)}`);
    return p ? adaptProject(p) : null;
  },
  // Raw API fetchers — preserve embedded SEO columns for use in generateMetadata().
  async projectRaw(slug: string): Promise<ApiProject | null> {
    return getOrNull<ApiProject>(`/projects/by-slug/${encodeURIComponent(slug)}`);
  },
  async articles(): Promise<Article[]> {
    const list = await get<ApiArticle[]>("/articles");
    return list.map(adaptArticle);
  },
  async article(slug: string): Promise<Article | null> {
    const a = await getOrNull<ApiArticle>(`/articles/by-slug/${encodeURIComponent(slug)}`);
    return a ? adaptArticle(a) : null;
  },
  async articleRaw(slug: string): Promise<ApiArticle | null> {
    return getOrNull<ApiArticle>(`/articles/by-slug/${encodeURIComponent(slug)}`);
  },
  async jobs(): Promise<Job[]> {
    const list = await get<ApiJob[]>("/jobs");
    return list.map(adaptJob);
  },
  async job(slug: string): Promise<Job | null> {
    const j = await getOrNull<ApiJob>(`/jobs/by-slug/${encodeURIComponent(slug)}`);
    return j ? adaptJob(j) : null;
  },
  async jobRaw(slug: string): Promise<ApiJob | null> {
    return getOrNull<ApiJob>(`/jobs/by-slug/${encodeURIComponent(slug)}`);
  },
  async locations(): Promise<ReturnType<typeof adaptLocation>[]> {
    const list = await get<ApiLocation[]>("/locations");
    return list.map(adaptLocation);
  },
  async leaders(): Promise<Leader[]> {
    const list = await get<ApiLeader[]>("/leaders");
    return list.map(adaptLeader);
  },
  async markets(): Promise<ApiMarket[]> {
    return get<ApiMarket[]>("/markets");
  },
  async market(slug: string): Promise<ApiMarket | null> {
    return getOrNull<ApiMarket>(`/markets/by-slug/${encodeURIComponent(slug)}`);
  },
  async services(): Promise<ApiService[]> {
    return get<ApiService[]>("/services");
  },
  async service(slug: string): Promise<ApiService | null> {
    return getOrNull<ApiService>(`/services/by-slug/${encodeURIComponent(slug)}`);
  },
  async testimonials(): Promise<ApiTestimonial[]> {
    return get<ApiTestimonial[]>("/testimonials");
  },
  async page(key: string): Promise<ApiPage | null> {
    return getOrNull<ApiPage>(`/pages/by-key/${encodeURIComponent(key)}`);
  },
  async pageByPath(path: string): Promise<ApiPage | null> {
    const p = path.startsWith("/") ? path : `/${path}`;
    return getOrNull<ApiPage>(`/pages/by-path?path=${encodeURIComponent(p)}`);
  },
  async global(key: string): Promise<ApiGlobal | null> {
    return getOrNull<ApiGlobal>(`/globals/${encodeURIComponent(key)}`);
  },
};

// Helper for SEO from a Page document.
export function pageSeo(page: ApiPage | null) {
  if (!page) return {};
  return {
    title: page.seoTitle ?? page.title,
    description: page.seoDescription ?? undefined,
    image: page.seoOgImage ?? undefined,
  };
}
