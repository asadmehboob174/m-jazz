import Link from "next/link";
import { ArrowRight, ChevronRight, Flame, Headphones } from "lucide-react";
import DeptIcon from "../DeptIcon";
import ProductVisual from "../ProductVisual";
import { catHref, departments, deptHref } from "@/lib/catalog";
import { formatPKR, getProduct, inCat, waLink } from "@/lib/data";

const hot = [["cctv-4-camera-package", "4 CCTV cameras"], ["1kw-solar-solution", "1 kW solar"], ["smart-board-package", "Smart board"], ["6kva-solar-package", "6 kVA solar"]];

// Desktop department list next to the hero (like big electronics stores).
// Hovering a department opens a panel of its categories over the slider; pure CSS, no JS.
export default function CategorySidebar() {
  return (
    <aside style={{ "--d": "220ms" } as React.CSSProperties} className="intro-left hero-sidebar relative hidden flex-col rounded-2xl border border-line bg-panel lg:flex" aria-label="Shop by department">
      <ul className="flex-1 py-2">
        {departments.map((d) => (
          <li key={d.slug} className="group/item" style={{ "--tone": d.color } as React.CSSProperties}>
            <Link href={deptHref(d)} className="mx-2 flex items-center gap-3 rounded-lg px-2.5 py-2.5 transition group-hover/item:bg-[color-mix(in_oklab,var(--tone)_9%,var(--color-panel))]">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[color-mix(in_oklab,var(--tone)_12%,var(--color-panel))] text-[var(--tone)] transition group-hover/item:scale-110 group-hover/item:bg-[var(--tone)] group-hover/item:text-white">
                <DeptIcon icon={d.icon} size={18} />
              </span>
              <span className="min-w-0 flex-1 leading-tight">
                <span className="block text-[14.5px] font-semibold group-hover/item:text-[var(--tone)]">{d.name}</span>
                <span className="block truncate text-xs text-mute">{d.categories.slice(0, 2).map((c) => c.name).join(", ")}</span>
              </span>
              <ChevronRight size={16} className="text-mute transition group-hover/item:translate-x-0.5 group-hover/item:text-[var(--tone)]" />
            </Link>

            {/* Flyout */}
            <div className="invisible absolute left-full top-0 z-30 flex min-h-full w-[min(680px,calc(100vw-340px))] pl-3 opacity-0 transition duration-200 group-hover/item:visible group-hover/item:opacity-100">
              <div className="flex flex-1 -translate-x-2 flex-col rounded-2xl border border-line bg-panel p-5 shadow-[0_24px_60px_-20px_rgba(15,23,42,0.35)] transition duration-300 group-hover/item:translate-x-0">
                <div className="flex items-center justify-between">
                  <p className="font-bold text-[var(--tone)]">{d.name}</p>
                  <Link href={deptHref(d)} className="flex items-center gap-1 text-sm font-semibold text-soft hover:text-[var(--tone)]">View all <ArrowRight size={14} /></Link>
                </div>
                <p className="mt-1 text-sm text-mute">{d.blurb}</p>
                <div className="mt-4 grid flex-1 grid-cols-3 content-start gap-3">
                  {d.categories.map((c) => (
                    <Link key={c.slug} href={catHref(d, c)} className="group/cat rounded-xl border border-line p-2.5 text-center transition hover:-translate-y-0.5 hover:border-[var(--tone)]">
                      <ProductVisual kind={c.kind} className="aspect-[5/3] rounded-lg bg-coal transition group-hover/cat:bg-[color-mix(in_oklab,var(--tone)_8%,var(--color-panel))]" />
                      <span className="mt-2 block text-[13px] font-semibold leading-tight group-hover/cat:text-[var(--tone)]">{c.name}</span>
                      <span className="text-[11px] text-mute">{inCat(c.slug).length} {inCat(c.slug).length === 1 ? "item" : "items"}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <div className="mx-4 mb-3 border-t border-line pt-3">
        <p className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wide text-sale"><Flame size={13} /> Hot offers</p>
        <ul className="mt-1.5">
          {hot.map(([slug, label]) => {
            const p = getProduct(slug)!;
            return (
              <li key={slug}>
                <Link href={`/product/${slug}`} className="group flex items-baseline justify-between gap-2 py-1 text-[13px] text-soft hover:text-brand">
                  <span className="truncate transition group-hover:translate-x-0.5">{label}</span>
                  <span className="shrink-0 font-semibold text-fg">{formatPKR(p.price!)}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
      <a href={waLink("I need help choosing the right product.")} target="_blank" rel="noopener"
        className="group m-2 mt-0 flex items-center gap-3 rounded-xl bg-coal p-3 transition hover:bg-stage-blue">
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-panel text-brand shadow-sm"><Headphones size={18} /></span>
        <span className="leading-tight"><span className="block text-sm font-semibold">Need help choosing?</span><span className="text-xs text-mute">Talk to our team →</span></span>
      </a>
    </aside>
  );
}
