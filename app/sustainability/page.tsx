import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { BlockRenderer } from "@/components/blocks/BlockRenderer";
import { cms } from "@/lib/api";
import { pageMetadata } from "@/lib/seo";

export const revalidate = 60;

export async function generateMetadata() {
  const page = await cms.page("sustainability");
  return pageMetadata({
    title: page?.seoTitle ?? "Sustainability",
    description: page?.seoDescription ?? undefined,
    path: "/sustainability",
    image: page?.seoOgImage ?? undefined,
  });
}

export default async function SustainabilityPage() {
  const page = await cms.page("sustainability");
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
