"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

// Thin loading bar along the top while the next page is on its way.
export default function NavProgress() {
  const path = usePathname();
  const params = useSearchParams();
  const [p, setP] = useState<number | null>(null);
  const timer = useRef<ReturnType<typeof setInterval>>(undefined);

  useEffect(() => {
    const click = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as Element).closest("a");
      if (!a || a.target === "_blank" || a.hasAttribute("download")) return;
      const url = new URL(a.href, location.href);
      if (url.origin !== location.origin || (url.pathname === location.pathname && url.search === location.search)) return;
      clearInterval(timer.current);
      setP(8);
      timer.current = setInterval(() => setP((v) => (v === null ? v : Math.min(90, v + (90 - v) * 0.12))), 120);
    };
    document.addEventListener("click", click, true);
    return () => document.removeEventListener("click", click, true);
  }, []);

  // Route finished: run to 100% and fade out
  useEffect(() => {
    clearInterval(timer.current);
    setP((v) => (v === null ? null : 100));
    const t = setTimeout(() => setP(null), 350);
    return () => clearTimeout(t);
  }, [path, params]);

  if (p === null) return null;
  return (
    <div aria-hidden="true" className="fixed inset-x-0 top-0 z-[95] h-[3px]">
      <div className={`h-full bg-gradient-to-r from-brand to-sun shadow-[0_0_10px_var(--color-sun)] transition-all duration-300 ease-out ${p === 100 ? "opacity-0" : "opacity-100"}`} style={{ width: `${p}%` }} />
    </div>
  );
}
