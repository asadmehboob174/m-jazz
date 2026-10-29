"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight, ShoppingBag } from "lucide-react";
import Sky from "../Sky";
import { brands, waLink } from "@/lib/data";

const ease = [0.22, 1, 0.36, 1] as const;

export default function Hero() {
  return (
    <section className="relative isolate overflow-hidden pb-10 pt-36 md:pt-44">
      {/* dawn sky: deep night (or clear day in light mode) fading into a warm horizon */}
      <div aria-hidden="true" className="sky-dawn absolute inset-0 -z-20" />
      <div aria-hidden="true" className="grid-bg absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_at_top,black_30%,transparent_75%)]" />
      <Sky />
      {/* top glow, drawn as a gradient rather than a blur filter so scrolling stays cheap */}
      <div aria-hidden="true" className="absolute left-1/2 top-[-300px] -z-10 h-[640px] w-[1100px] -translate-x-1/2 bg-[radial-gradient(closest-side,color-mix(in_oklab,var(--color-sun)_16%,transparent),transparent)]" />

      <div className="container-x relative">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease }}
          className="inline-flex items-center gap-2 rounded-full border border-fg/10 bg-fg/[0.03] p-1 pr-4 text-[13px]">
          <span className="rounded-full bg-fg/10 px-3 py-1 font-medium">1 kVA → 1 MW</span>
          <span className="text-soft">Solar · Storage · Security · Tech</span>
        </motion.div>

        <div className="mt-8 grid items-end gap-10 lg:grid-cols-[1.5fr_1fr]">
          <h1 className="text-[clamp(46px,7.4vw,112px)] font-semibold leading-[0.95] tracking-[-0.045em]">
            {["Power that", "pays you", "back."].map((line, i) => (
              <motion.span key={line} className="block"
                initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.9, delay: 0.1 + i * 0.12, ease }}>
                {i === 2 ? <span className="em pr-2 text-sun-gradient">{line}</span> : <span className="text-gradient">{line}</span>}
              </motion.span>
            ))}
          </h1>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.5, ease }} className="lg:pb-4">
            <p className="max-w-md text-lg leading-relaxed text-soft md:text-xl">
              Solar systems, lithium batteries, UPS, CCTV and smart-classroom tech — designed, installed and serviced by one team in Lahore.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href={waLink("I want a free solar site survey.")} target="_blank" rel="noopener"
                className="flex items-center gap-3 rounded-full bg-sun py-1.5 pl-6 pr-1.5 font-semibold text-black transition hover:bg-sun-2">
                Free site survey <span className="flex h-10 w-12 items-center justify-center rounded-full bg-black/15"><ArrowRight size={18} /></span>
              </a>
              <Link href="/shop" className="beam flex items-center gap-3 rounded-full border border-fg/15 bg-fg/[0.04] py-1.5 pl-6 pr-1.5 font-semibold transition hover:border-fg/40">
                Shop products <span className="flex h-10 w-10 items-center justify-center rounded-full bg-fg text-ink"><ShoppingBag size={17} /></span>
              </Link>
            </div>
          </motion.div>
        </div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.9 }} className="mt-16 text-center">
          <p className="text-sm text-mute">Trusted by <span className="text-fg">1,250+</span> homes, schools and factories · installing these brands</p>
          <div className="relative mx-auto mt-5 max-w-3xl overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_20%,black_80%,transparent)]">
            <div className="flex w-max animate-marquee gap-12">
              {[...brands, ...brands].map((b, i) => (
                <span key={i} className="text-xl font-semibold tracking-tight text-fg/45">{b}</span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* glowing horizon arc */}
      <div aria-hidden="true" className="relative mt-10 h-[260px] md:h-[340px]">
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.6, delay: 0.3, ease }}
          className="absolute left-1/2 top-0 h-[1400px] w-[2200px] -translate-x-1/2 rounded-[50%] border-t border-sun/70 bg-ink"
          style={{ boxShadow: "0 -30px 120px -10px color-mix(in oklab, var(--color-sun) 55%, transparent), inset 0 30px 80px -30px color-mix(in oklab, var(--color-sun) 35%, transparent)" }}
        />
        <div className="absolute inset-x-0 bottom-[-0.12em] select-none text-center text-[26vw] font-bold leading-none tracking-tighter text-fg/[0.035] lg:text-[330px]">
          M.JAZE
        </div>
      </div>
    </section>
  );
}
