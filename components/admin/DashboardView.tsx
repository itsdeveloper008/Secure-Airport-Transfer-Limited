'use client';

import Link from 'next/link';
import { ArrowRight, CheckCircle2, Clock, RefreshCw, TrendingUp, Users } from 'lucide-react';
import StatCard from '@/components/admin/StatCard';
import StatusBadge from '@/components/admin/StatusBadge';
import { formatLeadDate, getLeadStats } from '@/lib/admin/leadsUtils';
import { useAdminLeads } from '@/lib/admin/storage';
import type { LeadStatus } from '@/lib/admin/types';
import { LEAD_STATUS_LABELS } from '@/lib/admin/types';

const pipeline: LeadStatus[] = ['new', 'contacted', 'qualified', 'closed'];

export default function DashboardView() {
  const { leads, ready, error, refresh } = useAdminLeads();

  if (!ready) {
    return (
      <div className="space-y-6">
        <div className="h-10 w-48 animate-pulse rounded-lg bg-gray-100" />
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-28 animate-pulse rounded-2xl bg-gray-100" />
          ))}
        </div>
        <div className="h-64 animate-pulse rounded-2xl bg-gray-100" />
      </div>
    );
  }

  const stats = getLeadStats(leads);
  const recent = [...leads].sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt)).slice(0, 5);

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h2 className="font-display text-2xl font-bold text-brand-navy sm:text-3xl">Dashboard</h2>
          <p className="mt-1 text-sm text-brand-muted">
            Overview of corporate enquiries and pipeline activity.
          </p>
        </div>
        <button
          type="button"
          onClick={() => refresh()}
          className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-semibold text-brand-navy transition-colors hover:border-brand-blue hover:text-brand-blue"
        >
          <RefreshCw className="h-4 w-4" aria-hidden="true" />
          Refresh
        </button>
      </div>

      {error && (
        <div className="flex flex-col gap-3 rounded-2xl border border-red-200 bg-red-50 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-red-700">{error}</p>
          <button
            type="button"
            onClick={() => refresh()}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700"
          >
            <RefreshCw className="h-4 w-4" aria-hidden="true" />
            Try again
          </button>
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Total Leads" value={stats.total} hint="All time" icon={Users} accent="blue" />
        <StatCard
          label="New This Week"
          value={stats.newThisWeek}
          hint="Last 7 days"
          icon={TrendingUp}
          accent="emerald"
        />
        <StatCard
          label="Pending"
          value={stats.pending}
          hint="New & contacted"
          icon={Clock}
          accent="gold"
        />
        <StatCard
          label="Qualified"
          value={stats.qualified}
          hint="Ready to convert"
          icon={CheckCircle2}
          accent="violet"
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="premium-card overflow-hidden lg:col-span-2">
          <div className="flex items-center justify-between gap-4 border-b border-gray-100 px-6 py-5">
            <div>
              <h3 className="font-display text-lg font-semibold text-brand-navy">Recent Leads</h3>
              <p className="text-sm text-brand-muted">Latest corporate enquiries</p>
            </div>
            <Link
              href="/admin/leads"
              className="inline-flex items-center gap-1 rounded-lg bg-brand-blue/10 px-3 py-2 text-sm font-semibold text-brand-blue transition-colors hover:bg-brand-blue/15"
            >
              View all
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>

          <div className="overflow-x-auto">
            {recent.length === 0 ? (
              <div className="px-6 py-12 text-center">
                <p className="text-sm font-medium text-brand-navy">No enquiries yet</p>
                <p className="mt-2 text-sm text-brand-muted">
                  Submissions from the contact form will appear here automatically.
                </p>
                <Link
                  href="/contact"
                  target="_blank"
                  className="mt-4 inline-flex text-sm font-semibold text-brand-blue hover:underline"
                >
                  Open contact form
                </Link>
              </div>
            ) : (
              <table className="w-full min-w-[520px] text-left text-sm">
                <thead>
                  <tr className="border-b border-gray-100 bg-gray-50/80 text-[11px] font-semibold uppercase tracking-wider text-brand-muted">
                    <th className="px-6 py-3.5">Contact</th>
                    <th className="px-6 py-3.5">Company</th>
                    <th className="px-6 py-3.5">Enquiry</th>
                    <th className="px-6 py-3.5">Status</th>
                    <th className="px-6 py-3.5">Received</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {recent.map((lead) => (
                    <tr key={lead.id} className="text-brand-text transition-colors hover:bg-blue-50/40">
                      <td className="px-6 py-4">
                        <p className="font-medium text-brand-navy">{lead.fullName}</p>
                        <p className="text-xs text-brand-muted">{lead.email}</p>
                      </td>
                      <td className="px-6 py-4 text-brand-muted">{lead.companyName}</td>
                      <td className="px-6 py-4 text-brand-muted">{lead.enquiry}</td>
                      <td className="px-6 py-4">
                        <StatusBadge status={lead.status} />
                      </td>
                      <td className="px-6 py-4 text-xs text-brand-muted">{formatLeadDate(lead.createdAt)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>

        <div className="premium-card p-6">
          <h3 className="font-display text-lg font-semibold text-brand-navy">Pipeline</h3>
          <p className="mt-1 text-sm text-brand-muted">Leads by stage</p>
          <ul className="mt-6 space-y-5">
            {pipeline.map((status) => {
              const count = leads.filter((l) => l.status === status).length;
              const pct = stats.total ? Math.round((count / stats.total) * 100) : 0;
              return (
                <li key={status}>
                  <div className="mb-2 flex items-center justify-between text-sm">
                    <span className="font-medium text-brand-navy">{LEAD_STATUS_LABELS[status]}</span>
                    <span className="text-brand-muted">
                      {count} ({pct}%)
                    </span>
                  </div>
                  <div className="h-2.5 overflow-hidden rounded-full bg-gray-100">
                    <div
                      className="h-full rounded-full bg-brand-blue transition-all duration-500"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}
