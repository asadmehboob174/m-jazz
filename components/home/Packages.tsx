"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import SectionHead from "../SectionHead";
import { formatPKR, packages, waLink } from "@/lib/data";

type Mode = "hybrid" | "ongrid";

export default function Packages() {
  const [mode, setMode] = useState<Mode>("hybrid");

  return (
    <section className="cv bg-coal py-14">
      <div className="container-x">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHead title="Complete solar packages" sub="Panels, inverter, structure, wiring and installation in one price." />
          <div role="radiogroup" aria-label="System type" className="flex rounded-lg border border-line bg-white p-1 text-sm font-semibold">
            {([["hybrid", "Hybrid (with battery)"], ["ongrid", "On-grid"]] as [Mode, string][]).map(([m, l]) => (
              <button key={m} type="button" role="radio" aria-checked={mode === m} onClick={() => setMode(m)}
                className={`rounded-md px-4 py-2 transition ${mode === m ? "bg-navy text-white" : "text-soft hover:text-fg"}`}>
                {l}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-8 grid gap-5 lg:grid-cols-3">
          {packages.map((p) => (
            <div key={p.name} className={`relative flex flex-col rounded-xl border bg-white p-6 ${p.featured ? "border-brand ring-1 ring-brand" : "border-line"}`}>
              {p.featured && <span className="absolute -top-3 left-6 rounded bg-brand px-2.5 py-1 text-xs font-bold text-white">Most popular</span>}
              <div className="flex items-baseline justify-between">
                <h3 className="text-xl font-bold">{p.kw} kW {p.name}</h3>
                <span className="text-sm text-mute">{p.for}</span>
              </div>
              <p className="mt-4 text-3xl font-bold tracking-tight">{formatPKR(p.price[mode])}</p>
              <p className="mt-1 text-sm text-mute">Installed price · {mode === "hybrid" ? "with lithium battery" : "grid-tied, no battery"}</p>

              <dl className="mt-5 grid grid-cols-2 gap-3 text-sm">
                {p.stats.map(([k, v]) => (
                  <div key={k} className="rounded-lg bg-coal px-3 py-2.5">
                    <dt className="text-mute">{k}</dt>
                    <dd className="font-semibold">{v}</dd>
                  </div>
                ))}
              </dl>

              <ul className="mt-5 space-y-2.5 text-[15px] text-soft">
                {p.features.filter((f) => mode === "hybrid" || !f.includes("(hybrid)")).map((f) => (
                  <li key={f} className="flex items-start gap-2.5"><Check size={18} className="mt-0.5 shrink-0 text-ok" />{f.replace(" (hybrid)", "")}</li>
                ))}
              </ul>

              <a href={waLink(`I'm interested in the ${p.kw} kW ${p.name} ${mode === "hybrid" ? "hybrid" : "on-grid"} package.`)} target="_blank" rel="noopener"
                className={`mt-6 ${p.featured ? "btn-primary" : "btn-ghost"} w-full`}>
                Get this package
              </a>
            </div>
          ))}
        </div>
        <p className="mt-5 text-sm text-mute">Sample prices. Final quote after a free site survey. Instalment plans available.</p>
      </div>
    </section>
  );
}
