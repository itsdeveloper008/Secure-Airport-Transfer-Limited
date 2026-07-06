import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Check } from 'lucide-react';
import PageHero from '@/components/layout/PageHero';
import Button from '@/components/ui/Button';

interface ServiceDetailPageProps {
  backHref: string;
  backLabel: string;
  label: string;
  title: string;
  subtitle: string;
  image: string;
  intro: string;
  features: string[];
  sections: { title: string; body: string[] }[];
}

export default function ServiceDetailPage({
  backHref,
  backLabel,
  label,
  title,
  subtitle,
  image,
  intro,
  features,
  sections,
}: ServiceDetailPageProps) {
  return (
    <>
      <PageHero label={label} title={title} subtitle={subtitle} backgroundImage={image} />

      <section className="section-block w-full bg-brand-white">
        <div className="zone mx-auto max-w-5xl">
          <Link
            href={backHref}
            className="inline-flex items-center gap-2 text-sm font-semibold text-brand-blue hover:text-brand-navy"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            {backLabel}
          </Link>

          <p className="mt-8 text-lg leading-relaxed text-brand-muted">{intro}</p>

          <ul className="mt-8 grid gap-3 sm:grid-cols-2">
            {features.map((f) => (
              <li key={f} className="flex items-start gap-3 text-brand-text">
                <Check className="mt-0.5 h-5 w-5 shrink-0 text-brand-gold" aria-hidden="true" />
                <span className="font-medium">{f}</span>
              </li>
            ))}
          </ul>

          <div className="relative mt-12 aspect-[16/9] overflow-hidden rounded-2xl shadow-[0_20px_60px_rgba(7,26,53,0.12)]">
            <Image src={image} alt={title} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 1024px" />
          </div>

          <div className="mt-12 space-y-10">
            {sections.map((section) => (
              <article key={section.title}>
                <h2 className="font-display text-xl font-semibold text-brand-navy">{section.title}</h2>
                <div className="mt-4 space-y-3">
                  {section.body.map((paragraph) => (
                    <p key={paragraph} className="text-sm leading-relaxed text-brand-muted">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </article>
            ))}
          </div>

          <div className="mt-12 flex flex-wrap gap-4">
            <Button href="/contact" variant="blue" showArrow aria-label="Contact our team">
              Contact Our Team
            </Button>
            <Button href={backHref} variant="outline-light" aria-label={backLabel}>
              Back to Overview
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
