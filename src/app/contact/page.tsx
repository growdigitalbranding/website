import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { PageHero } from "@/components/PageHero";
import { FinalCTA } from "@/components/sections/FinalCTA";

export const metadata: Metadata = pageMeta({
  path: "/contact",
  title: "Book a 30-minute marketing audit call",
  description:
    "Book a 30-minute call. Three fields, no forms marathon, no deck. We look at your account and tell you which rate is cheapest to fix first.",
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
