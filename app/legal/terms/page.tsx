import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { BlockRenderer } from "@/components/blocks/BlockRenderer";
import { cms } from "@/lib/api";
import { generatePageMetadata } from "@/lib/seo";

export const revalidate = 60;

export async function generateMetadata() {
  const page = await cms.page("legal-terms");
  return generatePageMetadata("/legal/terms", {
    title: page?.seoTitle ?? "Terms of Use",
    description: page?.seoDescription ?? "Terms of use for Naksha Construction.",
  });
}

export default async function TermsPage() {
  const page = await cms.page("legal-terms");
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
