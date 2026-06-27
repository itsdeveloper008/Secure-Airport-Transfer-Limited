import type { LucideIcon } from 'lucide-react';

interface StatCardProps {
  label: string;
  value: string | number;
  hint?: string;
  icon: LucideIcon;
  accent?: 'blue' | 'gold' | 'emerald' | 'violet';
}

const accents = {
  blue: 'bg-blue-50 text-brand-blue',
  gold: 'bg-amber-50 text-amber-700',
  emerald: 'bg-emerald-50 text-emerald-700',
  violet: 'bg-violet-50 text-violet-700',
};

export default function StatCard({ label, value, hint, icon: Icon, accent = 'blue' }: StatCardProps) {
  return (
    <div className="premium-card p-5 sm:p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="font-accent text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-muted">
            {label}
          </p>
          <p className="mt-2 font-display text-3xl font-bold text-brand-navy">{value}</p>
          {hint && <p className="mt-1 text-xs text-brand-muted">{hint}</p>}
        </div>
        <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${accents[accent]}`}>
          <Icon className="h-5 w-5" aria-hidden="true" />
        </div>
      </div>
    </div>
  );
}
