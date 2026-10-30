import Link from "next/link";
import { ArrowRight, BadgeCheck, Star } from "lucide-react";
import ProductVisual from "../ProductVisual";
import Marquee from "../Marquee";
import Footer from "../Footer";
import { CountUp } from "../Reveal";
import Solutions from "../home/Solutions";
import ProductTabs from "../home/ProductTabs";
import Packages from "../home/Packages";
import Services from "../home/Services";
import ProjectsSlider from "../home/ProjectsSlider";
import SurveyEstimate from "../home/SurveyEstimate";
import TextReveal from "./TextReveal";
import { Eyebrow, ParallaxColumns, ScrollText, Timeline, Words } from "./Motion";
import { VHeader } from "./Kit";
import { brands, company, formatPKR, products, stats, waLink } from "@/lib/data";

const tiles = products.filter((p) => p.price).slice(0, 24);
const cols = [0, 1, 2, 3].map((c) => tiles.filter((_, i) => i % 4 === c));
const headline = "Smarter energy, security and classrooms for Lahore";

// Design 4 · Aurora: light, Aceternity's aurora background, a 3D product marquee and scroll-driven sections.
export default function Design4() {
  return (
    <div className="min-h-screen overflow-x-clip bg-ink text-fg">
      <section className="relative isolate overflow-hidden bg-[#f6f8fc]">
        <div className="aurora-bg -z-10" aria-hidden="true" />
        <VHeader tone="light" className="border-b border-white/60 bg-white/50 backdrop-blur-xl" />
        <div className="mx-auto grid max-w-[1320px] items-center gap-10 px-4 pb-16 pt-12 lg:grid-cols-[1fr_1.05fr] lg:pb-24 lg:pt-16">
          <div>
            <p className="inline-flex animate-[rv-up_.6s_ease_both] items-center gap-2 rounded-full bg-white/80 px-3 py-1.5 text-sm shadow-sm">
              <span className="flex">{Array.from({ length: 5 }, (_, i) => <Star key={i} size={13} className="fill-sun text-sun" />)}</span>
              {company.recommend}% recommend · {company.reviews} reviews
            </p>
            <h1 className="mt-6 text-[40px] font-extrabold leading-[1.05] tracking-[-0.035em] md:text-[64px]">
              {headline.split(" ").map((w, i) => (
                <span key={i} className={`inline-block animate-[word-up_.7s_cubic-bezier(.22,1,.36,1)_both] ${["energy,", "security", "classrooms"].includes(w) ? "text-brand" : ""}`} style={{ animationDelay: `${0.15 + i * 0.08}s` }}>{w}&nbsp;</span>
              ))}
            </h1>
            <p className="mt-6 max-w-lg animate-[rv-up_.7s_ease_.8s_both] text-lg text-soft">Solar from 1 kVA to 1 MW, lithium batteries, CCTV, fire alarms, smart boards, rentals and repairs, all from one trusted team.</p>
            <div className="mt-8 flex animate-[rv-up_.7s_ease_.95s_both] flex-wrap gap-3">
              <Link href="/shop" className="shine group inline-flex items-center gap-2 rounded-full bg-brand px-6 py-3 font-semibold text-white shadow-[0_10px_30px_-10px_var(--color-brand)]">Shop now <ArrowRight size={18} className="transition group-hover:translate-x-1" /></Link>
              <a href={waLink("I want a free site survey.")} target="_blank" rel="noopener" className="rounded-full bg-white px-6 py-3 font-semibold shadow-sm hover:shadow-md">Free site survey</a>
            </div>
            <dl className="mt-10 grid max-w-md animate-[rv-up_.7s_ease_1.1s_both] grid-cols-3 gap-4 border-t border-black/10 pt-6">
              {stats.slice(0, 3).map((s) => <div key={s.l}><dd className="text-2xl font-extrabold text-brand"><CountUp to={s.to} suffix={s.suffix} /></dd><dt className="text-xs text-mute">{s.l}</dt></div>)}
            </dl>
          </div>

          {/* 3D marquee */}
          <div className="relative h-[420px] animate-[rv-zoom_1s_ease_.3s_both] overflow-hidden rounded-[2rem] md:h-[560px] [mask-image:linear-gradient(to_bottom,transparent,#000_15%,#000_85%,transparent)]">
            <div className="absolute left-1/2 top-[-6%] grid w-[900px] origin-top grid-cols-4 gap-4 [transform:translateX(-46%)_rotateX(52deg)_rotateZ(-42deg)] [transform-style:preserve-3d]">
              {cols.map((col, c) => (
                <div key={c} className="flex flex-col gap-4" style={{ animation: `${c % 2 ? "col-down" : "col-up"} ${26 + c * 4}s linear infinite` }}>
                  {[...col, ...col].map((p, i) => (
                    <Link key={i} href={`/product/${p.slug}`} className="group block rounded-2xl bg-white p-3 shadow-[0_20px_40px_-20px_rgba(15,23,42,.35)] ring-1 ring-black/5 transition hover:-translate-y-2">
                      <ProductVisual kind={p.kind} className="aspect-square rounded-xl bg-coal" />
                      <p className="mt-2 truncate text-xs font-semibold">{p.name}</p>
                      <p className="text-xs font-bold text-brand">{formatPKR(p.price!)}</p>
                    </Link>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="border-b border-line bg-panel py-5 text-fg/40">
        <Marquee>{brands.map((b) => <span key={b} className="mx-8 text-xl font-extrabold tracking-tight">{b}</span>)}</Marquee>
      </div>

      <div className="sv-tilt"><ProductTabs /></div>

      {/* Sticky heading beside drifting product columns */}
      <section className="relative overflow-hidden bg-[#f6f8fc] py-20">
        <div className="aurora-bg -z-0 opacity-25" aria-hidden="true" />
        <div className="relative mx-auto grid max-w-[1320px] gap-10 px-4 lg:grid-cols-[1fr_1.6fr]">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <Eyebrow>Genuine stock</Eyebrow>
            <Words text="Built for every home, shop and school" accent={["home,", "shop", "school"]} />
            <p className="mt-4 max-w-md text-lg text-mute">Every product comes with official warranty, delivery across Pakistan and installation by our own engineers in Lahore.</p>
            <ul className="mt-6 space-y-2 text-[15px]" data-stagger>
              {["Authorised Dahua reseller", "Free site survey", "Cash on delivery or bank transfer", "After-sales and service contracts"].map((t) => <li key={t} className="flex items-center gap-2"><BadgeCheck size={18} className="text-brand" />{t}</li>)}
            </ul>
            <Link href="/shop" className="shine mt-8 inline-flex items-center gap-2 rounded-full bg-brand px-6 py-3 font-semibold text-white">Browse all products <ArrowRight size={18} /></Link>
          </div>
          <ParallaxColumns />
        </div>
      </section>

      <ScrollText rows={[["Supply", "Install", "Service", "Repair"], ["Lahore", "11 years", "Genuine", "Trusted"]]} />

      <div className="sv-zoom"><Solutions /></div>

      <TextReveal highlight={["solar", "security", "classroom", "whatsapp"]} text="Tell us what you need on WhatsApp. We visit, design the right solar, security or classroom system, install it with our own team and stay with you for after-sales." />

      <div className="sv-tilt"><Packages /></div>

      <section className="px-4 py-20">
        <div className="mb-14 text-center"><Eyebrow>How we work</Eyebrow><Words text="Four simple steps" accent={["simple"]} /></div>
        <Timeline />
      </section>

      <Services />
      <ProjectsSlider />
      <SurveyEstimate />
      <div className="pb-16"><Footer /></div>
    </div>
  );
}
