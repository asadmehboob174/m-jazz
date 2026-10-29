import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight, ShieldCheck, Wrench, Truck } from "lucide-react";
import ProductVisual from "@/components/ProductVisual";
import ProductCard from "@/components/ProductCard";
import BuyBox from "@/components/BuyBox";
import { products, getProduct, company } from "@/lib/data";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const p = getProduct((await params).slug);
  if (!p) return {};
  return {
    title: `${p.brand} ${p.name} Price in Pakistan`,
    description: `${p.brand} ${p.name} — ${p.summary} Buy in Lahore with installation and warranty from ${company.legal}.`,
    alternates: { canonical: `/shop/${p.slug}` },
  };
}

export default async function ProductPage({ params }: Props) {
  const p = getProduct((await params).slug);
  if (!p) notFound();
  const related = products.filter((x) => x.category === p.category && x.slug !== p.slug).concat(products.filter((x) => x.category !== p.category)).slice(0, 4);

  // Structured data so Google can show price and stock in search results
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: `${p.brand} ${p.name}`,
    brand: { "@type": "Brand", name: p.brand },
    description: p.summary,
    offers: { "@type": "Offer", priceCurrency: "PKR", price: p.price, availability: "https://schema.org/InStock", seller: { "@type": "Organization", name: company.legal } },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <section className="container-x pb-16 pt-6">
        <nav aria-label="Breadcrumb" className="flex min-w-0 items-center gap-1.5 overflow-hidden whitespace-nowrap text-sm text-mute">
          <Link href="/" className="hover:text-fg">Home</Link><ChevronRight size={14} />
          <Link href="/shop" className="hover:text-fg">Shop</Link><ChevronRight size={14} />
          <Link href={`/shop?c=${encodeURIComponent(p.category)}`} className="hover:text-fg">{p.category}</Link><ChevronRight size={14} />
          <span className="truncate text-soft">{p.name}</span>
        </nav>

        <div className="mt-4 grid grid-cols-1 gap-6 md:mt-5 md:gap-8 lg:grid-cols-[1.1fr_1fr] lg:gap-12">
          {/* Gallery */}
          <div className="grid min-w-0 gap-2 sm:gap-3">
            <div className="relative aspect-square overflow-hidden rounded-xl border border-line bg-coal">
              <ProductVisual kind={p.kind} className="h-full w-full" />
              {p.badge && <span className="absolute left-4 top-4 rounded bg-navy px-2.5 py-1 text-xs font-semibold text-white">{p.badge}</span>}
            </div>
            <div className="grid grid-cols-4 gap-2 sm:gap-3">
              {["bg-coal", "bg-stage-blue", "bg-stage-amber", "bg-stage-green"].map((g, i) => (
                <button type="button" key={g} aria-label={`View image ${i + 1}`} className={`aspect-square overflow-hidden rounded-lg border ${g} ${i === 0 ? "border-brand ring-1 ring-brand" : "border-line hover:border-fg/30"}`}>
                  <ProductVisual kind={p.kind} className="h-full w-full" />
                </button>
              ))}
            </div>
          </div>

          {/* Info */}
          <div className="min-w-0 lg:sticky lg:top-[132px] lg:self-start">
            <p className="text-sm font-semibold text-brand">{p.brand} · {p.category}</p>
            <h1 className="mt-2 text-[24px] font-bold leading-tight tracking-tight md:text-[34px]">{p.name}</h1>
            <p className="mt-3 leading-relaxed text-soft">{p.summary}</p>
            <div className="mt-6"><BuyBox p={p} /></div>
            <div className="mt-4 grid grid-cols-3 gap-2 text-center text-xs font-medium text-soft sm:gap-3">
              {[[ShieldCheck, "Official warranty"], [Wrench, "Pro installation"], [Truck, "Fast delivery"]].map(([Icon, t]) => {
                const I = Icon as typeof Truck;
                return <div key={t as string} className="rounded-lg border border-line p-3"><I size={20} className="mx-auto mb-1.5 text-brand" />{t as string}</div>;
              })}
            </div>
          </div>
        </div>

        {/* Specs */}
        <div className="mt-10 max-w-3xl md:mt-14">
          <h2 className="text-2xl font-bold tracking-tight">Specifications</h2>
          <dl className="mt-4 overflow-hidden rounded-xl border border-line">
            {p.specs.map(([k, v], i) => (
              <div key={k} className={`grid grid-cols-2 gap-3 px-4 py-3 text-[15px] sm:px-5 ${i % 2 ? "bg-white" : "bg-coal"}`}>
                <dt className="text-mute">{k}</dt>
                <dd className="font-medium">{v}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Related */}
        <div className="mt-10 md:mt-14">
          <h2 className="text-[22px] font-bold tracking-tight md:text-2xl">You may also need</h2>
          <div className="mt-5 grid grid-cols-2 gap-3 md:gap-5 lg:grid-cols-4">
            {related.map((r) => <ProductCard key={r.slug} p={r} />)}
          </div>
        </div>
      </section>
    </>
  );
}
