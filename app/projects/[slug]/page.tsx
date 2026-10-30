import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Check, ChevronRight, Star } from "lucide-react";
import ProductVisual from "@/components/ProductVisual";
import { projects, testimonials, waLink } from "@/lib/data";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const pr = projects.find((p) => p.slug === slug);
  return pr ? { title: `${pr.title} — Project`, description: pr.summary } : {};
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const pr = projects.find((p) => p.slug === slug);
  if (!pr) notFound();
  const others = projects.filter((p) => p.slug !== pr.slug).slice(0, 3);
  const quote = testimonials[projects.indexOf(pr) % testimonials.length];

  return (
    <>
      <section className="container-x pt-6">
        <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 overflow-hidden whitespace-nowrap text-sm text-mute">
          <Link href="/" className="hover:text-fg">Home</Link><ChevronRight size={14} />
          <Link href="/projects" className="hover:text-fg">Projects</Link><ChevronRight size={14} />
          <span className="text-soft">{pr.title}</span>
        </nav>

        <div className="mt-5 grid grid-cols-1 gap-6 lg:grid-cols-[1.4fr_1fr] lg:gap-8">
          <div className="relative aspect-[16/10] overflow-hidden rounded-xl border border-line bg-stage-blue">
            <ProductVisual kind={pr.kind} className="h-full w-full" />
            <span className="absolute bottom-4 left-4 rounded bg-panel/90 px-3 py-1.5 text-xs text-soft">[Replace with photo of the installation]</span>
          </div>
          <div>
            <p className="text-sm font-semibold text-brand">{pr.area}</p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl">{pr.title}</h1>
            <p className="mt-3 text-lg leading-relaxed text-soft">{pr.summary}</p>
            <dl className="mt-6 grid grid-cols-2 gap-3">
              {pr.meta.map(([k, v]) => (
                <div key={k} className="rounded-lg border border-line p-3.5">
                  <dt className="text-xs text-mute">{k}</dt>
                  <dd className="mt-0.5 font-semibold">{v}</dd>
                </div>
              ))}
            </dl>
            <a href={waLink("I want a system like your project.")} target="_blank" rel="noopener" className="btn-sun mt-6 w-full">Get a similar system</a>
          </div>
        </div>
      </section>

      <section className="container-x grid grid-cols-1 gap-8 py-10 md:py-12 lg:grid-cols-[1.4fr_1fr]">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">What we did</h2>
          <p className="mt-3 leading-relaxed text-soft">We studied 12 months of bills and the roof layout, then designed a {pr.meta[2][1]} system sized to the real daytime load, with room to add more panels later. Our own team handled structure, wiring, commissioning and app setup.</p>
          <ul className="mt-5 grid gap-3 sm:grid-cols-2">
            {["Site survey & load analysis", "Custom structure design", "Hybrid inverter + lithium storage", "App monitoring & after-sales"].map((f) => (
              <li key={f} className="flex items-center gap-2.5 rounded-lg bg-coal p-3.5 text-[15px]"><Check size={18} className="shrink-0 text-ok" />{f}</li>
            ))}
          </ul>
          <h2 className="mt-10 text-2xl font-bold tracking-tight">Results</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            {pr.outcome.map(([v, l]) => (
              <div key={l} className="rounded-xl border border-line p-5">
                <p className="text-3xl font-bold text-brand">{v}</p>
                <p className="mt-1 text-sm text-mute">{l}</p>
              </div>
            ))}
          </div>
        </div>
        <figure className="self-start rounded-xl bg-stage-amber p-6">
          <span className="flex">{Array.from({ length: 5 }, (_, i) => <Star key={i} size={16} className="fill-sun text-sun" />)}</span>
          <blockquote className="mt-3 text-lg leading-relaxed">“{quote.q}”</blockquote>
          <figcaption className="mt-4 text-sm"><span className="font-semibold">{quote.name}</span> · <span className="text-mute">{quote.role}</span></figcaption>
        </figure>
      </section>

      <section className="cv container-x pb-12">
        <h2 className="text-2xl font-bold tracking-tight">More projects</h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-2 md:gap-5 lg:grid-cols-3">
          {others.map((o) => (
            <Link key={o.slug} href={`/projects/${o.slug}`} className="group overflow-hidden rounded-xl border border-line transition hover:border-brand">
              <div className="aspect-[16/10] bg-stage-blue">
                <ProductVisual kind={o.kind} className="h-full w-full" />
              </div>
              <div className="p-4">
                <h3 className="font-bold group-hover:text-brand">{o.title}</h3>
                <p className="text-sm text-mute">{o.area}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
