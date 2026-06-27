import { ReactNode } from 'react';

type BadgeVariant = 'blue' | 'green' | 'gold' | 'muted';

interface BadgeProps {
  variant?: BadgeVariant;
  children: ReactNode;
  className?: string;
  pulse?: boolean;
}

const variants: Record<BadgeVariant, string> = {
  blue: 'bg-brand-blue/10 text-brand-blue border-brand-blue/25',
  green: 'bg-green-500/10 text-green-400 border-green-500/25',
  gold: 'bg-brand-gold/10 text-brand-gold border-brand-gold/25',
  muted: 'bg-white/5 text-brand-blue border-white/10',
};

export default function Badge({
  variant = 'muted',
  children,
  className = '',
  pulse = false,
}: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-medium uppercase tracking-widest ${variants[variant]} ${className}`}
    >
      {pulse && (
        <span
          className="h-2 w-2 shrink-0 rounded-full bg-green-500 animate-pulse-dot"
          aria-hidden="true"
        />
      )}
      {children}
    </span>
  );
}
