import { Quote } from "lucide-react";

import { testimonials, site } from "@/lib/site-config";
import { Reveal } from "@/components/motion/reveal";
import { Stars } from "@/components/brand/stars";
import { SectionHeading } from "@/components/sections/section-heading";

/**
 * Reviews (req #6).
 *
 * TODO: replace the placeholder reviews in site-config.ts with REAL ones. To
 * embed live Google reviews later, swap this grid for your Google reviews
 * widget — keep the surrounding section + heading. Ensure the aggregateRating
 * in the JSON-LD (site.stats) matches your real Google rating/# of reviews.
 */
export function Testimonials() {
  return (
    <section
      id="reviews"
      className="relative scroll-mt-24 overflow-hidden border-y border-chrome-300/40 bg-seaglass/70 py-24 lg:py-28"
    >
      <div aria-hidden className="absolute inset-0 -z-10 sun-glow opacity-80" />

      <div className="container-x">
        <SectionHeading
          eyebrow="Loved by neighbors"
          title="Cincinnati keeps coming back to us."
          intro={
            <>
              A{" "}
              <span className="font-semibold text-navy-900 tnum">
                {site.stats.googleRating.toFixed(1)}
              </span>
              -star average across{" "}
              <span className="font-semibold text-navy-900 tnum">{site.stats.reviewCount}+</span>{" "}
              reviews — and counting.
            </>
          }
        />

        <div className="mt-6 flex justify-center">
          <Reveal variant="fade-up" delay={0.1}>
            <div className="inline-flex items-center gap-3 rounded-full bg-white/70 px-5 py-2.5 ring-1 ring-chrome-300/70 backdrop-blur-sm">
              <Stars rating={site.stats.googleRating} size="size-5" />
              <span className="text-sm font-medium text-navy-900">
                Rated {site.stats.googleRating.toFixed(1)} on Google
              </span>
            </div>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t, i) => (
            <Reveal key={t.name + i} variant="fade-up" delay={(i % 3) * 0.08}>
              <figure className="glass-card flex h-full flex-col p-6 sm:p-7">
                <Quote className="size-8 text-tide-400/60" aria-hidden />
                <Stars rating={t.rating} className="mt-3" />
                <blockquote className="mt-4 flex-1 text-[0.98rem] leading-relaxed text-ink">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-5 flex items-center gap-3 border-t border-chrome-300/50 pt-4">
                  <span className="inline-flex size-10 items-center justify-center rounded-full bg-navy-900 font-display text-sm font-semibold text-white">
                    {t.name.charAt(0)}
                  </span>
                  <span className="flex flex-col leading-tight">
                    <span className="text-sm font-semibold text-navy-900">{t.name}</span>
                    <span className="text-xs text-ink-muted">
                      {t.location}
                      {t.date ? ` · ${t.date}` : ""}
                    </span>
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
