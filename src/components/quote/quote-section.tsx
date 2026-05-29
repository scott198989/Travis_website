import { Phone, Clock, ShieldCheck, Sparkles } from "lucide-react";

import { site } from "@/lib/site-config";
import { Reveal } from "@/components/motion/reveal";
import { Rosette } from "@/components/brand/rosette";
import { QuoteForm } from "@/components/quote/quote-form";

const perks = [
  { icon: Clock, text: "We reply within one business day" },
  { icon: ShieldCheck, text: "Licensed, insured & background-checked" },
  { icon: Sparkles, text: "Streak-free satisfaction guarantee" },
];

export function QuoteSection() {
  return (
    <section
      id="quote"
      className="relative scroll-mt-24 overflow-hidden bg-gradient-to-b from-seaglass/80 to-canvas py-24 lg:py-28"
    >
      <div aria-hidden className="absolute inset-0 -z-10 mullion-bg opacity-40" />
      <div aria-hidden className="absolute inset-0 -z-10 sun-glow" />

      <div className="container-x">
        <div className="grid items-start gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
          {/* Left: pitch */}
          <div className="lg:sticky lg:top-28">
            <Reveal variant="fade-up">
              <p className="eyebrow">
                <span className="inline-block h-px w-8 bg-tide-500" />
                Free quote
              </p>
            </Reveal>
            <Reveal variant="fade-up" delay={0.06}>
              <h2 className="mt-4 text-[clamp(2rem,4vw,3.1rem)] font-medium leading-[1.07]">
                Let&rsquo;s get those windows{" "}
                <span className="text-tide-600">gleaming.</span>
              </h2>
            </Reveal>
            <Reveal variant="fade-up" delay={0.12}>
              <p className="mt-5 text-lg leading-relaxed text-ink-muted">
                Tell us a little about your property and we&rsquo;ll send a clear, no-pressure
                estimate. It takes about a minute.
              </p>
            </Reveal>

            <Reveal variant="fade-up" delay={0.18}>
              <ul className="mt-7 space-y-3">
                {perks.map(({ icon: Icon, text }) => (
                  <li key={text} className="flex items-center gap-3 text-[0.97rem] text-ink">
                    <span className="inline-flex size-9 shrink-0 items-center justify-center rounded-full bg-tide-100 text-tide-600">
                      <Icon className="size-5" strokeWidth={1.75} />
                    </span>
                    {text}
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal variant="fade-up" delay={0.24}>
              <div className="mt-8 flex items-center gap-5">
                <Rosette size={92} idSuffix="quote" className="hidden shrink-0 sm:block" />
                <div>
                  <p className="text-sm text-ink-muted">Prefer to talk to a person?</p>
                  <a
                    href={`tel:${site.phone.tel}`}
                    className="mt-1 inline-flex items-center gap-2 font-display text-2xl font-semibold text-navy-900 tnum transition-colors hover:text-tide-600"
                  >
                    <Phone className="size-5 text-tide-600" strokeWidth={1.75} />
                    {site.phone.display}
                  </a>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Right: the form */}
          <Reveal variant="fade-up" delay={0.1}>
            <QuoteForm />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
