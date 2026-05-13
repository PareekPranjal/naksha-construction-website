import { notFound } from "next/navigation";
import Image from "next/image";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SectionContainer, Eyebrow } from "@/components/SectionContainer";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ArticleCard } from "@/components/ArticleCard";
import { CTABanner } from "@/components/CTABanner";
import { AnimateInView } from "@/components/AnimateInView";
import { cms } from "@/lib/api";
import { Paragraphs } from "@/components/Paragraphs";
import { formatDate } from "@/lib/utils";
import {
  generateArticleMetadata,
  generateBreadcrumbSchema,
  generateArticleSchema,
  getGlobalSEO,
  SITE_URL,
} from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";

export const revalidate = 60;

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const a = await cms.articleRaw(params.slug);
  if (!a) return {};
  return generateArticleMetadata(a);
}

export default async function ArticlePage({ params }: { params: { slug: string } }) {
  const [article, raw, all, global] = await Promise.all([
    cms.article(params.slug),
    cms.articleRaw(params.slug),
    cms.articles(),
    getGlobalSEO(),
  ]);
  if (!article || !raw) notFound();
  const related = all.filter((a) => a.slug !== article.slug).slice(0, 3);

  const breadcrumb = generateBreadcrumbSchema([
    { name: "Home", url: `${SITE_URL}/` },
    { name: "Insights", url: `${SITE_URL}/insights` },
    { name: article.title, url: `${SITE_URL}/insights/${article.slug}` },
  ]);
  const articleSchema = generateArticleSchema(raw, global);

  return (
    <>
      <JsonLd data={[breadcrumb, articleSchema]} />
      <Header />
      <main className="pt-[64px] md:pt-[72px]">
        <SectionContainer size="md">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Insights", href: "/insights" },
              { label: article.title },
            ]}
          />
        </SectionContainer>

        <SectionContainer size="md">
          <div className="mx-auto max-w-3xl">
            <Eyebrow>{article.category}</Eyebrow>
            <h1 className="serif mt-4 text-display-lg leading-[1.08]">{article.title}</h1>
            <p className="mt-5 text-body-sm text-concrete-text">
              {formatDate(article.date)} · {article.author}
            </p>
          </div>
        </SectionContainer>

        <SectionContainer size="md">
          <div className="relative mx-auto aspect-[16/9] w-full max-w-5xl overflow-hidden rounded-card bg-ink/10">
            <Image src={article.cover} alt="" fill priority sizes="100vw" className="object-cover" />
            {/* attribution: cover image from picsum.photos (free placeholder) */}
          </div>
        </SectionContainer>

        <SectionContainer size="md">
          <article className="mx-auto max-w-reading">
            <div className="serif text-h2 text-ink">
              <Paragraphs text={raw.excerpt} as="div" paragraphClassName="serif text-h2 text-ink" />
            </div>
            <div className="mt-6">
              <Paragraphs
                text={raw.body}
                as="div"
                paragraphClassName="mt-6 text-body text-concrete-text first:mt-0"
              />
            </div>
          </article>
        </SectionContainer>

        <SectionContainer size="lg">
          <div className="flex items-end justify-between gap-6">
            <div>
              <Eyebrow>More reading</Eyebrow>
              <h2 className="serif mt-4 text-h1">Related articles.</h2>
            </div>
          </div>
          <div className="mt-10 grid grid-cols-1 gap-x-8 gap-y-12 md:grid-cols-3">
            {related.map((a, i) => (
              <AnimateInView key={a.slug} delay={i * 0.05}>
                <ArticleCard article={a} />
              </AnimateInView>
            ))}
          </div>
        </SectionContainer>

        <CTABanner
          heading="Get the next one in your inbox."
          sub="One quarterly digest, hand-curated. No spam."
        />
      </main>
      <Footer />
    </>
  );
}
