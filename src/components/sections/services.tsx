import { ArrowRight } from "lucide-react";

import { services, addOns, type Service } from "@/lib/site-config";
import { Icon } from "@/lib/icons";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/sections/section-heading";

function ServiceCard({
  service,
  featured = false,
  tone = "light",
}: {
  service: Service;
  featured?: boolean;
  tone?: "light" | "gold";
}) {
  return (
    <div
      className={cn(
        "group glass-card flex h-full flex-col gap-4 p-6 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-glass-lg sm:p-7",
        featured && "sm:p-8"
      )}
    >
      <span
        className={cn(
          "inline-flex size-12 items-center justify-center rounded-2xl transition-colors",
          tone === "gold"
            ? "bg-gold-200/70 text-gold-600"
            : "bg-tide-100 text-tide-600 group-hover:bg-tide-400 group-hover:text-white"
        )}
      >
        <Icon name={service.icon} className="size-6" />
      </span>

      <div className="flex-1">
        <h3
          className={cn(
            "font-display font-medium text-navy-900",
            featured ? "text-2xl" : "text-xl"
          )}
        >
          {service.title}
        </h3>
        <p className="mt-2.5 text-[0.95rem] leading-relaxed text-ink-muted">
          {service.description}
        </p>
      </div>

      <a
        href="#quote"
        className="inline-flex items-center gap-1.5 text-sm font-semibold text-tide-600 transition-colors hover:text-tide-700"
      >
        Get a quote
        <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
      </a>
    </div>
  );
}

export function Services() {
  const featured = services.filter((s) => s.featured);
  const rest = services.filter((s) => !s.featured);

  return (
    <section id="services" className="relative scroll-mt-24 py-24 lg:py-28">
      <div aria-hidden className="absolute inset-0 -z-10 mullion-bg opacity-40" />
      <div className="container-x">
        <SectionHeading
          eyebrow="What we clean"
          title={
            <>
              Spotless glass, inside and out —{" "}
              <span className="text-tide-600">for homes and businesses.</span>
            </>
          }
          intro="From a single sunroom to a full storefront route, every job gets the same detail: screens out, tracks dug clean, frames wiped, glass left streak-free."
        />

        {/* Featured (most requested) */}
        <div className="mt-14 grid gap-5 lg:grid-cols-2">
          {featured.map((s, i) => (
            <Reveal key={s.slug} variant="fade-up" delay={i * 0.08}>
              <div className="relative">
                <span className="absolute -top-3 left-6 z-10 rounded-full bg-navy-900 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white">
                  Most requested
                </span>
                <ServiceCard service={s} featured />
              </div>
            </Reveal>
          ))}
        </div>

        {/* The rest */}
        <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((s, i) => (
            <Reveal key={s.slug} variant="fade-up" delay={i * 0.06}>
              <ServiceCard service={s} />
            </Reveal>
          ))}
        </div>

        {/* Add-ons */}
        <div className="mt-16">
          <Reveal variant="fade-up">
            <div className="mb-6 flex items-center gap-4">
              <h3 className="font-display text-xl text-navy-900">Popular add-ons</h3>
              <span className="chrome-rule flex-1" />
            </div>
          </Reveal>
          <div className="grid gap-5 sm:grid-cols-2">
            {addOns.map((s, i) => (
              <Reveal key={s.slug} variant="fade-up" delay={i * 0.08}>
                <ServiceCard service={s} tone="gold" />
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
