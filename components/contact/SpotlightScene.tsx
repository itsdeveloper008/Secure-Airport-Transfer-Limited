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

/** Matte black track-light fixture — cylinder pivots with the beam */
export const SpotlightFixture = forwardRef<HTMLDivElement, SpotlightFixtureProps>(
  function SpotlightFixture({ rotation }, ref) {
    return (
      <div
        ref={ref}
        className="relative mx-auto mb-10 h-[140px] w-[180px]"
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
              <stop offset="0%" stopColor="#080808" />
              <stop offset="30%" stopColor="#1a1a1a" />
              <stop offset="55%" stopColor="#2d2d2d" />
              <stop offset="100%" stopColor="#101010" />
            </linearGradient>
            <radialGradient id="lensFace" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#fffef8" />
              <stop offset="40%" stopColor="#ffe9a8" />
              <stop offset="80%" stopColor="#c9a227" />
              <stop offset="100%" stopColor="#6b5418" />
            </radialGradient>
            <filter id="lensBloom" x="-100%" y="-100%" width="300%" height="300%">
              <feGaussianBlur stdDeviation="5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
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

          {/* Cylinder assembly — rotates with beam via native SVG transform */}
          <g transform={`rotate(${rotation}, 90, 30)`}>
            <rect x="78" y="30" width="24" height="78" rx="12" fill="url(#cylinderBody)" />
            <rect x="80" y="33" width="3" height="72" rx="1.5" fill="rgba(255,255,255,0.05)" />
            <rect x="97" y="33" width="3" height="72" rx="1.5" fill="rgba(0,0,0,0.35)" />
            <rect x="78" y="94" width="24" height="14" rx="12" fill="#0a0a0a" />

            <circle
              className="spotlight-lens"
              cx="90"
              cy="106"
              r="13"
              fill="url(#lensFace)"
              stroke="#2a2a2a"
              strokeWidth="2"
              filter="url(#lensBloom)"
            />
            <circle cx="90" cy="106" r="7" fill="rgba(255,254,248,0.9)" />
            <circle cx="90" cy="106" r="22" fill="rgba(255,220,150,0.14)" />
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
  const points = `${emitterX},${emitterY} ${beamLeft},${beamBottom} ${beamRight},${beamBottom}`;

  return (
    <div className="pointer-events-none absolute inset-0 z-0" aria-hidden="true">
      <svg className="absolute inset-0 h-full w-full overflow-visible">
        <defs>
          <linearGradient id="beamGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="rgba(255,245,210,0.85)" />
            <stop offset="8%" stopColor="rgba(255,225,160,0.65)" />
            <stop offset="30%" stopColor="rgba(210,235,255,0.38)" />
            <stop offset="65%" stopColor="rgba(150,190,255,0.14)" />
            <stop offset="100%" stopColor="rgba(80,100,255,0)" />
          </linearGradient>
          <filter id="beamBlur">
            <feGaussianBlur stdDeviation="3" />
          </filter>
        </defs>

        {/* No extra spring — points update in lockstep with cylinder spring */}
        <polygon
          fill="url(#beamGrad)"
          filter="url(#beamBlur)"
          points={points}
          opacity={active ? 0.95 : 0.35}
        />
      </svg>
    </div>
  );
}
