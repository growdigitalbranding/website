import { FadeIn } from "@/components/loop/ui";

/**
 * The first sixty seconds after a form fill.
 *
 * Follow-up is the capability builders are most sceptical of and the one the
 * site asserted without ever showing. This is the mechanism drawn as a
 * mechanism: a labelled sequence, not a mocked-up phone screen. A fabricated
 * WhatsApp screenshot would be the same failure as a fabricated dashboard, and
 * a builder who runs a telecalling team reads a process diagram faster than a
 * picture of one anyway.
 *
 * Timings are the design target of the flow, which is a claim about how it is
 * built rather than a result achieved on any account.
 */

type Step = {
  t: string;
  title: string;
  body: string;
  actor: "system" | "human";
};

const STEPS: Step[] = [
  {
    t: "0s",
    title: "Form fill lands",
    body: "The lead hits the CRM and the server-side event fires at the same moment, so the platform learns from it whether or not the browser cooperated.",
    actor: "system",
  },
  {
    t: "< 60s",
    title: "WhatsApp acknowledgement",
    body: "An automated message goes out on the number they entered, while the project is still open in another tab. Not a thank-you page. A conversation.",
    actor: "system",
  },
  {
    t: "2–10 min",
    title: "Qualification before dial",
    body: "Budget, timeline and location answered in chat. The telecaller opens the conversation already knowing which of the three the lead is weak on.",
    actor: "system",
  },
  {
    t: "Same day",
    title: "Telecaller calls with context",
    body: "A dial into a warm chat, not a cold number. Call outcome written back to the CRM against the same lead record.",
    actor: "human",
  },
  {
    t: "Weekly",
    title: "Outcomes uploaded to the ad account",
    body: "Site visits and bookings go back to Meta and Google as offline conversions, so the algorithm optimises toward buyers instead of form-fillers.",
    actor: "system",
  },
];

export function FollowUpFlowSection() {
  return (
    <section
      id="follow-up"
      aria-labelledby="followup-heading"
      className="bg-paper px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32"
    >
      <div className="max-w-5xl mx-auto">
        <FadeIn y={24}>
          <p className="mono-label text-graphite mb-5">The follow-up loop, in full</p>
          <h2
            id="followup-heading"
            className="font-display font-extrabold lowercase leading-[0.95] track-display"
            style={{ fontSize: "clamp(2rem, 6vw, 4.5rem)" }}
          >
            what happens in the first minute.
          </h2>
          <p className="text-graphite leading-[1.6] mt-5 max-w-[56ch] text-base sm:text-lg">
            Every agency says they do follow-up. This is the sequence we build, start to
            finish, and the part most accounts are missing is the first sixty seconds.
          </p>
        </FadeIn>

        <ol className="mt-12 sm:mt-16">
          {STEPS.map((s, i) => (
            <FadeIn key={s.title} y={18} delay={0.06 * i}>
              <li className="relative grid gap-3 sm:gap-6 sm:grid-cols-[88px_1fr] py-6 border-t border-mist">
                <div className="flex sm:block items-baseline gap-3">
                  <span className="font-mono text-base sm:text-lg text-ink whitespace-nowrap">
                    {s.t}
                  </span>
                  <span
                    className="mono-label block sm:mt-1.5"
                    style={{
                      color: s.actor === "human" ? "var(--pulse-ink)" : "var(--signal)",
                    }}
                  >
                    {s.actor === "human" ? "Person" : "Automated"}
                  </span>
                </div>
                <div className="min-w-0">
                  <h3 className="font-display font-bold text-lg sm:text-xl leading-tight">
                    {s.title}
                  </h3>
                  <p className="text-graphite leading-[1.6] mt-1.5 max-w-[62ch] text-sm sm:text-base">
                    {s.body}
                  </p>
                </div>
              </li>
            </FadeIn>
          ))}
        </ol>

        {/* Said plainly rather than left to be inferred: these are the targets
            the flow is built to, not a result measured on an account. */}
        <FadeIn y={16} delay={0.4}>
          <p className="mono-label text-graphite mt-8 leading-[1.9] max-w-[60ch]">
            Timings above are what the flow is built to hit, not an average across
            accounts. What it does on yours depends on your CRM and your sales team.
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
