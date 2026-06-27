import { ReactNode } from 'react';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

export default function GlassCard({
  children,
  className = '',
  hover = true,
}: GlassCardProps) {
  return (
    <div
      className={`rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-md ${
        hover
          ? 'transition-all duration-300 hover:border-brand-blue/30 hover:bg-white/[0.08]'
          : ''
      } ${className}`}
    >
      {children}
    </div>
  );
}
