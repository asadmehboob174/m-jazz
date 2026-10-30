"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { waLink } from "@/lib/data";

const services = ["Solar system", "Lithium battery / UPS", "CCTV / security", "Fire alarm / electric fence", "Smart board / IT", "EV charger", "Rental", "Repair / panel washing"];

// "Get a free quote" card in the hero; sends the request on WhatsApp.
export default function QuoteCard() {
  const [f, setF] = useState({ name: "", phone: "", service: services[0], ok: false });
  const field = "h-14 w-full rounded-xl border border-line bg-white px-5 text-[15px] text-[#0f172a] outline-none transition focus:border-brand focus:ring-4 focus:ring-brand/10";
  return (
    <form className="rounded-3xl bg-white p-7 text-[#0f172a] shadow-2xl md:p-9"
      onSubmit={(e) => { e.preventDefault(); window.open(waLink(`Free quote request\nName: ${f.name}\nPhone: ${f.phone}\nService: ${f.service}`), "_blank", "noopener"); }}>
      <h2 className="text-2xl font-bold">Get a free quote</h2>
      <p className="mt-1 text-[#64748b]">Tell us what you need. We reply on WhatsApp.</p>
      <div className="mt-6 space-y-4">
        <input required placeholder="Your name" value={f.name} onChange={(e) => setF({ ...f, name: e.target.value })} className={field} />
        <input required type="tel" placeholder="Phone / WhatsApp" value={f.phone} onChange={(e) => setF({ ...f, phone: e.target.value })} className={field} />
        <select value={f.service} onChange={(e) => setF({ ...f, service: e.target.value })} className={field}>{services.map((s) => <option key={s}>{s}</option>)}</select>
      </div>
      <label className="mt-5 flex items-center gap-3 text-[15px] text-[#475569]">
        <input type="checkbox" required checked={f.ok} onChange={(e) => setF({ ...f, ok: e.target.checked })} className="h-5 w-5 accent-[var(--color-brand)]" />
        I agree to be contacted on WhatsApp
      </label>
      <button className="shine group mt-6 inline-flex items-center gap-2 rounded-xl bg-brand px-7 py-4 font-semibold text-white transition hover:bg-brand-2">
        Get started now <ArrowRight size={18} className="transition group-hover:translate-x-1" />
      </button>
    </form>
  );
}
