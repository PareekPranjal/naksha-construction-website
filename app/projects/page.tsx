import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PageHero } from "@/components/PageHero";
import { SectionContainer, Eyebrow } from "@/components/SectionContainer";
import { ProjectGrid } from "@/components/ProjectGrid";
import { CTABanner } from "@/components/CTABanner";
import { BlockRenderer } from "@/components/blocks/BlockRenderer";
import { LOREM } from "@/lib/data";
import { cms } from "@/lib/api";
import { generatePageMetadata } from "@/lib/seo";
import { picsum } from "@/lib/utils";

// Map a category label (project.market) → the CMS path that holds the
// service-overview page for that category. When a visitor clicks one of
// the filter chips on /projects, the matching CMS page's blocks are
// rendered above the project grid so the page doubles as a service page.
const CATEGORY_TO_SERVICE_PATH: Record<string, string> = {
  "Architectural Design and Planning": "/services/architectural-design-and-planning",
  "Civil Work": "/services/civil-work",
  "Interior Work Design": "/services/interior-work-design",
  "Painting and Finishing": "/services/painting-and-finishing",
};

export const revalidate = 60;

export async function generateMetadata() {
  return generatePageMetadata("/projects", {
    title: "Projects — Naksha Construction Portfolio",
    description: "Selected building, commercial, residential and industrial construction projects from Naksha Construction across Rajasthan and India.",
  });
}

export default async function ProjectsIndexPage() {
  const [PROJECTS, ...servicePages] = await Promise.all([
    cms.projects(),
    ...Object.values(CATEGORY_TO_SERVICE_PATH).map((p) => cms.pageByPath(p)),
  ]);

  const categoryContent: Record<string, React.ReactNode> = {};
  Object.keys(CATEGORY_TO_SERVICE_PATH).forEach((cat, i) => {
    const page = servicePages[i];
    if (page && Array.isArray(page.blocks) && page.blocks.length > 0) {
      categoryContent[cat] = <BlockRenderer blocks={page.blocks} />;
    }
  });

  return (
    <>
      <Header />
      <main className="pt-[64px] md:pt-[72px]">
        <PageHero
          eyebrow="Services"
          title="What we build."
          sub="Architectural design, civil work, interiors and finishing — pick a service to see the offering and the projects delivered under it."
          image={picsum("projects-hero", 1920, 1080)}
        />

        <SectionContainer size="lg">
          <div className="max-w-reading">
            <Eyebrow>Pick a service</Eyebrow>
            <p className="mt-4 text-lead text-concrete-text">
              Choose a category below to see the full service overview and recent projects delivered under it.
            </p>
          </div>
          <div className="mt-12">
            <ProjectGrid projects={PROJECTS} categoryContent={categoryContent} />
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
