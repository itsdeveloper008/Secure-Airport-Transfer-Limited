export interface TechnologyDetail {
  slug: string;
  label: string;
  title: string;
  subtitle: string;
  image: string;
  intro: string;
  features: string[];
  sections: { title: string; body: string[] }[];
}

export const technologyDetails: TechnologyDetail[] = [
  {
    slug: 'centralised-dispatch',
    label: 'TECHNOLOGY PLATFORM',
    title: 'Centralised Dispatch Architecture',
    subtitle: 'Multi-city fleet routing from a single UK operations centre.',
    image: '/images/tech-fleet-hero.png',
    intro:
      'Bookings, vehicle allocation, and route planning are managed from one centralised dispatch platform covering London, Manchester, Birmingham, Scotland, and regional airport hubs.',
    features: [
      'Single operations centre for UK-wide routing',
      'Live booking and allocation management',
      'Multi-hub coordination',
      'Account manager visibility',
      'Escalation and priority handling',
      'Integrated crew and corporate workflows',
    ],
    sections: [
      {
        title: 'Nationwide Coordination',
        body: [
          'Dispatch teams allocate vehicles across the UK network in real time, ensuring consistent service standards regardless of airport hub or city. Corporate and airline accounts share the same operational backbone.',
        ],
      },
    ],
  },
  {
    slug: 'gps-fleet-tracking',
    label: 'TECHNOLOGY PLATFORM',
    title: 'Real-Time GPS Fleet Tracking',
    subtitle: 'Live vehicle visibility for operations teams and corporate account managers.',
    image: '/images/tech-fleet-saloon.jpg',
    intro:
      'Every active vehicle is GPS-monitored with live position, ETA, and journey status visible to operations staff and authorised account contacts.',
    features: [
      'Live GPS positions across the fleet',
      'ETA and journey status updates',
      'Operations dashboard visibility',
      'Proactive schedule notifications',
      'Hub-level fleet monitoring',
      'Account-level journey tracking',
    ],
    sections: [
      {
        title: 'Live Visibility',
        body: [
          'Corporate clients and operations teams receive real-time updates when vehicles are dispatched, en route, or arrived. This reduces uncertainty for travellers and supports SLA accountability.',
        ],
      },
    ],
  },
  {
    slug: 'passenger-notifications',
    label: 'TECHNOLOGY PLATFORM',
    title: 'Automated Passenger Notifications',
    subtitle: 'SMS and email confirmations with driver details and live ETAs.',
    image: '/images/b2b-executive-concierge.jpg',
    intro:
      'Passengers receive automated booking confirmations, chauffeur contact details, and arrival updates throughout the journey.',
    features: [
      'Booking confirmation messages',
      'Driver name and contact details',
      'Live ETA updates',
      'Delay and schedule change alerts',
      'Corporate-branded communications',
      'Reduced no-show rates',
    ],
    sections: [
      {
        title: 'Traveller Communication',
        body: [
          'Automated messaging keeps passengers informed from booking through arrival. Travel managers spend less time chasing updates, and travellers have confidence in every transfer.',
        ],
      },
    ],
  },
  {
    slug: 'flight-tracking',
    label: 'TECHNOLOGY PLATFORM',
    title: 'Flight Tracking Integration',
    subtitle: 'Live flight data feeds dispatch to adjust pickups for delays and early arrivals.',
    image: '/images/b2b-airline-logistics.jpg',
    intro:
      'Flight data from major UK airports integrates directly with dispatch, automatically adjusting pickup times for airline crew, executive arrivals, and VIP concierge services.',
    features: [
      'Live flight data integration',
      'Automatic pickup time adjustment',
      'Delay and early arrival handling',
      'Airline crew schedule sync',
      'VIP arrival coordination',
      'Reduced manual rebooking',
    ],
    sections: [
      {
        title: 'Schedule Intelligence',
        body: [
          'When flights are delayed or arrive early, dispatch reacts automatically. Chauffeurs and operations teams receive updated instructions without manual intervention from the client.',
        ],
      },
    ],
  },
  {
    slug: 'sla-reporting',
    label: 'TECHNOLOGY PLATFORM',
    title: 'SLA Performance Reporting',
    subtitle: 'Monthly dashboards for on-time rates, service levels, and journey analytics.',
    image: '/images/b2b-fleet-accounts.jpg',
    intro:
      'Corporate accounts receive monthly performance reports covering on-time performance, journey volumes, hub activity, and service-level metrics for procurement review.',
    features: [
      'Monthly SLA dashboards',
      'On-time performance metrics',
      'Journey volume analytics',
      'Hub-level activity reports',
      'Audit-ready procurement data',
      'Contract review support',
    ],
    sections: [
      {
        title: 'Procurement Reporting',
        body: [
          'Travel and procurement teams receive structured data to support contract reviews, budget planning, and service-level discussions. Reports align with corporate governance requirements.',
        ],
      },
    ],
  },
  {
    slug: 'carbon-reporting',
    label: 'TECHNOLOGY PLATFORM',
    title: 'Carbon Footprint Reporting',
    subtitle: 'ESG-ready environmental impact data per billing cycle.',
    image: '/images/sector-corporate.jpg',
    intro:
      'Environmental impact data is compiled per billing cycle, supporting ESG reporting and corporate sustainability programmes for ground transport.',
    features: [
      'Per-journey carbon estimates',
      'Billing-cycle impact reports',
      'ESG procurement support',
      'Sustainability programme data',
      'Ground transport emissions tracking',
      'Corporate reporting exports',
    ],
    sections: [
      {
        title: 'Sustainability Data',
        body: [
          'Organisations tracking ground transport emissions receive journey-level estimates aligned to billing cycles, helping sustainability and procurement teams meet ESG reporting obligations.',
        ],
      },
    ],
  },
  {
    slug: 'executive-saloon-fleet',
    label: 'EXECUTIVE FLEET',
    title: 'Executive Saloon Fleet',
    subtitle: 'Mercedes S-Class and E-Class for corporate airport transfers.',
    image: '/images/tech-fleet-saloon.png',
    intro:
      'The preferred choice for senior executives and business travellers. Premium saloon vehicles maintained to corporate standards with professional chauffeurs across UK aviation hubs.',
    features: [
      'Mercedes S-Class and E-Class',
      '1–3 passengers',
      'Premium leather interior',
      'Airport and city transfers',
      'Wi-Fi on request',
      '24/7 availability',
    ],
    sections: [
      {
        title: 'Corporate Standards',
        body: [
          'Executive saloons are vetted, professionally presented, and operated by trained chauffeurs. Ideal for board-level appointments, airport transfers, and inter-city executive travel.',
        ],
      },
    ],
  },
  {
    slug: 'luxury-mpv-fleet',
    label: 'EXECUTIVE FLEET',
    title: 'Luxury MPV Fleet',
    subtitle: 'Mercedes V-Class for executive teams and group transport.',
    image: '/images/tech-fleet-mpv.jpg',
    intro:
      'Spacious executive MPVs for teams, conference logistics, hotel transfers, and airline crew movements with flexible seating and premium interiors.',
    features: [
      'Mercedes V-Class and premium MPVs',
      'Up to 7 passengers',
      'Conference and team transport',
      'Hotel and crew transfers',
      'Multi-stop itineraries',
      'Luggage capacity for groups',
    ],
    sections: [
      {
        title: 'Group Transport',
        body: [
          'Executive MPVs support airline crew repositioning, conference delegations, and corporate team travel with the same operational standards as our saloon fleet.',
        ],
      },
    ],
  },
  {
    slug: 'vip-chauffeur-fleet',
    label: 'EXECUTIVE FLEET',
    title: 'VIP Chauffeur Fleet',
    subtitle: 'Ultra-premium chauffeur vehicles for discreet executive travel.',
    image: '/images/tech-fleet-vip.jpg',
    intro:
      'First-class ground transport for VIP executives, private aviation connections, and meet-and-greet services with full discretion and concierge coordination.',
    features: [
      'VIP executive transfers',
      'Private aviation FBO connections',
      'Meet & greet services',
      'Discreet chauffeur operations',
      'Board-level travel',
      'Concierge-briefed chauffeurs',
    ],
    sections: [
      {
        title: 'VIP Operations',
        body: [
          'Chauffeurs are briefed on security requirements, passenger preferences, and itinerary details before every VIP journey. Terminal meet-and-greet and FBO connections are coordinated by our concierge desk.',
        ],
      },
    ],
  },
  {
    slug: 'live-fleet-tracking',
    label: 'OPERATIONS PLATFORM',
    title: 'Live Fleet Tracking',
    subtitle: 'GPS monitoring across the active vehicle network.',
    image: '/images/tech-fleet-saloon.jpg',
    intro: 'Real-time GPS monitoring provides live visibility into vehicle positions, ETAs, and journey progress across the UK network.',
    features: ['247+ active vehicles monitored', 'Live route visibility', 'ETA tracking', 'Hub-level oversight'],
    sections: [{ title: 'Platform Module', body: ['Integrated into the SAT Operations Platform for real-time fleet oversight by dispatch and account teams.'] }],
  },
  {
    slug: 'dispatch-management',
    label: 'OPERATIONS PLATFORM',
    title: 'Dispatch Management',
    subtitle: 'Centralised multi-city routing and allocation.',
    image: '/images/tech-fleet-hero.png',
    intro: 'A unified dispatch module coordinates bookings, vehicle allocation, and routing priorities across all UK airport hubs.',
    features: ['Multi-city routing', 'Priority allocation', 'Live dispatch board', 'Crew and corporate queues'],
    sections: [{ title: 'Platform Module', body: ['Dispatch management is the core of nationwide executive logistics operations.'] }],
  },
  {
    slug: 'route-optimisation',
    label: 'OPERATIONS PLATFORM',
    title: 'Route Optimisation',
    subtitle: 'Intelligent scheduling and delay adjustment.',
    image: '/images/b2b-airline-logistics.jpg',
    intro: 'Dynamic scheduling responds to traffic, flight changes, and operational priorities to maintain on-time performance.',
    features: ['Traffic-aware routing', 'Flight-linked rescheduling', 'Delay adjustment', 'Multi-stop optimisation'],
    sections: [{ title: 'Platform Module', body: ['Route optimisation reduces wait times and improves SLA performance across the network.'] }],
  },
];

export function getTechnologyDetail(slug: string): TechnologyDetail | undefined {
  return technologyDetails.find((t) => t.slug === slug);
}

export const techFeatureSlugs: Record<string, string> = {
  'Centralised Dispatch Architecture': 'centralised-dispatch',
  'Real-Time GPS Fleet Tracking': 'gps-fleet-tracking',
  'Automated Passenger Notifications': 'passenger-notifications',
  'Flight Tracking Integration': 'flight-tracking',
  'SLA Performance Reporting': 'sla-reporting',
  'Carbon Footprint Reporting': 'carbon-reporting',
};

export const fleetSlugs: Record<string, string> = {
  'Executive Saloon Fleet': 'executive-saloon-fleet',
  'Luxury MPV Fleet': 'luxury-mpv-fleet',
  'VIP Chauffeur Fleet': 'vip-chauffeur-fleet',
};

export const platformFeatureSlugs: Record<string, string> = {
  'Live Fleet Tracking': 'live-fleet-tracking',
  'Flight Monitoring': 'flight-tracking',
  'Automated Notifications': 'passenger-notifications',
  'Carbon Reporting': 'carbon-reporting',
  'Dispatch Management': 'dispatch-management',
  'Route Optimisation': 'route-optimisation',
};
