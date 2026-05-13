import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { BlockRenderer } from "@/components/blocks/BlockRenderer";
import { cms } from "@/lib/api";
import { generatePageMetadata } from "@/lib/seo";

export const revalidate = 60;

export async function generateMetadata() {
  const page = await cms.page("careers-index");
  return generatePageMetadata("/careers", {
    title: page?.seoTitle ?? "Careers at Naksha Construction",
    description: page?.seoDescription ?? undefined,
    ogImage: page?.seoOgImage ?? undefined,
  });
}

export default async function CareersPage() {
  const page = await cms.page("careers-index");
  if (!page) notFound();
  return (
    <>
      <Header />
      <main className="pt-[64px] md:pt-[72px]">
        <BlockRenderer blocks={page.blocks} />
      </main>
      <Footer />
    </>
  );
}
