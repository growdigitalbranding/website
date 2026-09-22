import type { Metadata } from "next";
import Link from "next/link";
import { pageMeta } from "@/lib/seo";
import { PageHero, CTABand } from "@/components/PageHero";
import { FurtherReading } from "@/components/FurtherReading";
import { CASES } from "@/data/cases";

export const metadata: Metadata = pageMeta({
  path: "/work",
  title: "Work",
  description:
    "We do not publish client dashboards. Here is what each engagement actually changed, what you can check on a call, and what you get in writing.",
});

/**
 * /work without inventing case studies.
 *
 * The page was 81 words of "case studies, in progress" sitting in the main
 * nav, which is the page a builder opens before deciding whether to call. It
 * could not be filled the obvious way: client spend, CPL and campaign names
 * sit under a confidentiality duty, and a fabricated dashboard is worse than
 * an empty page because it is the exact thing this business tells clients to
 * distrust.
 *
 * What is publishable is our own diagnosis and our own build. The chains come
 * from src/data/cases.ts, the same source the homepage proof section renders,
 * and carry no spend, no cost per lead and no campaign names. A structure is
 * evidence of competence in a way an unverifiable number is not.
 *
 * The numeric case metrics in that file stay gated behind `verified` and are
 * deliberately not rendered here.
 */

/** What an engagement actually hands over. Concrete, and none of it a metric. */
const ARTEFACTS = [
  {
    title: "The audit, written down",
    body: "Every finding from the first two weeks, in one document: what the account structure is doing, what the tracking is and is not sending, where leads are being lost between the form and the phone. Yours to keep whether or not you engage us.",
  },
  {
    title: "A tracking specification",
    body: "The events, the parameters, the server-side setup and the offline upload schedule, specified rather than described. Provisioned under your own Business Manager and Google account from day one, so it does not leave with us.",
  },
  {
    title: "A creative pipeline, not a folder",
    body: "A running angle list, a shoot bank, and a defined refresh cadence with kill rules agreed before anyone is attached to a creative. The volume arithmetic is public if you want to check ours.",
  },
  {
    title: "Weekly reporting on cost per booking",
    body: "Cost per lead is on the report because you will ask for it. It is not the headline. The headline is the number that survives the whole funnel, and the five rates underneath it.",
  },
];

/** What a caller can put on a screen, in order of how quickly it settles it. */
const CHECKABLE = [
  "A live ad account, screen-shared, with the structure and the offline conversion uploads visible rather than described.",
  "The tracking setup on this site, which runs the same stack we would build for you and is documented at /tracking-setup.",
  "A named reference, once that client has agreed to be named. We ask; we do not assume.",
  "The arithmetic behind any claim we make, because all of it is published and none of it depends on trusting us.",
];

export default function WorkPage() {
  return (
    <>
      <PageHero
        eyebrow="WORK"
        title="What we can show you, and what we can't."
        subtitle="We do not publish client dashboards. Spend, cost per lead and campaign names belong to the client, not to our marketing. What follows is the part that is ours to publish: what each account looked like when we found it, and what we rebuilt it into."
      />

      <article className="mx-auto max-w-3xl px-6 pb-16 flex flex-col gap-16">
        <section className="flex flex-col gap-4">
          <h2 className="text-h3 font-display font-bold text-ink">
            Why there are no screenshots on this page
          </h2>
          <p className="text-lg text-graphite">
            A cropped dashboard proves nothing. Anyone can crop a dashboard, the
            date range is whatever the agency chose, and the account it came from
            is unnamed by necessity. We spend our working lives telling builders
            not to accept unverifiable numbers, so publishing our own would be an
            odd way to open.
          </p>
          <p className="text-lg text-graphite">
            The alternative is not to ask for trust. It is to make every claim
            checkable: structures we can walk you through, arithmetic we have
            published in full, and a live account on a call.
          </p>
        </section>

        <section className="flex flex-col gap-8">
          <div className="flex flex-col gap-3">
            <h2 className="text-h3 font-display font-bold text-ink">
              Three engagements, as structures
            </h2>
            <p className="text-lg text-graphite">
              What we found, and what we built in its place. No spend, no cost per
              lead, no campaign names, because those are the client&apos;s. The
              shape of the problem is ours to describe, and it is usually the part
              that transfers.
            </p>
          </div>

          <ol className="flex flex-col gap-10">
            {CASES.map((c) => (
              <li
                key={c.n}
                className="flex flex-col gap-5 border border-mist rounded-2xl p-6 bg-paper-2"
              >
                <div className="flex flex-col gap-1">
                  <p className="mono-label text-signal">
                    {c.n} · {c.category}
                  </p>
                  <p className="font-display font-bold text-ink text-lg">{c.client}</p>
                  <p className="mono-label text-graphite">{c.meta}</p>
                </div>

                <p className="text-graphite">{c.intervention}</p>

                <dl className="flex flex-col gap-4">
                  <div className="flex flex-col gap-1.5">
                    <dt className="mono-label" style={{ color: "var(--pulse-ink)" }}>
                      Found
                    </dt>
                    <dd className="font-mono text-sm text-graphite">
                      {c.found.map((l) => (l.broken ? `✕ ${l.label}` : l.label)).join("  →  ")}
                    </dd>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <dt className="mono-label text-signal">Built</dt>
                    <dd className="font-mono text-sm text-ink">
                      {c.built.map((l) => l.label).join("  →  ")}
                    </dd>
                  </div>
                </dl>
              </li>
            ))}
          </ol>

          <p className="text-sm text-graphite">
            Figures for each of these exist and are checkable against a live
            account on a call. They are not printed here, and they will not appear
            on this site until a client has agreed to them being published.
          </p>
        </section>

        <section className="flex flex-col gap-6">
          <h2 className="text-h3 font-display font-bold text-ink">
            What you can check, on a 30-minute call
          </h2>
          <ul className="flex flex-col gap-3">
            {CHECKABLE.map((c) => (
              <li key={c} className="text-lg text-graphite flex gap-3">
                <span aria-hidden="true" className="text-signal shrink-0 select-none">
                  /
                </span>
                <span>{c}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="flex flex-col gap-6">
          <div className="flex flex-col gap-3">
            <h2 className="text-h3 font-display font-bold text-ink">
              What an engagement produces
            </h2>
            <p className="text-lg text-graphite">
              Four things exist in writing by the end of the first month, and all
              four are yours regardless of what happens afterwards.
            </p>
          </div>
          <dl className="flex flex-col gap-7">
            {ARTEFACTS.map((a) => (
              <div key={a.title} className="flex flex-col gap-2">
                <dt className="font-display font-bold text-ink text-lg">{a.title}</dt>
                <dd className="text-graphite">{a.body}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="flex flex-col gap-4 border-t border-mist pt-10">
          <h2 className="text-h3 font-display font-bold text-ink">
            If you would rather judge the thinking than the testimonials
          </h2>
          <p className="text-lg text-graphite">
            Everything we would do on your account is written up, with the
            arithmetic shown, on{" "}
            <Link href="/insights" className="text-signal hover:underline">
              insights
            </Link>
            . It is a slower way to evaluate an agency and a considerably more
            reliable one.
          </p>
        </section>

        <FurtherReading
          label="Start here"
          slugs={[
            "good-cost-per-lead-real-estate",
            "channel-partner-vs-direct-leads",
            "speed-to-lead-real-estate",
          ]}
        />
      </article>

      <CTABand />
    </>
  );
}
