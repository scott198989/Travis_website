import Image from "next/image";
import { Sparkles, Camera } from "lucide-react";

import { gallery, type GalleryItem } from "@/lib/site-config";
import { Reveal } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/sections/section-heading";

/**
 * Before/after work gallery.
 *
 * TODO: drop real photos into /public/images/gallery and set `before`/`after`
 * paths on each item in site-config.ts. When `after` is set, the card renders
 * the real photo (and reveals the BEFORE shot on hover if `before` is set).
 * Until then it shows an elegant branded placeholder panel.
 */
function GalleryCard({ item, index }: { item: GalleryItem; index: number }) {
  const hasPhotos = Boolean(item.after);

  return (
    <figure className="group relative overflow-hidden rounded-2xl ring-1 ring-chrome-300/70 shadow-glass">
      <div className="relative aspect-[4/3] overflow-hidden bg-navy-900">
        {hasPhotos ? (
          <>
            <Image
              src={item.after as string}
              alt={`${item.title} — after Crystal Clear Window Cleaning`}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            {item.before && (
              <Image
                src={item.before}
                alt={`${item.title} — before cleaning`}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              />
            )}
          </>
        ) : (
          // Branded placeholder — looks intentional until real photos are added.
          <div
            className="absolute inset-0 transition-transform duration-500 group-hover:scale-105"
            style={{
              background:
                index % 2 === 0
                  ? "linear-gradient(135deg, #16456c, #3da5d9 70%, #dceef8)"
                  : "linear-gradient(135deg, #0b2942, #1b6fb3 75%, #7fc1e6)",
            }}
          >
            <div
              aria-hidden
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage:
                  "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)",
                backgroundSize: "44px 44px",
              }}
            />
            <Sparkles className="absolute right-5 top-5 size-6 text-white/70" />
            <div className="absolute inset-0 flex items-center justify-center text-white/40">
              <Camera className="size-10" strokeWidth={1.25} />
            </div>
          </div>
        )}

        {/* caption scrim */}
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy-900/85 to-transparent p-5 pt-12">
          <figcaption>
            <p className="font-display text-lg font-medium text-white">{item.title}</p>
            <p className="mt-0.5 text-sm text-white/70">{item.caption}</p>
          </figcaption>
        </div>

        {/* before/after pill */}
        <span className="absolute left-4 top-4 rounded-full bg-white/85 px-2.5 py-1 text-[0.7rem] font-semibold uppercase tracking-wide text-navy-900 backdrop-blur-sm">
          {item.before ? "Hover: before" : "Before / After"}
        </span>
      </div>
    </figure>
  );
}

export function Gallery() {
  return (
    <section id="gallery" className="relative scroll-mt-24 py-24 lg:py-28">
      <div className="container-x">
        <SectionHeading
          eyebrow="Recent work"
          title={
            <>
              Real homes. Real storefronts.{" "}
              <span className="text-tide-600">Really clean glass.</span>
            </>
          }
          intro="A look at jobs around Greater Cincinnati. Swipe through and picture your own windows looking like this."
        />

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {gallery.map((item, i) => (
            <Reveal key={item.title} variant="fade-up" delay={(i % 3) * 0.08}>
              <GalleryCard item={item} index={i} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
