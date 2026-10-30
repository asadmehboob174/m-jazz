import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import ProductVisual from "../ProductVisual";
import DeptIcon from "../DeptIcon";
import { catHref, departments, deptHref } from "@/lib/catalog";
import { formatPKR, process, products } from "@/lib/data";

// Building blocks with scroll animations for the Lamp and Aurora designs.

// Heading whose words rise in one by one when scrolled into view.
export function Words({ text, accent = [], className = "" }: { text: string; accent?: string[]; className?: string }) {
  return (
    <h2 data-words className={`text-[30px] font-extrabold leading-[1.08] tracking-[-0.03em] md:text-[48px] ${className}`}>
      {text.split(" ").map((w, i) => <span key={i} style={{ "--i": i } as React.CSSProperties} className={accent.includes(w) ? "text-brand" : ""}>{w}&nbsp;</span>)}
    </h2>
  );
}

export function Eyebrow({ children }: { children: React.ReactNode }) {
  return <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-line bg-panel px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] text-sun-3 shadow-sm"><span className="h-1.5 w-1.5 animate-pulse rounded-full bg-sun" /><span className="shiny">{children}</span></p>;
}

// Big outlined words that slide sideways as the page scrolls (Magic UI "scroll based velocity").
export function ScrollText({ rows = [["Solar", "Lithium", "Inverters", "EV chargers", "UPS"], ["CCTV", "Fire alarm", "Smart boards", "Projectors", "Rentals"]] }: { rows?: string[][] }) {
  return (
    <section className="overflow-hidden py-10 md:py-16" aria-hidden="true">
      {rows.map((r, n) => (
        <div key={n} className={`flex whitespace-nowrap ${n ? "sv-right" : "sv-left"}`}>
          {[...r, ...r, ...r].map((w, i) => (
            <span key={i} className={`flex items-center gap-6 px-6 text-[56px] font-black uppercase leading-none tracking-tight md:text-[110px] ${i % 2 ? "text-outline" : n ? "text-sun" : "text-brand"}`}>
              {w}<span className="text-[0.4em] text-sun">✦</span>
            </span>
          ))}
        </div>
      ))}
    </section>
  );
}

// Division cards that pin and pile up on each other as you scroll.
export function StackCards() {
  return (
    <div className="relative">
      {departments.map((d, i) => (
        <div key={d.slug} className="sticky pb-8" style={{ top: `${96 + i * 22}px`, "--tone": d.color } as React.CSSProperties}>
          <article className="sv-stack grid origin-top overflow-hidden rounded-[2rem] border border-line bg-panel shadow-[0_30px_60px_-30px_rgba(15,23,42,.35)] md:grid-cols-[1.1fr_1fr]">
            <div className="p-7 md:p-10">
              <div className="flex items-center gap-3">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--tone)] text-white shadow-[0_10px_24px_-8px_var(--tone)]"><DeptIcon icon={d.icon} size={24} /></span>
                <span className="text-sm font-bold text-[var(--tone)]">0{i + 1} / 05</span>
              </div>
              <h3 className="mt-5 text-3xl font-extrabold tracking-tight md:text-4xl">{d.name}</h3>
              <p className="mt-3 max-w-md text-lg text-mute">{d.blurb}</p>
              <ul className="mt-5 grid max-w-md gap-2 sm:grid-cols-2">
                {d.categories.map((c) => <li key={c.slug}><Link href={catHref(d, c)} className="flex items-center gap-2 text-[15px] hover:text-[var(--tone)]"><Check size={16} className="text-[var(--tone)]" />{c.name}</Link></li>)}
              </ul>
              <Link href={deptHref(d)} className="group mt-7 inline-flex items-center gap-2 rounded-full bg-[var(--tone)] px-5 py-2.5 font-semibold text-white">Shop {d.short} <ArrowRight size={17} className="transition group-hover:translate-x-1" /></Link>
            </div>
            <div className="relative min-h-[260px] bg-[radial-gradient(circle_at_50%_40%,color-mix(in_oklab,var(--tone)_22%,var(--color-panel)),var(--color-coal))]">
              <div className="absolute inset-[10%]"><ProductVisual kind={d.kind} className="h-full w-full" /></div>
            </div>
          </article>
        </div>
      ))}
    </div>
  );
}

// Vertical timeline whose line fills as you scroll (Aceternity "Timeline").
export function Timeline() {
  return (
    <div className="relative mx-auto max-w-3xl pl-12 md:pl-0">
      <div aria-hidden="true" className="absolute bottom-0 left-4 top-0 w-[3px] rounded-full bg-line md:left-1/2 md:-translate-x-1/2">
        <div className="trace-y h-full w-full rounded-full bg-gradient-to-b from-brand via-brand to-sun shadow-[0_0_14px_var(--color-sun)]" />
      </div>
      {process.map((s, i) => (
        <div key={s.n} className={`relative mb-14 md:grid md:grid-cols-2 md:gap-16 ${i % 2 ? "" : ""}`}>
          <span className="absolute -left-12 top-1 flex h-9 w-9 items-center justify-center rounded-full border-4 border-panel bg-brand text-xs font-bold text-white shadow md:left-1/2 md:-translate-x-1/2">{i + 1}</span>
          <div className={i % 2 ? "md:col-start-2" : "md:text-right"} data-reveal={i % 2 ? "right" : "left"}>
            <span className="text-sm font-semibold text-sun-3">{s.time}</span>
            <h3 className="mt-1 text-2xl font-bold">{s.t}</h3>
            <p className="mt-2 text-mute">{s.d}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

// Three columns of products drifting in opposite directions with the scroll (Aceternity "Parallax Scroll").
export function ParallaxColumns() {
  const items = products.filter((p) => p.price).slice(0, 12);
  const cols = [0, 1, 2].map((c) => items.filter((_, i) => i % 3 === c));
  return (
    <div className="grid h-[640px] grid-cols-2 gap-4 overflow-hidden md:h-[760px] md:grid-cols-3 [mask-image:linear-gradient(to_bottom,transparent,#000_12%,#000_88%,transparent)]">
      {cols.map((col, c) => (
        <div key={c} className={`flex flex-col gap-4 pt-10 ${c === 1 ? "sv-coldown" : "sv-colup"} ${c === 2 ? "hidden md:flex" : ""}`}>
          {col.map((p) => (
            <Link key={p.slug} href={`/product/${p.slug}`} className="group rounded-3xl border border-line bg-panel p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
              <ProductVisual kind={p.kind} className="aspect-square rounded-2xl bg-coal transition duration-500 group-hover:scale-[1.04]" />
              <p className="mt-3 truncate font-semibold">{p.name}</p>
              <p className="text-sm font-bold text-brand">{formatPKR(p.price!)}</p>
            </Link>
          ))}
        </div>
      ))}
    </div>
  );
}
