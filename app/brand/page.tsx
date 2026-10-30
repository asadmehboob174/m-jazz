import type { Metadata } from "next";
import Logo, { LogoMark } from "@/components/Logo";
import type { LogoVariant } from "@/lib/site";

export const metadata: Metadata = { title: "Logo options", robots: { index: false } };

const options: { v: LogoVariant; name: string; note: string }[] = [
  { v: "badge", name: "A · Badge", note: "Rounded app-style badge. The M is half white, half orange: two colours for two sides of the business (power + technology). Works well as a favicon and on vans." },
  { v: "peak", name: "B · Peak", note: "A modern version of the current logo: a solid M like two mountain peaks with an orange sunrise underneath. Closest to what customers already know." },
  { v: "spark", name: "C · Spark", note: "Deep blue circle with an orange lightning bolt inside the M, for power, energy and electronics. Strong on social media profile pictures." },
];

// Logo options for the owner to pick from. Change `logoVariant` in lib/site.ts to switch the whole site.
export default function BrandPage() {
  return (
    <section className="container-x py-10 md:py-14">
      <h1 className="text-[30px] font-extrabold tracking-tight md:text-[40px]">Choose a new logo</h1>
      <p className="mt-2 max-w-2xl text-soft">Three modern options in the M.JAZE blue and orange. Each is shown on white, on navy and as an app icon. They all follow the site&apos;s colour theme.</p>
      <div className="mt-8 grid gap-5 lg:grid-cols-3" data-stagger>
        {options.map((o) => (
          <article key={o.v} className="overflow-hidden rounded-2xl border border-line">
            <div className="flex h-36 items-center justify-center bg-panel"><Logo variant={o.v} /></div>
            <div className="flex h-36 items-center justify-center bg-navy"><Logo variant={o.v} invert /></div>
            <div className="flex items-center justify-center gap-5 bg-coal py-6">
              <LogoMark variant={o.v} size={64} />
              <LogoMark variant={o.v} size={40} />
              <LogoMark variant={o.v} size={24} />
            </div>
            <div className="p-5">
              <h2 className="text-lg font-bold">{o.name}</h2>
              <p className="mt-1 text-sm leading-relaxed text-mute">{o.note}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
