import { CTABanner } from "../CTABanner";
import type { CtaBlockData } from "./types";

export function CtaBlock({ block }: { block: CtaBlockData }) {
  return (
    <CTABanner
      heading={block.heading ?? "Build with us."}
      sub={block.sub}
      cta={block.ctaLabel && block.ctaHref ? { label: block.ctaLabel, href: block.ctaHref } : undefined}
    />
  );
}
