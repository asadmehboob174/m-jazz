"use client";

import Link from "next/link";
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { CheckCircle2, Minus, Plus, ShoppingCart, Trash2, X } from "lucide-react";
import ProductVisual from "../ProductVisual";
import { formatPKR, getProduct, priceOf, waLink, type Product } from "@/lib/data";

type Line = { slug: string; variant?: string; qty: number };
export type Item = Line & { p: Product; price: number };

type Ctx = {
  items: Item[];
  count: number;
  total: number;
  add: (p: Product, variant?: string, qty?: number) => void;
  setQty: (i: number, qty: number) => void;
  remove: (i: number) => void;
  clear: () => void;
  open: boolean;
  setOpen: (v: boolean) => void;
};

const CartCtx = createContext<Ctx | null>(null);
export const useCart = () => useContext(CartCtx)!;
const KEY = "mjaze-cart";

// The order text sent to WhatsApp. Until online payment is added, every order is confirmed there.
export function orderMessage(items: Item[], total: number, details: [string, string][] = [], ref?: string) {
  const lines = items.map((it, n) =>
    `${n + 1}) ${it.p.name}${it.variant ? ` (${it.variant})` : ""} × ${it.qty}${it.p.unit ? ` ${it.p.unit}` : ""} = ${formatPKR(it.price * it.qty)}`);
  return [
    `*New order${ref ? ` ${ref}` : ""}, M.JAZE website*`,
    "",
    ...lines,
    "",
    `*Total: ${formatPKR(total)}*`,
    ...(details.length ? ["", ...details.filter(([, v]) => v).map(([k, v]) => `${k}: ${v}`)] : []),
    "",
    "Please confirm availability and delivery.",
  ].join("\n");
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [lines, setLines] = useState<Line[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [open, setOpen] = useState(false);
  const [toast, setToast] = useState<{ id: number; name: string } | null>(null);

  useEffect(() => {
    try { setLines(JSON.parse(localStorage.getItem(KEY) || "[]")); } catch {}
    setLoaded(true);
  }, []);
  useEffect(() => {
    if (loaded) try { localStorage.setItem(KEY, JSON.stringify(lines)); } catch {}
  }, [lines, loaded]);
  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 3200);
    return () => clearTimeout(t);
  }, [toast]);

  const add = useCallback((p: Product, variant?: string, qty = 1) => {
    setLines((ls) => {
      const i = ls.findIndex((l) => l.slug === p.slug && l.variant === variant);
      if (i < 0) return [...ls, { slug: p.slug, variant, qty }];
      return ls.map((l, n) => (n === i ? { ...l, qty: l.qty + qty } : l));
    });
    setToast({ id: Date.now(), name: p.name });
  }, []);

  const value = useMemo<Ctx>(() => {
    const items = lines.flatMap((l) => {
      const p = getProduct(l.slug);
      const price = p && priceOf(p, l.variant);
      return p && price ? [{ ...l, p, price }] : [];
    });
    return {
      items,
      count: items.reduce((s, i) => s + i.qty, 0),
      total: items.reduce((s, i) => s + i.price * i.qty, 0),
      add,
      setQty: (i, qty) => setLines((ls) => ls.map((l, n) => (n === i ? { ...l, qty: Math.max(1, qty) } : l))),
      remove: (i) => setLines((ls) => ls.filter((_, n) => n !== i)),
      clear: () => setLines([]),
      open,
      setOpen,
    };
  }, [lines, open, add]);

  return (
    <CartCtx.Provider value={value}>
      {children}
      <CartDrawer />
      {toast && (
        <div key={toast.id} role="status" className="fixed inset-x-4 bottom-24 z-[80] mx-auto flex max-w-sm animate-[rv-up_.5s_cubic-bezier(.22,1,.36,1)_both] items-center gap-3 rounded-xl bg-navy p-3 pl-4 text-sm text-white shadow-2xl sm:bottom-6">
          <CheckCircle2 size={20} className="shrink-0 text-[#5eea9a]" />
          <span className="min-w-0 flex-1"><span className="block truncate font-semibold">{toast.name}</span>added to your cart</span>
          <button type="button" onClick={() => { setToast(null); setOpen(true); }} className="shrink-0 rounded-lg bg-sun px-3 py-2 font-semibold text-black">View cart</button>
        </div>
      )}
    </CartCtx.Provider>
  );
}

export function CartButton() {
  const { count, total, setOpen } = useCart();
  return (
    <button type="button" onClick={() => setOpen(true)} aria-label={`Cart, ${count} items`} className="relative flex h-10 items-center gap-2.5 rounded-lg px-2 hover:bg-coal">
      <span className="relative">
        <ShoppingCart size={22} />
        <span key={count} className="absolute -right-2 -top-2 flex h-[18px] min-w-[18px] animate-[bump_.4s_ease] items-center justify-center rounded-full bg-sun px-1 text-[10px] font-bold text-black">{count}</span>
      </span>
      <span className="hidden text-left leading-tight lg:block">
        <span className="block text-xs text-mute">My cart</span>
        <span className="block text-sm font-semibold">{formatPKR(total)}</span>
      </span>
    </button>
  );
}

export function AddToCart({ p, variant, qty = 1, className = "", children }: { p: Product; variant?: string; qty?: number; className?: string; children?: React.ReactNode }) {
  const { add } = useCart();
  if (!priceOf(p, variant)) {
    return (
      <a href={waLink(`I want a quote for: ${p.name}`)} target="_blank" rel="noopener" className={className}>
        {children ?? "Get quote"}
      </a>
    );
  }
  return (
    <button type="button" onClick={() => add(p, variant, qty)} className={className}>
      {children ?? <><ShoppingCart size={17} /> Add to cart</>}
    </button>
  );
}

function CartDrawer() {
  const { items, total, open, setOpen, setQty, remove } = useCart();
  useEffect(() => {
    if (!open) return;
    const esc = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", esc);
    document.documentElement.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", esc); document.documentElement.style.overflow = ""; };
  }, [open, setOpen]);

  return (
    <div className={`fixed inset-0 z-[90] overflow-hidden ${open ? "" : "pointer-events-none"}`} aria-hidden={!open}>
      <div onClick={() => setOpen(false)} className={`absolute inset-0 bg-navy/50 backdrop-blur-[2px] transition-opacity duration-300 ${open ? "opacity-100" : "opacity-0"}`} />
      <aside role="dialog" aria-modal="true" aria-label="Shopping cart" inert={!open} data-lenis-prevent
        className={`absolute inset-y-0 right-0 flex w-full max-w-md flex-col bg-panel shadow-2xl transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] ${open ? "translate-x-0" : "translate-x-full"}`}>
        <div className="flex items-center justify-between border-b border-line px-5 py-4">
          <h2 className="text-lg font-bold">Your cart <span className="text-mute">({items.length})</span></h2>
          <button type="button" aria-label="Close cart" onClick={() => setOpen(false)} className="flex h-10 w-10 items-center justify-center rounded-lg hover:bg-coal"><X size={22} /></button>
        </div>

        {items.length ? (
          <>
            <ul className="flex-1 divide-y divide-line overflow-y-auto px-5">
              {items.map((it, i) => (
                <li key={`${it.slug}-${it.variant}`} className="flex gap-3 py-4">
                  <ProductVisual kind={it.p.kind} className="h-20 w-20 shrink-0 rounded-lg bg-coal" />
                  <div className="min-w-0 flex-1">
                    <Link href={`/product/${it.slug}`} onClick={() => setOpen(false)} className="line-clamp-2 text-sm font-semibold hover:text-brand">{it.p.name}</Link>
                    {it.variant && <p className="text-xs text-mute">{it.variant}</p>}
                    <p className="mt-1 text-sm font-bold">{formatPKR(it.price)} <span className="font-normal text-mute">{it.p.unit}</span></p>
                    <div className="mt-2 flex items-center justify-between">
                      <div className="flex items-center rounded-lg border border-line">
                        <button type="button" aria-label="Decrease" onClick={() => setQty(i, it.qty - 1)} className="flex h-8 w-8 items-center justify-center hover:bg-coal"><Minus size={15} /></button>
                        <span className="w-7 text-center text-sm font-semibold">{it.qty}</span>
                        <button type="button" aria-label="Increase" onClick={() => setQty(i, it.qty + 1)} className="flex h-8 w-8 items-center justify-center hover:bg-coal"><Plus size={15} /></button>
                      </div>
                      <button type="button" aria-label={`Remove ${it.p.name}`} onClick={() => remove(i)} className="flex h-8 w-8 items-center justify-center rounded-lg text-mute hover:bg-sale/10 hover:text-sale"><Trash2 size={16} /></button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <div className="border-t border-line bg-coal px-5 py-4">
              <div className="flex items-baseline justify-between">
                <span className="text-soft">Subtotal</span>
                <span className="text-xl font-bold">{formatPKR(total)}</span>
              </div>
              <p className="mt-1 text-xs text-mute">Delivery and installation are confirmed with you on WhatsApp.</p>
              <Link href="/checkout" onClick={() => setOpen(false)} className="btn-primary shine mt-4 w-full">Checkout</Link>
              <a href={waLink(orderMessage(items, total))} target="_blank" rel="noopener"
                className="mt-2 flex w-full items-center justify-center gap-2 rounded-lg bg-[#25D366] px-5 py-3 text-[15px] font-semibold text-black hover:brightness-105">
                Quick order on WhatsApp
              </a>
            </div>
          </>
        ) : (
          <div className="flex flex-1 flex-col items-center justify-center p-8 text-center">
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-stage-blue text-brand"><ShoppingCart size={28} /></span>
            <p className="mt-4 font-semibold">Your cart is empty</p>
            <p className="mt-1 text-sm text-mute">Browse solar, security, IT and more.</p>
            <Link href="/shop" onClick={() => setOpen(false)} className="btn-primary mt-5">Start shopping</Link>
          </div>
        )}
      </aside>
    </div>
  );
}
