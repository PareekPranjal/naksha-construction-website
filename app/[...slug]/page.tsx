import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { BlockRenderer } from "@/components/blocks/BlockRenderer";
import { cms } from "@/lib/api";
import { generatePageMetadata } from "@/lib/seo";

// Catch-all for CMS-authored pages. Any path that doesn't have a dedicated
// app/<segment>/page.tsx falls through to here. The page is looked up in the
// Pages collection by full path; if missing, we 404 like any other unknown URL.

export const revalidate = 60;

type Params = { params: { slug: string[] } };

function buildPath(slug: string[]): string {
  return "/" + slug.map(encodeURIComponent).join("/");
}

export async function generateMetadata({ params }: Params) {
  const path = buildPath(params.slug);
  const page = await cms.pageByPath(path);
  if (!page) return {};
  return generatePageMetadata(path, {
    title: page.seoTitle ?? page.title,
    description: page.seoDescription ?? undefined,
    ogImage: page.seoOgImage ?? undefined,
  });
}

export default async function CmsCatchAllPage({ params }: Params) {
  const path = buildPath(params.slug);
  const page = await cms.pageByPath(path);
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
