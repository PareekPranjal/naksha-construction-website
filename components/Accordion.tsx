"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

type Item = { q: string; a: string };

export function Accordion({ items }: { items: Item[] }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <ul className="divide-y divide-rule-ink border-y border-rule-ink">
      {items.map((it, i) => {
        const isOpen = open === i;
        return (
          <li key={i}>
            <button
              onClick={() => setOpen(isOpen ? null : i)}
              className="flex w-full items-center justify-between py-6 text-left"
              aria-expanded={isOpen}
            >
              <span className="serif text-h3 text-ink">{it.q}</span>
              <span className="ml-6 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-rule-ink text-ink">
                {isOpen ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
              </span>
            </button>
            <div
              className={cn(
                "grid overflow-hidden transition-all duration-300",
                isOpen ? "grid-rows-[1fr] opacity-100 pb-6" : "grid-rows-[0fr] opacity-0",
              )}
            >
              <div className="overflow-hidden">
                <p className="max-w-3xl pr-12 text-body text-concrete-text">{it.a}</p>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
