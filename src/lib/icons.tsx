/**
 * Typed Lucide icon resolver.
 *
 * site-config.ts references icons by string name so non-developers can edit
 * content safely. We import each icon explicitly here (keeps tree-shaking) and
 * map the names. <Icon name="Home" /> renders the right glyph.
 */
import {
  AlignHorizontalDistributeCenter,
  ArrowRight,
  BadgeDollarSign,
  Building2,
  CalendarCheck,
  Check,
  ClipboardList,
  Clock,
  Droplets,
  Grid3x3,
  Home,
  Leaf,
  Mail,
  MapPin,
  PanelsTopLeft,
  Phone,
  Ruler,
  ShieldCheck,
  Sparkles,
  Star,
  Store,
  Sun,
  ThumbsUp,
  Waves,
  type LucideIcon,
} from "lucide-react";

const ICON_MAP = {
  AlignHorizontalDistributeCenter,
  ArrowRight,
  BadgeDollarSign,
  Building2,
  CalendarCheck,
  Check,
  ClipboardList,
  Clock,
  Droplets,
  Grid3x3,
  Home,
  Leaf,
  Mail,
  MapPin,
  PanelsTopLeft,
  Phone,
  Ruler,
  ShieldCheck,
  Sparkles,
  Star,
  Store,
  Sun,
  ThumbsUp,
  Waves,
} satisfies Record<string, LucideIcon>;

export type IconName = keyof typeof ICON_MAP;

export function Icon({
  name,
  className,
  strokeWidth = 1.5,
  "aria-hidden": ariaHidden = true,
}: {
  name: string;
  className?: string;
  strokeWidth?: number;
  "aria-hidden"?: boolean;
}) {
  const Cmp = ICON_MAP[name as IconName];
  if (!Cmp) return null;
  return <Cmp className={className} strokeWidth={strokeWidth} aria-hidden={ariaHidden} />;
}
