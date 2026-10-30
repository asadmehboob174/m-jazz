"use client";

import { useEffect, useState } from "react";
import { Layers, X } from "lucide-react";

export const backgrounds = [
  { id: "aurora", name: "1 · Aurora + stars" },
  { id: "mesh", name: "2 · Colour mesh" },
  { id: "beams", name: "3 · Light beams" },
  { id: "spotlight", name: "4 · Cursor spotlight" },
  { id: "waves", name: "5 · Soft waves" },
  { id: "clean", name: "6 · Clean dots" },
];

// Floating picker for comparing background styles. Only appears after visiting a page with ?bg=…
export default function BgSwitcher() {
  const [show, setShow] = useState(false);
  const [bg, setBg] = useState("aurora");
  useEffect(() => {
    setBg(document.documentElement.dataset.bg || "aurora");
    try { setShow(localStorage.getItem("bgPreview") === "1"); } catch {}
  }, []);
  if (!show) return null;

  const pick = (id: string) => {
    setBg(id);
    document.documentElement.dataset.bg = id;
    try { localStorage.setItem("bg", id); } catch {}
  };
  const close = () => { setShow(false); try { localStorage.removeItem("bgPreview"); } catch {} };

  return (
    <div className="fixed bottom-5 left-5 z-[60] w-56 rounded-2xl border border-line bg-panel/95 p-2 shadow-2xl backdrop-blur">
      <div className="flex items-center justify-between px-2 pb-1.5 pt-1">
        <p className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-mute"><Layers size={14} /> Background</p>
        <button type="button" onClick={close} aria-label="Hide background picker" className="rounded p-1 text-mute hover:bg-coal"><X size={14} /></button>
      </div>
      {backgrounds.map((b) => (
        <button key={b.id} type="button" onClick={() => pick(b.id)}
          className={`block w-full rounded-lg px-3 py-2 text-left text-sm transition ${bg === b.id ? "bg-brand font-semibold text-white" : "hover:bg-coal"}`}>
          {b.name}
        </button>
      ))}
    </div>
  );
}
