import PageHero from '@/components/layout/PageHero';
import FleetExperience from '@/components/home/FleetExperience';
import TechnologyPlatform from '@/components/home/TechnologyPlatform';
import { Server, MapPin, Bell, Plane, BarChart3, Leaf } from 'lucide-react';

export const metadata = {
  title: 'Technology & Fleet | Secure Airport Transfer Limited',
  description: 'Purpose-built dispatch technology and a premium executive vehicle network across every major UK airport hub.',
};

const techFeatures = [
  { icon: Server, title: 'Centralised Dispatch Architecture', body: 'Multi-city fleet routing from a single operations centre with real-time UK network coordination.' },
  { icon: MapPin, title: 'Real-Time GPS Fleet Tracking', body: 'Every vehicle GPS-monitored with live visibility for operations staff and account managers.' },
  { icon: Bell, title: 'Automated Passenger Notifications', body: 'SMS and email confirmations, driver details, and live ETA updates.' },
  { icon: Plane, title: 'Flight Tracking Integration', body: 'Flight data feeds directly into dispatch, adjusting schedules for delays or early arrivals.' },
  { icon: BarChart3, title: 'SLA Performance Reporting', body: 'Monthly dashboards covering on-time rates, service levels, and journey analytics.' },
  { icon: Leaf, title: 'Carbon Footprint Reporting', body: 'Carbon impact reports per billing cycle for ESG-conscious procurement teams.' },
];

export default function TechnologyFleetPage() {
  return (
    <>
      <PageHero
        label="Technology & Fleet"
        title="The Infrastructure Behind Nationwide Executive Logistics"
        subtitle="Purpose-built technology and a premium vehicle network operating across every major UK airport hub."
        backgroundImage="/images/tech-fleet-hero.png"
        imagePosition="object-[center_55%]"
      />

      <section className="section-block section-divider w-full bg-brand-white">
        <div className="zone w-full">
          <div className="section-intro">
            <p className="eyebrow">Technology Platform</p>
            <h2 className="heading-gap headline-lg text-brand-navy">Built for Scale, Visibility, and Accountability</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {techFeatures.map((f) => (
              <div key={f.title} className="premium-card p-8">
                <f.icon className="mb-4 h-7 w-7 text-brand-blue" aria-hidden="true" />
                <h3 className="font-display text-lg font-semibold text-brand-navy">{f.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-brand-muted">{f.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FleetExperience variant="technology" />
      <TechnologyPlatform />
    </>
  );
}
