import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { LogoMark } from "../Logo";
import ProductVisual from "../ProductVisual";
import { AddToCart, CartButton } from "../cart/Cart";
import { catHref, departments } from "@/lib/catalog";
import { company, formatPKR, getProduct, waLink } from "@/lib/data";
import DeptShowcase from "./DeptShowcase";
import { navLinks } from "./shared";

const tiles = ["6kva-solar-package", "cctv-4-camera-package", "smart-board-package", "1kw-solar-solution"];

// Design 5 · Minimal: calm, spacious, product-first (Apple style). Big type, big pictures, few lines.
export default function Design5() {
  return (
    <div className="min-h-screen bg-panel text-fg">
      <header className="sticky top-0 z-50 border-b border-line/60 bg-panel/75 backdrop-blur-xl">
        <div className="mx-auto flex h-12 max-w-5xl items-center gap-6 px-4 text-[13px]">
          <Link href="/" aria-label="Home"><LogoMark size={24} /></Link>
          <nav className="mx-auto hidden gap-7 text-fg/80 md:flex">
            {navLinks.slice(0, 8).map((l) => <Link key={l.label} href={l.href} className="transition hover:text-fg">{l.label}</Link>)}
          </nav>
          <div className="ml-auto md:ml-0"><CartButton /></div>
        </div>
      </header>

      {/* Hero */}
      <section className="overflow-hidden bg-coal px-4 pt-16 text-center md:pt-24">
        <p className="text-lg font-semibold text-sun-3" data-reveal>M.JAZE</p>
        <h1 className="mx-auto mt-2 max-w-4xl text-[44px] font-semibold leading-[1.05] tracking-[-0.03em] md:text-[80px]" data-reveal>Solar. Security.<br />Smart classrooms.</h1>
        <p className="mx-auto mt-5 max-w-xl text-xl text-mute" data-reveal>Supplied, installed and serviced by one team in Lahore.</p>
        <div className="mt-7 flex justify-center gap-6" data-reveal>
          <Link href="/shop" className="rounded-full bg-brand px-6 py-3 text-[15px] font-medium text-white hover:bg-brand-2">Shop now</Link>
          <a href={waLink("I want a free site survey.")} target="_blank" rel="noopener" className="py-3 text-[15px] font-medium text-brand hover:underline">Book a free survey ›</a>
        </div>
        <div className="scroll-grow mx-auto mt-14 grid max-w-5xl grid-cols-3 items-end gap-4">
          <ProductVisual kind="battery" className="aspect-[3/4] animate-float [animation-delay:-2s]" />
          <ProductVisual kind="panel" className="aspect-[3/4] scale-125 animate-float" />
          <ProductVisual kind="inverter" className="aspect-[3/4] animate-float [animation-delay:-4s]" />
        </div>
      </section>

      {/* Department showcase */}
      <section className="mx-auto max-w-5xl px-4 py-24">
        <h2 className="text-center text-4xl font-semibold tracking-tight md:text-5xl" data-reveal>Explore what we do.</h2>
        <div className="mt-10"><DeptShowcase /></div>
      </section>

      {/* Product tiles */}
      <section className="grid gap-3 px-3 pb-3 md:grid-cols-2">
        {tiles.map((slug, i) => {
          const p = getProduct(slug)!;
          const dark = i === 1 || i === 2;
          return (
            <div key={slug} className={`group flex min-h-[560px] flex-col items-center overflow-hidden rounded-[2rem] px-6 pt-14 text-center ${dark ? "bg-navy text-white" : "bg-coal"}`} data-reveal="zoom">
              {p.badge && <p className="text-sm font-semibold text-sun">{p.badge}</p>}
              <h3 className="mt-1 text-3xl font-semibold tracking-tight md:text-4xl">{p.name}</h3>
              <p className={`mt-2 text-lg ${dark ? "text-white/70" : "text-mute"}`}>{p.summary.split(".")[0]}.</p>
              <p className="mt-3 text-lg">From {formatPKR(p.price!)}</p>
              <div className="mt-5 flex items-center gap-5 text-[15px]">
                {p.variants ? <Link href={`/product/${slug}`} className="rounded-full bg-brand px-5 py-2 text-white">Buy</Link>
                  : <AddToCart p={p} className="rounded-full bg-brand px-5 py-2 text-white">Buy</AddToCart>}
                <Link href={`/product/${slug}`} className={dark ? "text-sun-2 hover:underline" : "text-brand hover:underline"}>Learn more ›</Link>
              </div>
              <ProductVisual kind={p.kind} className="mt-auto h-72 w-72 transition duration-700 group-hover:-translate-y-3 group-hover:scale-105" />
            </div>
          );
        })}
      </section>

      {/* Categories row */}
      <section className="mx-auto max-w-6xl px-4 py-24">
        <h2 className="text-3xl font-semibold tracking-tight md:text-4xl" data-reveal>Shop by category.</h2>
        <div className="swipe -mx-4 mt-8 flex gap-6 overflow-x-auto px-4 pb-4" data-stagger>
          {departments.flatMap((d) => d.categories.map((c) => ({ d, c }))).map(({ d, c }) => (
            <Link key={c.slug} href={catHref(d, c)} className="group w-28 shrink-0 text-center">
              <ProductVisual kind={c.kind} className="mx-auto h-20 w-20 transition group-hover:scale-110" />
              <span className="mt-2 block text-[13px] font-medium">{c.name}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Why */}
      <section className="bg-coal px-4 py-24">
        <div className="mx-auto grid max-w-5xl gap-12 md:grid-cols-[1fr_1.4fr]">
          <h2 className="text-4xl font-semibold tracking-tight md:sticky md:top-24 md:self-start md:text-5xl" data-reveal>Why people choose M.JAZE.</h2>
          <ul className="space-y-10" data-stagger>
            {[["Genuine products", "Authorised Dahua reseller, official warranty on every product."], ["Our own engineers", "No sub-contractors. The team that sells it installs it."], ["After-sales that answers", `Repairs, cleaning and service contracts. WhatsApp ${company.phone}.`], [`${company.years} years in Lahore`, "Homes, schools, factories and plazas across the city."]].map(([t, d]) => (
              <li key={t}><h3 className="text-2xl font-semibold">{t}</h3><p className="mt-2 text-lg text-mute">{d}</p></li>
            ))}
          </ul>
        </div>
      </section>

      <footer className="px-4 pb-24 pt-10 text-xs text-mute">
        <div className="mx-auto max-w-5xl border-t border-line pt-6">
          <div className="grid gap-6 sm:grid-cols-5">
            {departments.map((d) => (
              <div key={d.slug}>
                <p className="font-semibold text-fg">{d.short}</p>
                <ul className="mt-2 space-y-1.5">{d.categories.slice(0, 4).map((c) => <li key={c.slug}><Link href={catHref(d, c)} className="hover:underline">{c.name}</Link></li>)}</ul>
              </div>
            ))}
          </div>
          <p className="mt-8 flex flex-wrap items-center gap-1 border-t border-line pt-4">© {new Date().getFullYear()} {company.legal}. <ChevronRight size={12} /> {company.address}</p>
        </div>
      </footer>
    </div>
  );
}
