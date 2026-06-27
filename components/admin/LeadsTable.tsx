'use client';

import { useMemo, useState } from 'react';
import { Mail, Phone, Search, X } from 'lucide-react';
import StatusBadge from '@/components/admin/StatusBadge';
import { formatLeadDate } from '@/lib/admin/leadsUtils';
import { useAdminLeads } from '@/lib/admin/storage';
import type { Lead, LeadStatus } from '@/lib/admin/types';
import { LEAD_STATUS_LABELS } from '@/lib/admin/types';

const filters: Array<LeadStatus | 'all'> = ['all', 'new', 'contacted', 'qualified', 'closed'];

export default function LeadsTable() {
  const { leads, ready, error, updateStatus } = useAdminLeads();
  const [query, setQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<LeadStatus | 'all'>('all');
  const [selected, setSelected] = useState<Lead | null>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return leads
      .filter((l) => statusFilter === 'all' || l.status === statusFilter)
      .filter(
        (l) =>
          !q ||
          l.fullName.toLowerCase().includes(q) ||
          l.companyName.toLowerCase().includes(q) ||
          l.email.toLowerCase().includes(q) ||
          l.enquiry.toLowerCase().includes(q),
      )
      .sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt));
  }, [leads, query, statusFilter]);

  if (!ready) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center text-sm text-brand-muted">
        Loading leads…
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display text-2xl font-bold text-brand-navy sm:text-3xl">Leads</h2>
        <p className="mt-1 text-sm text-brand-muted">
          Corporate enquiries submitted via the website contact form.
        </p>
        {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative max-w-md flex-1">
          <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-brand-muted" aria-hidden="true" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search name, company, email…"
            className="w-full rounded-xl border border-gray-200 bg-white py-2.5 pl-11 pr-4 text-sm text-brand-text placeholder:text-brand-muted focus:border-brand-blue focus:outline-none focus:ring-2 focus:ring-brand-blue/20"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {filters.map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setStatusFilter(f)}
              className={`rounded-full border px-3 py-1.5 text-xs font-semibold uppercase tracking-wide transition-colors ${
                statusFilter === f
                  ? 'border-brand-navy bg-brand-navy text-white'
                  : 'border-gray-200 bg-white text-brand-muted hover:border-gray-300'
              }`}
            >
              {f === 'all' ? 'All' : LEAD_STATUS_LABELS[f]}
            </button>
          ))}
        </div>
      </div>

      <div className="premium-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead className="border-b border-gray-100 bg-gray-50/80">
              <tr className="text-[11px] font-semibold uppercase tracking-wider text-brand-muted">
                <th className="px-5 py-3.5">Contact</th>
                <th className="px-5 py-3.5">Company</th>
                <th className="px-5 py-3.5">Enquiry</th>
                <th className="px-5 py-3.5">Spend</th>
                <th className="px-5 py-3.5">Status</th>
                <th className="px-5 py-3.5">Received</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.map((lead) => (
                <tr
                  key={lead.id}
                  onClick={() => setSelected(lead)}
                  className="cursor-pointer transition-colors hover:bg-blue-50/40"
                >
                  <td className="px-5 py-4">
                    <p className="font-medium text-brand-navy">{lead.fullName}</p>
                    <p className="text-xs text-brand-muted">{lead.jobTitle}</p>
                  </td>
                  <td className="px-5 py-4 text-brand-muted">{lead.companyName}</td>
                  <td className="px-5 py-4 text-brand-muted">{lead.enquiry}</td>
                  <td className="px-5 py-4 text-brand-muted">{lead.spend}</td>
                  <td className="px-5 py-4">
                    <StatusBadge status={lead.status} />
                  </td>
                  <td className="px-5 py-4 text-xs text-brand-muted">{formatLeadDate(lead.createdAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && (
          <p className="px-5 py-10 text-center text-sm text-brand-muted">
            {leads.length === 0
              ? 'No enquiries yet. Submit the contact form on the website to see leads here.'
              : 'No leads match your search.'}
          </p>
        )}
      </div>

      {selected && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 p-4 sm:items-center">
          <div
            className="absolute inset-0"
            onClick={() => setSelected(null)}
            aria-hidden="true"
          />
          <div className="relative max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl border border-gray-200 bg-white shadow-2xl">
            <div className="flex items-start justify-between border-b border-gray-100 px-6 py-5">
              <div>
                <h3 className="font-display text-xl font-bold text-brand-navy">{selected.fullName}</h3>
                <p className="text-sm text-brand-muted">
                  {selected.jobTitle} · {selected.companyName}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setSelected(null)}
                className="rounded-lg p-1.5 text-brand-muted hover:bg-gray-100"
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-5 px-6 py-5">
              <div className="flex flex-wrap gap-3">
                <a
                  href={`mailto:${selected.email}`}
                  className="inline-flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-sm text-brand-navy hover:border-brand-blue"
                >
                  <Mail className="h-4 w-4" aria-hidden="true" />
                  {selected.email}
                </a>
                <a
                  href={`tel:${selected.phone}`}
                  className="inline-flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-sm text-brand-navy hover:border-brand-blue"
                >
                  <Phone className="h-4 w-4" aria-hidden="true" />
                  {selected.phone}
                </a>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-brand-muted">Enquiry</p>
                  <p className="mt-1 text-brand-navy">{selected.enquiry}</p>
                </div>
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-brand-muted">Spend</p>
                  <p className="mt-1 text-brand-navy">{selected.spend}</p>
                </div>
              </div>

              <div>
                <p className="text-[11px] font-semibold uppercase tracking-wider text-brand-muted">Airport hubs</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {selected.hubs.map((hub) => (
                    <span
                      key={hub}
                      className="rounded-full border border-gray-200 bg-gray-50 px-2.5 py-0.5 text-xs font-medium text-brand-navy"
                    >
                      {hub}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-[11px] font-semibold uppercase tracking-wider text-brand-muted">Message</p>
                <p className="mt-2 text-sm leading-relaxed text-brand-muted">{selected.details}</p>
              </div>

              <div>
                <p className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-brand-muted">
                  Update status
                </p>
                <div className="flex flex-wrap gap-2">
                  {(Object.keys(LEAD_STATUS_LABELS) as LeadStatus[]).map((status) => (
                    <button
                      key={status}
                      type="button"
                      onClick={() => {
                        updateStatus(selected.id, status);
                        setSelected({ ...selected, status });
                      }}
                      className={`rounded-full border px-3 py-1.5 text-xs font-semibold uppercase tracking-wide transition-colors ${
                        selected.status === status
                          ? 'border-brand-blue bg-brand-blue text-white'
                          : 'border-gray-200 bg-white text-brand-muted hover:border-gray-300'
                      }`}
                    >
                      {LEAD_STATUS_LABELS[status]}
                    </button>
                  ))}
                </div>
              </div>

              <p className="text-xs text-brand-muted">Received {formatLeadDate(selected.createdAt)}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
