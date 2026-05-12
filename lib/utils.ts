import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function formatDate(d: Date | string, locale = "en-IN"): string {
  const date = typeof d === "string" ? new Date(d) : d;
  return date.toLocaleDateString(locale, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function range(n: number): number[] {
  return Array.from({ length: n }, (_, i) => i);
}

// Deterministic image URL helpers — placeholders only.
export function picsum(seed: string | number, w: number, h: number) {
  return `https://picsum.photos/seed/${encodeURIComponent(String(seed))}/${w}/${h}`;
}

export function placeholder(w: number, h: number, label: string, bg = "0E0E0E", fg = "F5F1EC") {
  return `https://placehold.co/${w}x${h}/${bg}/${fg}?text=${encodeURIComponent(label)}&font=inter`;
}
