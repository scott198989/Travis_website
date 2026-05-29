"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";
import { MoveHorizontal, Pause, Play } from "lucide-react";

import { videos, site } from "@/lib/site-config";
import { DropletLens } from "@/components/brand/droplet-lens";

/**
 * "See the difference" comparator: drag (or arrow-key) the squeegee divider to
 * wipe from a foggy BEFORE to the crisp AFTER (the showcase video). Makes the
 * core value — clarity — tactile.
 *
 * Perf: the <video> only mounts once scrolled near view (IntersectionObserver)
 * so it never competes with the hero for bandwidth on load.
 */
export function ShowcaseComparator() {
  const reduce = useReducedMotion();
  const wrapRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [pos, setPos] = useState(52);
  const [mounted, setMounted] = useState(false);
  const [playing, setPlaying] = useState(false);

  // Lazy-mount the video when near the viewport.
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setMounted(true);
          io.disconnect();
        }
      },
      { rootMargin: "250px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const v = videoRef.current;
    if (!v || !mounted) return;
    v.muted = true;
    if (reduce) {
      v.pause();
      setPlaying(false);
      return;
    }
    const p = v.play();
    if (p && typeof p.then === "function") {
      p.then(() => setPlaying(true)).catch(() => setPlaying(false));
    }
  }, [mounted, reduce]);

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
    <div
      ref={wrapRef}
      className="relative rounded-[2rem] bg-gradient-to-b from-chrome-100/90 via-white/70 to-chrome-300/80 p-[6px] shadow-glass-lg"
    >
      <div className="relative aspect-[16/10] select-none overflow-hidden rounded-[1.65rem] bg-navy-900 ring-1 ring-inset ring-white/30">
        {/* AFTER = crisp video */}
        {mounted ? (
          <video
            ref={videoRef}
            className="absolute inset-0 size-full object-cover"
            poster={videos.showcase.poster}
            muted
            loop
            playsInline
            preload="none"
            aria-label={`${site.name} — finished, streak-free windows`}
          >
            <source src={videos.showcase.src} type="video/mp4" />
          </video>
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={videos.showcase.poster}
            alt=""
            className="absolute inset-0 size-full object-cover"
          />
        )}

        {/* BEFORE = foggy / spotted, clipped to the left of the divider */}
        <div
          className="absolute inset-0"
          style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
          aria-hidden
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={videos.showcase.poster}
            alt=""
            className="size-full object-cover"
            style={{ filter: "blur(3px) brightness(0.82) contrast(0.82) saturate(0.7)" }}
          />
          {/* condensation / water-spot overlay */}
          <div
            className="absolute inset-0 opacity-70"
            style={{
              backgroundImage:
                "radial-gradient(circle at 20% 30%, rgba(255,255,255,0.5) 0 2px, transparent 3px), radial-gradient(circle at 65% 60%, rgba(255,255,255,0.4) 0 2px, transparent 3px), radial-gradient(circle at 40% 80%, rgba(255,255,255,0.4) 0 1.5px, transparent 3px), radial-gradient(circle at 80% 25%, rgba(255,255,255,0.35) 0 2px, transparent 3px)",
              backgroundSize: "90px 90px, 120px 120px, 70px 70px, 140px 140px",
            }}
          />
          <span className="absolute left-3 top-3 rounded-full bg-navy-900/70 px-2.5 py-1 text-[0.7rem] font-semibold uppercase tracking-wide text-white/90 backdrop-blur-sm">
            Before
          </span>
        </div>

        <span className="absolute right-3 top-3 rounded-full bg-gold-500 px-2.5 py-1 text-[0.7rem] font-semibold uppercase tracking-wide text-navy-900">
          After
        </span>

        {/* Divider + grab handle */}
        <div
          className="pointer-events-none absolute inset-y-0 z-10 w-0.5 bg-white/90 shadow-[0_0_14px_rgba(61,165,217,0.7)]"
          style={{ left: `${pos}%` }}
        >
          <span className="absolute top-1/2 left-1/2 inline-flex size-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-navy-900 shadow-lg ring-1 ring-chrome-300">
            <MoveHorizontal className="size-5" />
          </span>
        </div>

        {/* Accessible drag/keyboard control spanning the frame */}
        <input
          type="range"
          min={0}
          max={100}
          value={pos}
          onChange={(e) => setPos(Number(e.target.value))}
          aria-label="Drag to compare dirty windows before vs. spotless after"
          className="absolute inset-0 z-20 h-full w-full cursor-ew-resize opacity-0"
        />

        {/* Pause control (WCAG 2.2.2) — above the range input */}
        {mounted && !reduce && (
          <button
            type="button"
            onClick={toggle}
            className="absolute bottom-3 left-3 z-30 inline-flex size-10 items-center justify-center rounded-full bg-navy-900/55 text-white backdrop-blur-sm transition-colors hover:bg-navy-900/75 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            aria-label={playing ? "Pause video" : "Play video"}
          >
            {playing ? <Pause className="size-4" /> : <Play className="size-4 translate-x-px" />}
          </button>
        )}

        {/* The single, rationed water-droplet refraction lens */}
        <DropletLens className="right-7 bottom-7 z-30" size={84} />
      </div>
    </div>
  );
}
