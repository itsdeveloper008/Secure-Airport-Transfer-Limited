import Link from 'next/link';
import { BookOpen } from 'lucide-react';
import Button from '@/components/ui/Button';
import { REGISTERED_OFFICE, REGISTERED_OFFICE_FULL } from '@/lib/constants';

const LOGO_SRC = '/images/satl-logo.png';

const columns = [
  {
    title: 'Services',
    links: [
      { href: '/b2b-services', label: 'Corporate Fleet' },
      { href: '/b2b-services', label: 'Airline Crew' },
      { href: '/b2b-services', label: 'Executive Concierge' },
      { href: '/technology-fleet', label: 'Fleet Management' },
      { href: '/contact', label: 'B2B Quote' },
      { href: '/technology-fleet', label: 'Technology' },
    ],
  },
  {
    title: 'Company',
    links: [
      { href: '/b2b-services', label: 'About Us' },
      { href: '/technology-fleet', label: 'Technology & Fleet' },
      { href: '/careers', label: 'Careers' },
      { href: '/contact', label: 'Contact' },
      { href: '/', label: 'Coverage Network' },
      { href: '/', label: 'Nationwide Ops' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { href: '/privacy-policy', label: 'Privacy Policy' },
      { href: '/terms-of-service', label: 'Terms of Service' },
      { href: '/terms-of-service#company-registration', label: 'Company Registration' },
      { href: '/terms-of-service#insurance-compliance', label: 'Insurance & Compliance' },
      { href: '/contact', label: 'Contact' },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="w-full bg-[#F9FAFB]">
      {/* Top CTA */}
      <div className="zone border-b border-brand-navy/[0.08] py-16 text-center lg:py-20">
        <Link href="/" className="mx-auto inline-block" aria-label="Secure Airport Transfer Limited home">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={LOGO_SRC}
            alt="Secure Airport Transfer Limited"
            width={320}
            height={320}
            className="mx-auto block rounded-md object-contain"
            style={{ height: 72, width: 'auto', maxWidth: 'min(100%, 280px)' }}
          />
        </Link>

        <h2 className="mx-auto mt-8 max-w-2xl font-display text-3xl font-bold tracking-tight text-brand-navy md:text-4xl lg:text-[2.75rem] lg:leading-tight">
          Ready to streamline corporate travel?
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-base text-brand-muted md:text-lg">
          Open a corporate account or request a tailored B2B quote. Nationwide executive
          ground transport across every major UK airport hub.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/b2b-services"
            className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-xl border border-brand-navy/15 bg-white px-5 py-3 text-sm font-semibold text-brand-navy shadow-sm transition-all duration-300 hover:border-brand-navy/25 hover:bg-brand-gray"
          >
            <BookOpen className="h-[18px] w-[18px]" aria-hidden="true" />
            B2B Services
          </Link>
          <Button href="/contact" variant="blue" className="shadow-[0_8px_24px_rgba(37,99,235,0.28)]">
            Open Corporate Account
          </Button>
        </div>
      </div>

      {/* Link grid */}
      <div className="zone py-14 lg:py-16">
        <div className="grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-x-8">
          {columns.map((col) => (
            <div key={col.title}>
              <h3 className="font-accent text-xs font-semibold uppercase tracking-[0.16em] text-brand-muted">
                {col.title}
              </h3>
              <ul className="mt-4 space-y-3">
                {col.links.map((link) => (
                  <li key={`${col.title}-${link.label}`}>
                    <Link
                      href={link.href}
                      className="text-sm font-semibold text-brand-navy transition-colors duration-200 hover:text-brand-blue"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h3 className="font-accent text-xs font-semibold uppercase tracking-[0.16em] text-brand-muted">
              Registered Office
            </h3>
            <address className="mt-4 not-italic text-sm font-semibold leading-relaxed text-brand-navy">
              {REGISTERED_OFFICE.line1}
              <br />
              {REGISTERED_OFFICE.line2}
              <br />
              {REGISTERED_OFFICE.line3}
            </address>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-brand-navy/[0.08]">
        <div className="zone grid grid-cols-1 items-center gap-4 py-6 sm:grid-cols-3">
          <Link
            href="/"
            className="flex items-center justify-center sm:justify-start"
            aria-label="Secure Airport Transfer Limited home"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={LOGO_SRC}
              alt="Secure Airport Transfer Limited"
              width={320}
              height={320}
              className="block max-w-none rounded-md object-contain"
              style={{ height: 40, width: 'auto' }}
            />
          </Link>

          <p className="text-center text-sm text-brand-muted">
            Designed by{' '}
            <a
              href="https://onixs.ai/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-brand-navy underline decoration-brand-navy/30 underline-offset-2 transition-colors hover:text-brand-blue hover:decoration-brand-blue"
            >
              Onixs.ai
            </a>
          </p>

          <p className="text-center text-sm text-brand-muted sm:text-right">
            © {new Date().getFullYear()} Secure Airport Transfer Limited. All rights reserved.
            <span className="mt-1 block text-xs">{REGISTERED_OFFICE_FULL}</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
