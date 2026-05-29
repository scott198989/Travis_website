"use client";

import { useEffect } from "react";
import { buttonVariants } from "@/components/ui/button";
import { site } from "@/lib/site-config";
import { cn } from "@/lib/utils";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-6 text-center">
      <h1 className="font-display text-3xl font-medium text-navy-900">
        Something streaked the glass.
      </h1>
      <p className="mt-3 max-w-md text-ink-muted">
        Sorry — an unexpected error occurred. Try again, or give us a call and we&rsquo;ll help you
        right away.
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <button onClick={reset} className={cn(buttonVariants({ variant: "gold", size: "lg" }))}>
          Try again
        </button>
        <a href={`tel:${site.phone.tel}`} className={cn(buttonVariants({ variant: "outline", size: "lg" }))}>
          Call {site.phone.display}
        </a>
      </div>
    </div>
  );
}
