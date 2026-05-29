/**
 * ============================================================================
 *  SITE CONFIG — SINGLE SOURCE OF TRUTH
 * ============================================================================
 *  Edit THIS file to update the whole website. Everything the family needs to
 *  change (business name, phone, email, service areas, reviews, services,
 *  FAQs, hours, socials) lives here so you never have to dig through code.
 *
 *  👉 Search this file for "TODO" to find every value that should be replaced
 *     with real business information before launch.
 * ============================================================================
 */

export const site = {
  /** Business / brand name shown everywhere. */
  name: "Crystal Clear Window Cleaning",
  /** Short name for tight spaces (logo, mobile). */
  shortName: "Crystal Clear",
  /** One-line positioning used in the hero + meta description. */
  tagline: "Glass so clean, it disappears.",
  /** Longer descriptor for SEO + Open Graph. */
  description:
    "Cincinnati's family-owned window cleaning company for spotless residential & commercial glass. Licensed, insured, and locally trusted. Free estimates — streak-free, guaranteed.",

  // TODO: Replace with the real business phone number.
  // `tel` is the digits-only version used in tel: links; `display` is shown to users.
  phone: {
    tel: "+15135550199",
    display: "(513) 555-0199",
  },

  // TODO: Replace with the real contact email.
  email: "hello@crystalclearcincy.com",

  // TODO: Replace with the real business address (used for local SEO + maps).
  // If the business is mobile-only (no storefront), you can keep the city/region
  // and remove `street` — the JSON-LD will still describe the service area.
  address: {
    street: "123 Clearview Ave",
    locality: "Cincinnati",
    region: "OH",
    regionName: "Ohio",
    postalCode: "45202",
    country: "US",
  },

  // Approximate geo-coordinates of the service hub (Cincinnati downtown).
  // TODO: Adjust to your actual base location for better local SEO.
  geo: { lat: 39.1031, lng: -84.512 },

  /** Year the business was established — shown on the sign-painter rosette. */
  // TODO: Replace with the real founding year.
  establishedYear: 2009,

  /** Website canonical URL (no trailing slash). */
  // TODO: Replace with the real production domain once deployed.
  url: "https://www.crystalclearcincy.com",

  /** Typical price range indicator for LocalBusiness schema ($, $$, $$$). */
  priceRange: "$$",

  /** Business hours — used for display + JSON-LD openingHours. */
  hours: [
    { days: "Mon – Fri", time: "8:00 AM – 6:00 PM", dow: ["Mo", "Tu", "We", "Th", "Fr"], open: "08:00", close: "18:00" },
    { days: "Saturday", time: "9:00 AM – 3:00 PM", dow: ["Sa"], open: "09:00", close: "15:00" },
    { days: "Sunday", time: "Closed", dow: ["Su"], open: null, close: null },
  ],

  /** Social links — leave "#" to hide/placeholder. TODO: add real profile URLs. */
  social: {
    facebook: "#", // TODO
    instagram: "#", // TODO
    google: "#", // TODO: Google Business Profile review link
    yelp: "#", // TODO
  },

  /** Headline trust metrics shown in the trust bar + showcase (animated count-up). */
  // TODO: Replace with real, honest numbers.
  stats: {
    yearsInBusiness: 15,
    homesCleaned: 4200,
    googleRating: 5.0,
    reviewCount: 312,
  },
} as const;

/** Convenience: full formatted address string reused for NAP consistency. */
export const fullAddress = `${site.address.street}, ${site.address.locality}, ${site.address.region} ${site.address.postalCode}`;

/* ---------------------------------------------------------------------------
 *  VIDEOS  — drop your files in /public/videos and adjust paths/posters here.
 *  (Swapping which video is hero vs. showcase is a one-line change below.)
 * ------------------------------------------------------------------------- */
export const videos = {
  hero: {
    src: "/videos/hero-window-cleaning.mp4",
    poster: "/images/hero-poster.svg", // TODO: replace with a compressed .webp still for best LCP
    // Aspect ratio of the source video — keep accurate to avoid layout shift.
    width: 1920,
    height: 1080,
  },
  showcase: {
    src: "/videos/window-cleaning-showcase.mp4",
    poster: "/images/showcase-poster.svg", // TODO: replace with a compressed .webp still
    width: 1920,
    height: 1080,
  },
} as const;

/* ---------------------------------------------------------------------------
 *  NAVIGATION
 * ------------------------------------------------------------------------- */
export const navLinks = [
  { label: "Services", href: "#services" },
  { label: "Our Work", href: "#showcase" },
  { label: "Reviews", href: "#reviews" },
  { label: "About", href: "#about" },
  { label: "Service Area", href: "#service-area" },
  { label: "FAQ", href: "#faq" },
] as const;

/* ---------------------------------------------------------------------------
 *  TRUST BAR  (the reassurance strip under the hero)
 * ------------------------------------------------------------------------- */
export const trustBadges = [
  { icon: "MapPin", label: "Locally Owned", sub: "Cincinnati family business" },
  { icon: "ShieldCheck", label: "Licensed & Insured", sub: "Fully covered, every job" },
  { icon: "BadgeDollarSign", label: "Free Estimates", sub: "No-pressure quotes" },
  { icon: "Building2", label: "Residential & Commercial", sub: "Homes to storefronts" },
  { icon: "Sparkles", label: "Satisfaction Guarantee", sub: "Streak-free or we return" },
] as const;

/* ---------------------------------------------------------------------------
 *  SERVICES
 *  `icon` matches a lucide-react icon name (see ICON_MAP in icon.tsx).
 * ------------------------------------------------------------------------- */
export type Service = {
  slug: string;
  title: string;
  description: string;
  icon: string;
  featured?: boolean;
};

export const services: Service[] = [
  {
    slug: "residential",
    title: "Residential Window Cleaning",
    description:
      "Crystal-clear views from inside out. We treat your home like our own — booties on, screens out, sills wiped, nothing left behind but sparkle.",
    icon: "Home",
    featured: true,
  },
  {
    slug: "commercial",
    title: "Commercial Window Cleaning",
    description:
      "Spotless first impressions for offices, restaurants, and retail. Flexible scheduling that works around your business, not the other way around.",
    icon: "Building2",
    featured: true,
  },
  {
    slug: "interior",
    title: "Interior Window Cleaning",
    description:
      "Fingerprints, pet noses, cooking film — gone. We clean the inside glass with care for your floors, furniture, and finishes.",
    icon: "PanelsTopLeft",
  },
  {
    slug: "exterior",
    title: "Exterior Window Cleaning",
    description:
      "Pure-water and traditional methods that lift dirt, pollen, and grime, leaving exterior glass streak-free and brilliant.",
    icon: "Sun",
  },
  {
    slug: "screens",
    title: "Screen Cleaning",
    description:
      "We remove, hand-wash, and re-fit your screens so more daylight actually makes it through the glass.",
    icon: "Grid3x3",
  },
  {
    slug: "tracks-sills",
    title: "Track & Sill Cleaning",
    description:
      "The detail most crews skip. We dig the grit, dead bugs, and buildup out of tracks and sills so windows glide and look finished.",
    icon: "Ruler",
  },
  {
    slug: "hard-water",
    title: "Hard Water Stain Removal",
    description:
      "Sprinkler spray and mineral buildup etch glass over time. We safely restore clarity to stained windows, doors, and shower glass.",
    icon: "Droplets",
  },
  {
    slug: "storefront",
    title: "Storefront Glass Cleaning",
    description:
      "Recurring routes that keep your entrance and display glass flawless — so customers see your business at its best, every day.",
    icon: "Store",
  },
];

/** Optional add-on services (shown in a distinct sub-section). */
export const addOns: Service[] = [
  {
    slug: "gutter-cleaning",
    title: "Gutter Cleaning",
    description: "Clear, free-flowing gutters to protect your home from water damage. Ask to bundle with a window visit and save.",
    icon: "Leaf",
  },
  {
    slug: "pressure-washing",
    title: "Pressure Washing",
    description: "Driveways, siding, patios, and walkways brought back to life. The perfect pairing with a full exterior window clean.",
    icon: "Waves",
  },
];

/* ---------------------------------------------------------------------------
 *  PROCESS  (how a visit works)
 * ------------------------------------------------------------------------- */
export const processSteps = [
  {
    title: "Get your free quote",
    description: "Tell us about your windows in 60 seconds. We follow up fast with a clear, no-pressure estimate.",
    icon: "ClipboardList",
  },
  {
    title: "We schedule around you",
    description: "Pick a day that fits. We confirm ahead of time and show up in the window we promised — on time.",
    icon: "CalendarCheck",
  },
  {
    title: "The Crystal Clear clean",
    description: "Pros, not part-timers. Screens, tracks, frames, and glass — detailed start to finish, mess-free.",
    icon: "Sparkles",
  },
  {
    title: "The reveal & guarantee",
    description: "We walk it with you. If a single pane isn't perfect, we make it right — that's our streak-free guarantee.",
    icon: "ThumbsUp",
  },
] as const;

/* ---------------------------------------------------------------------------
 *  GALLERY  (before / after)
 *  TODO: Replace placeholder slots with real before/after photos in
 *        /public/images/gallery and update src + alt below.
 * ------------------------------------------------------------------------- */
export type GalleryItem = {
  title: string;
  caption: string;
  before?: string; // e.g. "/images/gallery/job-1-before.jpg"
  after?: string; // e.g. "/images/gallery/job-1-after.jpg"
};

export const gallery: GalleryItem[] = [
  { title: "Hyde Park Bay Windows", caption: "Years of film & water spots, gone in an afternoon." },
  { title: "Downtown Storefront", caption: "Daily foot-traffic grime to picture-perfect glass." },
  { title: "Montgomery Sunroom", caption: "Hard water etching safely restored to clarity." },
  { title: "Mason Two-Story", caption: "Exterior + screens, no ladders left in the flowerbeds." },
  { title: "Blue Ash Office", caption: "Floor-to-ceiling lobby glass, streak-free." },
  { title: "Mariemont Tudor", caption: "Divided-light panes detailed by hand." },
];

/* ---------------------------------------------------------------------------
 *  TESTIMONIALS / REVIEWS
 *  TODO: Replace with real reviews. Structured so you can later paste in
 *        Google reviews (keep name, location, rating, quote, date).
 * ------------------------------------------------------------------------- */
export type Testimonial = {
  name: string;
  location: string;
  rating: number;
  quote: string;
  date?: string;
};

export const testimonials: Testimonial[] = [
  {
    name: "Jennifer M.",
    location: "Hyde Park",
    rating: 5,
    quote:
      "I genuinely gasped when I walked into my living room. The windows looked like they weren't even there. On time, polite, and they cleaned the tracks I didn't even ask about.",
    date: "2 weeks ago",
  },
  {
    name: "Marcus T.",
    location: "Downtown Cincinnati",
    rating: 5,
    quote:
      "We have them on a monthly route for our storefront. Customers actually comment on how clean the glass is. Worth every penny and the team is fantastic.",
    date: "1 month ago",
  },
  {
    name: "The Reyes Family",
    location: "Mason",
    rating: 5,
    quote:
      "Family-owned and it shows. They respected our home, wore booties, and left zero mess. Our two-story windows have never looked better. Already booked them again.",
    date: "3 weeks ago",
  },
  {
    name: "Dana K.",
    location: "Montgomery",
    rating: 5,
    quote:
      "Hard water stains I thought were permanent — completely gone. They explained exactly what they'd do and delivered. Couldn't be happier.",
    date: "2 months ago",
  },
  {
    name: "Office Manager",
    location: "Blue Ash",
    rating: 5,
    quote:
      "Booking was effortless and the quote was honest with no surprises. Our lobby glass is immaculate. Highly recommend for any commercial space.",
    date: "1 month ago",
  },
  {
    name: "Paul & Susan R.",
    location: "Mariemont",
    rating: 5,
    quote:
      "Our old divided-light windows are tricky and they handled every pane by hand. Truly the best window cleaning we've had in 20 years in this house.",
    date: "5 weeks ago",
  },
];

/* ---------------------------------------------------------------------------
 *  SERVICE AREA  (chips + map)
 *  TODO: Add/remove the neighborhoods & suburbs you actually serve.
 * ------------------------------------------------------------------------- */
export const serviceAreas = [
  "Cincinnati",
  "Hyde Park",
  "Mt. Lookout",
  "Oakley",
  "Mariemont",
  "Montgomery",
  "Blue Ash",
  "Madeira",
  "Anderson Township",
  "Loveland",
  "Mason",
  "West Chester",
  "Indian Hill",
  "Milford",
  "Newport (KY)",
  "Covington (KY)",
];

// TODO: Replace with your own Google Maps embed URL (Maps → Share → Embed a map).
// Leaving this null renders a styled placeholder instead of a live map.
export const mapEmbedUrl: string | null = null;

/* ---------------------------------------------------------------------------
 *  FAQ
 * ------------------------------------------------------------------------- */
export const faqs = [
  {
    q: "How often should I have my windows cleaned?",
    a: "For most homes, two cleanings a year — spring and fall — keep glass looking its best. Homes near busy roads, construction, or lots of trees may prefer quarterly. Commercial storefronts often go monthly or biweekly. We'll happily recommend a cadence for your situation.",
  },
  {
    q: "Do I need to be home during the cleaning?",
    a: "For exterior-only cleanings, no — you don't need to be home as long as we have access to the windows and any gates. For interior work we'll need access inside, but many customers simply arrange a key, code, or a quick meet-and-greet. We're fully insured and background-checked for your peace of mind.",
  },
  {
    q: "Are you licensed and insured?",
    a: "Yes. Crystal Clear Window Cleaning is fully licensed and insured, including liability coverage. We're happy to provide proof of insurance on request — protecting your home and our team is non-negotiable.",
  },
  {
    q: "What happens if it rains?",
    a: "A little rain won't undo a professional cleaning — clean glass sheds rainwater without spotting. If there's heavy weather on your scheduled day, we'll proactively reach out to reschedule at no charge. Your satisfaction guarantee always applies.",
  },
  {
    q: "Do you clean screens, tracks, and sills?",
    a: "Absolutely — and it's where we shine. We remove and hand-wash screens, dig out the grit and debris from tracks, and wipe down sills so the whole window looks finished, not just the glass.",
  },
  {
    q: "Do you handle commercial storefronts and offices?",
    a: "We do. From single storefronts to multi-suite offices and restaurants, we offer flexible one-time and recurring routes scheduled around your business hours. Ask about our maintenance plans.",
  },
  {
    q: "How do quotes work?",
    a: "It's simple and free. Tell us a bit about your property — type, number of stories, roughly how many windows, and what you'd like done — using our quick quote form or a phone call. We'll follow up promptly with a clear, itemized estimate. No pressure, no surprises.",
  },
];

/* ---------------------------------------------------------------------------
 *  QUOTE FORM OPTIONS
 * ------------------------------------------------------------------------- */
export const storyOptions = [
  { value: "1", label: "1 story" },
  { value: "2", label: "2 stories" },
  { value: "3", label: "3 stories" },
  { value: "4+", label: "4+ stories" },
] as const;

export const windowCountOptions = [
  { value: "1-10", label: "1 – 10 windows" },
  { value: "11-20", label: "11 – 20 windows" },
  { value: "21-30", label: "21 – 30 windows" },
  { value: "31-50", label: "31 – 50 windows" },
  { value: "50+", label: "50+ windows" },
  { value: "unsure", label: "Not sure" },
] as const;

export const contactMethodOptions = [
  { value: "phone", label: "Phone call" },
  { value: "text", label: "Text message" },
  { value: "email", label: "Email" },
] as const;

/** Service options offered in the quote form (label only). */
export const quoteServiceOptions = [
  "Residential window cleaning",
  "Commercial window cleaning",
  "Interior windows",
  "Exterior windows",
  "Screen cleaning",
  "Track & sill cleaning",
  "Hard water stain removal",
  "Storefront glass",
  "Gutter cleaning",
  "Pressure washing",
] as const;
