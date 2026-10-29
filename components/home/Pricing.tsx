"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Check, Plus } from "lucide-react";
import { SectionTitle } from "../Badge";
import { formatPKR, packages, waLink } from "@/lib/data";

type Mode = "hybrid" | "ongrid";

export default function Pricing() {
  const [mode, setMode] = useState<Mode>("hybrid");

  return (
    <section className="cv atmo-r container-x py-24">
      <SectionTitle badge="Solar packages">
        Pricing that <span className="em text-sun-gradient">makes sense</span>
      </SectionTitle>

      <div role="radiogroup" aria-label="System type" className="mx-auto mt-8 flex w-fit rounded-full bg-sun p-1">
        {([["hybrid", "Hybrid (with battery)"], ["ongrid", "On-grid"]] as [Mode, string][]).map(([m, l]) => (
          <button key={m} type="button" role="radio" aria-checked={mode === m} onClick={() => setMode(m)}
            className={`relative rounded-full px-5 py-2.5 text-sm font-semibold transition ${mode === m ? "text-sun" : "text-black"}`}>
            {mode === m && <motion.span layoutId="pill" className="absolute inset-0 rounded-full bg-ink" transition={{ type: "spring", bounce: 0.2, duration: 0.5 }} />}
            <span className="relative">{l}</span>
          </button>
        ))}
      </div>

      <div className="mt-14 grid gap-6 lg:grid-cols-3">
        {packages.map((p) => (
          <div key={p.name}
            className={`relative overflow-hidden rounded-[28px] border p-8 md:p-9 ${p.featured ? "beam border-sun/40 bg-gradient-to-b from-warm to-panel" : "border-fg/[0.08] bg-panel/70"}`}>
            {p.featured && <span className="absolute right-6 top-6 rounded-full bg-sun px-3 py-1 text-xs font-bold text-black">Most chosen</span>}
            <h3 className="text-3xl font-semibold tracking-tight">{p.name} <span className="text-mute">· {p.kw} kW</span></h3>
            <p className="mt-2 text-mute">{p.for}</p>
            <div className="mt-6 flex items-baseline gap-2">
              <AnimatePresence mode="wait">
                <motion.span key={mode} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }}
                  className="text-4xl font-semibold tracking-tight">
                  {formatPKR(p.price[mode])}
                </motion.span>
              </AnimatePresence>
            </div>
            <p className="mt-1 text-xs uppercase tracking-widest text-mute">Installed · save {p.save} this month</p>

            <a href={waLink(`I'm interested in the ${p.name} ${p.kw} kW ${mode === "hybrid" ? "hybrid" : "on-grid"} package.`)} target="_blank" rel="noopener"
              className={`mt-7 flex items-center justify-between rounded-full py-2 pl-6 pr-2 font-semibold transition ${p.featured ? "bg-sun text-black hover:bg-sun-2" : "btn-beam"}`}>
              Get this package
              <span className={`flex h-9 w-12 items-center justify-center rounded-full ${p.featured ? "bg-black/15" : "bg-sun text-black"}`}><Plus size={18} /></span>
            </a>

            <div className="mt-6 divide-y divide-fg/10 rounded-2xl bg-ink/30 px-5 text-sm">
              {p.stats.map(([k, v]) => (
                <div key={k} className="flex justify-between py-3"><span>{v}</span><span className="text-mute">{k}</span></div>
              ))}
            </div>

            <ul className="mt-7 space-y-3 text-[15px] text-soft">
              {p.features.map((f) => (
                <li key={f} className={`flex items-start gap-3 ${mode === "ongrid" && f.includes("(hybrid)") ? "text-mute line-through opacity-60" : ""}`}>
                  <Check size={18} className="mt-0.5 shrink-0 text-sun" />{f}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <p className="mt-6 text-center text-sm text-mute">Sample prices. Final quote after a free site survey. Instalment plans available.</p>
    </section>
  );
}
