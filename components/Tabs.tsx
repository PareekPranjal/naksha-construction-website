"use client";

import { useState, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Tab = { key: string; label: string; content: ReactNode };

export function Tabs({ tabs, defaultKey }: { tabs: Tab[]; defaultKey?: string }) {
  const [active, setActive] = useState(defaultKey ?? tabs[0]?.key);
  const current = tabs.find((t) => t.key === active) ?? tabs[0];
  return (
    <div>
      <div role="tablist" className="flex flex-wrap gap-2 border-b border-rule-ink">
        {tabs.map((t) => (
          <button
            key={t.key}
            role="tab"
            aria-selected={active === t.key}
            onClick={() => setActive(t.key)}
            className={cn(
              "relative -mb-px border-b-2 px-4 py-3 text-body-sm font-medium transition-colors",
              active === t.key
                ? "border-accent text-ink"
                : "border-transparent text-concrete-text hover:text-ink",
            )}
          >
            {t.label}
          </button>
        ))}
      </div>
      <div role="tabpanel" className="pt-10">
        {current?.content}
      </div>
    </div>
  );
}
