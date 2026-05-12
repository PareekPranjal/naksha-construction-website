"use client";

import { useState, useMemo } from "react";
import { ProjectCard } from "./ProjectCard";
import { FilterPills } from "./FilterPills";
import type { Project } from "@/lib/data";

export function ProjectGrid({ projects }: { projects: Project[] }) {
  const categories = useMemo(
    () => ["All", ...Array.from(new Set(projects.map((p) => p.category)))],
    [projects],
  );
  const [active, setActive] = useState("All");
  const filtered = active === "All" ? projects : projects.filter((p) => p.category === active);

  return (
    <div>
      <FilterPills options={categories} active={active} onChange={setActive} />
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
