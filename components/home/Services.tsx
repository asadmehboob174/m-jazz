import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ProductVisual from "../ProductVisual";
import SectionHead from "../SectionHead";
import { WaIcon } from "../ProductCard";
import { getProduct, waLink } from "@/lib/data";

const items = [
  ["ev-wallbox-charger", "EV charger installation", "Wallbox, pedestal and portable chargers for all EV brands."],
  ["solar-panel-washing", "Solar panel washing", "Up to 90% efficiency after wash. Safe, scratch-free cleaning."],
  ["ups-repair", "UPS repair", "All local and imported UPS units, plus battery replacement."],
  ["cctv-dvr-repair", "CCTV & DVR repair", "Dahua DVRs, camera faults, cabling and maintenance."],
  ["projector-repair", "Projector repair", "Lamp change, cleaning and board repair for all brands."],
  ["service-contract", "Service contracts (SLA)", "Scheduled maintenance with priority response."],
] as const;

export default function Services() {
  return (
    <section className="cv container-x py-10 md:py-14">
      <SectionHead eyebrow="Keep your systems running" title="Installation, repair & after-sales" href="/services" more="All services" />
      <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 md:gap-4 lg:grid-cols-3" data-stagger>
        {items.map(([slug, name, text]) => {
          const p = getProduct(slug)!;
          return (
            <div key={slug} className="spot group flex items-center gap-4 rounded-2xl border border-line bg-panel p-4 transition duration-300 hover:-translate-y-0.5 hover:border-brand/40 hover:shadow-lg">
              <ProductVisual kind={p.kind} className="h-20 w-20 shrink-0 rounded-xl bg-coal transition duration-500 group-hover:scale-105 group-hover:bg-stage-blue" />
              <div className="min-w-0 flex-1">
                <h3 className="font-bold"><Link href={`/product/${slug}`} className="hover:text-brand">{name}</Link></h3>
                <p className="mt-0.5 text-sm leading-snug text-mute">{text}</p>
                <a href={waLink(`I want to book: ${name}`)} target="_blank" rel="noopener" className="mt-2 inline-flex items-center gap-1.5 text-sm font-semibold text-[#1fa855] hover:underline">
                  <WaIcon size={15} /> Book on WhatsApp <ArrowRight size={14} className="transition group-hover:translate-x-1" />
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
