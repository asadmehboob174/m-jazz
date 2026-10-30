"use client";

import { useEffect, useRef, useState } from "react";
import { Check, Moon, Palette, Sun } from "lucide-react";

// Keep ids in sync with the [data-color] blocks in globals.css.
export const themes = [
  { id: "blue", name: "Classic Blue", c: "#1747b3", c2: "#f7931e" },
  { id: "royal", name: "Royal Blue", c: "#2563eb", c2: "#f7931e" },
  { id: "azure", name: "Azure", c: "#0284c7", c2: "#f7931e" },
  { id: "electric", name: "Electric Blue", c: "#3d5afe", c2: "#f7931e" },
  { id: "midnight", name: "Midnight Blue", c: "#1e3a8a", c2: "#f7931e" },
  { id: "cerulean", name: "Cerulean", c: "#0a66c2", c2: "#f7931e" },
  { id: "teal", name: "Ocean Teal", c: "#0f766e", c2: "#f59e0b" },
  { id: "green", name: "Eco Green", c: "#15803d", c2: "#f59e0b" },
  { id: "indigo", name: "Royal Indigo", c: "#4f46e5", c2: "#f59e0b" },
  { id: "sunset", name: "Sunset", c: "#c2410c", c2: "#fbbf24" },
  { id: "graphite", name: "Graphite", c: "#334155", c2: "#f59e0b" },
];

function useTheme() {
  const [theme, setTheme] = useState("blue");
  useEffect(() => {
    const saved = document.documentElement.dataset.color;
    if (saved && themes.some((t) => t.id === saved)) setTheme(saved);
  }, []);
  const pick = (id: string) => {
    setTheme(id);
    if (id === "blue") delete document.documentElement.dataset.color;
    else document.documentElement.dataset.color = id;
    try { localStorage.setItem("color", id); } catch {}
  };
  return [theme, pick] as const;
}

function Swatches({ theme, pick, labels = false }: { theme: string; pick: (id: string) => void; labels?: boolean }) {
  return (
    <div role="radiogroup" aria-label="Colour theme" className={labels ? "grid gap-1" : "flex flex-wrap gap-2"}>
      {themes.map((t) => {
        const on = t.id === theme;
        return (
          <button key={t.id} type="button" role="radio" aria-checked={on} aria-label={t.name} title={t.name} onClick={() => pick(t.id)}
            className={labels ? `flex items-center gap-3 rounded-lg px-2.5 py-2 text-left text-sm ${on ? "bg-coal font-semibold" : "hover:bg-coal"}` : ""}>
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full ring-2 ring-offset-2 transition"
              style={{ background: `linear-gradient(135deg, ${t.c} 0 58%, ${t.c2} 58% 100%)`, ["--tw-ring-color" as string]: on ? t.c : "transparent" }}>
              {on && <Check size={14} strokeWidth={3} className="text-white" />}
            </span>
            {labels && t.name}
          </button>
        );
      })}
    </div>
  );
}

// Header button with a dropdown (desktop)
export default function ThemePicker() {
  const [theme, pick] = useTheme();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const close = (e: MouseEvent | KeyboardEvent) => {
      if (e instanceof KeyboardEvent ? e.key === "Escape" : !ref.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", close);
    document.addEventListener("keydown", close);
    return () => { document.removeEventListener("mousedown", close); document.removeEventListener("keydown", close); };
  }, [open]);

  return (
    <div ref={ref} className="relative">
      <button type="button" aria-label="Change colour theme" aria-expanded={open} onClick={() => setOpen(!open)}
        className="flex h-10 items-center gap-2 rounded-lg px-2.5 text-sm font-medium text-soft hover:bg-coal">
        <Palette size={19} className="text-brand" /><span className="hidden xl:inline">Theme</span>
      </button>
      {open && (
        <div className="absolute right-0 top-12 z-50 w-56 rounded-xl border border-line bg-panel p-2 shadow-[0_16px_40px_-12px_rgba(15,23,42,0.3)]">
          <p className="px-2.5 pb-1.5 pt-1 text-xs font-semibold uppercase tracking-wide text-mute">Colour theme</p>
          <Swatches theme={theme} pick={(id) => { pick(id); setOpen(false); }} labels />
        </div>
      )}
    </div>
  );
}

// Light / dark switch. The boot script in layout.tsx applies the saved (or system) mode before paint.
export function ModeToggle({ className = "" }: { className?: string }) {
  const [dark, setDark] = useState(false);
  useEffect(() => setDark(document.documentElement.dataset.mode === "dark"), []);
  const flip = () => {
    const next = !dark;
    setDark(next);
    if (next) document.documentElement.dataset.mode = "dark";
    else delete document.documentElement.dataset.mode;
    try { localStorage.setItem("mode", next ? "dark" : "light"); } catch {}
  };
  return (
    <button type="button" onClick={flip} aria-label={dark ? "Switch to light mode" : "Switch to dark mode"} aria-pressed={dark}
      className={`relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-lg text-soft hover:bg-coal ${className}`}>
      <Sun size={19} className={`absolute text-sun transition duration-500 ${dark ? "rotate-0 scale-100 opacity-100" : "-rotate-90 scale-0 opacity-0"}`} />
      <Moon size={19} className={`absolute text-brand transition duration-500 ${dark ? "rotate-90 scale-0 opacity-0" : "rotate-0 scale-100 opacity-100"}`} />
    </button>
  );
}

// Inline swatches (mobile menu)
export function ThemeSwatches() {
  const [theme, pick] = useTheme();
  return <Swatches theme={theme} pick={pick} />;
}
