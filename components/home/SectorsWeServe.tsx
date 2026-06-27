'use client';

import LogoMarquee from '@/components/home/LogoMarquee';

export default function SectorsWeServe() {
  return (
    <section className="section-full section-divider w-full bg-brand-white py-10 sm:py-12 lg:py-14">
      <div className="zone w-full">
        <div className="section-intro mb-6 text-center lg:mb-8">
          <p className="eyebrow">Sectors We Serve</p>
          <h2 className="heading-gap headline-lg text-brand-navy">
            Trusted by Leading Organisations
          </h2>
        </div>

        <LogoMarquee />
      </div>
    </section>
  );
}
