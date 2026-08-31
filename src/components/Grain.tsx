"use client";

import { usePathname } from "next/navigation";

/**
 * The film-grain overlay. Marketing texture, so it stays off the dashboard —
 * grain over a table of phone numbers is noise on data someone has to read
 * and copy accurately.
 */
export function Grain() {
  const pathname = usePathname();
  if (pathname.startsWith("/admin")) return null;
  return <div className="grain" aria-hidden="true" />;
}
