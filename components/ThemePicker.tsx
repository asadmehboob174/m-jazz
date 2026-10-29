"use client";

import { useEffect, useRef, useState } from "react";
import { flushSync } from "react-dom";
import { AnimatePresence, motion } from "motion/react";
import { Check, Palette, X } from "lucide-react";
import { revealFrom, store } from "@/lib/reveal";

// Keep ids in sync with the [data-accent] blocks in globals.css.
export const accents = [
  { id: "amber", name: "Solar Amber", c: "#ff9a2e" },
  { id: "ocean", name: "Ocean Blue", c: "#4f8bff" },
  { id: "emerald", name: "Emerald", c: "#12c98f" },
  { id: "violet", name: "Violet", c: "#9b6bff" },
  { id: "rose", name: "Rose", c: "#ff4d6d" },
  { id: "cyan", name: "Cyan", c: "#22d3ee" },
  { id: "lime", name: "Lime", c: "#a3e635" },
];

export default function ThemePicker() {
  const [open, setOpen] = useState(false);
  const [accent, setAccent] = useState("amber");
  const swatches = useRef<Record<string, HTMLButtonElement | null>>({});

  useEffect(() => {
    setAccent(document.documentElement.dataset.accent ?? "amber");
  }, []);

  const pick = (id: string) => {
    if (id === accent) return;
    revealFrom(swatches.current[id], () => {
      flushSync(() => setAccent(id));
      if (id === "amber") delete document.documentElement.dataset.accent;
      else document.documentElement.dataset.accent = id;
      store("accent", id);
    });
  };

  return (
    <div className="fixed bottom-5 left-5 z-50">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.96 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="absolute bottom-16 left-0 w-64 origin-bottom-left rounded-3xl border border-fg/10 bg-panel/90 p-4 shadow-[0_20px_60px_rgba(0,0,0,0.35)] backdrop-blur-xl"
          >
            <div className="flex items-center justify-between px-1">
              <p className="text-sm font-semibold">Colour theme</p>
              <button type="button" aria-label="Close colour themes" onClick={() => setOpen(false)} className="flex h-8 w-8 items-center justify-center rounded-full text-mute hover:bg-fg/5 hover:text-fg">
                <X size={16} />
              </button>
            </div>
            <ul className="mt-2 space-y-1" role="radiogroup" aria-label="Accent colour">
              {accents.map((a) => {
                const on = a.id === accent;
                return (
                  <li key={a.id}>
                    <button
                      ref={(el) => { swatches.current[a.id] = el; }}
                      type="button"
                      role="radio"
                      aria-checked={on}
                      onClick={() => pick(a.id)}
                      className={`flex w-full items-center gap-3 rounded-2xl px-2.5 py-2 text-left text-[15px] transition ${on ? "bg-fg/[0.07]" : "hover:bg-fg/[0.04]"}`}
                    >
                      <span className="flex h-7 w-7 items-center justify-center rounded-full ring-2 ring-fg/10" style={{ background: a.c }}>
                        {on && <Check size={15} strokeWidth={3} className="text-black" />}
                      </span>
                      {a.name}
                    </button>
                  </li>
                );
              })}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        type="button"
        aria-label="Change colour theme"
        aria-expanded={open}
        onClick={() => setOpen(!open)}
        className="beam flex h-12 items-center gap-2 rounded-full border border-fg/10 bg-panel/90 pl-3 pr-4 text-sm font-semibold shadow-lg backdrop-blur-xl transition hover:border-fg/25"
      >
        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-sun text-black"><Palette size={15} /></span>
        Colours
      </button>
    </div>
  );
}
