import { processSteps } from "@/lib/site-config";
import { Icon } from "@/lib/icons";
import { Reveal } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/sections/section-heading";

/** "How a Crystal Clear visit works" — reinforces reliability + craft. */
export function Process() {
  return (
    <section className="relative scroll-mt-24 border-y border-chrome-300/40 bg-seaglass/60 py-24 lg:py-28">
      <div className="container-x">
        <SectionHeading
          eyebrow="How it works"
          title="Easy to book. A pleasure to have around."
          intro="No chasing quotes, no surprise charges, no mess left behind. Here's exactly what to expect."
        />

        <ol className="mt-16 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {processSteps.map((step, i) => (
            <li key={step.title}>
              <Reveal variant="fade-up" delay={i * 0.08}>
                <div className="relative">
                  {/* connector line (desktop) */}
                  {i < processSteps.length - 1 && (
                    <span
                      aria-hidden
                      className="absolute left-14 top-7 hidden h-px w-[calc(100%-2rem)] bg-gradient-to-r from-chrome-300 to-transparent lg:block"
                    />
                  )}
                  <div className="flex items-center gap-4">
                    <span className="glass relative inline-flex size-14 shrink-0 items-center justify-center rounded-2xl text-tide-600">
                      <Icon name={step.icon} className="size-6" />
                      <span className="absolute -right-1.5 -top-1.5 inline-flex size-6 items-center justify-center rounded-full bg-navy-900 font-display text-xs font-semibold text-white tnum">
                        {i + 1}
                      </span>
                    </span>
                  </div>
                  <h3 className="mt-5 font-display text-xl font-medium text-navy-900">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-[0.95rem] leading-relaxed text-ink-muted">
                    {step.description}
                  </p>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
