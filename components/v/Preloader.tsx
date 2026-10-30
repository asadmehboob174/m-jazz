"use client";

import { useEffect, useState } from "react";

// Loading screen: a progress ring fills round the logo, then four shutter panels slide up to reveal the page.
export default function Preloader() {
  const [stage, setStage] = useState<"load" | "open" | "done">("load");
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return setStage("done");
    const a = setTimeout(() => setStage("open"), 1300);
    const b = setTimeout(() => setStage("done"), 2300);
    return () => { clearTimeout(a); clearTimeout(b); };
  }, []);
  if (stage === "done") return null;
  return (
    <div className="fixed inset-0 z-[100]" aria-hidden="true">
      <div className="absolute inset-0 grid grid-cols-4">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="bg-white transition-transform duration-700 ease-[cubic-bezier(.76,0,.24,1)]"
            style={{ transform: stage === "open" ? "translateY(-100%)" : "none", transitionDelay: `${i * 90}ms` }} />
        ))}
      </div>
      <div className={`absolute inset-0 flex flex-col items-center justify-center transition-opacity duration-300 ${stage === "open" ? "opacity-0" : "opacity-100"}`}>
        <svg width="140" height="140" viewBox="0 0 140 140" className="-rotate-90">
          <circle cx="70" cy="70" r="66" fill="none" stroke="#e5e7eb" strokeWidth="3" />
          <circle cx="70" cy="70" r="66" fill="none" stroke="var(--color-brand)" strokeWidth="3" strokeLinecap="round" strokeDasharray="415" className="animate-[ring-fill_1.2s_ease-in-out_forwards]" style={{ strokeDashoffset: 415 }} />
        </svg>
        <p className="mt-10 text-[56px] font-black leading-none tracking-tight text-[#0f172a] [text-shadow:0_4px_0_var(--color-brand)]">M.JAZE</p>
        <p className="mt-5 flex gap-3 text-sm font-bold text-brand">
          {"LOADING".split("").map((c, i) => <span key={i} className="animate-[blink_1.2s_ease-in-out_infinite]" style={{ animationDelay: `${i * 0.1}s` }}>{c}</span>)}
        </p>
      </div>
    </div>
  );
}
