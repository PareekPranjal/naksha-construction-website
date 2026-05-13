import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PageHero } from "@/components/PageHero";
import { SectionContainer, Eyebrow } from "@/components/SectionContainer";
import { TwoColumnSplit } from "@/components/TwoColumnSplit";
import { CTABanner } from "@/components/CTABanner";
import { ProjectCard } from "@/components/ProjectCard";
import { AnimateInView } from "@/components/AnimateInView";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Paragraphs } from "@/components/Paragraphs";
import { cms } from "@/lib/api";
import { generateMarketMetadata, generateBreadcrumbSchema, SITE_URL } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";
import { picsum } from "@/lib/utils";

export const revalidate = 60;

export async function generateMetadata({ params }: { params: { sector: string } }) {
  const m = await cms.market(params.sector);
  if (!m) return {};
  return generateMarketMetadata(m);
}

export default async function MarketDetailPage({ params }: { params: { sector: string } }) {
  const market = await cms.market(params.sector);
  if (!market) notFound();
  const all = await cms.projects();
  const related = all.filter((p) => p.category === market.title).slice(0, 3);
  const fillers = all.filter((p) => p.category !== market.title).slice(0, 3 - related.length);
  const showcase = [...related, ...fillers].slice(0, 3);

  const breadcrumb = generateBreadcrumbSchema([
    { name: "Home", url: `${SITE_URL}/` },
    { name: "Markets", url: `${SITE_URL}/markets` },
    { name: market.title, url: `${SITE_URL}/markets/${market.slug}` },
  ]);

  return (
    <>
      <JsonLd data={breadcrumb} />
      <Header />
      <main className="pt-[64px] md:pt-[72px]">
        <PageHero
          eyebrow="Market"
          title={market.title}
          sub={market.summary}
          image={market.image ?? picsum(`market-${market.slug}`, 1920, 1080)}
        />

        <SectionContainer size="md">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Markets", href: "/markets" },
              { label: market.title },
            ]}
          />
        </SectionContainer>

        {market.body && (
          <SectionContainer size="lg">
            <div className="max-w-reading">
              <Eyebrow>Overview</Eyebrow>
              <div className="mt-4 text-ink">
                <Paragraphs
                  text={market.body}
                  as="div"
                  paragraphClassName="serif text-h1 text-ink"
                />
              </div>
            </div>
          </SectionContainer>
        )}

        <SectionContainer size="lg">
          <TwoColumnSplit
            eyebrow="What we deliver"
            heading={`${market.title} expertise.`}
            body={market.body}
            image={picsum(`${market.slug}-capabilities`, 1400, 1000)}
          />
        </SectionContainer>

        {showcase.length > 0 && (
          <SectionContainer size="lg">
            <div className="flex items-end justify-between gap-6">
              <div>
                <Eyebrow>Selected work</Eyebrow>
                <h2 className="serif mt-4 text-h1">Projects in {market.title.toLowerCase()}.</h2>
              </div>
            </div>
            <div className="mt-10 grid grid-cols-1 gap-x-8 gap-y-12 md:grid-cols-3">
              {showcase.map((p, i) => (
                <AnimateInView key={p.slug} delay={i * 0.05}>
                  <ProjectCard project={p} />
                </AnimateInView>
              ))}
            </div>
          </SectionContainer>
        )}

        <CTABanner
          heading={`Planning a ${market.title.toLowerCase()} project?`}
          sub="Let's get a sector-experienced team into your kickoff."
        />
      </main>
      <Footer />
    </>
  );
}
