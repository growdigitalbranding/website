import { EMAIL, PHONE } from "@/lib/contact";
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
  // sameAs is the missing piece: it is how an answer engine corroborates that
  // this entity is the same one it has seen elsewhere. Add the real profile
  // URLs (LinkedIn, Google Business Profile, Instagram) and nothing else in
  // this file needs to change.
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
