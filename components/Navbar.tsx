"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Menu, X, ShoppingBag, Search } from "lucide-react";
import Logo from "./Logo";
import ThemeToggle from "./ThemeToggle";
import { waLink } from "@/lib/data";

const links = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/shop", label: "Shop" },
  { href: "/shop?c=Packages", label: "Packages" },
  { href: "/projects/dha-25kw-hybrid", label: "Projects" },
  { href: "/#contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 24);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-3 pt-3">
      <nav
        aria-label="Main"
        className={`flex w-full max-w-[1140px] items-center justify-between gap-3 rounded-full border py-2 pl-5 pr-2 transition-all duration-500 ${
          scrolled
            ? "border-fg/10 bg-ink/70 shadow-[0_10px_40px_rgba(0,0,0,0.5)] backdrop-blur-xl"
            : "border-fg/[0.06] bg-fg/[0.03] backdrop-blur-md"
        }`}
      >
        <Link href="/" aria-label="M.JAZE home">
          <Logo />
        </Link>

        <ul className="hidden items-center gap-1 lg:flex">
          {links.map((l) => {
            const active = l.href === "/" ? pathname === "/" : pathname.startsWith(l.href.split("?")[0]) && !l.href.includes("?");
            return (
              <li key={l.href} className="relative">
                {active && <motion.span layoutId="nav-active" className="absolute inset-0 rounded-full bg-fg/[0.08]" transition={{ type: "spring", bounce: 0.2, duration: 0.5 }} />}
                <Link href={l.href} className={`relative block whitespace-nowrap rounded-full px-3.5 py-2 text-[15px] transition hover:text-fg ${active ? "text-fg" : "text-soft"}`}>
                  {l.label}
                  {l.label === "Packages" && <span className="ml-1.5 rounded-full bg-sun px-1.5 py-0.5 align-middle text-[10px] font-bold text-black">NEW</span>}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="flex shrink-0 items-center gap-1.5">
          <Link href="/shop" aria-label="Search products" className="hidden h-11 w-11 items-center justify-center rounded-full text-soft hover:bg-fg/5 hover:text-fg sm:flex">
            <Search size={19} />
          </Link>
          <Link href="/shop" aria-label="Cart" className="hidden h-11 w-11 items-center justify-center rounded-full text-soft hover:bg-fg/5 hover:text-fg sm:flex">
            <ShoppingBag size={19} />
          </Link>
          <ThemeToggle />
          <a href={waLink()} target="_blank" rel="noopener" className="hidden h-11 shrink-0 items-center gap-2 whitespace-nowrap rounded-full bg-sun pl-1.5 pr-5 text-[15px] font-semibold text-black transition hover:bg-sun-2 md:flex">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-black/15">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm5.3 14.1c-.2.6-1.3 1.2-1.8 1.2-.5.1-1 .2-3.3-.7-2.8-1.1-4.6-4-4.7-4.2-.1-.2-1.1-1.5-1.1-2.9s.7-2 1-2.3c.3-.3.6-.3.8-.3h.6c.2 0 .4 0 .6.5l.9 2.1c.1.2.1.4 0 .6l-.4.6-.4.5c-.1.2-.3.3-.1.6.2.3.8 1.4 1.8 2.2 1.2 1.1 2.2 1.4 2.5 1.6.3.1.5.1.7-.1l1-1.2c.2-.3.4-.2.7-.1l2 1c.3.1.5.2.5.4.1.1.1.7-.1 1.3Z" /></svg>
            </span>
            Get a quote
          </a>
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen(!open)}
            className="flex h-11 w-11 items-center justify-center rounded-full text-fg hover:bg-fg/5 lg:hidden"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            className="absolute inset-x-3 top-[76px] rounded-2xl border border-fg/10 bg-coal/95 p-3 backdrop-blur-xl lg:hidden"
          >
            {links.map((l) => (
              <Link key={l.href} href={l.href} onClick={() => setOpen(false)} className="block rounded-xl px-4 py-3.5 text-lg hover:bg-fg/5">
                {l.label}
              </Link>
            ))}
            <a href={waLink()} target="_blank" rel="noopener" className="btn-sun mt-2 w-full justify-center">Chat on WhatsApp</a>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
