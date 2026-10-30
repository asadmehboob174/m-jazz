import Link from "next/link";
import { ArrowRight, Search, ShoppingCart } from "lucide-react";
import ProductVisual from "../ProductVisual";
import ProductCard from "../ProductCard";
import FlipWords from "../FlipWords";
import Rail from "../Rail";
import Footer from "../Footer";
import { Heading } from "../SectionHead";
import Packages from "../home/Packages";
import Why from "../home/Why";
import ProjectsSlider from "../home/ProjectsSlider";
import SurveyEstimate from "../home/SurveyEstimate";
import StickyScroll from "./StickyScroll";
import { VHeader } from "./Kit";
import { company, formatPKR, products, waLink } from "@/lib/data";

// Design 5 · Scroll: light and spacious; Aceternity's container-scroll card and sticky scroll reveal.
export default function Design5() {
  const deals = products.filter((p) => p.price && !p.sample);
  const shown = products.filter((p) => p.price).slice(0, 8);
  return (
    <div className="min-h-screen bg-ink text-fg">
      <VHeader tone="light" className="sticky top-0 border-b border-line/70 bg-panel/80 backdrop-blur-xl" />

      <section className="relative overflow-hidden px-4 pt-16 md:pt-24">
        <div aria-hidden="true" className="dots absolute inset-0 -z-0" />
        <div aria-hidden="true" className="absolute left-1/2 top-0 h-[500px] w-[900px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,color-mix(in_oklab,var(--color-brand)_22%,transparent),transparent)]" />
        <div className="relative mx-auto max-w-4xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sun-3" data-reveal>{company.slogan}</p>
          <h1 className="mt-4 text-[42px] font-extrabold leading-[1.05] tracking-[-0.04em] md:text-[76px]" data-reveal>
            Everything for your<br /><FlipWords className="text-brand" words={["home solar", "CCTV security", "smart classroom", "power backup", "next event"]} />
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-lg text-mute" data-reveal>Shop online, confirm on WhatsApp. Our own engineers install and look after it.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3" data-reveal>
            <Link href="/shop" className="shine group inline-flex items-center gap-2 rounded-full bg-brand px-6 py-3 font-semibold text-white">Start shopping <ArrowRight size={18} className="transition group-hover:translate-x-1" /></Link>
            <a href={waLink("I want a free site survey.")} target="_blank" rel="noopener" className="rounded-full border border-line bg-panel px-6 py-3 font-semibold hover:border-brand">Free site survey</a>
          </div>
        </div>

        {/* Container scroll: the "store window" stands up as you scroll */}
        <div className="relative mx-auto mt-14 max-w-6xl pb-20">
          <div className="cscroll origin-top rounded-[2rem] border-4 border-[#1f2937] bg-[#111827] p-2 shadow-[0_40px_80px_-30px_rgba(15,23,42,.5)] md:p-4">
            <div className="overflow-hidden rounded-[1.4rem] bg-coal">
              <div className="flex items-center gap-3 border-b border-line bg-panel px-4 py-3">
                <span className="flex gap-1.5"><i className="h-3 w-3 rounded-full bg-[#ef4444]" /><i className="h-3 w-3 rounded-full bg-[#f59e0b]" /><i className="h-3 w-3 rounded-full bg-[#22c55e]" /></span>
                <span className="mx-auto flex w-full max-w-md items-center gap-2 rounded-full bg-coal px-4 py-1.5 text-xs text-mute"><Search size={13} /> mjaze.com/shop</span>
                <ShoppingCart size={16} className="text-mute" />
              </div>
              <div className="grid grid-cols-2 gap-3 p-3 md:grid-cols-4 md:gap-4 md:p-5">
                {shown.map((p) => (
                  <Link key={p.slug} href={`/product/${p.slug}`} className="group rounded-xl bg-panel p-3 transition hover:-translate-y-1 hover:shadow-lg">
                    <ProductVisual kind={p.kind} className="aspect-[4/3] rounded-lg bg-coal transition group-hover:scale-[1.03]" />
                    <p className="mt-2 truncate text-sm font-semibold">{p.name}</p>
                    <p className="text-sm font-bold text-brand">{formatPKR(p.price!)}</p>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1320px] px-4 py-10">
        <Heading eyebrow="Five divisions" title="Scroll through what we do" />
        <div className="mt-6"><StickyScroll /></div>
      </section>

      <section className="mx-auto max-w-[1320px] px-4 py-12">
        <Rail head={<Heading eyebrow="This month" title="Best offers" />}>{deals.map((p) => <ProductCard key={p.slug} p={p} />)}</Rail>
      </section>
      <Packages />
      <Why />
      <ProjectsSlider />
      <SurveyEstimate />
      <div className="pb-16"><Footer /></div>
    </div>
  );
}
