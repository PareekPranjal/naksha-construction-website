import Link from "next/link";
import Image from "next/image";
import type { Article } from "@/lib/data";
import { formatDate } from "@/lib/utils";

export function ArticleCard({ article, featured = false }: { article: Article; featured?: boolean }) {
  return (
    <Link
      href={`/insights/${article.slug}`}
      className={`group block ${featured ? "md:col-span-2" : ""}`}
    >
      <div className="relative aspect-[16/9] w-full overflow-hidden rounded-card bg-ink/10">
        <Image
          src={article.cover}
          alt={article.title}
          fill
          sizes={featured ? "(min-width: 1024px) 66vw, 100vw" : "(min-width: 1024px) 33vw, 100vw"}
          className="object-cover transition-transform duration-700 ease-out-expo group-hover:scale-[1.04]"
        />
        {/* attribution: image from picsum.photos (free placeholder) */}
        <span className="absolute left-4 top-4 rounded-full bg-paper/95 px-3 py-1 text-body-sm font-medium text-ink">
          {article.category}
        </span>
      </div>
      <div className="pt-5">
        <p className="text-body-sm text-concrete-text">{formatDate(article.date)}</p>
        <h3
          className={`serif mt-2 ${
            featured ? "text-h2" : "text-h3"
          } text-ink transition-colors group-hover:text-accent`}
        >
          {article.title}
        </h3>
        {featured && (
          <p className="mt-3 max-w-xl text-body text-concrete-text">{article.excerpt}</p>
        )}
      </div>
    </Link>
  );
}
