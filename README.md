# Crystal Clear Window Cleaning — Website

A premium, conversion-focused marketing site for a family-owned window cleaning
company in Cincinnati, Ohio. Built with Next.js 16 (App Router), TypeScript,
Tailwind CSS v4, Framer Motion (`motion`), React Hook Form + Zod, shadcn/ui
(heavily customized), Lucide icons, and a subtle React Three Fiber hero effect.

> Design system: **"Crisp Coastal Chrome"** — bright, glassy, architectural;
> deep-navy + sky-blue with rationed golden-hour warmth, chrome hairline
> detailing, and a sign-painted family rosette.

---

## ✅ Quick start (run it locally)

```bash
npm install
npm run dev
# open http://localhost:3000
```

Other commands:

```bash
npm run build   # production build (also type-checks)
npm run start   # serve the production build
npm run lint    # eslint
```

No environment variables are required to run locally — the quote form works in
"demo mode" (it logs submissions to the server console instead of emailing)
until you configure an email provider (see below).

---

## ✏️ What to edit (everything is in ONE place)

**`src/lib/site-config.ts`** is the single source of truth. Search it for
`TODO` to find every value to replace. From there you control:

| What | Where in `site-config.ts` |
|------|---------------------------|
| Business name / tagline / description | `site.name`, `site.tagline`, `site.description` |
| **Phone number** | `site.phone` (`tel` = digits for links, `display` = shown text) |
| **Email** | `site.email` |
| Address (for maps + local SEO) | `site.address`, `site.geo` |
| Year established (shown on the rosette) | `site.establishedYear` |
| Production domain | `site.url` |
| Business hours | `site.hours` |
| Social links | `site.social` (set to a real URL to show; `"#"` hides it) |
| Headline stats (years, homes cleaned, rating) | `site.stats` |
| **Service list** | `services` and `addOns` |
| **Reviews / testimonials** | `testimonials` |
| **Before/after gallery** | `gallery` |
| **Service-area chips** | `serviceAreas` |
| Google Maps embed | `mapEmbedUrl` (leave `null` for the styled placeholder) |
| FAQ questions/answers | `faqs` |
| Quote-form dropdown options | `storyOptions`, `windowCountOptions`, etc. |

### Replace the videos
Drop your two files into **`public/videos/`** with these exact names (or change
the paths in `site-config.ts` → `videos`):

- `public/videos/hero-window-cleaning.mp4` — plays in the hero aperture
- `public/videos/window-cleaning-showcase.mp4` — the before/after showcase

(Your two Gemini videos are already copied in. To swap which one is the hero vs.
the showcase, just rename them or edit the `videos` paths in `site-config.ts`.)

### Replace the poster images (recommended for best load speed)
Branded SVG placeholders ship at `public/images/hero-poster.svg` and
`showcase-poster.svg`. For the best Largest-Contentful-Paint score, replace
these with a **compressed `.webp` still frame** from each video (export one
frame, save as WebP/AVIF, point the `poster` paths in `site-config.ts` at them).

### Add real photos
- **Gallery:** put photos in `public/images/gallery/` and set `before`/`after`
  paths on each item in `gallery` (in `site-config.ts`). Cards automatically
  switch from the placeholder to real photos (and reveal the BEFORE on hover).
- **About / owner photo:** see the `TODO` in
  `src/components/sections/about.tsx`.

---

## 📨 Connecting the quote form to email

The form posts to `/api/quote`, which validates again on the server and sends
via a **pluggable provider** chosen by the `EMAIL_PROVIDER` env var. Copy
`.env.example` → `.env.local` and fill in one provider:

**Resend (recommended)** — `EMAIL_PROVIDER=resend`
```
RESEND_API_KEY=...
QUOTE_FROM_EMAIL=quotes@yourdomain.com   # must be a verified Resend domain
QUOTE_TO_EMAIL=owner@yourdomain.com      # where leads are delivered
```

**Formspree** — `EMAIL_PROVIDER=formspree` + `FORMSPREE_FORM_ID=...`

**EmailJS** — browser-based; see notes in `src/lib/email/emailjs.ts`.

Until configured, submissions are logged to the server console (form still shows
success), so you can demo immediately. Built-in spam protection: a honeypot
field + a sub-2-second timing check, both enforced server-side.

---

## 🗂️ Project structure

```
public/
  videos/   hero-window-cleaning.mp4, window-cleaning-showcase.mp4
  images/   hero-poster.svg, showcase-poster.svg, (your gallery photos)
src/
  app/
    layout.tsx           # fonts, metadata, header/footer, JSON-LD, providers
    page.tsx             # the landing page (composes all sections)
    globals.css          # Tailwind v4 @theme brand tokens + utilities
    api/quote/route.ts   # quote submission endpoint (validates + emails)
    sitemap.ts, robots.ts, opengraph-image.tsx, icon.svg
    not-found.tsx, error.tsx
  components/
    layout/    header, footer, mobile-nav
    sections/  hero (+ video, WebGL backdrop, squeegee reveal), trust-strip,
               services, showcase (+ before/after comparator), process,
               gallery, testimonials, about, service-area, faq, final-cta
    quote/     quote-section, quote-form (RHF + Zod)
    motion/    motion-provider (LazyMotion), reveal
    brand/     logo, rosette, droplet-lens, count-up, stars
    seo/       json-ld (LocalBusiness schema)
    ui/        shadcn components, customized to the brand
  lib/
    site-config.ts       # ⭐ edit this — all business content
    schemas/quote.ts     # shared Zod schema (client + server)
    email/               # provider, resend, formspree, emailjs, format
    icons.tsx, utils.ts
```

---

## 🚀 Deploy

**Recommended: [Vercel](https://vercel.com)** (made by the Next.js team —
zero-config for this stack, automatic image optimization, global CDN,
per-commit preview URLs).

1. Push this repo to GitHub (already linked to `scott198989/Travis_website`).
2. Import the repo at vercel.com → it auto-detects Next.js.
3. Add your env vars in **Project → Settings → Environment Variables**
   (Production + Preview). Never commit `.env.local`.
4. Add your custom domain and set `site.url` in `site-config.ts` to match.
5. **Before launch:** verify your Resend sending domain (SPF/DKIM) so quote
   emails don't land in spam.

Netlify and Cloudflare Pages also work, but Vercel is the smoothest path.

### Pre-launch checklist
- [ ] Replace phone, email, address, established year in `site-config.ts`
- [ ] Replace placeholder reviews with **real** ones (and make `site.stats`
      match your real Google rating — required by Google's policy)
- [ ] Add real before/after gallery photos
- [ ] Export compressed `.webp` video posters (better LCP)
- [ ] Configure an email provider + verify sending domain
- [ ] Set real social links and the Google Maps embed URL
- [ ] Set `site.url` to your live domain
- [ ] Run Lighthouse / PageSpeed and confirm CWV are green

---

## ♿ Accessibility & performance notes
- Honors `prefers-reduced-motion` (animations + autoplay disabled, posters shown).
- Hero/showcase videos are muted, looped, `playsInline`, with a visible
  play/pause control (WCAG 2.2.2). The showcase video lazy-mounts on scroll.
- The WebGL hero effect is progressive enhancement only (desktop + capable GPUs
  + motion allowed); everything degrades to a CSS gradient.
- Semantic landmarks, keyboard-operable nav/accordion/comparator, visible focus
  rings, skip-to-content link, labeled form fields with inline errors.

🤖 Built with [Claude Code](https://claude.com/claude-code).
