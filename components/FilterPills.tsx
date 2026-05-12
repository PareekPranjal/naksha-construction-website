"use client";

import { cn } from "@/lib/utils";

export function FilterPills({
  options,
  active,
  onChange,
}: {
  options: string[];
  active: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((o) => (
        <button
          key={o}
          onClick={() => onChange(o)}
          className={cn(
            "rounded-full border px-4 py-2 text-body-sm transition-colors",
            active === o
              ? "border-ink bg-ink text-paper"
              : "border-rule-ink text-ink hover:border-ink",
          )}
        >
          {o}
        </button>
      ))}
    </div>
  );
}
