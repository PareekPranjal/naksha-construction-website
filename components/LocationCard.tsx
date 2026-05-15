import Image from "next/image";
import { Mail, MapPin, Phone } from "lucide-react";
import type { Location } from "@/lib/data";

export function LocationCard({ location }: { location: Location }) {
  return (
    <article className="overflow-hidden rounded-card border border-rule-ink bg-paper">
      <div className="relative aspect-[16/10] w-full">
        <Image
          src={location.image}
          alt={location.imageAlt || `${location.city} office`}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
          className="object-cover"
        />
        {/* attribution: image from picsum.photos (free placeholder) */}
      </div>
      <div className="p-6">
        <h3 className="serif text-h3 text-ink">{location.city}</h3>
        <ul className="mt-4 space-y-3 text-body-sm text-concrete-text">
          <li className="flex items-start gap-2">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
            <span>
              {location.address.map((l, i) => (
                <span key={i} className="block">{l}</span>
              ))}
            </span>
          </li>
          <li className="flex items-center gap-2">
            <Phone className="h-4 w-4 shrink-0 text-accent" />
            <a href={`tel:${location.phone.replace(/\s/g, "")}`} className="hover:text-accent">
              {location.phone}
            </a>
          </li>
          <li className="flex items-center gap-2">
            <Mail className="h-4 w-4 shrink-0 text-accent" />
            <a href={`mailto:${location.email}`} className="hover:text-accent">
              {location.email}
            </a>
          </li>
        </ul>
      </div>
    </article>
  );
}
