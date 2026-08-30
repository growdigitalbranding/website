import { RevealOnScroll } from "@/components/motion/RevealOnScroll";
import { CountUp } from "@/components/motion/CountUp";

const LEAD = {
  type: "Bengaluru luxury villas",
  before: 3400,
  after: 1180,
  window: "6 weeks, flat spend",
  intervention:
    "Rebuilt from Advantage+ self-competition into a clean 3-tier structure with weekly creative refresh.",
};

const REST = [
  {
    type: "Coimbatore plotted development",
    before: 2100,
    after: 890,
    intervention:
      "Added CAPI and offline conversion upload, so the platform stopped optimising toward tyre-kickers.",
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
        <h2 className="text-h2 font-display font-bold mb-4 max-w-xl">
          Numbers we&apos;re not embarrassed to publish.
        </h2>
        <p className="text-graphite max-w-xl mb-12">
          Cost per lead, before and after. Every figure is from a managed account.
        </p>

        {/* Lead case gets the weight; the other two sit as hairline rows beside
            it. Three identical cards would flatten the hierarchy. */}
        <div className="grid lg:grid-cols-5 gap-x-12 gap-y-10 items-start">
          <RevealOnScroll className="lg:col-span-3">
            <div className="border-t-2 border-signal pt-8">
              <p className="mono-label text-graphite mb-6">{LEAD.type}</p>
              <div className="flex items-baseline gap-4 font-mono mb-6 flex-wrap">
                <span className="text-flag text-2xl line-through decoration-1">
                  ₹<CountUp to={LEAD.before} />
                </span>
                <span className="text-graphite text-2xl">→</span>
                <span className="text-signal text-5xl md:text-6xl">
                  ₹<CountUp to={LEAD.after} />
                </span>
              </div>
              <p className="mono-label text-graphite mb-4">{LEAD.window}</p>
              <p className="text-lg text-graphite max-w-md">{LEAD.intervention}</p>
            </div>
          </RevealOnScroll>

          <div className="lg:col-span-2 flex flex-col">
            {REST.map((c, i) => (
              <RevealOnScroll key={c.type} delay={0.08 * (i + 1)}>
                <div className="border-t border-mist py-6">
                  <p className="mono-label text-graphite mb-3">{c.type}</p>
                  <div className="flex items-baseline gap-3 font-mono mb-3">
                    <span className="text-flag line-through decoration-1">
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
      </div>
    </section>
  );
}
