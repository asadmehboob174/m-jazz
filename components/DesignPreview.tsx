"use client";

import { useEffect, useState } from "react";
import { ChevronDown, Sparkles, X } from "lucide-react";
import { themes } from "./ThemePicker";

const looks = [
  { id: "classic", name: "1 · Classic", note: "Current design" },
  { id: "modern", name: "2 · Modern", note: "Rounded, pill buttons, springy" },
  { id: "sharp", name: "3 · Corporate", note: "Square, strong lines" },
  { id: "glass", name: "4 · Glass", note: "Frosted cards, glare" },
  { id: "bold", name: "5 · Bold", note: "Big hero, gradient titles" },
  { id: "elegant", name: "6 · Elegant", note: "Serif, calm, premium" },
];
const blues = ["blue", "royal", "azure", "electric", "midnight", "cerulean"];

// Floating picker for comparing design looks and blues. Appears after opening a page with ?look= or ?color=.
export default function DesignPreview() {
  const [show, setShow] = useState(false);
  const [open, setOpen] = useState(true);
  const [look, setLook] = useState("classic");
  const [color, setColor] = useState("blue");

  useEffect(() => {
    const d = document.documentElement;
    setLook(d.dataset.look || "classic");
    setColor(d.dataset.color || "blue");
    try { setShow(localStorage.getItem("designPreview") === "1"); } catch {}
  }, []);
  if (!show) return null;

  const pickLook = (id: string) => {
    setLook(id);
    if (id === "classic") delete document.documentElement.dataset.look; else document.documentElement.dataset.look = id;
    try { localStorage.setItem("look", id); } catch {}
  };
  const pickColor = (id: string) => {
    setColor(id);
    if (id === "blue") delete document.documentElement.dataset.color; else document.documentElement.dataset.color = id;
    try { localStorage.setItem("color", id); } catch {}
  };
  const close = () => { setShow(false); try { localStorage.removeItem("designPreview"); } catch {} };

  return (
    <div className="fixed bottom-5 left-5 z-[60] w-64 rounded-2xl border border-line bg-panel p-2 text-fg shadow-2xl">
      <div className="flex items-center justify-between px-2 pb-1 pt-1">
        <button type="button" onClick={() => setOpen(!open)} className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-mute">
          <Sparkles size={14} /> Design preview <ChevronDown size={14} className={`transition ${open ? "" : "-rotate-90"}`} />
        </button>
        <button type="button" onClick={close} aria-label="Hide design preview" className="rounded p-1 text-mute hover:bg-coal"><X size={14} /></button>
      </div>
      {open && (
        <>
          {looks.map((l) => (
            <button key={l.id} type="button" onClick={() => pickLook(l.id)}
              className={`block w-full rounded-lg px-3 py-1.5 text-left transition ${look === l.id ? "bg-brand text-white" : "hover:bg-coal"}`}>
              <span className="block text-sm font-semibold">{l.name}</span>
              <span className={`block text-xs ${look === l.id ? "text-white/75" : "text-mute"}`}>{l.note}</span>
            </button>
          ))}
          <p className="px-2 pb-1.5 pt-3 text-xs font-bold uppercase tracking-wide text-mute">Blue</p>
          <div className="grid grid-cols-6 gap-1.5 px-2 pb-1">
            {blues.map((id) => {
              const t = themes.find((x) => x.id === id)!;
              return (
                <button key={id} type="button" title={t.name} aria-label={t.name} onClick={() => pickColor(id)}
                  className={`h-8 w-8 rounded-full ring-2 ring-offset-2 ring-offset-[var(--color-panel)] transition hover:scale-110 ${color === id ? "ring-fg" : "ring-transparent"}`}
                  style={{ background: t.c }} />
              );
            })}
          </div>
          <p className="px-2 pb-1 text-xs text-mute">{themes.find((x) => x.id === color)?.name}</p>
        </>
      )}
    </div>
  );
}
