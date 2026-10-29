import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import ProductVisual from "./ProductVisual";
import { formatPKR, type Product } from "@/lib/data";

export default function ProductCard({ p }: { p: Product }) {
  const off = p.oldPrice ? Math.round((1 - p.price / p.oldPrice) * 100) : 0;
  return (
    <Link href={`/shop/${p.slug}`} className="group block">
      <div className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-fg/[0.07] bg-gradient-to-b from-stage to-stage-end transition duration-500 group-hover:border-sun/40">
        <ProductVisual kind={p.kind} className="h-full w-full transition duration-700 group-hover:scale-[1.06]" />
        <div className="absolute left-4 top-4 flex gap-2">
          {p.badge && <span className="rounded-full bg-fg/10 px-3 py-1 text-xs font-medium">{p.badge}</span>}
          {off > 0 && <span className="rounded-full bg-sun px-3 py-1 text-xs font-bold text-black">-{off}%</span>}
        </div>
        <span className="absolute bottom-4 right-4 flex h-11 w-11 translate-y-3 items-center justify-center rounded-full bg-fg text-ink opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          <ArrowUpRight size={20} />
        </span>
      </div>
      <div className="mt-4 px-1">
        <p className="tag">{p.brand}</p>
        <h3 className="mt-1.5 text-[17px] font-medium leading-snug">{p.name}</h3>
        <p className="mt-2 flex items-baseline gap-2">
          <span className="font-semibold">{formatPKR(p.price)}</span>
          {p.oldPrice && <span className="text-sm text-mute line-through">{formatPKR(p.oldPrice)}</span>}
        </p>
      </div>
    </Link>
  );
}
