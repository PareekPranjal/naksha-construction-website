import Image from "next/image";

export function PageHero({
  eyebrow,
  title,
  sub,
  image,
  height = "md",
}: {
  eyebrow?: string;
  title: string;
  sub?: string;
  image: string;
  height?: "sm" | "md" | "lg";
}) {
  const h = {
    sm: "h-[42vh] min-h-[320px]",
    md: "h-[60vh] min-h-[420px]",
    lg: "h-[78vh] min-h-[560px]",
  }[height];
  return (
    <section className={`relative w-full overflow-hidden bg-ink text-paper ${h}`}>
      <Image
        src={image}
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-ink/40 via-ink/45 to-ink/75" />
      <div className="relative z-10 flex h-full items-end pb-12 md:pb-20">
        <div className="wrap">
          <div className="max-w-3xl">
            {eyebrow && <p className="eyebrow text-accent">{eyebrow}</p>}
            <h1 className="serif mt-4 text-display-lg md:text-[72px] md:leading-[1.05]">
              {title}
            </h1>
            {sub && <p className="mt-5 max-w-2xl text-lead text-paper/85">{sub}</p>}
          </div>
        </div>
      </div>
    </section>
  );
}
