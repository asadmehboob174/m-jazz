"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ChevronDown, LayoutGrid, Menu, Phone, Search, X } from "lucide-react";
import Logo from "../Logo";
import DeptIcon from "../DeptIcon";
import { MegaPanel } from "../Navbar";
import { CartButton } from "../cart/Cart";
import { catHref, departments, deptHref } from "@/lib/catalog";
import { company, waLink } from "@/lib/data";

export const links = [
  { label: "Solar Packages", href: "/shop/solar-power/solar-packages" },
  { label: "Security", href: "/shop/security" },
  { label: "IT & Classroom", href: "/shop/it-solutions" },
  { label: "Rentals", href: "/shop/rentals" },
  { label: "Services", href: "/services" },
  { label: "Projects", href: "/projects" },
];

// Shared header for the design previews. Keeps the full shop mega menu, search, cart and mobile menu.
export function VHeader({ tone = "light", search = false, call = false, className = "" }: { tone?: "light" | "dark" | "brand"; search?: boolean; call?: boolean; className?: string }) {
  const [mega, setMega] = useState(false);
  const [open, setOpen] = useState(false);
  const t = useRef<ReturnType<typeof setTimeout>>(undefined);
  const path = usePathname();
  useEffect(() => { setMega(false); setOpen(false); }, [path]);
  const enter = () => { clearTimeout(t.current); setMega(true); };
  const leave = () => { t.current = setTimeout(() => setMega(false), 160); };
  const ink = tone === "light" ? "text-fg" : "text-white";
  const sub = tone === "light" ? "text-soft hover:text-brand" : "text-white/75 hover:text-white";

  return (
    <header className={`relative z-50 ${className}`} onMouseLeave={leave}>
      <div className={`mx-auto flex h-[72px] max-w-[1320px] items-center gap-4 px-4 ${ink}`}>
        <button type="button" aria-label="Open menu" onClick={() => setOpen(true)} className="-ml-2 flex h-10 w-10 items-center justify-center rounded-lg lg:hidden"><Menu size={23} /></button>
        <Link href="/" aria-label="Home" className="shrink-0"><Logo invert={tone !== "light"} /></Link>
        <nav className="ml-4 hidden items-center gap-1 text-[14.5px] font-semibold lg:flex">
          <button type="button" onMouseEnter={enter} onClick={() => setMega(!mega)} aria-expanded={mega}
            className={`flex items-center gap-1.5 rounded-full px-3.5 py-2 transition ${tone === "light" ? "bg-coal hover:bg-stage-blue" : "bg-white/10 hover:bg-white/20"}`}>
            <LayoutGrid size={16} /> Shop <ChevronDown size={14} className={`transition ${mega ? "rotate-180" : ""}`} />
          </button>
          {links.slice(0, search ? 3 : 6).map((l, i) => <Link key={l.label} href={l.href} className={`rounded-full px-3 py-2 transition ${sub} ${i > 2 ? "hidden xl:block" : ""}`}>{l.label}</Link>)}
        </nav>
        {search && (
          <form action="/shop" className="ml-auto hidden max-w-md flex-1 items-center overflow-hidden rounded-full bg-white pl-4 xl:flex">
            <Search size={17} className="text-mute" />
            <input name="q" placeholder="Search solar, CCTV, UPS…" className="min-w-0 flex-1 bg-transparent px-3 py-2.5 text-sm text-fg outline-none" />
            <button className="m-1 rounded-full bg-sun px-4 py-1.5 text-sm font-semibold text-black">Search</button>
          </form>
        )}
        <div className={`flex items-center gap-1 ${search ? "ml-2" : "ml-auto"}`}>
          {call ? (
            <a href={`tel:${company.phoneIntl}`} className="mr-2 hidden items-center gap-3 xl:flex">
              <span className="relative flex h-12 w-12 items-center justify-center rounded-full bg-brand text-white"><span className="absolute inset-0 animate-ping rounded-full bg-brand opacity-30" /><Phone size={20} className="relative" /></span>
              <span className="leading-tight"><span className="block text-sm opacity-75">Make a call</span><span className="block text-lg font-bold">{company.phone}</span></span>
            </a>
          ) : (
            <a href={`tel:${company.phoneIntl}`} aria-label="Call" className={`hidden h-10 w-10 items-center justify-center rounded-full xl:flex ${tone === "light" ? "hover:bg-coal" : "hover:bg-white/10"}`}><Phone size={19} /></a>
          )}
          <div className={`rounded-full ${tone === "brand" ? "bg-white text-[#0f172a]" : ""}`}><CartButton /></div>
          {!call && <a href={waLink("I want a free quote.")} target="_blank" rel="noopener" className="shine ml-1 hidden rounded-full bg-sun px-5 py-2.5 text-sm font-bold text-black sm:block">Free quote</a>}
        </div>
      </div>

      <div onMouseEnter={enter}
        className={`absolute inset-x-0 top-full hidden origin-top border-y border-line bg-panel text-fg shadow-2xl transition duration-300 lg:block ${mega ? "visible scale-y-100 opacity-100" : "invisible scale-y-95 opacity-0"}`}>
        {mega && <MegaPanel onNavigate={() => setMega(false)} />}
      </div>

      {/* Mobile drawer */}
      <div className={`fixed inset-0 z-[85] overflow-hidden lg:hidden ${open ? "" : "pointer-events-none"}`}>
        <div onClick={() => setOpen(false)} className={`absolute inset-0 bg-black/50 transition ${open ? "opacity-100" : "opacity-0"}`} />
        <aside inert={!open} className={`absolute inset-y-0 left-0 flex w-[86%] max-w-sm flex-col bg-panel text-fg shadow-2xl transition-transform duration-500 ${open ? "" : "-translate-x-full"}`}>
          <div className="flex items-center justify-between border-b border-line p-3"><Logo compact /><button type="button" aria-label="Close" onClick={() => setOpen(false)} className="p-2"><X size={22} /></button></div>
          <div className="flex-1 overflow-y-auto p-3">
            {departments.map((d) => (
              <details key={d.slug} className="group [&_summary::-webkit-details-marker]:hidden">
                <summary className="flex cursor-pointer list-none items-center gap-3 rounded-lg px-2 py-2.5 font-semibold">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg text-white" style={{ background: d.color }}><DeptIcon icon={d.icon} size={16} /></span>{d.name}
                  <ChevronDown size={18} className="ml-auto transition group-open:rotate-180" />
                </summary>
                <ul className="mb-2 ml-6 border-l-2 border-line pl-3 text-[15px]">
                  <li><Link href={deptHref(d)} className="block py-2 font-semibold">View all</Link></li>
                  {d.categories.map((c) => <li key={c.slug}><Link href={catHref(d, c)} className="block py-2 text-soft">{c.name}</Link></li>)}
                </ul>
              </details>
            ))}
            <div className="my-2 border-t border-line" />
            {links.map((l) => <Link key={l.label} href={l.href} className="block rounded-lg px-2 py-2.5">{l.label}</Link>)}
          </div>
        </aside>
      </div>
    </header>
  );
}

const designs = ["Spotlight", "Lamp (white)", "Store", "Aurora", "Scroll", "Next style"];

// Floating bar to jump between the previews.
export function VSwitch({ current }: { current: number }) {
  return (
    <nav aria-label="Design previews" className="fixed bottom-4 left-1/2 z-[70] flex max-w-[calc(100vw-1.5rem)] -translate-x-1/2 items-center gap-1 overflow-x-auto rounded-full border border-white/15 bg-black/85 p-1 text-[13px] text-white shadow-2xl backdrop-blur">
      {designs.map((name, i) => (
        <Link key={name} href={`/v/${i + 1}`} className={`shrink-0 rounded-full px-3 py-1.5 font-semibold ${i + 1 === current ? "bg-white text-black" : "hover:bg-white/15"}`}>
          {i + 1}<span className="hidden md:inline"> · {name}</span>
        </Link>
      ))}
      <Link href="/" className="shrink-0 rounded-full px-3 py-1.5 text-white/60 hover:bg-white/15">Current</Link>
    </nav>
  );
}

// Counts down to month end, when offers change.
export function Countdown() {
  const [left, setLeft] = useState<number | null>(null);
  useEffect(() => {
    const tick = () => { const n = new Date(); setLeft(new Date(n.getFullYear(), n.getMonth() + 1, 1).getTime() - n.getTime()); };
    tick();
    const i = setInterval(tick, 1000);
    return () => clearInterval(i);
  }, []);
  if (left === null) return <span className="h-8" />;
  const s = Math.floor(left / 1000);
  const parts = [[Math.floor(s / 86400), "d"], [Math.floor(s / 3600) % 24, "h"], [Math.floor(s / 60) % 60, "m"], [s % 60, "s"]] as const;
  return (
    <span className="flex items-center gap-1 text-sm font-semibold">
      Ends in {parts.map(([v, u]) => <span key={u} className="min-w-10 rounded-md bg-black/25 px-1.5 py-1 text-center tabular-nums">{String(v).padStart(2, "0")}{u}</span>)}
    </span>
  );
}
