// Decorative starfield + falling light beams, deterministic so server and client render the same.
const stars = Array.from({ length: 70 }, (_, i) => {
  const r = (n: number) => ((Math.sin(i * 9301 + n * 49297) + 1) / 2) % 1;
  return { x: r(1) * 100, y: r(2) * 100, s: r(3) > 0.85 ? 2 : 1, d: r(4) * 4 };
});

export default function Sky({ beams = true }: { beams?: boolean }) {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      {stars.map((s, i) => (
        <span
          key={i}
          className="absolute animate-twinkle rounded-full bg-fg"
          style={{ left: `${s.x}%`, top: `${s.y}%`, width: s.s, height: s.s, animationDelay: `${s.d}s` }}
        />
      ))}
      {beams &&
        [0, 2.3, 4.6].map((d, i) => (
          <span
            key={i}
            className="absolute h-px w-40 animate-beam bg-gradient-to-r from-transparent via-sun to-transparent"
            style={{ left: `${20 + i * 25}%`, top: `${i * 10}%`, animationDelay: `${d}s` }}
          />
        ))}
    </div>
  );
}
