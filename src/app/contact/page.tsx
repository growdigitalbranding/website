import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { PageHero } from "@/components/PageHero";
import { FinalCTA } from "@/components/sections/FinalCTA";

export const metadata: Metadata = pageMeta({
  path: "/contact",
  title: "Book a call",
  description:
    "Book a 30-minute call with Grow. Three fields, no forms marathon.",
});

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="CONTACT"
        title="Three fields. That's it."
        subtitle="Everything else gets asked on the call. Budget, current agency, timeline. We reply on WhatsApp inside one working hour."
      />
      <FinalCTA />
    </>
  );
}
