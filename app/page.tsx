import Link from "next/link";
import { ArrowRight, BadgeCheck, BatteryCharging, Cctv, ChevronRight, CreditCard, Presentation, Projector, ShieldCheck, Star, Sun, Truck, Wrench } from "lucide-react";
import Packages from "@/components/home/Packages";
import ProductCard from "@/components/ProductCard";
import ProductVisual from "@/components/ProductVisual";
import SectionHead from "@/components/SectionHead";
import { brands, categories, company, divisions, formatPKR, products, stats, testimonials, waLink, type Kind } from "@/lib/data";

const catKind: Record<string, Kind> = {
  "Solar Panels": "panel", Inverters: "inverter", Batteries: "battery", Packages: "stand", UPS: "ups", CCTV: "cctv",
  Attendance: "attendance", Projectors: "projector", "Touch Boards": "board", Structures: "stand", Rentals: "speaker",
};

const trust = [
  { Icon: BadgeCheck, t: "Free site survey", d: "Engineer visit within 48 hours" },
  { Icon: ShieldCheck, t: "Official warranty", d: "Genuine stock, claims handled by us" },
  { Icon: Wrench, t: "Expert installation", d: "Our own trained team" },
  { Icon: CreditCard, t: "Easy payments", d: "Instalments, cards, bank, COD" },
];

const divisionIcon = { energy: Sun, backup: BatteryCharging, security: Cctv, it: Presentation, av: Projector, care: Wrench } as const;

export default function Home() {
  const bestSellers = products.filter((p) => p.badge).slice(0, 8);
  const cheapest = (c: string) => Math.min(...products.filter((p) => p.category === c).map((p) => p.price));

  return (
    <>
      {/* Hero: main banner + two promo tiles */}
      <section className="container-x pt-5">
        <div className="grid gap-4 lg:grid-cols-[2fr_1fr]">
          <div className="relative grid overflow-hidden rounded-2xl bg-[linear-gradient(115deg,#0b1a33_0%,#123170_100%)] text-white md:grid-cols-[1.7fr_1fr]">
            <div className="relative z-10 p-7 md:p-10 lg:p-12">
              <p className="inline-flex rounded bg-white/10 px-2.5 py-1 text-[13px] font-semibold text-sun-2">Solar systems from 1 kVA to 1 MW</p>
              <h1 className="mt-5 text-[34px] font-bold leading-[1.1] tracking-tight md:text-[42px]">
                Cut your electricity bill with solar — installed in Lahore.
              </h1>
              <p className="mt-4 max-w-md text-[17px] leading-relaxed text-white/75">
                Tier-1 panels, hybrid inverters and lithium batteries, supplied, installed and serviced by one team.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Link href="/shop" className="btn-sun">Shop products <ArrowRight size={18} /></Link>
                <a href={waLink("I want a free solar site survey.")} target="_blank" rel="noopener"
                  className="inline-flex items-center gap-2 rounded-lg border border-white/25 px-5 py-3 text-[15px] font-semibold hover:bg-white/10">
                  Book free survey
                </a>
              </div>
              <p className="mt-8 flex items-center gap-2 text-sm text-white/70">
                <span className="flex">{Array.from({ length: 5 }, (_, i) => <Star key={i} size={15} className="fill-sun text-sun" />)}</span>
                {company.rating} from {company.reviews}+ Google reviews
              </p>
            </div>
            <ProductVisual kind="panel" className="-mt-6 h-56 md:mt-0 md:h-full" />
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
            <Link href="/shop?c=Batteries" className="group relative flex overflow-hidden rounded-2xl bg-stage-amber p-6">
              <div className="relative z-10 max-w-[60%]">
                <p className="tag text-sun-3">Lithium batteries</p>
                <h2 className="mt-2 text-xl font-bold leading-snug">Backup that lasts through the night</h2>
                <p className="mt-2 text-sm text-soft">From <span className="font-bold text-fg">{formatPKR(cheapest("Batteries"))}</span></p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand group-hover:underline">Shop now <ChevronRight size={15} /></span>
              </div>
              <ProductVisual kind="battery" className="absolute -right-4 bottom-0 h-full w-1/2" />
            </Link>
            <Link href="/shop?c=Inverters" className="group relative flex overflow-hidden rounded-2xl bg-stage-green p-6">
              <div className="relative z-10 max-w-[60%]">
                <p className="tag text-ok">Hybrid inverters</p>
                <h2 className="mt-2 text-xl font-bold leading-snug">Solar, battery and grid in one box</h2>
                <p className="mt-2 text-sm text-soft">From <span className="font-bold text-fg">{formatPKR(cheapest("Inverters"))}</span></p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand group-hover:underline">Shop now <ChevronRight size={15} /></span>
              </div>
              <ProductVisual kind="inverter" className="absolute -right-4 bottom-0 h-full w-1/2" />
            </Link>
          </div>
        </div>
      </section>

      {/* Trust bar */}
      <section className="container-x py-6">
        <ul className="grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {trust.map(({ Icon, t, d }) => (
            <li key={t} className="flex items-center gap-3.5 bg-white px-5 py-4">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-stage-blue text-brand"><Icon size={20} /></span>
              <span><span className="block font-semibold">{t}</span><span className="block text-sm text-mute">{d}</span></span>
            </li>
          ))}
        </ul>
      </section>

      {/* Shop by category */}
      <section className="container-x py-8">
        <SectionHead title="Shop by category" href="/shop" />
        <div className="mt-6 grid grid-cols-3 gap-3 sm:grid-cols-4 lg:grid-cols-6">
          {categories.filter((c) => c !== "All").map((c) => (
            <Link key={c} href={`/shop?c=${encodeURIComponent(c)}`}
              className="group flex flex-col items-center rounded-xl border border-line bg-white p-3 pb-4 text-center transition hover:border-brand hover:shadow-sm">
              <ProductVisual kind={catKind[c] ?? "panel"} className="aspect-[4/3] w-full rounded-lg bg-coal" />
              <span className="mt-3 text-sm font-semibold group-hover:text-brand">{c}</span>
              <span className="text-xs text-mute">{products.filter((p) => p.category === c).length} items</span>
            </Link>
          ))}
          <Link href="/shop" className="flex flex-col items-center justify-center rounded-xl bg-brand p-4 text-center font-semibold text-white hover:bg-brand-2">
            View all<br />{products.length} products
            <ArrowRight size={20} className="mt-3" />
          </Link>
        </div>
      </section>

      {/* Best sellers */}
      <section className="cv container-x py-10">
        <SectionHead title="Best sellers" sub="Most ordered by homes and businesses in Lahore" href="/shop" />
        <div className="mt-6 grid grid-cols-2 gap-3 md:gap-5 lg:grid-cols-4">
          {bestSellers.map((p) => <ProductCard key={p.slug} p={p} />)}
        </div>
      </section>

      <Packages />

      {/* Services */}
      <section className="cv container-x py-14">
        <SectionHead title="More than solar" sub="Sales, installation and repair across six divisions" href="/services" more="All services" />
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {divisions.map((d) => {
            const Icon = divisionIcon[d.id as keyof typeof divisionIcon];
            return (
              <Link key={d.id} href={`/services#${d.id}`} className="group flex gap-4 rounded-xl border border-line p-5 transition hover:border-brand">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-stage-blue text-brand group-hover:bg-brand group-hover:text-white"><Icon size={21} /></span>
                <span>
                  <span className="block font-semibold group-hover:text-brand">{d.name}</span>
                  <span className="mt-1 block text-sm leading-relaxed text-mute">{d.items.join(" · ")}</span>
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Reviews + numbers */}
      <section className="cv border-y border-line bg-coal py-14">
        <div className="container-x grid gap-8 lg:grid-cols-[1fr_2.2fr]">
          <div>
            <h2 className="text-2xl font-bold tracking-tight md:text-[28px]">Trusted across Lahore</h2>
            <p className="mt-3 flex items-center gap-2">
              <span className="text-4xl font-bold">{company.rating}</span>
              <span>
                <span className="flex">{Array.from({ length: 5 }, (_, i) => <Star key={i} size={16} className="fill-sun text-sun" />)}</span>
                <span className="text-sm text-mute">{company.reviews}+ Google reviews</span>
              </span>
            </p>
            <dl className="mt-6 grid grid-cols-2 gap-3">
              {stats.map((s) => (
                <div key={s.l} className="flex flex-col-reverse rounded-lg border border-line bg-white p-4">
                  <dt className="text-sm text-mute">{s.l}</dt>
                  <dd className="text-2xl font-bold">{s.to.toLocaleString("en-PK")}{s.suffix}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {testimonials.slice(0, 3).map((t) => (
              <figure key={t.name} className="flex flex-col rounded-xl border border-line bg-white p-5">
                <span className="flex">{Array.from({ length: 5 }, (_, i) => <Star key={i} size={14} className="fill-sun text-sun" />)}</span>
                <blockquote className="mt-3 flex-1 text-[15px] leading-relaxed text-soft">“{t.q}”</blockquote>
                <figcaption className="mt-4 border-t border-line pt-3 text-sm">
                  <span className="block font-semibold">{t.name}</span>
                  <span className="text-mute">{t.role}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* Brands */}
      <section className="cv container-x py-12">
        <h2 className="text-center text-sm font-semibold uppercase tracking-[0.12em] text-mute">Authorised brands we supply and install</h2>
        <ul className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-8">
          {brands.map((b) => (
            <li key={b} className="flex h-14 items-center justify-center rounded-lg border border-line text-[15px] font-bold tracking-tight text-fg/55">{b}</li>
          ))}
        </ul>
        <p className="mt-8 flex items-center justify-center gap-2 text-sm text-mute">
          <Truck size={16} /> Delivery across Pakistan · Installation in Lahore and nearby cities
        </p>
      </section>
    </>
  );
}
