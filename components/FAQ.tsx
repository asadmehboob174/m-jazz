"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowDownLeft, ArrowUpRight } from "lucide-react";
import { SectionTitle } from "./Badge";
import { faqs } from "@/lib/data";

export default function FAQ() {
  const [open, setOpen] = useState(0);
  return (
    <section className="cv container-x py-24">
      <SectionTitle badge="FAQ">
        Frequently asked <span className="em text-sun-gradient">questions</span>
      </SectionTitle>
      <div className="mx-auto mt-14 max-w-4xl space-y-3 rounded-[32px] border border-fg/[0.07] bg-panel/50 p-3 md:p-6">
        {faqs.map((f, i) => {
          const on = open === i;
          return (
            <div key={f.q} className={`rounded-2xl transition-colors ${on ? "bg-gradient-to-br from-warm to-warm-2" : "bg-fg/[0.03] hover:bg-fg/[0.05]"}`}>
              <h3>
                <button type="button" aria-expanded={on} onClick={() => setOpen(on ? -1 : i)}
                  className="flex w-full items-center justify-between gap-6 px-5 py-5 text-left text-[17px] font-medium md:px-7 md:py-6 md:text-lg">
                  {f.q}
                  {on ? <ArrowDownLeft size={20} className="shrink-0 text-sun" /> : <ArrowUpRight size={20} className="shrink-0 text-mute" />}
                </button>
              </h3>
              <AnimatePresence initial={false}>
                {on && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }} className="overflow-hidden">
                    <p className="mx-5 border-t border-fg/10 pb-6 pt-5 leading-relaxed text-soft md:mx-7">{f.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </section>
  );
}
