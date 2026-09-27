import type { Metadata } from "next";
import Link from "@/components/Link";
import { pageMeta } from "@/lib/seo";
import { BreadcrumbSchema } from "@/components/BreadcrumbSchema";
import { PageHero } from "@/components/PageHero";
import { SourceList } from "@/components/SourceList";
import { EnquirySection, TrainingLink } from "@/components/training/TrainingTemplate";
import { AUDIENCES } from "@/data/training";
import { ORG_ID, faqJsonLd } from "@/lib/schema/jsonld";

/**
 * Career guide for trainees. Owns "careers in digital marketing" and "digital
 * marketing jobs for freshers" for the training cluster.
 *
 * No salary figures on purpose. Pay varies by city, company and role, most
 * published "average salary" numbers are unsourced, and a course site quoting
 * one is selling the course with it. Instead the page teaches the method for
 * finding the current range from live job listings, which stays true.
 *
 * Revalidated hourly only because the enquiry form's batch labels carry the
 * next start dates.
 */
export const revalidate = 3600;

const PATH = "/training/careers-in-digital-marketing";
const TITLE = "Careers in digital marketing: a guide for trainees";
const DESCRIPTION =
  "The digital marketing roles you can apply for after training, the skills each needs, how AI is changing them, how to research pay, and what to put in a portfolio.";
const DATE = "2026-09-27";

const ROLES = [
  {
    role: "Performance marketer (paid ads)",
    does: "Plans, launches and optimises paid campaigns on Meta and Google, and is judged on the cost of a result: a lead, a sale, a booking.",
    skills: "Campaign structure, audiences, budgets, creative testing, reading reports, basic tracking.",
    show: "A live campaign you ran: the objective, the setup, the numbers, and the change you made because of them.",
  },
  {
    role: "SEO and AI search specialist",
    does: "Gets a business found in Google and in AI assistants: keyword research, page content, technical fixes, Google Business Profile, and making pages easy for AI answers to quote.",
    skills: "Keyword research, writing, Search Console, site structure, structured data basics.",
    show: "A page you wrote or improved, what it targeted, and what Search Console showed before and after.",
  },
  {
    role: "Content and social media executive",
    does: "Produces and schedules posts, reels and ad creative, increasingly with AI tools, and manages the brand's social accounts.",
    skills: "Copywriting, design basics, AI image and video tools, platform formats, a content calendar.",
    show: "A month's content plan and the posts you produced for it, with the prompt and the edit side by side.",
  },
  {
    role: "Marketing analyst / tracking specialist",
    does: "Makes sure the numbers are right: pixels, conversion tracking, Google Analytics 4, Tag Manager and reports that tell the team what to change.",
    skills: "GA4, Google Tag Manager, Meta pixel and Conversions API, spreadsheets.",
    show: "A tracking setup you built or fixed, and a one-page report that ends in a recommendation.",
  },
  {
    role: "CRM and marketing automation executive",
    does: "Handles what happens after the lead: WhatsApp and email follow-up, lead routing and simple automation so no enquiry is left unanswered.",
    skills: "WhatsApp Business, CRM basics, message writing, automation tools.",
    show: "A follow-up sequence you designed, with the reason for each message and its timing.",
  },
  {
    role: "Freelancer",
    does: "Does any of the above for small businesses directly, usually starting with social media and local ads.",
    skills: "All of the basics, plus pricing, proposals and explaining results to a client who is not a marketer.",
    show: "One or two small clients with a clear before-and-after, and a simple package with a price.",
  },
] as const;

const FAQS = [
  {
    question: "Can I get a digital marketing job without a marketing degree?",
    answer:
      "Yes. Most digital marketing roles hire on demonstrated skill rather than the degree. What an interviewer wants to see is work you did and can explain, which is why a live project and a portfolio matter more than the certificate itself.",
  },
  {
    question: "How much does a digital marketing fresher earn in Coimbatore?",
    answer:
      "It varies too much by company and role for a single honest number, and most figures quoted online are not sourced. Use the method on this page: collect twenty current listings for your target role and city on job portals, note the ranges that are disclosed, and take the middle of them. That gives you a figure that is current and specific to what you are applying for.",
  },
  {
    question: "Are Google and Meta certifications worth getting?",
    answer:
      "They are worth having, not worth relying on. Google's foundational certifications through Skillshop are free, and Meta's Certified Digital Marketing Associate exam is aimed at entry-level marketers including students and job seekers. They show an employer you know the platforms' terms and rules. Your portfolio shows you can get results with them.",
  },
  {
    question: "Will AI replace digital marketing jobs?",
    answer:
      "It is replacing tasks rather than roles: first drafts, variations, basic reports and much of the manual bid and audience work, which the platforms now automate. What remains is judgment: deciding what to test, spotting when the automation is optimising for the wrong thing, and explaining results. Trainees who learn to use AI and check its output are better placed, not worse.",
  },
] as const;

const articleJsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: TITLE,
  description: DESCRIPTION,
  url: `https://growdigitalbranding.com${PATH}`,
  datePublished: DATE,
  dateModified: DATE,
  inLanguage: "en-IN",
  author: { "@id": ORG_ID },
  publisher: { "@id": ORG_ID },
};

export const metadata: Metadata = pageMeta({ path: PATH, title: TITLE, description: DESCRIPTION });

export default function Page() {
  return (
    <>
      <BreadcrumbSchema path={PATH} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd([...FAQS])) }}
      />

      <PageHero
        variant="split"
        eyebrow="TRAINING / CAREERS"
        title="Careers in digital marketing: a guide for trainees"
        subtitle="What the jobs actually are, what each one needs you to show, and how to find out what they pay without trusting a number someone made up."
      />

      <article className="mx-auto max-w-3xl px-6 py-16 flex flex-col gap-14">
        <div className="border-l-2 pl-5 md:pl-6" style={{ borderColor: "var(--signal)" }}>
          <p className="mono-label text-signal mb-3">The short answer</p>
          <p className="text-lg md:text-xl text-ink">
            Digital marketing splits into a handful of jobs: paid ads, SEO and AI search, content
            and social, analytics and tracking, CRM and automation, and freelancing across all of
            them. Entry-level hiring in every one of them turns on the same thing: work you did and
            can explain. So the fastest route in is to pick a role, build the one portfolio piece
            that role looks for, add the free platform certifications, and research pay from live
            job listings rather than from averages quoted online.
          </p>
        </div>

        <section className="flex flex-col gap-6">
          <h2 className="text-h3 font-display font-bold">
            Which digital marketing jobs can you apply for after training?
          </h2>
          <div className="flex flex-col">
            {ROLES.map((r) => (
              <div key={r.role} className="border-t border-mist py-6 flex flex-col gap-3">
                <h3 className="font-display font-bold text-xl">{r.role}</h3>
                <p className="text-lg text-graphite">{r.does}</p>
                <dl className="grid gap-2 sm:grid-cols-[9rem_1fr] text-graphite">
                  <dt className="mono-label pt-1">Skills</dt>
                  <dd>{r.skills}</dd>
                  <dt className="mono-label pt-1">Show them</dt>
                  <dd>{r.show}</dd>
                </dl>
              </div>
            ))}
          </div>
        </section>

        <section className="flex flex-col gap-4">
          <h2 className="text-h3 font-display font-bold">How is AI changing these roles?</h2>
          <p className="text-lg text-graphite">
            The tasks a junior marketer used to spend the day on, writing ten versions of an ad,
            resizing creative, pulling a weekly report, are now minutes of work with AI tools. Meta
            and Google have also automated much of the targeting and bidding through Advantage+ and
            Performance Max. That removes the busywork, not the job.
          </p>
          <p className="text-lg text-graphite">
            What employers now look for in a fresher is the layer on top: can you tell a good AI
            draft from a bad one, can you spot when an automated campaign is chasing cheap leads
            that never buy, and can you explain what the numbers mean to someone who is not a
            marketer? A new area has opened up too: getting a business named in AI answers from
            ChatGPT, Gemini and Google&apos;s AI Overviews, which few working marketers have learned
            yet.
          </p>
        </section>

        <section className="flex flex-col gap-4">
          <h2 className="text-h3 font-display font-bold">
            How do you find out what a digital marketing job pays?
          </h2>
          <p className="text-lg text-graphite">
            We do not quote salary figures, because an honest one depends on the role, the company
            and the city, and most averages published online have no source. This method gives you a
            current, specific range in about an hour:
          </p>
          <ol className="flex flex-col gap-3 list-decimal pl-6 text-lg text-graphite marker:font-mono marker:text-signal">
            <li>
              Pick one role title from the list above and your city, for example &ldquo;performance
              marketing executive, Coimbatore&rdquo;.
            </li>
            <li>
              Search it on two or three job portals, such as Naukri, LinkedIn Jobs and Indeed,
              filtered to 0–1 years of experience.
            </li>
            <li>
              Collect twenty current listings. Note the pay range where one is disclosed and skip
              the ones that do not disclose.
            </li>
            <li>
              Take the middle of the disclosed ranges. That is a realistic starting figure for that
              role, in that city, this month.
            </li>
            <li>
              Repeat for one role you might grow into in two or three years, so you know where the
              path leads, and note which skills those listings ask for that the junior ones do not.
            </li>
          </ol>
        </section>

        <section className="flex flex-col gap-4">
          <h2 className="text-h3 font-display font-bold">What should a fresher&apos;s portfolio include?</h2>
          <ul className="flex flex-col gap-3">
            {[
              "One live project, written up on a single page: the business, the goal, what you set up, the numbers, and what you would change.",
              "Screenshots of the actual work: the campaign setup, the ads, the report. Blur anything the client would not want public.",
              "One piece of content you produced with AI, shown next to the raw AI draft, so the interviewer sees your judgment and not just the tool.",
              "Your certifications, listed briefly at the end rather than at the top.",
              "A short note on what you are learning next. It shows you know the field keeps moving.",
            ].map((item) => (
              <li key={item} className="border-t border-mist pt-3 text-lg text-graphite">
                {item}
              </li>
            ))}
          </ul>
        </section>

        <section className="flex flex-col gap-4">
          <h2 className="text-h3 font-display font-bold">Which certifications should you get?</h2>
          <p className="text-lg text-graphite">
            Start with the platforms&apos; own. Google&apos;s Skillshop offers Google Ads
            certifications; the foundational ones are free, and each needs a score of 80% or more
            on the assessment. Meta offers the Meta Certified Digital Marketing Associate, a 90-minute
            exam aimed at entry-level marketers, including students and job seekers, with free
            preparation courses on Meta Blueprint; check Meta&apos;s page for the current exam fee.
          </p>
          <p className="text-lg text-graphite">
            Our course prepares you for both, and gives its own certificate of completion. Be clear
            about what each certificate proves: that you know the platform. The portfolio is what
            proves you can use it.
          </p>
        </section>

        <section className="flex flex-col gap-4">
          <h2 className="text-h3 font-display font-bold">Is freelancing a realistic start?</h2>
          <p className="text-lg text-graphite">
            It can be, if you start small and local. Most freelancers begin with a shop, a clinic or
            a home business they already know, run its social media and a small local ad budget,
            and use the result to win the next client. Price a simple monthly package, agree in
            writing what it includes, and report results every month in plain language. Many
            trainees combine a job with one or two freelance clients rather than choosing between
            them.
          </p>
        </section>

        <section className="flex flex-col gap-10">
          {FAQS.map((f) => (
            <div key={f.question}>
              <h2 className="text-h3 font-display font-bold mb-4">{f.question}</h2>
              <p className="text-lg text-graphite">{f.answer}</p>
            </div>
          ))}
        </section>

        <section className="border-t border-mist pt-10 flex flex-col gap-4">
          <h2 className="text-h3 font-display font-bold">Where does the training fit?</h2>
          <p className="text-lg text-graphite">
            Our{" "}
            <Link href="/training" className="text-signal hover:underline">
              AI digital marketing course in Coimbatore
            </Link>{" "}
            is built around this guide: four weeks, a live project for your portfolio, placement
            assistance, and an internship with us for trainees who do well.
          </p>
          <ul className="flex flex-col gap-3">
            {AUDIENCES.map((a) => (
              <li key={a.slug}>
                <TrainingLink href={a.path} label={a.title} note={a.subtitle} />
              </li>
            ))}
          </ul>
        </section>

        <EnquirySection source="training-careers" audience="Careers guide" />

        <SourceList
          keys={[
            "googleAdsCertification",
            "skillshopCertifications",
            "metaCertification",
            "metaDigitalMarketingAssociate",
          ]}
          className="border-t border-mist pt-10"
        />
      </article>
    </>
  );
}
