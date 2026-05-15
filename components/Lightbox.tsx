"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

// Accept either a plain string[] (legacy callers) or {url, alt}[] so callers
// can pass admin-controlled alts per image without breaking older usages.
type GalleryItem = string | { url: string; alt?: string };

function normalize(items: GalleryItem[]): { url: string; alt: string }[] {
  return items.map((it) =>
    typeof it === "string" ? { url: it, alt: "" } : { url: it.url, alt: it.alt ?? "" },
  );
}

export function Gallery({ images }: { images: GalleryItem[] }) {
  const items = normalize(images);
  const [open, setOpen] = useState<number | null>(null);

  useEffect(() => {
    if (open === null) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(null);
      if (e.key === "ArrowRight") setOpen((i) => (i === null ? null : (i + 1) % items.length));
      if (e.key === "ArrowLeft")
        setOpen((i) => (i === null ? null : (i - 1 + items.length) % items.length));
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, items.length]);

  return (
    <>
      <ul className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
        {items.map((it, i) => (
          <li key={`${it.url}-${i}`}>
            <button
              onClick={() => setOpen(i)}
              className="group relative block aspect-[4/3] w-full overflow-hidden rounded-card bg-ink/10"
              aria-label={it.alt ? `Open image: ${it.alt}` : `Open image ${i + 1}`}
            >
              <Image
                src={it.url}
                alt={it.alt}
                fill
                sizes="(min-width: 1024px) 25vw, 50vw"
                className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
              />
            </button>
          </li>
        ))}
      </ul>
      {open !== null && (
        <div
          className="fixed inset-0 z-[80] flex items-center justify-center bg-ink/90 p-6"
          onClick={() => setOpen(null)}
        >
          <button
            aria-label="Close"
            className="absolute right-6 top-6 text-paper hover:text-accent"
            onClick={() => setOpen(null)}
          >
            <X className="h-6 w-6" />
          </button>
          <button
            aria-label="Previous"
            onClick={(e) => {
              e.stopPropagation();
              setOpen((i) => (i === null ? 0 : (i - 1 + items.length) % items.length));
            }}
            className="absolute left-6 top-1/2 -translate-y-1/2 text-paper hover:text-accent"
          >
            <ChevronLeft className="h-8 w-8" />
          </button>
          <button
            aria-label="Next"
            onClick={(e) => {
              e.stopPropagation();
              setOpen((i) => (i === null ? 0 : (i + 1) % items.length));
            }}
            className="absolute right-6 top-1/2 -translate-y-1/2 text-paper hover:text-accent"
          >
            <ChevronRight className="h-8 w-8" />
          </button>
          <div className="relative aspect-[16/10] w-full max-w-5xl">
            <Image
              src={items[open].url}
              alt={items[open].alt}
              fill
              sizes="100vw"
              className="object-contain"
            />
          </div>
        </div>
      )}
    </>
  );
}
