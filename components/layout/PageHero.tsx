import Image from 'next/image';

interface PageHeroProps {
  label: string;
  title: string;
  subtitle: string;
  backgroundImage?: string;
  imagePosition?: string;
}

export default function PageHero({
  label,
  title,
  subtitle,
  backgroundImage = '/images/hero-cinematic.jpg',
  imagePosition = 'object-center',
}: PageHeroProps) {
  return (
    <section className="section-full relative min-h-[58vh] w-full overflow-hidden border-b border-brand-navy/15 shadow-[0_28px_56px_-8px_rgba(7,26,53,0.45)] lg:min-h-[62vh]">
      <div className="absolute inset-0" aria-hidden="true">
        <Image
          src={backgroundImage}
          alt=""
          fill
          priority
          className={`object-cover ${imagePosition}`}
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/65 via-black/30 to-black/5" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent via-black/25 to-black/55" />
      </div>

      <div className="zone relative z-10 flex min-h-[58vh] flex-col justify-end pb-14 pt-28 lg:min-h-[62vh] lg:justify-center lg:pb-20 lg:pt-32">
        <p className="font-accent text-[11px] font-semibold uppercase tracking-[0.28em] text-brand-gold">
          {label}
        </p>
        <h1 className="heading-gap headline-xl max-w-4xl text-white">{title}</h1>
        <p className="body-gap max-w-2xl text-base leading-relaxed text-white/75 md:text-lg">
          {subtitle}
        </p>
      </div>
    </section>
  );
}
