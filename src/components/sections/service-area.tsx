import { MapPin } from "lucide-react";

import { serviceAreas, mapEmbedUrl, site } from "@/lib/site-config";
import { Reveal } from "@/components/motion/reveal";

export function ServiceArea() {
  return (
    <section
      id="service-area"
      className="relative scroll-mt-24 border-y border-chrome-300/40 bg-seaglass/60 py-24 lg:py-28"
    >
      <div className="container-x">
        <div className="grid items-center gap-14 lg:grid-cols-2">
          {/* Copy + chips */}
          <div>
            <Reveal variant="fade-up">
              <p className="eyebrow">
                <span className="inline-block h-px w-8 bg-tide-500" />
                Where we work
              </p>
            </Reveal>
            <Reveal variant="fade-up" delay={0.06}>
              <h2 className="mt-4 text-[clamp(2rem,4vw,3rem)] font-medium leading-[1.08]">
                Proudly serving Greater {site.address.locality}.
              </h2>
            </Reveal>
            <Reveal variant="fade-up" delay={0.12}>
              <p className="mt-5 text-lg leading-relaxed text-ink-muted">
                From the river to the suburbs — if you&rsquo;re nearby, we&rsquo;ve got your windows.
                Don&rsquo;t see your neighborhood? Just ask, we likely cover it.
              </p>
            </Reveal>

            <Reveal variant="fade-up" delay={0.18}>
              <ul className="mt-8 flex flex-wrap gap-2.5">
                {serviceAreas.map((area) => (
                  <li
                    key={area}
                    className="inline-flex items-center gap-1.5 rounded-full bg-white/70 px-3.5 py-1.5 text-sm font-medium text-navy-800 ring-1 ring-chrome-300/70 transition-colors hover:bg-white hover:text-tide-700"
                  >
                    <MapPin className="size-3.5 text-tide-500" strokeWidth={2} />
                    {area}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          {/* Map */}
          <Reveal variant="scale-in">
            <div className="relative overflow-hidden rounded-[2rem] shadow-glass-lg ring-1 ring-chrome-300/70">
              {mapEmbedUrl ? (
                <iframe
                  src={mapEmbedUrl}
                  title={`${site.name} service area map`}
                  className="aspect-[4/3] w-full"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
              ) : (
                // Styled placeholder map. TODO: set `mapEmbedUrl` in site-config.ts
                // (Google Maps → Share → Embed a map) to show a live map here.
                <div className="relative grid aspect-[4/3] w-full place-items-center bg-gradient-to-br from-navy-900 via-navy-800 to-tide-600">
                  <div
                    aria-hidden
                    className="absolute inset-0 opacity-15"
                    style={{
                      backgroundImage:
                        "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)",
                      backgroundSize: "40px 40px",
                    }}
                  />
                  {/* radius rings */}
                  <div aria-hidden className="absolute size-72 rounded-full border border-white/15" />
                  <div aria-hidden className="absolute size-48 rounded-full border border-white/20" />
                  <div className="relative flex flex-col items-center text-center">
                    <span className="inline-flex size-14 items-center justify-center rounded-full bg-gold-500 text-navy-900 shadow-lg">
                      <MapPin className="size-7" strokeWidth={2} />
                    </span>
                    <p className="mt-3 font-display text-2xl font-medium text-white">
                      {site.address.locality}, {site.address.region}
                    </p>
                    <p className="text-sm text-white/65">&amp; surrounding communities</p>
                  </div>
                </div>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
