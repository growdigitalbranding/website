import Link from "next/link";
import { BreadcrumbSchema } from "@/components/BreadcrumbSchema";
import { PageHero } from "@/components/PageHero";
import { SourceList } from "@/components/SourceList";
import { BatchSchedule, batchOptions } from "@/components/training/BatchSchedule";
import { Curriculum, Support } from "@/components/training/ProgrammeDetails";
import { TrainingEnquiry } from "@/components/training/TrainingEnquiry";
import { AUDIENCES, COMMON_FAQS, PROGRAMME, type Audience } from "@/data/training";
import { courseJsonLd } from "@/lib/schema/course";
import { faqJsonLd } from "@/lib/schema/jsonld";

/** Hero facts. Every value comes from PROGRAMME; nothing here is typed twice. */
export const PROGRAMME_META = [
  { label: "Fee", value: PROGRAMME.feeLabel },
  { label: "Duration", value: PROGRAMME.duration },
  { label: "Batch size", value: `${PROGRAMME.batchSize} max` },
  { label: "Format", value: `Classroom, ${PROGRAMME.city}` },
];

/** Short labels for enquiry records and cross-links. */
const AUDIENCE_LABEL: Record<string, string> = {
  students: "Students",
  "job-switchers": "Job switchers",
  "business-owners": "Business owners",
  housewives: "Housewives and homemakers",
};

export function audienceLabel(slug: string) {
  return AUDIENCE_LABEL[slug] ?? slug;
}

/**
 * One audience page. The programme is identical for every audience (same
 * fee, batches and curriculum); what changes is the argument: why this
 * reader, which batch fits their week, and the questions they actually ask.
 */
export function TrainingTemplate({ audience }: { audience: Audience }) {
  const faqs = [...audience.faqs, ...COMMON_FAQS];
  const others = AUDIENCES.filter((a) => a.slug !== audience.slug);

  return (
    <>
      <BreadcrumbSchema path={audience.path} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            courseJsonLd({
              path: audience.path,
              description: audience.description,
              audience: audienceLabel(audience.slug),
            })
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(faqs)) }}
      />

      <PageHero
        // Not "ink": that variant lowercases the H1, which turns "AI" into "ai".
        variant="split"
        eyebrow={audience.eyebrow}
        title={audience.h1}
        subtitle={audience.subtitle}
        meta={PROGRAMME_META}
      />

      <article className="mx-auto max-w-3xl px-6 py-16 flex flex-col gap-14">
        <div className="border-l-2 pl-5 md:pl-6" style={{ borderColor: "var(--signal)" }}>
          <p className="mono-label text-signal mb-3">The short answer</p>
          <p className="text-lg md:text-xl text-ink">{audience.answer}</p>
          <a href="#enquire" className="inline-block mt-5 text-signal font-medium hover:underline">
            Enquire about the next batch →
          </a>
        </div>

        <BatchSchedule />

        <section className="surface rounded-card p-6">
          <p className="mono-label text-graphite mb-3">WHICH BATCH SUITS YOU</p>
          <p className="text-lg">{audience.batchAdvice}</p>
        </section>

        {audience.sections.map((sec) => (
          <section key={sec.heading} className="flex flex-col gap-4">
            <h2 className="text-h3 font-display font-bold">{sec.heading}</h2>
            {sec.body.map((para, i) => (
              <p key={i} className="text-lg text-graphite">
                {para}
              </p>
            ))}
          </section>
        ))}

        <section>
          <h2 className="text-h3 font-display font-bold mb-4">
            What will you be able to do after four weeks?
          </h2>
          <ul className="flex flex-col gap-3">
            {audience.outcomes.map((o) => (
              <li key={o} className="border-t border-mist pt-3 text-lg text-graphite">
                {o}
              </li>
            ))}
          </ul>
        </section>

        <Curriculum />
        <Support />

        <EnquirySection source={`training-${audience.slug}`} audience={audienceLabel(audience.slug)} />

        <section className="flex flex-col gap-10">
          {faqs.map((f) => (
            <div key={f.question}>
              <h2 className="text-h3 font-display font-bold mb-4">{f.question}</h2>
              <p className="text-lg text-graphite">{f.answer}</p>
            </div>
          ))}
        </section>

        <section className="border-t border-mist pt-10 flex flex-col gap-4">
          <h2 className="text-h3 font-display font-bold">Who else takes this course?</h2>
          <ul className="flex flex-col gap-3">
            {others.map((a) => (
              <li key={a.slug}>
                <TrainingLink href={a.path} label={a.title} note={a.subtitle} />
              </li>
            ))}
            <li>
              <TrainingLink
                href="/training/careers-in-digital-marketing"
                label="Careers in digital marketing: a guide for trainees"
                note="The roles, the skills each one needs, and how to research pay and build a portfolio."
              />
            </li>
          </ul>
        </section>

        <SourceList keys={audience.sources ?? []} className="border-t border-mist pt-10" />
      </article>
    </>
  );
}

export function EnquirySection({ source, audience }: { source: string; audience: string }) {
  return (
    <section id="enquire" className="scroll-mt-24 flex flex-col gap-5">
      <div>
        <h2 className="text-h3 font-display font-bold mb-2">Enquire about a seat</h2>
        <p className="text-lg text-graphite">
          {PROGRAMME.batchSize} seats per batch. Leave your number and we will send the timings,
          the location and how many seats are left.
        </p>
      </div>
      <TrainingEnquiry source={source} audience={audience} options={batchOptions()} />
    </section>
  );
}

export function TrainingLink({ href, label, note }: { href: string; label: string; note: string }) {
  return (
    <Link
      href={href}
      className="press group flex flex-col gap-1 border-l-2 border-mist hover:border-signal pl-4 transition-colors"
    >
      <span className="text-lg text-ink group-hover:text-signal transition-colors">{label}</span>
      <span className="text-sm text-graphite">{note}</span>
    </Link>
  );
}
