'use client';

import { motion, useReducedMotion } from 'framer-motion';
import Button from '@/components/ui/Button';

const highlights = [
  { value: '12+', label: 'Airport Hubs' },
  { value: '500+', label: 'Fleet Partners' },
  { value: '24/7', label: 'Operations' },
];

export default function HomeCTA() {
  const reduced = useReducedMotion();

  return (
    <section className="section-block section-divider w-full bg-brand-white">
      <div className="zone w-full">
        <motion.div
          className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12"
          initial={reduced ? false : { opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8 }}
        >
          <div>
            <p className="eyebrow">Corporate Ground Transport</p>
            <h2 className="heading-gap headline-xl text-brand-navy">
              Open a Corporate Account
              <br />
              <span className="text-brand-gold">Across the UK</span>
            </h2>
            <p className="body-gap max-w-xl text-base leading-relaxed text-brand-muted md:text-lg">
              Executive airport transfers, airline crew logistics, and nationwide fleet
              management — built for travel managers, procurement teams, and enterprise
              organisations.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button href="/contact" variant="gold" showArrow aria-label="Open corporate account">
                Open Corporate Account
              </Button>
              <Button href="/contact" variant="outline-light" aria-label="Request B2B quote">
                Request B2B Quote
              </Button>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            {highlights.map((item, i) => (
              <motion.div
                key={item.label}
                className="rounded-2xl border border-brand-navy/10 bg-brand-gray/60 px-4 py-5 text-center shadow-[0_4px_20px_rgba(7,26,53,0.06)]"
                initial={reduced ? false : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <p className="font-display text-3xl font-bold text-brand-gold lg:text-4xl">
                  {item.value}
                </p>
                <p className="mt-1.5 font-accent text-[10px] font-semibold uppercase tracking-widest text-brand-muted">
                  {item.label}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
