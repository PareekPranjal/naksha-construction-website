import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { BlockRenderer } from "@/components/blocks/BlockRenderer";
import { cms } from "@/lib/api";
import { pageMetadata } from "@/lib/seo";

export const revalidate = 60;

export async function generateMetadata() {
  const page = await cms.page("home");
  return pageMetadata({
    title: page?.seoTitle ?? "Naksha Construction",
    description: page?.seoDescription ?? undefined,
    path: "/",
    image: page?.seoOgImage ?? undefined,
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
