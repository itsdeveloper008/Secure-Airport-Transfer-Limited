'use client';

import { motion, useReducedMotion } from 'framer-motion';
import {
  UserCheck,
  FileText,
  ShieldCheck,
  Headphones,
  Network,
  Car,
} from 'lucide-react';
import Button from '@/components/ui/Button';

const stats = [
  { value: '12+', label: 'Airport Hubs' },
  { value: '500+', label: 'Fleet Partners' },
  { value: '24/7', label: 'Operations Centre' },
  { value: '99.9%', label: 'Service Reliability' },
];

const benefits = [
  {
    icon: UserCheck,
    title: 'Dedicated Account Managers',
    desc: 'Named corporate contacts with direct escalation paths and proactive service oversight.',
  },
  {
    icon: FileText,
    title: 'Consolidated Billing',
    desc: 'Single monthly invoice across all UK cities, eliminating per-trip administration overhead.',
  },
  {
    icon: ShieldCheck,
    title: 'SLA Monitoring',
    desc: 'Contractual service level agreements with monthly performance reporting and audit trails.',
  },
  {
    icon: Headphones,
    title: '24/7 Operations Centre',
    desc: 'Round-the-clock dispatch and support for urgent requirements and scheduled operations.',
  },
  {
    icon: Network,
    title: 'Nationwide Airport Coverage',
    desc: 'Coordinated ground transport across every major UK aviation hub from a single partner.',
  },
  {
    icon: Car,
    title: 'Executive Fleet Standards',
    desc: 'Premium vehicles only, professionally maintained, executive-class, and chauffeur-operated.',
  },
];

const watermarks = ['CORPORATE', 'LOGISTICS', 'OPERATIONS'];

export default function WhyChooseUs() {
  const reduced = useReducedMotion();

  return (
    <section className="section-full section-divider w-full bg-brand-gray py-12 lg:py-16">
      {/* Background watermarks */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        {watermarks.map((word, i) => (
          <span
            key={word}
            className="absolute select-none font-display font-bold uppercase leading-none text-brand-navy/[0.035]"
            style={{
              fontSize: 'clamp(4rem, 12vw, 10rem)',
              top: `${12 + i * 28}%`,
              left: i % 2 === 0 ? '-2%' : 'auto',
              right: i % 2 === 1 ? '-2%' : 'auto',
              letterSpacing: '0.15em',
            }}
          >
            {word}
          </span>
        ))}
      </div>

      <div className="zone relative z-10 w-full">
        <div className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] xl:gap-10">
          {/* Left — authority column */}
          <motion.div
            initial={reduced ? false : { opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.9 }}
          >
            {/* Section label with gold line */}
            <div className="flex items-center gap-4">
              <span className="h-px w-10 bg-brand-gold" aria-hidden="true" />
              <p className="font-accent text-[clamp(0.875rem,1.5vw,1.5rem)] font-bold uppercase tracking-[0.25em] text-brand-gold">
                Why Companies Choose Us
              </p>
            </div>

            {/* Main heading */}
            <h2 className="mt-4 font-display text-[clamp(2.25rem,5vw,4.25rem)] font-bold leading-[1.04] tracking-tight text-brand-navy">
              The Corporate
              <br />
              Standard In UK
              <br />
              <span className="text-brand-gold">Executive Ground</span>
              <br />
              Transport
            </h2>

            {/* Premium subtext */}
            <div className="mt-6 max-w-[700px] space-y-4">
              <p className="text-lg leading-relaxed text-brand-text md:text-xl">
                We operate as a nationwide executive transport logistics partner, delivering
                corporate fleet management, airline crew transportation, VIP airport transfers,
                and enterprise mobility solutions across the United Kingdom.
              </p>
              <p className="text-base leading-relaxed text-brand-muted md:text-lg">
                Built for procurement teams, travel managers, luxury hospitality groups, and
                international organisations requiring reliability at scale.
              </p>
            </div>

            {/* Corporate statistics panel */}
            <div className="mt-6 grid grid-cols-2 gap-3">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  className="group rounded-xl border border-brand-navy/8 bg-white p-4 shadow-[0_4px_20px_rgba(7,26,53,0.06)] transition-all duration-300 hover:-translate-y-1 hover:border-brand-gold/40 hover:shadow-[0_12px_32px_rgba(201,162,39,0.12)]"
                  initial={reduced ? false : { opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                >
                  <p className="font-display text-2xl font-bold text-brand-navy lg:text-3xl">
                    {stat.value}
                  </p>
                  <p className="mt-1 font-accent text-[10px] font-semibold uppercase tracking-[0.2em] text-brand-muted">
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </div>

            <div className="mt-6">
              <Button href="/contact" variant="gold" showArrow aria-label="Open corporate account">
                Open Corporate Account
              </Button>
            </div>
          </motion.div>

          {/* Right — premium benefits grid */}
          <div className="grid gap-3 sm:grid-cols-2">
            {benefits.map((item, i) => (
              <motion.div
                key={item.title}
                className="group relative overflow-hidden rounded-xl border border-brand-navy/6 bg-white p-5 shadow-[0_4px_20px_rgba(7,26,53,0.06)] transition-all duration-400 hover:-translate-y-1 hover:border-brand-gold/35 hover:shadow-[0_16px_40px_rgba(7,26,53,0.1)]"
                initial={reduced ? false : { opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.55, delay: i * 0.07 }}
              >
                {/* Gold hover accent line */}
                <div className="absolute left-0 top-0 h-1 w-0 bg-brand-gold transition-all duration-400 group-hover:w-full" />

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-blue/10 transition-colors duration-300 group-hover:bg-brand-blue/15">
                  <item.icon className="h-5 w-5 text-brand-blue" aria-hidden="true" />
                </div>

                <h3 className="mt-3 font-display text-base font-bold text-brand-navy lg:text-lg">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-brand-muted">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
