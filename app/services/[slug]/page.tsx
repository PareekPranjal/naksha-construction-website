import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PageHero } from "@/components/PageHero";
import { SectionContainer, Eyebrow } from "@/components/SectionContainer";
import { TwoColumnSplit } from "@/components/TwoColumnSplit";
import { CTABanner } from "@/components/CTABanner";
import { ProjectCard } from "@/components/ProjectCard";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { AnimateInView } from "@/components/AnimateInView";
import { cms } from "@/lib/api";
import {
  generateServiceMetadata,
  generateBreadcrumbSchema,
  generateServiceSchema,
  getGlobalSEO,
  SITE_URL,
} from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";
import { picsum } from "@/lib/utils";

export const revalidate = 60;

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const s = await cms.service(params.slug);
  if (!s) return {};
  return generateServiceMetadata(s);
}

export default async function ServiceDetailPage({ params }: { params: { slug: string } }) {
  const [service, global] = await Promise.all([cms.service(params.slug), getGlobalSEO()]);
  if (!service) notFound();
  const related = (await cms.projects()).slice(0, 3);

  const breadcrumb = generateBreadcrumbSchema([
    { name: "Home", url: `${SITE_URL}/` },
    { name: "Services", url: `${SITE_URL}/services` },
    { name: service.title, url: `${SITE_URL}/services/${service.slug}` },
  ]);
  const serviceSchema = generateServiceSchema(service, global);

  return (
    <>
      <JsonLd data={[breadcrumb, serviceSchema]} />
      <Header />
      <main className="pt-[64px] md:pt-[72px]">
        <PageHero
          eyebrow="Service"
          title={service.title}
          sub={service.summary}
          image={service.icon ?? picsum(`service-${service.slug}`, 1920, 1080)}
        />

        <SectionContainer size="md">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Services", href: "/services" },
              { label: service.title },
            ]}
          />
        </SectionContainer>

        <SectionContainer size="lg">
          <TwoColumnSplit
            eyebrow="What it is"
            heading={`${service.title}, in plain language.`}
            body={service.body}
            bullets={service.bullets ?? []}
            image={picsum(`${service.slug}-detail`, 1400, 1000)}
          />
        </SectionContainer>

        {related.length > 0 && (
          <SectionContainer size="lg">
            <div className="flex items-end justify-between gap-6">
              <div>
                <Eyebrow>Related work</Eyebrow>
                <h2 className="serif mt-4 text-h1">Projects delivered this way.</h2>
              </div>
            </div>
            <div className="mt-10 grid grid-cols-1 gap-x-8 gap-y-12 md:grid-cols-3">
              {related.map((p, i) => (
                <AnimateInView key={p.slug} delay={i * 0.05}>
                  <ProjectCard project={p} />
                </AnimateInView>
              ))}
            </div>
          </SectionContainer>
        )}

        <CTABanner
          heading={`Talk to us about ${service.title.toLowerCase()}.`}
          sub="A 30-minute call is usually enough to know whether we're a fit."
        />
      </main>
      <Footer />
    </>
  );
}
