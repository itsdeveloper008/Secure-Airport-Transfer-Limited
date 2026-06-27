export type LeadStatus = 'new' | 'contacted' | 'qualified' | 'closed';

export interface Lead {
  id: string;
  fullName: string;
  jobTitle: string;
  companyName: string;
  email: string;
  phone: string;
  spend: string;
  enquiry: string;
  hubs: string[];
  details: string;
  status: LeadStatus;
  createdAt: string;
}

export interface SeoSettings {
  siteTitle: string;
  siteDescription: string;
  siteKeywords: string;
  siteUrl: string;
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
  twitterCard: 'summary' | 'summary_large_image';
  robotsIndex: boolean;
}

export interface AdminSettings {
  companyName: string;
  operationsEmail: string;
  notifyNewLeads: boolean;
  notifyWeeklyDigest: boolean;
  autoReplyEnabled: boolean;
  autoReplyMessage: string;
  defaultAssignee: string;
  seo: SeoSettings;
}

export const LEAD_STATUS_LABELS: Record<LeadStatus, string> = {
  new: 'New',
  contacted: 'Contacted',
  qualified: 'Qualified',
  closed: 'Closed',
};

export const DEFAULT_SETTINGS: AdminSettings = {
  companyName: 'Secure Airport Transfer Limited',
  operationsEmail: 'operations@secureairporttransfer.co.uk',
  notifyNewLeads: true,
  notifyWeeklyDigest: true,
  autoReplyEnabled: true,
  autoReplyMessage:
    'Thank you for your enquiry. Our corporate accounts team will respond within 4 business hours.',
  defaultAssignee: 'Corporate Accounts Team',
  seo: {
    siteTitle: 'Secure Airport Transfer Limited | Nationwide Corporate Ground Transport',
    siteDescription:
      'Premium executive airport transfers and corporate ground transport logistics across all major UK airports. B2B fleet accounts, airline crew logistics, and 24/7 nationwide coverage.',
    siteKeywords:
      'corporate airport transfer UK, executive chauffeur, airline crew logistics, fleet management, B2B ground transport',
    siteUrl: '',
    ogTitle: 'Secure Airport Transfer Limited',
    ogDescription: 'Nationwide executive travel and corporate ground transport logistics.',
    ogImage: '/images/satl-logo.png',
    twitterCard: 'summary_large_image',
    robotsIndex: true,
  },
};

export type CreateLeadInput = Omit<Lead, 'id' | 'status' | 'createdAt'>;
