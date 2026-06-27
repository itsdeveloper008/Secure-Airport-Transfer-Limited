'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import Button from '@/components/ui/Button';

export default function Hero() {
  const reduced = useReducedMotion();

  return (
    <section className="section-full relative min-h-screen w-full overflow-hidden border-b border-brand-navy/20 bg-brand-navy shadow-[0_28px_56px_-8px_rgba(7,26,53,0.5)]">
      <div className="absolute inset-0" aria-hidden="true">
        <Image
          src="/images/hero-section.png"
          alt=""
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        {/* Light left-only scrim for text legibility — no blue wash or bottom fade */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-black/20 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 z-[1] h-28 bg-gradient-to-b from-transparent via-black/30 to-black/55" />
      </div>

      <div className="relative z-10 flex min-h-screen w-full items-center pt-28 pb-20 lg:pt-32 lg:pb-24">
        <div className="zone w-full">
          <motion.div
            className="max-w-3xl"
            initial={reduced ? false : { opacity: 0, y: 36 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Headline — reference-style split accent */}
            <h1 className="font-display text-[clamp(2.5rem,6vw,4.75rem)] font-bold leading-[1.04] tracking-tight text-white">
              Your Trusted Partner
              <br />
              For{' '}
              <span className="text-brand-gold">Executive Airport</span>
              <br />
              <span className="text-gradient-blue">Ground Transport</span>
            </h1>

            <p className="mt-6 max-w-xl text-base leading-relaxed text-white/65 md:text-lg">
              Premium corporate fleet management, airline crew logistics, and VIP chauffeur
              services across every major UK aviation hub, built for enterprise reliability.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-5">
              <Button href="/contact" variant="gold" showArrow aria-label="Open corporate account">
                Open Corporate Account
              </Button>
              <Link
                href="/b2b-services"
                className="font-accent text-sm font-semibold uppercase tracking-wider text-white/80 transition-colors hover:text-white"
              >
                Discover More
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
