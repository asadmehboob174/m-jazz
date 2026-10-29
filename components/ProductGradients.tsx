// Shared gradients for every <ProductVisual />. Defined once at the top of the page so they
// still resolve when the section that would otherwise hold the first copy is skipped off-screen.
export default function ProductGradients() {
  return (
    <svg width="0" height="0" aria-hidden="true" focusable="false" style={{ position: "absolute" }}>
      <defs>
        <linearGradient id="pv-body" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="1" stopColor="#c9ced9" />
        </linearGradient>
        <linearGradient id="pv-dark" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0" stopColor="#2a2f3b" />
          <stop offset="1" stopColor="#0b0d12" />
        </linearGradient>
        <linearGradient id="pv-cell" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0" stopColor="#3b63d6" />
          <stop offset="0.55" stopColor="#14275e" />
          <stop offset="1" stopColor="#2c4fb0" />
        </linearGradient>
      </defs>
    </svg>
  );
}
