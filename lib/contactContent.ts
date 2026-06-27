import { AIRPORT_HUBS } from '@/lib/constants';

export const CONTACT_EMAIL = 'operations@secureairporttransfer.co.uk';

export const REGISTERED_OFFICE = {
  line1: 'Apex House, 2nd Floor, Office 2a',
  line2: 'Grand Arcade, North Finchley',
  line3: 'London, England, N12 0EH',
};

export const CONTACT_INFO_CARDS = [
  {
    title: 'Corporate Operations',
    email: CONTACT_EMAIL,
    detail: '24/7 Operations Centre',
  },
  {
    title: 'Registered Office',
    address: REGISTERED_OFFICE,
  },
  {
    title: 'Response Time',
    detail:
      'Corporate enquiries are responded to within 4 business hours. Urgent operational queries are handled 24/7.',
  },
] as const;

export const FORM_HEADING = 'Get in Touch';
export const FORM_SUBTITLE =
  'Open a corporate account or request a B2B quote. Our team works exclusively with businesses, travel managers, and airline operators.';

export const FORM_STEPS = [
  {
    title: 'Your details',
    description: 'Tell us about you and your organisation.',
  },
  {
    title: 'Contact & requirements',
    description: 'How can we reach you, and what service do you need?',
  },
  {
    title: 'Airports & message',
    description: 'Which UK airport hubs do you require coverage for?',
  },
] as const;

export const FORM_FIELDS = {
  fullName: {
    label: 'Full name',
    placeholder: 'e.g. Sarah Mitchell',
  },
  jobTitle: {
    label: 'Job title',
    placeholder: 'e.g. Travel Manager',
  },
  companyName: {
    label: 'Company name',
    placeholder: 'Your organisation name',
  },
  email: {
    label: 'Business email',
    placeholder: 'name@company.co.uk',
  },
  phone: {
    label: 'Phone number',
    placeholder: '+44 20 0000 0000',
  },
  spend: {
    label: 'Estimated monthly travel spend',
    placeholder: 'Select monthly spend',
  },
  enquiry: {
    label: 'Nature of enquiry',
    placeholder: 'Select enquiry type',
  },
  hubs: {
    label: 'Primary airport hubs',
    hint: 'Select all hubs relevant to your operations.',
  },
  details: {
    label: 'Additional details',
    placeholder:
      'Tell us about your travel requirements, fleet size, routes, or any operational needs…',
  },
} as const;

export const SPEND_OPTIONS = [
  'Under £2,000',
  '£2,000–£5,000',
  '£5,000–£15,000',
  '£15,000–£50,000',
  'Over £50,000',
] as const;

export const ENQUIRY_OPTIONS = [
  'Open Corporate Account',
  'Request B2B Quote',
  'Corporate Fleet Accounts',
  'Airline & Crew Logistics',
  'Executive Airport Concierge',
  'Fleet Management Partnership',
  'Other',
] as const;

export const HUB_OPTIONS = AIRPORT_HUBS.map((hub) => ({
  code: hub.code,
  name: hub.name,
}));

export const FORM_SUCCESS = {
  title: 'Enquiry Received',
  body: 'Thank you for contacting Secure Airport Transfer Limited. Our corporate accounts team will respond within 4 business hours.',
  urgent: 'For urgent operational queries, email',
} as const;
