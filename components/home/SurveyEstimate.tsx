"use client";

import { useState } from "react";
import { Calculator, CheckCircle2, MapPin, Send } from "lucide-react";
import { formatPKR, waLink } from "@/lib/data";

// Rough sizing assumptions for Lahore — SAMPLE, tune with real figures before launch.
const RATE = 60; // average Rs per unit incl. taxes
const SUN_HOURS = 4.5; // useful daily sun hours
const PER_KW = { ongrid: 92000, hybrid: 125000 }; // installed Rs per kW
const services = ["Solar system", "Lithium battery / UPS", "CCTV / security", "Fire alarm / electric fence", "Smart board / IT", "EV charger", "Rental (projector, SMD, sound)", "Repair / panel washing"];
const areas = ["Lahore", "Sheikhupura", "Kasur", "Gujranwala", "Nationwide delivery"];

export default function SurveyEstimate() {
  const [bill, setBill] = useState(35000);
  const [form, setForm] = useState({ name: "", phone: "", area: "", service: services[0] });

  const units = bill / RATE;
  const kw = Math.max(1, Math.ceil((units / (30 * SUN_HOURS)) * 2) / 2);
  const panels = Math.ceil((kw * 1000) / 585);
  const saving = Math.round(bill * 0.75); // conservative: not every unit is offset
  const cost = { low: kw * PER_KW.ongrid, high: kw * PER_KW.hybrid };
  const payback = cost.high / (saving * 12);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = [
      "Assalam-o-Alaikum, I want to book a free site survey.",
      `Name: ${form.name}`,
      `Phone: ${form.phone}`,
      `Area: ${form.area}`,
      `Interested in: ${form.service}`,
      form.service === "Solar system" ? `Monthly bill: ${formatPKR(bill)} (website estimate ~${kw} kW)` : "",
    ].filter(Boolean).join("\n");
    window.open(waLink(msg), "_blank", "noopener");
  };

  const field = "h-11 w-full rounded-lg border border-line bg-panel px-3.5 text-[15px] outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/15";

  return (
    <section id="survey" className="cv scroll-mt-36 bg-coal py-10 md:py-14">
      <div className="container-x grid gap-5 lg:grid-cols-[1.15fr_1fr]">
        {/* Estimate */}
        <div className="rounded-2xl border border-line bg-panel p-5 sm:p-7">
          <p className="flex items-center gap-2 text-sm font-semibold text-brand"><Calculator size={18} /> Solar savings estimate</p>
          <h2 className="mt-2 text-[22px] font-bold tracking-tight md:text-[28px]">How much can you save?</h2>
          <label htmlFor="bill" className="mt-5 flex items-baseline justify-between text-sm text-mute">
            Your average monthly electricity bill
            <span className="text-xl font-bold text-fg">{formatPKR(bill)}</span>
          </label>
          <input id="bill" type="range" min={5000} max={250000} step={1000} value={bill} onChange={(e) => setBill(+e.target.value)}
            className="mt-3 w-full cursor-pointer accent-[var(--color-brand)]" />
          <div className="mt-1 flex justify-between text-xs text-mute"><span>Rs. 5,000</span><span>Rs. 250,000</span></div>

          <dl className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              ["System size", `${kw} kW`],
              ["Panels", `${panels} × 585 W`],
              ["Monthly saving", `~${formatPKR(saving)}`],
              ["Payback", `~${payback.toFixed(1)} yrs`],
            ].map(([k, v]) => (
              <div key={k} className="rounded-lg bg-stage-blue p-3">
                <dt className="text-xs text-mute">{k}</dt>
                <dd className="mt-0.5 font-bold text-brand">{v}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-4 text-[15px] text-soft">
            Estimated installed price: <span className="font-semibold text-fg">{formatPKR(cost.low)}</span> (on-grid) to{" "}
            <span className="font-semibold text-fg">{formatPKR(cost.high)}</span> (hybrid with battery).
          </p>
          <p className="mt-2 text-xs text-mute">Rough estimate only. Your exact system and price are confirmed after a free site survey.</p>
        </div>

        {/* Survey form */}
        <form onSubmit={submit} className="rounded-2xl bg-navy p-5 text-white sm:p-7">
          <p className="flex items-center gap-2 text-sm font-semibold text-sun-2"><CheckCircle2 size={18} /> Free, no obligation</p>
          <h2 className="mt-2 text-[22px] font-bold tracking-tight md:text-[28px]">Book a free site survey</h2>
          <p className="mt-1.5 text-sm text-white/70">An engineer visits within 48 hours. We reply on WhatsApp.</p>
          <div className="mt-5 grid gap-3 text-fg sm:grid-cols-2">
            <label className="sr-only" htmlFor="sv-name">Your name</label>
            <input id="sv-name" required placeholder="Your name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={field} />
            <label className="sr-only" htmlFor="sv-phone">Phone number</label>
            <input id="sv-phone" required type="tel" inputMode="tel" placeholder="03xx xxxxxxx" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className={field} />
            <label className="sr-only" htmlFor="sv-area">Area</label>
            <input id="sv-area" required placeholder="Area, e.g. DHA Phase 5" value={form.area} onChange={(e) => setForm({ ...form, area: e.target.value })} className={field} />
            <label className="sr-only" htmlFor="sv-service">Service</label>
            <select id="sv-service" value={form.service} onChange={(e) => setForm({ ...form, service: e.target.value })} className={field}>
              {services.map((s) => <option key={s}>{s}</option>)}
            </select>
          </div>
          <button type="submit" className="btn-sun mt-4 w-full"><Send size={17} /> Send request on WhatsApp</button>
          <div className="mt-5 border-t border-white/10 pt-4">
            <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-white/60"><MapPin size={13} /> Areas we cover</p>
            <ul className="mt-2.5 flex flex-wrap gap-2">
              {areas.map((a) => <li key={a} className="rounded bg-white/10 px-2.5 py-1 text-xs">{a}</li>)}
            </ul>
          </div>
        </form>
      </div>
    </section>
  );
}
