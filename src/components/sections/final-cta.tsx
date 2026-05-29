import { Phone, MessageSquare } from "lucide-react";

import { site } from "@/lib/site-config";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/motion/reveal";
import { Rosette } from "@/components/brand/rosette";

export function FinalCta() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-navy-800 to-navy-900 py-24 text-white lg:py-28">
      {/* night-window glow + lattice */}
      <div aria-hidden className="pointer-events-none absolute inset-0 opacity-25">
        <div className="absolute left-[15%] top-10 size-24 rounded-md bg-gold-300 blur-3xl" />
        <div className="absolute right-[20%] bottom-10 size-28 rounded-md bg-tide-400 blur-3xl" />
      </div>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)",
          backgroundSize: "150px 150px",
        }}
      />

      <div className="container-x relative">
        <div className="flex flex-col items-center gap-10 lg:flex-row lg:justify-between">
          <div className="max-w-2xl text-center lg:text-left">
            <Reveal variant="fade-up">
              <p className="eyebrow justify-center text-tide-300 lg:justify-start">
                <span className="inline-block h-px w-8 bg-tide-300" />
                Ready when you are
              </p>
            </Reveal>
            <Reveal variant="fade-up" delay={0.06}>
              <h2 className="mt-4 text-[clamp(2.2rem,4.5vw,3.6rem)] font-medium leading-[1.05] text-white">
                Let&rsquo;s get those windows gleaming.
              </h2>
            </Reveal>
            <Reveal variant="fade-up" delay={0.12}>
              <p className="mt-5 text-lg text-white/70">
                Free estimates, friendly service, and a streak-free guarantee. Call, text, or grab a
                quote online — we&rsquo;ll take it from here.
              </p>
            </Reveal>

            <Reveal variant="fade-up" delay={0.18}>
              <a
                href={`tel:${site.phone.tel}`}
                className="mt-7 inline-flex font-display text-4xl font-semibold tracking-tight text-white tnum transition-colors hover:text-gold-300 sm:text-5xl"
              >
                {site.phone.display}
              </a>
            </Reveal>

            <Reveal variant="fade-up" delay={0.24}>
              <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row lg:items-start">
                <a href="#quote" className={cn(buttonVariants({ variant: "gold", size: "xl" }))}>
                  Get a Free Quote
                </a>
                <a
                  href={`tel:${site.phone.tel}`}
                  className={cn(buttonVariants({ variant: "white", size: "xl" }))}
                >
                  <Phone className="size-5" />
                  Call Now
                </a>
                <a
                  href={`sms:${site.phone.tel}`}
                  className={cn(buttonVariants({ variant: "darkGhost", size: "xl" }))}
                >
                  <MessageSquare className="size-5" />
                  Text Us
                </a>
              </div>
            </Reveal>
          </div>

          <Reveal variant="scale-in" delay={0.1}>
            <Rosette tone="dark" size={172} idSuffix="cta" className="hidden shrink-0 lg:block" />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
