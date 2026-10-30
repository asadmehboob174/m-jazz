"use client";

import Link from "next/link";
import { useState } from "react";
import { CheckCircle2, CreditCard, Lock, MessageCircle, ShieldCheck, Truck } from "lucide-react";
import ProductVisual from "../ProductVisual";
import { orderMessage, useCart } from "./Cart";
import { company, formatPKR, paymentMethods, waLink } from "@/lib/data";

const cities = ["Lahore", "Sheikhupura", "Kasur", "Gujranwala", "Other city"];

export default function Checkout() {
  const { items, total, clear } = useCart();
  const [f, setF] = useState({ name: "", phone: "", city: cities[0], address: "", install: true, pay: paymentMethods[0], notes: "" });
  const [sent, setSent] = useState<{ ref: string; link: string } | null>(null);
  const set = (k: keyof typeof f) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setF({ ...f, [k]: e.target.type === "checkbox" ? (e.target as HTMLInputElement).checked : e.target.value });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const ref = "MJ-" + Date.now().toString(36).slice(-6).toUpperCase();
    const link = waLink(orderMessage(items, total, [
      ["Name", f.name], ["Phone", f.phone], ["City", f.city], ["Address", f.address],
      ["Installation", f.install ? "Yes, please install" : "Delivery only"], ["Payment", f.pay], ["Notes", f.notes],
    ], ref));
    window.open(link, "_blank", "noopener");
    setSent({ ref, link });
    clear();
  };

  if (sent) {
    return (
      <div className="mx-auto max-w-lg py-16 text-center" data-reveal="zoom">
        <span className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#25D366]/15 text-[#1fa855]"><CheckCircle2 size={44} /></span>
        <h1 className="mt-5 text-3xl font-bold tracking-tight">Order {sent.ref} sent</h1>
        <p className="mt-3 text-soft">Your order has opened in WhatsApp. Press send there, and our team will confirm stock, delivery and payment with you shortly.</p>
        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <a href={sent.link} target="_blank" rel="noopener" className="inline-flex items-center gap-2 rounded-lg bg-[#25D366] px-5 py-3 font-semibold text-black"><MessageCircle size={18} /> Open WhatsApp again</a>
          <Link href="/shop" className="btn-ghost">Continue shopping</Link>
        </div>
        <p className="mt-6 text-sm text-mute">WhatsApp didn&apos;t open? Call us on <a className="font-semibold text-brand" href={`tel:${company.phoneIntl}`}>{company.phone}</a>.</p>
      </div>
    );
  }

  if (!items.length) {
    return (
      <div className="mx-auto max-w-md py-20 text-center">
        <h1 className="text-2xl font-bold">Your cart is empty</h1>
        <p className="mt-2 text-mute">Add products to your cart, then come back to checkout.</p>
        <Link href="/shop" className="btn-primary mt-6">Browse products</Link>
      </div>
    );
  }

  const field = "h-12 w-full rounded-lg border border-line bg-panel px-3.5 text-[15px] outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/15";

  return (
    <form onSubmit={submit} className="grid grid-cols-1 gap-6 py-6 lg:grid-cols-[1.4fr_1fr] lg:gap-10 lg:py-10">
      <div className="min-w-0">
        <h1 className="text-[26px] font-bold tracking-tight md:text-3xl">Checkout</h1>
        <p className="mt-1 text-mute">No online payment needed now. Send your order on WhatsApp and we confirm everything with you.</p>

        <fieldset className="mt-6 rounded-xl border border-line p-5" data-reveal>
          <legend className="px-1 font-semibold">Your details</legend>
          <div className="grid gap-3 sm:grid-cols-2">
            <label className="text-sm text-soft">Full name<input required value={f.name} onChange={set("name")} className={`${field} mt-1`} autoComplete="name" /></label>
            <label className="text-sm text-soft">Phone / WhatsApp<input required type="tel" inputMode="tel" placeholder="03xx xxxxxxx" value={f.phone} onChange={set("phone")} className={`${field} mt-1`} autoComplete="tel" /></label>
            <label className="text-sm text-soft">City
              <select value={f.city} onChange={set("city")} className={`${field} mt-1`}>{cities.map((c) => <option key={c}>{c}</option>)}</select>
            </label>
            <label className="text-sm text-soft">Area / address<input required value={f.address} onChange={set("address")} placeholder="House, street, area" className={`${field} mt-1`} autoComplete="street-address" /></label>
          </div>
          <label className="mt-4 flex cursor-pointer items-center gap-3 rounded-lg bg-coal p-3.5 text-[15px]">
            <input type="checkbox" checked={f.install} onChange={set("install")} className="h-5 w-5 accent-[var(--color-brand)]" />
            I need installation <span className="text-mute">(Lahore and nearby)</span>
          </label>
        </fieldset>

        <fieldset className="mt-5 rounded-xl border border-line p-5" data-reveal>
          <legend className="px-1 font-semibold">Payment preference</legend>
          <div className="grid gap-2 sm:grid-cols-2">
            {paymentMethods.map((m) => (
              <label key={m} className={`flex cursor-pointer items-center gap-3 rounded-lg border p-3.5 text-[15px] transition ${f.pay === m ? "border-brand bg-stage-blue font-semibold text-brand" : "border-line hover:border-fg/30"}`}>
                <input type="radio" name="pay" value={m} checked={f.pay === m} onChange={set("pay")} className="accent-[var(--color-brand)]" />{m}
              </label>
            ))}
            <div className="flex items-center gap-3 rounded-lg border border-dashed border-line p-3.5 text-[15px] text-mute sm:col-span-2">
              <CreditCard size={18} /> Card / online payment <span className="ml-auto rounded bg-coal px-2 py-0.5 text-xs font-semibold">Coming soon</span>
            </div>
          </div>
          <label className="mt-4 block text-sm text-soft">Order notes (optional)
            <textarea value={f.notes} onChange={set("notes")} rows={3} className={`${field} mt-1 h-auto py-3`} placeholder="Preferred delivery time, roof type, etc." />
          </label>
        </fieldset>
      </div>

      <aside className="min-w-0 lg:sticky lg:top-[150px] lg:self-start">
        <div className="rounded-xl border border-line bg-coal p-5" data-reveal="right">
          <h2 className="font-bold">Order summary</h2>
          <ul className="mt-4 divide-y divide-line">
            {items.map((it) => (
              <li key={`${it.slug}-${it.variant}`} className="flex items-center gap-3 py-3">
                <span className="relative shrink-0">
                  <ProductVisual kind={it.p.kind} className="h-14 w-14 rounded-lg bg-panel" />
                  <span className="absolute -right-1.5 -top-1.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-navy px-1 text-[11px] font-bold text-white">{it.qty}</span>
                </span>
                <span className="min-w-0 flex-1 text-sm"><span className="line-clamp-1 font-medium">{it.p.name}</span>{it.variant && <span className="text-xs text-mute">{it.variant}</span>}</span>
                <span className="text-sm font-semibold">{formatPKR(it.price * it.qty)}</span>
              </li>
            ))}
          </ul>
          <div className="mt-3 space-y-1.5 border-t border-line pt-4 text-[15px]">
            <p className="flex justify-between"><span className="text-soft">Subtotal</span>{formatPKR(total)}</p>
            <p className="flex justify-between"><span className="text-soft">Delivery & installation</span><span className="text-mute">Confirmed on WhatsApp</span></p>
            <p className="flex justify-between pt-2 text-lg font-bold"><span>Total</span>{formatPKR(total)}</p>
          </div>
          <button type="submit" className="shine glow mt-5 flex w-full items-center justify-center gap-2 rounded-lg bg-[#25D366] px-5 py-3.5 text-base font-bold text-black">
            <MessageCircle size={20} /> Send order on WhatsApp
          </button>
          <ul className="mt-4 space-y-2 text-sm text-soft">
            <li className="flex gap-2"><Lock size={16} className="mt-0.5 shrink-0 text-ok" /> Nothing is charged online</li>
            <li className="flex gap-2"><ShieldCheck size={16} className="mt-0.5 shrink-0 text-ok" /> Official warranty on every product</li>
            <li className="flex gap-2"><Truck size={16} className="mt-0.5 shrink-0 text-ok" /> Delivery across Pakistan</li>
          </ul>
        </div>
      </aside>
    </form>
  );
}
