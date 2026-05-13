import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { BlockRenderer } from "@/components/blocks/BlockRenderer";
import { cms } from "@/lib/api";
import { generatePageMetadata } from "@/lib/seo";

export const revalidate = 60;

export async function generateMetadata() {
  const page = await cms.page("markets-index");
  return generatePageMetadata("/markets", {
    title: page?.seoTitle ?? "Markets We Serve",
    description: page?.seoDescription ?? undefined,
    ogImage: page?.seoOgImage ?? undefined,
  });
}

export default async function MarketsIndexPage() {
  const page = await cms.page("markets-index");
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
