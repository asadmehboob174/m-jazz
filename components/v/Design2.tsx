import Link from "next/link";
import { ArrowRight, ArrowUpRight, Quote, Star } from "lucide-react";
import ProductVisual from "../ProductVisual";
import ProductCard from "../ProductCard";
import DeptIcon from "../DeptIcon";
import Marquee from "../Marquee";
import Rail from "../Rail";
import Footer from "../Footer";
import { Heading } from "../SectionHead";
import { CountUp } from "../Reveal";
import Services from "../home/Services";
import SurveyEstimate from "../home/SurveyEstimate";
import { VHeader } from "./Kit";
import { departments, deptHref } from "@/lib/catalog";
import { company, products, stats, testimonials, waLink } from "@/lib/data";

// Design 2 · Lamp: dark, Aceternity's lamp-effect hero over a glowing bento of the five divisions.
export default function Design2() {
  const deals = products.filter((p) => p.price && !p.sample);
  return (
    <div data-mode="dark" className="min-h-screen bg-[#05080f] text-fg">
      <VHeader tone="dark" className="sticky top-0 border-b border-white/5 bg-[#05080f]/80 backdrop-blur-xl" />

      {/* Lamp hero */}
      <section className="relative isolate flex min-h-[640px] flex-col items-center overflow-hidden pt-24">
        <div className="relative flex h-56 w-full items-center justify-center">
          <div className="absolute right-1/2 h-56 w-[32rem] animate-[lamp-open_1s_ease_.3s_both] bg-[conic-gradient(from_70deg_at_center_top,var(--color-sun),transparent,transparent)] [mask-image:linear-gradient(to_top,transparent,#000)]" />
          <div className="absolute left-1/2 h-56 w-[32rem] animate-[lamp-open_1s_ease_.3s_both] bg-[conic-gradient(from_290deg_at_center_top,transparent,transparent,var(--color-sun))] [mask-image:linear-gradient(to_top,transparent,#000)]" />
          <div className="absolute top-1/2 h-48 w-full translate-y-12 scale-x-150 bg-[#05080f] blur-2xl" />
          <div className="absolute top-1/2 h-36 w-[28rem] -translate-y-1/2 rounded-full bg-sun opacity-40 blur-3xl" />
          <div className="absolute top-0 h-[2px] animate-[lamp-line_1s_ease_.3s_both] bg-sun-2 shadow-[0_0_20px_4px_var(--color-sun)]" />
        </div>
        <div className="relative -mt-28 px-4 text-center">
          <h1 className="bg-gradient-to-b from-white to-white/50 bg-clip-text text-[40px] font-extrabold leading-[1.05] tracking-tight text-transparent md:text-[72px]" data-reveal>
            Solar, security & IT<br />under one roof
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-lg text-white/60" data-reveal>From a 1 kVA home backup to a 1 MW plant. Supplied, installed and serviced by our own team in Lahore.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3" data-reveal>
            <Link href="/shop" className="shine rounded-full bg-sun px-6 py-3 font-bold text-black">Shop products</Link>
            <a href={waLink()} target="_blank" rel="noopener" className="rounded-full border border-white/20 px-6 py-3 font-semibold text-white hover:bg-white/10">Talk on WhatsApp</a>
          </div>
        </div>
      </section>

      {/* Glowing bento */}
      <section className="mx-auto max-w-[1320px] px-4 pb-16">
        <div className="grid gap-4 md:grid-cols-4 md:grid-rows-2" data-stagger="zoom">
          {departments.map((d, i) => (
            <Link key={d.slug} href={deptHref(d)} style={{ "--tone": d.color } as React.CSSProperties}
              className={`spot beam group relative flex min-h-[230px] flex-col overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-6 [--beam-w:1px] ${i === 0 ? "md:col-span-2 md:row-span-2" : i === 1 ? "md:col-span-2" : ""}`}>
              <div aria-hidden="true" className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-[var(--tone)] opacity-30 blur-3xl transition group-hover:opacity-60" />
              <span className="relative flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--tone)] text-white"><DeptIcon icon={d.icon} size={22} /></span>
              <h2 className="relative mt-4 text-2xl font-bold text-white">{d.name}</h2>
              <p className="relative mt-1 max-w-sm text-sm text-white/55">{d.blurb}</p>
              <ProductVisual kind={d.kind} className={`relative mt-auto transition duration-700 group-hover:-translate-y-2 group-hover:scale-105 ${i === 0 ? "aspect-[4/3]" : "ml-auto h-28 w-32"}`} />
              <ArrowUpRight size={20} className="absolute right-5 top-5 text-white/40 transition group-hover:rotate-45 group-hover:text-white" />
            </Link>
          ))}
        </div>
      </section>

      <section className="border-y border-white/10 bg-white/[0.02]">
        <dl className="mx-auto grid max-w-[1320px] grid-cols-2 px-4 md:grid-cols-4" data-stagger>
          {stats.map((s) => (
            <div key={s.l} className="px-4 py-10 text-center">
              <dd className="text-[44px] font-extrabold leading-none tracking-tight text-sun-2"><CountUp to={s.to} suffix={s.suffix} /></dd>
              <dt className="mt-2 text-sm text-white/50">{s.l}</dt>
            </div>
          ))}
        </dl>
      </section>

      <section className="mx-auto max-w-[1320px] px-4 py-14">
        <Rail head={<Heading eyebrow="Limited offers" title="Hot deals this month" />}>{deals.map((p) => <ProductCard key={p.slug} p={p} />)}</Rail>
      </section>
      <Services />

      {/* Infinite moving reviews */}
      <section className="py-14">
        <div className="mx-auto max-w-[1320px] px-4"><Heading eyebrow={`${company.recommend}% recommend us`} title="Loved across Lahore" /></div>
        <div className="mt-8 space-y-4">
          {[testimonials, [...testimonials].reverse()].map((row, r) => (
            <Marquee key={r} reverse={r === 1}>
              {row.map((t) => (
                <figure key={t.name} className="mx-2 w-[340px] shrink-0 rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.06] to-transparent p-5">
                  <div className="flex items-center justify-between"><span className="flex">{Array.from({ length: 5 }, (_, i) => <Star key={i} size={13} className="fill-sun text-sun" />)}</span><Quote size={18} className="text-white/20" /></div>
                  <blockquote className="mt-3 text-[15px] leading-relaxed text-white/75">{t.q}</blockquote>
                  <figcaption className="mt-3 text-sm"><b className="text-white">{t.name}</b> <span className="text-white/45">· {t.role}</span></figcaption>
                </figure>
              ))}
            </Marquee>
          ))}
        </div>
      </section>

      <SurveyEstimate />
      <section className="px-4 py-16 text-center">
        <Link href="/shop" className="group inline-flex items-center gap-2 text-2xl font-bold text-white md:text-4xl">Browse all products <ArrowRight className="transition group-hover:translate-x-2" /></Link>
      </section>
      <div className="pb-16"><Footer /></div>
    </div>
  );
}
