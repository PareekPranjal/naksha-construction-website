import { SectionContainer } from "../SectionContainer";
import { StatStrip } from "../StatCounter";
import type { StatsBlockData } from "./types";

function parseStat(s: { value: string | number; label: string }) {
  const raw = String(s.value).trim();
  const match = raw.match(/^([\d.,]+)(.*)$/);
  if (!match) return { label: s.label, value: 0, suffix: raw };
  return {
    label: s.label,
    value: parseFloat(match[1].replace(/,/g, "")),
    suffix: match[2].trim(),
  };
}

export function StatsBlock({ block }: { block: StatsBlockData }) {
  const items = (block.items ?? []).map(parseStat);
  if (!items.length) return null;
  return (
    <SectionContainer size="md">
      <div className="border-y border-rule-ink py-10 md:py-14">
        <StatStrip stats={items} />
      </div>
    </SectionContainer>
  );
}
