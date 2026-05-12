"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

export function Gallery({ images }: { images: string[] }) {
  const [open, setOpen] = useState<number | null>(null);

  useEffect(() => {
    if (open === null) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(null);
      if (e.key === "ArrowRight") setOpen((i) => (i === null ? null : (i + 1) % images.length));
      if (e.key === "ArrowLeft")
        setOpen((i) => (i === null ? null : (i - 1 + images.length) % images.length));
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, images.length]);

  return (
    <>
      <ul className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
        {images.map((src, i) => (
          <li key={src}>
            <button
              onClick={() => setOpen(i)}
              className="group relative block aspect-[4/3] w-full overflow-hidden rounded-card bg-ink/10"
              aria-label={`Open image ${i + 1}`}
            >
              <Image
                src={src}
                alt=""
                fill
                sizes="(min-width: 1024px) 25vw, 50vw"
                className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
              />
              {/* attribution: image from picsum.photos (free placeholder) */}
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
              setOpen((i) => (i === null ? 0 : (i - 1 + images.length) % images.length));
            }}
            className="absolute left-6 top-1/2 -translate-y-1/2 text-paper hover:text-accent"
          >
            <ChevronLeft className="h-8 w-8" />
          </button>
          <button
            aria-label="Next"
            onClick={(e) => {
              e.stopPropagation();
              setOpen((i) => (i === null ? 0 : (i + 1) % images.length));
            }}
            className="absolute right-6 top-1/2 -translate-y-1/2 text-paper hover:text-accent"
          >
            <ChevronRight className="h-8 w-8" />
          </button>
          <div className="relative aspect-[16/10] w-full max-w-5xl">
            <Image
              src={images[open]}
              alt=""
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
