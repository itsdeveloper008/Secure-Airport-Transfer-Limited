'use client';

import Image from 'next/image';
import { partnerLogos } from '@/lib/partnerLogos';

export default function LogoMarquee() {
  const track = [...partnerLogos, ...partnerLogos];

  return (
    <div className="relative mt-6 lg:mt-8" aria-label="Organisations we serve">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-brand-white to-transparent sm:w-24" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-gradient-to-l from-brand-white to-transparent sm:w-24" />

      <div className="marquee-wrap overflow-hidden py-2">
        <div className="marquee-track flex w-max animate-marquee items-center gap-12 motion-reduce:animate-none sm:gap-16 lg:gap-20">
          {track.map((logo, index) => (
            <div
              key={`${logo.name}-${index}`}
              className="group flex shrink-0 items-center justify-center px-2"
              title={logo.name}
              aria-hidden={index >= partnerLogos.length}
            >
              <Image
                src={logo.src}
                alt={logo.name}
                width={240}
                height={64}
                className="h-10 w-auto max-w-[170px] object-contain opacity-50 grayscale transition-all duration-300 group-hover:opacity-100 group-hover:grayscale-0 sm:h-12 sm:max-w-[200px] lg:h-14 lg:max-w-[220px]"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
