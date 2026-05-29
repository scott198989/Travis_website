"use client";

import { m, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { Pause, Play } from "lucide-react";

import { videos, site } from "@/lib/site-config";
import { Stars } from "@/components/brand/stars";

/**
 * The hero's defining frame: the brand video lives inside an off-center,
 * chrome-mullioned glass APERTURE (not full-bleed) — the single decision that
 * breaks the generic video-hero template.
 *
 * Robust autoplay: muted + autoPlay + loop + playsInline AND an imperative
 * `video.muted = true` in an effect (React can drop the muted attr on hydration,
 * which makes iOS refuse autoplay). Reduced-motion users get the poster, no
 * motion. A visible play/pause control satisfies WCAG 2.2.2.
 */
export function HeroVideo() {
  const reduce = useReducedMotion();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(true);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = true; // belt-and-suspenders for iOS autoplay
    if (reduce) {
      v.pause();
      setPlaying(false);
      return;
    }
    const p = v.play();
    if (p && typeof p.then === "function") {
      p.then(() => setPlaying(true)).catch(() => setPlaying(false));
    }
  }, [reduce]);

  const toggle = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      v.play();
      setPlaying(true);
    } else {
      v.pause();
      setPlaying(false);
    }
  };

  return (
    <m.div
      className="relative"
      initial={reduce ? false : { scale: 1.03 }}
      animate={reduce ? undefined : { scale: 1 }}
      transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Chrome frame */}
      <div className="relative rounded-[2rem] bg-gradient-to-b from-chrome-100 via-white to-chrome-300 p-[6px] shadow-glass-lg">
        {/* Aperture */}
        <div className="relative aspect-[4/3] overflow-hidden rounded-[1.65rem] bg-navy-900 ring-1 ring-inset ring-white/40 sm:aspect-[16/11] lg:aspect-[5/4]">
          <video
            ref={videoRef}
            className="absolute inset-0 size-full object-cover"
            poster={videos.hero.poster}
            muted
            autoPlay
            loop
            playsInline
            preload="metadata"
            aria-label={`${site.name} — window cleaning in motion`}
          >
            <source src={videos.hero.src} type="video/mp4" />
          </video>

          {/* cool color-grade so footage unifies with the palette */}
          <div
            aria-hidden
            className="absolute inset-0 mix-blend-soft-light"
            style={{ background: "linear-gradient(135deg, rgba(61,165,217,0.35), rgba(247,250,252,0.15))" }}
          />
          {/* bottom navy scrim guarantees contrast for the overlay chip */}
          <div
            aria-hidden
            className="absolute inset-0"
            style={{ background: "linear-gradient(to top, rgba(11,41,66,0.55), transparent 45%)" }}
          />
          {/* single golden lens-flare crossing the glass */}
          <div
            aria-hidden
            className="absolute -inset-x-10 top-1/4 h-24 rotate-[-18deg] blur-md"
            style={{
              background:
                "linear-gradient(90deg, transparent 35%, rgba(246,192,98,0.55) 50%, transparent 65%)",
            }}
          />
          {/* windowpane mullion overlay — makes the footage read as seen through glass */}
          <div aria-hidden className="pointer-events-none absolute inset-0">
            <div className="absolute inset-y-0 left-[38%] w-px bg-white/30 shadow-[1px_0_2px_rgba(11,41,66,0.25)]" />
            <div className="absolute inset-x-0 top-1/2 h-px bg-white/30 shadow-[0_1px_2px_rgba(11,41,66,0.25)]" />
          </div>

          {/* play / pause control (WCAG 2.2.2) */}
          <button
            type="button"
            onClick={toggle}
            className="absolute bottom-3 right-3 inline-flex size-10 items-center justify-center rounded-full bg-navy-900/55 text-white backdrop-blur-sm transition-colors hover:bg-navy-900/75 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            aria-label={playing ? "Pause video" : "Play video"}
          >
            {playing ? <Pause className="size-4" /> : <Play className="size-4 translate-x-px" />}
          </button>
        </div>
      </div>

      {/* Floating reviews chip (layered glass) */}
      <div className="glass-card absolute -bottom-6 left-4 flex items-center gap-3 rounded-2xl px-4 py-3 sm:-left-6">
        <div className="flex flex-col">
          <Stars rating={site.stats.googleRating} size="size-4" />
          <span className="mt-1 text-xs font-medium text-ink-muted">
            <span className="font-display text-sm font-semibold text-navy-900 tnum">
              {site.stats.googleRating.toFixed(1)}
            </span>{" "}
            · {site.stats.reviewCount} Google reviews
          </span>
        </div>
      </div>
    </m.div>
  );
}
