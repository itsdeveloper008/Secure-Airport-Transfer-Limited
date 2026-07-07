import Link from 'next/link';
import PageHero from '@/components/layout/PageHero';
import LegalDocument from '@/components/layout/LegalDocument';
import { CONTACT_EMAIL } from '@/lib/contactContent';
import { REGISTERED_OFFICE, REGISTERED_OFFICE_FULL } from '@/lib/constants';
import type { LegalSection } from '@/lib/legalSections';

export const metadata = {
  title: 'Privacy Policy | Secure Airport Transfer Limited',
  description:
    'How Secure Airport Transfer Limited collects, uses, and protects corporate enquiry and account information.',
};

const sections: LegalSection[] = [
  {
    id: 'who-we-are',
    title: '1. Who We Are',
    body: [
      `Secure Airport Transfer Limited is a UK private limited company. Registered office: ${REGISTERED_OFFICE_FULL}.`,
      'We provide corporate ground transport services to businesses, travel managers, and airline operators.',
    ],
  },
  {
    id: 'information-we-collect',
    title: '2. Information We Collect',
    body: [
      'When you submit a corporate enquiry or open an account, we may collect your name, job title, company name, business email, UK phone number, service requirements, airport hubs, and any additional details you provide.',
      'We may also collect operational data necessary to deliver bookings, including passenger names, flight details, and pickup locations.',
    ],
  },
  {
    id: 'how-we-use-information',
    title: '3. How We Use Information',
    body: [
      'We use your information to respond to enquiries, set up corporate accounts, deliver transport services, manage billing, and maintain operational records.',
      'We may contact you regarding account setup, service updates, or operational matters relevant to your organisation.',
    ],
  },
  {
    id: 'legal-basis',
    title: '4. Legal Basis',
    body: [
      'We process personal data where necessary to perform a contract, pursue legitimate business interests in operating corporate transport services, comply with legal obligations, or with your consent where required.',
    ],
  },
  {
    id: 'data-sharing',
    title: '5. Data Sharing',
    body: [
      'We share information only where necessary to deliver services, including with vetted fleet partners, payment processors, and technology providers supporting dispatch and account management.',
      'We do not sell personal data to third parties.',
    ],
  },
  {
    id: 'data-retention',
    title: '6. Data Retention',
    body: [
      'Enquiry and account records are retained for as long as needed to manage the business relationship, meet legal obligations, and resolve disputes.',
    ],
  },
  {
    id: 'your-rights',
    title: '7. Your Rights',
    body: [
      'Under UK data protection law, you may have rights to access, correct, erase, restrict, or object to certain processing of your personal data, and to lodge a complaint with the Information Commissioner\'s Office (ICO).',
      `To exercise your rights, contact ${CONTACT_EMAIL}.`,
    ],
  },
  {
    id: 'security',
    title: '8. Security',
    body: [
      'We apply appropriate technical and organisational measures to protect personal and corporate data against unauthorised access, loss, or misuse.',
    ],
  },
];

export default function PrivacyPolicyPage() {
  return (
    <>
      <PageHero
        label="Legal"
        title="Privacy Policy"
        subtitle="How we collect, use, and protect information submitted through corporate enquiries and accounts."
        backgroundImage="/images/sector-corporate.jpg"
      />

      <LegalDocument
        sections={sections}
        intro={
          <p className="text-sm leading-relaxed text-brand-muted">
            Last updated: {new Date().toLocaleDateString('en-GB', { month: 'long', year: 'numeric' })}
          </p>
        }
        afterSections={
          <>
            <div className="premium-card mt-12 p-8">
              <h3 className="font-display text-lg font-semibold text-brand-navy">Registered Office</h3>
              <address className="mt-3 not-italic text-sm leading-relaxed text-brand-muted">
                {REGISTERED_OFFICE.line1}
                <br />
                {REGISTERED_OFFICE.line2}
                <br />
                {REGISTERED_OFFICE.line3}
              </address>
            </div>

            <p className="mt-10 text-sm text-brand-muted">
              See also our{' '}
              <Link href="/terms-of-service" className="font-medium text-brand-blue hover:underline">
                Terms of Service
              </Link>
              .
            </p>
          </>
        }
      />
    </>
  );
}
