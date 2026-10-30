import Link from "next/link";
import { ArrowRight, BadgeCheck } from "lucide-react";
import Marquee from "../Marquee";
import FlipWords from "../FlipWords";
import Footer from "../Footer";
import Solutions from "../home/Solutions";
import ProductTabs from "../home/ProductTabs";
import Packages from "../home/Packages";
import Why from "../home/Why";
import ProjectsSlider from "../home/ProjectsSlider";
import SurveyEstimate from "../home/SurveyEstimate";
import HeroParallax from "./HeroParallax";
import { VHeader } from "./Kit";
import { brands, company, waLink } from "@/lib/data";

// Design 1 · Spotlight: dark, with Aceternity's spotlight beam and hero parallax of real products.
export default function Design1() {
  return (
    <div data-mode="dark" className="min-h-screen bg-ink text-fg">
      <VHeader tone="dark" className="sticky top-0 border-b border-white/10 bg-ink/70 backdrop-blur-xl" />

      <HeroParallax>
        <div className="relative overflow-hidden">
          <svg aria-hidden="true" viewBox="0 0 3787 2842" fill="none" className="animate-spotlight pointer-events-none absolute left-0 top-0 h-[169%] w-[138%] lg:w-[84%]">
            <g filter="url(#sl)"><ellipse cx="1924.71" cy="273.501" rx="1924.71" ry="273.501" transform="matrix(-0.822377 -0.568943 -0.568943 0.822377 3631.88 2291.09)" fill="white" fillOpacity="0.16" /></g>
            <defs><filter id="sl" x="0.86" y="0.84" width="3785.16" height="2840.26" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB"><feGaussianBlur stdDeviation="151" /></filter></defs>
          </svg>
          <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.04)_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_80%_70%_at_50%_0%,#000,transparent)]" />
          <div className="relative mx-auto max-w-[1320px] px-4 pb-16 pt-16 md:pt-24">
            <p className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-sm text-white/80"><BadgeCheck size={16} className="text-sun" /> Authorised Dahua reseller · {company.years} years</p>
            <h1 className="mt-6 max-w-4xl text-[42px] font-extrabold leading-[1.02] tracking-[-0.04em] text-white md:text-[76px]">
              The technology partner<br />that <FlipWords className="text-sun-2" words={["powers homes", "secures shops", "runs classrooms", "never stops"]} />
            </h1>
            <p className="mt-6 max-w-xl text-lg text-white/60">Solar from 1 kVA to 1 MW, lithium batteries, CCTV, fire alarms, smart boards, rentals and repairs. Order online, confirm on WhatsApp.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/shop" className="shine group inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 font-semibold text-black">Shop all products <ArrowRight size={18} className="transition group-hover:translate-x-1" /></Link>
              <a href={waLink("I want a free site survey.")} target="_blank" rel="noopener" className="rounded-full border border-white/20 px-6 py-3 font-semibold text-white hover:bg-white/10">Free site survey</a>
            </div>
          </div>
        </div>
      </HeroParallax>

      <div className="border-y border-white/10 py-6 text-white/35">
        <Marquee>{brands.map((b) => <span key={b} className="mx-8 text-xl font-bold tracking-tight">{b}</span>)}</Marquee>
      </div>
      <Solutions />
      <ProductTabs />
      <Packages />
      <Why />
      <ProjectsSlider />
      <SurveyEstimate />
      <div className="pb-16"><Footer /></div>
    </div>
  );
}
