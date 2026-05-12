import type { MetadataRoute } from "next";
import { ARTICLES, JOBS, MARKETS, PROJECTS, SERVICES } from "@/lib/data";
import { SITE } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = SITE.url;
  const now = new Date().toISOString();
  const stat = [
    "/",
    "/about",
    "/markets",
    "/services",
    "/projects",
    "/sustainability",
    "/careers",
    "/careers/why-naksha",
    "/careers/openings",
    "/insights",
    "/locations",
    "/contact",
    "/legal/privacy",
    "/legal/terms",
  ];
  return [
    ...stat.map((p) => ({ url: `${base}${p}`, lastModified: now })),
    ...MARKETS.map((m) => ({ url: `${base}/markets/${m.slug}`, lastModified: now })),
    ...SERVICES.map((s) => ({ url: `${base}/services/${s.slug}`, lastModified: now })),
    ...PROJECTS.map((p) => ({ url: `${base}/projects/${p.slug}`, lastModified: now })),
    ...JOBS.map((j) => ({ url: `${base}/careers/${j.slug}`, lastModified: now })),
    ...ARTICLES.map((a) => ({ url: `${base}/insights/${a.slug}`, lastModified: now })),
  ];
}
