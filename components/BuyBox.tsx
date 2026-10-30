"use client";

import { useState } from "react";
import { Minus, Plus, ShoppingCart, Zap } from "lucide-react";
import { AddToCart, useCart } from "./cart/Cart";
import { WaIcon } from "./ProductCard";
import { formatPKR, paymentMethods, priceOf, waLink, type Product } from "@/lib/data";
import { useRouter } from "next/navigation";

export default function BuyBox({ p }: { p: Product }) {
  const [qty, setQty] = useState(1);
  const [variant, setVariant] = useState(p.variants?.[0].label);
  const { add } = useCart();
  const router = useRouter();
  const price = priceOf(p, variant);
  const old = p.variants?.find((v) => v.label === variant)?.oldPrice ?? p.oldPrice;

  return (
    <div className="rounded-2xl border border-line bg-white p-5 md:p-6">
      {price ? (
        <>
          <div className="flex flex-wrap items-baseline gap-x-3">
            <span key={price * qty} className="animate-[rv-up_.4s_ease] text-[28px] font-extrabold tracking-tight text-brand sm:text-[32px]">{formatPKR(price * qty)}</span>
            {p.unit && <span className="text-mute">{p.unit}</span>}
            {old && <span className="text-mute line-through">{formatPKR(old * qty)}</span>}
          </div>
          <p className="mt-1 text-sm font-medium text-ok">Available · Delivery & installation confirmed on WhatsApp</p>
        </>
      ) : (
        <>
          <p className="text-2xl font-bold">Price on request</p>
          <p className="mt-1 text-sm text-mute">Price depends on your site and requirements. Get a free quote on WhatsApp.</p>
        </>
      )}

      {p.variants && (
        <fieldset className="mt-5">
          <legend className="mb-2 text-sm font-semibold">Choose option</legend>
          <div className="grid gap-2">
            {p.variants.map((v) => (
              <label key={v.label} className={`flex cursor-pointer items-center justify-between gap-3 rounded-lg border p-3.5 text-[15px] transition ${variant === v.label ? "border-brand bg-stage-blue ring-1 ring-brand" : "border-line hover:border-fg/30"}`}>
                <span className="flex items-center gap-3">
                  <input type="radio" name="variant" checked={variant === v.label} onChange={() => setVariant(v.label)} className="accent-[var(--color-brand)]" />
                  {v.label}
                </span>
                <span className="font-bold">{formatPKR(v.price)}</span>
              </label>
            ))}
          </div>
        </fieldset>
      )}

      {price ? (
        <>
          <div className="mt-5 flex gap-2 sm:gap-3">
            <div className="flex shrink-0 items-center rounded-lg border border-line">
              <button type="button" aria-label="Decrease quantity" onClick={() => setQty(Math.max(1, qty - 1))} className="flex h-12 w-10 items-center justify-center rounded-lg hover:bg-coal sm:w-12"><Minus size={18} /></button>
              <span className="w-8 text-center font-semibold" aria-live="polite">{qty}</span>
              <button type="button" aria-label="Increase quantity" onClick={() => setQty(qty + 1)} className="flex h-12 w-10 items-center justify-center rounded-lg hover:bg-coal sm:w-12"><Plus size={18} /></button>
            </div>
            <AddToCart p={p} variant={variant} qty={qty} className="btn-primary shine min-w-0 flex-1 px-3"><ShoppingCart size={18} /> Add to cart</AddToCart>
          </div>
          <button type="button" onClick={() => { add(p, variant, qty); router.push("/checkout"); }} className="btn-sun shine glow mt-3 w-full"><Zap size={18} /> Buy now</button>
        </>
      ) : null}
      <a href={waLink(`I want to order: ${p.name}${variant ? ` (${variant})` : ""} × ${qty}`)} target="_blank" rel="noopener"
        className="mt-3 flex w-full items-center justify-center gap-2 rounded-lg bg-[#25D366] px-5 py-3 font-semibold text-black transition hover:brightness-105">
        <WaIcon /> {price ? "Order on WhatsApp" : "Get a quote on WhatsApp"}
      </a>

      <p className="mt-5 text-sm text-mute">
        <span className="font-semibold text-soft">Pay by:</span> {paymentMethods.join(" · ")}. Online card payment coming soon.
      </p>
    </div>
  );
}
