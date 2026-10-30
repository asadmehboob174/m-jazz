import Link from "next/link";
import { ChevronRight, Headphones, RotateCcw, ShieldCheck, Truck, Wrench, Zap } from "lucide-react";
import ProductVisual from "../ProductVisual";
import ProductCard from "../ProductCard";
import DeptIcon from "../DeptIcon";
import Marquee from "../Marquee";
import Footer from "../Footer";
import HeroSlider from "../home/HeroSlider";
import CategorySidebar from "../home/CategorySidebar";
import Packages from "../home/Packages";
import { CountUp } from "../Reveal";
import { Countdown, VHeader } from "./Kit";
import { catHref, departments, deptHref } from "@/lib/catalog";
import { brands, company, formatPKR, getProduct, inDept, products, stats, waLink } from "@/lib/data";
import { ticker } from "@/lib/site";

// Design 3 · Store: a full electronics-store layout (powerplanet.pk style) with Magic UI touches.
export default function Design3() {
  const deals = products.filter((p) => p.price && !p.sample);
  const cats = departments.flatMap((d) => d.categories.map((c) => ({ d, c })));
  const side = ["cctv-4-camera-package", "smart-board-package"].map((s) => getProduct(s)!);
  return (
    <div className="min-h-screen bg-[#eef1f6] text-fg">
      <div className="bg-navy py-2 text-[13px] text-white/80">
        <div className="mx-auto flex max-w-[1320px] items-center justify-between gap-4 px-4">
          <span className="truncate"><b className="text-sun-2">Authorised Dahua reseller</b> · {company.years} years in Lahore</span>
          <a href={`tel:${company.phoneIntl}`} className="shrink-0 font-semibold text-white">{company.phone}</a>
        </div>
      </div>
      <VHeader tone="brand" search className="sticky top-0 bg-brand shadow-lg" />
      <div className="bg-navy py-2 text-sm font-medium text-white">
        <Marquee>{ticker.map((t) => <span key={t} className="flex items-center gap-3 px-4"><Zap size={13} className="fill-sun text-sun" />{t}</span>)}</Marquee>
      </div>

      <main className="mx-auto max-w-[1320px] px-4 py-4">
        <div className="grid gap-4 lg:grid-cols-[240px_1fr] xl:grid-cols-[240px_1fr_260px]">
          <CategorySidebar />
          <HeroSlider />
          <div className="hidden flex-col gap-4 xl:flex">
            {side.map((p, i) => (
              <Link key={p.slug} href={`/product/${p.slug}`} className={`group relative flex flex-1 flex-col overflow-hidden rounded-2xl p-5 ${i ? "bg-[#6d28d9] text-white" : "bg-gradient-to-br from-sun to-sun-3 text-black"}`}>
                <span className="text-xs font-bold uppercase">{p.badge}</span>
                <span className="mt-1 text-lg font-extrabold leading-tight">{p.name}</span>
                <span className="mt-2 text-2xl font-extrabold">{formatPKR(p.price!)}</span>
                <ProductVisual kind={p.kind} className="absolute -bottom-4 -right-4 h-32 w-32 transition duration-500 group-hover:scale-110" />
              </Link>
            ))}
            <a href={waLink()} target="_blank" rel="noopener" className="flex items-center gap-3 rounded-2xl bg-panel p-4">
              <Headphones size={28} className="text-brand" /><span className="text-sm leading-tight"><b className="block">Order on WhatsApp</b><span className="text-mute">Fast reply, cash on delivery</span></span>
            </a>
          </div>
        </div>

        {/* Number ticker strip */}
        <section className="mt-4 grid grid-cols-2 gap-px overflow-hidden rounded-2xl bg-line md:grid-cols-4" data-stagger>
          {stats.map((s) => (
            <div key={s.l} className="bg-panel p-5">
              <p className="text-3xl font-extrabold text-brand"><CountUp to={s.to} suffix={s.suffix} /></p>
              <p className="text-sm text-mute">{s.l}</p>
            </div>
          ))}
        </section>

        {/* Category circles */}
        <section className="mt-4 rounded-2xl bg-panel p-5">
          <div className="flex items-center justify-between"><h2 className="text-xl font-extrabold">Shop by category</h2><Link href="/shop" className="text-sm font-semibold text-brand">View all</Link></div>
          <div className="swipe -mx-5 mt-4 flex gap-5 overflow-x-auto px-5 pb-1" data-stagger="zoom">
            {cats.map(({ d, c }) => (
              <Link key={c.slug} href={catHref(d, c)} style={{ "--tone": d.color } as React.CSSProperties} className="group flex w-24 shrink-0 flex-col items-center text-center">
                <span className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-full bg-[color-mix(in_oklab,var(--tone)_10%,white)] ring-2 ring-transparent transition group-hover:ring-[var(--tone)]">
                  <ProductVisual kind={c.kind} className="h-full w-full transition group-hover:scale-110" />
                </span>
                <span className="mt-2 text-xs font-semibold leading-tight group-hover:text-[var(--tone)]">{c.name}</span>
              </Link>
            ))}
          </div>
        </section>

        {/* Flash deals */}
        <section className="mt-4 overflow-hidden rounded-2xl bg-panel">
          <div className="flex flex-wrap items-center justify-between gap-3 bg-gradient-to-r from-sale via-sun-3 to-sun px-5 py-3 text-white">
            <p className="flex items-center gap-2 text-lg font-extrabold"><Zap size={20} className="animate-pulse fill-white" /> Flash deals</p>
            <Countdown />
            <Link href="/shop" className="text-sm font-semibold">See all <ChevronRight size={14} className="inline" /></Link>
          </div>
          <div className="grid grid-cols-2 gap-3 p-4 md:grid-cols-3 lg:grid-cols-6" data-stagger>{deals.map((p) => <ProductCard key={p.slug} p={p} />)}</div>
        </section>

        {/* Department storefronts */}
        {departments.map((d) => (
          <section key={d.slug} className="mt-4 overflow-hidden rounded-2xl bg-panel" style={{ "--tone": d.color } as React.CSSProperties}>
            <div className="flex flex-wrap items-center gap-3 border-b border-line px-5 py-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[var(--tone)] text-white"><DeptIcon icon={d.icon} size={18} /></span>
              <h2 className="text-lg font-extrabold">{d.name}</h2>
              <div className="swipe ml-auto flex gap-1 overflow-x-auto">
                {d.categories.slice(0, 4).map((c) => <Link key={c.slug} href={catHref(d, c)} className="shrink-0 rounded-full border border-line px-3 py-1 text-xs font-medium hover:border-[var(--tone)] hover:text-[var(--tone)]">{c.name}</Link>)}
                <Link href={deptHref(d)} className="shrink-0 rounded-full bg-[var(--tone)] px-3 py-1 text-xs font-semibold text-white">View all</Link>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3 p-4 md:grid-cols-4 lg:grid-cols-5" data-stagger>{inDept(d.slug).slice(0, 5).map((p) => <ProductCard key={p.slug} p={p} />)}</div>
          </section>
        ))}
      </main>

      <Packages />

      <div className="mx-auto max-w-[1320px] px-4 py-6">
        <section className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {([[ShieldCheck, "Official warranty", "Genuine, authorised stock"], [Truck, "Nationwide delivery", "Installation in Lahore"], [Wrench, "Own install team", "Trained engineers"], [RotateCcw, "After-sales", "Repairs & service contracts"]] as const).map(([Icon, t, s]) => (
            <div key={t} className="flex items-center gap-3 rounded-2xl bg-panel p-4">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-stage-blue text-brand"><Icon size={22} /></span>
              <span><b className="block text-sm">{t}</b><span className="text-xs text-mute">{s}</span></span>
            </div>
          ))}
        </section>
        <section className="mt-4 rounded-2xl bg-panel p-5">
          <h2 className="text-xl font-extrabold">Top brands</h2>
          <div className="mt-4 grid grid-cols-3 gap-2 sm:grid-cols-4 lg:grid-cols-8" data-stagger="zoom">
            {brands.map((b) => <span key={b} className="flex h-14 items-center justify-center rounded-xl border border-line text-sm font-extrabold text-fg/55 transition hover:border-brand hover:text-brand">{b}</span>)}
          </div>
        </section>
      </div>
      <div className="pb-16"><Footer /></div>
    </div>
  );
}
