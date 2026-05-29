import { site, fullAddress, serviceAreas, faqs } from "@/lib/site-config";

const DOW: Record<string, string> = {
  Mo: "Monday",
  Tu: "Tuesday",
  We: "Wednesday",
  Th: "Thursday",
  Fr: "Friday",
  Sa: "Saturday",
  Su: "Sunday",
};

/**
 * LocalBusiness / HomeAndConstructionBusiness structured data for rich results
 * + local SEO. NAP is pulled from the single site-config source of truth so it
 * always matches what's on the page.
 *
 * NOTE: `aggregateRating` must reflect REAL reviews to comply with Google's
 * policy. Update site.stats.googleRating / reviewCount with genuine numbers, or
 * remove the aggregateRating block until you have verifiable reviews.
 */
export function JsonLd() {
  const sameAs = Object.values(site.social).filter((u) => u && u !== "#");

  const localBusiness = {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "HomeAndConstructionBusiness"],
    "@id": `${site.url}/#business`,
    name: site.name,
    description: site.description,
    url: site.url,
    telephone: site.phone.tel,
    email: site.email,
    image: `${site.url}/images/hero-poster.svg`,
    logo: `${site.url}/icon.svg`,
    priceRange: site.priceRange,
    foundingDate: String(site.establishedYear),
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.street,
      addressLocality: site.address.locality,
      addressRegion: site.address.region,
      postalCode: site.address.postalCode,
      addressCountry: site.address.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: site.geo.lat,
      longitude: site.geo.lng,
    },
    areaServed: serviceAreas.map((a) => ({ "@type": "City", name: a })),
    openingHoursSpecification: site.hours
      .filter((h) => h.open && h.close)
      .map((h) => ({
        "@type": "OpeningHoursSpecification",
        dayOfWeek: h.dow.map((d) => DOW[d]),
        opens: h.open,
        closes: h.close,
      })),
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: site.stats.googleRating,
      reviewCount: site.stats.reviewCount,
      bestRating: 5,
      worstRating: 1,
    },
    sameAs: sameAs.length ? sameAs : undefined,
    slogan: site.tagline,
    knowsAbout: [
      "Residential window cleaning",
      "Commercial window cleaning",
      "Hard water stain removal",
      "Screen and track cleaning",
      "Storefront glass cleaning",
    ],
  };

  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${site.url}/#website`,
    url: site.url,
    name: site.name,
    publisher: { "@id": `${site.url}/#business` },
  };

  const faqPage = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusiness) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(website) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPage) }}
      />
    </>
  );
}
