'use client';

import Link from 'next/link';
import { ArrowRight, CheckCircle2, Clock, TrendingUp, Users } from 'lucide-react';
import StatCard from '@/components/admin/StatCard';
import StatusBadge from '@/components/admin/StatusBadge';
import { formatLeadDate, getLeadStats } from '@/lib/admin/leadsUtils';
import { useAdminLeads } from '@/lib/admin/storage';
import type { LeadStatus } from '@/lib/admin/types';
import { LEAD_STATUS_LABELS } from '@/lib/admin/types';

const pipeline: LeadStatus[] = ['new', 'contacted', 'qualified', 'closed'];

export default function DashboardView() {
  const { leads, ready, error } = useAdminLeads();

  if (!ready) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center text-sm text-brand-muted">
        Loading dashboard…
      </div>
    );
  }

  const stats = getLeadStats(leads);
  const recent = [...leads].sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt)).slice(0, 5);

  return (
    <div className="space-y-8">
      <div>
        <h2 className="font-display text-2xl font-bold text-brand-navy sm:text-3xl">Dashboard</h2>
        <p className="mt-1 text-sm text-brand-muted">
          Overview of corporate enquiries and pipeline activity.
        </p>
        {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
      </div>

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
        <div className="premium-card p-6 lg:col-span-2">
          <div className="mb-5 flex items-center justify-between gap-4">
            <h3 className="font-display text-lg font-semibold text-brand-navy">Recent Leads</h3>
            <Link
              href="/admin/leads"
              className="inline-flex items-center gap-1 text-sm font-medium text-brand-blue hover:underline"
            >
              View all
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
          <div className="overflow-x-auto">
            {recent.length === 0 ? (
              <p className="py-8 text-center text-sm text-brand-muted">
                No enquiries yet. Submissions from the contact form will appear here.
              </p>
            ) : (
            <table className="w-full min-w-[520px] text-left text-sm">
              <thead>
                <tr className="border-b border-gray-100 text-[11px] font-semibold uppercase tracking-wider text-brand-muted">
                  <th className="pb-3 pr-4">Contact</th>
                  <th className="pb-3 pr-4">Company</th>
                  <th className="pb-3 pr-4">Enquiry</th>
                  <th className="pb-3 pr-4">Status</th>
                  <th className="pb-3">Received</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {recent.map((lead) => (
                  <tr key={lead.id} className="text-brand-text">
                    <td className="py-3.5 pr-4">
                      <p className="font-medium text-brand-navy">{lead.fullName}</p>
                      <p className="text-xs text-brand-muted">{lead.email}</p>
                    </td>
                    <td className="py-3.5 pr-4 text-brand-muted">{lead.companyName}</td>
                    <td className="py-3.5 pr-4 text-brand-muted">{lead.enquiry}</td>
                    <td className="py-3.5 pr-4">
                      <StatusBadge status={lead.status} />
                    </td>
                    <td className="py-3.5 text-xs text-brand-muted">{formatLeadDate(lead.createdAt)}</td>
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
          <ul className="mt-6 space-y-4">
            {pipeline.map((status) => {
              const count = leads.filter((l) => l.status === status).length;
              const pct = stats.total ? Math.round((count / stats.total) * 100) : 0;
              return (
                <li key={status}>
                  <div className="mb-1.5 flex items-center justify-between text-sm">
                    <span className="font-medium text-brand-navy">{LEAD_STATUS_LABELS[status]}</span>
                    <span className="text-brand-muted">
                      {count} ({pct}%)
                    </span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-gray-100">
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
