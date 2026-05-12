"use client";

import { animate, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

type Stat = { value: number; suffix?: string; label: string };

const COLS: Record<number, string> = {
  1: "md:grid-cols-1",
  2: "md:grid-cols-2",
  3: "md:grid-cols-3",
  4: "md:grid-cols-4",
};

export function StatStrip({
  stats,
  background = "paper",
}: {
  stats: Stat[];
  background?: "paper" | "ink";
}) {
  const ink = background === "ink";
  const colsClass = COLS[Math.min(stats.length, 4)] ?? "md:grid-cols-4";
  return (
    <ul
      className={`grid grid-cols-2 gap-y-10 ${colsClass} ${
        ink ? "text-paper" : "text-ink"
      }`}
    >
      {stats.map((s) => (
        <li key={s.label} className="border-l border-rule-ink pl-6 first:border-l-0 md:first:border-l">
          <div className="serif flex items-baseline text-display-lg leading-none">
            <Counter value={s.value} />
            {s.suffix && <span className="ml-1 text-h2 text-accent">{s.suffix}</span>}
          </div>
          <p
            className={`mt-3 text-body-sm ${ink ? "text-paper/70" : "text-concrete-text"}`}
          >
            {s.label}
          </p>
        </li>
      ))}
    </ul>
  );
}

function Counter({ value }: { value: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const reduce = useReducedMotion();
  const [n, setN] = useState(reduce ? value : 0);

  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      setN(value);
      return;
    }
    const controls = animate(0, value, {
      duration: 1.6,
      ease: [0.2, 0.7, 0.2, 1],
      onUpdate: (v) => setN(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, value, reduce]);

  return <span ref={ref}>{n.toLocaleString()}</span>;
}
