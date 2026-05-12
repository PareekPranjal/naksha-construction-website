import { SectionContainer, Eyebrow } from "../SectionContainer";
import { TestimonialCard } from "../TestimonialCard";
import { cms } from "@/lib/api";

export async function TestimonialsBlock() {
  const items = await cms.testimonials();
  if (!items.length) return null;
  return (
    <SectionContainer size="lg">
      <Eyebrow>What clients say</Eyebrow>
      <div className="mt-14 grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-10">
        {items.map((t) => (
          <TestimonialCard
            key={t.id}
            quote={t.quote}
            attribution={t.author}
            role={t.role ?? t.company ?? ""}
          />
        ))}
      </div>
    </SectionContainer>
  );
}
