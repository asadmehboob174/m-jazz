import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import { categories, products, waLink } from "@/lib/data";

export const metadata: Metadata = {
  title: "Shop Solar Panels, Inverters, Lithium Batteries & More",
  description: "Buy solar panels, hybrid inverters, lithium batteries, solar packages, UPS, CCTV kits, projectors and interactive boards in Lahore with installation.",
};

const sorts = [
  { id: "latest", label: "Featured" },
  { id: "low", label: "Price: low to high" },
  { id: "high", label: "Price: high to low" },
];

type Q = { c?: string; sort?: string; q?: string };

export default async function ShopPage({ searchParams }: { searchParams: Promise<Q> }) {
  const { c = "All", sort = "latest", q = "" } = await searchParams;
  const term = q.trim().toLowerCase();

  let list = c === "All" ? products : products.filter((p) => p.category === c);
  if (term) list = list.filter((p) => `${p.brand} ${p.name} ${p.category}`.toLowerCase().includes(term));
  if (sort === "low") list = [...list].sort((a, b) => a.price - b.price);
  if (sort === "high") list = [...list].sort((a, b) => b.price - a.price);

  const href = (next: Q) => {
    const p = new URLSearchParams();
    const v = { c, sort, q, ...next };
    if (v.c && v.c !== "All") p.set("c", v.c);
    if (v.sort && v.sort !== "latest") p.set("sort", v.sort);
    if (v.q) p.set("q", v.q);
    const s = p.toString();
    return s ? `/shop?${s}` : "/shop";
  };

  const title = term ? `Results for “${q}”` : c === "All" ? "All products" : c;

  return (
    <section className="container-x py-6">
      <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-sm text-mute">
        <Link href="/" className="hover:text-fg">Home</Link><ChevronRight size={14} />
        <Link href="/shop" className="hover:text-fg">Shop</Link>
        {c !== "All" && <><ChevronRight size={14} /><span className="text-soft">{c}</span></>}
      </nav>

      <div className="mt-5 grid gap-8 lg:grid-cols-[240px_1fr]">
        {/* Sidebar */}
        <aside className="lg:sticky lg:top-[132px] lg:self-start">
          <h2 className="hidden text-sm font-bold uppercase tracking-wide text-mute lg:block">Categories</h2>
          <ul className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 lg:mx-0 lg:mt-3 lg:block lg:space-y-0.5 lg:overflow-visible lg:px-0">
            {categories.map((cat) => {
              const n = cat === "All" ? products.length : products.filter((p) => p.category === cat).length;
              const on = cat === c;
              return (
                <li key={cat} className="shrink-0">
                  <Link href={href({ c: cat, q: "" })}
                    className={`flex items-center justify-between gap-3 whitespace-nowrap rounded-lg border px-3 py-2 text-[15px] lg:border-transparent ${on ? "border-brand bg-stage-blue font-semibold text-brand" : "border-line hover:bg-coal"}`}>
                    {cat === "All" ? "All products" : cat}
                    <span className="text-xs text-mute">{n}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
          <div className="mt-6 hidden rounded-xl bg-stage-amber p-5 lg:block">
            <p className="font-bold">Need help choosing?</p>
            <p className="mt-1 text-sm text-soft">Send your electricity bill and we&apos;ll size the system for free.</p>
            <a href={waLink("Here is my electricity bill — please suggest a solar system.")} target="_blank" rel="noopener" className="btn-sun mt-4 w-full text-sm">Ask on WhatsApp</a>
          </div>
        </aside>

        {/* Results */}
        <div>
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line pb-4">
            <div>
              <h1 className="text-2xl font-bold tracking-tight md:text-3xl">{title}</h1>
              <p className="mt-1 text-sm text-mute">{list.length} products</p>
            </div>
            <div className="flex items-center gap-1 text-sm">
              <span className="mr-1 text-mute">Sort by</span>
              {sorts.map((s) => (
                <Link key={s.id} href={href({ sort: s.id })}
                  className={`rounded-md px-3 py-1.5 ${s.id === sort ? "bg-navy font-semibold text-white" : "text-soft hover:bg-coal"}`}>{s.label}</Link>
              ))}
            </div>
          </div>

          {list.length ? (
            <div className="mt-6 grid grid-cols-2 gap-3 md:gap-5 lg:grid-cols-3 xl:grid-cols-4">
              {list.map((p) => <ProductCard key={p.slug} p={p} />)}
            </div>
          ) : (
            <div className="mt-10 rounded-xl border border-dashed border-line p-10 text-center">
              <p className="font-semibold">No products found.</p>
              <p className="mt-1 text-mute">Try another search, or ask us on WhatsApp. We stock more than is listed here.</p>
              <Link href="/shop" className="btn-ghost mt-5">View all products</Link>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
