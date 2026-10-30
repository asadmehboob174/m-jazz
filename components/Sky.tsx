// Animated page background: aurora glow, a faint moving grid, drifting light, shooting stars and
// (in dark mode) twinkles. Pure CSS (see .sky in globals.css), fixed behind the page.
const stars = [
  { top: "4%", left: "34%", dur: "9s", delay: "0.5s" },
  { top: "10%", left: "88%", dur: "12s", delay: "3s" },
  { top: "26%", left: "66%", dur: "14s", delay: "6.5s" },
  { top: "2%", left: "58%", dur: "16s", delay: "9s" },
  { top: "40%", left: "100%", dur: "13s", delay: "2s" },
  { top: "18%", left: "20%", dur: "18s", delay: "11s" },
];

export default function Sky() {
  return (
    <div className="sky" aria-hidden="true">
      <div className="aurora" />
      <div className="grid-lines" />
      <div className="orb -left-40 top-1/3 h-[30rem] w-[30rem] bg-brand" />
      <div className="orb -right-32 top-2/3 h-[26rem] w-[26rem] bg-sun [animation-delay:-13s]" />
      <div className="twinkle" />
      <div className="twinkle" />
      {stars.map((s, i) => (
        <span key={i} className="shoot" style={{ top: s.top, left: s.left, "--dur": s.dur, "--delay": s.delay } as React.CSSProperties} />
      ))}
    </div>
  );
}
