"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { Clock, LayoutGrid, MapPin, Menu, Phone, Search, ShoppingCart, X } from "lucide-react";
import Logo from "./Logo";
import { company, waLink } from "@/lib/data";

const nav = [
  { label: "Solar Panels", href: "/shop?c=Solar%20Panels" },
  { label: "Inverters", href: "/shop?c=Inverters" },
  { label: "Lithium Batteries", href: "/shop?c=Batteries" },
  { label: "Solar Packages", href: "/shop?c=Packages" },
  { label: "UPS", href: "/shop?c=UPS" },
  { label: "CCTV", href: "/shop?c=CCTV" },
  { label: "Projectors & Boards", href: "/shop?c=Projectors" },
  { label: "Rentals", href: "/shop?c=Rentals" },
  { label: "Services", href: "/services" },
];

function SearchBox({ className = "" }: { className?: string }) {
  const params = useSearchParams();
  return (
    <form action="/shop" role="search" className={`flex h-11 overflow-hidden rounded-lg border border-line bg-coal focus-within:border-brand focus-within:bg-white ${className}`}>
      <label htmlFor="q" className="sr-only">Search products</label>
      <input
        id="q"
        name="q"
        type="search"
        defaultValue={params.get("q") ?? ""}
        placeholder="Search inverters, panels, batteries…"
        className="min-w-0 flex-1 bg-transparent px-4 text-[15px] outline-none placeholder:text-mute"
      />
      <button type="submit" aria-label="Search" className="flex w-12 items-center justify-center bg-brand text-white hover:bg-brand-2">
        <Search size={18} />
      </button>
    </form>
  );
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  useEffect(() => setOpen(false), [pathname]);

  return (
    <>
      {/* Promo bar (scrolls away; the rows below stay pinned) */}
      <div className="bg-navy text-[13px] text-white/85">
        <div className="container-x flex h-9 items-center justify-between gap-4">
          <p className="truncate">
            <span className="font-semibold text-sun-2">Free site survey</span> in Lahore · Easy instalments · Official brand warranty
          </p>
          <div className="hidden items-center gap-5 md:flex">
            <span className="flex items-center gap-1.5"><Clock size={13} /> {company.hours}</span>
            <span className="flex items-center gap-1.5"><MapPin size={13} /> Defence Ghazi Road, Lahore</span>
          </div>
        </div>
      </div>

      <header className="sticky top-0 z-50 bg-white">
      {/* Main row */}
      <div className="border-b border-line">
        <div className="container-x flex h-[68px] items-center gap-4 md:gap-8">
          <button type="button" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} onClick={() => setOpen(!open)}
            className="-ml-2 flex h-10 w-10 items-center justify-center rounded-lg hover:bg-coal lg:hidden">
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
          <Link href="/" aria-label="M.JAZE home" className="shrink-0"><Logo /></Link>

          <Suspense fallback={<div className="hidden h-11 flex-1 md:block" />}>
            <SearchBox className="hidden flex-1 md:flex" />
          </Suspense>

          <div className="ml-auto flex items-center gap-2 md:ml-0">
            <a href={`tel:${company.phone.replace(/\s/g, "")}`} className="hidden items-center gap-2.5 rounded-lg px-2 py-1.5 hover:bg-coal xl:flex">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-stage-blue text-brand"><Phone size={17} /></span>
              <span className="leading-tight">
                <span className="block text-xs text-mute">Call or WhatsApp</span>
                <span className="block text-[15px] font-semibold">{company.phone}</span>
              </span>
            </a>
            <Link href="/shop" aria-label="Cart" className="relative flex h-10 w-10 items-center justify-center rounded-lg hover:bg-coal">
              <ShoppingCart size={21} />
              <span className="absolute right-0.5 top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-sun px-1 text-[10px] font-bold text-black">0</span>
            </Link>
            <a href={waLink("I want a free quote.")} target="_blank" rel="noopener" className="btn-sun hidden whitespace-nowrap sm:inline-flex">
              Get free quote
            </a>
          </div>
        </div>
        <div className="container-x pb-3 md:hidden">
          <Suspense fallback={<div className="h-11" />}><SearchBox /></Suspense>
        </div>
      </div>

      {/* Category row */}
      <nav aria-label="Categories" className="hidden border-b border-line lg:block">
        <div className="container-x flex h-12 items-center gap-1 text-[14px]">
          <Link href="/shop" className="mr-3 flex h-full items-center gap-2 bg-brand px-4 font-semibold text-white hover:bg-brand-2">
            <LayoutGrid size={16} /> All products
          </Link>
          {nav.map((l) => (
            <Link key={l.label} href={l.href} className="whitespace-nowrap rounded-md px-3 py-2 font-medium text-soft hover:bg-coal hover:text-brand">
              {l.label}
            </Link>
          ))}
        </div>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="absolute inset-x-0 top-full max-h-[calc(100vh-120px)] overflow-y-auto border-b border-line bg-white shadow-lg lg:hidden">
          <div className="container-x py-3">
            <Link href="/shop" className="block rounded-lg px-3 py-3 font-semibold text-brand hover:bg-coal">All products</Link>
            {nav.map((l) => (
              <Link key={l.label} href={l.href} className="block rounded-lg px-3 py-3 hover:bg-coal">{l.label}</Link>
            ))}
            <a href={waLink()} target="_blank" rel="noopener" className="btn-sun mt-3 w-full">Chat on WhatsApp</a>
          </div>
        </div>
      )}
    </header>
    </>
  );
}
