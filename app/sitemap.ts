import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

export const revalidate = 3600;

const API = process.env.NEXT_PUBLIC_API_URL ?? process.env.API_URL ?? "http://localhost:4000";

type Indexable = { slug: string; updatedAt?: string; publishedAt?: string };

async function fetchGroup<T>(path: string): Promise<T[]> {
  try {
    const res = await fetch(`${API}${path}`, {
      signal: AbortSignal.timeout(8000),
      next: { revalidate: 3600 },
    });
    if (!res.ok) return [];
    return (await res.json()) as T[];
  } catch {
    return [];
  }
}

const STATIC_ROUTES: { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] }[] = [
  { path: "/", priority: 1.0, changeFrequency: "weekly" },
  { path: "/about", priority: 0.8, changeFrequency: "monthly" },
  { path: "/markets", priority: 0.8, changeFrequency: "monthly" },
  { path: "/services", priority: 0.9, changeFrequency: "monthly" },
  { path: "/projects", priority: 0.9, changeFrequency: "weekly" },
  { path: "/sustainability", priority: 0.6, changeFrequency: "yearly" },
  { path: "/careers", priority: 0.7, changeFrequency: "weekly" },
  { path: "/careers/why-naksha", priority: 0.5, changeFrequency: "yearly" },
  { path: "/careers/openings", priority: 0.7, changeFrequency: "weekly" },
  { path: "/insights", priority: 0.7, changeFrequency: "weekly" },
  { path: "/locations", priority: 0.6, changeFrequency: "monthly" },
  { path: "/contact", priority: 0.7, changeFrequency: "yearly" },
  { path: "/legal/privacy", priority: 0.3, changeFrequency: "yearly" },
  { path: "/legal/terms", priority: 0.3, changeFrequency: "yearly" },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = SITE_URL;
  const now = new Date();

  const [projects, services, markets, articles, jobs] = await Promise.all([
    fetchGroup<Indexable>("/projects"),
    fetchGroup<Indexable>("/services"),
    fetchGroup<Indexable>("/markets"),
    fetchGroup<Indexable>("/articles"),
    fetchGroup<Indexable>("/jobs"),
  ]);

  const dynRoutes = (
    items: Indexable[],
    basePath: string,
    priority: number,
    changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"],
  ): MetadataRoute.Sitemap =>
    items.map((it) => ({
      url: `${base}${basePath}/${it.slug}`,
      lastModified: it.updatedAt ? new Date(it.updatedAt) : it.publishedAt ? new Date(it.publishedAt) : now,
      changeFrequency,
      priority,
    }));

  return [
    ...STATIC_ROUTES.map((r) => ({
      url: `${base}${r.path}`,
      lastModified: now,
      changeFrequency: r.changeFrequency,
      priority: r.priority,
    })),
    ...dynRoutes(projects, "/projects", 0.8, "monthly"),
    ...dynRoutes(services, "/services", 0.8, "monthly"),
    ...dynRoutes(markets, "/markets", 0.7, "monthly"),
    ...dynRoutes(articles, "/insights", 0.6, "monthly"),
    ...dynRoutes(jobs, "/careers", 0.7, "weekly"),
  ];
}
