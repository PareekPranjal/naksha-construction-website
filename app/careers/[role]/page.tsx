import { notFound } from "next/navigation";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SectionContainer, Eyebrow } from "@/components/SectionContainer";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CTABanner } from "@/components/CTABanner";
import { Briefcase, MapPin, ArrowRight } from "lucide-react";
import { LOREM } from "@/lib/data";
import { Paragraphs } from "@/components/Paragraphs";
import { cms } from "@/lib/api";
import { generateJobMetadata, generateBreadcrumbSchema, SITE_URL } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";

export const revalidate = 60;

export async function generateMetadata({ params }: { params: { role: string } }) {
  const j = await cms.jobRaw(params.role);
  if (!j) return {};
  return generateJobMetadata(j);
}

export default async function RolePage({ params }: { params: { role: string } }) {
  const job = await cms.job(params.role);
  if (!job) notFound();

  const breadcrumb = generateBreadcrumbSchema([
    { name: "Home", url: `${SITE_URL}/` },
    { name: "Careers", url: `${SITE_URL}/careers` },
    { name: "Openings", url: `${SITE_URL}/careers/openings` },
    { name: job.title, url: `${SITE_URL}/careers/${job.slug}` },
  ]);
  const jobSchema = {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: job.title,
    description: job.summary,
    employmentType: job.type,
    hiringOrganization: { "@type": "Organization", name: "Naksha Construction", sameAs: SITE_URL },
    jobLocation: {
      "@type": "Place",
      address: { "@type": "PostalAddress", addressLocality: job.location, addressCountry: "IN" },
    },
  };

  return (
    <>
      <JsonLd data={[breadcrumb, jobSchema]} />
      <Header />
      <main className="pt-[64px] md:pt-[72px]">
        <SectionContainer size="md">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Careers", href: "/careers" },
              { label: "Openings", href: "/careers/openings" },
              { label: job.title },
            ]}
          />
          <div className="mt-8 max-w-3xl">
            <Eyebrow>{job.department}</Eyebrow>
            <h1 className="serif mt-4 text-display-lg leading-[1.05]">{job.title}</h1>
            <ul className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3 text-body text-concrete-text">
              <li className="inline-flex items-center gap-2">
                <MapPin className="h-4 w-4 text-accent" /> {job.location}
              </li>
              <li className="inline-flex items-center gap-2">
                <Briefcase className="h-4 w-4 text-accent" /> {job.type}
              </li>
            </ul>
            <Link
              href="/contact"
              className="mt-8 inline-flex items-center gap-2 rounded-card bg-accent px-6 py-3 text-button text-paper hover:bg-accent-hi"
            >
              Apply now <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </SectionContainer>

        <SectionContainer size="lg">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-12">
            <div className="md:col-span-8">
              <Section heading="About the role">
                <Paragraphs text={job.summary} as="div" />
                <p className="mt-4">{LOREM.long}</p>
              </Section>
              <Section heading="Responsibilities">
                <Bullets items={job.responsibilities} />
              </Section>
              <Section heading="Requirements">
                <Bullets items={job.requirements} />
              </Section>
              <Section heading="Benefits">
                <Bullets items={job.benefits} />
              </Section>
            </div>
            <aside className="md:col-span-4">
              <div className="sticky top-28 rounded-card border border-rule-ink bg-paper p-6">
                <p className="eyebrow text-accent">Apply</p>
                <p className="serif mt-2 text-h3">{job.title}</p>
                <p className="mt-3 text-body-sm text-concrete-text">
                  Get in touch with our talent team. We aim to reply within five business days.
                </p>
                <Link
                  href="/contact"
                  className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-card bg-ink px-5 py-3 text-button text-paper hover:bg-accent"
                >
                  Start application <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </aside>
          </div>
        </SectionContainer>

        <CTABanner heading="Browse other openings." cta={{ label: "All roles", href: "/careers/openings" }} />
      </main>
      <Footer />
    </>
  );
}

function Section({ heading, children }: { heading: string; children: React.ReactNode }) {
  return (
    <section className="mt-10 first:mt-0">
      <h2 className="serif text-h2">{heading}</h2>
      <div className="mt-4 text-body text-concrete-text">{children}</div>
    </section>
  );
}

function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="mt-2 space-y-3">
      {items.map((b) => (
        <li key={b} className="flex items-start gap-3 text-body text-ink">
          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
          {b}
        </li>
      ))}
    </ul>
  );
}
