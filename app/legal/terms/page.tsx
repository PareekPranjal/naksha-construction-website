import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { BlockRenderer } from "@/components/blocks/BlockRenderer";
import { cms } from "@/lib/api";
import { pageMetadata } from "@/lib/seo";

export const revalidate = 60;

export async function generateMetadata() {
  const page = await cms.page("legal-terms");
  return pageMetadata({
    title: page?.seoTitle ?? "Terms of Use",
    description: page?.seoDescription ?? undefined,
    path: "/legal/terms",
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
