"use client";

import { useEffect, useState } from "react";
import { Phone } from "lucide-react";

import { navLinks, site } from "@/lib/site-config";
import { Logo } from "@/components/brand/logo";
import { MobileNav } from "@/components/layout/mobile-nav";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/**
 * Sticky header: transparent over the hero, then condenses into a frosted
 * "Sea Glass" bar once you scroll. Tap-to-call + persistent golden quote CTA.
 */
export function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "glass border-b border-chrome-300/50 shadow-[0_8px_30px_-18px_rgba(11,41,66,0.4)]"
          : "border-b border-transparent bg-transparent"
      )}
    >
      <div
        className={cn(
          "container-x flex items-center justify-between transition-all duration-300",
          scrolled ? "h-16" : "h-20"
        )}
      >
        <a href="#top" aria-label={`${site.name} — home`} className="rounded-lg">
          <Logo idSuffix="h" />
        </a>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-full px-3.5 py-2 text-sm font-medium text-navy-800 transition-colors hover:bg-navy-900/[0.06] hover:text-navy-900"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2.5">
          <a
            href={`tel:${site.phone.tel}`}
            className="hidden items-center gap-2 rounded-full px-3.5 py-2 text-sm font-semibold text-navy-900 transition-colors hover:bg-navy-900/[0.06] sm:inline-flex"
          >
            <Phone className="size-4 text-tide-600" strokeWidth={1.75} />
            <span className="tnum">{site.phone.display}</span>
          </a>

          <a
            href="#quote"
            className={cn(buttonVariants({ variant: "gold", size: "default" }), "hidden sm:inline-flex")}
          >
            Get a Free Quote
          </a>

          <MobileNav />
        </div>
      </div>
    </header>
  );
}
