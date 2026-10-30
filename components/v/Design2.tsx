import Link from "next/link";
import { ChevronRight, Headphones, Mail, Phone, RotateCcw, Search, ShieldCheck, Truck, Wrench, Zap } from "lucide-react";
import Logo from "../Logo";
import ProductVisual from "../ProductVisual";
import ProductCard from "../ProductCard";
import DeptIcon from "../DeptIcon";
import HeroSlider from "../home/HeroSlider";
import { CartButton } from "../cart/Cart";
import { catHref, departments, deptHref } from "@/lib/catalog";
import { brands, company, formatPKR, inDept, waLink } from "@/lib/data";
import { deals } from "./shared";
import Countdown from "./Countdown";

// Design 2 · Marketplace: dense, deal-driven store layout (Daraz / Amazon style).
export default function Design2() {
  const cats = departments.flatMap((d) => d.categories.map((c) => ({ d, c }))).slice(0, 16);
  return (
    <div className="min-h-screen bg-[#f1f3f6] text-fg">
      {/* Header: solid brand bar with big search */}
      <header className="sticky top-0 z-50 shadow-md">
        <div className="bg-brand text-white">
          <div className="mx-auto flex h-16 max-w-[1320px] items-center gap-4 px-4">
            <Link href="/" aria-label="Home" className="shrink-0"><Logo invert compact /></Link>
            <form action="/shop" className="hidden flex-1 overflow-hidden rounded-lg bg-white md:flex">
              <select aria-label="Department" className="border-r border-line bg-coal px-3 text-sm text-soft outline-none">
                <option>All</option>{departments.map((d) => <option key={d.slug}>{d.short}</option>)}
              </select>
              <input name="q" placeholder="Search panels, inverters, CCTV, smart boards…" className="min-w-0 flex-1 px-4 py-2.5 text-[15px] text-fg outline-none" />
              <button className="flex w-14 items-center justify-center bg-sun text-black" aria-label="Search"><Search size={20} /></button>
            </form>
            <a href={`tel:${company.phoneIntl}`} className="ml-auto hidden items-center gap-2 text-sm leading-tight lg:flex md:ml-0">
              <Headphones size={26} /><span><span className="block text-xs text-white/70">24/7 WhatsApp</span><b>{company.phone}</b></span>
            </a>
            <div className="ml-auto rounded-lg bg-white text-fg md:ml-0"><CartButton /></div>
          </div>
        </div>
        <nav className="border-b border-line bg-panel">
          <div className="swipe mx-auto flex max-w-[1320px] items-center gap-1 overflow-x-auto px-4 py-2 text-sm">
            <Link href="/shop" className="shrink-0 rounded-full bg-sun px-3 py-1 font-semibold text-black"><Zap size={14} className="mr-1 inline" />Hot offers</Link>
            {departments.flatMap((d) => d.categories.slice(0, 2).map((c) => (
              <Link key={c.slug} href={catHref(d, c)} className="shrink-0 rounded-full px-3 py-1 text-soft hover:bg-coal hover:text-brand">{c.name}</Link>
            )))}
          </div>
        </nav>
      </header>

      <main className="mx-auto max-w-[1320px] px-4 py-4">
        {/* Hero: slider + side panel */}
        <div className="grid gap-3 lg:grid-cols-[1fr_300px]">
          <HeroSlider />
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
            <div className="rounded-xl bg-panel p-4">
              <p className="font-bold">Order on WhatsApp</p>
              <p className="mt-1 text-sm text-mute">Add to cart, send your order, pay on delivery or by bank transfer.</p>
              <a href={waLink()} target="_blank" rel="noopener" className="mt-3 block rounded-lg bg-[#25D366] py-2 text-center text-sm font-bold text-black">Chat now</a>
            </div>
            <Link href="/product/cctv-4-camera-package" className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-sun to-sun-3 p-4 text-black">
              <p className="text-xs font-bold uppercase">Bumper offer</p>
              <p className="mt-1 text-lg font-extrabold leading-tight">4 CCTV cameras<br />installed</p>
              <p className="mt-2 text-2xl font-extrabold">{formatPKR(35999)}</p>
              <ProductVisual kind="cctv" className="absolute -bottom-4 -right-4 h-28 w-28 transition group-hover:scale-110" />
            </Link>
          </div>
        </div>

        {/* Category circles */}
        <section className="mt-4 rounded-xl bg-panel p-4 md:p-5">
          <h2 className="font-bold">Categories</h2>
          <div className="mt-4 grid grid-cols-4 gap-x-2 gap-y-4 sm:grid-cols-8" data-stagger="zoom">
            {cats.map(({ d, c }) => (
              <Link key={c.slug} href={catHref(d, c)} className="group flex flex-col items-center text-center" style={{ "--tone": d.color } as React.CSSProperties}>
                <span className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-full bg-coal ring-2 ring-transparent transition group-hover:ring-[var(--tone)] md:h-20 md:w-20">
                  <ProductVisual kind={c.kind} className="h-full w-full transition group-hover:scale-110" />
                </span>
                <span className="mt-2 line-clamp-2 text-xs font-medium leading-tight group-hover:text-[var(--tone)]">{c.name}</span>
              </Link>
            ))}
          </div>
        </section>

        {/* Flash deals */}
        <section className="mt-4 overflow-hidden rounded-xl bg-panel">
          <div className="flex flex-wrap items-center justify-between gap-3 bg-gradient-to-r from-sale to-sun-3 px-4 py-3 text-white">
            <p className="flex items-center gap-2 text-lg font-extrabold"><Zap size={20} className="animate-pulse fill-white" /> Monthly deals</p>
            <Countdown />
            <Link href="/shop" className="text-sm font-semibold hover:underline">Shop all <ChevronRight size={14} className="inline" /></Link>
          </div>
          <div className="grid grid-cols-2 gap-3 p-3 sm:grid-cols-3 lg:grid-cols-6" data-stagger>
            {deals.map((p) => (
              <Link key={p.slug} href={`/product/${p.slug}`} className="group rounded-lg p-2 transition hover:shadow-lg">
                <ProductVisual kind={p.kind} className="aspect-square rounded-lg bg-coal transition group-hover:scale-[1.03]" />
                <p className="mt-2 line-clamp-2 text-sm">{p.name}</p>
                <p className="mt-1 font-bold text-sale">{formatPKR(p.price!)}</p>
                {p.oldPrice && <p className="text-xs text-mute"><s>{formatPKR(p.oldPrice)}</s> <b className="text-sale">-{Math.round((1 - p.price! / p.oldPrice) * 100)}%</b></p>}
              </Link>
            ))}
          </div>
        </section>

        {/* Department storefronts */}
        {departments.map((d) => (
          <section key={d.slug} className="mt-4 grid overflow-hidden rounded-xl bg-panel lg:grid-cols-[260px_1fr]" style={{ "--tone": d.color } as React.CSSProperties}>
            <Link href={deptHref(d)} className="group relative flex flex-col justify-between overflow-hidden bg-[var(--tone)] p-5 text-white">
              <div>
                <DeptIcon icon={d.icon} size={28} />
                <h2 className="mt-3 text-2xl font-extrabold leading-tight">{d.name}</h2>
                <p className="mt-1 text-sm text-white/80">{d.tagline}</p>
              </div>
              <span className="mt-4 inline-flex w-fit items-center gap-1 rounded-full bg-white px-3 py-1.5 text-sm font-semibold text-[var(--tone)]">Shop all <ChevronRight size={14} /></span>
              <ProductVisual kind={d.kind} className="absolute -bottom-6 -right-6 h-36 w-36 opacity-90 transition duration-500 group-hover:scale-110" />
            </Link>
            <div className="grid grid-cols-2 gap-3 p-3 md:grid-cols-4" data-stagger>
              {inDept(d.slug).slice(0, 4).map((p) => <ProductCard key={p.slug} p={p} />)}
            </div>
          </section>
        ))}

        {/* Promises */}
        <section className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-4">
          {[[ShieldCheck, "Official warranty", "Genuine, authorised stock"], [Truck, "Nationwide delivery", "Installation in Lahore"], [Wrench, "Own install team", "Trained engineers"], [RotateCcw, "After-sales", "Repairs & service contracts"]].map(([I, t, s]) => {
            const Icon = I as typeof Truck;
            return (
              <div key={t as string} className="flex items-center gap-3 rounded-xl bg-panel p-4">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-stage-blue text-brand"><Icon size={22} /></span>
                <span><b className="block text-sm">{t as string}</b><span className="text-xs text-mute">{s as string}</span></span>
              </div>
            );
          })}
        </section>

        {/* Brands */}
        <section className="mt-4 rounded-xl bg-panel p-5">
          <h2 className="font-bold">Top brands</h2>
          <div className="mt-4 grid grid-cols-3 gap-2 sm:grid-cols-4 lg:grid-cols-8" data-stagger="zoom">
            {brands.map((b) => <span key={b} className="flex h-14 items-center justify-center rounded-lg border border-line text-sm font-extrabold text-fg/60 transition hover:border-brand hover:text-brand">{b}</span>)}
          </div>
        </section>
      </main>

      <footer className="mt-6 bg-navy pb-24 text-white/70">
        <div className="mx-auto grid max-w-[1320px] gap-8 px-4 py-12 md:grid-cols-4">
          <div><Logo invert /><p className="mt-3 text-sm">{company.address}</p></div>
          <div><p className="font-semibold text-white">Customer care</p><p className="mt-3 flex items-center gap-2 text-sm"><Phone size={15} />{company.phone}</p><p className="mt-2 flex items-center gap-2 text-sm"><Mail size={15} />{company.email}</p></div>
          <div><p className="font-semibold text-white">Shop</p><ul className="mt-3 space-y-1.5 text-sm">{departments.map((d) => <li key={d.slug}><Link href={deptHref(d)} className="hover:text-white">{d.name}</Link></li>)}</ul></div>
          <div><p className="font-semibold text-white">Pay with</p><p className="mt-3 text-sm">Cash on delivery · Bank transfer · JazzCash · Easypaisa</p></div>
        </div>
      </footer>
    </div>
  );
}
