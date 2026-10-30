import Link from "next/link";
import { departments, deptHref } from "@/lib/catalog";
import { products } from "@/lib/data";

// Shared bits for the five design previews (/v/1 … /v/5).
export const deals = products.filter((p) => p.price && !p.sample);
export const navLinks = [
  { label: "Shop", href: "/shop" },
  ...departments.map((d) => ({ label: d.short, href: deptHref(d) })),
  { label: "Projects", href: "/projects" },
  { label: "Contact", href: "/contact" },
];
export const designs = [
  { n: 1, name: "Dark Tech" },
  { n: 2, name: "Marketplace" },
  { n: 3, name: "Editorial" },
  { n: 4, name: "Poster" },
  { n: 5, name: "Minimal" },
];

// Floating bar to jump between designs while reviewing.
export function VSwitch({ current }: { current: number }) {
  return (
    <nav aria-label="Design previews" className="fixed bottom-4 left-1/2 z-[70] flex max-w-[calc(100vw-1.5rem)] -translate-x-1/2 items-center gap-1 overflow-x-auto rounded-full border border-white/15 bg-black/80 p-1 text-[13px] text-white shadow-2xl backdrop-blur">
      <span className="hidden px-3 font-semibold text-white/60 sm:inline">Design</span>
      {designs.map((d) => (
        <Link key={d.n} href={`/v/${d.n}`} className={`shrink-0 rounded-full px-3 py-1.5 font-semibold transition ${d.n === current ? "bg-white text-black" : "hover:bg-white/15"}`}>
          {d.n}<span className="hidden md:inline"> · {d.name}</span>
        </Link>
      ))}
      <Link href="/" className="shrink-0 rounded-full px-3 py-1.5 text-white/60 hover:bg-white/15">Current</Link>
    </nav>
  );
}
