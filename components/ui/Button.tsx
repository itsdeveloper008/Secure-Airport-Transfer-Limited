import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

type Variant = 'gold' | 'outline-light' | 'outline-dark' | 'blue';

interface ButtonProps {
  href: string;
  children: React.ReactNode;
  variant?: Variant;
  showArrow?: boolean;
  className?: string;
  'aria-label'?: string;
}

const variants: Record<Variant, string> = {
  gold: 'btn-gold',
  'outline-light': 'btn-outline-light',
  'outline-dark': 'btn-outline-dark',
  blue: 'btn-blue',
};

export default function Button({
  href,
  children,
  variant = 'gold',
  showArrow = false,
  className = '',
  'aria-label': ariaLabel,
}: ButtonProps) {
  return (
    <Link href={href} className={`${variants[variant]} ${className}`} aria-label={ariaLabel}>
      <span>{children}</span>
      {showArrow && <ArrowRight className="h-[18px] w-[18px]" aria-hidden="true" />}
    </Link>
  );
}
