import { notFound } from "next/navigation";
import Image from "next/image";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SectionContainer, Eyebrow } from "@/components/SectionContainer";
import { TwoColumnSplit } from "@/components/TwoColumnSplit";
import { TestimonialCard } from "@/components/TestimonialCard";
import { CTABanner } from "@/components/CTABanner";
import { Gallery } from "@/components/Lightbox";
import { ProjectCard } from "@/components/ProjectCard";
import { AnimateInView } from "@/components/AnimateInView";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Paragraphs } from "@/components/Paragraphs";
import { cms } from "@/lib/api";
import {
  generateProjectMetadata,
  generateBreadcrumbSchema,
  generateProjectSchema,
  getGlobalSEO,
  SITE_URL,
} from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";

export const revalidate = 60;

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const p = await cms.projectRaw(params.slug);
  if (!p) return {};
  return generateProjectMetadata(p);
}

export default async function ProjectDetailPage({ params }: { params: { slug: string } }) {
  const [project, raw, global] = await Promise.all([
    cms.project(params.slug),
    cms.projectRaw(params.slug),
    getGlobalSEO(),
  ]);
  if (!project || !raw) notFound();
  const all = await cms.projects();
  const related = all.filter((p) => p.slug !== project.slug && p.category === project.category).slice(0, 3);
  const filler = all
    .filter((p) => p.slug !== project.slug && p.category !== project.category)
    .slice(0, 3 - related.length);
  const more = [...related, ...filler].slice(0, 3);

  const breadcrumb = generateBreadcrumbSchema([
    { name: "Home", url: `${SITE_URL}/` },
    { name: "Projects", url: `${SITE_URL}/projects` },
    { name: project.title, url: `${SITE_URL}/projects/${project.slug}` },
  ]);
  const projectSchema = generateProjectSchema(raw, global);

  return (
    <>
      <JsonLd data={[breadcrumb, projectSchema]} />
      <Header />
      <main className="pt-[64px] md:pt-[72px]">
        {/* Cover */}
        <section className="relative h-[80vh] min-h-[520px] w-full overflow-hidden bg-ink text-paper">
          <Image src={project.cover} alt="" fill priority sizes="100vw" className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-ink/30 via-ink/40 to-ink/80" />
          <div className="relative z-10 flex h-full items-end pb-12 md:pb-20">
            <div className="wrap">
              <p className="eyebrow text-accent">{project.category}</p>
              <h1 className="serif mt-4 max-w-4xl text-display-lg leading-[1.05] md:text-[88px]">
                {project.title}
              </h1>
              <p className="mt-4 text-lead text-paper/85">{project.location}</p>
            </div>
          </div>
        </section>

        <SectionContainer size="md">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Projects", href: "/projects" },
              { label: project.title },
            ]}
          />
        </SectionContainer>

        {/* Meta strip */}
        <SectionContainer size="md">
          <ul className="grid grid-cols-2 gap-y-8 border-y border-rule-ink py-10 md:grid-cols-5">
            {[
              ["Location", project.location],
              ["Sector", project.category],
              ["Sq. ft.", project.squareFeet],
              ["Duration", project.duration],
              ["Year", String(project.year)],
            ].map(([k, v]) => (
              <li key={k}>
                <p className="eyebrow text-accent">{k}</p>
                <p className="serif mt-2 text-h3 text-ink">{v}</p>
              </li>
            ))}
          </ul>
        </SectionContainer>

        <SectionContainer size="lg">
          <div className="max-w-reading">
            <Eyebrow>Overview</Eyebrow>
            <p className="serif mt-4 text-h1 text-ink">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer fermentum
              nibh ut enim suscipit, in pulvinar lectus tincidunt mauris a porta lacus.
            </p>
            <div className="mt-6 text-lead text-concrete-text">
              <Paragraphs text={project.challenge} as="div" paragraphClassName="text-lead text-concrete-text" />
            </div>
          </div>
        </SectionContainer>

        <SectionContainer size="lg">
          <Eyebrow>Gallery</Eyebrow>
          <h2 className="serif mt-4 text-h1">Inside the build.</h2>
          <div className="mt-10">
            <Gallery images={project.gallery} />
          </div>
        </SectionContainer>

        <SectionContainer size="lg">
          <TwoColumnSplit
            eyebrow="Challenge"
            heading="The brief, and what made it interesting."
            body={project.challenge}
            image={project.gallery[0]}
          />
        </SectionContainer>

        <SectionContainer size="lg">
          <TwoColumnSplit
            eyebrow="Solution"
            heading="How we delivered it."
            body={project.solution}
            bullets={project.outcomes}
            image={project.gallery[1]}
            reverse
          />
        </SectionContainer>

        {project.testimonial && (
          <SectionContainer size="lg">
            <div className="mx-auto max-w-4xl">
              <TestimonialCard
                quote={project.testimonial.quote}
                attribution={project.testimonial.attribution}
                role={project.testimonial.role}
              />
            </div>
          </SectionContainer>
        )}

        <SectionContainer size="lg">
          <div className="flex items-end justify-between gap-6">
            <div>
              <Eyebrow>More projects</Eyebrow>
              <h2 className="serif mt-4 text-h1">Other work you might like.</h2>
            </div>
          </div>
          <div className="mt-10 grid grid-cols-1 gap-x-8 gap-y-12 md:grid-cols-3">
            {more.map((p, i) => (
              <AnimateInView key={p.slug} delay={i * 0.05}>
                <ProjectCard project={p} />
              </AnimateInView>
            ))}
          </div>
        </SectionContainer>

        <CTABanner
          heading="Have a similar build in mind?"
          sub="We'll bring lessons from this project into your kickoff conversation."
        />
      </main>
      <Footer />
    </>
  );
}
