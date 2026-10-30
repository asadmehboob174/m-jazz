import Link from "next/link";
import { Check, ShoppingCart } from "lucide-react";
import SectionHead from "../SectionHead";
import { AddToCart } from "../cart/Cart";
import { WaIcon } from "../ProductCard";
import { formatPKR, inCat, waLink } from "@/lib/data";

// Solar packages with real prices from M.JAZE's offers.
export default function Packages() {
  const list = inCat("solar-packages").filter((p) => p.price);
  return (
    <section className="cv relative overflow-hidden bg-coal py-10 md:py-14">
      <div aria-hidden="true" className="dots absolute inset-0" />
      <div aria-hidden="true" className="absolute -left-32 top-10 h-80 w-80 animate-blob rounded-full bg-sun/15 blur-3xl" />
      <div className="container-x relative">
        <SectionHead eyebrow="Supply + installation in one price" title="Solar packages" sub="Complete systems with panels, inverter, structure, wiring and installation." href="/shop/solar-power/solar-packages" />
        <div className="swipe -mx-4 mt-6 flex gap-4 overflow-x-auto px-4 pb-2 pt-4 lg:mx-0 lg:grid lg:grid-cols-4 lg:gap-5 lg:overflow-visible lg:px-0" data-stagger>
          {list.map((p) => {
            const featured = p.badge === "Most popular";
            const size = p.name.match(/^[\d.]+ k(W|VA)/)?.[0] ?? "";
            return (
              <div key={p.slug} className={`group relative flex w-[82%] shrink-0 flex-col rounded-2xl border bg-panel p-5 transition duration-300 hover:-translate-y-1.5 hover:shadow-[0_24px_50px_-24px_rgba(15,23,42,0.4)] sm:w-[48%] lg:w-auto ${featured ? "beam border-brand/40 [--beam-w:2px]" : "border-line"}`}>
                {p.badge && <span className={`absolute -top-3 left-5 rounded-full px-3 py-1 text-xs font-bold ${featured ? "bg-brand text-white" : "bg-sun text-black"}`}>{p.badge}</span>}
                <p className="text-[40px] font-extrabold leading-none tracking-tight text-brand">{size}</p>
                <h3 className="mt-2 font-bold leading-snug"><Link href={`/product/${p.slug}`} className="hover:text-brand">{p.name}</Link></h3>
                <p className="mt-3 text-[26px] font-extrabold tracking-tight">{formatPKR(p.price!)}</p>
                <p className="text-xs text-mute">{p.variants ? `${p.variants[0].label.toLowerCase()} · ${formatPKR(p.variants[1].price)} ${p.variants[1].label.toLowerCase()}` : "installed price"}</p>
                <ul className="mt-4 flex-1 space-y-2 text-[14px] text-soft">
                  {(p.includes ?? []).slice(0, 5).map((f) => (
                    <li key={f} className="flex items-start gap-2"><Check size={16} className="mt-0.5 shrink-0 text-ok" />{f}</li>
                  ))}
                </ul>
                <div className="mt-5 flex gap-2">
                  {p.variants ? (
                    <Link href={`/product/${p.slug}`} className={`${featured ? "btn-primary" : "btn-ghost"} shine min-w-0 flex-1 px-3 text-sm`}>Choose option</Link>
                  ) : (
                    <AddToCart p={p} className={`${featured ? "btn-primary" : "btn-ghost"} shine min-w-0 flex-1 px-3 text-sm`}><ShoppingCart size={16} /> Add to cart</AddToCart>
                  )}
                  <a href={waLink(`I'm interested in the ${p.name} (${formatPKR(p.price!)}).`)} target="_blank" rel="noopener" aria-label="Ask on WhatsApp"
                    className="flex w-11 shrink-0 items-center justify-center rounded-lg bg-[#25D366] text-black transition hover:brightness-105"><WaIcon /></a>
                </div>
              </div>
            );
          })}
        </div>
        <p className="mt-5 text-sm text-mute">Bigger systems (10 kW – 1 MW) for factories, schools and farms are designed after a free site survey. <Link href="/product/commercial-solar" className="font-semibold text-brand hover:underline">Commercial solar →</Link></p>
      </div>
    </section>
  );
}
