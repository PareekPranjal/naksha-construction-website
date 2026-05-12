import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SectionContainer, Eyebrow } from "@/components/SectionContainer";

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="pt-[64px] md:pt-[72px]">
        <SectionContainer size="lg">
          <div className="mx-auto max-w-2xl text-center">
            <Eyebrow>404</Eyebrow>
            <h1 className="serif mt-4 text-display-lg leading-[1.05]">Page not found.</h1>
            <p className="mt-5 text-lead text-concrete-text">
              The page you're looking for has moved or never existed.
            </p>
            <Link
              href="/"
              className="mt-8 inline-flex items-center gap-2 rounded-card bg-ink px-6 py-3 text-button text-paper hover:bg-accent"
            >
              Back to home
            </Link>
          </div>
        </SectionContainer>
      </main>
      <Footer />
    </>
  );
}
