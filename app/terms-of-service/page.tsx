import Link from 'next/link';
import PageHero from '@/components/layout/PageHero';
import { COMPANY_LEGAL, REGISTERED_OFFICE, REGISTERED_OFFICE_FULL } from '@/lib/constants';

export const metadata = {
  title: 'Terms of Service | Secure Airport Transfer Limited',
  description:
    'Terms of service for corporate ground transport, B2B accounts, and nationwide airport transfer services.',
};

const sections = [
  {
    id: 'agreement',
    title: '1. Agreement',
    body: [
      'These Terms of Service govern the use of services provided by Secure Airport Transfer Limited ("SATL", "we", "us") to corporate clients, travel managers, airline operators, and authorised business representatives.',
      'By opening a corporate account, requesting a B2B quote, or using our services, you agree to these terms on behalf of your organisation.',
    ],
  },
  {
    id: 'services',
    title: '2. Services',
    body: [
      'SATL provides executive airport transfers, airline crew logistics, corporate fleet accounts, and related nationwide ground transport services across major UK airport hubs.',
      'Service availability, vehicle allocation, and routing are subject to operational capacity, airport regulations, and confirmed booking instructions.',
    ],
  },
  {
    id: 'bookings',
    title: '3. Bookings & Accounts',
    body: [
      'Corporate accounts must be opened and approved before invoiced or contracted services commence unless otherwise agreed in writing.',
      'Clients are responsible for providing accurate passenger details, flight information, pickup locations, and authorised billing contacts.',
      'SATL reserves the right to decline or cancel bookings that present safety, compliance, or credit risks.',
    ],
  },
  {
    id: 'pricing',
    title: '4. Pricing & Payment',
    body: [
      'Quoted rates, account tariffs, and service fees are confirmed in writing as part of account setup or quote acceptance.',
      'Waiting time, additional stops, out-of-hours requests, and route changes may incur supplementary charges in line with the agreed rate card.',
      'Invoices are payable within the agreed corporate payment terms. Late payment may result in account suspension.',
    ],
  },
  {
    id: 'cancellations',
    title: '5. Cancellations & Changes',
    body: [
      'Cancellations and amendments must be submitted through the agreed corporate channel within the notice period specified in your account terms.',
      'Short-notice cancellations or no-shows may be chargeable in full where a vehicle and driver have been dispatched.',
    ],
  },
  {
    id: 'liability',
    title: '6. Liability',
    body: [
      'SATL maintains appropriate commercial insurance for its operations. Liability is limited to the extent permitted by applicable law and the terms of your corporate agreement.',
      'We are not liable for delays caused by traffic, weather, airport disruption, security procedures, or other events outside reasonable operational control.',
    ],
  },
  {
    id: 'company-registration',
    title: '7. Company Registration',
    body: [COMPANY_LEGAL],
  },
  {
    id: 'insurance-compliance',
    title: '8. Insurance & Compliance',
    body: [
      'SATL operates as a UK-registered private limited company and maintains commercial insurance appropriate to corporate ground transport operations.',
      'Fleet partners and drivers engaged on SATL bookings are required to meet applicable licensing, insurance, and operational standards.',
      'Corporate clients may request compliance documentation as part of procurement or onboarding.',
    ],
  },
  {
    id: 'contact',
    title: '9. Contact',
    body: [
      'For contractual, operational, or compliance enquiries, contact our corporate operations team via the Contact page or email operations@secureairporttransfer.co.uk.',
    ],
  },
];

export default function TermsOfServicePage() {
  return (
    <>
      <PageHero
        label="Legal"
        title="Terms of Service"
        subtitle="Corporate ground transport terms for B2B accounts, airline logistics, and nationwide airport operations."
        backgroundImage="/images/sector-corporate.jpg"
      />

      <section className="section-block w-full bg-brand-white">
        <div className="zone mx-auto max-w-3xl">
          <p className="text-sm leading-relaxed text-brand-muted">
            Last updated: {new Date().toLocaleDateString('en-GB', { month: 'long', year: 'numeric' })}
          </p>

          <div className="mt-10 space-y-10">
            {sections.map((section) => (
              <article key={section.id} id={section.id} className="scroll-mt-28">
                <h2 className="font-display text-xl font-semibold text-brand-navy">{section.title}</h2>
                <div className="mt-4 space-y-3">
                  {section.body.map((paragraph) => (
                    <p key={paragraph} className="text-sm leading-relaxed text-brand-muted">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </article>
            ))}
          </div>

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

          <p className="mt-10 text-sm text-brand-muted">
            See also our{' '}
            <Link href="/privacy-policy" className="font-medium text-brand-blue hover:underline">
              Privacy Policy
            </Link>
            .
          </p>
        </div>
      </section>
    </>
  );
}
