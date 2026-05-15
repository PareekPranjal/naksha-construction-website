import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/lib/data";

export function ProjectCard({ project, eager = false }: { project: Project; eager?: boolean }) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group block overflow-hidden rounded-card"
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-ink/10">
        <Image
          src={project.cover}
          alt={project.coverAlt || `${project.title}, ${project.location}`}
          fill
          sizes="(min-width: 1024px) 50vw, 100vw"
          loading={eager ? "eager" : "lazy"}
          className="object-cover transition-transform duration-700 ease-out-expo group-hover:scale-[1.04]"
        />
        {/* attribution: image from picsum.photos (free placeholder) */}
      </div>
      <div className="pt-5">
        <p className="eyebrow text-accent">{project.category}</p>
        <h3 className="serif mt-2 text-h3 text-ink transition-colors group-hover:text-accent">
          {project.title}
        </h3>
        <div className="mt-2 flex items-center justify-between text-body-sm text-concrete-text">
          <span>{project.location}</span>
          <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </div>
      </div>
    </Link>
  );
}
