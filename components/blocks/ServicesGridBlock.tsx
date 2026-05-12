import { SectionContainer, Eyebrow } from "../SectionContainer";
import { ServiceCard } from "../ServiceCard";
import { cms } from "@/lib/api";

export async function ServicesGridBlock() {
  const services = await cms.services();
  if (!services.length) return null;
  return (
    <SectionContainer size="lg">
      <Eyebrow>Services</Eyebrow>
      <h2 className="serif mt-6 text-h1">How we deliver.</h2>
      <div className="mt-14 grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-10 lg:grid-cols-3">
        {services.map((s) => (
          <ServiceCard
            key={s.slug}
            service={{
              slug: s.slug,
              title: s.title,
              short: s.summary,
              description: s.body,
              outcomes: s.bullets ?? [],
              image: s.icon ?? "",
              process: [],
              faq: [],
            }}
          />
        ))}
      </div>
    </SectionContainer>
  );
}
