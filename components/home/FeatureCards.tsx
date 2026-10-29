"use client";

import { BadgeCheck, MessageCircle, Plus, Wrench } from "lucide-react";
import { SectionTitle } from "../Badge";
import { Reveal } from "../Reveal";
import FallingPills from "./FallingPills";

const trio = [
  { t: "One team, start to finish", d: "Survey, design, installation and after-sales by our own engineers — no sub-contractors, no blame game." },
  { t: "Honest sizing", d: "We size from your real bills and roof, not from what's in stock. Sometimes that means a smaller system." },
  { t: "Warranty handled for you", d: "If a panel, inverter or battery fails, we file the claim with the brand and swap it. You make one call." },
];

export default function FeatureCards() {
  return (
    <section className="cv container-x py-24">
      <SectionTitle badge="Why M.JAZE">
        Solar done <span className="em text-sun-gradient">properly</span>, from roof to app.
      </SectionTitle>

      {/* trio */}
      <div className="mt-20 grid gap-10 md:grid-cols-3">
        {trio.map((f, i) => (
          <Reveal key={f.t} delay={i * 0.08}>
            <div className="border-l border-fg/10 pl-7 transition hover:border-sun">
              <h3 className="text-2xl font-semibold tracking-tight md:text-[28px]">{f.t}</h3>
              <p className="mt-4 leading-relaxed text-mute">{f.d}</p>
            </div>
          </Reveal>
        ))}
      </div>

      {/* big cards */}
      <div className="mt-24 grid gap-6 md:grid-cols-2">
        <Reveal>
          <div className="relative h-full min-h-[460px] overflow-hidden rounded-[32px] border border-fg/[0.07] bg-gradient-to-br from-warm-2 via-panel to-panel p-9 md:p-12">
            <h3 className="text-3xl font-semibold tracking-tight md:text-4xl">Book in one message</h3>
            <p className="mt-4 max-w-sm leading-relaxed text-mute">Send your bill on WhatsApp. Get a size, a quote and a survey slot — usually the same day.</p>
            {/* chat mock */}
            <div className="absolute inset-x-8 bottom-0 rounded-t-3xl border border-b-0 border-fg/10 bg-ink/80 p-5 md:inset-x-12">
              <div className="flex items-center gap-3 border-b border-fg/10 pb-4">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-sun text-sm font-bold text-black">M</span>
                <div><p className="text-sm font-semibold">M.JAZE Support</p><p className="text-xs text-ok">online</p></div>
                <MessageCircle size={18} className="ml-auto text-mute" />
              </div>
              <div className="space-y-2.5 pt-4 text-[13px]">
                <p className="ml-auto w-fit max-w-[80%] rounded-2xl rounded-br-sm bg-bubble px-3.5 py-2">Here is my bill — 850 units last month.</p>
                <p className="w-fit max-w-[85%] rounded-2xl rounded-bl-sm bg-fg/[0.07] px-3.5 py-2">A 6 kW hybrid will cover it. Survey tomorrow 11 AM?</p>
                <p className="ml-auto w-fit rounded-2xl rounded-br-sm bg-bubble px-3.5 py-2">Yes please, confirm it.</p>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="relative h-full min-h-[460px] overflow-hidden rounded-[32px] border border-sun/20 bg-gradient-to-br from-warm via-warm-2 to-panel p-9 md:p-12">
            {/* ticket mock */}
            <div className="ml-auto max-w-sm space-y-3">
              {[
                { i: Wrench, t: "Inverter fault — #1042", s: "Technician on the way", c: "text-sun" },
                { i: BadgeCheck, t: "Warranty claim — Panel #7", s: "Approved by LONGi", c: "text-ok" },
              ].map((r) => (
                <div key={r.t} className="flex items-center gap-3 rounded-2xl border border-fg/10 bg-ink/40 p-4">
                  <r.i size={20} className={r.c} />
                  <div className="min-w-0"><p className="truncate text-sm font-medium">{r.t}</p><p className={`text-xs ${r.c}`}>{r.s}</p></div>
                  <Plus size={16} className="ml-auto text-mute" />
                </div>
              ))}
            </div>
            <div className="absolute bottom-10 right-9 max-w-sm text-right md:bottom-12 md:right-12">
              <h3 className="text-3xl font-semibold tracking-tight md:text-4xl">After-sales that answers</h3>
              <p className="mt-4 leading-relaxed text-soft">Track repairs and warranty claims live in the M.JAZE app. Average response: under 24 hours.</p>
            </div>
          </div>
        </Reveal>
      </div>

      {/* drag card */}
      <Reveal className="mt-6">
        <div className="grid overflow-hidden rounded-[32px] border border-fg/[0.07] bg-gradient-to-r from-panel to-warm-2 md:grid-cols-2">
          <div className="flex flex-col justify-center p-9 md:p-14">
            <h3 className="text-3xl font-semibold tracking-tight md:text-4xl">Everything under one roof</h3>
            <p className="mt-4 max-w-md leading-relaxed text-mute">Solar, storage, security, classrooms and event tech. Watch them land — then grab one. Hover to freeze it.</p>
          </div>
          <FallingPills />
        </div>
      </Reveal>
    </section>
  );
}
