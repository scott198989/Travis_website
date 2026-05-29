import { cn } from "@/lib/utils";
import { Reveal } from "@/components/motion/reveal";

/** Shared eyebrow + headline + intro block used across sections. */
export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "center",
  className,
}: {
  eyebrow: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
  align?: "center" | "left";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" ? "mx-auto text-center" : "text-left",
        className
      )}
    >
      <Reveal variant="fade-up">
        <p className={cn("eyebrow", align === "center" && "justify-center")}>
          <span className="inline-block h-px w-8 bg-tide-500" />
          {eyebrow}
        </p>
      </Reveal>
      <Reveal variant="fade-up" delay={0.06}>
        <h2 className="mt-4 text-[clamp(2rem,4vw,3.1rem)] font-medium leading-[1.07]">
          {title}
        </h2>
      </Reveal>
      {intro && (
        <Reveal variant="fade-up" delay={0.12}>
          <p className="mt-5 text-lg leading-relaxed text-ink-muted">{intro}</p>
        </Reveal>
      )}
    </div>
  );
}
