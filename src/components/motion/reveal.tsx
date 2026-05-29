"use client";

import { m, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

const EASE = [0.16, 1, 0.3, 1] as const;

type RevealVariant = "fade-up" | "wipe" | "scale-in" | "fade";

/**
 * Reusable scroll-into-view reveal. Keeps `'use client'` confined to one place
 * so section components can stay server-rendered where possible.
 *
 * - `wipe` uses a diagonal clip-path "squeegee" reveal (the brand signature).
 * - Reduced-motion users get an instant, static render (no transform/clip).
 */
export function Reveal({
  children,
  className,
  variant = "fade-up",
  delay = 0,
  y = 22,
  once = true,
}: {
  children: ReactNode;
  className?: string;
  variant?: RevealVariant;
  delay?: number;
  y?: number;
  once?: boolean;
}) {
  const reduce = useReducedMotion();

  if (reduce) {
    return <div className={className}>{children}</div>;
  }

  const variants = {
    "fade-up": {
      hidden: { opacity: 0, y },
      show: { opacity: 1, y: 0 },
    },
    fade: {
      hidden: { opacity: 0 },
      show: { opacity: 1 },
    },
    "scale-in": {
      hidden: { opacity: 0, scale: 0.94 },
      show: { opacity: 1, scale: 1 },
    },
    wipe: {
      hidden: { opacity: 0, clipPath: "inset(0 100% 0 0)", x: -16 },
      show: { opacity: 1, clipPath: "inset(0 0% 0 0)", x: 0 },
    },
  }[variant];

  return (
    <m.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once, margin: "-80px" }}
      variants={variants}
      transition={{ duration: variant === "wipe" ? 0.9 : 0.7, ease: EASE, delay }}
    >
      {children}
    </m.div>
  );
}
