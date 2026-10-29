"use client";

import { useEffect, useRef, useState } from "react";
import { flushSync } from "react-dom";
import { Moon, Sun } from "lucide-react";
import { revealFrom, store } from "@/lib/reveal";

type Theme = "dark" | "light";

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("dark");
  const btn = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setTheme(document.documentElement.dataset.theme === "light" ? "light" : "dark");
  }, []);

  const toggle = () => {
    const next: Theme = theme === "dark" ? "light" : "dark";
    revealFrom(btn.current, () => {
      flushSync(() => setTheme(next));
      if (next === "light") document.documentElement.dataset.theme = "light";
      else delete document.documentElement.dataset.theme;
      store("theme", next);
    });
  };

  const light = theme === "light";
  return (
    <button
      ref={btn}
      type="button"
      onClick={toggle}
      aria-label={light ? "Switch to dark theme" : "Switch to light theme"}
      title={light ? "Dark mode" : "Light mode"}
      className="relative flex h-11 w-[76px] shrink-0 items-center justify-between rounded-full border border-fg/10 bg-fg/[0.05] px-3 text-mute transition hover:border-fg/25"
    >
      {/* both icons sit in the track; the sliding knob highlights the active one */}
      <Moon size={15} aria-hidden="true" />
      <Sun size={15} aria-hidden="true" />
      <span
        aria-hidden="true"
        className={`absolute left-1 top-1/2 flex h-[34px] w-[34px] -translate-y-1/2 items-center justify-center rounded-full bg-fg text-ink shadow-md transition-transform duration-300 ease-out ${light ? "translate-x-[32px]" : ""}`}
      >
        {light ? <Sun size={16} /> : <Moon size={16} />}
      </span>
    </button>
  );
}
