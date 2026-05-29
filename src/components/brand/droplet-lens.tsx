import { cn } from "@/lib/utils";

/**
 * A single water-droplet refraction lens — used ONCE per page as a delight
 * moment (per the design system's "rationed" rule). Pure CSS: a strong
 * backdrop blur + specular highlight reads like a real bead of water on glass.
 * Decorative only.
 */
export function DropletLens({
  className,
  size = 92,
}: {
  className?: string;
  size?: number;
}) {
  return (
    <span
      aria-hidden="true"
      className={cn("pointer-events-none absolute block rounded-full", className)}
      style={{
        width: size,
        height: size,
        WebkitBackdropFilter: "blur(2px) saturate(160%) brightness(1.06)",
        backdropFilter: "blur(2px) saturate(160%) brightness(1.06)",
        boxShadow:
          "inset 0 0 0 1px rgba(255,255,255,0.55), inset 6px 8px 14px rgba(255,255,255,0.45), inset -8px -10px 18px rgba(11,41,66,0.18), 0 10px 24px -10px rgba(11,41,66,0.35)",
        background:
          "radial-gradient(40% 38% at 34% 30%, rgba(255,255,255,0.7), rgba(255,255,255,0) 60%)",
      }}
    />
  );
}
