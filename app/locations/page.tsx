import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PageHero } from "@/components/PageHero";
import { SectionContainer, Eyebrow } from "@/components/SectionContainer";
import { LocationCard } from "@/components/LocationCard";
import { CTABanner } from "@/components/CTABanner";
import { AnimateInView } from "@/components/AnimateInView";
import { LOREM } from "@/lib/data";
import { cms } from "@/lib/api";
import { pageMetadata } from "@/lib/seo";
import { picsum } from "@/lib/utils";

export const revalidate = 60;

export const metadata = pageMetadata({
  title: "Locations",
  description: "Our offices across Rajasthan.",
  path: "/locations",
});

export default async function LocationsPage() {
  const LOCATIONS = await cms.locations();
  return (
    <>
      <Header />
      <main className="pt-[64px] md:pt-[72px]">
        <PageHero
          eyebrow="Locations"
          title="Six offices, one Rajasthan-wide team."
          sub="Local crews, central coordination, and a single accountable practice across the state."
          image={picsum("locations-hero", 1920, 1080)}
        />

        <SectionContainer size="lg">
          <div className="max-w-reading">
            <Eyebrow>Where we are</Eyebrow>
            <p className="mt-4 text-lead text-concrete-text">{LOREM.medium}</p>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {LOCATIONS.map((l, i) => (
              <AnimateInView key={l.city} delay={i * 0.04}>
                <LocationCard location={l} />
              </AnimateInView>
            ))}
          </div>
        </SectionContainer>

        <SectionContainer size="md">
          <div className="overflow-hidden rounded-card border border-rule-ink">
            <iframe
              title="Map of Naksha Construction headquarters in Jaipur"
              src="https://www.openstreetmap.org/export/embed.html?bbox=75.74%2C26.85%2C75.86%2C26.95&amp;layer=mapnik"
              className="h-[420px] w-full"
              loading="lazy"
            />
          </div>
        </SectionContainer>

        <CTABanner
          heading="Visit us."
          sub="Drop in for a coffee — let us walk you through current work in your city."
        />
      </main>
      <Footer />
    </>
  );
}
