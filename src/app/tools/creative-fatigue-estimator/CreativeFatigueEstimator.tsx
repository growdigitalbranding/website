"use client";

import { useMemo, useState } from "react";

export function CreativeFatigueEstimator() {
  const [frequency, setFrequency] = useState("2.1");
  const [weeklyGrowth, setWeeklyGrowth] = useState("0.25");

  const weeksToTrigger = useMemo(() => {
    const f = parseFloat(frequency) || 0;
    const g = parseFloat(weeklyGrowth) || 0;
    if (g <= 0 || f >= 2.8) return 0;
    return Math.ceil((2.8 - f) / g);
  }, [frequency, weeklyGrowth]);

  const refreshDate = useMemo(() => {
    const d = new Date();
    d.setDate(d.getDate() + weeksToTrigger * 7);
    return d.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
  }, [weeksToTrigger]);

  return (
    <>
      <div className="flex flex-col gap-5 mb-8">
        <label className="flex flex-col gap-1.5">
          <span className="mono-label text-graphite">Current frequency</span>
          <input
            type="number"
            step="0.1"
            value={frequency}
            onChange={(e) => setFrequency(e.target.value)}
            className="h-12 px-4 rounded-lg border border-mist bg-paper-2 focus-visible:border-signal outline-none font-mono"
          />
        </label>
        <label className="flex flex-col gap-1.5">
          <span className="mono-label text-graphite">Weekly frequency growth</span>
          <input
            type="number"
            step="0.05"
            value={weeklyGrowth}
            onChange={(e) => setWeeklyGrowth(e.target.value)}
            className="h-12 px-4 rounded-lg border border-mist bg-paper-2 focus-visible:border-signal outline-none font-mono"
          />
        </label>
      </div>

      <div className="border border-mist rounded-2xl p-6 bg-paper-2">
        <p className="mono-label text-graphite mb-1">ESTIMATED REFRESH TRIGGER</p>
        {weeksToTrigger > 0 ? (
          <>
            <p className="font-mono text-2xl text-signal mb-1">{refreshDate}</p>
            <p className="text-graphite text-sm">
              ~{weeksToTrigger} week{weeksToTrigger === 1 ? "" : "s"} until frequency crosses 2.8
            </p>
          </>
        ) : (
          <p className="font-mono text-2xl text-flag">Already past 2.8. Refresh now</p>
        )}
      </div>
    </>
  );
}
