import Link from "next/link";
import { Star } from "lucide-react";
import ProductVisual from "./ProductVisual";
import { formatPKR, waLink, type Product } from "@/lib/data";

export default function ProductCard({ p }: { p: Product }) {
  const off = p.oldPrice ? Math.round((1 - p.price / p.oldPrice) * 100) : 0;
  const href = `/shop/${p.slug}`;
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-xl border border-line bg-panel transition duration-300 hover:-translate-y-0.5 hover:border-fg/20 hover:shadow-[0_12px_32px_-16px_rgba(15,23,42,0.28)]">
      <Link href={href} className="relative block aspect-square bg-coal" tabIndex={-1} aria-hidden="true">
        <ProductVisual kind={p.kind} className="h-full w-full transition duration-500 group-hover:scale-[1.04]" />
        <div className="absolute left-2 top-2 flex flex-col items-start gap-1 sm:left-3 sm:top-3 sm:gap-1.5">
          {off > 0 && <span className="rounded bg-sale px-1.5 py-0.5 text-[11px] sm:px-2 sm:text-xs font-bold text-white">-{off}%</span>}
          {p.badge && <span className="rounded bg-navy px-1.5 py-0.5 text-[11px] sm:px-2 sm:text-xs font-semibold text-white">{p.badge}</span>}
        </div>
      </Link>

      <div className="flex flex-1 flex-col p-3 sm:p-4">
        <p className="truncate text-[11px] font-semibold uppercase tracking-wide text-mute sm:text-xs">{p.brand}</p>
        <h3 className="mt-1 line-clamp-2 text-sm font-semibold leading-snug sm:text-[15px]">
          <Link href={href} className="hover:text-brand">{p.name}</Link>
        </h3>
        {p.rating && (
          <p className="mt-1.5 flex items-center gap-1 text-[13px] text-mute">
            <Star size={14} className="fill-sun text-sun" /> {p.rating.toFixed(1)}
          </p>
        )}
        <div className="mt-auto pt-3">
          <p className="flex flex-wrap items-baseline gap-x-2">
            <span className="text-base font-bold sm:text-lg">{formatPKR(p.price)}</span>
            {p.unit && <span className="text-xs text-mute sm:text-sm">{p.unit}</span>}
            {p.oldPrice && <span className="text-xs text-mute line-through sm:text-sm">{formatPKR(p.oldPrice)}</span>}
          </p>
          <p className="mt-0.5 text-[13px] font-medium text-ok">In stock</p>
          <div className="mt-3 flex gap-1.5 sm:gap-2">
            <Link href={href} className="flex h-10 min-w-0 flex-1 items-center justify-center rounded-lg bg-brand text-[13px] font-semibold text-white hover:bg-brand-2 sm:text-sm">
              <span className="sm:hidden">View</span><span className="hidden sm:inline">View details</span>
            </Link>
            <a href={waLink(`I want to order: ${p.brand} ${p.name}`)} target="_blank" rel="noopener" aria-label={`Order ${p.name} on WhatsApp`}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-line text-[#1fa855] hover:border-[#25D366] hover:bg-[#25D366]/10">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm5.3 14.1c-.2.6-1.3 1.2-1.8 1.2-.5.1-1 .2-3.3-.7-2.8-1.1-4.6-4-4.7-4.2-.1-.2-1.1-1.5-1.1-2.9s.7-2 1-2.3c.3-.3.6-.3.8-.3h.6c.2 0 .4 0 .6.5l.9 2.1c.1.2.1.4 0 .6l-.4.6-.4.5c-.1.2-.3.3-.1.6.2.3.8 1.4 1.8 2.2 1.2 1.1 2.2 1.4 2.5 1.6.3.1.5.1.7-.1l1-1.2c.2-.3.4-.2.7-.1l2 1c.3.1.5.2.5.4.1.1.1.7-.1 1.3Z" /></svg>
            </a>
          </div>
        </div>
      </div>
    </article>
  );
}
