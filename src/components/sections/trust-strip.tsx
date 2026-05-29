import { trustBadges } from "@/lib/site-config";
import { Icon } from "@/lib/icons";
import { Reveal } from "@/components/motion/reveal";

/** The reassurance strip directly under the hero (req #2). */
export function TrustStrip() {
  return (
    <section
      aria-label="Why homeowners trust us"
      className="relative border-y border-chrome-300/50 bg-seaglass/70"
    >
      <div className="container-x py-6 sm:py-7">
        <ul className="grid grid-cols-2 gap-x-6 gap-y-6 sm:grid-cols-3 lg:grid-cols-5">
          {trustBadges.map((b, i) => (
            <li key={b.label}>
              <Reveal variant="fade-up" delay={i * 0.05}>
                <div className="flex items-center gap-3">
                  <span className="glass inline-flex size-11 shrink-0 items-center justify-center rounded-2xl text-tide-600">
                    <Icon name={b.icon} className="size-5" />
                  </span>
                  <span className="flex flex-col leading-tight">
                    <span className="text-sm font-semibold text-navy-900">{b.label}</span>
                    <span className="text-xs text-ink-muted">{b.sub}</span>
                  </span>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
