import { generatePageMetadata } from "@/lib/seo";
import OpeningsClient from "./OpeningsClient";

export const revalidate = 60;

export async function generateMetadata() {
  return generatePageMetadata("/careers/openings", {
    title: "Open Roles — Careers at Naksha Construction",
    description:
      "Browse current job openings at Naksha Construction. Engineering, project management, design, site supervision and operations roles across Rajasthan.",
  });
}

export default function OpeningsPage() {
  return <OpeningsClient />;
}
