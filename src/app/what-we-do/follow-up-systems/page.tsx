import type { Metadata } from "next";
import { ServiceTemplate } from "@/components/ServiceTemplate";

export const metadata: Metadata = {
  title: "Follow-Up Systems",
  description: "WhatsApp automation, speed-to-lead, and a CRM loop that closes.",
};

export default function Page() {
  return (
    <ServiceTemplate
      eyebrow="WHAT WE DO / 03"
      title="The lead is the start, not the deliverable"
      subtitle="A lead not called back inside 60 seconds converts at a fraction of one that is. This is the system that keeps that from happening."
      whoFor={[
        "In-house sales teams of 2-15 with no follow-up SLA",
        "Anyone whose CRM has no automated acknowledgement step",
        "Builders who can't tell you their speed-to-lead number today",
      ]}
      included={[
        "Sub-60-second WhatsApp acknowledgement on every lead, automated",
        "A qualification flow that runs before a telecaller ever dials",
        "Disposition data written back to Meta/Google as a custom conversion",
        "A telecaller dashboard that flags anything uncalled past 5 minutes",
      ]}
      tooling={["WhatsApp Business API", "n8n", "Your CRM's webhook layer", "Twilio (fallback SMS)"]}
      miniCase="A mid-rise apartment client was calling back leads in an average of 4 hours 20 minutes. After automated WhatsApp acknowledgement plus a pre-dial qualification flow, no-show site visits dropped by half without any change in media spend."
      objection={{
        question: "We already have telecallers. Why do we need automation on top?",
        answer:
          "Automation doesn't replace your telecallers, it protects the window before they can act. A WhatsApp acknowledgement inside 60 seconds keeps the lead warm for the 20-40 minutes it realistically takes a human to get to the phone.",
      }}
    />
  );
}
