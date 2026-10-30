import Link from "next/link";
import { ArrowRight, ArrowUpRight, BadgeCheck, Check, HardHat, Phone, Quote, ShieldCheck, Star, Zap } from "lucide-react";
import ProductVisual from "../ProductVisual";
import ProductCard from "../ProductCard";
import DeptIcon from "../DeptIcon";
import Marquee from "../Marquee";
import Rail from "../Rail";
import Footer from "../Footer";
import { CountUp } from "../Reveal";
import { AddToCart } from "../cart/Cart";
import Preloader from "./Preloader";
import QuoteCard from "./QuoteCard";
import { VHeader } from "./Kit";
import { departments, deptHref } from "@/lib/catalog";
import { company, formatPKR, inCat, products, projects, stats, testimonials, waLink } from "@/lib/data";
import { ticker } from "@/lib/site";

// Section title in the reference style: small pill label above a centred two-line heading.
function Title({ label, children, light = false, left = false }: { label: string; children: React.ReactNode; light?: boolean; left?: boolean }) {
  return (
    <div className={left ? "" : "text-center"} data-reveal>
      <span className={`inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-semibold shadow-sm ${light ? "bg-white/10 text-sun-2" : "bg-panel text-brand"}`}>
        <Zap size={15} className="fill-sun text-sun" /> {label}
      </span>
      <h2 className={`mt-4 text-[32px] font-bold leading-[1.15] tracking-tight md:text-[46px] ${left ? "" : "mx-auto max-w-3xl"} ${light ? "text-white" : ""}`}>{children}</h2>
    </div>
  );
}

const features = [
  { n: "01", t: "Free site survey", d: "An engineer visits, checks your load, roof and wiring, then suggests the right system.", kind: "stand" as const },
  { n: "02", t: "Genuine products", d: "Authorised Dahua reseller and official warranty on every panel, inverter and battery.", kind: "inverter" as const },
  { n: "03", t: "Own installation team", d: "Trained engineers install, configure and test. No sub-contractors on your site.", kind: "tools" as const },
];

// Design 6 · Next style: preloader with shutter reveal, dark hero with quote form, smooth fade-ups on scroll.
export default function Design6() {
  const pkgs = inCat("solar-packages").filter((p) => p.price).slice(1, 4);
  const featured = products.filter((p) => p.price && p.badge).slice(0, 8);
  return (
    <div className="min-h-screen overflow-x-clip bg-[#f6f5ff] text-fg">
      <Preloader />

      {/* Header + hero */}
      <section className="relative isolate overflow-hidden bg-navy text-white">
        <div aria-hidden="true" className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-[radial-gradient(70%_60%_at_30%_40%,color-mix(in_oklab,var(--color-brand)_45%,transparent),transparent_70%)]" />
          <div className="absolute -right-20 top-10 h-[520px] w-[520px] opacity-25 blur-[2px]"><ProductVisual kind="panel" className="h-full w-full" /></div>
          <div className="absolute bottom-0 left-[40%] h-72 w-72 opacity-15"><ProductVisual kind="cctv" className="h-full w-full" /></div>
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.04)_1px,transparent_1px)] bg-[size:56px_56px]" />
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-navy to-transparent" />
        </div>
        <VHeader tone="dark" call className="border-b border-white/10" />
        <div className="mx-auto grid max-w-[1320px] items-center gap-12 px-4 pb-40 pt-16 lg:grid-cols-[1.15fr_1fr] lg:pt-24">
          <div>
            <p className="after-load inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-sm font-semibold text-sun-2"><BadgeCheck size={16} /> Authorised Dahua reseller · {company.years} years</p>
            <h1 className="after-load mt-6 text-[42px] font-bold leading-[1.1] tracking-tight md:text-[64px]" style={{ "--d": "120ms" } as React.CSSProperties}>
              We power, protect &amp; connect your <span className="text-sun-2">home and business</span>
            </h1>
            <div className="after-load mt-10 flex flex-wrap items-center gap-6" style={{ "--d": "260ms" } as React.CSSProperties}>
              <Link href="/shop" className="shine group inline-flex items-center gap-2 rounded-xl bg-brand px-8 py-4 font-semibold text-white hover:bg-brand-2">Shop products <ArrowRight size={18} className="transition group-hover:translate-x-1" /></Link>
              <Link href="/services" className="group inline-flex items-center gap-2 font-semibold underline underline-offset-4">View services <ArrowRight size={18} className="transition group-hover:translate-x-1" /></Link>
            </div>
            <div className="after-load mt-10 flex items-center gap-4" style={{ "--d": "380ms" } as React.CSSProperties}>
              <span className="flex -space-x-3">
                {["A", "S", "B", "U"].map((c, i) => <span key={c} className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-navy text-lg font-bold" style={{ background: ["#f59e0b", "#2563eb", "#16a34a", "#db2777"][i] }}>{c}</span>)}
              </span>
              <span className="text-[15px] leading-snug">Trusted by homes, schools<br />and factories across Lahore</span>
            </div>
          </div>
          <div className="after-load" style={{ "--d": "300ms" } as React.CSSProperties}><QuoteCard /></div>
        </div>
      </section>

      {/* Numbered feature cards overlapping the hero */}
      <section className="relative z-10 mx-auto -mt-24 grid max-w-[1320px] gap-6 px-4 md:grid-cols-3" data-stagger>
        {features.map((f) => (
          <div key={f.n} className="group relative overflow-hidden rounded-3xl bg-panel p-8 shadow-[0_30px_60px_-30px_rgba(15,23,42,.35)] transition duration-500 hover:-translate-y-2">
            <span className="absolute right-6 top-4 text-[64px] font-black leading-none text-[#ece9ff] transition group-hover:text-brand/15">{f.n}</span>
            <div className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-2xl bg-[#f1efff] transition duration-500 group-hover:rotate-6 group-hover:bg-brand/15"><ProductVisual kind={f.kind} className="h-full w-full" /></div>
            <h3 className="mt-6 text-xl font-bold">{f.t}</h3>
            <p className="mt-2 text-mute">{f.d}</p>
          </div>
        ))}
      </section>

      {/* About */}
      <section className="mx-auto grid max-w-[1320px] items-center gap-14 px-4 py-24 lg:grid-cols-2">
        <div className="relative h-[460px]" data-reveal="left">
          <div className="absolute left-0 top-0 h-[78%] w-[68%] overflow-hidden rounded-3xl bg-[radial-gradient(circle,color-mix(in_oklab,var(--color-brand)_18%,white),#e9e7fb)]"><ProductVisual kind="panel" className="h-full w-full transition duration-700 hover:scale-110" /></div>
          <div className="absolute bottom-0 right-0 h-[58%] w-[55%] overflow-hidden rounded-3xl border-8 border-[#f6f5ff] bg-[radial-gradient(circle,color-mix(in_oklab,var(--color-sun)_22%,white),#fdf1e2)]"><ProductVisual kind="battery" className="h-full w-full transition duration-700 hover:scale-110" /></div>
          <div className="absolute bottom-10 left-6 flex items-center gap-3 rounded-2xl bg-brand px-5 py-4 text-white shadow-xl">
            <span className="text-4xl font-black"><CountUp to={company.years} suffix="+" /></span><span className="text-sm leading-tight">Years of<br />experience</span>
          </div>
        </div>
        <div data-reveal="right">
          <Title label="About M.JAZE" left>Your trusted partner for solar, security &amp; IT</Title>
          <p className="mt-5 text-lg text-mute">{company.legal} supplies, installs and services complete technology solutions, from a 1 kVA home backup to a 1 MW solar plant, from one CCTV camera to a full smart campus.</p>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {["Authorised Dahua reseller", "Our own trained engineers", "Warranty claims handled by us", "Repairs, cleaning & SLAs"].map((t) => (
              <li key={t} className="flex items-center gap-3 font-medium"><span className="flex h-7 w-7 items-center justify-center rounded-full bg-brand text-white"><Check size={15} /></span>{t}</li>
            ))}
          </ul>
          <div className="mt-8 flex flex-wrap items-center gap-6 border-t border-line pt-8">
            <Link href="/services" className="shine rounded-xl bg-brand px-7 py-4 font-semibold text-white">Learn more</Link>
            <span className="flex items-center gap-3"><span className="flex h-12 w-12 items-center justify-center rounded-full bg-navy text-lg font-bold text-white">S</span><span className="leading-tight"><b className="block">{company.owner}</b><span className="text-sm text-mute">CEO &amp; Founder</span></span></span>
          </div>
        </div>
      </section>

      {/* Popular services */}
      <section className="mx-auto max-w-[1320px] px-4 pb-24">
        <Title label="Our divisions">We provide complete solutions for your home &amp; business</Title>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-5" data-stagger>
          {departments.map((d) => (
            <Link key={d.slug} href={deptHref(d)} className="group flex flex-col rounded-3xl border border-[#e4e0ff] bg-[#f1efff] p-7 transition duration-500 hover:-translate-y-2 hover:bg-brand hover:text-white hover:shadow-[0_30px_50px_-25px_var(--color-brand)]">
              <span className="text-brand transition group-hover:text-white"><DeptIcon icon={d.icon} size={44} strokeWidth={1.4} /></span>
              <h3 className="mt-6 min-h-[3.5rem] text-xl font-bold leading-snug">{d.name}</h3>
              <div className="mx-auto mt-7 h-40 w-40 overflow-hidden rounded-full bg-white transition duration-700 group-hover:scale-105"><ProductVisual kind={d.kind} className="h-full w-full transition duration-700 group-hover:scale-110" /></div>
              <span className="mt-7 inline-flex items-center gap-2 font-semibold">Read more <ArrowRight size={17} className="transition group-hover:translate-x-1" /></span>
            </Link>
          ))}
        </div>
      </section>

      {/* Keyword strip */}
      <section className="relative overflow-hidden bg-brand py-6 text-white">
        <Marquee>{ticker.map((t) => <span key={t} className="flex items-center gap-6 px-6 text-2xl font-bold md:text-3xl">{t}<Zap size={22} className="fill-sun text-sun" /></span>)}</Marquee>
      </section>

      {/* Featured products */}
      <section className="mx-auto max-w-[1320px] px-4 py-24">
        <Title label="Shop online">Popular products, ready to order</Title>
        <div className="mt-12 grid grid-cols-2 gap-4 md:gap-6 lg:grid-cols-4" data-stagger>{featured.map((p) => <ProductCard key={p.slug} p={p} />)}</div>
        <div className="mt-10 text-center" data-reveal><Link href="/shop" className="shine inline-flex items-center gap-2 rounded-xl bg-brand px-8 py-4 font-semibold text-white">View all products <ArrowRight size={18} /></Link></div>
      </section>

      {/* Counters */}
      <section className="relative overflow-hidden bg-navy py-20 text-white">
        <div aria-hidden="true" className="absolute -left-20 -top-20 h-80 w-80 rounded-full bg-brand opacity-40 blur-3xl" />
        <div className="relative mx-auto grid max-w-[1320px] items-center gap-12 px-4 lg:grid-cols-[1fr_1.4fr]">
          <Title label="Our numbers" light left>Learn our company statistics</Title>
          <dl className="grid grid-cols-2 gap-5" data-stagger="zoom">
            {stats.map((s, i) => (
              <div key={s.l} className="flex items-center gap-4 rounded-3xl border border-white/10 bg-white/5 p-6">
                <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-brand">{[<Zap key="a" size={24} />, <ShieldCheck key="b" size={24} />, <Star key="c" size={24} />, <HardHat key="d" size={24} />][i]}</span>
                <span><dd className="text-4xl font-black"><CountUp to={s.to} suffix={s.suffix} /></dd><dt className="text-sm text-white/65">{s.l}</dt></span>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Projects / case studies */}
      <section className="mx-auto max-w-[1320px] px-4 py-24">
        <Title label="Case studies">Projects we have completed across Lahore</Title>
        <div className="mt-12 grid gap-6 md:grid-cols-3" data-stagger>
          {projects.slice(0, 3).map((pr, i) => (
            <Link key={pr.slug} href={`/projects/${pr.slug}`} className="group relative h-[420px] overflow-hidden rounded-3xl" style={{ background: ["#e9e7fb", "#fdf1e2", "#e3f3ea"][i] }}>
              <ProductVisual kind={pr.kind} className="absolute inset-0 transition duration-700 group-hover:scale-110" />
              <div className="absolute inset-x-5 bottom-5 translate-y-3 rounded-2xl bg-white p-5 shadow-xl transition duration-500 group-hover:translate-y-0 group-hover:bg-brand group-hover:text-white">
                <span className="text-sm font-semibold text-brand group-hover:text-sun-2">{pr.area}</span>
                <h3 className="mt-1 flex items-center justify-between text-xl font-bold">{pr.title}<ArrowUpRight className="transition group-hover:rotate-45" /></h3>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Packages as pricing */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-[1320px] px-4">
          <Title label="Solar packages">Popular solar packages with installation</Title>
          <div className="mt-12 grid gap-6 md:grid-cols-3" data-stagger>
            {pkgs.map((p, i) => {
              const hot = i === 1;
              return (
                <div key={p.slug} className={`relative flex flex-col overflow-hidden rounded-3xl p-8 transition duration-500 hover:-translate-y-2 ${hot ? "bg-navy text-white shadow-2xl" : "border border-line bg-[#f6f5ff]"}`}>
                  {hot && <span className="absolute right-6 top-6 rounded-full bg-sun px-3 py-1 text-xs font-bold text-black">Best value</span>}
                  <h3 className="text-xl font-bold">{p.name}</h3>
                  <p className="mt-4 text-[44px] font-black leading-none">{formatPKR(p.price!)}</p>
                  <p className={`mt-2 text-sm ${hot ? "text-white/60" : "text-mute"}`}>Supply + installation</p>
                  <ul className={`mt-6 flex-1 space-y-3 border-t pt-6 ${hot ? "border-white/15" : "border-line"}`}>
                    {(p.includes ?? []).slice(0, 6).map((f) => <li key={f} className="flex items-start gap-3 text-[15px]"><Check size={18} className="mt-0.5 shrink-0 text-sun" />{f}</li>)}
                  </ul>
                  {p.variants ? <Link href={`/product/${p.slug}`} className={`mt-8 rounded-xl py-4 text-center font-semibold ${hot ? "bg-brand text-white" : "bg-white text-brand ring-1 ring-brand"}`}>Choose package</Link>
                    : <AddToCart p={p} className={`mt-8 flex items-center justify-center gap-2 rounded-xl py-4 font-semibold transition ${hot ? "bg-brand text-white hover:bg-brand-2" : "bg-white text-brand ring-1 ring-brand hover:bg-brand hover:text-white"}`}>Choose package</AddToCart>}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="mx-auto max-w-[1320px] px-4 py-24">
        <Rail itemClass="w-[86%] sm:w-[calc((100%-20px)/2)] lg:w-[calc((100%-40px)/3)]" head={<Title label="Testimonials" left>What our clients say about us</Title>}>
          {testimonials.map((t) => (
            <figure key={t.name} className="flex h-full flex-col rounded-3xl bg-panel p-8 shadow-[0_20px_40px_-30px_rgba(15,23,42,.4)]">
              <div className="flex items-center justify-between"><span className="flex">{Array.from({ length: 5 }, (_, i) => <Star key={i} size={16} className="fill-sun text-sun" />)}</span><Quote size={40} className="text-brand/15" /></div>
              <blockquote className="mt-5 flex-1 text-lg leading-relaxed text-soft">“{t.q}”</blockquote>
              <figcaption className="mt-6 flex items-center gap-3 border-t border-line pt-5"><span className="flex h-12 w-12 items-center justify-center rounded-full bg-brand text-lg font-bold text-white">{t.name[0]}</span><span><b className="block">{t.name}</b><span className="text-sm text-mute">{t.role}</span></span></figcaption>
            </figure>
          ))}
        </Rail>
      </section>

      {/* CTA banner */}
      <section className="mx-auto max-w-[1320px] px-4 pb-24">
        <div className="relative overflow-hidden rounded-[2rem] bg-brand px-8 py-14 text-white md:px-16" data-reveal="zoom">
          <div aria-hidden="true" className="absolute -right-16 -top-16 h-72 w-72 animate-spin-slow rounded-full border-[30px] border-white/10" />
          <div aria-hidden="true" className="absolute -bottom-24 left-1/3 h-56 w-56 rounded-full bg-sun/30 blur-3xl" />
          <div className="relative flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
            <div>
              <h2 className="text-3xl font-bold leading-tight md:text-5xl">Let&apos;s discuss your project</h2>
              <p className="mt-3 max-w-lg text-white/80">Send your electricity bill or site photos on WhatsApp and get a free recommendation and price.</p>
            </div>
            <div className="flex flex-wrap gap-4">
              <a href={waLink("I want to discuss my project.")} target="_blank" rel="noopener" className="glow inline-flex items-center gap-2 rounded-xl bg-white px-7 py-4 font-semibold text-brand">Get started now <ArrowRight size={18} /></a>
              <a href={`tel:${company.phoneIntl}`} className="inline-flex items-center gap-3 font-semibold"><span className="flex h-14 w-14 items-center justify-center rounded-full bg-white/15"><Phone size={20} /></span>{company.phone}</a>
            </div>
          </div>
        </div>
      </section>

      <div className="pb-16"><Footer /></div>
    </div>
  );
}
