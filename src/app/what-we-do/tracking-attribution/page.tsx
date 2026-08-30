import type { Metadata } from "next";
import { ServiceTemplate } from "@/components/ServiceTemplate";

export const metadata: Metadata = {
  title: "Tracking & Attribution",
  description: "CAPI, server-side GTM, offline conversions. The signal layer.",
};

export default function Page() {
  return (
    <ServiceTemplate
      eyebrow="WHAT WE DO / 02"
      title="The signal layer platforms actually learn from"
      subtitle="Platforms optimise on the data you feed them. Most accounts are feeding them noise."
      whoFor={[
        "Anyone still relying on browser-only pixel tracking post-iOS 14.5",
        "CRMs that never talk back to the ad platform",
        "Teams that can't say what percentage of their conversion events are deduplicated",
      ]}
      included={[
        "Conversions API implementation with proper browser+server dedup",
        "A server-side GTM container on its own subdomain, with a sane cookie lifespan",
        "Weekly offline conversion upload from your CRM's deal stages",
        "Consent Mode v2 implementation that doesn't tank your event volume",
      ]}
      tooling={["Meta Conversions API", "Server-side GTM", "GA4", "Google Enhanced Conversions", "n8n"]}
      miniCase="A Coimbatore plotted-development account had zero server-side events. 100% browser pixel, no dedup, consent banner blocking half of Chrome traffic. After CAPI + sGTM + weekly offline conversion upload, cost per booking dropped 58% over two months with flat spend."
      objection={{
        question: "What happens to the tracking setup if we leave?",
        answer:
          "You keep it. Every container, dataset, and CRM webhook is provisioned under your own Meta Business Manager and Google account from day one. Not ours. We hand over full admin on request, no lock-in.",
      }}
    />
  );
}
