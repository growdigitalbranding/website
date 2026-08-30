"use client";

import { useMemo, useState } from "react";

function num(v: string) {
  const n = parseFloat(v);
  return Number.isFinite(n) ? n : 0;
}

export function CplCalculator() {
  const [spend, setSpend] = useState("150000");
  const [cpl, setCpl] = useState("1200");
  const [leadToVisit, setLeadToVisit] = useState("15");
  const [visitToBooking, setVisitToBooking] = useState("8");
  const [ticketSize, setTicketSize] = useState("7500000");

  const result = useMemo(() => {
    const spendN = num(spend);
    const cplN = num(cpl);
    const l2v = num(leadToVisit) / 100;
    const v2b = num(visitToBooking) / 100;
    const ticket = num(ticketSize);

    const leads = cplN > 0 ? spendN / cplN : 0;
    const visits = leads * l2v;
    const bookings = visits * v2b;
    const costPerBooking = bookings > 0 ? spendN / bookings : 0;
    const revenue = bookings * ticket;
    const marketingPctOfRevenue = revenue > 0 ? (spendN / revenue) * 100 : 0;

    return { leads, visits, bookings, costPerBooking, revenue, marketingPctOfRevenue };
  }, [spend, cpl, leadToVisit, visitToBooking, ticketSize]);

  const maxBar = 100;
  const barPct = Math.min(maxBar, result.marketingPctOfRevenue);

  return (
    <div className="grid md:grid-cols-2 gap-10">
      <div className="flex flex-col gap-5">
        <NumberField label="Monthly ad spend (₹)" value={spend} onChange={setSpend} />
        <NumberField label="Cost per lead (₹)" value={cpl} onChange={setCpl} />
        <NumberField label="Lead → site visit rate (%)" value={leadToVisit} onChange={setLeadToVisit} />
        <NumberField label="Visit → booking rate (%)" value={visitToBooking} onChange={setVisitToBooking} />
        <NumberField label="Average ticket size (₹)" value={ticketSize} onChange={setTicketSize} />
      </div>

      <div className="border border-mist rounded-2xl p-6 bg-paper-2 flex flex-col gap-6">
        <div>
          <p className="mono-label text-graphite mb-1">ESTIMATED LEADS / MONTH</p>
          <p className="font-mono text-2xl">{Math.round(result.leads)}</p>
        </div>
        <div>
          <p className="mono-label text-graphite mb-1">ESTIMATED BOOKINGS / MONTH</p>
          <p className="font-mono text-2xl">{result.bookings.toFixed(1)}</p>
        </div>
        <div>
          <p className="mono-label text-graphite mb-1">COST PER BOOKING</p>
          <p className="font-mono text-2xl text-signal">
            {result.costPerBooking > 0
              ? `₹${Math.round(result.costPerBooking).toLocaleString("en-IN")}`
              : "—"}
          </p>
        </div>
        <div>
          <p className="mono-label text-graphite mb-2">MARKETING COST AS % OF REVENUE</p>
          <div className="h-3 rounded-full bg-mist overflow-hidden">
            <div
              className="h-full w-full origin-left bg-signal transition-transform duration-300 ease-out motion-reduce:transition-none"
              style={{ transform: `scaleX(${barPct / 100})` }}
            />
          </div>
          <p className="font-mono text-sm mt-2">{result.marketingPctOfRevenue.toFixed(1)}%</p>
        </div>
      </div>
    </div>
  );
}

function NumberField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="mono-label text-graphite">{label}</span>
      <input
        type="number"
        inputMode="decimal"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-12 px-4 rounded-lg border border-mist bg-paper-2 focus-visible:border-signal outline-none font-mono"
      />
    </label>
  );
}
