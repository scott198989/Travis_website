import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { Logo } from "@/components/brand/logo";
import { site } from "@/lib/site-config";
import { cn } from "@/lib/utils";

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-6 text-center">
      <Logo idSuffix="nf" />
      <p className="mt-8 font-display text-7xl font-semibold text-tide-600">404</p>
      <h1 className="mt-2 font-display text-3xl font-medium text-navy-900">
        This page is crystal clear&hellip; clearly not here.
      </h1>
      <p className="mt-3 max-w-md text-ink-muted">
        The page you&rsquo;re looking for moved or never existed. Let&rsquo;s get you back to
        spotless windows.
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Link href="/" className={cn(buttonVariants({ variant: "gold", size: "lg" }))}>
          Back home
        </Link>
        <a href={`tel:${site.phone.tel}`} className={cn(buttonVariants({ variant: "outline", size: "lg" }))}>
          Call {site.phone.display}
        </a>
      </div>
    </div>
  );
}
