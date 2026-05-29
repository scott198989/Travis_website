import { site } from "@/lib/site-config";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/motion/reveal";
import { CountUp } from "@/components/brand/count-up";
import { ShowcaseComparator } from "@/components/sections/showcase-video";

export function Showcase() {
  return (
    <section
      id="showcase"
      className="relative scroll-mt-24 overflow-hidden bg-gradient-to-b from-navy-900 to-navy-800 py-24 text-white lg:py-28"
    >
      {/* faint windowpane lattice + gold dusk glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)",
          backgroundSize: "150px 150px",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-32 top-0 size-[28rem] rounded-full opacity-50 blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(242,169,59,0.35), transparent 70%)" }}
      />

      <div className="container-x relative">
        <div className="max-w-2xl">
          <Reveal variant="fade-up">
            <p className="eyebrow text-tide-300">
              <span className="inline-block h-px w-8 bg-tide-300" />
              Our work in motion
            </p>
          </Reveal>
          <Reveal variant="fade-up" delay={0.06}>
            <h2 className="mt-4 text-[clamp(2rem,4vw,3.1rem)] font-medium leading-[1.07] text-white">
              See the difference a real clean makes.
            </h2>
          </Reveal>
          <Reveal variant="fade-up" delay={0.12}>
            <p className="mt-5 text-lg leading-relaxed text-white/70">
              Drag the squeegee across to wipe away the grime. This is the clarity your windows
              are hiding under months of dust, pollen, and water spots.
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid items-center gap-12 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]">
          <Reveal variant="scale-in">
            <ShowcaseComparator />
          </Reveal>

          <div className="grid grid-cols-3 gap-6 lg:grid-cols-1 lg:gap-8">
            {[
              { to: site.stats.yearsInBusiness, suffix: "+", label: "Years serving Cincinnati", decimals: 0 },
              { to: site.stats.homesCleaned, suffix: "+", label: "Homes & businesses cleaned", decimals: 0 },
              { to: site.stats.googleRating, suffix: "★", label: "Average Google rating", decimals: 1 },
            ].map((s, i) => (
              <Reveal key={s.label} variant="fade-up" delay={i * 0.1}>
                <div className="border-l-2 border-gold-500/60 pl-4 lg:pl-5">
                  <div className="font-display text-[clamp(2.4rem,5vw,3.6rem)] font-semibold leading-none text-gold-300">
                    <CountUp to={s.to} suffix={s.suffix} decimals={s.decimals} />
                  </div>
                  <p className="mt-2 text-sm text-white/65">{s.label}</p>
                </div>
              </Reveal>
            ))}

            <Reveal variant="fade-up" delay={0.3}>
              <a
                href="#quote"
                className={cn(buttonVariants({ variant: "gold", size: "lg" }), "mt-2 hidden lg:inline-flex")}
              >
                Get your free quote
              </a>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
