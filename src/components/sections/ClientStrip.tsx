import { Marquee } from "@/components/motion/Marquee";

// Placeholder wordmarks. Swap for real client logos/names before launch.
const CLIENTS = [
  "VSK HOUSING",
  "TERRAVISTA",
  "SILVER OAKS",
  "MERIDIAN GROUP",
  "BLUE RIDGE HOMES",
  "PALM COURT",
  "ASTER LIVING",
];

export function ClientStrip() {
  return (
    <section className="border-y border-mist bg-paper-2 py-8">
      <div className="mx-auto max-w-[1440px] px-6">
        <p className="mono-label text-graphite mb-6 text-center md:text-left">
          TRUSTED BY BUILDERS RUNNING ₹40L-₹5CR INVENTORY
        </p>
        <Marquee
          items={CLIENTS.map((name) => (
            <span key={name} className="font-display font-semibold text-graphite text-lg whitespace-nowrap">
              {name}
            </span>
          ))}
        />
      </div>
    </section>
  );
}
