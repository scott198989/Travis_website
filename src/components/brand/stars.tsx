import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

/** Golden star rating display (whole stars). */
export function Stars({
  rating = 5,
  className,
  size = "size-4",
}: {
  rating?: number;
  className?: string;
  size?: string;
}) {
  const filled = Math.round(rating);
  return (
    <span
      className={cn("inline-flex items-center gap-0.5", className)}
      role="img"
      aria-label={`${rating} out of 5 stars`}
    >
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={cn(
            size,
            i < filled ? "fill-gold-500 text-gold-500" : "fill-chrome-300/40 text-chrome-300"
          )}
          aria-hidden="true"
        />
      ))}
    </span>
  );
}
