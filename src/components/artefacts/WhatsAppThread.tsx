"use client";

import { motion } from "framer-motion";

// Station 03. The acknowledgement window, as the lead experiences it.
const MESSAGES = [
  { from: "system", text: "Lead captured from Meta form", t: "00:00" },
  { from: "out", text: "Hi Karthik, thanks for enquiring about Phase 2. Are you looking at a 2BHK or 3BHK?", t: "00:41" },
  { from: "in", text: "3BHK, but only if east facing", t: "04:12" },
  { from: "system", text: "Qualified, routed to telecaller with preference logged", t: "04:14" },
];

export function WhatsAppThread() {
  return (
    <figure className="m-0">
      <div className="rounded-xl border border-mist bg-paper p-4 flex flex-col gap-3">
        {MESSAGES.map((m, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.42, delay: i * 0.5, ease: [0.16, 1, 0.3, 1] }}
            className={m.from === "system" ? "self-center" : m.from === "out" ? "self-end max-w-[85%]" : "self-start max-w-[85%]"}
          >
            {m.from === "system" ? (
              <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-graphite text-center">
                {m.t} · {m.text}
              </p>
            ) : (
              <div
                className={`rounded-2xl px-3.5 py-2.5 text-sm ${
                  m.from === "out"
                    ? "bg-signal-bright/25 border border-signal/25 rounded-br-sm"
                    : "bg-paper-2 border border-mist rounded-bl-sm"
                }`}
              >
                <p>{m.text}</p>
                <p className="font-mono text-[10px] text-graphite mt-1">{m.t}</p>
              </div>
            )}
          </motion.div>
        ))}
      </div>
      <figcaption className="mt-4 font-mono text-[10px] uppercase tracking-[0.14em] text-graphite">
        Acknowledged in 41 seconds, qualified before a telecaller dialled
      </figcaption>
    </figure>
  );
}
