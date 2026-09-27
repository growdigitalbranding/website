import { EMAIL, PHONE, SOCIAL_URLS } from "@/lib/contact";
import { BRAND } from "@/lib/brand";

const SITE = "https://growdigitalbranding.com";

/**
 * Stable node ids. Without them, the organisation object repeated on all 24
 * pages reads as 24 unrelated declarations rather than one entity seen 24
 * times, and nothing else in the graph can point at it. Entity consolidation
 * is the whole job of Answer Visibility, so the site's own markup should not
 * be the thing making it harder.
 */
export const ORG_ID = `${SITE}/#organization`;
export const WEBSITE_ID = `${SITE}/#website`;

const organization = {
  "@type": "ProfessionalService",
  "@id": ORG_ID,
  name: BRAND,
  url: SITE,
  description:
    "Performance marketing for high-consideration purchases. Real estate first, then senior living and interiors.",
  // Google reads logo for the knowledge panel and wants a raster URL with the
  // mark uncropped. /logo.png is the full lockup on the brand ground.
  logo: {
    "@type": "ImageObject",
    url: `${SITE}/logo.png`,
    width: 1200,
    height: 648,
  },
  image: `${SITE}/logo.png`,
  areaServed: ["Tamil Nadu", "Karnataka"],
  slogan: "Most agencies stop at the lead. We run the loop.",
  // What this entity is about, in the terms a buyer and an assistant both
  // use. Every one of these is a subject the site actually covers in depth,
  // which is the only reason to claim it.
  knowsAbout: [
    "Performance marketing for real estate developers",
    "Digital marketing for real estate",
    "Real estate lead generation",
    "Facebook and Instagram advertising for real estate",
    "Google Ads for real estate",
    "WhatsApp marketing for real estate",
    "Cost per booking",
    "Meta Conversions API",
    "Server-side Google Tag Manager",
    "Offline conversion uploads",
    "Speed to lead",
    "Creative fatigue and refresh cadence",
    "AI digital marketing training",
    "RERA and DTCP approval status in advertising",
    "AI search visibility",
  ],
  // The retainer range the /pricing page publishes. Stated here because an
  // assistant asked "how much does X cost" will otherwise answer from
  // whatever a competitor published.
  priceRange: "₹60,000-₹2,50,000 per month",
  // Station 04 is Answer Visibility, and entity consistency is the first
  // thing it asks for: an assistant can only cite a contact it can find in
  // structured form. These come from the same constants the site renders, so
  // the markup and the page can never disagree.
  telephone: PHONE,
  email: EMAIL,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Coimbatore",
    addressRegion: "Tamil Nadu",
    addressCountry: "IN",
  },
  // How an answer engine corroborates that this entity is the same one it has
  // seen elsewhere. The list lives in lib/contact.ts because both footers link
  // the same profiles. A Google Business Profile belongs here too once the
  // listing is claimed.
  sameAs: SOCIAL_URLS,
};

const website = {
  "@type": "WebSite",
  "@id": WEBSITE_ID,
  url: SITE,
  name: BRAND,
  inLanguage: "en-IN",
  publisher: { "@id": ORG_ID },
};

/** One graph rather than two loose nodes, so the publisher reference resolves. */
export const organizationJsonLd = {
  "@context": "https://schema.org",
  "@graph": [organization, website],
};

export function faqJsonLd(items: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export function breadcrumbJsonLd(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

/**
 * Offer markup for the published engagement prices.
 *
 * /pricing states three real rupee figures in prose and in markup and declared
 * none of them as structured data, so the one page on the site whose entire
 * argument is "we publish our prices" was invisible as pricing to anything
 * reading the markup. Every field below is copied from what the page already
 * renders; nothing here asserts a price the reader cannot see.
 *
 * priceSpecification rather than a bare price on the retainer, because that
 * one is a genuine range and a single `price` would be a claim the page does
 * not make. The offers hang off the organisation @id so they consolidate onto
 * the same entity as everything else rather than declaring a second seller.
 */
export function offerCatalogJsonLd(
  plans: { name: string; price: string; unit: string; desc: string }[]
) {
  const rupees = (s: string) => s.replace(/[^\d-]/g, "").split("-").filter(Boolean);

  return {
    "@context": "https://schema.org",
    "@type": "OfferCatalog",
    "@id": `${SITE}/pricing#catalog`,
    name: "Engagement pricing",
    url: `${SITE}/pricing`,
    provider: { "@id": ORG_ID },
    itemListElement: plans.map((p, i) => {
      const [low, high] = rupees(p.price);
      const recurring = p.unit === "per month";
      return {
        "@type": "Offer",
        "@id": `${SITE}/pricing#offer-${i + 1}`,
        position: i + 1,
        name: p.name,
        description: p.desc,
        priceCurrency: "INR",
        category: recurring ? "Subscription" : "One-time",
        availability: "https://schema.org/InStock",
        seller: { "@id": ORG_ID },
        url: `${SITE}/pricing`,
        priceSpecification: high
          ? {
              "@type": "PriceSpecification",
              priceCurrency: "INR",
              minPrice: Number(low),
              maxPrice: Number(high),
              ...(recurring ? { billingDuration: 1, billingIncrement: 1 } : {}),
            }
          : {
              "@type": "PriceSpecification",
              priceCurrency: "INR",
              price: Number(low),
            },
        itemOffered: {
          "@type": "Service",
          name: p.name,
          description: p.desc,
          provider: { "@id": ORG_ID },
          areaServed: ["Tamil Nadu", "Karnataka"],
        },
      };
    }),
  };
}
