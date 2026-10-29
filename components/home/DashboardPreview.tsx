"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { LayoutDashboard, Sun, Wrench, ShieldCheck, Projector, Battery } from "lucide-react";

const bars = [55, 62, 48, 70, 78, 74, 40, 66, 84, 90, 76, 82, 88, 72];

export default function DashboardPreview() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "center center"] });
  const rotate = useTransform(scrollYProgress, [0, 1], [24, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.9, 1]);

  return (
    <section ref={ref} className="container-x relative -mt-40 md:-mt-56" style={{ perspective: 1200 }}>
      <div className="mb-10 text-center">
        <p className="tag">[ The M.JAZE app ]</p>
        <h2 className="mx-auto mt-4 max-w-3xl text-3xl font-semibold tracking-tight md:text-5xl">
          Your system, live — warranty, service and rentals in one place.
        </h2>
      </div>
      <motion.div style={{ rotateX: rotate, scale }} className="mx-auto max-w-6xl rounded-[28px] border border-white/10 bg-white/[0.04] p-2 shadow-[0_40px_120px_-20px_color-mix(in_oklab,var(--color-sun)_25%,transparent)] md:p-3">
        <div className="flex overflow-hidden rounded-[22px] bg-[#f4f6fa] text-[#0b1530]">
          <aside className="hidden w-56 shrink-0 border-r border-[#e3e6ee] bg-white p-5 md:block">
            <p className="text-lg font-bold">M.JAZE</p>
            <ul className="mt-8 space-y-1 text-[14px] font-medium">
              {[
                [LayoutDashboard, "Overview"], [Sun, "My system"], [Wrench, "Service"], [ShieldCheck, "Warranty"], [Projector, "Rentals"],
              ].map(([Icon, l], i) => {
                const I = Icon as typeof Sun;
                return (
                  <li key={l as string} className={`flex items-center gap-3 rounded-lg px-3 py-2.5 ${i === 0 ? "bg-[#0b1530] text-white" : "text-[#4b5675]"}`}>
                    <I size={17} />{l as string}
                  </li>
                );
              })}
            </ul>
          </aside>
          <div className="min-w-0 flex-1 p-5 md:p-7">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div><p className="text-xs text-[#4b5675]">Sample customer view</p><p className="text-xl font-bold">Assalam-o-Alaikum, Ahmed</p></div>
              <span className="rounded-lg bg-[#0b1530] px-4 py-2 text-sm font-semibold text-white">Book a service</span>
            </div>
            <div className="mt-5 grid grid-cols-2 gap-3 lg:grid-cols-4">
              {[["Generated today", "41.6 kWh"], ["This month", "1,108 kWh"], ["Battery", "92%"], ["Next visit", "12 Nov"]].map(([l, v]) => (
                <div key={l} className="rounded-xl border border-[#e3e6ee] bg-white p-4">
                  <p className="text-xs text-[#4b5675]">{l}</p>
                  <p className="mt-1 text-xl font-bold md:text-2xl">{v}</p>
                </div>
              ))}
            </div>
            <div className="mt-3 grid gap-3 lg:grid-cols-[2fr_1fr]">
              <div className="rounded-xl border border-[#e3e6ee] bg-white p-4">
                <p className="text-sm font-semibold">Solar production · 14 days</p>
                <div className="mt-4 flex h-36 items-end gap-1.5">
                  {bars.map((b, i) => (
                    <div key={i} className="flex-1 rounded-t bg-gradient-to-t from-[#1747c9] to-[#4f7dff]" style={{ height: `${b}%` }} />
                  ))}
                </div>
              </div>
              <div className="rounded-xl border border-[#e3e6ee] bg-white p-4">
                <p className="text-sm font-semibold">Service tickets</p>
                {[["#1042", "Technician on the way", "#a3420b", "#fff1e6"], ["#1031", "Resolved", "#0e7c4a", "#e3f5ec"]].map(([id, s, fg, bg]) => (
                  <div key={id} className="mt-3 flex items-center justify-between text-sm">
                    <span className="font-semibold">{id}</span>
                    <span className="rounded-full px-2.5 py-1 text-xs font-semibold" style={{ color: fg, background: bg }}>{s}</span>
                  </div>
                ))}
                <div className="mt-4 flex items-center gap-2 rounded-lg bg-[#f4f6fa] p-3 text-sm"><Battery size={16} /> Backup ready</div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
