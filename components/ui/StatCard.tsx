'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';

interface StatCardProps {
  value: number | string;
  suffix?: string;
  label: string;
  animate?: boolean;
}

export default function StatCard({
  value,
  suffix,
  label,
  animate = typeof value === 'number',
}: StatCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const prefersReducedMotion = useReducedMotion();
  const [displayValue, setDisplayValue] = useState(
    animate && typeof value === 'number' ? 0 : value
  );

  useEffect(() => {
    if (!animate || typeof value !== 'number' || !isInView || prefersReducedMotion) {
      setDisplayValue(value);
      return;
    }

    const duration = 1800;
    const step = value / (duration / 16);
    let current = 0;

    const timer = setInterval(() => {
      current += step;
      if (current >= value) {
        setDisplayValue(value);
        clearInterval(timer);
      } else {
        setDisplayValue(Math.floor(current));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [animate, value, isInView, prefersReducedMotion]);

  return (
    <div ref={ref}>
      <div className="flex items-baseline gap-0.5">
        <motion.span
          className="bg-gradient-to-br from-white to-brand-blue-lt bg-clip-text text-4xl font-extrabold text-transparent"
          initial={false}
        >
          {displayValue}
        </motion.span>
        {suffix && (
          <span className="text-2xl font-bold text-brand-blue">{suffix}</span>
        )}
      </div>
      <p className="mt-1 text-xs text-slate-400">{label}</p>
    </div>
  );
}
