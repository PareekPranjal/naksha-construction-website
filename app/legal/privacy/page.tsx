import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { BlockRenderer } from "@/components/blocks/BlockRenderer";
import { cms } from "@/lib/api";
import { pageMetadata } from "@/lib/seo";

export const revalidate = 60;

export async function generateMetadata() {
  const page = await cms.page("legal-privacy");
  return pageMetadata({
    title: page?.seoTitle ?? "Privacy Policy",
    description: page?.seoDescription ?? undefined,
    path: "/legal/privacy",
  });
}

export default async function PrivacyPage() {
  const page = await cms.page("legal-privacy");
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
