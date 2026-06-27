'use client';

import { motion, useReducedMotion } from 'framer-motion';
import dynamic from 'next/dynamic';

const UKCoverageMap = dynamic(() => import('@/components/maps/UKCoverageMap'), {
  ssr: false,
  loading: () => (
    <div className="flex h-[min(60vh,560px)] w-full items-center justify-center bg-brand-navy">
      <div className="h-10 w-10 animate-spin rounded-full border-2 border-brand-gold border-t-transparent" />
    </div>
  ),
});

const stats = [
  { value: '12+', label: 'Airport Hubs' },
  { value: '500+', label: 'Fleet Partners' },
  { value: '24/7', label: 'Operations' },
  { value: '100%', label: 'Corporate Focus' },
];

export default function Network() {
  const reduced = useReducedMotion();

  return (
    <section className="section-block section-divider w-full bg-brand-white">
      <div className="zone w-full">
        <motion.div
          className="section-intro text-center"
          initial={reduced ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8 }}
        >
          <p className="eyebrow">Nationwide Coverage</p>
          <h2 className="heading-gap headline-xl text-brand-navy">
            Nationwide Coverage Across
            <br />
            <span className="text-gradient-brand">Every Major UK Airport Hub</span>
          </h2>
          <p className="body-gap mx-auto max-w-2xl text-base leading-relaxed text-brand-muted md:text-lg">
            Providing executive transportation and corporate fleet operations across the
            United Kingdom&apos;s most important aviation gateways.
          </p>
        </motion.div>
      </div>

      <motion.div
        className="mt-8 w-full lg:mt-10"
        initial={reduced ? false : { opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 1 }}
      >
        <UKCoverageMap />
      </motion.div>

      <div className="section-divider mx-[clamp(1.25rem,5vw,5rem)] mt-10 lg:mt-12" />

      <div className="zone w-full pt-8 lg:pt-10">
        <motion.div
          className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
          initial={reduced ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, delay: 0.15 }}
        >
          {stats.map((s) => (
            <div
              key={s.label}
              className="premium-card flex flex-col items-center px-6 py-8 text-center"
            >
              <p className="font-display text-4xl font-bold text-brand-navy lg:text-5xl">
                {s.value}
              </p>
              <p className="mt-2 font-accent text-xs font-semibold uppercase tracking-[0.2em] text-brand-muted">
                {s.label}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
