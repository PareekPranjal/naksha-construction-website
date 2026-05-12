"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { useSiteShell } from "@/lib/site-context";
import { cn } from "@/lib/utils";

export function MegaMenu({
  open,
  activeIndex,
  onClose,
}: {
  open: boolean;
  activeIndex: number | null;
  onClose: () => void;
}) {
  const { navbar } = useSiteShell();
  if (!open || activeIndex === null) return null;
  const item = navbar.items[activeIndex];
  if (!item?.children) return null;

  return (
    <div
      className="absolute inset-x-0 top-full border-t border-rule-ink bg-paper shadow-[0_24px_48px_rgba(14,14,14,0.08)]"
      onMouseLeave={onClose}
    >
      <div className="wrap py-10">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
          <div className="md:col-span-4">
            <p className="eyebrow text-concrete-text">Section</p>
            <h3 className="serif mt-3 text-h2 text-ink">{item.label}</h3>
            <p className="mt-4 max-w-sm text-body text-concrete-text">
              Explore everything in {item.label.toLowerCase()} — overview, capabilities,
              and recent work.
            </p>
            <Link
              href={item.href}
              className="mt-6 inline-flex items-center gap-2 text-accent hover:text-accent-hi"
              onClick={onClose}
            >
              View {item.label} overview <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
          <ul className="grid grid-cols-1 gap-x-8 gap-y-3 md:col-span-8 md:grid-cols-2">
            {item.children.map((c) => (
              <li key={c.href}>
                <Link
                  href={c.href}
                  onClick={onClose}
                  className={cn(
                    "group flex items-center justify-between border-b border-rule-ink py-3",
                    "text-body text-ink transition-colors hover:text-accent",
                  )}
                >
                  <span>{c.label}</span>
                  <ChevronRight className="h-4 w-4 text-concrete transition-transform group-hover:translate-x-1 group-hover:text-accent" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
