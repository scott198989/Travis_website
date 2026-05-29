import { Check } from "lucide-react";

import { site } from "@/lib/site-config";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/motion/reveal";
import { Rosette } from "@/components/brand/rosette";

const values = [
  "We show up in the window we promised — on time, every time.",
  "Booties on, screens out, sills wiped. Your home leaves cleaner than we found it.",
  "Fully licensed and insured, so you're never the one taking a risk.",
  "If a single pane isn't perfect, we come back. That's the guarantee.",
];

export function About() {
  return (
    <section id="about" className="relative scroll-mt-24 py-24 lg:py-28">
      <div className="container-x">
        <div className="grid items-center gap-14 lg:grid-cols-2">
          {/* Photo slot */}
          <Reveal variant="scale-in">
            <div className="relative mx-auto max-w-md">
              {/* TODO: replace this placeholder with a real owner/family photo:
                  <Image src="/images/owner.jpg" alt="..." fill className="object-cover" /> */}
              <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-gradient-to-br from-navy-800 via-tide-600 to-tide-400 shadow-glass-lg ring-1 ring-white/30">
                <div
                  aria-hidden
                  className="absolute inset-0 opacity-15"
                  style={{
                    backgroundImage:
                      "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)",
                    backgroundSize: "48px 48px",
                  }}
                />
                <div className="absolute inset-0 flex items-end p-7">
                  <p className="font-display text-2xl font-medium text-white/90">
                    The family behind the&nbsp;shine.
                  </p>
                </div>
              </div>
              {/* rosette "stamp" overlapping the corner */}
              <div className="absolute -bottom-7 -right-5 rounded-full bg-canvas p-2 shadow-glass">
                <Rosette size={108} idSuffix="about" />
              </div>
            </div>
          </Reveal>

          {/* Story */}
          <div>
            <Reveal variant="fade-up">
              <p className="eyebrow">
                <span className="inline-block h-px w-8 bg-tide-500" />
                Our story
              </p>
            </Reveal>
            <Reveal variant="fade-up" delay={0.06}>
              <h2 className="mt-4 text-[clamp(2rem,4vw,3rem)] font-medium leading-[1.08]">
                A family business built on{" "}
                <span className="text-tide-600">trust and clean glass.</span>
              </h2>
            </Reveal>
            <Reveal variant="fade-up" delay={0.12}>
              <div className="mt-5 space-y-4 text-lg leading-relaxed text-ink">
                <p>
                  {site.name} started with a simple idea: treat every home and business like it&rsquo;s
                  our own. We&rsquo;re locally owned right here in {site.address.locality}, and the same
                  people you talk to are the ones who show up at your door.
                </p>
                <p>
                  No call centers, no rushed crews, no cutting corners. Just careful, friendly pros
                  who take pride in the details most companies skip — and windows so clear you&rsquo;ll
                  forget they&rsquo;re there.
                </p>
              </div>
            </Reveal>

            <Reveal variant="fade-up" delay={0.18}>
              <ul className="mt-7 space-y-3">
                {values.map((v) => (
                  <li key={v} className="flex items-start gap-3 text-[0.97rem] text-ink">
                    <span className="mt-0.5 inline-flex size-6 shrink-0 items-center justify-center rounded-full bg-tide-100 text-tide-600">
                      <Check className="size-4" strokeWidth={2.5} />
                    </span>
                    {v}
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal variant="fade-up" delay={0.24}>
              <a href="#quote" className={cn(buttonVariants({ variant: "navy", size: "lg" }), "mt-9")}>
                Meet the team — get your quote
              </a>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
