import { SectionContainer, Eyebrow } from "../SectionContainer";
import type { MapBlockData } from "./types";

const HEIGHT_CLASSES: Record<NonNullable<MapBlockData["height"]>, string> = {
  sm: "h-[300px]",
  md: "h-[420px]",
  lg: "h-[560px]",
};

export function MapBlock({ block }: { block: MapBlockData }) {
  const lat = typeof block.lat === "number" ? block.lat : null;
  const lng = typeof block.lng === "number" ? block.lng : null;
  const zoom = typeof block.zoom === "number" ? block.zoom : 16;
  const heightClass = HEIGHT_CLASSES[block.height ?? "md"];

  const embedUrl =
    block.embedUrl ||
    (lat != null && lng != null
      ? `https://www.google.com/maps?q=${lat},${lng}&z=${zoom}&hl=en&output=embed`
      : null);

  if (!embedUrl) return null;

  const openInMapsHref =
    block.linkHref ||
    (lat != null && lng != null
      ? `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`
      : undefined);

  return (
    <SectionContainer size="lg">
      {block.heading && <Eyebrow>{block.heading}</Eyebrow>}
      <div className={`relative mt-4 overflow-hidden rounded-card border border-rule-ink ${heightClass}`}>
        <iframe
          src={embedUrl}
          title={block.heading || "Map"}
          loading="lazy"
          allowFullScreen
          referrerPolicy="no-referrer-when-downgrade"
          className="absolute inset-0 h-full w-full border-0"
        />
      </div>
      {openInMapsHref && (
        <p className="mt-3 text-body-sm">
          <a
            href={openInMapsHref}
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent underline-offset-4 hover:underline"
          >
            {block.linkLabel || "Open in Google Maps →"}
          </a>
        </p>
      )}
    </SectionContainer>
  );
}
