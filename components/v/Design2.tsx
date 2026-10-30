import Link from "next/link";
import { ArrowRight, ArrowUpRight, Quote, Star } from "lucide-react";
import ProductVisual from "../ProductVisual";
import ProductCard from "../ProductCard";
import DeptIcon from "../DeptIcon";
import Marquee from "../Marquee";
import Rail from "../Rail";
import Footer from "../Footer";
import { CountUp } from "../Reveal";
import SurveyEstimate from "../home/SurveyEstimate";
import Services from "../home/Services";
import TextReveal from "./TextReveal";
import { Eyebrow, ScrollText, StackCards, Timeline, Words } from "./Motion";
import { VHeader } from "./Kit";
import { departments, deptHref } from "@/lib/catalog";
import { brands, company, products, stats, testimonials, waLink } from "@/lib/data";

const headline = ["Solar,", "security", "&", "IT"];
const headline2 = ["under", "one", "roof"];

// Design 2 · Lamp (white): Aceternity's lamp glow on a light page, with scroll-driven sections.
export default function Design2() {
  const deals = products.filter((p) => p.price && !p.sample);
  return (
    <div className="min-h-screen overflow-x-clip bg-ink text-fg">
      <VHeader tone="light" className="sticky top-0 border-b border-line/70 bg-panel/80 backdrop-blur-xl" />

      {/* Lamp hero */}
      <section className="relative isolate flex flex-col items-center overflow-hidden pb-20 pt-20">
        <div aria-hidden="true" className="dots absolute inset-0 -z-10 opacity-70" />
        <div className="relative flex h-56 w-full items-center justify-center">
          <div className="absolute right-1/2 h-56 w-[32rem] animate-[lamp-open_1.1s_ease_.3s_both] overflow-visible bg-[conic-gradient(from_180deg_at_100%_0%,var(--color-brand)_0deg,color-mix(in_oklab,var(--color-brand)_40%,transparent)_45deg,transparent_80deg)] opacity-80">
            <div className="absolute bottom-0 left-0 h-40 w-full bg-ink [mask-image:linear-gradient(to_top,#000,transparent)]" />
            <div className="absolute bottom-0 left-0 h-full w-40 bg-ink [mask-image:linear-gradient(to_right,#000,transparent)]" />
          </div>
          <div className="absolute left-1/2 h-56 w-[32rem] animate-[lamp-open_1.1s_ease_.3s_both] overflow-visible bg-[conic-gradient(from_100deg_at_0%_0%,transparent_0deg,color-mix(in_oklab,var(--color-sun)_40%,transparent)_35deg,var(--color-sun)_80deg,transparent_80.5deg)] opacity-80">
            <div className="absolute bottom-0 right-0 h-40 w-full bg-ink [mask-image:linear-gradient(to_top,#000,transparent)]" />
            <div className="absolute bottom-0 right-0 h-full w-40 bg-ink [mask-image:linear-gradient(to_left,#000,transparent)]" />
          </div>
          <div className="absolute top-1/2 h-48 w-full translate-y-12 scale-x-150 bg-ink blur-2xl" />
          <div className="absolute top-1/2 h-36 w-[28rem] -translate-y-1/2 rounded-full bg-[linear-gradient(90deg,var(--color-brand),var(--color-sun))] opacity-30 blur-3xl" />
          <div className="absolute top-0 h-[3px] animate-[lamp-line_1.1s_ease_.3s_both] rounded-full bg-[linear-gradient(90deg,var(--color-brand),var(--color-sun))] shadow-[0_0_24px_4px_color-mix(in_oklab,var(--color-sun)_60%,transparent)]" />
        </div>
        <div className="relative -mt-28 px-4 text-center">
          <h1 className="text-[42px] font-extrabold leading-[1.04] tracking-[-0.04em] md:text-[78px]">
            {headline.map((w, i) => <span key={i} className="inline-block animate-[word-up_.8s_cubic-bezier(.22,1,.36,1)_both]" style={{ animationDelay: `${0.7 + i * 0.08}s` }}>{w}&nbsp;</span>)}<br />
            {headline2.map((w, i) => <span key={i} className="inline-block animate-[word-up_.8s_cubic-bezier(.22,1,.36,1)_both] bg-gradient-to-r from-brand to-sun bg-clip-text text-transparent" style={{ animationDelay: `${1 + i * 0.08}s` }}>{w}&nbsp;</span>)}
          </h1>
          <p className="mx-auto mt-6 max-w-xl animate-[rv-up_.8s_ease_1.3s_both] text-lg text-mute">From a 1 kVA home backup to a 1 MW plant. Supplied, installed and serviced by our own team in Lahore.</p>
          <div className="mt-8 flex animate-[rv-up_.8s_ease_1.45s_both] flex-wrap justify-center gap-3">
            <Link href="/shop" className="shine group inline-flex items-center gap-2 rounded-full bg-brand px-6 py-3 font-semibold text-white shadow-[0_12px_30px_-10px_var(--color-brand)]">Shop products <ArrowRight size={18} className="transition group-hover:translate-x-1" /></Link>
            <a href={waLink()} target="_blank" rel="noopener" className="rounded-full border border-line bg-panel px-6 py-3 font-semibold shadow-sm hover:border-brand">Talk on WhatsApp</a>
          </div>
          <p className="mt-8 flex animate-[rv-up_.8s_ease_1.6s_both] items-center justify-center gap-2 text-sm text-mute">
            <span className="flex">{Array.from({ length: 5 }, (_, i) => <Star key={i} size={14} className="fill-sun text-sun" />)}</span>{company.recommend}% recommend · Authorised Dahua reseller
          </p>
        </div>
        {/* floating products either side */}
        <div className="absolute left-[5%] top-[46%] hidden h-40 w-32 animate-float lg:block"><ProductVisual kind="battery" className="h-full w-full" /></div>
        <div className="absolute right-[5%] top-[40%] hidden h-36 w-40 animate-float [animation-delay:-3s] lg:block"><ProductVisual kind="cctv" className="h-full w-full" /></div>
      </section>

      <div className="border-y border-line bg-panel py-5 text-fg/40">
        <Marquee>{brands.map((b) => <span key={b} className="mx-8 text-xl font-extrabold tracking-tight">{b}</span>)}</Marquee>
      </div>

      {/* Bento that zooms in with the scroll */}
      <section className="mx-auto max-w-[1320px] px-4 py-20">
        <div className="text-center"><Eyebrow>Five divisions</Eyebrow><Words text="Everything your home and business needs" accent={["home", "business"]} /></div>
        <div className="sv-zoom mt-12 grid gap-4 md:grid-cols-4 md:grid-rows-2">
          {departments.map((d, i) => (
            <Link key={d.slug} href={deptHref(d)} style={{ "--tone": d.color } as React.CSSProperties}
              className={`spot beam group relative flex min-h-[230px] flex-col overflow-hidden rounded-3xl border border-line bg-[linear-gradient(160deg,color-mix(in_oklab,var(--tone)_8%,var(--color-panel)),var(--color-panel)_60%)] p-6 [--beam-w:1.5px] transition hover:-translate-y-1 hover:shadow-[0_24px_50px_-24px_var(--tone)] ${i === 0 ? "md:col-span-2 md:row-span-2" : i === 1 ? "md:col-span-2" : ""}`}>
              <div aria-hidden="true" className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-[var(--tone)] opacity-15 blur-3xl transition group-hover:opacity-35" />
              <span className="relative flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--tone)] text-white shadow-[0_10px_24px_-8px_var(--tone)]"><DeptIcon icon={d.icon} size={22} /></span>
              <h3 className="relative mt-4 text-2xl font-bold">{d.name}</h3>
              <p className="relative mt-1 max-w-sm text-sm text-mute">{d.blurb}</p>
              <ProductVisual kind={d.kind} className={`relative mt-auto transition duration-700 group-hover:-translate-y-2 group-hover:scale-105 ${i === 0 ? "aspect-[4/3]" : "ml-auto h-28 w-32"}`} />
              <ArrowUpRight size={20} className="absolute right-5 top-5 text-mute transition group-hover:rotate-45 group-hover:text-[var(--tone)]" />
            </Link>
          ))}
        </div>
      </section>

      <ScrollText />

      <TextReveal highlight={["genuine", "own", "after-sales"]} text={`For ${company.years} years we have helped Lahore cut electricity bills, secure homes and shops and modernise classrooms with genuine products, our own engineers and real after-sales service.`} />

      {/* Stacked division cards */}
      <section className="mx-auto max-w-6xl px-4 pb-10">
        <div className="mb-10 text-center"><Eyebrow>Scroll to explore</Eyebrow><Words text="What each division does for you" accent={["you"]} /></div>
        <StackCards />
      </section>

      {/* Counters */}
      <section className="border-y border-line bg-panel">
        <dl className="mx-auto grid max-w-[1320px] grid-cols-2 px-4 md:grid-cols-4" data-stagger="zoom">
          {stats.map((s) => (
            <div key={s.l} className="px-4 py-12 text-center">
              <dd className="bg-gradient-to-br from-brand to-sun bg-clip-text text-[52px] font-extrabold leading-none tracking-tight text-transparent"><CountUp to={s.to} suffix={s.suffix} /></dd>
              <dt className="mt-2 text-sm text-mute">{s.l}</dt>
            </div>
          ))}
        </dl>
      </section>

      <section className="mx-auto max-w-[1320px] px-4 py-20">
        <Rail head={<div><Eyebrow>Limited offers</Eyebrow><Words text="Hot deals this month" accent={["Hot"]} /></div>}>{deals.map((p) => <ProductCard key={p.slug} p={p} />)}</Rail>
      </section>

      <section className="bg-coal px-4 py-20">
        <div className="mb-14 text-center"><Eyebrow>How we work</Eyebrow><Words text="From survey to after-sales" accent={["after-sales"]} /></div>
        <Timeline />
      </section>

      <Services />

      {/* Infinite moving reviews */}
      <section className="py-20">
        <div className="mb-10 text-center"><Eyebrow>{company.recommend}% recommend us</Eyebrow><Words text="Loved across Lahore" accent={["Lahore"]} /></div>
        <div className="space-y-4">
          {[testimonials, [...testimonials].reverse()].map((row, r) => (
            <Marquee key={r} reverse={r === 1}>
              {row.map((t) => (
                <figure key={t.name} className="mx-2 w-[340px] shrink-0 rounded-3xl border border-line bg-panel p-6 shadow-sm">
                  <div className="flex items-center justify-between"><span className="flex">{Array.from({ length: 5 }, (_, i) => <Star key={i} size={13} className="fill-sun text-sun" />)}</span><Quote size={20} className="text-brand/20" /></div>
                  <blockquote className="mt-3 text-[15px] leading-relaxed text-soft">{t.q}</blockquote>
                  <figcaption className="mt-4 flex items-center gap-3 text-sm"><span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand font-bold text-white">{t.name[0]}</span><span><b className="block">{t.name}</b><span className="text-mute">{t.role}</span></span></figcaption>
                </figure>
              ))}
            </Marquee>
          ))}
        </div>
      </section>

      <SurveyEstimate />
      <div className="pb-16"><Footer /></div>
    </div>
  );
}
