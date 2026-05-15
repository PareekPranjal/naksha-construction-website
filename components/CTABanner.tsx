import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { picsum } from "@/lib/utils";
import { Paragraphs } from "./Paragraphs";

export function CTABanner({
  eyebrow = "Ready to begin",
  heading,
  sub,
  cta = { label: "Start a Project", href: "/contact" },
  image,
  imageAlt,
}: {
  eyebrow?: string;
  heading: string;
  sub?: string;
  cta?: { label: string; href: string };
  image?: string;
  imageAlt?: string;
}) {
  // Fall back to a deterministic placeholder when no image is supplied.
  // Callers should pass image+imageAlt from siteSettings.heroImages.ctaDefault
  // (or a block field) so admins can swap this without touching code.
  const src = image || picsum("cta-banner", 2000, 1100);
  return (
    <section className="relative w-full overflow-hidden bg-ink text-paper">
      <Image
        src={src}
        alt={imageAlt ?? ""}
        fill
        sizes="100vw"
        className="object-cover opacity-50"
      />
      <div className="absolute inset-0 bg-ink/55" />
      <div className="relative z-10 wrap py-20 md:py-28 lg:py-36">
        <div className="max-w-3xl">
          <p className="eyebrow text-accent">{eyebrow}</p>
          <h2 className="serif mt-4 text-display-lg leading-[1.05] text-paper">{heading}</h2>
          {sub && (
            <div className="mt-5 max-w-xl text-lead text-paper/85">
              <Paragraphs text={sub} as="div" paragraphClassName="text-paper/85" />
            </div>
          )}
          <Link
            href={cta.href}
            className="mt-8 inline-flex items-center gap-2 rounded-card bg-accent px-6 py-3 text-button text-paper hover:bg-accent-hi"
          >
            {cta.label} <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
