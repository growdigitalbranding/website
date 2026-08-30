export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="grid-overlay" />
      <div className="mx-auto max-w-[1440px] px-6 pt-16 pb-14 md:pt-24 md:pb-20">
        <p className="mono-label text-graphite mb-6 hero-in" style={{ animationDelay: "120ms" }}>
          PERFORMANCE MARKETING FOR BUILDERS &amp; DEVELOPERS
        </p>

        <h1 className="font-display font-extrabold text-display-xl max-w-4xl">
          <span className="block hero-line" style={{ animationDelay: "280ms" }}>
            Most agencies stop
          </span>
          <span className="block hero-line" style={{ animationDelay: "420ms" }}>
            at the lead.
          </span>
          <span className="block text-signal hero-line" style={{ animationDelay: "560ms" }}>
            We run the whole loop.
          </span>
        </h1>

        <p
          className="max-w-xl text-lg mt-8 text-graphite hero-in"
          style={{ animationDelay: "740ms" }}
        >
          Creative volume, clean signal, and follow-up that actually closes. Built as one
          system for high-consideration purchases. Real estate first.
        </p>

        <div className="flex flex-wrap gap-4 mt-10 hero-scale" style={{ animationDelay: "860ms" }}>
          <a
            href="/contact"
            className="inline-flex items-center h-12 px-7 rounded-full bg-signal-bright text-ink font-medium hover:opacity-90 transition-opacity"
          >
            Book a 30-min call
          </a>
          <a
            href="#the-problem"
            className="inline-flex items-center h-12 px-7 rounded-full border border-mist text-ink font-medium hover:border-ink transition-colors"
          >
            See how the loop works →
          </a>
        </div>

      </div>

      <style>{`
        @keyframes hero-in-kf { from { opacity: 0; } to { opacity: 1; } }
        @keyframes hero-line-kf { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes hero-scale-kf { from { opacity: 0; transform: scale(0.96); } to { opacity: 1; transform: scale(1); } }
        .hero-in { opacity: 0; animation: hero-in-kf 0.6s ease-out forwards; }
        .hero-line { opacity: 0; animation: hero-line-kf 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .hero-scale { opacity: 0; animation: hero-scale-kf 0.4s ease-out forwards; }
        @media (prefers-reduced-motion: reduce) {
          .hero-in, .hero-line, .hero-scale { animation: none; opacity: 1; }
        }
      `}</style>
    </section>
  );
}
