import { ORG_ID } from "@/lib/schema/jsonld";
import { PROGRAMME } from "@/data/training";
import { isoDate, nextBatchStarts, type BatchKind } from "@/lib/batches";

const SITE = "https://growdigitalbranding.com";

/** One id for the programme, so every training page describes the same course. */
export const COURSE_ID = `${SITE}/training#course`;

const LOCATION = {
  "@type": "Place",
  name: `${PROGRAMME.name}, ${PROGRAMME.city}`,
  address: {
    "@type": "PostalAddress",
    addressLocality: PROGRAMME.city,
    addressRegion: "Tamil Nadu",
    addressCountry: "IN",
  },
};

/**
 * Course markup with one CourseInstance per upcoming batch.
 *
 * Google announced in 2025 that it was phasing out the Course info rich
 * result, so this is not written for a SERP feature. It is here because it
 * states the programme's facts (fee, mode, city, start dates, batch size) as
 * data that search engines and
 * AI assistants can read without parsing prose, and those facts are what a
 * "digital marketing course in Coimbatore" query is asking for.
 *
 * Start dates come from nextBatchStarts, so they move with the calendar; the
 * pages that render this revalidate hourly. No end dates or weekly day
 * patterns are declared, because only the start rule has been supplied.
 */
export function courseJsonLd({
  path,
  description,
  audience,
}: {
  path: string;
  description: string;
  /** Who this page addresses, e.g. "College students". */
  audience?: string;
}) {
  const url = SITE + path;
  const kinds: BatchKind[] = ["weekday", "weekend"];

  return {
    "@context": "https://schema.org",
    "@type": "Course",
    "@id": COURSE_ID,
    name: PROGRAMME.name,
    description,
    url,
    inLanguage: "en-IN",
    provider: { "@id": ORG_ID },
    timeRequired: PROGRAMME.durationIso,
    educationalCredentialAwarded: "Certificate of completion",
    ...(audience
      ? { audience: { "@type": "EducationalAudience", audienceType: audience } }
      : {}),
    offers: {
      "@type": "Offer",
      category: "Paid",
      price: PROGRAMME.feeInr,
      priceCurrency: "INR",
      url,
    },
    hasCourseInstance: kinds.flatMap((kind) => {
      const batch = PROGRAMME.batches[kind];
      return nextBatchStarts(kind, 2).map((d) => ({
        "@type": "CourseInstance",
        name: `${batch.label}, ${batch.hoursPerDay} hours a day`,
        courseMode: "Onsite",
        location: LOCATION,
        startDate: isoDate(d),
        maximumAttendeeCapacity: PROGRAMME.batchSize,
        courseSchedule: {
          "@type": "Schedule",
          startDate: isoDate(d),
          duration: `PT${batch.hoursPerDay}H`,
        },
        offers: {
          "@type": "Offer",
          category: "Paid",
          price: PROGRAMME.feeInr,
          priceCurrency: "INR",
          url,
        },
      }));
    }),
  };
}
