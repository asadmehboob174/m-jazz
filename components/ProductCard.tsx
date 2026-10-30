import Link from "next/link";
import { MessageCircle, ShoppingCart, Star } from "lucide-react";
import ProductVisual from "./ProductVisual";
import { AddToCart } from "./cart/Cart";
import { formatPKR, waLink, type Product } from "@/lib/data";

export const WaIcon = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm5.3 14.1c-.2.6-1.3 1.2-1.8 1.2-.5.1-1 .2-3.3-.7-2.8-1.1-4.6-4-4.7-4.2-.1-.2-1.1-1.5-1.1-2.9s.7-2 1-2.3c.3-.3.6-.3.8-.3h.6c.2 0 .4 0 .6.5l.9 2.1c.1.2.1.4 0 .6l-.4.6-.4.5c-.1.2-.3.3-.1.6.2.3.8 1.4 1.8 2.2 1.2 1.1 2.2 1.4 2.5 1.6.3.1.5.1.7-.1l1-1.2c.2-.3.4-.2.7-.1l2 1c.3.1.5.2.5.4.1.1.1.7-.1 1.3Z" /></svg>
);

export default function ProductCard({ p }: { p: Product }) {
  const off = p.price && p.oldPrice ? Math.round((1 - p.price / p.oldPrice) * 100) : 0;
  const href = `/product/${p.slug}`;
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-panel transition duration-300 hover:-translate-y-1 hover:border-brand/40 hover:shadow-[0_18px_40px_-18px_rgba(15,23,42,0.35)]">
      <Link href={href} className="relative block aspect-square overflow-hidden bg-coal" tabIndex={-1} aria-hidden="true">
        <ProductVisual kind={p.kind} className="h-full w-full transition duration-700 ease-out group-hover:scale-110 group-hover:rotate-[-2deg]" />
        <div className="absolute left-2 top-2 flex flex-col items-start gap-1 sm:left-3 sm:top-3 sm:gap-1.5">
          {off > 0 && <span className="rounded-md bg-sale px-1.5 py-0.5 text-[11px] font-bold text-white sm:px-2 sm:text-xs">-{off}%</span>}
          {p.badge && <span className="rounded-md bg-navy px-1.5 py-0.5 text-[11px] font-semibold text-white sm:px-2 sm:text-xs">{p.badge}</span>}
        </div>
        <span className="absolute inset-x-3 bottom-3 hidden translate-y-3 items-center justify-center rounded-lg bg-panel/95 py-2 text-sm font-semibold text-fg opacity-0 shadow transition duration-300 group-hover:translate-y-0 group-hover:opacity-100 md:flex">
          View details
        </span>
      </Link>

      <div className="flex flex-1 flex-col p-3 sm:p-4">
        <p className="flex items-center justify-between gap-2 text-[11px] font-semibold uppercase tracking-wide text-mute sm:text-xs">
          <span className="truncate">{p.brand}</span>
          {p.rating && <span className="flex shrink-0 items-center gap-0.5 normal-case text-soft"><Star size={13} className="fill-sun text-sun" /> {p.rating.toFixed(1)}</span>}
        </p>
        <h3 className="mt-1 line-clamp-2 text-sm font-semibold leading-snug sm:text-[15px]">
          <Link href={href} className="hover:text-brand">{p.name}</Link>
        </h3>
        <div className="mt-auto pt-3">
          {p.price ? (
            <p className="flex flex-wrap items-baseline gap-x-2">
              <span className="text-base font-bold text-brand sm:text-lg">{p.variants ? "From " : ""}{formatPKR(p.price)}</span>
              {p.unit && <span className="text-xs text-mute sm:text-sm">{p.unit}</span>}
              {p.oldPrice && <span className="text-xs text-mute line-through sm:text-sm">{formatPKR(p.oldPrice)}</span>}
            </p>
          ) : (
            <p className="text-base font-bold text-soft sm:text-lg">Price on request</p>
          )}
          <div className="mt-3 flex gap-1.5 sm:gap-2">
            {p.variants ? (
              <Link href={href} className="flex h-10 min-w-0 flex-1 items-center justify-center gap-1.5 rounded-lg bg-brand text-[13px] font-semibold text-white transition hover:bg-brand-2 sm:text-sm">Choose option</Link>
            ) : (
              <AddToCart p={p} className="shine flex h-10 min-w-0 flex-1 items-center justify-center gap-1.5 rounded-lg bg-brand text-[13px] font-semibold text-white transition hover:bg-brand-2 sm:text-sm">
                {p.price ? <><ShoppingCart size={16} className="hidden sm:block" /> Add to cart</> : <><MessageCircle size={16} className="hidden sm:block" /> Get quote</>}
              </AddToCart>
            )}
            <a href={waLink(`I want to order: ${p.name} (${p.brand})`)} target="_blank" rel="noopener" aria-label={`Order ${p.name} on WhatsApp`}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-line text-[#1fa855] transition hover:border-[#25D366] hover:bg-[#25D366]/10">
              <WaIcon />
            </a>
          </div>
        </div>
      </div>
    </article>
  );
}
