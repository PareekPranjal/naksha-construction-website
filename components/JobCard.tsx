import Link from "next/link";
import { ArrowUpRight, MapPin, Briefcase } from "lucide-react";
import type { Job } from "@/lib/data";

export function JobCard({ job }: { job: Job }) {
  return (
    <Link
      href={`/careers/${job.slug}`}
      className="group flex flex-col gap-4 rounded-card border border-rule-ink bg-paper p-6 transition-colors hover:border-accent md:flex-row md:items-center md:justify-between"
    >
      <div>
        <p className="eyebrow text-accent">{job.department}</p>
        <h3 className="serif mt-2 text-h3 text-ink transition-colors group-hover:text-accent">
          {job.title}
        </h3>
        <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 text-body-sm text-concrete-text">
          <span className="inline-flex items-center gap-1.5">
            <MapPin className="h-4 w-4" /> {job.location}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Briefcase className="h-4 w-4" /> {job.type}
          </span>
        </div>
      </div>
      <ArrowUpRight className="h-5 w-5 text-ink transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent" />
    </Link>
  );
}
