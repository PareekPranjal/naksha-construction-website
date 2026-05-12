import { SectionContainer, Eyebrow } from "../SectionContainer";
import { LeaderCard } from "../LeaderCard";
import { cms } from "@/lib/api";

export async function LeadershipBlock() {
  const leaders = await cms.leaders();
  if (!leaders.length) return null;
  return (
    <SectionContainer size="lg">
      <Eyebrow>Leadership</Eyebrow>
      <h2 className="serif mt-6 text-h1">The people running the practice.</h2>
      <div className="mt-14 grid grid-cols-1 gap-x-10 gap-y-16 md:grid-cols-2 lg:grid-cols-4">
        {leaders.map((l) => (
          <LeaderCard key={l.name} leader={l} />
        ))}
      </div>
    </SectionContainer>
  );
}
