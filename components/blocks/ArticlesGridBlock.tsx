import { SectionContainer, Eyebrow } from "../SectionContainer";
import { ArticleCard } from "../ArticleCard";
import { cms } from "@/lib/api";

export async function ArticlesGridBlock({ block }: { block: { limit?: number } }) {
  const all = await cms.articles();
  const list = block.limit ? all.slice(0, block.limit) : all;
  if (!list.length) return null;
  const [first, ...rest] = list;
  return (
    <SectionContainer size="lg">
      <Eyebrow>Read</Eyebrow>
      {first && (
        <div className="mt-14 grid grid-cols-1 gap-x-10 gap-y-16 md:grid-cols-3">
          <ArticleCard article={first} featured />
        </div>
      )}
      {rest.length > 0 && (
        <div className="mt-16 grid grid-cols-1 gap-x-10 gap-y-16 md:grid-cols-3">
          {rest.map((a) => (
            <ArticleCard key={a.slug} article={a} />
          ))}
        </div>
      )}
    </SectionContainer>
  );
}
