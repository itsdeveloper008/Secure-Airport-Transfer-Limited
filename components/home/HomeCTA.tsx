'use client';

import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import {
  ArrowRight,
  Briefcase,
  Clock,
  FileText,
  MapPin,
  Plane,
  ShieldCheck,
  Users,
} from 'lucide-react';

const stats = [
  {
    value: '12+',
    label: 'Airport Hubs',
    description: 'Major UK aviation gateways covered nationwide.',
    icon: MapPin,
  },
  {
    value: '500+',
    label: 'Fleet Partners',
    description: 'Vetted executive vehicles across every hub.',
    icon: Users,
  },
  {
    value: '24/7',
    label: 'Operations',
    description: 'Round-the-clock dispatch and account support.',
    icon: Clock,
  },
  {
    value: '100%',
    label: 'Reliability',
    description: 'Enterprise-grade standards you can depend on.',
    icon: ShieldCheck,
  },
];

export default function HomeCTA() {
  const reduced = useReducedMotion();

  return (
    <section className="section-full relative w-full overflow-hidden border-t border-brand-navy/[0.06] bg-[#f7f8fa] py-12 sm:py-16 lg:py-20">
      {/* Decorative corner accents */}
      <div
        className="pointer-events-none absolute bottom-0 left-0 h-40 w-40 opacity-40"
        aria-hidden="true"
        style={{
          backgroundImage: 'radial-gradient(circle, #2563EB 1px, transparent 1px)',
          backgroundSize: '10px 10px',
          maskImage: 'linear-gradient(135deg, black, transparent 70%)',
        }}
      />
      <div
        className="pointer-events-none absolute bottom-0 right-0 h-40 w-40 opacity-40"
        aria-hidden="true"
        style={{
          backgroundImage: 'radial-gradient(circle, #2563EB 1px, transparent 1px)',
          backgroundSize: '10px 10px',
          maskImage: 'linear-gradient(225deg, black, transparent 70%)',
        }}
      />

      <div className="zone relative w-full">
        <motion.div
          className="mx-auto max-w-4xl text-center"
          initial={reduced ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
        >
          <Plane className="mx-auto h-6 w-6 text-brand-gold" aria-hidden="true" strokeWidth={1.75} />
          <p className="eyebrow mt-4">Corporate Ground Transport</p>
          <h2 className="heading-gap font-display text-[clamp(1.65rem,3.2vw,2.65rem)] font-bold leading-[1.12] tracking-tight text-brand-navy">
            Open a Corporate Account
            <br />
            <span className="text-[clamp(1.85rem,3.8vw,3rem)] text-brand-gold">Across the UK</span>
          </h2>
          <p className="body-gap mx-auto max-w-2xl text-base leading-relaxed text-brand-muted md:text-lg">
            Executive airport transfers, airline crew logistics, and nationwide fleet management —
            built for travel managers, procurement teams, and enterprise organisations.
          </p>
        </motion.div>

        <motion.div
          className="premium-card mx-auto mt-10 max-w-5xl overflow-hidden"
          initial={reduced ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          <div className="grid divide-y divide-gray-200/90 sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-4">
            {stats.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.label}
                  className="flex flex-col items-center px-5 py-8 text-center sm:py-10"
                  initial={reduced ? false : { opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.45, delay: i * 0.08 }}
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-blue/10">
                    <Icon className="h-5 w-5 text-brand-blue" aria-hidden="true" strokeWidth={1.75} />
                  </div>
                  <p className="mt-4 font-display text-3xl font-bold text-brand-navy lg:text-4xl">
                    {item.value}
                  </p>
                  <p className="mt-2 font-accent text-[10px] font-semibold uppercase tracking-[0.18em] text-brand-navy">
                    {item.label}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-brand-muted">{item.description}</p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        <motion.div
          className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-4"
          initial={reduced ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Link
            href="/contact"
            className="btn-gold gap-2.5"
            aria-label="Open corporate account"
          >
            <Briefcase className="h-[18px] w-[18px]" aria-hidden="true" />
            <span>Open Corporate Account</span>
            <ArrowRight className="h-[18px] w-[18px]" aria-hidden="true" />
          </Link>
          <Link
            href="/contact"
            className="btn-outline-light gap-2.5"
            aria-label="Request B2B quote"
          >
            <FileText className="h-[18px] w-[18px]" aria-hidden="true" />
            <span>Request B2B Quote</span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
