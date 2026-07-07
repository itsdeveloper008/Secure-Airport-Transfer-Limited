import Image from 'next/image';
import Link from 'next/link';
import PageHero from '@/components/layout/PageHero';
import Button from '@/components/ui/Button';
import AnimatedCounter from '@/components/ui/AnimatedCounter';
import { COMPANY_LEGAL, NETWORK_STATS, REGISTERED_OFFICE, REGISTERED_OFFICE_FULL } from '@/lib/constants';
import { Check, Shield, Users, Zap } from 'lucide-react';

export const metadata = {
  title: 'About Us | Secure Airport Transfer Limited',
  description:
    'Learn about Secure Airport Transfer Limited — UK corporate ground transport specialists serving businesses, travel managers, and airline operators nationwide.',
};

const values = [
  {
    icon: Shield,
    title: 'Corporate-first',
    body: 'We work exclusively with businesses, travel managers, and airline operators — not retail passengers.',
  },
  {
    icon: Zap,
    title: 'Operations-led',
    body: 'Centralised dispatch, live fleet visibility, and 24/7 coordination across every major UK airport hub.',
  },
  {
    icon: Users,
    title: 'Partnership approach',
    body: 'Dedicated account management, consolidated billing, and service reporting built for procurement teams.',
  },
];

const sections = [
  {
    title: 'Who we are',
    body: [
      'Secure Airport Transfer Limited (SATL) is a UK private limited company providing nationwide executive ground transport and corporate airport logistics.',
      'We support organisations that need reliable, account-managed transport — from single executive journeys to high-volume airline crew movements across multiple cities.',
      COMPANY_LEGAL,
    ],
  },
  {
    title: 'What we do',
    body: [
      'SATL delivers corporate fleet accounts, airline crew logistics, and executive airport concierge services through a vetted partner network and centralised operations desk.',
      'Our technology platform gives travel managers real-time visibility, structured reporting, and consistent service standards across 12+ UK airport hubs.',
    ],
  },
  {
    title: 'Who we serve',
    body: [
      'Corporate travel and procurement teams managing executive and staff airport transfers.',
      'Airline operators coordinating time-critical crew positioning and hotel movements.',
      'Businesses opening centralised UK-wide ground transport accounts with consolidated invoicing.',
    ],
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        label="Company"
        title="About Us"
        subtitle="Nationwide corporate ground transport — built for businesses, travel managers, and airline operators across the UK."
        backgroundImage="/images/sector-corporate.jpg"
      />

      <section className="section-block w-full bg-brand-white">
        <div className="zone mx-auto max-w-5xl">
          <p className="text-lg leading-relaxed text-brand-muted">
            Secure Airport Transfer Limited combines executive service standards with the structure,
            reporting, and reliability that corporate procurement teams require. We operate exclusively
            in the B2B market — so every journey, account, and SLA is designed around business needs.
          </p>

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {NETWORK_STATS.map((stat) => (
              <div key={stat.label} className="premium-card p-6 text-center">
                <p className="font-display text-3xl font-bold text-brand-navy">
                  <AnimatedCounter value={stat.value} />
                </p>
                <p className="mt-2 text-sm font-medium text-brand-muted">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-block section-divider w-full bg-brand-gray">
        <div className="zone mx-auto max-w-5xl">
          <div className="grid gap-6 md:grid-cols-3">
            {values.map((item) => (
              <div key={item.title} className="premium-card p-6">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-blue/10">
                  <item.icon className="h-5 w-5 text-brand-blue" aria-hidden="true" />
                </div>
                <h3 className="mt-4 font-display text-lg font-semibold text-brand-navy">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-brand-muted">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-block w-full bg-brand-white">
        <div className="zone mx-auto max-w-5xl">
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-[0_20px_60px_rgba(7,26,53,0.12)]">
              <Image
                src="/images/sector-corporate.jpg"
                alt="Corporate ground transport operations"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            <div className="space-y-8">
              {sections.map((section) => (
                <article key={section.title}>
                  <h2 className="font-display text-xl font-semibold text-brand-navy">{section.title}</h2>
                  <div className="mt-3 space-y-3">
                    {section.body.map((paragraph) => (
                      <p key={paragraph} className="text-sm leading-relaxed text-brand-muted">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </div>

          <ul className="mt-12 grid gap-3 sm:grid-cols-2">
            {[
              '12+ UK airport hubs covered',
              'Vetted executive fleet partners',
              '24/7 corporate operations desk',
              'Consolidated billing and reporting',
            ].map((item) => (
              <li key={item} className="flex items-start gap-3 text-sm text-brand-text">
                <Check className="mt-0.5 h-5 w-5 shrink-0 text-brand-gold" aria-hidden="true" />
                <span className="font-medium">{item}</span>
              </li>
            ))}
          </ul>

          <div className="premium-card mt-12 p-8">
            <h3 className="font-display text-lg font-semibold text-brand-navy">Registered Office</h3>
            <address className="mt-3 not-italic text-sm leading-relaxed text-brand-muted">
              {REGISTERED_OFFICE.line1}
              <br />
              {REGISTERED_OFFICE.line2}
              <br />
              {REGISTERED_OFFICE.line3}
            </address>
            <p className="mt-3 text-xs text-brand-muted">{REGISTERED_OFFICE_FULL}</p>
          </div>

          <div className="mt-10 flex flex-wrap gap-4">
            <Button href="/contact" variant="blue" showArrow aria-label="Contact our team">
              Contact Our Team
            </Button>
            <Button href="/b2b-services" variant="outline-light" aria-label="View B2B services">
              B2B Services
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
