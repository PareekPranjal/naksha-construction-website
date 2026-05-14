import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SectionContainer } from "@/components/SectionContainer";
import { ProjectGrid } from "@/components/ProjectGrid";
import { BlockRenderer } from "@/components/blocks/BlockRenderer";
import { cms } from "@/lib/api";
import { generatePageMetadata } from "@/lib/seo";

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
  const page = await cms.page("projects-index");
  return generatePageMetadata("/projects", {
    title: page?.seoTitle ?? page?.title ?? "Services — Naksha Construction",
    description: page?.seoDescription ?? undefined,
    ogImage: page?.seoOgImage ?? undefined,
  });
}

export default async function ProjectsIndexPage() {
  const [PROJECTS, indexPage, ...servicePages] = await Promise.all([
    cms.projects(),
    cms.page("projects-index"),
    ...Object.values(CATEGORY_TO_SERVICE_PATH).map((p) => cms.pageByPath(p)),
  ]);

  const categoryContent: Record<string, React.ReactNode> = {};
  Object.keys(CATEGORY_TO_SERVICE_PATH).forEach((cat, i) => {
    const page = servicePages[i];
    if (page && Array.isArray(page.blocks) && page.blocks.length > 0) {
      categoryContent[cat] = <BlockRenderer blocks={page.blocks} />;
    }
  });

  // The projects-index page in CMS can hold hero/intro/cta blocks — render
  // everything EXCEPT the projectsGrid block (that's where we inject the
  // filterable grid with inline service content). Falls back to a minimal
  // header if no CMS page exists.
  const indexBlocks = Array.isArray(indexPage?.blocks)
    ? (indexPage!.blocks as Array<Record<string, unknown>>).filter(
        (b) => b?.type !== "projectsGrid" && b?.type !== "projectsFeatured",
      )
    : [];
  const trailingBlocks: typeof indexBlocks = [];
  const leadingBlocks: typeof indexBlocks = [];
  let seenGridPlaceholder = false;
  for (const b of indexBlocks) {
    if (!seenGridPlaceholder && b?.type === "cta") {
      seenGridPlaceholder = true;
      trailingBlocks.push(b);
    } else if (seenGridPlaceholder) {
      trailingBlocks.push(b);
    } else {
      leadingBlocks.push(b);
    }
  }

  return (
    <>
      <Header />
      <main className="pt-[64px] md:pt-[72px]">
        {leadingBlocks.length > 0 && <BlockRenderer blocks={leadingBlocks} />}

        <SectionContainer size="lg">
          <ProjectGrid projects={PROJECTS} categoryContent={categoryContent} />
        </SectionContainer>

        {trailingBlocks.length > 0 && <BlockRenderer blocks={trailingBlocks} />}
      </main>
      <Footer />
    </>
  );
}
