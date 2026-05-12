import { SectionContainer, Eyebrow } from "../SectionContainer";
import { ProjectCard } from "../ProjectCard";
import { cms } from "@/lib/api";

type Props = {
  block: { type: "projectsGrid" | "projectsFeatured"; limit?: number };
};

export async function ProjectsGridBlock({ block }: Props) {
  const all = await cms.projects();
  const list = block.limit ? all.slice(0, block.limit) : all;
  if (!list.length) return null;
  const featured = block.type === "projectsFeatured";
  return (
    <SectionContainer size="lg">
      <Eyebrow>{featured ? "Featured projects" : "Projects"}</Eyebrow>
      <h2 className="serif mt-6 text-h1">
        {featured ? "Selected work." : "Every project we've delivered."}
      </h2>
      <div className="mt-14 grid grid-cols-1 gap-x-10 gap-y-16 md:grid-cols-2 lg:grid-cols-3">
        {list.map((p) => (
          <ProjectCard key={p.slug} project={p} />
        ))}
      </div>
    </SectionContainer>
  );
}
