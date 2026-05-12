import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { BlockRenderer } from "@/components/blocks/BlockRenderer";
import { cms } from "@/lib/api";
import { pageMetadata } from "@/lib/seo";

export const revalidate = 60;

export async function generateMetadata() {
  const page = await cms.page("careers-index");
  return pageMetadata({
    title: page?.seoTitle ?? "Careers",
    description: page?.seoDescription ?? undefined,
    path: "/careers",
    image: page?.seoOgImage ?? undefined,
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
