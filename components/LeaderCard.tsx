import Image from "next/image";
import type { Leader } from "@/lib/data";

export function LeaderCard({ leader }: { leader: Leader }) {
  return (
    <article className="group">
      <div className="relative aspect-square w-full overflow-hidden rounded-card bg-ink/5">
        <Image
          src={leader.avatar}
          alt={leader.avatarAlt || `${leader.name}, ${leader.role}`}
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
          className="object-cover transition-transform duration-700 ease-out-expo group-hover:scale-[1.04]"
        />
        {/* attribution: portrait from picsum.photos (free placeholder) */}
      </div>
      <h3 className="serif mt-4 text-h4 text-ink">{leader.name}</h3>
      <p className="text-body-sm text-concrete-text">{leader.role}</p>
    </article>
  );
}
