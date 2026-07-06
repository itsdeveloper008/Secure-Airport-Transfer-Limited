import PageHero from '@/components/layout/PageHero';
import FleetExperience from '@/components/home/FleetExperience';
import TechnologyPlatform from '@/components/home/TechnologyPlatform';
import Button from '@/components/ui/Button';
import { techFeatureSlugs } from '@/lib/technologyDetails';
import { Server, MapPin, Bell, Plane, BarChart3, Leaf } from 'lucide-react';

export const metadata = {
  title: 'Technology & Fleet | Secure Airport Transfer Limited',
  description: 'Purpose-built dispatch technology and a premium executive vehicle network across every major UK airport hub.',
};

const techFeatures = [
  {
    icon: Server,
    title: 'Centralised Dispatch Architecture',
    body: 'Multi-city fleet routing from a single operations centre with real-time UK network coordination.',
    details:
      'Dispatch teams manage bookings, vehicle allocation, and route planning across London, Manchester, Birmingham, Scotland, and regional hubs from one platform. Account managers and operations staff share live visibility into every active journey.',
    learnMoreHref: `/technology-fleet/${techFeatureSlugs['Centralised Dispatch Architecture']}`,
  },
  {
    icon: MapPin,
    title: 'Real-Time GPS Fleet Tracking',
    body: 'Every vehicle GPS-monitored with live visibility for operations staff and account managers.',
    details:
      'Live vehicle positions, ETA updates, and journey status feed directly into the operations dashboard. Corporate clients receive proactive notifications when schedules change or vehicles are dispatched.',
    learnMoreHref: `/technology-fleet/${techFeatureSlugs['Real-Time GPS Fleet Tracking']}`,
  },
  {
    icon: Bell,
    title: 'Automated Passenger Notifications',
    body: 'SMS and email confirmations, driver details, and live ETA updates.',
    details:
      'Passengers receive booking confirmations, chauffeur contact details, and real-time arrival updates. Automated messaging reduces no-shows and keeps travellers informed throughout the journey.',
    learnMoreHref: `/technology-fleet/${techFeatureSlugs['Automated Passenger Notifications']}`,
  },
  {
    icon: Plane,
    title: 'Flight Tracking Integration',
    body: 'Flight data feeds directly into dispatch, adjusting schedules for delays or early arrivals.',
    details:
      'Live flight data from major UK airports automatically adjusts pickup times for airline crew, executive arrivals, and VIP concierge services. Dispatch reacts to delays without manual rebooking.',
    learnMoreHref: `/technology-fleet/${techFeatureSlugs['Flight Tracking Integration']}`,
  },
  {
    icon: BarChart3,
    title: 'SLA Performance Reporting',
    body: 'Monthly dashboards covering on-time rates, service levels, and journey analytics.',
    details:
      'Corporate accounts receive monthly performance reports covering on-time performance, journey volumes, hub activity, and service-level metrics. Procurement teams get audit-ready data for contract reviews.',
    learnMoreHref: `/technology-fleet/${techFeatureSlugs['SLA Performance Reporting']}`,
  },
  {
    icon: Leaf,
    title: 'Carbon Footprint Reporting',
    body: 'Carbon impact reports per billing cycle for ESG-conscious procurement teams.',
    details:
      'Environmental impact data is compiled per billing cycle, supporting ESG reporting and corporate sustainability programmes. Journey-level carbon estimates help travel managers track ground transport emissions.',
    learnMoreHref: `/technology-fleet/${techFeatureSlugs['Carbon Footprint Reporting']}`,
  },
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
              <div key={f.title} className="premium-card flex flex-col p-8">
                <f.icon className="mb-4 h-7 w-7 text-brand-blue" aria-hidden="true" />
                <h3 className="font-display text-lg font-semibold text-brand-navy">{f.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-brand-muted">{f.body}</p>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-brand-muted/90">{f.details}</p>
                <div className="mt-6">
                  <Button href={f.learnMoreHref} variant="outline-light" aria-label={`Learn more about ${f.title}`}>
                    Learn More
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FleetExperience variant="technology" showLearnMore />
      <TechnologyPlatform showLearnMore />
    </>
  );
}
