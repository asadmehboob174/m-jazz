import Link from "next/link";
import { ArrowRight, Star } from "lucide-react";
import ProductVisual from "../ProductVisual";
import Footer from "../Footer";
import Solutions from "../home/Solutions";
import ProductTabs from "../home/ProductTabs";
import Packages from "../home/Packages";
import Services from "../home/Services";
import ProjectsSlider from "../home/ProjectsSlider";
import SurveyEstimate from "../home/SurveyEstimate";
import { VHeader } from "./Kit";
import { company, formatPKR, products, waLink } from "@/lib/data";

const tiles = products.filter((p) => p.price).slice(0, 24);
const cols = [0, 1, 2, 3].map((c) => tiles.filter((_, i) => i % 4 === c));
const headline = "Smarter energy, security and classrooms for Lahore";

// Design 4 · Aurora: light, Aceternity's aurora background with a 3D marquee of products.
export default function Design4() {
  return (
    <div className="min-h-screen bg-ink text-fg">
      <section className="relative isolate overflow-hidden bg-[#f6f8fc]">
        <div className="aurora-bg -z-10" aria-hidden="true" />
        <VHeader tone="light" className="border-b border-white/60 bg-white/50 backdrop-blur-xl" />
        <div className="mx-auto grid max-w-[1320px] items-center gap-10 px-4 pb-16 pt-12 lg:grid-cols-[1fr_1.05fr] lg:pb-24 lg:pt-16">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full bg-white/80 px-3 py-1.5 text-sm shadow-sm">
              <span className="flex">{Array.from({ length: 5 }, (_, i) => <Star key={i} size={13} className="fill-sun text-sun" />)}</span>
              {company.recommend}% recommend · {company.reviews} reviews
            </p>
            <h1 className="mt-6 text-[40px] font-extrabold leading-[1.05] tracking-[-0.035em] md:text-[64px]">
              {headline.split(" ").map((w, i) => (
                <span key={i} className={`inline-block animate-[word-in_.6s_ease_both] ${["energy,", "security", "classrooms"].includes(w) ? "text-brand" : ""}`} style={{ animationDelay: `${i * 90}ms` }}>{w}&nbsp;</span>
              ))}
            </h1>
            <p className="mt-6 max-w-lg text-lg text-soft">Solar from 1 kVA to 1 MW, lithium batteries, CCTV, fire alarms, smart boards, rentals and repairs, all from one trusted team.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/shop" className="shine group inline-flex items-center gap-2 rounded-full bg-brand px-6 py-3 font-semibold text-white shadow-[0_10px_30px_-10px_var(--color-brand)]">Shop now <ArrowRight size={18} className="transition group-hover:translate-x-1" /></Link>
              <a href={waLink("I want a free site survey.")} target="_blank" rel="noopener" className="rounded-full bg-white px-6 py-3 font-semibold shadow-sm hover:shadow-md">Free site survey</a>
            </div>
          </div>

          {/* 3D marquee */}
          <div className="relative h-[420px] overflow-hidden rounded-[2rem] md:h-[560px] [mask-image:linear-gradient(to_bottom,transparent,#000_15%,#000_85%,transparent)]">
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

      <ProductTabs />
      <Solutions />
      <Packages />
      <Services />
      <ProjectsSlider />
      <SurveyEstimate />
      <div className="pb-16"><Footer /></div>
    </div>
  );
}
