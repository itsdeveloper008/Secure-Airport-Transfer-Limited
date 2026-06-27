import { Clock, Mail, MapPin } from 'lucide-react';
import PageHero from '@/components/layout/PageHero';
import ContactForm from '@/components/contact/ContactForm';
import Button from '@/components/ui/Button';
import { CONTACT_EMAIL, CONTACT_INFO_CARDS } from '@/lib/contactContent';

export const metadata = {
  title: 'Contact | Secure Airport Transfer Limited',
  description:
    'Open a corporate account or request a B2B quote. Corporate accounts team for businesses, travel managers, and airline operators.',
};

const cardIcons = [Mail, MapPin, Clock] as const;

export default function ContactPage() {
  return (
    <>
      <PageHero
        label="Get in Touch"
        title="Open a Corporate Account or Request a B2B Quote"
        subtitle="Our team works exclusively with businesses, travel managers, and airline operators."
        backgroundImage="/images/contact-hero.jpg"
        imagePosition="object-[center_35%]"
      />

      <section className="w-full bg-black">
        <ContactForm />
      </section>

      <section className="section-block section-divider w-full bg-brand-gray">
        <div className="zone w-full">
          <div className="grid gap-6 sm:grid-cols-3">
            {CONTACT_INFO_CARDS.map((card, i) => {
              const Icon = cardIcons[i];
              return (
                <div key={card.title} className="premium-card p-8">
                  <Icon className="h-6 w-6 text-brand-blue" aria-hidden="true" />
                  <h3 className="mt-4 font-display text-lg font-semibold text-brand-navy">
                    {card.title}
                  </h3>
                  {'email' in card && (
                    <>
                      <a
                        href={`mailto:${card.email}`}
                        className="mt-3 block text-sm text-brand-blue hover:underline"
                      >
                        {card.email}
                      </a>
                      <p className="mt-2 text-sm text-brand-muted">{card.detail}</p>
                    </>
                  )}
                  {'address' in card && (
                    <address className="mt-3 not-italic text-sm leading-relaxed text-brand-muted">
                      {card.address.line1}
                      <br />
                      {card.address.line2}
                      <br />
                      {card.address.line3}
                    </address>
                  )}
                  {'detail' in card && !('email' in card) && (
                    <p className="mt-3 text-sm leading-relaxed text-brand-muted">{card.detail}</p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section-block w-full bg-brand-white">
        <div className="zone w-full text-center">
          <p className="font-accent text-[11px] font-semibold uppercase tracking-[0.28em] text-brand-gold">
            Nationwide Corporate Transport
          </p>
          <h2 className="mx-auto mt-4 max-w-2xl font-display text-3xl font-bold tracking-tight text-brand-navy md:text-4xl">
            Ready to streamline corporate travel?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-brand-muted md:text-lg">
            Open a corporate account or request a tailored B2B quote. Nationwide executive
            ground transport across every major UK airport hub.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button href="/b2b-services" variant="outline-dark" aria-label="View B2B services">
              B2B Services
            </Button>
            <Button href={`mailto:${CONTACT_EMAIL}`} variant="gold" showArrow aria-label="Email corporate operations">
              Email Operations
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
