import { Star } from "lucide-react";
import { SectionTitle } from "../Badge";
import { testimonials } from "@/lib/data";

function Card({ t }: { t: (typeof testimonials)[number] }) {
  const initials = t.name.split(" ").map((w) => w[0]).slice(0, 2).join("");
  return (
    <figure className="w-[340px] shrink-0 rounded-3xl border border-fg/[0.07] bg-panel/70 p-7 md:w-[420px]">
      <div className="flex gap-0.5 text-sun" aria-label="5 out of 5 stars">
        {Array.from({ length: 5 }, (_, i) => <Star key={i} size={16} fill="currentColor" />)}
      </div>
      <blockquote className="mt-4 leading-relaxed text-soft">“{t.q}”</blockquote>
      <figcaption className="mt-6 flex items-center gap-3">
        <span className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-sun to-sun-3 text-sm font-bold text-black">{initials}</span>
        <span><span className="block font-medium">{t.name}</span><span className="block text-sm text-mute">{t.role}</span></span>
      </figcaption>
    </figure>
  );
}

export default function Testimonials() {
  const a = testimonials.slice(0, 4);
  const b = testimonials.slice(4);
  return (
    <section className="cv relative overflow-hidden py-24">
      <div aria-hidden="true" className="absolute inset-x-0 top-1/3 h-[400px] bg-sun/[0.06] blur-[120px]" />
      <SectionTitle badge="Customer stories" className="container-x relative">
        What Lahore is saying <span className="em text-sun-gradient">about us</span>
      </SectionTitle>
      <div className="relative mt-16 space-y-5 [mask-image:linear-gradient(90deg,transparent,black_8%,black_92%,transparent)]">
        <div className="flex w-max animate-marquee gap-5 hover:[animation-play-state:paused]">
          {[...a, ...a].map((t, i) => <Card key={i} t={t} />)}
        </div>
        <div className="flex w-max animate-marquee-rev gap-5 hover:[animation-play-state:paused]">
          {[...b, ...b].map((t, i) => <Card key={i} t={t} />)}
        </div>
      </div>
    </section>
  );
}
