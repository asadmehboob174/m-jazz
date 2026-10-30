import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Check, ChevronRight, ShieldCheck, Truck, Wrench } from "lucide-react";
import ProductVisual from "@/components/ProductVisual";
import ProductCard from "@/components/ProductCard";
import BuyBox from "@/components/BuyBox";
import { catHref, deptHref } from "@/lib/catalog";
import { company, getProduct, inDept, productPlace, products } from "@/lib/data";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const p = getProduct((await params).slug);
  if (!p) return {};
  return {
    title: `${p.name}${p.price ? " Price in Pakistan" : ""}`,
    description: `${p.name} by ${p.brand}. ${p.summary} Buy in Lahore with installation and warranty from ${company.legal}.`,
    alternates: { canonical: `/product/${p.slug}` },
  };
}

export default async function ProductPage({ params }: Props) {
  const p = getProduct((await params).slug);
  if (!p) notFound();
  const { dept, cat } = productPlace(p);
  const related = inDept(dept.slug).filter((x) => x.slug !== p.slug)
    .sort((a, b) => Number(b.cat === p.cat) - Number(a.cat === p.cat)).slice(0, 4);

  // Structured data so Google can show price and availability in search results
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: p.name,
    brand: { "@type": "Brand", name: p.brand },
    description: p.summary,
    category: `${dept.name} > ${cat.name}`,
    ...(p.price && { offers: { "@type": "Offer", priceCurrency: "PKR", price: p.price, availability: "https://schema.org/InStock", seller: { "@type": "Organization", name: company.legal } } }),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <section className="container-x pb-12 pt-6" style={{ "--tone": dept.color } as React.CSSProperties}>
        <nav aria-label="Breadcrumb" className="flex min-w-0 items-center gap-1.5 overflow-hidden whitespace-nowrap text-sm text-mute">
          <Link href="/" className="hover:text-fg">Home</Link><ChevronRight size={14} className="shrink-0" />
          <Link href={deptHref(dept)} className="hover:text-fg">{dept.name}</Link><ChevronRight size={14} className="shrink-0" />
          <Link href={catHref(dept, cat)} className="hover:text-fg">{cat.name}</Link><ChevronRight size={14} className="shrink-0 max-sm:hidden" />
          <span className="truncate text-soft max-sm:hidden">{p.name}</span>
        </nav>

        <div className="mt-4 grid grid-cols-1 gap-6 md:mt-5 md:gap-8 lg:grid-cols-[1.1fr_1fr] lg:gap-12">
          {/* Picture */}
          <div className="min-w-0" data-reveal="zoom">
            <div className="spot relative aspect-square overflow-hidden rounded-2xl border border-line bg-coal">
              <div aria-hidden="true" className="absolute -left-10 -top-10 h-52 w-52 animate-blob rounded-full bg-[var(--tone)] opacity-10 blur-3xl" />
              <ProductVisual kind={p.kind} className="h-full w-full animate-float" />
              {p.badge && <span className="absolute left-4 top-4 rounded-md bg-navy px-2.5 py-1 text-xs font-semibold text-white">{p.badge}</span>}
            </div>
            <p className="mt-2 text-center text-xs text-mute">Illustration. Real product photos coming soon.</p>
          </div>

          {/* Info */}
          <div className="min-w-0 lg:sticky lg:top-[136px] lg:self-start" data-reveal="right">
            <Link href={catHref(dept, cat)} className="text-sm font-semibold text-[var(--tone)] hover:underline">{p.brand} · {cat.name}</Link>
            <h1 className="mt-2 text-[26px] font-bold leading-tight tracking-tight md:text-[36px]">{p.name}</h1>
            <p className="mt-3 leading-relaxed text-soft">{p.summary}</p>
            <div className="mt-6"><BuyBox p={p} /></div>
            <div className="mt-4 grid grid-cols-3 gap-2 text-center text-xs font-medium text-soft sm:gap-3">
              {([[ShieldCheck, "Official warranty"], [Wrench, "Pro installation"], [Truck, "Fast delivery"]] as const).map(([I, t]) => (
                <div key={t} className="rounded-lg border border-line p-3"><I size={20} className="mx-auto mb-1.5 text-brand" />{t}</div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10 grid gap-8 md:mt-14 lg:grid-cols-2">
          {p.includes && (
            <div data-reveal>
              <h2 className="text-2xl font-bold tracking-tight">What&apos;s included</h2>
              <ul className="mt-4 grid gap-2.5 sm:grid-cols-2" data-stagger>
                {p.includes.map((it) => (
                  <li key={it} className="flex items-start gap-2.5 rounded-lg bg-coal p-3.5 text-[15px]"><Check size={18} className="mt-0.5 shrink-0 text-ok" />{it}</li>
                ))}
              </ul>
            </div>
          )}
          <div data-reveal>
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
        </div>

        {related.length > 0 && (
          <div className="mt-12 md:mt-16">
            <h2 className="text-[22px] font-bold tracking-tight md:text-2xl">More from {dept.name}</h2>
            <div className="mt-5 grid grid-cols-2 gap-3 md:gap-5 lg:grid-cols-4" data-stagger>
              {related.map((r) => <ProductCard key={r.slug} p={r} />)}
            </div>
          </div>
        )}
      </section>
    </>
  );
}
