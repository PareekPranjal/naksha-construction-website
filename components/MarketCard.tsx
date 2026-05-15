import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import type { Market } from "@/lib/data";

export function MarketCard({ market }: { market: Market }) {
  return (
    <Link
      href={`/markets/${market.slug}`}
      className="group relative block aspect-[4/5] overflow-hidden rounded-card bg-ink"
    >
      <Image
        src={market.image}
        alt={market.imageAlt || market.title}
        fill
        sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
        className="object-cover opacity-90 transition-all duration-700 ease-out-expo group-hover:scale-[1.05] group-hover:opacity-100"
      />
      {/* attribution: image from picsum.photos (free placeholder) */}
      <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/30 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 p-6">
        <h3 className="serif text-h2 text-paper">{market.title}</h3>
        <div className="mt-3 flex items-center gap-2 text-body-sm text-paper/80 transition-colors group-hover:text-accent">
          Explore market
          <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </div>
      </div>
    </Link>
  );
}
