import type { Metadata } from "next";
import Link from "next/link";
import { Headphones, ShieldCheck, Truck, Wrench } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import ProductVisual from "@/components/ProductVisual";
import { categories, products, paymentMethods, waLink } from "@/lib/data";

export const metadata: Metadata = {
  title: "Shop Solar Panels, Inverters, Lithium Batteries & More",
  description: "Buy solar panels, hybrid inverters, lithium batteries, solar packages, UPS, CCTV kits, projectors and interactive boards in Lahore with installation.",
};

const sorts = [
  { id: "latest", label: "Latest" },
  { id: "low", label: "Price: low to high" },
  { id: "high", label: "Price: high to low" },
];

export default async function ShopPage({ searchParams }: { searchParams: Promise<{ c?: string; sort?: string }> }) {
  const { c = "All", sort = "latest" } = await searchParams;
  let list = c === "All" ? products : products.filter((p) => p.category === c);
  if (sort === "low") list = [...list].sort((a, b) => a.price - b.price);
  if (sort === "high") list = [...list].sort((a, b) => b.price - a.price);

  const href = (q: { c?: string; sort?: string }) => {
    const p = new URLSearchParams({ c: q.c ?? c, sort: q.sort ?? sort });
    return `/shop?${p.toString()}`;
  };

  return (
    <>
      {/* Header */}
      <section className="relative overflow-hidden pb-12 pt-36">
        <div aria-hidden="true" className="absolute left-1/2 top-[-300px] h-[500px] w-[900px] -translate-x-1/2 rounded-full bg-sun/10 blur-[140px]" />
        <div className="container-x relative">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <h1 className="text-[clamp(56px,9vw,140px)] font-semibold leading-[0.9] tracking-[-0.05em] text-gradient">Store</h1>
            <div className="grid grid-cols-2 gap-x-8 gap-y-3 text-sm text-soft md:grid-cols-4">
              {[[Headphones, "WhatsApp support"], [Wrench, "Installation available"], [ShieldCheck, "Official warranty"], [Truck, "Delivery across Pakistan"]].map(([Icon, t]) => {
                const I = Icon as typeof Truck;
                return <span key={t as string} className="flex items-center gap-2"><I size={17} className="text-sun" />{t as string}</span>;
              })}
            </div>
          </div>

          {/* Promo banner */}
          <div className="relative mt-12 grid overflow-hidden rounded-[32px] border border-fg/[0.08] bg-gradient-to-br from-stage via-stage-end to-stage-end md:grid-cols-2">
            <div className="p-8 md:p-14">
              <p className="tag text-sun">[ Complete systems ]</p>
              <h2 className="mt-4 text-4xl font-semibold tracking-tight md:text-5xl">Solar packages — installed and ready.</h2>
              <p className="mt-4 max-w-md text-mute">Panels, hybrid inverter, lithium battery, structure, cabling and installation in one price.</p>
              <Link href={href({ c: "Packages" })} className="btn-sun mt-8">View packages</Link>
            </div>
            <ProductVisual kind="panel" className="h-72 md:h-auto" />
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="sticky top-[76px] z-30 border-y border-fg/[0.06] bg-ink/80 backdrop-blur-xl">
        <div className="container-x flex flex-wrap items-center justify-between gap-4 py-4">
          <nav aria-label="Categories" className="-mx-1 flex gap-1 overflow-x-auto">
            {categories.map((cat) => (
              <Link key={cat} href={href({ c: cat })}
                className={`whitespace-nowrap rounded-full px-4 py-2.5 text-sm transition ${cat === c ? "bg-fg font-semibold text-ink" : "text-soft hover:bg-fg/5"}`}>
                {cat}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-1 text-sm">
            <span className="mr-2 text-mute">Sort</span>
            {sorts.map((s) => (
              <Link key={s.id} href={href({ sort: s.id })}
                className={`rounded-full px-3 py-2 ${s.id === sort ? "bg-fg/10 text-fg" : "text-mute hover:text-fg"}`}>{s.label}</Link>
            ))}
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="container-x py-14">
        <p className="mb-8 text-sm text-mute">{list.length} products</p>
        <div className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {list.map((p, i) => (
            <div key={p.slug} className="contents">
              <ProductCard p={p} />
              {i === 3 && c === "All" && (
                <div className="flex flex-col justify-between rounded-3xl bg-sun p-8 text-black sm:col-span-2">
                  <p className="font-mono text-xs uppercase tracking-widest">[ Not sure what you need? ]</p>
                  <div>
                    <h3 className="text-3xl font-semibold tracking-tight md:text-4xl">Send us your electricity bill. We&apos;ll size your system for free.</h3>
                    <a href={waLink("Here is my electricity bill — please suggest a solar system.")} target="_blank" rel="noopener" className="mt-6 inline-flex rounded-full bg-black px-6 py-3.5 font-semibold text-fg">Send on WhatsApp</a>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Payments strip */}
      <section className="container-x pb-10">
        <div className="flex flex-wrap items-center justify-between gap-6 rounded-3xl border border-fg/[0.07] p-6 md:p-8">
          <p className="font-medium">Pay the way you like</p>
          <div className="flex flex-wrap gap-2">
            {paymentMethods.map((m) => (
              <span key={m} className="rounded-xl border border-fg/10 bg-fg/[0.03] px-4 py-2 text-sm text-soft">{m}</span>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
