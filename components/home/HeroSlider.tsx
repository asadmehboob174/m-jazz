"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowRight, CheckCircle2, ChevronLeft, ChevronRight } from "lucide-react";
import ProductVisual from "../ProductVisual";
import { formatPKR, waLink } from "@/lib/data";
import { heroSlides as slides } from "@/lib/site";

const INTERVAL = 6500;

// Splits a headline into masked words that slide up one after another.
const Words = ({ text }: { text: string }) => (
  <>{text.split(" ").map((w, i) => <span key={i} className="w"><span style={{ "--i": i } as React.CSSProperties}>{w}&nbsp;</span></span>)}</>
);

export default function HeroSlider({ tall = false }: { tall?: boolean }) {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const startX = useRef<number | null>(null);
  const go = useCallback((n: number) => setI((n + slides.length) % slides.length), []);

  useEffect(() => {
    if (paused) return;
    const t = setTimeout(() => go(i + 1), INTERVAL);
    return () => clearTimeout(t);
  }, [i, paused, go]);

  // Mouse parallax: the picture drifts slightly against the cursor
  const tilt = (e: React.PointerEvent) => {
    const r = root.current?.getBoundingClientRect();
    if (!r || e.pointerType !== "mouse") return;
    root.current!.style.setProperty("--px", ((e.clientX - r.left) / r.width - 0.5).toFixed(3));
    root.current!.style.setProperty("--py", ((e.clientY - r.top) / r.height - 0.5).toFixed(3));
  };

  return (
    <div
      ref={root}
      className="hero-bg relative isolate flex flex-col overflow-hidden rounded-2xl text-white"
      role="region" aria-roledescription="carousel" aria-label="Featured offers"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => { setPaused(false); root.current?.style.setProperty("--px", "0"); root.current?.style.setProperty("--py", "0"); }}
      onPointerMove={tilt}
      onFocus={() => setPaused(true)} onBlur={() => setPaused(false)}
      onPointerDown={(e) => { startX.current = e.clientX; }}
      onPointerUp={(e) => {
        if (startX.current === null) return;
        const dx = e.clientX - startX.current;
        startX.current = null;
        if (Math.abs(dx) > 50) go(i + (dx < 0 ? 1 : -1));
      }}
    >
      {/* Moving light behind everything */}
      <div aria-hidden="true" className="pointer-events-none absolute -left-24 -top-24 -z-10 h-96 w-96 animate-blob rounded-full bg-brand opacity-60 blur-3xl" />
      <div aria-hidden="true" className="pointer-events-none absolute -bottom-32 right-10 -z-10 h-80 w-80 animate-blob rounded-full bg-sun opacity-25 blur-3xl [animation-delay:-9s]" />

      <div className="grid flex-1">
        {slides.map((s, n) => {
          const on = n === i;
          const Heading = n === 0 ? "h1" : "h2";
          return (
            <div key={s.id} data-active={on} inert={!on} aria-roledescription="slide" aria-label={`${n + 1} of ${slides.length}`}
              className={`slide col-start-1 row-start-1 grid items-center transition-opacity duration-700 sm:grid-cols-[1.35fr_1fr] ${on ? "opacity-100" : "pointer-events-none opacity-0"}`}>
              <div className={`relative z-10 p-6 sm:p-8 lg:p-10 ${tall ? "xl:p-12" : ""}`}>
                <p data-rise="1" className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[12px] font-semibold text-sun-2 backdrop-blur sm:text-[13px]">
                  <span className="relative flex h-2 w-2"><span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sun opacity-75" /><span className="relative h-2 w-2 rounded-full bg-sun" /></span>
                  {s.tag}
                </p>
                <Heading className="mt-4 text-[28px] font-extrabold leading-[1.1] tracking-tight sm:text-[34px] lg:text-[40px] xl:text-[44px]"><Words text={s.title} /></Heading>
                <p data-rise="3" className="mt-3 max-w-md text-[15px] leading-relaxed text-white/75 sm:text-[16px]">{s.text}</p>
                {s.price && (
                  <p data-rise="3" className="mt-4 flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <span className="text-sm text-white/60">Only</span>
                    <span className="text-glint text-[30px] font-extrabold tracking-tight sm:text-[36px]">{formatPKR(s.price.now)}</span>
                    {s.price.was && <span className="text-white/50 line-through">{formatPKR(s.price.was)}</span>}
                    {s.price.note && <span className="basis-full text-xs text-white/60 sm:text-sm">{s.price.note}</span>}
                  </p>
                )}
                <div data-rise="4" className="mt-6 grid grid-cols-2 gap-2.5 sm:flex sm:flex-wrap sm:gap-3">
                  <Link href={s.cta[1]} className="btn-sun shine glow px-3 sm:px-5">{s.cta[0]} <ArrowRight size={18} className="hidden sm:block" /></Link>
                  <a href={waLink(s.alt[1])} target="_blank" rel="noopener"
                    className="inline-flex items-center justify-center rounded-lg border border-white/25 px-3 py-3 text-center text-[15px] font-semibold backdrop-blur transition hover:bg-white/10 sm:px-5">
                    {s.alt[0]}
                  </a>
                </div>
              </div>

              <div className="relative hidden h-full min-h-[300px] items-center justify-center sm:flex">
                <div aria-hidden="true" className="absolute aspect-square w-[78%] animate-spin-slow rounded-full border-2 border-dashed border-white/15" />
                <div aria-hidden="true" className="absolute aspect-square w-[58%] rounded-full bg-[radial-gradient(circle,color-mix(in_oklab,var(--color-sun)_35%,transparent),transparent_70%)]" />
                <div className="relative h-[85%] w-[90%] transition-transform duration-300 ease-out [transform:translate(calc(var(--px,0)*-22px),calc(var(--py,0)*-16px))]">
                  <ProductVisual kind={s.kind} className={`h-full w-full transition duration-1000 ease-out ${on ? "scale-100 rotate-0" : "scale-75 -rotate-6"}`} />
                </div>
                {s.chips.map((c, k) => (
                  <span key={c} data-pop style={{ "--i": k } as React.CSSProperties}
                    className={`absolute flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-navy shadow-lg lg:text-[13px] ${k ? "bottom-[14%] right-[6%]" : "left-[2%] top-[16%]"}`}>
                    <CheckCircle2 size={15} className="text-ok" /> {c}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Controls: labelled tabs with progress on larger screens, dots on phones */}
      <div className="relative z-10 flex items-center gap-3 px-6 pb-5 sm:px-8 lg:px-10">
        <div className="hidden flex-1 gap-1 md:flex">
          {slides.map((s, n) => (
            <button key={s.id} type="button" onClick={() => go(n)} aria-label={`Show ${s.label}`} aria-current={n === i}
              className={`group flex-1 text-left text-[12.5px] font-semibold transition ${n === i ? "text-white" : "text-white/50 hover:text-white/80"}`}>
              <span className="relative mb-2 block h-[3px] overflow-hidden rounded-full bg-white/20">
                {n === i && <span key={`${i}-${paused}`} className="absolute inset-0 origin-left rounded-full bg-sun"
                  style={{ animation: paused ? "none" : `fill ${INTERVAL}ms linear forwards`, transform: paused ? "scaleX(1)" : undefined }} />}
              </span>
              <span className="line-clamp-1">{s.label}</span>
            </button>
          ))}
        </div>
        <div className="flex flex-1 gap-1.5 md:hidden">
          {slides.map((s, n) => (
            <button key={s.id} type="button" aria-label={`Show slide ${n + 1}`} aria-current={n === i} onClick={() => go(n)}
              className={`h-1.5 rounded-full transition-all duration-300 ${n === i ? "w-8 bg-sun" : "w-3 bg-white/30"}`} />
          ))}
        </div>
        <div className="flex shrink-0 gap-1.5">
          <button type="button" aria-label="Previous slide" onClick={() => go(i - 1)} className="flex h-9 w-9 items-center justify-center rounded-full border border-white/25 transition hover:bg-white hover:text-navy"><ChevronLeft size={18} /></button>
          <button type="button" aria-label="Next slide" onClick={() => go(i + 1)} className="flex h-9 w-9 items-center justify-center rounded-full border border-white/25 transition hover:bg-white hover:text-navy"><ChevronRight size={18} /></button>
        </div>
      </div>
    </div>
  );
}
