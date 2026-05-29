import { cn } from "@/lib/utils";
import { site } from "@/lib/site-config";

/**
 * Sign-painter "Est." rosette — a circular seal with arced text that carries
 * the family-trust warmth. Rendered as inline SVG with a <textPath>.
 */
export function Rosette({
  className,
  size = 132,
  tone = "light",
  idSuffix = "a",
}: {
  className?: string;
  size?: number;
  tone?: "light" | "dark";
  idSuffix?: string;
}) {
  const topId = `rosette-top-${idSuffix}`;
  const bottomId = `rosette-bottom-${idSuffix}`;
  const ring = tone === "dark" ? "#C2CCD4" : "#0B2942";
  const text = tone === "dark" ? "#FCE2B0" : "#0B2942";
  const accent = "#F2A93B";

  return (
    <svg
      viewBox="0 0 200 200"
      width={size}
      height={size}
      className={cn("select-none", className)}
      role="img"
      aria-label={`Family owned, licensed and insured, established ${site.establishedYear}`}
    >
      <defs>
        <path id={topId} d="M 30 100 A 70 70 0 0 1 170 100" fill="none" />
        <path id={bottomId} d="M 38 100 A 62 62 0 0 0 162 100" fill="none" />
      </defs>

      {/* rings */}
      <circle cx="100" cy="100" r="92" fill="none" stroke={ring} strokeWidth="1.5" opacity="0.5" />
      <circle cx="100" cy="100" r="84" fill="none" stroke={ring} strokeWidth="3" />
      <circle cx="100" cy="100" r="62" fill="none" stroke={ring} strokeWidth="1" opacity="0.45" />

      {/* arced text */}
      <text
        fill={text}
        style={{ fontFamily: "var(--font-fraunces), Georgia, serif", fontSize: "16px", fontWeight: 600, letterSpacing: "3px" }}
      >
        <textPath href={`#${topId}`} startOffset="50%" textAnchor="middle">
          FAMILY OWNED
        </textPath>
      </text>
      <text
        fill={text}
        style={{ fontFamily: "var(--font-fraunces), Georgia, serif", fontSize: "13px", fontWeight: 600, letterSpacing: "2px" }}
      >
        <textPath href={`#${bottomId}`} startOffset="50%" textAnchor="middle">
          LICENSED &amp; INSURED
        </textPath>
      </text>

      {/* center mark */}
      <text
        x="100"
        y="90"
        textAnchor="middle"
        fill={text}
        style={{ fontFamily: "var(--font-fraunces), Georgia, serif", fontSize: "15px", fontWeight: 500, letterSpacing: "2px" }}
      >
        EST.
      </text>
      <text
        x="100"
        y="124"
        textAnchor="middle"
        fill={accent}
        style={{ fontFamily: "var(--font-fraunces), Georgia, serif", fontSize: "34px", fontWeight: 600 }}
      >
        {site.establishedYear}
      </text>

      {/* side stars */}
      <text x="30" y="106" textAnchor="middle" fill={accent} style={{ fontSize: "14px" }}>★</text>
      <text x="170" y="106" textAnchor="middle" fill={accent} style={{ fontSize: "14px" }}>★</text>
    </svg>
  );
}
