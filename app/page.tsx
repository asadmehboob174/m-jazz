import Link from "next/link";
import { ArrowRight, BadgeCheck, BatteryCharging, Cctv, ChevronRight, CreditCard, Presentation, Projector, ShieldCheck, Star, Sun, Truck, Wrench } from "lucide-react";
import HeroSlider from "@/components/home/HeroSlider";
import Packages from "@/components/home/Packages";
import ProjectsSlider from "@/components/home/ProjectsSlider";
import SurveyEstimate from "@/components/home/SurveyEstimate";
import Marquee from "@/components/Marquee";
import { CountUp, Reveal } from "@/components/Reveal";
import ProductCard from "@/components/ProductCard";
import ProductVisual from "@/components/ProductVisual";
import SectionHead from "@/components/SectionHead";
import { brands, categories, company, divisions, formatPKR, products, stats, testimonials, type Kind } from "@/lib/data";

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

const ticker = [
  "Solar systems 1 kVA – 1 MW", "Lithium batteries", "Hybrid & on-grid inverters", "Net-metering with LESCO", "UPS sales & repair",
  "CCTV installation", "Face & fingerprint attendance", "Interactive touch boards", "Projector & SMD on rent", "After-sales service & warranty",
];

const divisionIcon = { energy: Sun, backup: BatteryCharging, security: Cctv, it: Presentation, av: Projector, care: Wrench } as const;

const Stars = ({ size = 15 }: { size?: number }) => (
  <span className="flex">{Array.from({ length: 5 }, (_, i) => <Star key={i} size={size} className="fill-sun text-sun" />)}</span>
);

export default function Home() {
  const bestSellers = products.filter((p) => p.badge).slice(0, 8);
  const cheapest = (c: string) => Math.min(...products.filter((p) => p.category === c).map((p) => p.price));
  const promos = [
    { c: "Batteries", kind: "battery" as Kind, tag: "Lithium batteries", title: "Backup that lasts through the night", bg: "bg-stage-amber", tc: "text-sun-3" },
    { c: "Inverters", kind: "inverter" as Kind, tag: "Hybrid inverters", title: "Solar, battery and grid in one box", bg: "bg-stage-green", tc: "text-ok" },
  ];

  return (
    <>
      {/* Running bar */}
      <div className="border-b border-line bg-stage-blue py-2.5 text-[13px] font-semibold text-brand sm:text-sm">
        <Marquee>
          {ticker.map((t) => (
            <span key={t} className="flex items-center gap-3 whitespace-nowrap px-3">
              <Sun size={15} className="text-sun" aria-hidden="true" />{t}
            </span>
          ))}
        </Marquee>
      </div>

      {/* Hero: slider + two promo tiles */}
      <section className="container-x pt-4 md:pt-5">
        <div className="grid gap-3 md:gap-4 xl:grid-cols-[2fr_1fr]">
          <HeroSlider />

          <div className="grid grid-cols-2 gap-3 md:gap-4 xl:grid-cols-1">
            {promos.map((pr) => (
              <Link key={pr.c} href={`/shop?c=${pr.c}`} className={`group relative flex min-h-[170px] overflow-hidden rounded-2xl p-4 sm:p-6 ${pr.bg}`}>
                <div className="relative z-10 sm:max-w-[60%]">
                  <p className={`tag ${pr.tc}`}>{pr.tag}</p>
                  <h2 className="mt-1.5 text-[15px] font-bold leading-snug sm:mt-2 sm:text-xl">{pr.title}</h2>
                  <p className="mt-1.5 text-xs text-soft sm:mt-2 sm:text-sm">From <span className="font-bold text-fg">{formatPKR(cheapest(pr.c))}</span></p>
                  <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-brand group-hover:underline sm:mt-4">Shop now <ChevronRight size={15} /></span>
                </div>
                <ProductVisual kind={pr.kind} className="absolute -right-4 bottom-0 hidden h-full w-1/2 transition duration-500 group-hover:scale-105 sm:flex" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Trust bar */}
      <section className="container-x py-4 md:py-6">
        <ul className="grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-line bg-line lg:grid-cols-4">
          {trust.map(({ Icon, t, d }, n) => (
            <li key={t} style={{ animationDelay: `${n * 90}ms` }} className="animate-[rise_.6s_cubic-bezier(.22,1,.36,1)_both] flex flex-col gap-2 bg-white p-3.5 sm:flex-row sm:items-center sm:gap-3.5 sm:px-5 sm:py-4">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-stage-blue text-brand sm:h-10 sm:w-10"><Icon size={19} /></span>
              <span><span className="block text-sm font-semibold sm:text-base">{t}</span><span className="block text-xs text-mute sm:text-sm">{d}</span></span>
            </li>
          ))}
        </ul>
      </section>

      {/* Shop by category: swipe row on phones, grid from tablet up */}
      <section className="container-x py-6 md:py-8">
        <SectionHead title="Shop by category" href="/shop" />
        <Reveal><div className="swipe -mx-4 mt-5 flex gap-3 overflow-x-auto px-4 pb-1 sm:mx-0 sm:grid sm:grid-cols-4 sm:overflow-visible sm:px-0 lg:grid-cols-6">
          {categories.filter((c) => c !== "All").map((c) => (
            <Link key={c} href={`/shop?c=${encodeURIComponent(c)}`}
              className="group flex w-[112px] shrink-0 flex-col items-center rounded-xl border border-line bg-white p-2.5 pb-3 text-center transition hover:-translate-y-0.5 hover:border-brand hover:shadow-md sm:w-auto">
              <ProductVisual kind={catKind[c] ?? "panel"} className="aspect-[4/3] w-full rounded-lg bg-coal" />
              <span className="mt-2.5 text-[13px] font-semibold leading-tight group-hover:text-brand sm:text-sm">{c}</span>
              <span className="text-xs text-mute">{products.filter((p) => p.category === c).length} items</span>
            </Link>
          ))}
          <Link href="/shop" className="flex w-[112px] shrink-0 flex-col items-center justify-center rounded-xl bg-brand p-3 text-center text-sm font-semibold text-white transition hover:bg-brand-2 sm:w-auto">
            View all<br />{products.length} products
            <ArrowRight size={20} className="mt-2" />
          </Link>
        </div></Reveal>
      </section>

      {/* Best sellers */}
      <section className="cv container-x py-8 md:py-10">
        <SectionHead title="Best sellers" sub="Most ordered by homes and businesses in Lahore" href="/shop" />
        <div className="mt-5 grid grid-cols-2 gap-3 md:mt-6 md:gap-5 lg:grid-cols-4">
          {bestSellers.map((p, n) => <Reveal key={p.slug} delay={(n % 4) * 0.07}><ProductCard p={p} /></Reveal>)}
        </div>
      </section>

      <Packages />
      <ProjectsSlider />

      {/* Services */}
      <section className="cv container-x py-10 md:py-14">
        <SectionHead title="More than solar" sub="Sales, installation and repair across six divisions" href="/services" more="All services" />
        <div className="mt-5 grid grid-cols-2 gap-3 md:mt-6 md:gap-4 lg:grid-cols-3">
          {divisions.map((d, n) => {
            const Icon = divisionIcon[d.id as keyof typeof divisionIcon];
            return (
              <Reveal key={d.id} delay={(n % 3) * 0.06} className="h-full">
              <Link href={`/services#${d.id}`} className="group flex h-full flex-col gap-3 rounded-xl border border-line p-4 transition hover:border-brand hover:shadow-sm sm:flex-row sm:gap-4 sm:p-5">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-stage-blue text-brand transition group-hover:bg-brand group-hover:text-white sm:h-11 sm:w-11"><Icon size={20} /></span>
                <span>
                  <span className="block text-sm font-semibold group-hover:text-brand sm:text-base">{d.name}</span>
                  <span className="mt-1 hidden text-sm leading-relaxed text-mute sm:block">{d.items.join(" · ")}</span>
                </span>
              </Link>
              </Reveal>
            );
          })}
        </div>
      </section>

      <SurveyEstimate />

      {/* Reviews + numbers */}
      <section className="cv py-10 md:py-14">
        <div className="container-x grid gap-6 lg:grid-cols-[1fr_2.2fr] lg:gap-8">
          <div>
            <h2 className="text-[22px] font-bold tracking-tight md:text-[28px]">Trusted across Lahore</h2>
            <div className="mt-3 flex items-center gap-2">
              <span className="text-4xl font-bold">{company.rating}</span>
              <span><Stars size={16} /><span className="text-sm text-mute">{company.reviews}+ Google reviews</span></span>
            </div>
            <dl className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-2">
              {stats.map((s) => (
                <div key={s.l} className="flex flex-col-reverse rounded-lg border border-line bg-coal p-3.5 sm:p-4">
                  <dt className="text-xs text-mute sm:text-sm">{s.l}</dt>
                  <dd className="text-xl font-bold sm:text-2xl"><CountUp to={s.to} suffix={s.suffix} /></dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="swipe -mx-4 flex gap-3 overflow-x-auto px-4 pb-1 md:mx-0 md:grid md:grid-cols-3 md:gap-4 md:overflow-visible md:px-0">
            {testimonials.slice(0, 3).map((t) => (
              <figure key={t.name} className="flex w-[82%] shrink-0 flex-col rounded-xl border border-line bg-white p-5 transition hover:-translate-y-0.5 hover:shadow-md md:w-auto">
                <Stars size={14} />
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
      <section className="cv border-t border-line bg-coal py-10 md:py-12">
        <div className="container-x">
        <h2 className="text-center text-xs font-semibold uppercase tracking-[0.12em] text-mute sm:text-sm">Authorised brands we supply and install</h2>
        <div className="mt-5 space-y-3">
          {[brands.slice(0, 8), brands.slice(8)].map((row, n) => (
            <Marquee key={n} reverse={n === 1}>
              {row.map((b) => (
                <span key={b} className="mx-1.5 flex h-12 min-w-[130px] items-center justify-center rounded-lg border border-line bg-white px-5 text-[15px] font-bold tracking-tight text-fg/55 transition hover:border-brand hover:text-brand sm:h-14 sm:min-w-[160px]">{b}</span>
              ))}
            </Marquee>
          ))}
        </div>
        <p className="mt-6 flex items-center justify-center gap-2 text-center text-sm text-mute">
          <Truck size={16} className="shrink-0" /> Delivery across Pakistan · Installation in Lahore and nearby cities
        </p>
        </div>
      </section>
    </>
  );
}
