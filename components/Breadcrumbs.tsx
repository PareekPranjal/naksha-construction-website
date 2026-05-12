import Link from "next/link";
import { ChevronRight } from "lucide-react";

type Crumb = { label: string; href?: string };

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-1 text-body-sm text-concrete-text">
        {items.map((c, i) => (
          <li key={i} className="flex items-center gap-1">
            {c.href && i < items.length - 1 ? (
              <Link href={c.href} className="hover:text-accent">
                {c.label}
              </Link>
            ) : (
              <span className="text-ink">{c.label}</span>
            )}
            {i < items.length - 1 && <ChevronRight className="mx-1 h-3 w-3" />}
          </li>
        ))}
      </ol>
    </nav>
  );
}
