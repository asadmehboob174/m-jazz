import { Fragment } from "react";
import Link from "next/link";
import { ArrowRight, BadgeCheck, Flame, MessageCircle, Quote, ShieldCheck, Star, Truck, Zap } from "lucide-react";
import HeroSlider from "@/components/home/HeroSlider";
import CategorySidebar from "@/components/home/CategorySidebar";
import Solutions from "@/components/home/Solutions";
import ProductTabs from "@/components/home/ProductTabs";
import Packages from "@/components/home/Packages";
import Services from "@/components/home/Services";
import Why from "@/components/home/Why";
import ProjectsSlider from "@/components/home/ProjectsSlider";
import SurveyEstimate from "@/components/home/SurveyEstimate";
import Marquee from "@/components/Marquee";
import Rail from "@/components/Rail";
import ProductCard from "@/components/ProductCard";
import ProductVisual from "@/components/ProductVisual";
import SectionHead, { Heading } from "@/components/SectionHead";
import { catHref, findCat } from "@/lib/catalog";
import { brands, company, formatPKR, inCat, products, testimonials, waLink } from "@/lib/data";
import { heroStyle, homeSections, ticker, type HomeSection } from "@/lib/site";

const trust = [
  { Icon: BadgeCheck, t: "Authorised Dahua reseller", d: "Genuine stock, official warranty" },
  { Icon: Zap, t: "Free site survey", d: "Engineer visit in Lahore" },
  { Icon: ShieldCheck, t: "Installation & after-sales", d: "By our own trained team" },
  { Icon: Truck, t: "Order on WhatsApp", d: "Cash on delivery or bank transfer" },
];

const promos = [
  { slug: "1kw-solar-solution", tag: "Starter solar", title: "1 kW solar with battery", bg: "bg-stage-amber", tc: "text-sun-3" },
  { slug: "smart-board-package", tag: "Specially for schools", title: "Smart board package", bg: "bg-stage-purple", tc: "text-[#6d28d9]" },
  { slug: "solar-panel-washing", tag: "Clean panels, more savings", title: "Solar panel washing", bg: "bg-stage-blue", tc: "text-brand" },
];

const popularCats = ["solar-packages", "solar-panels", "inverters", "lithium-batteries", "ups-batteries", "ev-chargers",
  "cctv-packages", "cctv-cameras", "attendance-access", "fire-alarm", "interactive-boards", "projectors"];

const Stars = ({ size = 15 }: { size?: number }) => (
  <span className="flex">{Array.from({ length: 5 }, (_, i) => <Star key={i} size={size} className="fill-sun text-sun" />)}</span>
);

const sections: Record<HomeSection, () => React.ReactNode> = {
  ticker: () => (
    <div style={{ "--d": "160ms" } as React.CSSProperties} className="intro-down relative flex items-stretch overflow-hidden bg-[linear-gradient(90deg,var(--color-navy),color-mix(in_oklab,var(--color-brand)_45%,var(--color-navy)),var(--color-navy))] text-[13px] text-white/85">
      <span className="relative z-10 hidden shrink-0 items-center gap-2 bg-sun py-2.5 pl-4 pr-5 text-[11px] font-bold uppercase tracking-[0.14em] text-black [clip-path:polygon(0_0,100%_0,calc(100%-10px)_100%,0_100%)] sm:flex md:pl-6">
        <Zap size={14} className="fill-black" aria-hidden="true" /> Our services
      </span>
      <Marquee className="flex-1 py-2.5">
        {ticker.map((t) => (
          <span key={t} className="flex items-center whitespace-nowrap">
            <span className="px-5 font-medium tracking-wide transition hover:text-white">{t}</span>
            <svg width="10" height="10" viewBox="0 0 10 10" aria-hidden="true" className="text-sun"><path d="M5 0 6.2 3.8 10 5 6.2 6.2 5 10 3.8 6.2 0 5 3.8 3.8Z" fill="currentColor" /></svg>
          </span>
        ))}
      </Marquee>
    </div>
  ),

  hero: () => (
    <section className="container-x pt-4 md:pt-5">
      <div className={`hero-grid grid gap-4 ${heroStyle === "sidebar" ? "lg:grid-cols-[240px_1fr]" : ""}`}>
        {heroStyle === "sidebar" && <CategorySidebar />}
        <HeroSlider tall={heroStyle === "wide"} />
      </div>
      <div className="swipe -mx-4 mt-3 flex gap-3 overflow-x-auto px-4 py-1 md:mx-0 md:grid md:grid-cols-3 md:gap-4 md:overflow-visible md:px-0">
        {promos.map((pr, n) => {
          const p = products.find((x) => x.slug === pr.slug)!;
          return (
            <Link key={pr.slug} href={`/product/${p.slug}`} style={{ "--d": `${650 + n * 110}ms` } as React.CSSProperties} className={`intro-up tilt group relative flex min-h-[132px] w-[78%] shrink-0 overflow-hidden rounded-2xl p-5 transition duration-300 hover:-translate-y-1 hover:shadow-lg md:w-auto ${pr.bg}`}>
              <div className="relative z-10 max-w-[62%]">
                <p className={`text-[11px] font-bold uppercase tracking-wide ${pr.tc}`}>{pr.tag}</p>
                <h2 className="mt-1 text-[17px] font-bold leading-snug">{pr.title}</h2>
                <p className="mt-1.5 text-sm text-soft">{p.price ? <>Only <span className="font-bold text-fg">{formatPKR(p.price)}</span></> : p.badge}</p>
                <span className="mt-2 inline-flex items-center gap-1 text-sm font-semibold text-brand">Shop now <ArrowRight size={14} className="transition group-hover:translate-x-1" /></span>
              </div>
              <ProductVisual kind={p.kind} className="absolute -right-3 bottom-0 h-full w-[45%] transition duration-500 group-hover:-rotate-3 group-hover:scale-110" />
            </Link>
          );
        })}
      </div>
    </section>
  ),

  trust: () => (
    <section className="container-x py-5 md:py-6">
      <ul className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line lg:grid-cols-4" data-stagger>
        {trust.map(({ Icon, t, d }) => (
          <li key={t} className="group flex flex-col gap-2 bg-panel p-3.5 sm:flex-row sm:items-center sm:gap-3.5 sm:px-5 sm:py-4">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-stage-blue text-brand transition duration-500 group-hover:rotate-[360deg] group-hover:bg-brand group-hover:text-white sm:h-11 sm:w-11"><Icon size={20} /></span>
            <span><span className="block text-sm font-semibold sm:text-[15px]">{t}</span><span className="block text-xs text-mute sm:text-sm">{d}</span></span>
          </li>
        ))}
      </ul>
    </section>
  ),

  solutions: () => <Solutions />,

  deals: () => {
    const deals = products.filter((p) => p.price && !p.sample);
    return (
      <section className="container-x py-10 md:py-12">
        <Rail head={
          <div data-reveal>
            <p className="flex items-center gap-2 text-[12px] font-bold uppercase tracking-[0.14em] text-sale"><Flame size={16} className="animate-pulse" /> Limited offers</p>
            <h2 className="mt-2 text-[24px] font-extrabold tracking-tight md:text-[32px]">Hot deals this month</h2>
          </div>
        }>
          {deals.map((p) => <ProductCard key={p.slug} p={p} />)}
        </Rail>
      </section>
    );
  },

  categories: () => (
    <section className="container-x py-8 md:py-10">
      <SectionHead eyebrow="Browse" title="Shop by category" href="/shop" more="All categories" />
      <div className="swipe -mx-4 mt-5 flex gap-3 overflow-x-auto px-4 py-1 sm:mx-0 sm:grid sm:grid-cols-4 sm:overflow-visible sm:px-0 lg:grid-cols-6" data-stagger="zoom">
        {popularCats.map((slug) => {
          const { dept, cat } = findCat(slug)!;
          return (
            <Link key={slug} href={catHref(dept, cat)} style={{ "--tone": dept.color } as React.CSSProperties}
              className="group flex w-[120px] shrink-0 flex-col items-center rounded-2xl border border-line bg-panel p-2.5 pb-3 text-center transition duration-300 hover:-translate-y-1 hover:border-[var(--tone)] hover:shadow-[0_14px_30px_-16px_var(--tone)] sm:w-auto">
              <span className="relative w-full overflow-hidden rounded-xl bg-coal transition group-hover:bg-[color-mix(in_oklab,var(--tone)_9%,var(--color-panel))]">
                <ProductVisual kind={cat.kind} className="aspect-[4/3] w-full transition duration-500 group-hover:scale-110" />
              </span>
              <span className="mt-2.5 text-[13px] font-semibold leading-tight group-hover:text-[var(--tone)] sm:text-sm">{cat.name}</span>
              <span className="text-xs text-mute">{inCat(slug).length} {inCat(slug).length === 1 ? "item" : "items"}</span>
            </Link>
          );
        })}
      </div>
    </section>
  ),

  products: () => <ProductTabs />,
  packages: () => <Packages />,
  services: () => <Services />,
  why: () => <Why />,
  estimate: () => <SurveyEstimate />,
  projects: () => <ProjectsSlider />,

  reviews: () => (
    <section className="overflow-hidden bg-coal py-10 md:py-14">
      <div className="container-x flex flex-wrap items-end justify-between gap-5">
        <Heading eyebrow="Reviews" title="What our customers say" />
        <a href={company.socials.facebook} target="_blank" rel="noopener" data-reveal="right"
          className="flex items-center gap-3 rounded-2xl border border-line bg-panel px-4 py-3 transition hover:border-brand">
          <span className="text-3xl font-extrabold text-brand">{company.recommend}%</span>
          <span className="text-sm leading-tight"><Stars size={14} /><span className="text-mute">recommend us · {company.reviews} Facebook reviews</span></span>
        </a>
      </div>
      <div className="mt-7 space-y-4" data-reveal="zoom">
        <Marquee>
          {testimonials.map((t) => (
            <figure key={t.name} className="mx-2 flex w-[300px] shrink-0 flex-col rounded-2xl border border-line bg-panel p-5 sm:w-[360px]">
              <div className="flex items-center justify-between"><Stars size={14} /><Quote size={22} className="text-brand/20" /></div>
              <blockquote className="mt-3 flex-1 text-[15px] leading-relaxed text-soft">“{t.q}”</blockquote>
              <figcaption className="mt-4 flex items-center gap-3 border-t border-line pt-3 text-sm">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand font-bold text-white">{t.name[0]}</span>
                <span><span className="block font-semibold">{t.name}</span><span className="text-mute">{t.role}</span></span>
              </figcaption>
            </figure>
          ))}
        </Marquee>
      </div>
    </section>
  ),

  brands: () => (
    <section className="border-t border-line py-10 md:py-12">
      <div className="container-x">
        <h2 className="text-center text-xs font-bold uppercase tracking-[0.14em] text-mute sm:text-sm" data-reveal>Brands we supply, install and service</h2>
        <div className="mt-6 space-y-3" data-reveal>
          {[brands.slice(0, 8), brands.slice(8)].map((row, n) => (
            <Marquee key={n} reverse={n === 1}>
              {row.map((b) => (
                <span key={b} className="mx-1.5 flex h-14 min-w-[150px] items-center justify-center rounded-xl border border-line bg-panel px-5 text-[17px] font-extrabold tracking-tight text-fg/45 grayscale transition hover:border-brand hover:text-brand sm:min-w-[170px]">{b}</span>
              ))}
            </Marquee>
          ))}
        </div>
        <p className="mt-7 flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-center text-sm text-mute">
          <MessageCircle size={16} className="shrink-0 text-[#1fa855]" /> Can&apos;t find what you need?
          <a href={waLink("I'm looking for a product that's not on the website.")} target="_blank" rel="noopener" className="font-semibold text-brand hover:underline">Ask us on WhatsApp</a>
          . We stock much more than is listed.
        </p>
      </div>
    </section>
  ),
};

export default function Home() {
  return <>{homeSections.map((s) => <Fragment key={s}>{sections[s]()}</Fragment>)}</>;
}
