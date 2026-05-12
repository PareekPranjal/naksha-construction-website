"use client";

import { useEffect, useRef, useState, ReactNode } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

type Slide = { key: string; tabLabel: string; content: ReactNode };

export function TabbedCarousel({
  slides,
  autoAdvanceMs = 6000,
}: {
  slides: Slide[];
  autoAdvanceMs?: number;
}) {
  const [idx, setIdx] = useState(0);
  const pausedRef = useRef(false);
  useEffect(() => {
    if (!autoAdvanceMs) return;
    const id = setInterval(() => {
      if (pausedRef.current) return;
      setIdx((i) => (i + 1) % slides.length);
    }, autoAdvanceMs);
    return () => clearInterval(id);
  }, [autoAdvanceMs, slides.length]);

  return (
    <div
      onMouseEnter={() => (pausedRef.current = true)}
      onMouseLeave={() => (pausedRef.current = false)}
    >
      <div role="tablist" className="flex flex-wrap gap-2 border-b border-rule-ink">
        {slides.map((s, i) => (
          <button
            key={s.key}
            role="tab"
            aria-selected={i === idx}
            onClick={() => setIdx(i)}
            className={cn(
              "relative -mb-px border-b-2 px-4 py-3 text-body-sm font-medium transition-colors",
              i === idx
                ? "border-accent text-ink"
                : "border-transparent text-concrete-text hover:text-ink",
            )}
          >
            {s.tabLabel}
          </button>
        ))}
      </div>
      <div className="pt-10">
        {slides.map((s, i) => (
          <div
            key={s.key}
            className={cn("transition-opacity", i === idx ? "block opacity-100" : "hidden opacity-0")}
          >
            {s.content}
          </div>
        ))}
      </div>
    </div>
  );
}

export function HorizontalCarousel({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const scroll = (dir: -1 | 1) => {
    if (!ref.current) return;
    const w = ref.current.clientWidth;
    ref.current.scrollBy({ left: dir * w * 0.8, behavior: "smooth" });
  };
  return (
    <div className="relative">
      <div
        ref={ref}
        className="no-scrollbar -mx-4 flex snap-x snap-mandatory overflow-x-auto scroll-smooth px-4 md:-mx-8 md:px-8"
      >
        {children}
      </div>
      <div className="mt-6 flex justify-end gap-2">
        <button
          onClick={() => scroll(-1)}
          aria-label="Previous"
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-rule-ink text-ink hover:border-accent hover:text-accent"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          onClick={() => scroll(1)}
          aria-label="Next"
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-rule-ink text-ink hover:border-accent hover:text-accent"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
