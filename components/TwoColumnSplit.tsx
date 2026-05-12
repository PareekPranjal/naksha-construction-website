import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { AnimateInView } from "./AnimateInView";
import { Eyebrow } from "./SectionContainer";
import { Paragraphs } from "./Paragraphs";

export function TwoColumnSplit({
  eyebrow,
  heading,
  body,
  bullets,
  image,
  imageAlt = "",
  cta,
  reverse = false,
}: {
  eyebrow?: string;
  heading: string;
  body: string;
  bullets?: string[];
  image: string;
  imageAlt?: string;
  cta?: { label: string; href: string };
  reverse?: boolean;
}) {
  return (
    <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-2 md:gap-16">
      <AnimateInView className={reverse ? "md:order-2" : ""}>
        {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
        <h2 className="serif mt-4 text-h1 text-ink">{heading}</h2>
        <div className="mt-5 text-body text-concrete-text">
          <Paragraphs text={body} as="div" paragraphClassName="text-concrete-text" />
        </div>
        {bullets && (
          <ul className="mt-6 space-y-3">
            {bullets.map((b) => (
              <li key={b} className="flex items-start gap-3 text-body text-ink">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                {b}
              </li>
            ))}
          </ul>
        )}
        {cta && (
          <Link
            href={cta.href}
            className="mt-8 inline-flex items-center gap-2 text-button text-accent hover:text-accent-hi"
          >
            {cta.label} <ArrowRight className="h-4 w-4" />
          </Link>
        )}
      </AnimateInView>
      <AnimateInView className={reverse ? "md:order-1" : ""} delay={0.1}>
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-card bg-ink/10">
          <Image
            src={image}
            alt={imageAlt}
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover"
          />
          {/* attribution: image from picsum.photos (free placeholder) */}
        </div>
      </AnimateInView>
    </div>
  );
}
