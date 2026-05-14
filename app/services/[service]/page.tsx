import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { BlockRenderer } from "@/components/blocks/BlockRenderer";
import { cms } from "@/lib/api";
import { generatePageMetadata } from "@/lib/seo";

// Dynamic dedicated service-overview pages.
// Each one is a CMS page stored at `/services/<slug>` so editors can author
// the full hero + intro + gallery + longform + CTA layout from admin.

export const revalidate = 60;

type Params = { params: { service: string } };

export async function generateMetadata({ params }: Params) {
  const page = await cms.pageByPath(`/services/${params.service}`);
  if (!page) return {};
  return generatePageMetadata(`/services/${params.service}`, {
    title: page.seoTitle ?? page.title,
    description: page.seoDescription ?? undefined,
    ogImage: page.seoOgImage ?? undefined,
  });
}

export default async function ServicePage({ params }: Params) {
  const page = await cms.pageByPath(`/services/${params.service}`);
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
