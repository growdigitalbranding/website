import { EMAIL, PHONE } from "@/lib/contact";
import { BRAND } from "@/lib/brand";

export const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: BRAND,
  url: "https://growdigitalbranding.com",
  description:
    "Performance marketing for high-consideration purchases. Real estate first, then senior living and interiors.",
  areaServed: ["Tamil Nadu", "Karnataka"],
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
