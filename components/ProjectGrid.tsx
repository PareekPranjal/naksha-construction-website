"use client";

import { useState, useMemo, type ReactNode } from "react";
import { ProjectCard } from "./ProjectCard";
import { FilterPills } from "./FilterPills";
import type { Project } from "@/lib/data";

type Props = {
  projects: Project[];
  /**
   * Optional category-specific service content rendered above the project
   * grid when a non-"All" filter is selected. Keys must match `project.category`
   * values (e.g. "Civil Work").
   */
  categoryContent?: Record<string, ReactNode>;
};

export function ProjectGrid({ projects, categoryContent }: Props) {
  const categories = useMemo(
    () => ["All", ...Array.from(new Set(projects.map((p) => p.category)))],
    [projects],
  );
  const [active, setActive] = useState("All");
  const filtered = active === "All" ? projects : projects.filter((p) => p.category === active);
  const content = active !== "All" && categoryContent ? categoryContent[active] : null;

  return (
    <div>
      <FilterPills options={categories} active={active} onChange={setActive} />
      {content && (
        <div className="mt-10 -mx-4 sm:-mx-6 lg:-mx-8">
          {content}
        </div>
      )}
      <div className="mt-10 grid grid-cols-1 gap-x-8 gap-y-12 md:grid-cols-2">
        {filtered.map((p, i) => (
          <ProjectCard key={p.slug} project={p} eager={i < 2} />
        ))}
      </div>
      {filtered.length === 0 && (
        <p className="mt-10 text-body text-concrete-text">No projects in this category yet.</p>
      )}
    </div>
  );
}
