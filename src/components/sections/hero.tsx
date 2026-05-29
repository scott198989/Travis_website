import { Phone, ShieldCheck, BadgeDollarSign } from "lucide-react";

import { site } from "@/lib/site-config";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Stars } from "@/components/brand/stars";
import { Rosette } from "@/components/brand/rosette";
import { HeroVideo } from "@/components/sections/hero-video";
import { HeroBackdropLazy } from "@/components/sections/hero-backdrop-lazy";

/**
 * Hero. The above-the-fold copy is rendered statically (instantly visible — no
 * scroll-reveal gating) so it's the LCP element and never flashes blank. Motion
 * is reserved for the video aperture (a subtle settle) and for below-the-fold
 * sections that animate in on scroll.
 */
export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-28 pb-24 sm:pt-32 lg:pb-32">
      {/* Background layers */}
      <div aria-hidden className="absolute inset-0 -z-10 mullion-bg opacity-70" />
      <div aria-hidden className="absolute inset-0 -z-10 sun-glow" />
      <HeroBackdropLazy />

      <div className="container-x relative grid items-center gap-14 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
        {/* Left: copy */}
        <div className="relative z-10 max-w-xl">
          <p className="eyebrow">
            <span className="inline-block h-px w-8 bg-tide-500" />
            {site.address.locality}&rsquo;s Window Cleaning Specialists
          </p>

          <h1 className="mt-5 text-[clamp(2.6rem,6vw,4.6rem)] font-medium leading-[1.02]">
            Windows so clean,
            <span className="relative whitespace-nowrap text-tide-600"> the glass</span> disappears.
          </h1>

          <p className="mt-6 max-w-md text-lg leading-relaxed text-ink">
            Spotless, streak-free windows for {site.address.locality} homes and businesses.
            Reliable, fully insured, locally owned — and guaranteed. We show up on time and treat
            your property like our own.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <a href="#quote" className={cn(buttonVariants({ variant: "gold", size: "xl" }))}>
              Get a Free Quote
            </a>
            <a
              href={`tel:${site.phone.tel}`}
              className={cn(buttonVariants({ variant: "outline", size: "xl" }))}
            >
              <Phone className="size-5 text-tide-600" strokeWidth={1.75} />
              Call {site.phone.display}
            </a>
          </div>

          <div className="mt-9 flex items-center gap-5">
            <Rosette size={92} idSuffix="hero" className="hidden shrink-0 sm:block" />
            <div className="space-y-2.5">
              <div className="flex items-center gap-2">
                <Stars rating={site.stats.googleRating} />
                <span className="text-sm font-medium text-ink">
                  <span className="font-semibold text-navy-900 tnum">
                    {site.stats.googleRating.toFixed(1)}
                  </span>{" "}
                  from {site.stats.reviewCount}+ local reviews
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-x-5 gap-y-1.5 text-sm text-ink-muted">
                <span className="inline-flex items-center gap-1.5">
                  <ShieldCheck className="size-4 text-tide-600" strokeWidth={1.75} />
                  Licensed &amp; insured
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <BadgeDollarSign className="size-4 text-tide-600" strokeWidth={1.75} />
                  Free, no-pressure estimates
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right: chrome-mullion video aperture */}
        <div className="relative z-10">
          <HeroVideo />
        </div>
      </div>
    </section>
  );
}
