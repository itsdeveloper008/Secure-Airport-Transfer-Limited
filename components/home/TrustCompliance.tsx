'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { Shield, Building, Award, FileCheck, HardHat } from 'lucide-react';
import { COMPANY_LEGAL } from '@/lib/constants';

const items = [
  { icon: Building, title: 'Company Registration', desc: 'Registered in England and Wales. Company No. 15018607.' },
  { icon: Shield, title: 'UK Business Compliance', desc: 'Fully compliant UK private limited company operating nationwide.' },
  { icon: Award, title: 'Corporate Standards', desc: 'Enterprise-grade operations meeting corporate procurement requirements.' },
  { icon: FileCheck, title: 'Insurance Coverage', desc: 'Comprehensive commercial insurance across all fleet operations.' },
  { icon: HardHat, title: 'Operational Excellence', desc: '24/7 operations centre with trained dispatch and account management teams.' },
];

export default function TrustCompliance() {
  const reduced = useReducedMotion();

  return (
    <section className="section-block section-divider w-full bg-brand-white">
      <div className="zone w-full">
        <motion.div
          className="section-intro text-center"
          initial={reduced ? false : { opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8 }}
        >
          <p className="eyebrow">Trust & Compliance</p>
          <h2 className="heading-gap headline-xl text-brand-navy">
            Enterprise Confidence, <span className="text-brand-gold">Built In</span>
          </h2>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {items.map((item, i) => (
            <motion.div
              key={item.title}
              className="premium-card p-8 lg:p-10"
              initial={reduced ? false : { opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
            >
              <item.icon className="mb-5 h-7 w-7 text-brand-gold" aria-hidden="true" />
              <h3 className="font-display text-lg font-semibold text-brand-navy">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-brand-muted">{item.desc}</p>
            </motion.div>
          ))}

          <motion.div
            className="premium-card flex flex-col justify-center border-brand-gold/20 p-8 md:col-span-2 lg:col-span-1 lg:p-10"
            initial={reduced ? false : { opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <p className="font-accent text-[10px] font-semibold uppercase tracking-[0.2em] text-brand-gold">Registered Entity</p>
            <p className="mt-4 text-xs leading-relaxed text-brand-muted">{COMPANY_LEGAL}</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
