import { RevealOnScroll } from "@/components/motion/RevealOnScroll";

const STEPS = [
  { number: "01", title: "Audit", timing: "week 1", desc: "Full teardown of tracking, creative, and follow-up." },
  { number: "02", title: "Rebuild", timing: "weeks 2-3", desc: "Signal layer fixed, campaign structure rebuilt, creative pipeline started." },
  { number: "03", title: "Run", timing: "ongoing", desc: "Weekly creative refresh, daily monitoring, follow-up discipline enforced." },
  { number: "04", title: "Report on bookings", timing: "monthly", desc: "Cost per booking, not cost per lead. Offline conversions pushed back weekly." },
];

export function HowWeWork() {
  return (
    <section className="py-20 md:py-28 bg-paper">
      <div className="mx-auto max-w-[1440px] px-6">
        <h2 className="text-h2 font-display font-bold mb-12 max-w-xl">
          Four steps. No mystery in between.
        </h2>
        <div className="grid md:grid-cols-4 gap-6">
          {STEPS.map((step, i) => (
            <RevealOnScroll key={step.number} delay={i * 0.08}>
              <div className="border-t-2 border-signal pt-6 h-full">
                <p className="font-mono text-2xl text-signal mb-2">{step.number}</p>
                <h3 className="text-h3 font-display font-bold">{step.title}</h3>
                <p className="mono-label text-graphite mt-1 mb-3">{step.timing}</p>
                <p className="text-sm text-graphite">{step.desc}</p>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
