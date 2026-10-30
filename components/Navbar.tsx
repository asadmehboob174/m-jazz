"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useRef, useState } from "react";
import { ArrowRight, ChevronDown, ChevronRight, LayoutGrid, Mail, Menu, Phone, Search, X } from "lucide-react";
import Logo from "./Logo";
import ProductVisual from "./ProductVisual";
import DeptIcon from "./DeptIcon";
import ThemePicker, { ModeToggle, ThemeSwatches } from "./ThemePicker";
import { CartButton } from "./cart/Cart";
import { catHref, departments, deptHref } from "@/lib/catalog";
import { company, formatPKR, waLink } from "@/lib/data";
import { menu } from "@/lib/site";

const social = {
  Facebook: "M14 8h3V4h-3a4 4 0 0 0-4 4v2H8v4h2v8h4v-8h3l1-4h-4V8Z",
  Instagram: "M7 3h10a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4Zm5 5a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm5.5-1.5h.01",
};
export const SocialIcon = ({ name, size = 15 }: { name: keyof typeof social; size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" aria-hidden="true"><path d={social[name]} /></svg>
);

function SearchBox({ className = "" }: { className?: string }) {
  const params = useSearchParams();
  return (
    <form action="/shop" role="search" className={`group flex h-11 overflow-hidden rounded-full border-2 border-line bg-coal transition focus-within:border-brand focus-within:bg-panel ${className}`}>
      <Search size={18} className="ml-4 shrink-0 self-center text-mute" />
      <input name="q" type="search" aria-label="Search products and services" defaultValue={params.get("q") ?? ""}
        placeholder="Search solar, CCTV, UPS, smart boards…" className="min-w-0 flex-1 bg-transparent px-3 text-[15px] outline-none placeholder:text-mute" />
      <button type="submit" className="m-1 shrink-0 rounded-full bg-brand px-5 text-sm font-semibold text-white transition hover:bg-brand-2">Search</button>
    </form>
  );
}

// Full shop menu: every department with its categories, plus an offer card.
export function MegaPanel({ onNavigate }: { onNavigate: () => void }) {
  return (
    <div className="container-x grid grid-cols-5 gap-6 py-7 xl:grid-cols-[repeat(5,1fr)_250px]">
      {departments.map((d, n) => (
        <div key={d.slug} style={{ "--tone": d.color, animationDelay: `${n * 50}ms` } as React.CSSProperties} className="min-w-0 animate-[rv-up_.5s_cubic-bezier(.22,1,.36,1)_both]">
          <Link href={deptHref(d)} onClick={onNavigate} className="group flex items-center gap-2.5">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[var(--tone)] text-white transition group-hover:rotate-[-8deg] group-hover:scale-110"><DeptIcon icon={d.icon} size={18} /></span>
            <span className="font-bold leading-tight group-hover:text-[var(--tone)]">{d.name}</span>
          </Link>
          <ul className="mt-3.5 space-y-0.5 border-l-2 border-line pl-3">
            {d.categories.map((c) => (
              <li key={c.slug}>
                <Link href={catHref(d, c)} onClick={onNavigate} className="block rounded py-1.5 text-[14px] text-soft transition hover:translate-x-1 hover:text-[var(--tone)]">{c.name}</Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
      <Link href="/product/cctv-4-camera-package" onClick={onNavigate} className="beam group relative hidden flex-col rounded-xl bg-navy p-5 text-white xl:flex">
        <span className="w-fit rounded bg-sale px-2 py-0.5 text-xs font-bold">Bumper offer</span>
        <span className="mt-2 font-bold leading-snug">4 Full HD CCTV cameras, installed</span>
        <span className="mt-1 text-2xl font-extrabold text-sun-2">{formatPKR(35999)}</span>
        <ProductVisual kind="cctv" className="my-2 h-28 w-full transition duration-500 group-hover:scale-110" />
        <span className="mt-auto inline-flex items-center gap-1 text-sm font-semibold">Order now <ArrowRight size={15} className="transition group-hover:translate-x-1" /></span>
      </Link>
    </div>
  );
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [mega, setMega] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const closeT = useRef<ReturnType<typeof setTimeout>>(undefined);
  const pathname = usePathname();

  useEffect(() => { setOpen(false); setMega(false); }, [pathname]);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 40);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  useEffect(() => {
    if (!mega && !open) return;
    const esc = (e: KeyboardEvent) => { if (e.key === "Escape") { setMega(false); setOpen(false); } };
    document.addEventListener("keydown", esc);
    return () => document.removeEventListener("keydown", esc);
  }, [mega, open]);
  useEffect(() => { document.documentElement.style.overflow = open ? "hidden" : ""; }, [open]);

  const enter = () => { clearTimeout(closeT.current); setMega(true); };
  const leave = () => { closeT.current = setTimeout(() => setMega(false), 160); };
  const isOn = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href.split("#")[0]));

  return (
    <>
      {/* Top bar */}
      <div className="intro-down bg-navy text-[13px] text-white/80">
        <div className="container-x flex h-9 items-center justify-between gap-4">
          <p className="truncate">
            <span className="font-semibold text-sun-2">Authorised Dahua reseller</span>
            <span className="hidden sm:inline"> · {company.years} years in Lahore · Free site survey</span>
          </p>
          <a href={`tel:${company.phoneIntl}`} className="shrink-0 font-semibold text-white md:hidden">{company.phone}</a>
          <div className="hidden items-center gap-5 md:flex">
            <a href={`tel:${company.landlineIntl}`} className="flex items-center gap-1.5 hover:text-white"><Phone size={13} /> {company.landline}</a>
            <a href={`mailto:${company.email}`} className="hidden items-center gap-1.5 hover:text-white lg:flex"><Mail size={13} /> {company.email}</a>
            <span className="flex gap-1">
              <a href={company.socials.facebook} target="_blank" rel="noopener" aria-label="Facebook" className="flex h-7 w-7 items-center justify-center rounded-full hover:bg-white/10 hover:text-white"><SocialIcon name="Facebook" /></a>
              <a href={company.socials.instagram} target="_blank" rel="noopener" aria-label="Instagram" className="flex h-7 w-7 items-center justify-center rounded-full hover:bg-white/10 hover:text-white"><SocialIcon name="Instagram" /></a>
            </span>
          </div>
        </div>
      </div>

      <header style={{ "--d": "80ms" } as React.CSSProperties} className={`intro-down sticky top-0 z-50 bg-panel/95 backdrop-blur transition-shadow ${scrolled ? "shadow-[0_8px_30px_-12px_rgba(15,23,42,0.25)]" : ""}`}>
        {/* Main row */}
        <div className="border-b border-line">
          <div className="container-x flex h-16 items-center gap-3 md:h-[72px] md:gap-6">
            <button type="button" aria-label="Open menu" aria-expanded={open} onClick={() => setOpen(true)}
              className="-ml-2 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg hover:bg-coal lg:hidden">
              <Menu size={23} />
            </button>
            <Link href="/" aria-label="M.JAZE home" className="shrink-0"><Logo /></Link>

            <Suspense fallback={<div className="hidden h-11 flex-1 md:block" />}>
              <SearchBox className="hidden flex-1 md:flex" />
            </Suspense>

            <div className="ml-auto flex shrink-0 items-center gap-1 md:ml-0">
              <a href={`tel:${company.phoneIntl}`} className="hidden items-center gap-2.5 rounded-lg px-2 py-1.5 hover:bg-coal xl:flex">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-stage-blue text-brand"><Phone size={18} /></span>
                <span className="leading-tight">
                  <span className="block text-xs text-mute">Call / WhatsApp</span>
                  <span className="block text-[15px] font-bold">{company.phone}</span>
                </span>
              </a>
              <ModeToggle />
              <div className="hidden sm:block"><ThemePicker /></div>
              <CartButton />
              <a href={waLink("I want a free quote.")} target="_blank" rel="noopener" className="btn-sun shine ml-1 hidden whitespace-nowrap sm:inline-flex">
                Get free quote
              </a>
            </div>
          </div>
          <div className="container-x pb-3 md:hidden">
            <Suspense fallback={<div className="h-11" />}><SearchBox /></Suspense>
          </div>
        </div>

        {/* Menu row */}
        <nav aria-label="Main" className="relative hidden border-b border-line lg:block" onMouseLeave={leave}>
          <div className="container-x flex h-12 items-stretch gap-1 text-[14.5px]">
            <button type="button" aria-expanded={mega} onClick={() => setMega(!mega)} onMouseEnter={enter}
              className="mr-2 flex w-[240px] shrink-0 items-center gap-2.5 bg-brand px-4 font-semibold text-white transition hover:bg-brand-2">
              <LayoutGrid size={17} /> All categories
              <ChevronDown size={16} className={`ml-auto transition ${mega ? "rotate-180" : ""}`} />
            </button>
            {menu.map((m) => (
              <div key={m.label} className={`group relative flex items-stretch ${m.wide ? "hidden xl:flex" : ""}`} onMouseEnter={m.mega ? enter : undefined}>
                <Link href={m.href}
                  className={`relative flex items-center gap-1 whitespace-nowrap px-2.5 font-semibold transition after:absolute after:inset-x-2.5 after:bottom-0 after:h-[3px] after:origin-left after:rounded-full after:bg-sun after:transition-transform after:duration-300 hover:text-brand xl:px-3 ${isOn(m.href) ? "text-brand after:scale-x-100" : "text-soft after:scale-x-0 hover:after:scale-x-100"}`}>
                  {m.label}
                  {(m.mega || m.children) && <ChevronDown size={14} className="transition group-hover:rotate-180" />}
                </Link>
                {m.children && (
                  <div className="invisible absolute right-0 top-full z-50 w-72 translate-y-2 opacity-0 transition duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100">
                    <ul className="mt-px rounded-b-xl border border-line bg-panel p-2 shadow-xl">
                      {m.children.map((c) => (
                        <li key={c.label}><Link href={c.href} className="flex items-center justify-between rounded-lg px-3 py-2.5 text-[14px] text-soft transition hover:bg-coal hover:pl-4 hover:text-brand">{c.label}<ChevronRight size={14} /></Link></li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
            <a href={waLink("I want to book a free site survey.")} target="_blank" rel="noopener" className="ml-auto hidden items-center gap-2 font-semibold text-sun-3 hover:underline 2xl:flex">
              Free site survey <ArrowRight size={15} />
            </a>
          </div>

          <div onMouseEnter={enter}
            className={`absolute inset-x-0 top-full origin-top border-b border-line bg-panel shadow-[0_24px_40px_-20px_rgba(15,23,42,0.3)] transition duration-300 ${mega ? "visible scale-y-100 opacity-100" : "invisible scale-y-95 opacity-0"}`}>
            {mega && <MegaPanel onNavigate={() => setMega(false)} />}
          </div>
        </nav>
      </header>

      {/* Mobile drawer */}
      <div className={`fixed inset-0 z-[85] overflow-hidden lg:hidden ${open ? "" : "pointer-events-none"}`} aria-hidden={!open}>
        <div onClick={() => setOpen(false)} className={`absolute inset-0 bg-navy/50 transition-opacity duration-300 ${open ? "opacity-100" : "opacity-0"}`} />
        <aside inert={!open} data-lenis-prevent aria-label="Menu"
          className={`absolute inset-y-0 left-0 flex w-[88%] max-w-sm flex-col bg-panel shadow-2xl transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] ${open ? "translate-x-0" : "-translate-x-full"}`}>
          <div className="flex items-center justify-between border-b border-line px-4 py-3">
            <Logo compact />
            <button type="button" aria-label="Close menu" onClick={() => setOpen(false)} className="flex h-10 w-10 items-center justify-center rounded-lg hover:bg-coal"><X size={22} /></button>
          </div>
          <div className="flex-1 overflow-y-auto px-3 py-3">
            <p className="px-2 pb-2 text-xs font-semibold uppercase tracking-wide text-mute">Shop by department</p>
            {departments.map((d) => (
              <details key={d.slug} className="group rounded-lg [&_summary::-webkit-details-marker]:hidden" style={{ "--tone": d.color } as React.CSSProperties}>
                <summary className="flex cursor-pointer list-none items-center gap-3 rounded-lg px-2 py-2.5 font-semibold hover:bg-coal">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--tone)] text-white"><DeptIcon icon={d.icon} size={16} /></span>
                  {d.name}
                  <ChevronDown size={18} className="ml-auto text-mute transition group-open:rotate-180" />
                </summary>
                <ul className="mb-2 ml-6 border-l-2 border-line pl-3">
                  <li><Link href={deptHref(d)} className="block py-2 text-[15px] font-semibold text-[var(--tone)]">View all {d.short}</Link></li>
                  {d.categories.map((c) => <li key={c.slug}><Link href={catHref(d, c)} className="block py-2 text-[15px] text-soft">{c.name}</Link></li>)}
                </ul>
              </details>
            ))}
            <div className="my-3 border-t border-line" />
            {menu.filter((m) => !m.mega).map((m) => (
              <Link key={m.label} href={m.href} className={`block rounded-lg px-2 py-2.5 font-medium hover:bg-coal ${isOn(m.href) ? "text-brand" : ""}`}>{m.label}</Link>
            ))}
            <div className="mt-3 border-t border-line px-2 pt-4">
              <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-mute">Colour theme</p>
              <ThemeSwatches />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2 border-t border-line p-3">
            <a href={`tel:${company.phoneIntl}`} className="btn-ghost px-2 text-sm"><Phone size={16} /> Call</a>
            <a href={waLink()} target="_blank" rel="noopener" className="flex items-center justify-center rounded-lg bg-[#25D366] px-2 text-sm font-semibold text-black">WhatsApp</a>
          </div>
        </aside>
      </div>
    </>
  );
}
