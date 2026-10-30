"use client";

import { useEffect, useState } from "react";

// Cycles through words; each new word's letters blur in one after another.
export default function FlipWords({ words, interval = 2600, className = "" }: { words: string[]; interval?: number; className?: string }) {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((n) => (n + 1) % words.length), interval);
    return () => clearInterval(t);
  }, [words.length, interval]);
  return (
    <span className={`inline-block whitespace-nowrap ${className}`} aria-live="polite">
      <span key={i} className="inline-block">
        {[...words[i]].map((ch, n) => (
          <span key={n} className="inline-block animate-[letter-in_.5s_cubic-bezier(.22,1,.36,1)_both]" style={{ animationDelay: `${n * 28}ms` }}>
            {ch === " " ? " " : ch}
          </span>
        ))}
      </span>
    </span>
  );
}
