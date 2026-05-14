import type { Block } from "./types";
import { HeroBlock } from "./HeroBlock";
import { StatsBlock } from "./StatsBlock";
import { IntroBlock } from "./IntroBlock";
import { CtaBlock } from "./CtaBlock";
import { LongformBlock } from "./LongformBlock";
import { TimelineBlock } from "./TimelineBlock";
import { CommitmentsBlock } from "./CommitmentsBlock";
import { ContactFormBlock } from "./ContactFormBlock";
import { MarketsGridBlock } from "./MarketsGridBlock";
import { ServicesGridBlock } from "./ServicesGridBlock";
import { ProjectsGridBlock } from "./ProjectsGridBlock";
import { ArticlesGridBlock } from "./ArticlesGridBlock";
import { LeadershipBlock } from "./LeadershipBlock";
import { LocationsGridBlock } from "./LocationsGridBlock";
import { TestimonialsBlock } from "./TestimonialsBlock";
import { OpenRolesBlock } from "./OpenRolesBlock";
import { GalleryBlock } from "./GalleryBlock";
import { EmailQueryBlock } from "./EmailQueryBlock";

export function BlockRenderer({ blocks }: { blocks: unknown }) {
  const list: Block[] = Array.isArray(blocks) ? (blocks as Block[]) : [];
  return (
    <>
      {list.map((b, i) => (
        <BlockSwitch key={i} block={b} />
      ))}
    </>
  );
}

function BlockSwitch({ block }: { block: Block }) {
  switch (block.type) {
    case "hero":
      return <HeroBlock block={block} />;
    case "stats":
      return <StatsBlock block={block} />;
    case "intro":
      return <IntroBlock block={block} />;
    case "cta":
      return <CtaBlock block={block} />;
    case "longform":
      return <LongformBlock block={block} />;
    case "timeline":
      return <TimelineBlock block={block} />;
    case "commitments":
      return <CommitmentsBlock block={block} />;
    case "contactForm":
      return <ContactFormBlock />;
    case "marketsGrid":
      return <MarketsGridBlock />;
    case "servicesGrid":
      return <ServicesGridBlock />;
    case "projectsGrid":
    case "projectsFeatured":
      return <ProjectsGridBlock block={block} />;
    case "articlesGrid":
      return <ArticlesGridBlock block={block} />;
    case "leadership":
      return <LeadershipBlock />;
    case "locationsGrid":
      return <LocationsGridBlock block={block} />;
    case "testimonials":
      return <TestimonialsBlock />;
    case "openRoles":
      return <OpenRolesBlock />;
    case "gallery":
      return <GalleryBlock block={block} />;
    case "emailQuery":
      return <EmailQueryBlock block={block} />;
    default:
      return null;
  }
}
