import { generatePageMetadata } from "@/lib/seo";
import InsightsClient from "./InsightsClient";

export const revalidate = 60;

export async function generateMetadata() {
  return generatePageMetadata("/insights", {
    title: "Insights & Field Notes",
    description:
      "Field notes from Naksha Construction — articles, observations and lessons learned from building projects across India.",
  });
}

export default function InsightsPage() {
  return <InsightsClient />;
}
