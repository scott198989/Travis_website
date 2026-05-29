import { Phone } from "lucide-react";

import { faqs, site } from "@/lib/site-config";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Reveal } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/sections/section-heading";

export function Faq() {
  return (
    <section id="faq" className="relative scroll-mt-24 py-24 lg:py-28">
      <div className="container-x">
        <SectionHeading
          eyebrow="Good to know"
          title="Questions, answered."
          intro="Everything you might be wondering before you book. Still curious? We're a quick call away."
        />

        <div className="mx-auto mt-12 max-w-3xl">
          <Reveal variant="fade-up">
            <div className="glass-card px-6 sm:px-8">
              <Accordion multiple={false}>
                {faqs.map((f, i) => (
                  <AccordionItem key={f.q} value={`item-${i}`}>
                    <AccordionTrigger className="py-5 font-display text-lg text-navy-900 hover:no-underline">
                      {f.q}
                    </AccordionTrigger>
                    <AccordionContent className="pb-5 text-[0.97rem] leading-relaxed text-ink-muted">
                      {f.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </Reveal>

          <Reveal variant="fade-up" delay={0.1}>
            <p className="mt-8 text-center text-ink-muted">
              Still have a question?{" "}
              <a
                href={`tel:${site.phone.tel}`}
                className="inline-flex items-center gap-1.5 font-semibold text-tide-600 hover:text-tide-700"
              >
                <Phone className="size-4" />
                Call {site.phone.display}
              </a>
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
