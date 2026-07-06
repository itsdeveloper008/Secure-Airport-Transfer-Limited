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
    details:
      'Corporate accounts include structured onboarding, consolidated monthly invoicing, named account management, and service-level reporting across every UK airport hub. Travel policies, cost-centre billing, and operational dashboards give procurement teams full visibility without managing multiple local suppliers.',
    features: [
      'Centralized UK-Wide Management',
      'Consolidated Monthly Billing',
      'Dedicated Account Manager',
      'Real-Time Operational Reporting',
    ],
    highlights: [
      'Multi-city account structure with single point of contact',
      'Monthly SLA and journey analytics for procurement review',
      'Traveller profiles, approval workflows, and cost-centre billing',
    ],
    image: '/images/b2b-fleet-accounts.jpg',
    learnMoreHref: '/b2b-services/corporate-fleet-accounts',
  },
  {
    label: 'AIRLINE OPERATIONS',
    title: 'Airline & Crew Logistics',
    body: 'Time-critical ground transport for flight crews and airline operators, synchronized to live flight schedules with zero margin for error across every major UK aviation hub.',
    details:
      'Our airline operations desk coordinates manifest-based crew movements, standby vehicle deployment for delays, and real-time schedule adjustments across LHR, MAN, BHX, and regional UK airports. Encrypted communication with airline ops teams ensures crews reach hotels, briefing centres, and repositioning flights on time.',
    features: [
      'Flight-Schedule Synced Pickups',
      'Multi-Vehicle Crew Coordination',
      'Real-Time Delay Adjustments',
      'Nationwide Airport Coverage',
    ],
    highlights: [
      'Live flight monitoring integrated with dispatch',
      'Multi-vehicle coordination for wide-body crew movements',
      '24/7 airline operations desk with escalation protocols',
    ],
    image: '/images/b2b-airline-logistics.jpg',
    learnMoreHref: '/b2b-services/airline-crew-logistics',
  },
  {
    label: 'VIP SERVICES',
    title: 'Executive Airport Concierge',
    body: 'Premium meet-and-greet arrivals, real-time flight tracking, and VIP chauffeur services for senior executives and international delegations.',
    details:
      'From touchdown to final destination, our concierge team manages meet-and-greet coordination, terminal arrivals, luggage assistance, and onward travel to hotels or corporate offices. Discreet chauffeur operations support board-level visitors, diplomatic travel, and high-profile executive itineraries nationwide.',
    features: [
      'Chauffeur Meet & Greet',
      'Real-Time Flight Monitoring',
      'Executive-Class Vehicles',
      'Hotel & Onward Coordination',
    ],
    highlights: [
      'Terminal meet-and-greet with named chauffeur contact',
      'VIP saloon and chauffeur fleet for discreet travel',
      'Hotel, conference, and onward connection coordination',
    ],
    image: '/images/b2b-executive-concierge.jpg',
    learnMoreHref: '/b2b-services/executive-airport-concierge',
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
            <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-16">
              <div className={`min-w-0 ${i % 2 === 1 ? 'lg:order-2' : ''}`}>
                <p className="font-accent text-[11px] font-semibold uppercase tracking-[0.28em] text-brand-gold">
                  {s.label}
                </p>
                <h2 className="mt-4 font-display text-[clamp(2rem,4vw,3.5rem)] font-bold leading-tight text-brand-navy">
                  {s.title}
                </h2>
                <div className="my-6 h-px w-16 bg-gradient-to-r from-brand-gold to-transparent" />
                <p className="text-lg leading-relaxed text-brand-muted md:text-xl">{s.body}</p>
                <p className="mt-4 text-base leading-relaxed text-brand-muted">{s.details}</p>
                <ul className="mt-8 space-y-4">
                  {s.features.map((f) => (
                    <li key={f} className="flex items-start gap-3 text-brand-text">
                      <Check className="mt-0.5 h-5 w-5 shrink-0 text-brand-gold" aria-hidden="true" />
                      <span className="font-medium">{f}</span>
                    </li>
                  ))}
                </ul>
                <ul className="mt-6 space-y-2 border-t border-brand-navy/10 pt-6">
                  {s.highlights.map((h) => (
                    <li key={h} className="text-sm leading-relaxed text-brand-muted">
                      {h}
                    </li>
                  ))}
                </ul>
                <div className="mt-8">
                  <Button href={s.learnMoreHref} variant="blue" showArrow aria-label={`Learn more about ${s.title}`}>
                    Learn More
                  </Button>
                </div>
              </div>
              <div
                className={`relative aspect-[4/3] min-h-[280px] w-full shrink-0 overflow-hidden rounded-2xl shadow-[0_20px_60px_rgba(7,26,53,0.12)] sm:min-h-[320px] lg:min-h-[400px] ${
                  i % 2 === 1 ? 'lg:order-1' : ''
                }`}
              >
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
