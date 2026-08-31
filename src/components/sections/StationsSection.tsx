import { FadeIn } from "@/components/loop/ui";

const STATIONS = [
  {
    n: "01",
    name: "Creative Engine",
    body: "The ad is the targeting now. Fifteen to twenty distinct angles a month, fatigue monitored against frequency, and a refresh shipped before performance drops, not three weeks after.",
  },
  {
    n: "02",
    name: "Signal Layer",
    body: "Platforms optimise on what you feed them. Conversions API with proper deduplication, server-side GTM, consent mode, and offline conversions uploaded from your CRM every week.",
  },
  {
    n: "03",
    name: "Follow-Up Loop",
    body: "The lead is the start, not the deliverable. WhatsApp acknowledgement inside sixty seconds, qualification before your telecaller dials, and disposition data written back into the ad account.",
  },
  {
    n: "04",
    name: "Answer Visibility",
    body: "Buyers ask assistants now, not search boxes. Entity consistency, schema coverage, and a mention footprint on the sources those assistants actually cite.",
  },
  {
    n: "↩",
    name: "The Return",
    body: "Reporting that ends at cost per booking, not cost per lead. Closed deals flow back into targeting weekly, so the account learns your actual buyer instead of your form-filler.",
    isReturn: true,
  },
];

export function StationsSection() {
  return (
    <section
      id="what-we-run"
      className="bg-ink rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32"
    >
      <FadeIn y={40}>
        <h2
          className="font-display font-extrabold lowercase text-center leading-none track-display text-paper mb-16 sm:mb-20 md:mb-28"
          style={{ fontSize: "clamp(3rem, 12vw, 160px)" }}
        >
          what we run
        </h2>
      </FadeIn>

      <div className="max-w-5xl mx-auto">
        {/* 60ms stagger, not 100: five rows at 100ms leave the last one waiting
            half a second after the first, which reads as the page being slow. */}
        {STATIONS.map((s, i) => (
          <FadeIn key={s.n} delay={i * 0.06}>
            <div
              className="station-row flex items-start gap-6 sm:gap-10 py-8 sm:py-10 md:py-12"
              style={{
                borderTop: s.isReturn
                  ? "1px solid rgba(255, 138, 61, 0.4)"
                  : "1px solid rgba(239, 240, 236, 0.14)",
              }}
            >
              <span
                className="station-num font-display font-extrabold leading-none shrink-0"
                style={{
                  fontSize: "clamp(3rem, 10vw, 140px)",
                  color: s.isReturn ? "var(--pulse)" : "var(--paper)",
                  opacity: s.isReturn ? 1 : 0.22,
                }}
              >
                {s.n}
              </span>
              <div className="pt-2 sm:pt-4">
                <h3
                  className="font-medium uppercase mb-3"
                  style={{
                    fontSize: "clamp(1rem, 2.2vw, 2.1rem)",
                    color: s.isReturn ? "var(--pulse)" : "var(--paper)",
                  }}
                >
                  {s.name}
                </h3>
                <p
                  className="font-light leading-relaxed max-w-2xl text-paper/[0.62]"
                  style={{ fontSize: "clamp(0.85rem, 1.6vw, 1.25rem)" }}
                >
                  {s.body}
                </p>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
