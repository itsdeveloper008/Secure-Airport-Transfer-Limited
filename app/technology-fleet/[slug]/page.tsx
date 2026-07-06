import { notFound } from 'next/navigation';
import ServiceDetailPage from '@/components/layout/ServiceDetailPage';
import { getTechnologyDetail, technologyDetails } from '@/lib/technologyDetails';

export function generateStaticParams() {
  return technologyDetails.map((t) => ({ slug: t.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const detail = getTechnologyDetail(params.slug);
  if (!detail) return {};
  return {
    title: `${detail.title} | Technology & Fleet | Secure Airport Transfer Limited`,
    description: detail.subtitle,
  };
}

export default function TechnologyDetailPage({ params }: { params: { slug: string } }) {
  const detail = getTechnologyDetail(params.slug);
  if (!detail) notFound();

  return (
    <ServiceDetailPage
      backHref="/technology-fleet"
      backLabel="Back to Technology & Fleet"
      label={detail.label}
      title={detail.title}
      subtitle={detail.subtitle}
      image={detail.image}
      intro={detail.intro}
      features={detail.features}
      sections={detail.sections}
    />
  );
}
