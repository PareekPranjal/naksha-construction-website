import { Quote } from "lucide-react";

export function TestimonialCard({
  quote,
  attribution,
  role,
  background = "paper",
}: {
  quote: string;
  attribution: string;
  role?: string;
  background?: "paper" | "ink";
}) {
  const ink = background === "ink";
  return (
    <figure
      className={`rounded-card p-8 md:p-12 ${
        ink ? "bg-ink text-paper" : "bg-paper text-ink"
      }`}
    >
      <Quote className="h-8 w-8 text-accent" />
      <blockquote
        className={`serif mt-6 text-h2 leading-tight ${ink ? "text-paper" : "text-ink"}`}
      >
        “{quote}”
      </blockquote>
      <figcaption className={`mt-8 text-body-sm ${ink ? "text-paper/70" : "text-concrete-text"}`}>
        <span className="font-semibold text-inherit">{attribution}</span>
        {role && <span> · {role}</span>}
      </figcaption>
    </figure>
  );
}
