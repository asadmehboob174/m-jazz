"use client";

import { useEffect, useState } from "react";

// Counts down to the end of the current month (when monthly offers change).
export default function Countdown() {
  const [left, setLeft] = useState<number | null>(null);
  useEffect(() => {
    const tick = () => {
      const now = new Date();
      const end = new Date(now.getFullYear(), now.getMonth() + 1, 1);
      setLeft(Math.max(0, end.getTime() - now.getTime()));
    };
    tick();
    const t = setInterval(tick, 1000);
    return () => clearInterval(t);
  }, []);
  if (left === null) return <span className="h-8" />;
  const s = Math.floor(left / 1000);
  const parts = [[Math.floor(s / 86400), "d"], [Math.floor(s / 3600) % 24, "h"], [Math.floor(s / 60) % 60, "m"], [s % 60, "s"]] as const;
  return (
    <span className="flex items-center gap-1 text-sm font-semibold">
      Offers end in
      {parts.map(([v, u]) => <span key={u} className="min-w-9 rounded bg-black/25 px-1.5 py-1 text-center tabular-nums">{String(v).padStart(2, "0")}{u}</span>)}
    </span>
  );
}
