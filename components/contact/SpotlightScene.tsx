'use client';

import { forwardRef } from 'react';

interface SpotlightSceneProps {
  emitterX: number;
  emitterY: number;
  beamLeft: number;
  beamRight: number;
  beamBottom: number;
  active: boolean;
}

interface SpotlightFixtureProps {
  rotation: number;
}

/** Matte black track-light fixture — mount stays centered, head pivots with the beam */
export const SpotlightFixture = forwardRef<HTMLDivElement, SpotlightFixtureProps>(
  function SpotlightFixture({ rotation }, ref) {
    return (
      <div
        ref={ref}
        className="relative h-[140px] w-[180px]"
        aria-hidden="true"
      >
        <svg
          viewBox="0 0 180 140"
          className="h-full w-full overflow-visible"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="cylinderBody" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#0a0a0a" />
              <stop offset="35%" stopColor="#222" />
              <stop offset="65%" stopColor="#2a2a2a" />
              <stop offset="100%" stopColor="#111" />
            </linearGradient>
            <radialGradient id="frostedPanel" cx="50%" cy="42%" r="58%">
              <stop offset="0%" stopColor="#fffef9" />
              <stop offset="30%" stopColor="#faf8f2" />
              <stop offset="65%" stopColor="#eceae4" />
              <stop offset="100%" stopColor="#b8b6b0" />
            </radialGradient>
            <radialGradient id="panelGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="rgba(255,254,248,0.98)" />
              <stop offset="45%" stopColor="rgba(255,248,228,0.55)" />
              <stop offset="100%" stopColor="rgba(255,245,220,0)" />
            </radialGradient>
            <filter id="panelSoft" x="-40%" y="-40%" width="180%" height="180%">
              <feGaussianBlur stdDeviation="0.8" />
            </filter>
          </defs>

          {/* Ceiling mount — fixed */}
          <ellipse cx="90" cy="12" rx="38" ry="5.5" fill="#121212" />
          <ellipse cx="90" cy="10.5" rx="33" ry="4" fill="#1e1e1e" />
          <ellipse cx="90" cy="9" rx="28" ry="2.5" fill="#252525" opacity="0.6" />

          {/* Stem — fixed */}
          <rect x="86.5" y="14" width="7" height="16" rx="2.5" fill="#181818" />
          <rect x="87.5" y="15" width="2" height="14" rx="1" fill="rgba(255,255,255,0.06)" />

          {/* Pivot marker */}
          <circle className="spotlight-pivot" cx="90" cy="30" r="1.5" fill="transparent" />

          {/* Cylinder assembly — head pivots, recessed frosted lens like reference */}
          <g transform={`rotate(${rotation}, 90, 30)`}>
            <rect x="78" y="30" width="24" height="66" rx="12" fill="url(#cylinderBody)" />
            <rect x="80" y="33" width="2.5" height="60" rx="1.25" fill="rgba(255,255,255,0.05)" />
            <rect x="97.5" y="33" width="2.5" height="60" rx="1.25" fill="rgba(0,0,0,0.35)" />

            {/* Housing face — matte black outer ring */}
            <ellipse cx="90" cy="96" rx="13.5" ry="6" fill="#0a0a0a" />
            <ellipse cx="90" cy="96" rx="13" ry="5.6" fill="none" stroke="#151515" strokeWidth="1" />

            {/* Recessed cavity shadow */}
            <ellipse cx="90" cy="96.8" rx="11.8" ry="5" fill="#040404" />
            <ellipse cx="90" cy="97" rx="11" ry="4.5" fill="#080808" />

            {/* Bright white inner bezel */}
            <ellipse
              cx="90"
              cy="96.5"
              rx="10.2"
              ry="4"
              fill="none"
              stroke="#f2f2f2"
              strokeWidth="1.1"
            />

            {/* Frosted diffused panel — recessed LED face */}
            <ellipse
              className="spotlight-lens"
              cx="90"
              cy="97"
              rx="9"
              ry="3.2"
              fill="url(#frostedPanel)"
              filter="url(#panelSoft)"
            />

            {/* Warm centre glow on panel */}
            <ellipse cx="90" cy="96.8" rx="6" ry="2.1" fill="url(#panelGlow)" />

            {/* Subtle top-edge highlight on housing */}
            <ellipse
              cx="90"
              cy="95.5"
              rx="12"
              ry="4.8"
              fill="none"
              stroke="rgba(255,255,255,0.07)"
              strokeWidth="0.6"
            />
          </g>
        </svg>
      </div>
    );
  },
);

/** @deprecated alias */
export const GlassEmitter = SpotlightFixture;

export default function SpotlightScene({
  emitterX,
  emitterY,
  beamLeft,
  beamRight,
  beamBottom,
  active,
}: SpotlightSceneProps) {
  const hotspotX = (beamLeft + beamRight) / 2;
  const hotspotY = beamBottom;

  // Pull apex slightly back into the lens so blur doesn't leave a visible gap
  const bx = hotspotX - emitterX;
  const by = hotspotY - emitterY;
  const bLen = Math.hypot(bx, by) || 1;
  const overlap = 16;
  const apexX = emitterX - (bx / bLen) * overlap;
  const apexY = emitterY - (by / bLen) * overlap;

  const points = `${apexX},${apexY} ${beamLeft},${beamBottom} ${beamRight},${beamBottom}`;

  return (
    <div className="pointer-events-none absolute inset-0 z-0" aria-hidden="true">
      <svg className="absolute inset-0 h-full w-full overflow-visible">
        <defs>
          <linearGradient id="beamGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="rgba(255,245,210,0.9)" />
            <stop offset="10%" stopColor="rgba(255,225,160,0.7)" />
            <stop offset="35%" stopColor="rgba(210,235,255,0.42)" />
            <stop offset="70%" stopColor="rgba(150,190,255,0.16)" />
            <stop offset="100%" stopColor="rgba(80,100,255,0)" />
          </linearGradient>
          <radialGradient id="caretHotspot" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(255,252,235,0.95)" />
            <stop offset="45%" stopColor="rgba(255,230,170,0.55)" />
            <stop offset="100%" stopColor="rgba(150,190,255,0)" />
          </radialGradient>
          <filter id="beamBlur">
            <feGaussianBlur stdDeviation="2.5" />
          </filter>
          <filter id="hotspotBlur">
            <feGaussianBlur stdDeviation="6" />
          </filter>
        </defs>

        <polygon
          fill="url(#beamGrad)"
          filter="url(#beamBlur)"
          points={points}
          opacity={active ? 0.98 : 0.35}
        />
        <ellipse
          cx={emitterX}
          cy={emitterY}
          rx={active ? 10 : 7}
          ry={active ? 4 : 3}
          fill="rgba(255,245,225,0.45)"
          filter="url(#hotspotBlur)"
          opacity={active ? 0.55 : 0.25}
        />
        <ellipse
          cx={hotspotX}
          cy={hotspotY}
          rx={active ? 28 : 18}
          ry={active ? 14 : 10}
          fill="url(#caretHotspot)"
          filter="url(#hotspotBlur)"
          opacity={active ? 0.9 : 0.4}
        />
      </svg>
    </div>
  );
}
