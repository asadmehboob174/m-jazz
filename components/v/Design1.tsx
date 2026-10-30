import Link from "next/link";
import { ArrowRight, ArrowUpRight, BadgeCheck, Menu, Phone, Quote, Star } from "lucide-react";
import Logo from "../Logo";
import ProductVisual from "../ProductVisual";
import DeptIcon from "../DeptIcon";
import Marquee from "../Marquee";
import FlipWords from "../FlipWords";
import { CountUp } from "../Reveal";
import { AddToCart, CartButton } from "../cart/Cart";
import { catHref, departments, deptHref } from "@/lib/catalog";
import { brands, company, formatPKR, process, stats, testimonials, waLink } from "@/lib/data";
import { deals, navLinks } from "./shared";

// Design 1 · Dark Tech: an all-dark, product-launch style page (Linear / Vercel feel).
export default function Design1() {
  return (
    <div data-mode="dark" className="relative min-h-screen overflow-hidden bg-ink text-fg">
      {/* spotlight + grid behind the hero */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-[900px] bg-[radial-gradient(60%_50%_at_50%_0%,color-mix(in_oklab,var(--color-brand)_45%,transparent),transparent_70%)]" />
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-[900px] bg-[linear-gradient(rgba(255,255,255,.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.05)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_0%,#000,transparent)]" />

      {/* Floating pill navigation */}
      <header className="sticky top-3 z-50 px-3">
        <div className="mx-auto flex h-14 max-w-6xl items-center gap-4 rounded-full border border-white/10 bg-white/[0.06] pl-5 pr-2 backdrop-blur-xl">
          <Link href="/" aria-label="Home"><Logo invert compact /></Link>
          <nav className="mx-auto hidden items-center gap-1 text-sm text-white/70 lg:flex">
            {navLinks.slice(0, 7).map((l) => <Link key={l.label} href={l.href} className="rounded-full px-3 py-1.5 transition hover:bg-white/10 hover:text-white">{l.label}</Link>)}
          </nav>
          <div className="ml-auto flex items-center gap-1 lg:ml-0">
            <CartButton />
            <a href={waLink("I want a free quote.")} target="_blank" rel="noopener" className="hidden rounded-full bg-white px-4 py-2 text-sm font-semibold text-black transition hover:bg-sun sm:block">Get a quote</a>
            <details className="relative lg:hidden">
              <summary className="flex h-10 w-10 cursor-pointer list-none items-center justify-center rounded-full hover:bg-white/10"><Menu size={20} /></summary>
              <div className="absolute right-0 top-12 w-56 rounded-2xl border border-white/10 bg-panel p-2 shadow-2xl">
                {navLinks.map((l) => <Link key={l.label} href={l.href} className="block rounded-lg px-3 py-2 text-sm hover:bg-white/10">{l.label}</Link>)}
              </div>
            </details>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative px-4 pb-10 pt-20 text-center md:pt-28">
        <p className="mx-auto inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-sm text-white/80 backdrop-blur" data-reveal>
          <BadgeCheck size={16} className="text-sun" /> <span className="shiny">Authorised Dahua reseller · {company.years} years in Lahore</span>
        </p>
        <h1 className="mx-auto mt-6 max-w-5xl text-[44px] font-extrabold leading-[1.02] tracking-[-0.045em] sm:text-[64px] md:text-[84px]" data-reveal>
          <span className="bg-gradient-to-b from-white to-white/60 bg-clip-text text-transparent">Technology that</span><br />
          <FlipWords className="text-sun-2" words={["powers homes", "protects shops", "teaches classes", "never stops"]} />
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-lg text-white/60" data-reveal>Solar from 1 kVA to 1 MW, CCTV and security, smart classrooms, rentals and repairs. One team, from survey to after-sales.</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3" data-reveal>
          <Link href="/shop" className="shine group inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 font-semibold text-black">Explore products <ArrowRight size={18} className="transition group-hover:translate-x-1" /></Link>
          <a href={waLink("I want a free site survey.")} target="_blank" rel="noopener" className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 font-semibold text-white hover:bg-white/10">Free site survey</a>
        </div>

        {/* Floating product constellation */}
        <div className="relative mx-auto mt-16 grid max-w-5xl grid-cols-3 gap-3 sm:grid-cols-5 sm:gap-4" data-stagger="zoom">
          {departments.map((d, i) => (
            <Link key={d.slug} href={deptHref(d)} style={{ "--tone": d.color, animationDelay: `${i * -1.2}s` } as React.CSSProperties}
              className={`group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] p-3 backdrop-blur transition hover:border-[var(--tone)] ${i % 2 ? "sm:translate-y-8" : ""} ${i > 2 ? "hidden sm:block" : ""}`}>
              <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,color-mix(in_oklab,var(--tone)_35%,transparent),transparent_70%)] opacity-60 transition group-hover:opacity-100" />
              <ProductVisual kind={d.kind} className="relative aspect-square animate-float" />
              <p className="relative mt-1 text-xs font-semibold text-white/80">{d.short}</p>
            </Link>
          ))}
        </div>
      </section>

      <div className="border-y border-white/10 py-6 text-white/40">
        <Marquee>{brands.map((b) => <span key={b} className="mx-8 text-xl font-bold tracking-tight">{b}</span>)}</Marquee>
      </div>

      {/* Bento departments */}
      <section className="mx-auto max-w-6xl px-4 py-20">
        <p className="text-center text-sm font-semibold uppercase tracking-[0.2em] text-sun">Five divisions</p>
        <h2 className="mt-3 text-center text-3xl font-bold tracking-tight md:text-5xl" data-reveal>Everything under one roof</h2>
        <div className="mt-12 grid gap-4 md:grid-cols-6" data-stagger>
          {departments.map((d, i) => (
            <Link key={d.slug} href={deptHref(d)} style={{ "--tone": d.color } as React.CSSProperties}
              className={`spot group relative flex min-h-[260px] flex-col overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-6 transition hover:border-white/25 ${i < 2 ? "md:col-span-3" : "md:col-span-2"}`}>
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[var(--tone)] text-white shadow-[0_0_30px_-4px_var(--tone)]"><DeptIcon icon={d.icon} size={22} /></span>
              <h3 className="mt-5 text-2xl font-bold">{d.name}</h3>
              <p className="mt-2 max-w-sm text-sm text-white/55">{d.blurb}</p>
              <div className="mt-auto flex flex-wrap gap-1.5 pt-5">
                {d.categories.slice(0, 4).map((c) => <span key={c.slug} className="rounded-full border border-white/10 px-2.5 py-1 text-xs text-white/70">{c.name}</span>)}
              </div>
              <ProductVisual kind={d.kind} className="pointer-events-none absolute -bottom-6 -right-6 h-40 w-40 opacity-80 transition duration-700 group-hover:-translate-y-2 group-hover:scale-110" />
              <ArrowUpRight size={20} className="absolute right-5 top-5 text-white/40 transition group-hover:rotate-45 group-hover:text-white" />
            </Link>
          ))}
        </div>
      </section>

      {/* Offers */}
      <section className="mx-auto max-w-6xl px-4 pb-20">
        <div className="flex items-end justify-between">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl" data-reveal>This month&apos;s offers</h2>
          <Link href="/shop" className="text-sm text-white/60 hover:text-white">View all →</Link>
        </div>
        <div className="swipe -mx-4 mt-8 flex gap-4 overflow-x-auto px-4 pb-2" data-stagger>
          {deals.map((p) => (
            <article key={p.slug} className="group w-[260px] shrink-0 overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] transition hover:border-white/25">
              <Link href={`/product/${p.slug}`} className="relative block aspect-[4/3] bg-[radial-gradient(circle_at_50%_40%,color-mix(in_oklab,var(--color-brand)_30%,transparent),transparent_70%)]">
                <ProductVisual kind={p.kind} className="h-full w-full transition duration-700 group-hover:scale-110" />
                {p.badge && <span className="absolute left-3 top-3 rounded-full bg-sun px-2.5 py-0.5 text-xs font-bold text-black">{p.badge}</span>}
              </Link>
              <div className="p-5">
                <h3 className="font-semibold">{p.name}</h3>
                <p className="mt-2 text-xl font-bold">{formatPKR(p.price!)} {p.oldPrice && <span className="text-sm font-normal text-white/40 line-through">{formatPKR(p.oldPrice)}</span>}</p>
                {p.variants ? <Link href={`/product/${p.slug}`} className="mt-4 block rounded-full bg-white/10 py-2.5 text-center text-sm font-semibold hover:bg-white hover:text-black">Choose option</Link>
                  : <AddToCart p={p} className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-white/10 py-2.5 text-sm font-semibold transition hover:bg-white hover:text-black" />}
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Numbers */}
      <section className="border-y border-white/10 bg-white/[0.02]">
        <dl className="mx-auto grid max-w-6xl grid-cols-2 divide-white/10 px-4 md:grid-cols-4 md:divide-x" data-stagger>
          {stats.map((s) => (
            <div key={s.l} className="px-6 py-10 text-center">
              <dd className="bg-gradient-to-b from-white to-white/50 bg-clip-text text-5xl font-extrabold tracking-tight text-transparent"><CountUp to={s.to} suffix={s.suffix} /></dd>
              <dt className="mt-2 text-sm text-white/50">{s.l}</dt>
            </div>
          ))}
        </dl>
      </section>

      {/* Process */}
      <section className="mx-auto max-w-6xl px-4 py-20">
        <h2 className="text-center text-3xl font-bold tracking-tight md:text-5xl" data-reveal>From survey to after-sales</h2>
        <ol className="relative mt-14 grid gap-8 md:grid-cols-4" data-stagger>
          <span aria-hidden="true" className="trace absolute left-0 right-0 top-5 hidden h-px bg-gradient-to-r from-brand via-sun to-brand md:block" />
          {process.map((s) => (
            <li key={s.n} className="relative">
              <span className="relative flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-ink text-sm font-bold text-sun">{s.n}</span>
              <h3 className="mt-5 text-lg font-semibold">{s.t}</h3>
              <p className="mt-2 text-sm text-white/55">{s.d}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* Reviews */}
      <section className="pb-20">
        <Marquee>
          {testimonials.map((t) => (
            <figure key={t.name} className="mx-2 w-[340px] shrink-0 rounded-3xl border border-white/10 bg-white/[0.03] p-6">
              <Quote size={22} className="text-sun" />
              <blockquote className="mt-3 text-[15px] leading-relaxed text-white/75">{t.q}</blockquote>
              <figcaption className="mt-4 flex items-center gap-1 text-sm"><span className="font-semibold">{t.name}</span><span className="text-white/40">· {t.role}</span>
                <span className="ml-auto flex">{Array.from({ length: 5 }, (_, i) => <Star key={i} size={12} className="fill-sun text-sun" />)}</span></figcaption>
            </figure>
          ))}
        </Marquee>
      </section>

      {/* CTA */}
      <section className="px-4 pb-24">
        <div className="beam relative mx-auto max-w-5xl overflow-hidden rounded-[2rem] border border-white/10 bg-[radial-gradient(80%_120%_at_50%_0%,color-mix(in_oklab,var(--color-brand)_40%,transparent),transparent)] px-6 py-16 text-center" data-reveal="zoom">
          <h2 className="text-3xl font-bold tracking-tight md:text-5xl">Get a free site survey</h2>
          <p className="mx-auto mt-4 max-w-lg text-white/60">Send your electricity bill or site photos on WhatsApp. We reply with a recommendation and price.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a href={waLink("I want a free site survey.")} target="_blank" rel="noopener" className="glow rounded-full bg-sun px-6 py-3 font-semibold text-black">Chat on WhatsApp</a>
            <a href={`tel:${company.phoneIntl}`} className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 font-semibold"><Phone size={17} /> {company.phone}</a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 px-4 pb-24 pt-14">
        <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-[1.5fr_repeat(3,1fr)]">
          <div><Logo invert /><p className="mt-4 max-w-xs text-sm text-white/50">{company.address}</p></div>
          {departments.slice(0, 3).map((d) => (
            <div key={d.slug}>
              <p className="text-sm font-semibold">{d.name}</p>
              <ul className="mt-3 space-y-2 text-sm text-white/50">{d.categories.slice(0, 4).map((c) => <li key={c.slug}><Link href={catHref(d, c)} className="hover:text-white">{c.name}</Link></li>)}</ul>
            </div>
          ))}
        </div>
        <p aria-hidden="true" className="mx-auto mt-14 max-w-6xl select-none bg-gradient-to-b from-white/15 to-transparent bg-clip-text text-center text-[22vw] font-extrabold leading-none tracking-[-0.06em] text-transparent md:text-[200px]">M.JAZE</p>
      </footer>
    </div>
  );
}
