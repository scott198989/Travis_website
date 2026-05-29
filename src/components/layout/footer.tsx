import { Mail, MapPin } from "lucide-react";

import { site, navLinks, services, serviceAreas } from "@/lib/site-config";
import { Logo } from "@/components/brand/logo";
import { Rosette } from "@/components/brand/rosette";

const year = 2026; // TODO: keep current; or render with new Date().getFullYear() in a client island

export function Footer() {
  const socials = [
    { href: site.social.facebook, label: "Facebook" },
    { href: site.social.instagram, label: "Instagram" },
    { href: site.social.google, label: "Google" },
    { href: site.social.yelp, label: "Yelp" },
  ].filter((s) => s.href && s.href !== "#");

  return (
    <footer className="relative overflow-hidden bg-navy-900 text-white/75">
      {/* chrome reflection line */}
      <div className="chrome-rule opacity-50" />

      {/* faint warm "interior lights" + windowpane lattice */}
      <div aria-hidden className="pointer-events-none absolute inset-0 opacity-[0.18]">
        <div className="absolute left-[12%] top-12 size-16 rounded-md bg-gold-200 blur-2xl" />
        <div className="absolute right-[18%] top-24 size-20 rounded-md bg-gold-300 blur-3xl" />
        <div className="absolute bottom-16 left-[40%] size-14 rounded-md bg-tide-300 blur-2xl" />
      </div>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)",
          backgroundSize: "160px 160px",
        }}
      />

      <div className="container-x relative py-16">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1.1fr]">
          {/* Brand + big phone */}
          <div>
            <Logo tone="dark" idSuffix="f" />
            <p className="mt-5 max-w-xs text-[0.95rem] leading-relaxed text-white/70">
              {site.tagline} Family-owned, spotless results for {site.address.locality} homes and
              businesses.
            </p>
            <a
              href={`tel:${site.phone.tel}`}
              className="mt-6 inline-flex font-display text-3xl font-semibold tracking-tight text-white tnum transition-colors hover:text-gold-300"
            >
              {site.phone.display}
            </a>
            <div className="mt-4 space-y-2 text-sm">
              <a href={`mailto:${site.email}`} className="flex items-center gap-2.5 text-white/70 transition-colors hover:text-white">
                <Mail className="size-4 text-tide-300" strokeWidth={1.75} />
                {site.email}
              </a>
              <p className="flex items-start gap-2.5 text-white/70">
                <MapPin className="mt-0.5 size-4 shrink-0 text-tide-300" strokeWidth={1.75} />
                <span>
                  {site.address.locality}, {site.address.region} · Serving Greater Cincinnati
                </span>
              </p>
            </div>
          </div>

          {/* Quick links */}
          <nav aria-label="Footer">
            <h2 className="font-display text-lg text-white">Explore</h2>
            <ul className="mt-4 space-y-2.5 text-sm">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="text-white/70 transition-colors hover:text-white">
                    {l.label}
                  </a>
                </li>
              ))}
              <li>
                <a href="#quote" className="font-semibold text-gold-300 transition-colors hover:text-gold-200">
                  Get a Free Quote
                </a>
              </li>
            </ul>
          </nav>

          {/* Services */}
          <div>
            <h2 className="font-display text-lg text-white">Services</h2>
            <ul className="mt-4 space-y-2.5 text-sm">
              {services.slice(0, 6).map((s) => (
                <li key={s.slug}>
                  <a href="#services" className="text-white/70 transition-colors hover:text-white">
                    {s.title.replace(" Window Cleaning", "")}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Hours + rosette + social */}
          <div>
            <h2 className="font-display text-lg text-white">Hours</h2>
            <ul className="mt-4 space-y-1.5 text-sm text-white/70">
              {site.hours.map((h) => (
                <li key={h.days} className="flex justify-between gap-4">
                  <span>{h.days}</span>
                  <span className="tnum text-white/90">{h.time}</span>
                </li>
              ))}
            </ul>

            <div className="mt-6 flex items-center gap-4">
              <Rosette tone="dark" size={84} idSuffix="footer" />
              {socials.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {socials.map(({ href, label }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center rounded-full border border-white/20 px-3 py-1.5 text-xs font-medium text-white/80 transition-colors hover:border-white/50 hover:text-white"
                    >
                      {label}
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Service-area ribbon */}
        <div className="mt-12 border-t border-white/10 pt-6">
          <p className="text-xs uppercase tracking-[0.14em] text-tide-300">Proudly serving</p>
          <p className="mt-2 text-sm text-white/60">{serviceAreas.join(" · ")}</p>
        </div>

        {/* Bottom bar */}
        <div className="mt-8 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-xs text-white/55 sm:flex-row">
          <p>
            © {year} {site.name}. All rights reserved.
          </p>
          <p>
            Licensed &amp; insured · {site.address.locality}, {site.address.regionName}
          </p>
        </div>
      </div>
    </footer>
  );
}
