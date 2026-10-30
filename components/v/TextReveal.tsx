"use client";

import { useEffect, useRef } from "react";

// After Magic UI's "Text Reveal": the section pins while its words light up one by one as you scroll.
export default function TextReveal({ text, highlight = [] }: { text: string; highlight?: string[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const words = text.split(" ");
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const spans = [...el.querySelectorAll<HTMLSpanElement>("[data-w]")];
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) { spans.forEach((s) => (s.style.opacity = "1")); return; }
    let raf = 0;
    const on = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const r = el.getBoundingClientRect();
        const p = Math.min(1, Math.max(0, -r.top / (r.height - window.innerHeight)));
        spans.forEach((s, i) => { s.style.opacity = String(Math.min(1, Math.max(0.15, p * spans.length * 1.15 - i + 0.15))); });
      });
    };
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => { window.removeEventListener("scroll", on); cancelAnimationFrame(raf); };
  }, []);
  return (
    <div ref={ref} className="relative h-[220vh]">
      <div className="sticky top-0 flex h-screen items-center">
        <p className="mx-auto max-w-5xl px-4 text-[30px] font-bold leading-[1.25] tracking-tight md:text-[52px]">
          {words.map((w, i) => (
            <span key={i} data-w className={`transition-opacity duration-200 ${highlight.some((h) => w.toLowerCase().startsWith(h)) ? "text-brand" : ""}`} style={{ opacity: 0.15 }}>{w} </span>
          ))}
        </p>
      </div>
    </div>
  );
}
