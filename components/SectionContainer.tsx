import { cn } from "@/lib/utils";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  size?: "lg" | "md" | "sm";
  background?: "paper" | "ink" | "transparent";
  id?: string;
  as?: "section" | "div" | "article";
};

export function SectionContainer({
  children,
  className,
  size = "lg",
  background = "paper",
  id,
  as: Tag = "section",
}: Props) {
  const padY = {
    lg: "py-[48px] md:py-[64px] lg:py-[80px]",
    md: "py-[32px] md:py-[44px] lg:py-[56px]",
    sm: "py-[20px] md:py-[28px] lg:py-[36px]",
  }[size];
  const bg =
    background === "ink"
      ? "bg-ink text-paper"
      : background === "paper"
        ? "bg-paper text-ink"
        : "";
  return (
    <Tag id={id} className={cn(bg, padY)}>
      <div className={cn("wrap", className)}>{children}</div>
    </Tag>
  );
}

export function Eyebrow({
  children,
  className,
  tone = "accent",
}: {
  children: ReactNode;
  className?: string;
  tone?: "accent" | "ink" | "paper";
}) {
  const t =
    tone === "accent" ? "text-accent" : tone === "paper" ? "text-paper" : "text-ink";
  return <p className={cn("eyebrow", t, className)}>{children}</p>;
}
