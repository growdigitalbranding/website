import { RevealOnScroll } from "@/components/motion/RevealOnScroll";
import { CountUp } from "@/components/motion/CountUp";

const CASES = [
  {
    type: "Bengaluru luxury villas",
    before: 3400,
    after: 1180,
    intervention:
      "Rebuilt from Advantage+ self-competition into a clean 3-tier structure with weekly creative refresh.",
  },
  {
    type: "Coimbatore plotted development",
    before: 2100,
    after: 890,
    intervention:
      "Added CAPI + offline conversion upload so the platform stopped optimising toward tyre-kickers.",
  },
  {
    type: "Chennai mid-rise apartments",
    before: 4200,
    after: 1650,
    intervention:
      "Sub-60s WhatsApp acknowledgement plus a qualification flow before telecaller dial, cutting no-show site visits in half.",
  },
];

export function Proof() {
  return (
    <section id="proof" className="py-20 md:py-28 bg-paper">
      <div className="mx-auto max-w-[1440px] px-6">
        <p className="mono-label text-graphite mb-3">PROOF</p>
        <h2 className="text-h2 font-display font-bold mb-12 max-w-xl">
          Numbers we're not embarrassed to publish.
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {CASES.map((c, i) => (
            <RevealOnScroll key={c.type} delay={i * 0.08}>
              <div className="border border-mist rounded-2xl p-6 h-full flex flex-col bg-paper-2">
                <p className="mono-label text-graphite mb-4">{c.type}</p>
                <div className="flex items-baseline gap-3 font-mono mb-4">
                  <span className="text-flag text-lg line-through">
                    ₹<CountUp to={c.before} />
                  </span>
                  <span className="text-graphite">→</span>
                  <span className="text-signal text-2xl">
                    ₹<CountUp to={c.after} />
                  </span>
                </div>
                <p className="text-sm text-graphite">{c.intervention}</p>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
