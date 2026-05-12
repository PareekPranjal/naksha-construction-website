import Link from "next/link";
import { ArrowRight, Hammer, Building2, PencilRuler, Calculator, Wrench } from "lucide-react";
import type { Service } from "@/lib/data";

const ICONS: Record<string, typeof Hammer> = {
  "construction-management": Building2,
  "general-contracting": Hammer,
  "design-build": PencilRuler,
  preconstruction: Calculator,
  "special-projects": Wrench,
};

export function ServiceCard({ service }: { service: Service }) {
  const Icon = ICONS[service.slug] ?? Hammer;
  return (
    <Link
      href={`/services/${service.slug}`}
      className="group flex h-full flex-col rounded-card border border-rule-ink bg-paper p-8 transition-colors hover:border-accent hover:bg-paper"
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-card border border-rule-ink text-ink transition-colors group-hover:border-accent group-hover:text-accent">
        <Icon className="h-5 w-5" />
      </div>
      <h3 className="serif mt-6 text-h3 text-ink">{service.title}</h3>
      <p className="mt-3 flex-1 text-body text-concrete-text">{service.short}</p>
      <span className="mt-6 inline-flex items-center gap-2 text-body-sm font-medium text-accent">
        Learn more <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
      </span>
    </Link>
  );
}
