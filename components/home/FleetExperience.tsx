'use client';

import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
import { Users, Wifi, Clock, Plane, Building2, Shield } from 'lucide-react';

const headerStats = [
  'Executive Fleet',
  'Business Class Travel',
  'Nationwide Coverage',
  '24/7 Availability',
  'Corporate Transport Specialists',
  '500+ Fleet Partners',
];

const showcases = [
  {
    number: '01',
    title: 'Executive Saloon Fleet',
    subtitle: 'Mercedes S-Class · Mercedes E-Class',
    description:
      'The preferred choice for senior executives, business travellers, and corporate airport transfers. Designed for comfort, discretion, and reliability across the UK\'s major business centres and aviation hubs.',
    homeImage: '/images/service-ser-1.png',
    pageImage: '/images/tech-fleet-saloon.jpg',
    bg: 'bg-brand-white',
    dark: false,
    stats: [
      { icon: Users, label: '1–3 Passengers' },
      { icon: Shield, label: 'Premium Leather Interior' },
      { icon: Plane, label: 'Airport Transfers' },
      { icon: Building2, label: 'Corporate Travel' },
      { icon: Wifi, label: 'Wi-Fi Available' },
      { icon: Clock, label: '24/7 Availability' },
    ],
  },
  {
    number: '02',
    title: 'Luxury MPV Fleet',
    subtitle: 'Mercedes V-Class · Executive Group Transport',
    description:
      'Mercedes V-Class and premium multi-purpose vehicles for executive teams, conference logistics, hotel transfers, and airline crew movements. Spacious, refined, and operationally flexible for group transport at scale.',
    homeImage: '/images/service-ser-2.png',
    pageImage: '/images/tech-fleet-mpv.jpg',
    bg: 'bg-brand-gray',
    dark: false,
    stats: [
      { icon: Users, label: 'Group Transport' },
      { icon: Building2, label: 'Executive Teams' },
      { icon: Plane, label: 'Hotel Transfers' },
      { icon: Shield, label: 'Conference Logistics' },
      { icon: Clock, label: 'Airline Crew Movements' },
      { icon: Wifi, label: 'Up to 7 Passengers' },
    ],
  },
  {
    number: '03',
    title: 'VIP Chauffeur Fleet',
    subtitle: 'Premium Chauffeur · Executive Airport Transfers',
    description:
      'Ultra-premium chauffeur vehicles for VIP executive transfers, private aviation connections, meet-and-greet services, and discreet board-level travel. The definitive first-class ground transport experience.',
    homeImage: '/images/service-ser-3.png',
    pageImage: '/images/tech-fleet-vip.jpg',
    bg: 'bg-brand-navy',
    dark: true,
    stats: [
      { icon: Shield, label: 'VIP Executive Transfers' },
      { icon: Plane, label: 'Private Aviation Connections' },
      { icon: Users, label: 'Meet & Greet Services' },
      { icon: Clock, label: 'Discreet Chauffeur Operations' },
      { icon: Building2, label: 'First-Class Travel Experience' },
      { icon: Wifi, label: 'Board-Level Discretion' },
    ],
  },
];

export default function FleetExperience({ variant = 'home' }: { variant?: 'home' | 'technology' }) {
  const reduced = useReducedMotion();
  const imageKey = variant === 'technology' ? 'pageImage' : 'homeImage';

  return (
    <section className="section-full section-divider w-full">
      {/* Header — two-column introduction */}
      <div className="section-block w-full bg-brand-white">
        <div className="zone w-full">
          <div className="grid items-start gap-8 lg:grid-cols-2 lg:gap-12">
            <motion.div
              initial={reduced ? false : { opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="font-display text-[clamp(2rem,5.5vw,4.25rem)] font-bold leading-[1.04] tracking-tight text-brand-navy">
                Premium Vehicles
                <br />
                <span className="text-brand-gold">For Every</span>
                <br />
                <span className="text-gradient-brand">Requirement</span>
              </h2>

              <p className="mt-6 max-w-lg text-base leading-relaxed text-brand-muted md:text-lg">
                From executive saloons and luxury MPVs to VIP chauffeur vehicles, our nationwide
                fleet is maintained to the highest corporate standards for airport transfers,
                business travel, and enterprise mobility.
              </p>

              <div className="mt-8 grid grid-cols-3 gap-4 border-t border-brand-navy/10 pt-6">
                {[
                  { value: '3', label: 'Fleet Categories' },
                  { value: '500+', label: 'Fleet Partners' },
                  { value: '24/7', label: 'Availability' },
                ].map((item) => (
                  <div key={item.label}>
                    <p className="font-display text-2xl font-bold text-brand-navy lg:text-3xl">
                      {item.value}
                    </p>
                    <p className="mt-1 font-accent text-[10px] font-semibold uppercase tracking-widest text-brand-muted">
                      {item.label}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              className="glass-panel border border-brand-navy/10 bg-brand-gray/60 p-8 lg:p-10"
              initial={reduced ? false : { opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.8, delay: 0.15 }}
            >
              <p className="font-accent text-[11px] font-semibold uppercase tracking-[0.28em] text-brand-gold">
                Nationwide Executive Fleet
              </p>
              <ul className="mt-6 space-y-4">
                {headerStats.map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-3 border-b border-brand-navy/5 pb-4 last:border-0 last:pb-0"
                  >
                    <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-brand-blue" />
                    <span className="font-display text-lg font-semibold text-brand-navy">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Three premium showcases */}
      {showcases.map((showcase, i) => (
        <motion.div
          key={showcase.title}
          className={`relative w-full overflow-hidden section-pad ${showcase.bg} ${i > 0 ? 'section-divider' : ''}`}
          initial={reduced ? false : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.9 }}
        >
          {/* Background watermark number */}
          <span
            className={`pointer-events-none absolute right-[clamp(1rem,5vw,5rem)] top-1/2 z-0 -translate-y-1/2 select-none font-display text-[clamp(8rem,20vw,16rem)] font-bold leading-none ${
              showcase.dark ? 'text-white/[0.04]' : 'text-brand-navy/[0.04]'
            }`}
            aria-hidden="true"
          >
            {showcase.number}
          </span>

          <div
            className={`relative z-10 grid w-full items-stretch gap-0 lg:grid-cols-[1.1fr_0.9fr] ${
              i % 2 === 1 ? '' : ''
            }`}
          >
            {/* Image — 55% with explicit height */}
            <div
              className={`relative h-[280px] sm:h-[340px] lg:h-[min(55vh,520px)] ${
                i % 2 === 1 ? 'lg:order-2' : ''
              }`}
            >
              <div className="group relative h-full w-full overflow-hidden">
                <Image
                  src={showcase[imageKey]}
                  alt={showcase.title}
                  fill
                  priority={i === 0}
                  className="object-cover object-center transition-transform duration-[1.4s] ease-out group-hover:scale-[1.03]"
                  sizes="55vw"
                />
              </div>
            </div>

            {/* Content — 45% */}
            <div
              className={`flex flex-col justify-center px-[clamp(1.25rem,5vw,5rem)] py-6 lg:py-8 ${
                i % 2 === 1 ? 'lg:order-1' : ''
              }`}
            >
              <div className="mb-4 h-px w-full max-w-xs bg-brand-gold/40" />

              <p
                className={`font-accent text-[11px] font-semibold uppercase tracking-[0.28em] ${
                  showcase.dark ? 'text-brand-gold' : 'text-brand-gold'
                }`}
              >
                {showcase.subtitle}
              </p>

              <h3
                className={`mt-3 font-display text-[clamp(1.875rem,4vw,3.5rem)] font-bold leading-[1.06] tracking-tight ${
                  showcase.dark ? 'text-white' : 'text-brand-navy'
                }`}
              >
                {showcase.title}
              </h3>

              <p
                className={`mt-5 max-w-lg text-[clamp(1rem,1.8vw,1.25rem)] leading-relaxed ${
                  showcase.dark ? 'text-white/70' : 'text-brand-muted'
                }`}
              >
                {showcase.description}
              </p>

              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {showcase.stats.map((stat) => (
                  <div
                    key={stat.label}
                    className={`flex items-center gap-4 rounded-xl border px-5 py-4 transition-all duration-300 hover:-translate-y-0.5 ${
                      showcase.dark
                        ? 'border-white/10 bg-white/5 hover:border-brand-gold/30 hover:shadow-[0_8px_32px_rgba(201,162,39,0.1)]'
                        : 'border-brand-navy/8 bg-white shadow-[0_4px_20px_rgba(7,26,53,0.06)] hover:shadow-[0_8px_32px_rgba(7,26,53,0.1)]'
                    }`}
                  >
                    <stat.icon
                      className={`h-5 w-5 shrink-0 ${showcase.dark ? 'text-brand-gold' : 'text-brand-blue'}`}
                      aria-hidden="true"
                    />
                    <span
                      className={`text-[15px] font-semibold md:text-base ${
                        showcase.dark ? 'text-white/90' : 'text-brand-text'
                      }`}
                    >
                      {stat.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </section>
  );
}
