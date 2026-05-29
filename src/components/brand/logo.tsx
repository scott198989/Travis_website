import { cn } from "@/lib/utils";
import { site } from "@/lib/site-config";

/**
 * Brand logo = a chrome-gradient windowpane mark + the Fraunces wordmark.
 * `tone="dark"` is for placing on the navy footer. `idSuffix` keeps SVG
 * gradient ids unique when the logo appears more than once on a page.
 */
export function Logo({
  className,
  tone = "light",
  idSuffix = "a",
  showWordmark = true,
}: {
  className?: string;
  tone?: "light" | "dark";
  idSuffix?: string;
  showWordmark?: boolean;
}) {
  const chromeId = `cc-chrome-${idSuffix}`;
  const glassId = `cc-glass-${idSuffix}`;
  const wordColor = tone === "dark" ? "text-white" : "text-navy-900";
  const subColor = tone === "dark" ? "text-tide-300" : "text-tide-600";

  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <svg
        viewBox="0 0 40 40"
        width="38"
        height="38"
        className="shrink-0 drop-shadow-[0_2px_6px_rgba(11,41,66,0.18)]"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id={chromeId} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#EAEFF3" />
            <stop offset="0.5" stopColor="#C2CCD4" />
            <stop offset="1" stopColor="#94A3B0" />
          </linearGradient>
          <linearGradient id={glassId} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#DCEEF8" />
            <stop offset="1" stopColor="#7FC1E6" />
          </linearGradient>
        </defs>
        {/* frame */}
        <rect x="3" y="3" width="34" height="34" rx="9" fill={`url(#${glassId})`} />
        <rect
          x="3"
          y="3"
          width="34"
          height="34"
          rx="9"
          fill="none"
          stroke={`url(#${chromeId})`}
          strokeWidth="2"
        />
        {/* mullions */}
        <path d="M20 5 V35 M5 20 H35" stroke="#ffffff" strokeWidth="2" opacity="0.85" />
        {/* diagonal light streak */}
        <path d="M9 28 L26 9" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" opacity="0.65" />
        {/* golden sun glint */}
        <circle cx="29.5" cy="11" r="2.4" fill="#F2A93B" />
      </svg>

      {showWordmark && (
        <span className="flex flex-col leading-none">
          <span className={cn("font-display text-[1.15rem] font-semibold tracking-tight", wordColor)}>
            {site.shortName}
          </span>
          <span className={cn("text-[0.62rem] font-semibold uppercase tracking-[0.2em]", subColor)}>
            Window Cleaning
          </span>
        </span>
      )}
    </span>
  );
}
