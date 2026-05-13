import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { BlockRenderer } from "@/components/blocks/BlockRenderer";
import { cms } from "@/lib/api";
import { generatePageMetadata } from "@/lib/seo";

export const revalidate = 60;

export async function generateMetadata() {
  const page = await cms.page("home");
  return generatePageMetadata("/", {
    title: page?.seoTitle ?? undefined,
    description: page?.seoDescription ?? undefined,
    ogImage: page?.seoOgImage ?? undefined,
  });
}

export default async function HomePage() {
  const page = await cms.page("home");
  if (!page) notFound();
  return (
    <>
      <Header transparentOverHero />
      <main>
        <BlockRenderer blocks={page.blocks} />
      </main>
      <Footer />
    </>
  );
}
