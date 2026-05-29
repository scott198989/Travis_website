"use client";

import { LazyMotion, domAnimation, MotionConfig } from "motion/react";
import type { ReactNode } from "react";

/**
 * Wraps the app in LazyMotion (loads the ~5kb `domAnimation` feature bundle and
 * lets us use the lightweight `m` components instead of `motion`). `strict`
 * throws if anyone imports the heavy `motion` component by mistake.
 *
 * MotionConfig propagates the brand easing + respects reduced-motion globally.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user" transition={{ ease: [0.16, 1, 0.3, 1], duration: 0.7 }}>
        {children}
      </MotionConfig>
    </LazyMotion>
  );
}
