// Quiet animated background: two slow light orbs, occasional shooting stars and (in dark mode) twinkles.
// Pure CSS (see .sky in globals.css), fixed behind the page, ignored by the mouse and screen readers.
const stars = [
  { top: "6%", left: "38%", dur: "13s", delay: "1s" },
  { top: "14%", left: "92%", dur: "17s", delay: "6s" },
  { top: "32%", left: "70%", dur: "19s", delay: "11s" },
  { top: "4%", left: "64%", dur: "23s", delay: "15s" },
  { top: "48%", left: "100%", dur: "21s", delay: "3.5s" },
];

export default function Sky() {
  return (
    <div className="sky" aria-hidden="true">
      <div className="orb -left-40 top-1/4 h-[28rem] w-[28rem] bg-brand" />
      <div className="orb -right-32 top-2/3 h-[24rem] w-[24rem] bg-sun [animation-delay:-13s]" />
      <div className="twinkle" />
      <div className="twinkle" />
      {stars.map((s, i) => (
        <span key={i} className="shoot" style={{ top: s.top, left: s.left, "--dur": s.dur, "--delay": s.delay } as React.CSSProperties} />
      ))}
    </div>
  );
}
