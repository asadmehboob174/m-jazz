"use client";

import { useState } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import ProductVisual from "./ProductVisual";
import { divisions, waLink } from "@/lib/data";

export default function ServiceRows() {
  const [hover, setHover] = useState<number | null>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 300, damping: 30 });
  const sy = useSpring(y, { stiffness: 300, damping: 30 });

  return (
    <div
      className="relative border-t border-fg/10"
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        x.set(e.clientX - r.left);
        y.set(e.clientY - r.top);
      }}
      onMouseLeave={() => setHover(null)}
    >
      {divisions.map((d, i) => (
        <section
          key={d.id}
          id={d.id}
          onMouseEnter={() => setHover(i)}
          className="group relative grid scroll-mt-28 gap-6 border-b border-fg/10 py-10 md:grid-cols-[80px_1.2fr_1fr_auto] md:items-center md:py-14"
        >
          <span className="font-mono text-sm text-mute">[0{i + 1}]</span>
          <h2 className="text-4xl font-semibold tracking-tight transition duration-500 group-hover:translate-x-3 group-hover:text-sun md:text-6xl">{d.name}</h2>
          <div>
            <p className="text-[15px] leading-relaxed text-mute">{d.blurb}</p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {d.items.map((it) => (
                <li key={it} className="rounded-full border border-fg/10 px-3 py-1 text-[13px] text-soft">{it}</li>
              ))}
            </ul>
          </div>
          <a href={waLink(`I'm interested in ${d.name}.`)} target="_blank" rel="noopener" aria-label={`Ask about ${d.name} on WhatsApp`}
            className="flex h-14 w-14 items-center justify-center rounded-full border border-fg/15 transition group-hover:border-sun group-hover:bg-sun group-hover:text-black">
            <ArrowUpRight size={22} />
          </a>
        </section>
      ))}

      {/* cursor-following preview */}
      <AnimatePresence>
        {hover !== null && (
          <motion.div
            aria-hidden="true"
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.6 }}
            transition={{ duration: 0.25 }}
            style={{ left: sx, top: sy }}
            className="pointer-events-none absolute z-20 hidden h-64 w-52 -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-2xl border border-fg/10 bg-gradient-to-b from-stage to-stage-end shadow-2xl lg:block"
          >
            <ProductVisual kind={divisions[hover].kind} className="h-full w-full" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
