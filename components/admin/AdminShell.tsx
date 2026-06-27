'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  ExternalLink,
  LayoutDashboard,
  Menu,
  Settings,
  Users,
  X,
} from 'lucide-react';
import { useState } from 'react';
import Logo from '@/components/ui/Logo';

const navItems = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard, exact: true },
  { href: '/admin/leads', label: 'Leads', icon: Users, exact: false },
  { href: '/admin/settings', label: 'Settings', icon: Settings, exact: false },
];

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (href: string, exact: boolean) =>
    exact ? pathname === href : pathname.startsWith(href);

  const sidebar = (
    <aside className="flex h-full flex-col border-r border-white/10 bg-brand-navy">
      <div className="border-b border-white/10 px-5 py-5">
        <Link href="/admin" className="block" onClick={() => setMobileOpen(false)}>
          <div className="rounded-xl bg-white px-3 py-2.5">
            <Logo />
          </div>
        </Link>
        <p className="mt-3 font-accent text-[10px] font-semibold uppercase tracking-[0.22em] text-brand-gold">
          Admin Console
        </p>
      </div>

      <nav className="flex-1 space-y-1 px-3 py-4" aria-label="Admin navigation">
        {navItems.map((item) => {
          const active = isActive(item.href, item.exact);
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${
                active
                  ? 'bg-brand-blue text-white shadow-[0_4px_16px_rgba(37,99,235,0.35)]'
                  : 'text-white/65 hover:bg-white/5 hover:text-white'
              }`}
            >
              <Icon className="h-[18px] w-[18px] shrink-0" aria-hidden="true" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-white/10 p-4">
        <Link
          href="/"
          className="flex items-center gap-2 rounded-xl border border-white/15 px-3 py-2.5 text-sm text-white/70 transition-colors hover:border-white/30 hover:text-white"
        >
          <ExternalLink className="h-4 w-4" aria-hidden="true" />
          View public site
        </Link>
      </div>
    </aside>
  );

  return (
    <div className="min-h-screen bg-[#eef1f5]">
      <div className="flex min-h-screen">
        <div className="hidden w-64 shrink-0 lg:block">{sidebar}</div>

        <div
          className={`fixed inset-0 z-50 lg:hidden ${
            mobileOpen ? 'visible' : 'invisible pointer-events-none'
          }`}
        >
          <button
            type="button"
            className={`absolute inset-0 bg-black/50 transition-opacity ${
              mobileOpen ? 'opacity-100' : 'opacity-0'
            }`}
            onClick={() => setMobileOpen(false)}
            aria-label="Close menu"
          />
          <div
            className={`absolute inset-y-0 left-0 w-64 transition-transform ${
              mobileOpen ? 'translate-x-0' : '-translate-x-full'
            }`}
          >
            {sidebar}
          </div>
        </div>

        <div className="flex min-w-0 flex-1 flex-col">
          <header className="sticky top-0 z-40 flex items-center justify-between border-b border-gray-200/80 bg-white/90 px-4 py-3 backdrop-blur-md sm:px-6 lg:px-8">
            <div className="flex items-center gap-3">
              <button
                type="button"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 text-brand-navy lg:hidden"
                onClick={() => setMobileOpen((o) => !o)}
                aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              >
                {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
              <div>
                <p className="font-accent text-[10px] font-semibold uppercase tracking-[0.2em] text-brand-muted">
                  Secure Airport Transfer
                </p>
                <h1 className="font-display text-lg font-bold text-brand-navy sm:text-xl">
                  Operations Admin
                </h1>
              </div>
            </div>
            <div className="hidden items-center gap-3 sm:flex">
              <span className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">
                Live
              </span>
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-navy text-xs font-bold text-white">
                SA
              </div>
            </div>
          </header>

          <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8 lg:py-8">{children}</main>
        </div>
      </div>
    </div>
  );
}
