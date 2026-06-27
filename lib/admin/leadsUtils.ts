import type { Lead } from '@/lib/admin/types';

export function getLeadStats(leads: Lead[]) {
  const now = new Date();
  const weekAgo = new Date(now);
  weekAgo.setDate(weekAgo.getDate() - 7);

  return {
    total: leads.length,
    newThisWeek: leads.filter((l) => new Date(l.createdAt) >= weekAgo).length,
    pending: leads.filter((l) => l.status === 'new' || l.status === 'contacted').length,
    qualified: leads.filter((l) => l.status === 'qualified').length,
    closed: leads.filter((l) => l.status === 'closed').length,
  };
}

export function formatLeadDate(iso: string) {
  return new Intl.DateTimeFormat('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(iso));
}
