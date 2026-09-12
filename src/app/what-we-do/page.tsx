import type { Metadata } from "next";
import Link from "next/link";
import { PageHero, CTABand } from "@/components/PageHero";
import { TaxonomyNav } from "./TaxonomyNav";
import {
  GEOGRAPHIES,
  PILLARS,
  POSITIONS,
  PROPERTY_TYPES,
  SEGMENTS,
  STAGES,
} from "@/data/capability";
import {
  POSITION_NOTES,
  SEGMENT_NOTES,
  SERVICES,
  STAGE_NOTES,
  TYPE_NOTES,
} from "@/data/taxonomy";
import { faqJsonLd } from "@/lib/schema/jsonld";
import { BRAND } from "@/lib/brand";

export const metadata: Metadata = {
  title: "What we do",
  description:
    "The full capability directory: eight property types, five price positions, eight project stages, forty services across five pillars, ten buyer segments and six geographies, each with what actually changes about the marketing.",
};

/**
 * The homepage sells; this page documents. A directory is the right format
 * here, and the clarifying line under each item is what makes it worth
 * reading — for a person scanning it and for an assistant deciding whether
 * there is anything here worth citing.
 */

const SECTIONS = [
  { id: "property-types", label: "Property Types" },
  { id: "positioning", label: "Positioning" },
  { id: "stages", label: "Project Stages" },
  { id: "services", label: "Services" },
  { id: "segments", label: "Segments" },
  { id: "geography", label: "Geography" },
];

/** The existing deep-dive pages, surfaced from the pillar they belong to. */
const DEEP_DIVES: Record<string, { href: string; label: string }[]> = {
  "Lead Generation": [
    { href: "/what-we-do/performance-marketing", label: "Performance marketing" },
    { href: "/what-we-do/creative-engine", label: "Creative engine" },
  ],
  "Follow-Up": [{ href: "/what-we-do/follow-up-systems", label: "Follow-up systems" }],
  Retargeting: [{ href: "/what-we-do/tracking-attribution", label: "Tracking & attribution" }],
  Conversion: [{ href: "/what-we-do/ai-search-visibility", label: "AI search visibility" }],
};

const FAQS = [
  {
    question: "What kinds of real estate projects do you market?",
    answer:
      "Plots, apartments, villas, senior living, farm land, independent and row houses, commercial, and weekend homes. The marketing motion differs by category: plot buyers decide in days and compare three projects the same evening, while villa cycles run long enough to starve the ad platform of signal unless site visits are fed back to it.",
  },
  {
    question: "Do you work on affordable projects or only luxury?",
    answer:
      "Both, but the approach inverts. Affordable projects need high creative volume, fast rotation and automated follow-up to survive the lead count. Above roughly five crore, volume is the wrong lever entirely: fewer angles, far higher production value, and a named person on first contact rather than an automation.",
  },
  {
    question: "Can you run a pre-launch campaign?",
    answer:
      "Yes, and the measurement has to be set up before spend starts. Attribution cannot be retrofitted onto a launch. The launch data is simply lost. At pre-launch the job is waitlist capture rather than enquiry volume, so the creative is teaser-led and the follow-up nurtures rather than sells.",
  },
  {
    question: "Do you only do lead generation, or branding too?",
    answer:
      "Both. Branding covers strategy, project naming, logo and visual identity, brochure and sales collateral, and creative direction. Builders usually buy naming and identity at pre-launch, before performance marketing starts, so it is the earlier conversation.",
  },
  {
    question: "What happens to leads after they come in?",
    answer:
      "A WhatsApp acknowledgement inside sixty seconds, qualification before your telecaller dials, and disposition data written back into the ad account weekly. That last step is the one most accounts have never done, and it is what stops the platform buying more of the wrong leads.",
  },
  {
    question: "Do you handle NRI campaigns?",
    answer:
      "Yes, across the Gulf, Singapore and the US, with timezone-aware follow-up. That last part is not a detail: a call placed at 3pm IST reaches nobody in the Gulf, and most NRI campaigns fail on scheduling rather than on targeting.",
  },
  {
    question: "What do you measure?",
    answer:
      "Cost per booking, not cost per lead. Cost per lead is the number that looks best in a report and explains the least. We report through the whole funnel: qualified rate, speed to first contact, visit show-up rate, and cost per booking.",
  },
  {
    question: "Which cities do you work in?",
    answer:
      "Tamil Nadu and Karnataka primarily, with campaigns running local, city-wide, regional, pan-India and NRI depending on the project. Pan-India is worth it for appreciation-led plots and second homes; for most apartment projects it is wasted spend, and we will say so.",
  },
];

function Item({ label, note }: { label: string; note: string }) {
  return (
    <li className="border-t border-mist py-4">
      <p className="font-medium text-ink">{label}</p>
      <p className="text-sm text-graphite mt-1 leading-relaxed">{note}</p>
    </li>
  );
}

function Block({
  id,
  title,
  intro,
  children,
}: {
  id: string;
  title: string;
  intro: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-28 mb-16">
      <h2 className="text-h2 font-display font-bold text-ink mb-3">{title}</h2>
      <p className="text-graphite mb-6 max-w-2xl">{intro}</p>
      {children}
    </section>
  );
}

export default function WhatWeDoPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(FAQS)) }}
      />
      {/* One Service entity per pillar, so an assistant can distinguish the
          five rather than reading the page as one undifferentiated offering. */}
      {PILLARS.map((p) => (
        <script
          key={p.n}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Service",
              serviceType: `Real estate ${p.name.toLowerCase()}`,
              provider: { "@type": "ProfessionalService", name: BRAND },
              areaServed: ["Tamil Nadu", "Karnataka"],
              hasOfferCatalog: {
                "@type": "OfferCatalog",
                name: p.name,
                itemListElement: (SERVICES[p.name] ?? []).map((s) => ({
                  "@type": "Offer",
                  itemOffered: { "@type": "Service", name: s.item, description: s.note },
                })),
              },
            }),
          }}
        />
      ))}

      <PageHero
        eyebrow="WHAT WE DO"
        title="The full directory."
        subtitle="Every property type, position, stage and service we market, with what actually changes about the work in each case. The homepage argues; this page documents."
      />

      <div className="mx-auto max-w-[1440px] px-6 pb-20 grid lg:grid-cols-[220px_1fr] gap-10 lg:gap-16">
        <TaxonomyNav sections={SECTIONS} />

        <div className="min-w-0">
          <Block
            id="property-types"
            title="Property types"
            intro="Eight categories. The difference between them is not the audience size, it is the decision cycle, and that changes the whole loop."
          >
            <ul className="grid sm:grid-cols-2 gap-x-10">
              {PROPERTY_TYPES.map((t) => (
                <Item key={t.id} label={t.label} note={TYPE_NOTES[t.id]} />
              ))}
            </ul>
          </Block>

          <Block
            id="positioning"
            title="Positioning"
            intro="Where the project sits on price. This axis decides creative volume, follow-up style and whether automation belongs on the first touch at all."
          >
            <ul className="grid sm:grid-cols-2 gap-x-10">
              {POSITIONS.map((p) => (
                <Item key={p.id} label={p.label} note={POSITION_NOTES[p.id]} />
              ))}
            </ul>
          </Block>

          <Block
            id="stages"
            title="Project stages"
            intro="The axis builders actually think in. Where a project sits in its lifecycle changes the work more than what is being sold."
          >
            <ul className="grid sm:grid-cols-2 gap-x-10">
              {STAGES.map((s) => (
                <Item key={s.id} label={s.label} note={STAGE_NOTES[s.id]} />
              ))}
            </ul>
          </Block>

          <Block
            id="services"
            title="Services"
            intro="Forty services across five pillars. Content and creative is not a sixth pillar. It is the input to all five."
          >
            {PILLARS.map((p) => (
              <div key={p.n} id={`pillar-${p.n}`} className="scroll-mt-28 mb-10">
                <div className="flex items-baseline gap-3 mb-1">
                  <span className="mono-label text-signal">{p.n}</span>
                  <h3 className="font-display text-xl text-ink">{p.name}</h3>
                </div>
                <ul className="grid sm:grid-cols-2 gap-x-10">
                  {(SERVICES[p.name] ?? []).map((s) => (
                    <Item key={s.item} label={s.item} note={s.note} />
                  ))}
                </ul>
                {DEEP_DIVES[p.name] && (
                  <p className="mt-4 flex flex-wrap gap-x-5 gap-y-2">
                    {DEEP_DIVES[p.name].map((d) => (
                      <Link key={d.href} href={d.href} className="nav-link mono-label text-signal">
                        {d.label} &rarr;
                      </Link>
                    ))}
                  </p>
                )}
              </div>
            ))}
          </Block>

          <Block
            id="segments"
            title="Buyer segments"
            intro="Who the campaign is actually aimed at. Getting this wrong is the most expensive targeting mistake, because the creative reads as written for someone else."
          >
            <ul className="grid sm:grid-cols-2 gap-x-10">
              {SEGMENTS.map((s) => (
                <Item key={s} label={s} note={SEGMENT_NOTES[s]} />
              ))}
            </ul>
          </Block>

          <Block
            id="geography"
            title="Geography"
            intro="How far a project's demand realistically travels. Most builders overestimate this, and the wasted spend is invisible until someone checks."
          >
            <ul className="grid sm:grid-cols-2 gap-x-10">
              {GEOGRAPHIES.map((g) => (
                <Item key={g.label} label={g.label} note={g.note} />
              ))}
            </ul>
          </Block>

          <section id="questions" className="scroll-mt-28">
            <h2 className="text-h2 font-display font-bold text-ink mb-6">Common questions</h2>
            <dl>
              {FAQS.map((f) => (
                <div key={f.question} className="border-t border-mist py-5">
                  <dt className="font-medium text-ink mb-2">{f.question}</dt>
                  <dd className="text-graphite leading-relaxed">{f.answer}</dd>
                </div>
              ))}
            </dl>
          </section>
        </div>
      </div>

      <CTABand />
    </>
  );
}
