import { SectionContainer, Eyebrow } from "../SectionContainer";
import { MarketCard } from "../MarketCard";
import { cms } from "@/lib/api";

export async function MarketsGridBlock() {
  const markets = await cms.markets();
  if (!markets.length) return null;
  return (
    <SectionContainer size="lg">
      <Eyebrow>Markets</Eyebrow>
      <h2 className="serif mt-6 text-h1">Sectors we build for.</h2>
      <div className="mt-14 grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-10 lg:grid-cols-3">
        {markets.map((m) => (
          <MarketCard
            key={m.slug}
            market={{
              slug: m.slug,
              title: m.title,
              short: m.summary,
              image: m.image ?? "",
              intro: m.body,
              capabilities: [],
              stats: [],
            }}
          />
        ))}
      </div>
    </SectionContainer>
  );
}
