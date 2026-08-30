"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { faqJsonLd } from "@/lib/schema/jsonld";

const FAQS = [
  {
    question: "Why not just hire in-house?",
    answer:
      "You can, once you're spending ₹15L+/month and can justify a media buyer, a creative producer, and a tracking engineer as three full-time salaries. Below that, you're paying three salaries for one person's part-time attention. We run all three functions as a system across multiple accounts, which is the only way the economics work below that threshold.",
  },
  {
    question: "What if we already have an agency?",
    answer:
      "Most of our clients did. We start with a paid audit covering tracking setup, account structure, creative fatigue and follow-up speed, then hand it to you whether or not you switch. If the audit doesn't surface at least ₹50k/month in avoidable waste, we tell you to stay put.",
  },
  {
    question: "What's the minimum ad budget you'll work with?",
    answer:
      "₹1.5L/month in media spend, on top of our fee. Below that, the creative testing volume the loop needs doesn't have enough impressions to reach statistical signal, and you're better off with a single freelancer running one campaign.",
  },
  {
    question: "How fast do results show up?",
    answer:
      "Tracking and structure fixes show up in CPL within 2-3 weeks. Booking-level movement, the number that actually matters, takes a full sales cycle, typically 30-60 days for the ticket sizes we work with. Anyone promising booking results in week one is lying or measuring the wrong thing.",
  },
  {
    question: "Do you take a project fee or a percentage?",
    answer:
      "Flat monthly retainer, tiered by ad spend under management. See /pricing for actual numbers. We don't take a percentage of spend, because that pays us more when we spend your money worse.",
  },
  {
    question: "What happens to the tracking setup if we leave?",
    answer:
      "You keep it. The sGTM container, CAPI setup, and CRM webhooks are provisioned under your own accounts and domains from day one, not ours. We hand over admin access on request, no lock-in.",
  },
];

export function Objections() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="py-20 md:py-28 bg-paper-2">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqJsonLd(FAQS.map((f) => ({ question: f.question, answer: f.answer })))),
        }}
      />
      <div className="mx-auto max-w-[1440px] px-6">
        <p className="mono-label text-graphite mb-3">OBJECTIONS</p>
        <h2 className="text-h2 font-display font-bold mb-12 max-w-xl">
          The questions builders actually ask.
        </h2>

        <div className="max-w-3xl">
          {FAQS.map((faq, i) => {
            const isOpen = open === i;
            return (
              <div key={faq.question} className="border-b border-mist">
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="w-full flex items-center justify-between gap-4 py-6 text-left"
                >
                  <span className="text-lg font-medium font-display">{faq.question}</span>
                  <ChevronDown
                    size={20}
                    className={`shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180 text-signal" : "text-graphite"}`}
                  />
                </button>
                <div
                  className="grid transition-[grid-template-rows] duration-300 ease-out"
                  style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                >
                  <div className="overflow-hidden">
                    <p className="pb-6 text-graphite max-w-2xl">{faq.answer}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
