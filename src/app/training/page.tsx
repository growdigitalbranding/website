import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { BreadcrumbSchema } from "@/components/BreadcrumbSchema";
import { PageHero } from "@/components/PageHero";
import { BatchSchedule } from "@/components/training/BatchSchedule";
import { Curriculum, Support } from "@/components/training/ProgrammeDetails";
import {
  EnquirySection,
  PROGRAMME_META,
  TrainingLink,
} from "@/components/training/TrainingTemplate";
import { AUDIENCES, COMMON_FAQS, PROGRAMME } from "@/data/training";
import { courseJsonLd } from "@/lib/schema/course";
import { faqJsonLd } from "@/lib/schema/jsonld";

/**
 * The training hub. Owns "AI digital marketing course in Coimbatore" and
 * "digital marketing course in Coimbatore"; the four audience pages each own
 * the "... for <audience>" variant and link back here.
 *
 * Regenerated hourly so the next batch dates stay current.
 */
export const revalidate = 3600;

const DESCRIPTION =
  "A 4-week classroom AI digital marketing course in Coimbatore: Meta and Google ads, SEO and AI search, a live project on a real account. ₹20,000, 8 per batch.";

export const metadata: Metadata = pageMeta({
  path: "/training",
  title: "AI digital marketing course in Coimbatore",
  description: DESCRIPTION,
});

export default function Page() {
  return (
    <>
      <BreadcrumbSchema path="/training" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(courseJsonLd({ path: "/training", description: DESCRIPTION })),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd([...COMMON_FAQS])) }}
      />

      <PageHero
        variant="split"
        eyebrow="TRAINING"
        title="AI digital marketing course in Coimbatore"
        subtitle="Four weeks in a classroom with the team that runs campaigns for a living. You learn the tools, then you use them on a live account, with someone checking your work."
        meta={PROGRAMME_META}
      />

      <article className="mx-auto max-w-3xl px-6 py-16 flex flex-col gap-14">
        <div className="border-l-2 pl-5 md:pl-6" style={{ borderColor: "var(--signal)" }}>
          <p className="mono-label text-signal mb-3">The short answer</p>
          <p className="text-lg md:text-xl text-ink">
            {PROGRAMME.name} is a four-week classroom course in {PROGRAMME.city}, run by
            growdigitalbranding, a performance marketing agency. It teaches digital marketing the
            way it is practised now, with AI tools built into every stage: Meta and Google ads, SEO
            and AI search, content, analytics and WhatsApp follow-up. It ends with a supervised
            project on a live account. The fee is {PROGRAMME.feeLabel}, batches are capped at{" "}
            {PROGRAMME.batchSize}, and there is a weekday batch ({PROGRAMME.batches.weekday.hoursPerDay}{" "}
            hours a day) and a weekend batch ({PROGRAMME.batches.weekend.hoursPerDay} hours a day)
            starting every month.
          </p>
          <a href="#enquire" className="inline-block mt-5 text-signal font-medium hover:underline">
            Enquire about the next batch →
          </a>
        </div>

        <BatchSchedule />

        <section className="flex flex-col gap-4">
          <h2 className="text-h3 font-display font-bold">Who is the course for?</h2>
          <p className="text-lg text-graphite">
            The programme is the same for everyone. What differs is why you are taking it and which
            batch fits your week, so each group has its own page.
          </p>
          <ul className="flex flex-col gap-3 mt-2">
            {AUDIENCES.map((a) => (
              <li key={a.slug}>
                <TrainingLink href={a.path} label={a.title} note={a.subtitle} />
              </li>
            ))}
          </ul>
        </section>

        <section className="flex flex-col gap-4">
          <h2 className="text-h3 font-display font-bold">
            Why learn from an agency rather than an institute?
          </h2>
          <p className="text-lg text-graphite">
            Because the live project needs live accounts. We run Meta and Google campaigns for
            businesses every day, so trainees work on real campaigns under supervision instead of a
            dummy account, and they learn the parts a syllabus usually skips: why a campaign with a
            cheap cost per lead can still fail, how tracking breaks, and what to do on the day the
            numbers go wrong.
          </p>
          <p className="text-lg text-graphite">
            It is also why the batch is capped at {PROGRAMME.batchSize}. Reviewing every
            trainee&apos;s work on a real account takes time, and a room of forty makes that
            impossible.
          </p>
        </section>

        <Curriculum />
        <Support />

        <EnquirySection source="training-hub" audience="General" />

        <section className="flex flex-col gap-10">
          {COMMON_FAQS.map((f) => (
            <div key={f.question}>
              <h2 className="text-h3 font-display font-bold mb-4">{f.question}</h2>
              <p className="text-lg text-graphite">{f.answer}</p>
            </div>
          ))}
        </section>

        <section className="border-t border-mist pt-10 flex flex-col gap-4">
          <h2 className="text-h3 font-display font-bold">Thinking about the career first?</h2>
          <TrainingLink
            href="/training/careers-in-digital-marketing"
            label="Careers in digital marketing: a guide for trainees"
            note="The roles, the skills each one needs, how AI is changing them, and how to research pay and build a portfolio."
          />
        </section>
      </article>
    </>
  );
}
