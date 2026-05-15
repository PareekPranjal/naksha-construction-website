import { generatePageMetadata } from "@/lib/seo";
import { getSiteShell } from "@/lib/cms-server";
import InsightsClient from "./InsightsClient";

export const revalidate = 60;

export async function generateMetadata() {
  return generatePageMetadata("/insights", {
    title: "Insights & Field Notes",
    description:
      "Field notes from Naksha Construction — articles, observations and lessons learned from building projects across India.",
  });
}

export default async function InsightsPage() {
  const shell = await getSiteShell();
  const hero = shell.siteSettings.heroImages?.insightsIndex;
  return <InsightsClient heroImage={hero?.url} heroImageAlt={hero?.alt} />;
}
