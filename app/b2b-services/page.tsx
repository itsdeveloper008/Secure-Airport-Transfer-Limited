import Image from 'next/image';
import PageHero from '@/components/layout/PageHero';
import Button from '@/components/ui/Button';
import { Check } from 'lucide-react';

export const metadata = {
  title: 'B2B Services | Secure Airport Transfer Limited',
  description: 'Corporate fleet accounts, airline crew logistics, and executive airport concierge services for UK businesses.',
};

const sections = [
  {
    label: 'CORPORATE SOLUTIONS',
    title: 'Corporate Fleet Accounts',
    body: 'Manage executive travel across multiple UK cities through a centralized account structure designed for procurement teams, travel managers, and enterprise organizations.',
    features: [
      'Centralized UK-Wide Management',
      'Consolidated Monthly Billing',
      'Dedicated Account Manager',
      'Real-Time Operational Reporting',
    ],
    image: '/images/b2b-fleet-accounts.jpg',
  },
  {
    label: 'AIRLINE OPERATIONS',
    title: 'Airline & Crew Logistics',
    body: 'Time-critical ground transport for flight crews and airline operators, synchronized to live flight schedules with zero margin for error across every major UK aviation hub.',
    features: [
      'Flight-Schedule Synced Pickups',
      'Multi-Vehicle Crew Coordination',
      'Real-Time Delay Adjustments',
      'Nationwide Airport Coverage',
    ],
    image: '/images/b2b-airline-logistics.jpg',
  },
  {
    label: 'VIP SERVICES',
    title: 'Executive Airport Concierge',
    body: 'Premium meet-and-greet arrivals, real-time flight tracking, and VIP chauffeur services for senior executives and international delegations.',
    features: [
      'Chauffeur Meet & Greet',
      'Real-Time Flight Monitoring',
      'Executive-Class Vehicles',
      'Hotel & Onward Coordination',
    ],
    image: '/images/b2b-executive-concierge.jpg',
  },
];

export default function B2BServicesPage() {
  return (
    <>
      <PageHero
        label="B2B Enterprise Services"
        title="Corporate Ground Transport Solutions"
        subtitle="Engineered for travel managers, airline operators, and procurement teams who demand precision at scale."
        backgroundImage="/images/b2b-hero.jpg"
      />

      {sections.map((s, i) => (
        <section
          key={s.title}
          className={`section-block section-divider w-full ${i % 2 === 0 ? 'bg-brand-white' : 'bg-brand-gray'}`}
        >
          <div className="zone w-full">
            <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
              <div className={i % 2 === 1 ? 'lg:order-2' : ''}>
                <p className="font-accent text-[11px] font-semibold uppercase tracking-[0.28em] text-brand-gold">
                  {s.label}
                </p>
                <h2 className="mt-4 font-display text-[clamp(2rem,4vw,3.5rem)] font-bold leading-tight text-brand-navy">
                  {s.title}
                </h2>
                <div className="my-6 h-px w-16 bg-gradient-to-r from-brand-gold to-transparent" />
                <p className="text-lg leading-relaxed text-brand-muted md:text-xl">{s.body}</p>
                <ul className="mt-8 space-y-4">
                  {s.features.map((f) => (
                    <li key={f} className="flex items-start gap-3 text-brand-text">
                      <Check className="mt-0.5 h-5 w-5 shrink-0 text-brand-gold" aria-hidden="true" />
                      <span className="font-medium">{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className={`relative min-h-[360px] overflow-hidden rounded-2xl shadow-[0_20px_60px_rgba(7,26,53,0.12)] ${i % 2 === 1 ? 'lg:order-1' : ''}`}>
                <Image src={s.image} alt={s.title} fill className="object-cover" sizes="50vw" />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/40 to-transparent" />
              </div>
            </div>
          </div>
        </section>
      ))}

      <section className="section-block w-full bg-brand-navy text-center">
        <div className="zone">
          <h2 className="headline-lg text-white">Ready to Open a Corporate Account?</h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-white/70">
            Speak to our B2B team about a tailored transport solution for your organisation.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Button href="/contact" variant="gold" showArrow aria-label="Open corporate account">
              Open Corporate Account
            </Button>
            <Button href="/contact" variant="outline-dark" aria-label="Request a quote">
              Request a Quote
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
