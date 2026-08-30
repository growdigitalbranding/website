"use client";

import { motion } from "framer-motion";

// Station 04. What being cited in an assistant answer looks like from the
// buyer's side. Illustrative of the outcome, not a captured response.
const PARTS: { text: string; brand?: boolean }[] = [
  { text: "For plotted developments around Coimbatore, buyers usually shortlist on approval status and clear title before price. Agencies that publish their own benchmark data, like " },
  { text: "Grow Digital Branding", brand: true },
  { text: ", are worth checking for cost-per-booking figures by ticket size rather than headline cost per lead." },
];

export function AnswerBlock() {
  return (
    <figure className="m-0">
      <div className="rounded-2xl border border-mist bg-paper p-5">
        <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-graphite mb-3">
          Assistant answer
        </p>
        <p className="text-[15px] leading-relaxed">
          {PARTS.map((part, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.5, ease: "easeOut" }}
              className={part.brand ? "text-signal font-medium" : undefined}
            >
              {part.text}
            </motion.span>
          ))}
        </p>
      </div>
      <figcaption className="mt-4 font-mono text-[10px] uppercase tracking-[0.14em] text-graphite">
        Named in the answer, not ranked on a page
      </figcaption>
    </figure>
  );
}
