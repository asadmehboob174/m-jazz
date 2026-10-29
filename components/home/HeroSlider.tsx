"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowRight, ChevronLeft, ChevronRight, Star } from "lucide-react";
import ProductVisual from "../ProductVisual";
import { CountUp } from "../Reveal";
import { company, stats, waLink, type Kind } from "@/lib/data";

const slides: { tag: string; title: string; text: string; cta: [string, string]; alt: [string, string]; kind: Kind }[] = [
  {
    tag: "Solar systems from 1 kVA to 1 MW",
    title: "Cut your electricity bill with solar — installed in Lahore.",
    text: "Tier-1 panels, hybrid inverters and lithium batteries, supplied, installed and serviced by one team.",
    cta: ["Shop products", "/shop"],
    alt: ["Free survey", waLink("I want a free solar site survey.")],
    kind: "panel",
  },
  {
    tag: "Lithium batteries & UPS",
    title: "No more load-shedding. Backup that lasts all night.",
    text: "LiFePO4 batteries with up to 10 years warranty, plus UPS sales, repair and battery replacement.",
    cta: ["Shop batteries", "/shop?c=Batteries"],
    alt: ["Book UPS repair", waLink("I need UPS repair / battery replacement.")],
    kind: "battery",
  },
  {
    tag: "CCTV · Attendance · Smart classrooms",
    title: "Security cameras and touch boards, installed and serviced.",
    text: "4K CCTV with mobile viewing, face attendance and interactive boards for homes, offices and schools.",
    cta: ["Shop CCTV", "/shop?c=CCTV"],
    alt: ["Get a quote", waLink("I want a quote for CCTV / smart classroom.")],
    kind: "cctv",
  },
  {
    tag: "Projector, SMD & sound on rent",
    title: "Events made easy — screens and sound, delivered and set up.",
    text: "Projectors, SMD screens and speakers by the day, with our own operator at your event.",
    cta: ["View rentals", "/shop?c=Rentals"],
    alt: ["Check availability", waLink("I want to rent a projector / SMD screen / sound system.")],
    kind: "projector",
  },
];

const INTERVAL = 6000;

export default function HeroSlider() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const startX = useRef<number | null>(null);
  const go = useCallback((n: number) => setI((n + slides.length) % slides.length), []);

  useEffect(() => {
    if (paused) return;
    const t = setTimeout(() => go(i + 1), INTERVAL);
    return () => clearTimeout(t);
  }, [i, paused, go]);

  return (
    <div
      className="hero-bg relative overflow-hidden rounded-2xl text-white"
      role="region"
      aria-roledescription="carousel"
      aria-label="Featured"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      onPointerDown={(e) => { startX.current = e.clientX; }}
      onPointerUp={(e) => {
        if (startX.current === null) return;
        const dx = e.clientX - startX.current;
        startX.current = null;
        if (Math.abs(dx) > 50) go(i + (dx < 0 ? 1 : -1));
      }}
    >
      {/* Slides share one grid cell, so the banner keeps the height of the tallest */}
      <div className="grid">
        {slides.map((s, n) => {
          const on = n === i;
          const Heading = n === 0 ? "h1" : "h2";
          return (
            <div key={s.tag} data-active={on} inert={!on} aria-roledescription="slide" aria-label={`${n + 1} of ${slides.length}`}
              className={`slide col-start-1 row-start-1 grid transition-opacity duration-500 sm:grid-cols-[1.6fr_1fr] ${on ? "opacity-100" : "pointer-events-none opacity-0"}`}>
              <div className="relative z-10 p-6 pb-0 sm:p-8 sm:pb-0 lg:p-12 lg:pb-0">
                <p data-rise="1" className="inline-flex rounded bg-white/10 px-2.5 py-1 text-[12px] font-semibold text-sun-2 sm:text-[13px]">{s.tag}</p>
                <Heading data-rise="2" className="mt-4 text-[28px] font-bold leading-[1.12] tracking-tight sm:mt-5 sm:text-[36px] lg:text-[42px]">{s.title}</Heading>
                <p data-rise="3" className="mt-3 max-w-md text-[15px] leading-relaxed text-white/75 sm:mt-4 sm:text-[17px]">{s.text}</p>
                <div data-rise="4" className="mt-6 grid grid-cols-2 gap-2.5 sm:mt-7 sm:flex sm:flex-wrap sm:gap-3">
                  <Link href={s.cta[1]} className="btn-sun px-3 sm:px-5">{s.cta[0]} <ArrowRight size={18} className="hidden sm:block" /></Link>
                  <a href={s.alt[1]} target="_blank" rel="noopener"
                    className="inline-flex items-center justify-center rounded-lg border border-white/25 px-3 py-3 text-center text-[15px] font-semibold hover:bg-white/10 sm:px-5">
                    {s.alt[0]}
                  </a>
                </div>
              </div>
              <ProductVisual kind={s.kind} className={`hidden h-full min-h-[260px] transition duration-700 ease-out sm:flex ${on ? "scale-100" : "scale-90"}`} />
            </div>
          );
        })}
      </div>

      {/* Shared footer: quick stats + slider controls */}
      <div className="relative z-10 flex flex-wrap items-end justify-between gap-5 p-6 pt-7 sm:p-8 lg:px-12 lg:pb-10">
        <div className="grid basis-full grid-cols-3 gap-3 border-t border-white/10 pt-5 sm:max-w-md sm:flex-1 sm:basis-auto">
          <div><p className="flex items-center gap-1 text-lg font-bold sm:text-xl"><CountUp to={company.rating} decimals={1} /><Star size={16} className="fill-sun text-sun" /></p><p className="text-xs text-white/60">{company.reviews}+ reviews</p></div>
          <div><p className="text-lg font-bold sm:text-xl"><CountUp to={stats[0].to} suffix="+" /></p><p className="text-xs text-white/60">Systems installed</p></div>
          <div><p className="text-lg font-bold sm:text-xl"><CountUp to={stats[2].to} suffix=" yrs" /></p><p className="text-xs text-white/60">In Lahore</p></div>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5">
            {slides.map((s, n) => (
              <button key={s.tag} type="button" aria-label={`Show slide ${n + 1}`} aria-current={n === i} onClick={() => go(n)}
                className={`relative h-1.5 overflow-hidden rounded-full bg-white/25 transition-all duration-300 ${n === i ? "w-8" : "w-3 hover:bg-white/50"}`}>
                {n === i && (
                  <span key={`${i}-${paused}`} className="absolute inset-0 origin-left rounded-full bg-sun"
                    style={{ animation: paused ? "none" : `fill ${INTERVAL}ms linear forwards`, transform: paused ? "scaleX(1)" : undefined }} />
                )}
              </button>
            ))}
          </div>
          <div className="hidden gap-1.5 sm:flex">
            <button type="button" aria-label="Previous slide" onClick={() => go(i - 1)} className="flex h-9 w-9 items-center justify-center rounded-full border border-white/25 hover:bg-white/10"><ChevronLeft size={18} /></button>
            <button type="button" aria-label="Next slide" onClick={() => go(i + 1)} className="flex h-9 w-9 items-center justify-center rounded-full border border-white/25 hover:bg-white/10"><ChevronRight size={18} /></button>
          </div>
        </div>
      </div>
    </div>
  );
}
