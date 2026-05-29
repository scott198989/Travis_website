"use client";

import { useState } from "react";
import { Dialog } from "@base-ui/react/dialog";
import { Menu, X, Phone } from "lucide-react";

import { navLinks, site } from "@/lib/site-config";
import { Logo } from "@/components/brand/logo";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/**
 * Accessible mobile navigation built on Base UI Dialog (focus trap, ESC to
 * close, scroll lock handled for us). Controlled so tapping a link closes it.
 */
export function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger
        className="inline-flex size-11 items-center justify-center rounded-full border border-chrome-300 bg-white/70 text-navy-900 backdrop-blur-sm transition-colors hover:bg-white lg:hidden"
        aria-label="Open menu"
      >
        <Menu className="size-5" strokeWidth={1.75} />
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Backdrop className="fixed inset-0 z-[60] bg-navy-900/40 backdrop-blur-sm data-[open]:animate-in data-[open]:fade-in-0 data-[closed]:animate-out data-[closed]:fade-out-0" />
        <Dialog.Popup className="fixed inset-y-0 right-0 z-[70] flex w-[min(88vw,22rem)] flex-col bg-canvas shadow-2xl data-[open]:animate-in data-[open]:slide-in-from-right data-[closed]:animate-out data-[closed]:slide-out-to-right">
          <div className="flex items-center justify-between border-b border-chrome-300/60 px-5 py-4">
            <Logo idSuffix="m" />
            <Dialog.Close
              className="inline-flex size-10 items-center justify-center rounded-full text-navy-900 transition-colors hover:bg-navy-900/5"
              aria-label="Close menu"
            >
              <X className="size-5" />
            </Dialog.Close>
          </div>

          <nav className="flex flex-col gap-1 px-3 py-5" aria-label="Mobile">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-xl px-4 py-3 font-display text-xl text-navy-900 transition-colors hover:bg-seaglass"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="mt-auto flex flex-col gap-3 border-t border-chrome-300/60 p-5">
            <a
              href="#quote"
              onClick={() => setOpen(false)}
              className={cn(buttonVariants({ variant: "gold", size: "lg" }), "w-full")}
            >
              Get a Free Quote
            </a>
            <a
              href={`tel:${site.phone.tel}`}
              className={cn(buttonVariants({ variant: "outline", size: "lg" }), "w-full")}
            >
              <Phone className="size-4" />
              {site.phone.display}
            </a>
            <p className="pt-1 text-center text-sm text-ink-muted">
              Locally owned in {site.address.locality} · Licensed &amp; insured
            </p>
          </div>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
