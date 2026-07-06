'use client';

import { useEffect, useRef, useState } from 'react';
import { useInView, useReducedMotion } from 'framer-motion';

function parseValue(value: string) {
  if (value === '24/7') return { target: 24, suffix: '/7', special: true as const };
  const match = value.match(/^(\d+)(.*)$/);
  if (!match) return { target: 0, suffix: value, special: false as const };
  return { target: Number(match[1]), suffix: match[2], special: false as const };
}

interface AnimatedCounterProps {
  value: string;
  className?: string;
}

export default function AnimatedCounter({ value, className }: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.45, margin: '0px 0px -60px 0px' });
  const reduced = useReducedMotion();
  const [display, setDisplay] = useState(reduced ? value : value === '24/7' ? '0/7' : `0${parseValue(value).suffix}`);

  useEffect(() => {
    if (!isInView) return;
    if (reduced) {
      setDisplay(value);
      return;
    }

    const { target, suffix, special } = parseValue(value);
    const duration = special ? 1200 : 1500;
    const startTime = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - (1 - progress) ** 3;
      const current = Math.round(eased * target);
      setDisplay(`${current}${suffix}`);
      if (progress < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  }, [isInView, reduced, value]);

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  );
}
