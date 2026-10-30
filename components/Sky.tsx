// Animated page background. Several styles are built in; the active one comes from <html data-bg>
// (see .sky rules in globals.css). Each layer lists the styles it belongs to in data-v.
const stars = [
  { top: "4%", left: "34%", dur: "9s", delay: "0.5s" },
  { top: "10%", left: "88%", dur: "12s", delay: "3s" },
  { top: "26%", left: "66%", dur: "14s", delay: "6.5s" },
  { top: "2%", left: "58%", dur: "16s", delay: "9s" },
  { top: "40%", left: "100%", dur: "13s", delay: "2s" },
  { top: "18%", left: "20%", dur: "18s", delay: "11s" },
];

const beams = [
  { left: "10%", dur: "16s", delay: "0s" },
  { left: "30%", dur: "19s", delay: "-6s" },
  { left: "55%", dur: "14s", delay: "-3s" },
  { left: "75%", dur: "21s", delay: "-11s" },
  { left: "90%", dur: "17s", delay: "-8s" },
];

const wave = "M0 160 C240 90 480 90 720 160 S1200 230 1440 160 S1920 90 2160 160 S2640 230 2880 160 V320 H0Z";

export default function Sky() {
  return (
    <div className="sky" aria-hidden="true">
      {/* 1 · Aurora: colour wash at the top, moving grid, drifting light, shooting stars */}
      <div data-v="aurora" className="aurora" />
      <div data-v="aurora spotlight" className="grid-lines" />
      <div data-v="aurora waves" className="orb -left-40 top-1/3 h-[30rem] w-[30rem] bg-brand" />
      <div data-v="aurora waves" className="orb -right-32 top-2/3 h-[26rem] w-[26rem] bg-sun [animation-delay:-13s]" />

      {/* 2 · Mesh: big soft colour blobs */}
      <div data-v="mesh" className="mesh"><i /><i /><i /><i /></div>

      {/* 3 · Beams: slim diagonal light beams over a dot grid */}
      <div data-v="beams clean" className="dots-full" />
      <div data-v="beams" className="beams">
        {beams.map((b, i) => <i key={i} style={{ left: b.left, "--dur": b.dur, "--delay": b.delay } as React.CSSProperties} />)}
      </div>

      {/* 4 · Spotlight: glow that follows the cursor */}
      <div data-v="spotlight" className="spotlight-2" />
      <div data-v="spotlight" className="spotlight" />

      {/* 5 · Waves: soft waves rolling along the bottom */}
      <div data-v="waves" className="waves">
        {[0.10, 0.08, 0.06].map((o, i) => (
          <svg key={i} viewBox="0 0 2880 320" preserveAspectRatio="none"><path d={wave} fill="var(--color-brand)" fillOpacity={o} /></svg>
        ))}
      </div>

      {/* Shared extras */}
      <div data-v="aurora mesh beams" className="twinkle" />
      <div data-v="aurora mesh beams" className="twinkle" />
      {stars.map((s, i) => (
        <span key={i} data-v="aurora mesh" className="shoot" style={{ top: s.top, left: s.left, "--dur": s.dur, "--delay": s.delay } as React.CSSProperties} />
      ))}
    </div>
  );
}
