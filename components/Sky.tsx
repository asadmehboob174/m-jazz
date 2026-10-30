// Occasional shooting stars across the page background (CSS only, behind everything).
const stars = [
  { top: "6%", left: "36%", dur: "10s", delay: "1s" },
  { top: "12%", left: "90%", dur: "13s", delay: "4s" },
  { top: "30%", left: "68%", dur: "15s", delay: "7.5s" },
  { top: "3%", left: "60%", dur: "17s", delay: "10s" },
  { top: "45%", left: "100%", dur: "14s", delay: "2.5s" },
  { top: "20%", left: "22%", dur: "19s", delay: "12s" },
];

export default function Sky() {
  return (
    <div className="sky" aria-hidden="true">
      {stars.map((s, i) => (
        <span key={i} className="shoot" style={{ top: s.top, left: s.left, "--dur": s.dur, "--delay": s.delay } as React.CSSProperties} />
      ))}
    </div>
  );
}
