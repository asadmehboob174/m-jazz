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
      <section className="container-x pb-20 pt-32">
        <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-1.5 text-sm text-mute">
          <Link href="/" className="hover:text-fg">Home</Link><ChevronRight size={14} />
          <Link href="/shop" className="hover:text-fg">Shop</Link><ChevronRight size={14} />
          <Link href={`/shop?c=${encodeURIComponent(p.category)}`} className="hover:text-fg">{p.category}</Link><ChevronRight size={14} />
          <span className="text-soft">{p.name}</span>
        </nav>

        <div className="mt-8 grid gap-10 lg:grid-cols-[1.25fr_1fr]">
          {/* Gallery */}
          <div className="grid gap-3">
            <div className="relative aspect-square overflow-hidden rounded-[32px] border border-fg/[0.07] bg-gradient-to-b from-stage to-stage-end">
              <ProductVisual kind={p.kind} className="h-full w-full" />
              {p.badge && <span className="absolute left-6 top-6 rounded-full bg-fg/10 px-4 py-1.5 text-sm">{p.badge}</span>}
            </div>
            <div className="grid grid-cols-4 gap-3">
              {["from-stage", "from-stage-blue", "from-stage-amber", "from-stage-green"].map((g, i) => (
                <button type="button" key={g} aria-label={`View image ${i + 1}`} className={`aspect-square overflow-hidden rounded-2xl border bg-gradient-to-b ${g} to-stage-end ${i === 0 ? "border-sun" : "border-fg/[0.07]"}`}>
                  <ProductVisual kind={p.kind} className="h-full w-full" />
                </button>
              ))}
            </div>
          </div>

          {/* Info */}
          <div className="lg:sticky lg:top-28 lg:self-start">
            <p className="tag">{p.brand} · {p.category}</p>
            <h1 className="mt-3 text-4xl font-semibold leading-tight tracking-tight md:text-5xl">{p.name}</h1>
            <p className="mt-4 text-lg leading-relaxed text-soft">{p.summary}</p>
            <div className="mt-8"><BuyBox p={p} /></div>
            <div className="mt-6 grid grid-cols-3 gap-3 text-center text-xs text-soft">
              {[[ShieldCheck, "Official warranty"], [Wrench, "Pro installation"], [Truck, "Fast delivery"]].map(([Icon, t]) => {
                const I = Icon as typeof Truck;
                return <div key={t as string} className="rounded-2xl border border-fg/[0.07] p-4"><I size={20} className="mx-auto mb-2 text-sun" />{t as string}</div>;
              })}
            </div>
          </div>
        </div>

        {/* Specs */}
        <div className="mt-24 grid gap-10 md:grid-cols-[1fr_1.6fr]">
          <div>
            <p className="tag">[ Specifications ]</p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight md:text-4xl">Technical details</h2>
          </div>
          <dl className="divide-y divide-fg/10 border-y border-fg/10">
            {p.specs.map(([k, v]) => (
              <div key={k} className="grid grid-cols-2 py-4">
                <dt className="text-mute">{k}</dt>
                <dd className="font-medium">{v}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Related */}
        <div className="mt-28">
          <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">You may also need</h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((r) => <ProductCard key={r.slug} p={r} />)}
          </div>
        </div>
      </section>
    </>
  );
}
