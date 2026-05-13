import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PageHero } from "@/components/PageHero";
import { SectionContainer, Eyebrow } from "@/components/SectionContainer";
import { ProjectGrid } from "@/components/ProjectGrid";
import { CTABanner } from "@/components/CTABanner";
import { LOREM } from "@/lib/data";
import { cms } from "@/lib/api";
import { generatePageMetadata } from "@/lib/seo";
import { picsum } from "@/lib/utils";

export const revalidate = 60;

export async function generateMetadata() {
  return generatePageMetadata("/projects", {
    title: "Projects — Naksha Construction Portfolio",
    description: "Selected building, commercial, residential and industrial construction projects from Naksha Construction across Rajasthan and India.",
  });
}

export default async function ProjectsIndexPage() {
  const PROJECTS = await cms.projects();
  return (
    <>
      <Header />
      <main className="pt-[64px] md:pt-[72px]">
        <PageHero
          eyebrow="Portfolio"
          title="What we've built."
          sub="Twelve representative projects, filterable by sector. The full list is longer than this page, but this is a fair cross-section."
          image={picsum("projects-hero", 1920, 1080)}
        />

        <SectionContainer size="lg">
          <div className="max-w-reading">
            <Eyebrow>Selected work</Eyebrow>
            <p className="mt-4 text-lead text-concrete-text">{LOREM.medium}</p>
          </div>
          <div className="mt-12">
            <ProjectGrid projects={PROJECTS} />
          </div>
        </SectionContainer>

        <CTABanner
          heading="Want to see more?"
          sub="Project sheets, references, and case studies are available on request."
        />
      </main>
      <Footer />
    </>
  );
}
