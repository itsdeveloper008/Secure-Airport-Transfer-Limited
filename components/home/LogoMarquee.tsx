'use client';

import { partnerLogos } from '@/lib/partnerLogos';
import PartnerLogoImage from '@/components/ui/PartnerLogoImage';

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
              aria-hidden={index >= partnerLogos.length}
            >
              <PartnerLogoImage
                src={logo.src}
                name={logo.name}
                color={logo.color}
                className="h-10 w-[140px] transition-transform duration-300 group-hover:scale-105 sm:h-12 sm:w-[170px] lg:h-14 lg:w-[200px]"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
