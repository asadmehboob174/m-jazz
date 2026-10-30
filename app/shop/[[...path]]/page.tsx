import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight, LayoutGrid } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import ProductVisual from "@/components/ProductVisual";
import DeptIcon from "@/components/DeptIcon";
import { catHref, departments, deptHref, findDept } from "@/lib/catalog";
import { inCat, inDept, products, waLink } from "@/lib/data";

type Props = { params: Promise<{ path?: string[] }>; searchParams: Promise<{ sort?: string; q?: string; brand?: string }> };

function resolve(path: string[] = []) {
  if (path.length > 2) return null;
  const dept = path[0] ? findDept(path[0]) : undefined;
  if (path[0] && !dept) return null;
  const cat = path[1] ? dept?.categories.find((c) => c.slug === path[1]) : undefined;
  if (path[1] && !cat) return null;
  return { dept, cat };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const r = resolve((await params).path);
  if (!r) return {};
  if (r.cat) return { title: `${r.cat.name} Price in Lahore`, description: `Buy ${r.cat.name.toLowerCase()} in Lahore with installation and warranty. ${r.dept!.blurb}` };
  if (r.dept) return { title: r.dept.name, description: r.dept.blurb };
  return { title: "Shop Solar, CCTV, UPS, Smart Boards & More", description: "Shop solar packages, panels, inverters, lithium batteries, UPS, CCTV, attendance, fire alarms, smart boards, projectors, rentals and repair services in Lahore." };
}

const sorts = [
  { id: "featured", label: "Featured" },
  { id: "low", label: "Price: low to high" },
  { id: "high", label: "Price: high to low" },
];

export default async function ShopPage({ params, searchParams }: Props) {
  const { path = [] } = await params;
  const r = resolve(path);
  if (!r) notFound();
  const { dept, cat } = r;
  const { sort = "featured", q = "", brand = "" } = await searchParams;
  const term = q.trim().toLowerCase();

  const scope = cat ? inCat(cat.slug) : dept ? inDept(dept.slug) : products;
  let list = term ? scope.filter((p) => `${p.brand} ${p.name} ${p.cat} ${p.summary}`.toLowerCase().includes(term)) : scope;
  const brandsHere = [...new Set(list.map((p) => p.brand))].sort();
  if (brand) list = list.filter((p) => p.brand === brand);
  const price = (p: (typeof list)[number]) => p.price ?? Infinity;
  if (sort === "low") list = [...list].sort((a, b) => price(a) - price(b));
  if (sort === "high") list = [...list].sort((a, b) => (b.price ?? -1) - (a.price ?? -1));

  const base = cat ? catHref(dept!, cat) : dept ? deptHref(dept) : "/shop";
  const href = (next: { sort?: string; brand?: string }) => {
    const sp = new URLSearchParams();
    const v = { sort, brand, q, ...next };
    if (v.sort && v.sort !== "featured") sp.set("sort", v.sort);
    if (v.brand) sp.set("brand", v.brand);
    if (v.q) sp.set("q", v.q);
    const s = sp.toString();
    return s ? `${base}?${s}` : base;
  };

  const title = term ? `Results for “${q}”` : cat?.name ?? dept?.name ?? "All products";
  const tone = dept?.color ?? "var(--color-brand)";

  return (
    <div style={{ "--tone": tone } as React.CSSProperties}>
      {/* Banner */}
      <section className="relative overflow-hidden border-b border-line bg-[color-mix(in_oklab,var(--tone)_7%,var(--color-panel))]">
        <div aria-hidden="true" className="absolute -right-16 -top-20 h-72 w-72 animate-blob rounded-full bg-[var(--tone)] opacity-15 blur-3xl" />
        <div className="container-x relative grid items-center gap-6 py-6 md:grid-cols-[1fr_220px] md:py-9">
          <div className="min-w-0">
            <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-1.5 text-sm text-mute">
              <Link href="/" className="hover:text-fg">Home</Link><ChevronRight size={14} />
              <Link href="/shop" className="hover:text-fg">Shop</Link>
              {dept && <><ChevronRight size={14} /><Link href={deptHref(dept)} className="hover:text-fg">{dept.name}</Link></>}
              {cat && <><ChevronRight size={14} /><span className="text-soft">{cat.name}</span></>}
            </nav>
            <h1 className="mt-3 flex items-center gap-3 text-[26px] font-bold tracking-tight md:text-[38px]" data-reveal>
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[var(--tone)] text-white md:h-12 md:w-12">
                {dept ? <DeptIcon icon={dept.icon} size={22} /> : <LayoutGrid size={22} />}
              </span>
              {title}
            </h1>
            <p className="mt-2 max-w-2xl text-soft" data-reveal style={{ "--d": "80ms" } as React.CSSProperties}>
              {dept ? dept.blurb : "Solar, security, IT, rentals and repair services. Order online and confirm on WhatsApp."}
            </p>
            {/* Sub-category chips */}
            <div className="swipe -mx-4 mt-4 flex gap-2 overflow-x-auto px-4 py-1 md:mx-0 md:flex-wrap md:overflow-visible md:px-0" data-stagger>
              {(dept ? dept.categories.map((c) => ({ label: c.name, href: catHref(dept, c), on: c.slug === cat?.slug, n: inCat(c.slug).length }))
                : departments.map((d) => ({ label: d.name, href: deptHref(d), on: false, n: inDept(d.slug).length }))).map((c) => (
                <Link key={c.href} href={c.href}
                  className={`shrink-0 whitespace-nowrap rounded-full border px-3.5 py-1.5 text-sm font-medium transition hover:-translate-y-0.5 ${c.on ? "border-[var(--tone)] bg-[var(--tone)] text-white" : "border-line bg-panel hover:border-[var(--tone)] hover:text-[var(--tone)]"}`}>
                  {c.label} <span className={c.on ? "text-white/75" : "text-mute"}>{c.n}</span>
                </Link>
              ))}
            </div>
          </div>
          <ProductVisual kind={cat?.kind ?? dept?.kind ?? "panel"} className="hidden aspect-square animate-float md:flex" />
        </div>
      </section>

      <section className="container-x grid grid-cols-1 gap-6 py-6 lg:grid-cols-[250px_1fr] lg:gap-8 lg:py-8">
        {/* Sidebar */}
        <aside className="hidden min-w-0 lg:sticky lg:top-[136px] lg:block lg:self-start">
          <h2 className="text-xs font-bold uppercase tracking-wide text-mute">Departments</h2>
          <ul className="mt-3 space-y-1">
            {departments.map((d) => {
              const here = d.slug === dept?.slug;
              return (
                <li key={d.slug} style={{ "--tone": d.color } as React.CSSProperties}>
                  <Link href={deptHref(d)} className={`flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-[15px] font-semibold transition ${here && !cat ? "bg-[var(--tone)] text-white" : "hover:bg-coal"}`}>
                    <DeptIcon icon={d.icon} size={17} className={here && !cat ? "" : "text-[var(--tone)]"} />{d.name}
                  </Link>
                  {here && (
                    <ul className="my-1 ml-5 border-l-2 border-line pl-2">
                      {d.categories.map((c) => (
                        <li key={c.slug}>
                          <Link href={catHref(d, c)} className={`block rounded-md px-2 py-1.5 text-sm transition hover:text-[var(--tone)] ${c.slug === cat?.slug ? "font-semibold text-[var(--tone)]" : "text-soft"}`}>{c.name}</Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              );
            })}
          </ul>
          {brandsHere.length > 1 && (
            <>
              <h2 className="mt-6 text-xs font-bold uppercase tracking-wide text-mute">Brand</h2>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {brandsHere.map((b) => (
                  <Link key={b} href={href({ brand: b === brand ? "" : b })}
                    className={`rounded-md border px-2.5 py-1 text-sm transition ${b === brand ? "border-brand bg-brand text-white" : "border-line hover:border-brand hover:text-brand"}`}>{b}</Link>
                ))}
              </div>
            </>
          )}
          <div className="mt-6 rounded-xl bg-navy p-5 text-white">
            <p className="font-bold">Need help choosing?</p>
            <p className="mt-1 text-sm text-white/70">Tell us what you need on WhatsApp and get a free recommendation.</p>
            <a href={waLink("I need help choosing the right product.")} target="_blank" rel="noopener" className="btn-sun shine mt-4 w-full text-sm">Ask on WhatsApp</a>
          </div>
        </aside>

        {/* Results */}
        <div className="min-w-0">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line pb-4">
            <p className="text-sm text-mute"><span className="font-semibold text-fg">{list.length}</span> {list.length === 1 ? "item" : "items"}{brand && <> · {brand} <Link href={href({ brand: "" })} className="text-brand hover:underline">clear</Link></>}</p>
            <div className="swipe -mx-4 flex w-[calc(100%+2rem)] items-center gap-1 overflow-x-auto px-4 text-sm sm:mx-0 sm:w-auto sm:px-0">
              <span className="mr-1 shrink-0 text-mute">Sort by</span>
              {sorts.map((s) => (
                <Link key={s.id} href={href({ sort: s.id })}
                  className={`shrink-0 whitespace-nowrap rounded-full px-3 py-1.5 ${s.id === sort ? "bg-navy font-semibold text-white" : "text-soft hover:bg-coal"}`}>{s.label}</Link>
              ))}
            </div>
          </div>

          {list.length ? (
            <div key={`${base}-${sort}-${brand}-${q}`} className="mt-5 grid grid-cols-2 gap-3 md:mt-6 md:gap-5 lg:grid-cols-3 xl:grid-cols-4" data-stagger>
              {list.map((p) => <ProductCard key={p.slug} p={p} />)}
            </div>
          ) : (
            <div className="mt-10 rounded-xl border border-dashed border-line p-10 text-center">
              <p className="font-semibold">Nothing found.</p>
              <p className="mt-1 text-mute">Try another search, or ask us on WhatsApp. We stock more than is listed here.</p>
              <Link href="/shop" className="btn-ghost mt-5">View all products</Link>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
