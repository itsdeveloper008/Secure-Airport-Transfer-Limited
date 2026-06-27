import type { LeadStatus } from '@/lib/admin/types';
import { LEAD_STATUS_LABELS } from '@/lib/admin/types';

const styles: Record<LeadStatus, string> = {
  new: 'border-sky-200 bg-sky-50 text-sky-700',
  contacted: 'border-amber-200 bg-amber-50 text-amber-800',
  qualified: 'border-violet-200 bg-violet-50 text-violet-700',
  closed: 'border-gray-200 bg-gray-100 text-gray-600',
};

export default function StatusBadge({ status }: { status: LeadStatus }) {
  return (
    <span
      className={`inline-flex rounded-full border px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide ${styles[status]}`}
    >
      {LEAD_STATUS_LABELS[status]}
    </span>
  );
}
