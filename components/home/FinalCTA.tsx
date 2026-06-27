'use client';

import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
import Button from '@/components/ui/Button';

export default function FinalCTA() {
  const reduced = useReducedMotion();

  return (
    <section className="section-block section-divider relative w-full overflow-hidden">
      <div className="absolute inset-0" aria-hidden="true">
        <Image src="/images/cta-runway.jpg" alt="" fill className="object-cover" sizes="100vw" />
        <div className="absolute inset-0 bg-brand-navy/85" />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-navy via-brand-navy/60 to-brand-navy/40" />
        {/* Runway lights effect */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-brand-gold/10 to-transparent" />
      </div>

      <div className="zone relative z-10 w-full text-center">
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="eyebrow-light">Get Started</p>
          <h2 className="heading-gap headline-xl text-white">
            Ready to Streamline
            <br /><span className="text-brand-gold">Corporate Travel?</span>
          </h2>
          <p className="body-gap mx-auto max-w-xl text-base leading-relaxed text-white/70 md:text-lg">
            Speak to our corporate accounts team about a tailored transport solution for your organisation.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button href="/contact" variant="gold" showArrow aria-label="Open corporate account">Open Corporate Account</Button>
            <Button href="/contact" variant="outline-dark" aria-label="Request B2B quote">Request B2B Quote</Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
