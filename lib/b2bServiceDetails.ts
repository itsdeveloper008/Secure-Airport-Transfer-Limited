export interface ServiceDetail {
  slug: string;
  label: string;
  title: string;
  subtitle: string;
  image: string;
  intro: string;
  features: string[];
  sections: { title: string; body: string[] }[];
}

export const b2bServiceDetails: ServiceDetail[] = [
  {
    slug: 'corporate-fleet-accounts',
    label: 'CORPORATE SOLUTIONS',
    title: 'Corporate Fleet Accounts',
    subtitle: 'Centralised executive travel management for procurement teams and enterprise organisations.',
    image: '/images/b2b-fleet-accounts.jpg',
    intro:
      'Open a single corporate account to manage executive ground transport across every major UK airport hub. Consolidated billing, dedicated account management, and operational reporting give travel managers complete visibility.',
    features: [
      'Centralized UK-wide account management',
      'Consolidated monthly invoicing',
      'Dedicated account manager',
      'Real-time operational reporting',
      'Traveller profiles and cost-centre billing',
      'Monthly SLA and journey analytics',
    ],
    sections: [
      {
        title: 'Account Structure',
        body: [
          'Corporate fleet accounts are designed for organisations that require consistent service standards across multiple UK cities. A named account manager coordinates bookings, billing, and service reviews from a single point of contact.',
          'Procurement teams benefit from structured onboarding, approval workflows, and consolidated monthly statements that simplify reconciliation and contract management.',
        ],
      },
      {
        title: 'Operational Visibility',
        body: [
          'Account dashboards provide journey history, on-time performance, and hub-level activity reporting. Travel managers can review spend by department, route, or cost centre without managing multiple local suppliers.',
        ],
      },
    ],
  },
  {
    slug: 'airline-crew-logistics',
    label: 'AIRLINE OPERATIONS',
    title: 'Airline & Crew Logistics',
    subtitle: 'Time-critical crew transport synchronised to live flight schedules across UK aviation hubs.',
    image: '/images/b2b-airline-logistics.jpg',
    intro:
      'Dedicated airline operations support for flight crew, cabin staff, and airline operators. Manifest-based coordination, standby vehicles, and real-time schedule adjustments keep crews moving on time.',
    features: [
      'Flight-schedule synced pickups',
      'Multi-vehicle crew coordination',
      'Real-time delay adjustments',
      'Nationwide airport coverage',
      '24/7 airline operations desk',
      'Encrypted ops team communication',
    ],
    sections: [
      {
        title: 'Crew Movement Coordination',
        body: [
          'Our airline desk manages manifest-based pickups, hotel transfers, and repositioning movements for short-haul and long-haul operators. Live flight monitoring triggers automatic schedule updates when delays or early arrivals occur.',
          'Multi-vehicle deployments support wide-body crew movements with coordinated dispatch across LHR, MAN, BHX, and regional UK airports.',
        ],
      },
      {
        title: 'Reliability at Scale',
        body: [
          'Airline partners receive dedicated escalation protocols, standby vehicle deployment, and encrypted communication with operations teams. Every movement is tracked from dispatch to drop-off.',
        ],
      },
    ],
  },
  {
    slug: 'executive-airport-concierge',
    label: 'VIP SERVICES',
    title: 'Executive Airport Concierge',
    subtitle: 'Premium meet-and-greet and VIP chauffeur services for senior executives and delegations.',
    image: '/images/b2b-executive-concierge.jpg',
    intro:
      'First-class ground transport from touchdown to final destination. Terminal meet-and-greet, real-time flight monitoring, and discreet chauffeur operations for board-level and VIP travel.',
    features: [
      'Chauffeur meet & greet at terminal',
      'Real-time flight monitoring',
      'Executive-class and VIP vehicles',
      'Hotel and onward coordination',
      'Discreet board-level travel',
      'Dedicated concierge operations desk',
    ],
    sections: [
      {
        title: 'Concierge Operations',
        body: [
          'Our concierge team coordinates terminal arrivals, luggage assistance, and onward connections to hotels, corporate offices, or conference venues. Chauffeurs are briefed on passenger preferences and itinerary before every journey.',
        ],
      },
      {
        title: 'VIP Executive Travel',
        body: [
          'Ultra-premium chauffeur vehicles support diplomatic travel, private aviation connections, and high-profile executive itineraries. Operations are managed with full discretion and proactive flight monitoring throughout.',
        ],
      },
    ],
  },
];

export function getB2BServiceDetail(slug: string): ServiceDetail | undefined {
  return b2bServiceDetails.find((s) => s.slug === slug);
}
