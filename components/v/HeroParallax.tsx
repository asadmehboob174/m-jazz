"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import ProductVisual from "../ProductVisual";
import { formatPKR, products } from "@/lib/data";

// After Aceternity's "Hero Parallax": three rows of product cards start tilted in 3D and
// straighten out while sliding sideways as you scroll. Progress is written to --p (0 → 1).
const items = products.filter((p) => p.price).slice(0, 15);
const rows = [items.slice(0, 5), items.slice(5, 10), items.slice(10, 15)];

export default function HeroParallax({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) { el.style.setProperty("--p", "1"); return; }
    let raf = 0;
    const on = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const r = el.getBoundingClientRect();
        const p = Math.min(1, Math.max(0, -r.top / (window.innerHeight * 0.9)));
        el.style.setProperty("--p", p.toFixed(3));
      });
    };
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => { window.removeEventListener("scroll", on); cancelAnimationFrame(raf); };
  }, []);

  return (
    <div ref={ref} className="relative h-[1500px] overflow-hidden [--p:0] [perspective:1000px] [transform-style:preserve-3d] md:h-[1750px]">
      <div className="relative z-10">{children}</div>
      <div className="[transform-style:preserve-3d]" style={{
        transform: "rotateX(calc(15deg * (1 - var(--p)))) rotateZ(calc(18deg * (1 - var(--p)))) translateY(calc(-260px * (1 - var(--p)) + 160px * var(--p)))",
        opacity: "calc(0.25 + 0.75 * var(--p))",
      }}>
        {rows.map((row, r) => (
          <div key={r} className={`mb-8 flex gap-6 md:gap-10 ${r === 1 ? "" : "flex-row-reverse"}`}
            style={{ transform: `translateX(calc(${r === 1 ? -1 : 1} * 380px * var(--p)))` }}>
            {row.map((p) => (
              <Link key={p.slug} href={`/product/${p.slug}`}
                className="group relative h-56 w-[17rem] shrink-0 overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.08] to-white/[0.02] transition hover:-translate-y-3 md:h-72 md:w-[22rem]">
                <ProductVisual kind={p.kind} className="absolute inset-0 transition duration-500 group-hover:scale-110" />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-4 opacity-0 transition group-hover:opacity-100">
                  <p className="font-semibold text-white">{p.name}</p>
                  <p className="text-sm text-sun-2">{formatPKR(p.price!)}</p>
                </div>
              </Link>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
