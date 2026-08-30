import type { ReactNode } from "react";

export function PageHero({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string;
  title: string;
  subtitle?: ReactNode;
}) {
  return (
    <section className="paper-noise relative">
      <div className="grid-overlay" />
      <div className="mx-auto max-w-[1440px] px-6 pt-16 pb-14 md:pt-24 md:pb-20">
        <p className="mono-label text-graphite mb-5">{eyebrow}</p>
        <h1 className="font-display font-extrabold text-display-l max-w-3xl">{title}</h1>
        {subtitle && <p className="max-w-xl text-lg text-graphite mt-6">{subtitle}</p>}
      </div>
    </section>
  );
}

export function CTABand() {
  return (
    <section className="border-t border-mist bg-paper-2 py-16">
      <div className="mx-auto max-w-[1440px] px-6 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <p className="text-h3 font-display font-bold max-w-md">
          Ready to see what a fixed loop would do to your cost per booking?
        </p>
        <a
          href="/contact"
          className="inline-flex items-center h-12 px-7 rounded-full bg-signal-bright text-ink font-medium hover:opacity-90 transition-opacity w-fit"
        >
          Book a 30-min call
        </a>
      </div>
    </section>
  );
}
