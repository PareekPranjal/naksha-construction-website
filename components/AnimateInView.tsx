"use client";

import { motion, useReducedMotion, type HTMLMotionProps } from "framer-motion";
import { ReactNode } from "react";

type Tag = "div" | "section" | "article" | "li" | "header";

type Props = {
  children: ReactNode;
  delay?: number;
  className?: string;
  y?: number;
  as?: Tag;
};

export function AnimateInView({
  children,
  delay = 0,
  className,
  y = 24,
  as = "div",
}: Props) {
  const reduce = useReducedMotion();
  const initial = reduce ? { opacity: 1 } : { opacity: 0, y };
  const whileInView = reduce ? { opacity: 1 } : { opacity: 1, y: 0 };
  const transition = { duration: 0.6, ease: [0.2, 0.7, 0.2, 1] as const, delay };
  const viewport = { once: true, margin: "-80px" } as const;

  // Explicit map avoids dynamic proxy access on `motion[as]`,
  // which can break under certain HMR conditions in dev.
  const common = { className, initial, whileInView, viewport, transition };

  switch (as) {
    case "section":
      return (
        <motion.section {...(common as HTMLMotionProps<"section">)}>
          {children}
        </motion.section>
      );
    case "article":
      return (
        <motion.article {...(common as HTMLMotionProps<"article">)}>
          {children}
        </motion.article>
      );
    case "li":
      return <motion.li {...(common as HTMLMotionProps<"li">)}>{children}</motion.li>;
    case "header":
      return (
        <motion.header {...(common as HTMLMotionProps<"header">)}>
          {children}
        </motion.header>
      );
    default:
      return <motion.div {...(common as HTMLMotionProps<"div">)}>{children}</motion.div>;
  }
}
