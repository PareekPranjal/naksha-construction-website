import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PageHero } from "@/components/PageHero";
import { SectionContainer, Eyebrow } from "@/components/SectionContainer";
import { TwoColumnSplit } from "@/components/TwoColumnSplit";
import { StatStrip } from "@/components/StatCounter";
import { CTABanner } from "@/components/CTABanner";
import { LOREM } from "@/lib/data";
import { generatePageMetadata } from "@/lib/seo";
import { getSiteShell } from "@/lib/cms-server";
import { picsum } from "@/lib/utils";

export async function generateMetadata() {
  return generatePageMetadata("/careers/why-naksha", {
    title: "Why Naksha — Working at Naksha Construction",
    description: "What it's like to work at Naksha Construction — values, benefits, and how we hire.",
  });
}

const VALUES = [
  { title: "Craft", body: LOREM.medium },
  { title: "Care", body: LOREM.medium },
  { title: "Candor", body: LOREM.medium },
];

const STATS = [
  { value: 92, suffix: "%", label: "Annual retention rate" },
  { value: 50, suffix: "+", label: "Team members across the studio" },
  { value: 11, suffix: "", label: "Average years at Naksha for senior staff" },
  { value: 0, suffix: "", label: "Lost-time incidents in the past year" },
];

export default async function WhyNakshaPage() {
  const shell = await getSiteShell();
  const heroSlot = shell.siteSettings.heroImages?.careersWhyNaksha;
  const sectionSlot = shell.siteSettings.heroImages?.whyNakshaSection;
  return (
    <>
      <Header />
      <main className="pt-[64px] md:pt-[72px]">
        <PageHero
          eyebrow="Why Naksha"
          title="A studio that takes its people as seriously as its buildings."
          sub="What we look for, what we offer, and how we've shaped a place to do good work for a long time."
          image={heroSlot?.url || picsum("why-naksha-hero", 1920, 1080)}
          imageAlt={heroSlot?.alt}
        />

        <SectionContainer size="lg">
          <TwoColumnSplit
            eyebrow="The studio"
            heading="A practice — not a project shop."
            body={LOREM.long}
            image={sectionSlot?.url || picsum("why-naksha-1", 1400, 1000)}
            imageAlt={sectionSlot?.alt}
          />
        </SectionContainer>

        <SectionContainer size="lg">
          <div className="max-w-2xl">
            <Eyebrow>Values</Eyebrow>
            <h2 className="serif mt-4 text-h1">Three words we keep coming back to.</h2>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
            {VALUES.map((v) => (
              <div key={v.title} className="rounded-card border border-rule-ink bg-paper p-8">
                <p className="serif text-h2 text-ink">{v.title}</p>
                <p className="mt-4 text-body text-concrete-text">{v.body}</p>
              </div>
            ))}
          </div>
        </SectionContainer>

        <SectionContainer size="md" background="ink">
          <Eyebrow tone="accent">By the numbers</Eyebrow>
          <h2 className="serif mt-4 max-w-2xl text-h1 text-paper">
            What our culture produces.
          </h2>
          <div className="mt-12">
            <StatStrip stats={STATS} background="ink" />
          </div>
        </SectionContainer>

        <CTABanner
          heading="Browse our openings."
          sub="A short application, a real conversation, no take-home tests."
          cta={{ label: "See open roles", href: "/careers/openings" }}
        />
      </main>
      <Footer />
    </>
  );
}
