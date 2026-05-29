import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

/**
 * Customized off the default shadcn/Base UI button for the "Crisp Coastal
 * Chrome" system. Pill shaped, marketing-scale sizes, and brand variants:
 *  - `gold`  → the single rationed primary CTA (breathing glow + specular sweep)
 *  - `navy`  → confident secondary
 *  - `glass` / `outline` → frosted, chrome-edged
 *  - `white` / `darkGhost` → for use on the navy "night window" surfaces
 *
 * `buttonVariants` is exported so anchors (tel:, #quote) can adopt the look
 * without shipping a client component.
 */
const buttonVariants = cva(
  "group/button relative inline-flex shrink-0 items-center justify-center gap-2 rounded-full font-semibold whitespace-nowrap transition-all outline-none select-none focus-visible:ring-[3px] focus-visible:ring-tide-400/55 focus-visible:ring-offset-2 focus-visible:ring-offset-canvas active:translate-y-px disabled:pointer-events-none disabled:opacity-60 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-[1.15em]",
  {
    variants: {
      variant: {
        gold: "cta-gold",
        navy: "bg-navy-900 text-white shadow-[0_12px_30px_-14px_rgba(11,41,66,0.65)] hover:bg-navy-800 hover:shadow-[0_16px_36px_-14px_rgba(11,41,66,0.7)]",
        glass: "glass text-navy-900 hover:bg-white/85",
        outline:
          "border border-chrome-300 bg-white/70 text-navy-900 backdrop-blur-sm hover:border-tide-400 hover:bg-white",
        ghost: "text-navy-900 hover:bg-navy-900/[0.06]",
        white: "bg-white text-navy-900 shadow-md hover:bg-white/90",
        darkGhost: "border border-white/25 text-white/90 hover:border-white/50 hover:bg-white/10",
        link: "h-auto rounded-none px-0 font-semibold text-tide-600 underline-offset-4 hover:underline",
      },
      size: {
        sm: "h-9 px-4 text-sm",
        default: "h-11 px-6 text-[0.95rem]",
        lg: "h-[3.25rem] px-7 text-base",
        xl: "h-[3.6rem] px-8 text-[1.05rem]",
        icon: "size-11",
      },
    },
    defaultVariants: {
      variant: "navy",
      size: "default",
    },
  }
)

function Button({
  className,
  variant,
  size,
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
