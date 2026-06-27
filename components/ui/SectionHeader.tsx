interface SectionHeaderProps {
  caption: string;
  headline: string;
  subtext?: string;
  align?: 'left' | 'center';
  dark?: boolean;
}

export default function SectionHeader({
  caption,
  headline,
  subtext,
  align = 'left',
  dark = false,
}: SectionHeaderProps) {
  const alignClass = align === 'center' ? 'text-center mx-auto' : 'text-left';
  const subColor = dark ? 'text-slate-400' : 'text-slate-500';

  return (
    <div className={`mb-16 max-w-2xl ${alignClass}`}>
      <p className="mb-4 text-xs font-medium uppercase tracking-widest text-brand-blue">
        {caption}
      </p>
      <h2
        className={`text-3xl font-bold tracking-tight md:text-4xl lg:text-[44px] lg:leading-tight ${
          dark ? 'text-white' : 'text-slate-900'
        }`}
      >
        {headline}
      </h2>
      {subtext && (
        <p className={`mt-4 text-lg leading-7 ${subColor} dark:text-slate-400`}>
          {subtext}
        </p>
      )}
    </div>
  );
}
