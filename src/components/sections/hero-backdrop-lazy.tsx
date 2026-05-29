"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

// Code-split the WebGL bundle (three + r3f) and never SSR it.
const HeroBackdrop = dynamic(() => import("./hero-backdrop"), { ssr: false });

function canRunWebGL() {
  try {
    const canvas = document.createElement("canvas");
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext("webgl") || canvas.getContext("experimental-webgl"))
    );
  } catch {
    return false;
  }
}

/**
 * Progressive enhancement gate for the hero WebGL flourish. Mounts the canvas
 * ONLY when: hydrated + desktop-sized + motion allowed + WebGL available + tab
 * visible. Otherwise (and on mobile / reduced-motion) it renders nothing and a
 * pure-CSS gradient (in the hero) carries the look. The shader can never break
 * or slow the core experience.
 */
export function HeroBackdropLazy() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const motionOk = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const desktop = window.matchMedia("(min-width: 1024px)").matches;
    setEnabled(motionOk && desktop && canRunWebGL());
  }, []);

  if (!enabled) return null;

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-0 opacity-60 mix-blend-screen"
    >
      <HeroBackdrop />
    </div>
  );
}
