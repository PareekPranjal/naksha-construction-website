import { SectionContainer, Eyebrow } from "../SectionContainer";
import { LocationCard } from "../LocationCard";
import { cms } from "@/lib/api";

export async function LocationsGridBlock({ block }: { block: { compact?: boolean } }) {
  const locations = await cms.locations();
  if (!locations.length) return null;
  return (
    <SectionContainer size="lg">
      <Eyebrow>Locations</Eyebrow>
      <h2 className="serif mt-6 text-h1">
        {block.compact ? "Visit us." : "Where we work from."}
      </h2>
      <div className="mt-14 grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-10 lg:grid-cols-3">
        {locations.map((l) => (
          <LocationCard key={l.city} location={l} />
        ))}
      </div>
    </SectionContainer>
  );
}
