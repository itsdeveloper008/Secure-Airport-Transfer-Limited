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

  useEffect(() => {
    setOpen(false);
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open, pathname]);

  const active = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 pt-2 lg:pt-3">
        <div className="zone">
          <nav className="nav-pill" aria-label="Main navigation">
            <Link href="/" aria-label="Secure Airport Transfer Limited — Home" className="shrink-0">
              <Logo height={68} />
            </Link>

            <ul className="hidden items-center gap-8 xl:gap-10 lg:flex">
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
                className="!min-h-[42px] !rounded-full !px-6 !py-2 !text-[13px]"
                aria-label="Open corporate account"
              >
                Open Corporate Account
              </Button>
            </div>

            <button
              type="button"
              className="flex h-10 w-10 items-center justify-center rounded-full text-brand-navy lg:hidden"
              onClick={() => setOpen(!open)}
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </nav>
        </div>
      </header>

      <div
        className={`fixed inset-0 z-40 bg-brand-navy/98 backdrop-blur-xl transition-all duration-500 lg:hidden ${
          open ? 'visible opacity-100' : 'invisible opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex h-full flex-col px-8 pt-28">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`border-b border-white/10 py-5 font-display text-2xl font-semibold ${
                active(l.href) ? 'text-brand-blue' : 'text-white'
              }`}
            >
              {l.label}
            </Link>
          ))}
          <div className="mt-auto pb-10">
            <Button href="/contact" variant="gold" className="w-full" aria-label="Open corporate account">
              Open Corporate Account
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
