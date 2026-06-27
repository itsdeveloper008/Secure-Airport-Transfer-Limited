'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import Logo from '@/components/ui/Logo';
import Button from '@/components/ui/Button';

const links = [
  { href: '/', label: 'Home' },
  { href: '/b2b-services', label: 'B2B Services' },
  { href: '/technology-fleet', label: 'Technology & Fleet' },
  { href: '/careers', label: 'Careers' },
  { href: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // Close menu when navigating to a new page
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Lock body scroll while mobile menu is open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const active = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-[110] pt-2 md:pt-2.5 lg:pt-3">
        <div className="zone">
          <nav className="nav-pill relative" aria-label="Main navigation">
            <Link href="/" aria-label="Secure Airport Transfer Limited — Home" className="shrink-0">
              <Logo />
            </Link>

            <ul className="hidden items-center gap-6 xl:gap-10 lg:flex">
              {links.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className={`font-accent text-[13px] font-medium tracking-wide transition-colors duration-300 ${
                      active(l.href) ? 'text-brand-blue' : 'text-brand-navy/65 hover:text-brand-navy'
                    }`}
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="hidden lg:block">
              <Button
                href="/contact"
                variant="blue"
                className="!min-h-[36px] !rounded-full !px-5 !py-1.5 !text-[13px]"
                aria-label="Open corporate account"
              >
                Open Corporate Account
              </Button>
            </div>

            <button
              type="button"
              className="relative z-[1] flex h-11 w-11 shrink-0 touch-manipulation items-center justify-center rounded-full text-brand-navy transition-colors hover:bg-brand-navy/5 lg:hidden"
              onClick={() => setOpen((prev) => !prev)}
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
              aria-controls="mobile-nav-menu"
            >
              {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </nav>
        </div>
      </header>

      {/* Mobile / tablet menu backdrop */}
      <button
        type="button"
        aria-label="Close menu"
        className={`fixed inset-0 z-[100] bg-brand-navy/95 backdrop-blur-md transition-opacity duration-300 lg:hidden ${
          open ? 'visible opacity-100' : 'invisible opacity-0 pointer-events-none'
        }`}
        onClick={() => setOpen(false)}
      />

      {/* Mobile / tablet menu panel */}
      <div
        id="mobile-nav-menu"
        role="dialog"
        aria-modal="true"
        aria-hidden={!open}
        className={`fixed inset-x-0 top-0 z-[105] flex max-h-[100dvh] flex-col overflow-y-auto bg-brand-navy px-6 pb-8 pt-[calc(4.5rem+env(safe-area-inset-top))] shadow-2xl transition-transform duration-300 ease-out lg:hidden ${
          open ? 'translate-y-0' : '-translate-y-full pointer-events-none'
        }`}
      >
        <div className="mb-6 flex items-center justify-between border-b border-white/10 pb-4">
          <span className="font-accent text-[10px] font-semibold uppercase tracking-[0.22em] text-brand-gold">
            Menu
          </span>
          <button
            type="button"
            className="flex h-11 w-11 touch-manipulation items-center justify-center rounded-full text-white hover:bg-white/10"
            onClick={() => setOpen(false)}
            aria-label="Close menu"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <nav className="flex flex-col" aria-label="Mobile navigation">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className={`border-b border-white/10 py-4 font-display text-xl font-semibold sm:text-2xl ${
                active(l.href) ? 'text-brand-blue' : 'text-white'
              }`}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="mt-8">
          <Button href="/contact" variant="gold" className="w-full" aria-label="Open corporate account">
            Open Corporate Account
          </Button>
        </div>
      </div>
    </>
  );
}
