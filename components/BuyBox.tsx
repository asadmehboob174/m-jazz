"use client";

import { useState } from "react";
import { Minus, Plus, ShoppingBag } from "lucide-react";
import { formatPKR, paymentMethods, waLink, type Product } from "@/lib/data";

export default function BuyBox({ p }: { p: Product }) {
  const [qty, setQty] = useState(1);
  const [pay, setPay] = useState(paymentMethods[0]);

  return (
    <div className="rounded-xl border border-line bg-white p-5 md:p-6">
      <div className="flex items-baseline gap-3">
        <span className="text-3xl font-bold tracking-tight">{formatPKR(p.price * qty)}</span>
        {p.oldPrice && <span className="text-mute line-through">{formatPKR(p.oldPrice * qty)}</span>}
      </div>
      <p className="mt-1 text-sm font-medium text-ok">In stock · Installation available in Lahore</p>

      <div className="mt-5 flex flex-wrap gap-3">
        <div className="flex items-center rounded-lg border border-line">
          <button type="button" aria-label="Decrease quantity" onClick={() => setQty(Math.max(1, qty - 1))} className="flex h-12 w-12 items-center justify-center rounded-lg hover:bg-coal"><Minus size={18} /></button>
          <span className="w-8 text-center font-semibold" aria-live="polite">{qty}</span>
          <button type="button" aria-label="Increase quantity" onClick={() => setQty(qty + 1)} className="flex h-12 w-12 items-center justify-center rounded-lg hover:bg-coal"><Plus size={18} /></button>
        </div>
        <button type="button" className="btn-primary flex-1"><ShoppingBag size={18} /> Add to cart</button>
      </div>
      <a href={waLink(`I want to order: ${p.name} (${p.brand}) × ${qty}`)} target="_blank" rel="noopener"
        className="mt-3 flex w-full items-center justify-center gap-2 rounded-lg bg-[#25D366] px-5 py-3 font-semibold text-black transition hover:brightness-110">
        Order on WhatsApp
      </a>

      <fieldset className="mt-6">
        <legend className="mb-3 text-sm font-semibold">Payment options</legend>
        <div className="flex flex-wrap gap-2">
          {paymentMethods.map((m) => (
            <label key={m} className={`cursor-pointer rounded-lg border px-3 py-2 text-sm transition ${pay === m ? "border-brand bg-stage-blue font-semibold text-brand" : "border-line text-soft hover:border-fg/30"}`}>
              <input type="radio" name="pay" value={m} checked={pay === m} onChange={() => setPay(m)} className="sr-only" />
              {m}
            </label>
          ))}
        </div>
      </fieldset>
    </div>
  );
}
