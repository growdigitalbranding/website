import Link from "next/link";
import { PHONE, PHONE_DISPLAY, EMAIL, WHATSAPP_URL } from "@/lib/contact";
import { BRAND } from "@/lib/brand";

const COLUMNS = [
  {
    title: "What we do",
    links: [
      { href: "/what-we-do/performance-marketing", label: "Performance marketing" },
      { href: "/what-we-do/creative-engine", label: "Creative engine" },
      { href: "/what-we-do/tracking-attribution", label: "Tracking & attribution" },
      { href: "/what-we-do/follow-up-systems", label: "Follow-up systems" },
      { href: "/what-we-do/ai-search-visibility", label: "AI search visibility" },
    ],
  },
  {
    title: "Who we help",
    links: [
      { href: "/who-we-help/real-estate", label: "Real estate" },
      { href: "/who-we-help/senior-living", label: "Senior living" },
      { href: "/who-we-help/interiors", label: "Interiors" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/the-loop", label: "The loop" },
      { href: "/work", label: "Work" },
      { href: "/insights", label: "Insights" },
      { href: "/about", label: "About" },
      { href: "/pricing", label: "Pricing" },
    ],
  },
];

export function FooterSection() {
  const built = new Date().toISOString().slice(0, 10);

  return (
    <footer className="bg-ink text-paper rounded-t-[40px] sm:rounded-t-[50px] px-5 sm:px-8 md:px-10 pt-20 pb-8 overflow-hidden">
      <div className="max-w-[1440px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-10">
        {COLUMNS.map((col) => (
          <div key={col.title}>
            <p className="mono-label text-paper/[0.55] mb-4">{col.title}</p>
            <ul className="flex flex-col gap-2.5">
              {col.links.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-paper/85 hover:text-paper transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
        <div>
          <p className="mono-label text-paper/[0.55] mb-4">Contact</p>
          <ul className="flex flex-col gap-2.5 text-sm text-paper/85">
            <li>Coimbatore, Tamil Nadu</li>
            <li>
              <a href={`tel:${PHONE}`} className="hover:text-paper transition-colors">
                {PHONE_DISPLAY}
              </a>
            </li>
            <li>
              <a href={`mailto:${EMAIL}`} className="hover:text-paper transition-colors">
                hello@growdigitalbranding.com
              </a>
            </li>
            <li>
              <a href={WHATSAPP_URL} className="hover:text-paper transition-colors">
                WhatsApp
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto mt-16 pt-8" style={{ borderTop: "1px solid rgba(239,240,236,0.14)" }}>
        <p
          aria-hidden="true"
          className="font-display font-extrabold uppercase leading-none text-paper/[0.06] select-none"
          style={{ fontSize: "18vw" }}
        >
          Grow
        </p>
      </div>

      <div className="max-w-[1440px] mx-auto flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between mt-6">
        <p className="mono-label text-paper/[0.55]">© 2026 {BRAND}</p>
        <nav className="flex gap-6">
          <Link href="/privacy" className="mono-label text-paper/[0.55] hover:text-paper transition-colors">
            Privacy
          </Link>
          <Link href="/terms" className="mono-label text-paper/[0.55] hover:text-paper transition-colors">
            Terms
          </Link>
        </nav>
        <p className="mono-label text-paper/[0.55]">Last updated {built}</p>
      </div>
    </footer>
  );
}
