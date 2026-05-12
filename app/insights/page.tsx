"use client";

import { useState, useMemo, useEffect } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PageHero } from "@/components/PageHero";
import { SectionContainer, Eyebrow } from "@/components/SectionContainer";
import { ArticleCard } from "@/components/ArticleCard";
import { FilterPills } from "@/components/FilterPills";
import { CTABanner } from "@/components/CTABanner";
import { LOREM, type Article } from "@/lib/data";
import { picsum } from "@/lib/utils";

const API = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";

export default function InsightsIndexPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  useEffect(() => {
    fetch(`${API}/articles`)
      .then((r) => r.json())
      .then((rows: Array<{ slug: string; title: string; excerpt: string; body: string; cover: string | null; author: string; category: string | null; publishedAt: string }>) =>
        setArticles(
          rows.map((a) => ({
            slug: a.slug,
            title: a.title,
            category: a.category ?? "",
            date: a.publishedAt,
            excerpt: a.excerpt,
            author: a.author,
            cover: a.cover ?? "",
            body: a.body ? a.body.split(/\n\n+/).filter(Boolean) : [],
          })),
        ),
      )
      .catch(() => undefined);
  }, []);
  const [active, setActive] = useState("All");
  const categories = useMemo(
    () => ["All", ...Array.from(new Set(articles.map((a) => a.category)))],
    [articles],
  );
  const filtered = active === "All" ? articles : articles.filter((a) => a.category === active);
  const [featured, ...rest] = filtered;

  return (
    <>
      <Header />
      <main className="pt-[64px] md:pt-[72px]">
        <PageHero
          eyebrow="Insights"
          title="Field notes from the studio."
          sub="Articles, observations, and the occasional lesson learned the hard way."
          image={picsum("insights-hero", 1920, 1080)}
          height="sm"
        />

        <SectionContainer size="lg">
          <div className="max-w-reading">
            <Eyebrow>Read</Eyebrow>
            <p className="mt-4 text-lead text-concrete-text">{LOREM.medium}</p>
          </div>

          <div className="mt-10">
            <FilterPills options={categories} active={active} onChange={setActive} />
          </div>

          {featured && (
            <div className="mt-12">
              <div className="grid grid-cols-1 gap-x-8 gap-y-12 md:grid-cols-3">
                <ArticleCard article={featured} featured />
              </div>
            </div>
          )}

          {rest.length > 0 && (
            <div className="mt-12 grid grid-cols-1 gap-x-8 gap-y-12 md:grid-cols-3">
              {rest.map((a) => (
                <ArticleCard key={a.slug} article={a} />
              ))}
            </div>
          )}
        </SectionContainer>

        <CTABanner heading="Get insights in your inbox." sub="Quarterly only. No spam, unsubscribe anytime." />
      </main>
      <Footer />
    </>
  );
}
