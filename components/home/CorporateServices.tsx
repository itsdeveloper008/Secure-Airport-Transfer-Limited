'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const services = [
  {
    label: 'CORPORATE SOLUTIONS',
    title: 'Corporate Fleet Accounts',
    description:
      'Manage executive travel across multiple UK cities through a centralized account structure designed for procurement teams, travel managers, and enterprise organizations. Benefit from consolidated invoicing, dedicated account management, service-level reporting, and complete operational visibility.',
    benefits: [
      'Centralized UK-Wide Management',
      'Consolidated Monthly Billing',
      'Dedicated Account Manager',
      'Real-Time Operational Reporting',
    ],
    stats: [
      { value: '500+', label: 'Fleet Partners' },
      { value: '12+', label: 'Airport Hubs' },
      { value: '24/7', label: 'Operations' },
    ],
    cta: 'Learn More About Fleet Accounts',
    image: '/images/service-corporate.jpg',
  },
  {
    label: 'AIRLINE OPERATIONS',
    title: 'Airline & Crew Logistics',
    description:
      'Time-critical ground transport for flight crews, cabin staff, and airline operators — synchronized to live flight schedules with zero margin for error. Our operations team coordinates multi-vehicle movements, delay adjustments, and manifest management across every major UK aviation hub.',
    benefits: [
      'Flight-Schedule Synced Pickups',
      'Multi-Vehicle Crew Coordination',
      'Real-Time Delay Adjustments',
      'Nationwide Airport Coverage',
    ],
    stats: [
      { value: '99.9%', label: 'Service Reliability' },
      { value: '24/7', label: 'Flight Monitoring' },
      { value: 'Nationwide', label: 'Coverage' },
    ],
    cta: 'Explore Airline Logistics',
    image: '/images/service-airline.jpg',
  },
  {
    label: 'VIP SERVICES',
    title: 'Executive Airport Concierge',
    description:
      'Premium meet-and-greet arrivals, real-time flight tracking, and VIP chauffeur services for senior executives and international delegations. Discreet, first-class ground transport from touchdown to final destination — coordinated by dedicated concierge operations staff.',
    benefits: [
      'Chauffeur Meet & Greet',
      'Real-Time Flight Monitoring',
      'Executive-Class Vehicles',
      'Hotel & Onward Coordination',
    ],
    stats: [
      { value: 'VIP', label: 'Chauffeur Fleet' },
      { value: '24/7', label: 'Concierge Desk' },
      { value: '100%', label: 'Discretion' },
    ],
    cta: 'Discover Executive Concierge',
    image: '/images/service-concierge.jpg',
  },
];

function FeatureIcon() {
  return (
    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-brand-gold/40 bg-brand-gold/10">
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
        <path
          d="M2.5 6L5 8.5L9.5 3.5"
          stroke="#C9A227"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

export default function CorporateServices() {
  const reduced = useReducedMotion();

  return (
    <section className="section-full section-divider w-full bg-brand-gray">
      {services.map((s, i) => (
        <motion.div
          key={s.title}
          className={`w-full ${i > 0 ? 'section-divider' : ''}`}
          initial={reduced ? false : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
        >
          <div className="grid w-full items-stretch gap-0 md:grid-cols-2">
            {/* Image — flush to top, no section padding */}
            <div
              className={`relative min-h-[240px] sm:min-h-[300px] md:min-h-[360px] lg:min-h-[min(55vh,520px)] ${
                i % 2 === 1 ? 'md:order-2' : ''
              }`}
            >
              <div className="group relative h-full min-h-[inherit] w-full overflow-hidden">
                <Image
                  src={s.image}
                  alt={s.title}
                  fill
                  className="object-cover object-center transition-transform duration-[1.4s] ease-out group-hover:scale-[1.03]"
                  sizes="50vw"
                />
              </div>
            </div>

            {/* Content */}
            <div
              className={`flex flex-col justify-center px-[clamp(1.25rem,5vw,5rem)] py-10 sm:py-12 lg:py-14 ${
                i % 2 === 1 ? 'md:order-1' : ''
              }`}
            >
              <p className="font-accent text-[11px] font-semibold uppercase tracking-[0.28em] text-brand-gold">
                {s.label}
              </p>

              <h3 className="heading-gap font-display text-[clamp(1.75rem,3.5vw,3rem)] font-bold leading-[1.1] tracking-tight text-brand-navy">
                {s.title}
              </h3>

              <div className="my-4 h-px w-full max-w-xs bg-brand-gold/40" />

              <p className="max-w-xl text-base leading-relaxed text-brand-muted md:text-lg">
                {s.description}
              </p>

              <ul className="mt-5 space-y-2.5">
                {s.benefits.map((b) => (
                  <li key={b} className="flex items-center gap-4">
                    <FeatureIcon />
                    <span className="text-[15px] font-medium text-brand-text md:text-base">{b}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-5 grid grid-cols-3 gap-3 border-t border-brand-gold/20 pt-5">
                {s.stats.map((stat) => (
                  <div key={stat.label}>
                    <p className="font-display text-2xl font-bold text-brand-navy lg:text-3xl">
                      {stat.value}
                    </p>
                    <p className="mt-1 font-accent text-[10px] font-semibold uppercase tracking-widest text-brand-muted">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>

              <Link
                href="/b2b-services"
                className="group mt-5 inline-flex items-center gap-2 font-accent text-sm font-semibold text-brand-blue transition-colors hover:text-brand-navy"
              >
                {s.cta}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </motion.div>
      ))}
    </section>
  );
}
