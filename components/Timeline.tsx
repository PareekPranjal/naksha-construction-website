import { AnimateInView } from "./AnimateInView";
import { Paragraphs } from "./Paragraphs";

type Item = { year?: string; step?: string; title: string; body: string };

export function Timeline({ items }: { items: Item[] }) {
  return (
    <ol className="relative">
      <span className="absolute left-[14px] top-2 bottom-2 w-px bg-rule-ink md:left-1/2" />
      {items.map((it, i) => (
        <li
          key={i}
          className={`relative grid grid-cols-1 gap-6 py-10 md:grid-cols-2 md:gap-16 ${
            i % 2 === 1 ? "md:[&>div:first-child]:order-2" : ""
          }`}
        >
          <span className="absolute left-[7px] top-12 h-4 w-4 rounded-full border-2 border-paper bg-accent md:left-[calc(50%-8px)]" />
          <AnimateInView className={`pl-10 md:pl-0 ${i % 2 === 1 ? "md:text-right" : ""}`}>
            <p className="eyebrow text-accent">{it.year ?? it.step ?? ""}</p>
            <h3 className="serif mt-3 text-h2 text-ink">{it.title}</h3>
          </AnimateInView>
          <AnimateInView className="pl-10 md:pl-0" delay={0.1}>
            <div className="text-body text-concrete-text">
              <Paragraphs text={it.body} as="div" paragraphClassName="text-concrete-text" />
            </div>
          </AnimateInView>
        </li>
      ))}
    </ol>
  );
}
