import { SectionTitle } from "../Badge";
import { brands } from "@/lib/data";

const Spark = () => (
  <svg width="30" height="30" viewBox="0 0 24 24" className="fill-sun" aria-hidden="true"><path d="M12 0c.6 6.4 5.6 11.4 12 12-6.4.6-11.4 5.6-12 12-.6-6.4-5.6-11.4-12-12C6.4 11.4 11.4 6.4 12 0Z" /></svg>
);

export default function BrandDome() {
  return (
    <section className="overflow-hidden pt-24">
      <SectionTitle badge="Brands" className="container-x">
        Official brands, <span className="em text-sun-gradient">installed right</span>
      </SectionTitle>

      {/* Hovering anywhere on the dome pauses the orbit */}
      <div className="orbit relative mx-auto mt-16 aspect-[2/1] w-[94%] max-w-[1100px]">
        <div aria-hidden="true" className="absolute bottom-0 left-1/2 aspect-square w-[72%] -translate-x-1/2 translate-y-1/2 rounded-full bg-[radial-gradient(circle_at_50%_30%,var(--color-sun)_0%,var(--color-sun-3)_30%,var(--color-warm)_55%,var(--color-ink)_72%)] shadow-[0_-20px_120px_color-mix(in_oklab,var(--color-sun)_35%,transparent)]" />
        <div className="absolute inset-x-0 bottom-[12%] text-center">
          <p className="text-5xl font-semibold tracking-tight text-black/80 md:text-7xl">{brands.length}+</p>
          <p className="font-medium text-black/70">brands in stock</p>
        </div>

        {/* clip box: only the upper half of the full orbit circle shows */}
        <div className="absolute inset-x-[-4%] bottom-0 top-[-70px] overflow-hidden">
          <div className="absolute bottom-0 left-1/2 aspect-square w-[85%] -translate-x-1/2 translate-y-1/2">
            <div className="orbit-spin absolute inset-0 rounded-full border border-sun/25">
              {brands.map((b, i) => {
                const a = (i / brands.length) * Math.PI * 2;
                return (
                  <span key={b} className="absolute -translate-x-1/2 -translate-y-1/2"
                    style={{ left: `${50 + Math.cos(a) * 50}%`, top: `${50 - Math.sin(a) * 50}%` }}>
                    <span className="orbit-spin-rev flex h-14 w-14 items-center justify-center rounded-full border border-fg/10 bg-panel px-1 text-center text-[9px] font-bold leading-tight shadow-[0_0_0_6px_var(--color-ink)] transition-colors hover:border-sun md:h-[72px] md:w-[72px] md:text-[11px]">
                      {b}
                    </span>
                  </span>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <div className="relative border-y border-fg/[0.06] bg-ink py-8">
        <div className="flex w-max animate-marquee items-center gap-10">
          {[...brands, ...brands].map((b, i) => (
            <span key={i} className="flex items-center gap-10 text-3xl font-semibold tracking-tight md:text-4xl">{b}<Spark /></span>
          ))}
        </div>
      </div>
    </section>
  );
}
