import type { Kind } from "@/lib/data";

// Stylised product renders used until real product photography is available.
// Gradients come from <ProductGradients /> in the root layout (one shared copy, always rendered).
export default function ProductVisual({ kind, className = "" }: { kind: Kind; className?: string }) {
  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      {/* soft sun spotlight + floor shadow; colours adapt per theme in globals.css */}
      <div aria-hidden="true" className="pv-glow absolute inset-[4%] rounded-full" />
      <div aria-hidden="true" className="pv-floor absolute bottom-[8%] left-1/2 h-[8%] w-[58%] -translate-x-1/2 rounded-[50%]" />
      <svg viewBox="0 0 200 200" className="pv-shadow relative h-[78%] w-[78%] text-sun" role="img" aria-label={`${kind} illustration`}>
        {kind === "inverter" && (
          <g>
            <rect x="52" y="22" width="96" height="150" rx="14" fill="url(#pv-body)" stroke="rgba(15,23,42,0.12)" strokeWidth="1" />
            <rect x="148" y="30" width="8" height="134" rx="4" fill="#9aa1b0" />
            <circle cx="100" cy="78" r="26" fill="url(#pv-dark)" />
            <circle cx="100" cy="78" r="27" fill="none" stroke="currentColor" strokeOpacity="0.8" strokeWidth="1.5" />
            <rect x="88" y="72" width="24" height="10" rx="2" fill="#4f7dff" opacity="0.8" />
            <rect x="72" y="138" width="56" height="6" rx="3" fill="#dfe3ea" />
            <circle cx="100" cy="122" r="3" fill="#ff5a3c" />
          </g>
        )}
        {kind === "battery" && (
          <g>
            <rect x="58" y="16" width="84" height="164" rx="10" fill="url(#pv-body)" stroke="rgba(15,23,42,0.12)" strokeWidth="1" />
            <rect x="58" y="16" width="84" height="40" rx="10" fill="url(#pv-dark)" />
            <rect x="72" y="30" width="30" height="12" rx="2" fill="#4f7dff" />
            <rect x="110" y="32" width="18" height="4" rx="2" fill="#5eea9a" />
            <path d="M58 70 H142" stroke="#c0c6d2" />
            <text x="100" y="120" textAnchor="middle" fontSize="11" fill="#5b6475" fontFamily="sans-serif" letterSpacing="2">LiFePO4</text>
            <rect x="64" y="176" width="16" height="8" rx="2" fill="#2a2f3b" />
            <rect x="120" y="176" width="16" height="8" rx="2" fill="#2a2f3b" />
          </g>
        )}
        {kind === "panel" && (
          <g transform="translate(100 104) skewY(-8) translate(-100 -104)">
            <rect x="34" y="20" width="132" height="168" rx="4" fill="#cfd5df" />
            <g>
              {Array.from({ length: 24 }, (_, i) => (
                <rect key={i} x={40 + (i % 4) * 31} y={26 + Math.floor(i / 4) * 26.5} width="28" height="24" rx="1.5" fill="url(#pv-cell)" />
              ))}
            </g>
            <path d="M40 26 L160 182" stroke="#fff" strokeOpacity="0.12" strokeWidth="18" />
          </g>
        )}
        {kind === "ups" && (
          <g>
            <rect x="46" y="40" width="108" height="130" rx="10" fill="url(#pv-dark)" />
            <rect x="60" y="56" width="80" height="34" rx="4" fill="#0a0c10" stroke="#2f3644" />
            <text x="100" y="79" textAnchor="middle" fontSize="16" fill="#5eea9a" fontFamily="monospace">230V</text>
            <circle cx="76" cy="112" r="7" fill="currentColor" />
            <circle cx="100" cy="112" r="7" fill="#2f3644" />
            <circle cx="124" cy="112" r="7" fill="#2f3644" />
            <rect x="60" y="134" width="80" height="4" rx="2" fill="#2f3644" />
            <rect x="60" y="144" width="80" height="4" rx="2" fill="#2f3644" />
          </g>
        )}
        {kind === "cctv" && (
          <g>
            <rect x="94" y="40" width="12" height="40" rx="3" fill="#c9ced9" />
            <rect x="70" y="30" width="60" height="14" rx="5" fill="#dfe3ea" />
            <rect x="40" y="80" width="120" height="50" rx="25" fill="url(#pv-body)" stroke="rgba(15,23,42,0.12)" strokeWidth="1" transform="rotate(-12 100 105)" />
            <circle cx="56" cy="114" r="20" fill="url(#pv-dark)" />
            <circle cx="56" cy="114" r="9" fill="#14275e" />
            <circle cx="52" cy="110" r="3" fill="#fff" opacity="0.7" />
            <circle cx="140" cy="88" r="3" fill="#ff5a3c" />
          </g>
        )}
        {kind === "projector" && (
          <g>
            <rect x="30" y="74" width="140" height="64" rx="14" fill="url(#pv-body)" stroke="rgba(15,23,42,0.12)" strokeWidth="1" />
            <circle cx="66" cy="106" r="22" fill="url(#pv-dark)" />
            <circle cx="66" cy="106" r="11" fill="#1d3a8f" />
            <circle cx="62" cy="101" r="3.5" fill="#fff" opacity="0.8" />
            <rect x="104" y="92" width="50" height="4" rx="2" fill="#c0c6d2" />
            <rect x="104" y="102" width="50" height="4" rx="2" fill="#c0c6d2" />
            <rect x="104" y="112" width="50" height="4" rx="2" fill="#c0c6d2" />
            <rect x="44" y="138" width="10" height="8" rx="2" fill="#9aa1b0" />
            <rect x="146" y="138" width="10" height="8" rx="2" fill="#9aa1b0" />
          </g>
        )}
        {kind === "board" && (
          <g>
            <rect x="14" y="40" width="172" height="106" rx="6" fill="url(#pv-dark)" />
            <rect x="20" y="46" width="160" height="94" rx="3" fill="#10204d" />
            <path d="M34 120 Q64 70 94 100 T150 72" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
            <rect x="34" y="58" width="44" height="6" rx="3" fill="#4f7dff" />
            <rect x="94" y="146" width="12" height="30" fill="#2a2f3b" />
            <rect x="70" y="174" width="60" height="6" rx="3" fill="#2a2f3b" />
          </g>
        )}
        {kind === "stand" && (
          <g>
            <path d="M20 150 L100 60 L180 150" fill="none" stroke="#c9ced9" strokeWidth="6" strokeLinejoin="round" />
            <path d="M20 150 H180 M60 150 L100 105 L140 150" fill="none" stroke="#8d95a6" strokeWidth="4" />
            <g transform="translate(100 82) skewX(-30) translate(-100 -82)">
              <rect x="40" y="56" width="130" height="40" rx="3" fill="url(#pv-cell)" />
            </g>
          </g>
        )}
        {kind === "attendance" && (
          <g>
            <rect x="60" y="24" width="80" height="150" rx="14" fill="url(#pv-dark)" />
            <rect x="72" y="40" width="56" height="44" rx="4" fill="#10204d" />
            <circle cx="100" cy="128" r="18" fill="none" stroke="currentColor" strokeWidth="2" />
            <path d="M92 126 a8 8 0 0 1 16 0 v6 M96 124 v10 M104 124 v8" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </g>
        )}
        {kind === "speaker" && (
          <g>
            <rect x="60" y="20" width="80" height="160" rx="10" fill="url(#pv-dark)" />
            <circle cx="100" cy="64" r="18" fill="#0a0c10" stroke="#2f3644" strokeWidth="4" />
            <circle cx="100" cy="128" r="30" fill="#0a0c10" stroke="#2f3644" strokeWidth="5" />
            <circle cx="100" cy="128" r="8" fill="currentColor" />
          </g>
        )}
        {kind === "ev" && (
          <g>
            <rect x="62" y="22" width="76" height="114" rx="16" fill="url(#pv-body)" stroke="rgba(15,23,42,0.12)" strokeWidth="1" />
            <rect x="74" y="38" width="52" height="32" rx="5" fill="url(#pv-dark)" />
            <path d="M103 44 L93 56 H101 L97 65 L108 52 H100 Z" fill="#5eea9a" />
            <rect x="86" y="86" width="28" height="4" rx="2" fill="#5eea9a" />
            <path d="M100 136 C100 162 140 150 150 170" fill="none" stroke="#2a2f3b" strokeWidth="6" strokeLinecap="round" />
            <rect x="140" y="164" width="24" height="18" rx="4" fill="url(#pv-dark)" />
          </g>
        )}
        {kind === "dome" && (
          <g>
            <rect x="50" y="54" width="100" height="14" rx="7" fill="#dfe3ea" />
            <path d="M56 68 A44 44 0 0 0 144 68 Z" fill="url(#pv-body)" stroke="rgba(15,23,42,0.12)" strokeWidth="1" />
            <circle cx="100" cy="92" r="22" fill="url(#pv-dark)" />
            <circle cx="100" cy="92" r="10" fill="#14275e" />
            <circle cx="96" cy="88" r="3" fill="#fff" opacity="0.7" />
            <circle cx="128" cy="76" r="2.5" fill="#ff5a3c" />
          </g>
        )}
        {kind === "fire" && (
          <g>
            <rect x="56" y="28" width="88" height="134" rx="10" fill="#dc2626" />
            <rect x="68" y="42" width="64" height="26" rx="4" fill="#fff" />
            <text x="100" y="60" textAnchor="middle" fontSize="14" fontWeight="700" fill="#dc2626" fontFamily="sans-serif" letterSpacing="2">FIRE</text>
            <circle cx="100" cy="110" r="24" fill="#b91c1c" stroke="#fff" strokeOpacity="0.5" strokeWidth="2" />
            <circle cx="100" cy="110" r="10" fill="#fff" opacity="0.9" />
            <rect x="80" y="144" width="40" height="6" rx="3" fill="#fff" opacity="0.6" />
          </g>
        )}
        {kind === "fence" && (
          <g>
            {[40, 100, 160].map((x) => <rect key={x} x={x - 5} y="36" width="10" height="136" rx="2" fill="#8d95a6" />)}
            {[56, 76, 96, 116, 136, 156].map((y) => <path key={y} d={`M30 ${y} H170`} stroke="#b4bbc8" strokeWidth="2" />)}
            <rect x="74" y="88" width="52" height="40" rx="5" fill="#facc15" stroke="#111" strokeWidth="2" />
            <path d="M104 94 L92 110 H101 L96 122 L110 105 H101 Z" fill="#111" />
          </g>
        )}
        {kind === "computer" && (
          <g>
            <rect x="24" y="36" width="122" height="82" rx="6" fill="url(#pv-dark)" />
            <rect x="30" y="42" width="110" height="70" rx="3" fill="#10204d" />
            <path d="M42 96 L64 74 L82 88 L104 62 L128 78" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
            <rect x="79" y="118" width="12" height="20" fill="#2a2f3b" />
            <rect x="60" y="136" width="50" height="6" rx="3" fill="#2a2f3b" />
            <rect x="118" y="104" width="58" height="40" rx="3" fill="url(#pv-body)" stroke="rgba(15,23,42,0.15)" strokeWidth="1" />
            <rect x="122" y="108" width="50" height="32" rx="2" fill="#1d3a8f" />
            <path d="M110 144 H184 L178 154 H116 Z" fill="#c9ced9" />
          </g>
        )}
        {kind === "network" && (
          <g>
            <rect x="60" y="66" width="6" height="50" rx="3" fill="#2a2f3b" />
            <rect x="134" y="66" width="6" height="50" rx="3" fill="#2a2f3b" />
            <rect x="36" y="112" width="128" height="42" rx="10" fill="url(#pv-body)" stroke="rgba(15,23,42,0.12)" strokeWidth="1" />
            {[64, 80, 96, 112].map((x) => <circle key={x} cx={x} cy="133" r="3.5" fill="#5eea9a" />)}
            <rect x="124" y="129" width="24" height="8" rx="2" fill="#c0c6d2" />
            {[14, 26, 38].map((r) => <path key={r} d={`M${100 - r} 78 A${r} ${r} 0 0 1 ${100 + r} 78`} fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />)}
          </g>
        )}
        {kind === "tools" && (
          <g>
            <path d="M76 72 V58 a6 6 0 0 1 6 -6 h36 a6 6 0 0 1 6 6 V72" fill="none" stroke="#2a2f3b" strokeWidth="7" />
            <rect x="34" y="72" width="132" height="90" rx="10" fill="#dc2626" />
            <rect x="34" y="98" width="132" height="8" fill="rgba(0,0,0,0.18)" />
            <rect x="89" y="93" width="22" height="18" rx="3" fill="url(#pv-dark)" />
            <path d="M44 162 V168 M156 162 V168" stroke="#2a2f3b" strokeWidth="6" />
          </g>
        )}
        {kind === "wash" && (
          <g>
            <g transform="translate(100 120) skewY(-8) translate(-100 -120)">
              <rect x="34" y="62" width="132" height="110" rx="4" fill="#cfd5df" />
              {Array.from({ length: 16 }, (_, i) => (
                <rect key={i} x={40 + (i % 4) * 31} y={68 + Math.floor(i / 4) * 25.5} width="28" height="23" rx="1.5" fill="url(#pv-cell)" />
              ))}
            </g>
            {[[60, 30], [92, 18], [126, 34], [150, 16]].map(([x, y]) => (
              <path key={x} transform={`translate(${x} ${y})`} d="M0 0 C6 8 9 13 9 17 a9 9 0 0 1 -18 0 c0 -4 3 -9 9 -17 Z" fill="#38bdf8" />
            ))}
          </g>
        )}
      </svg>
    </div>
  );
}
