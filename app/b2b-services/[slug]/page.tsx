import { notFound } from 'next/navigation';
import ServiceDetailPage from '@/components/layout/ServiceDetailPage';
import { b2bServiceDetails, getB2BServiceDetail } from '@/lib/b2bServiceDetails';

export function generateStaticParams() {
  return b2bServiceDetails.map((s) => ({ slug: s.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const detail = getB2BServiceDetail(params.slug);
  if (!detail) return {};
  return {
    title: `${detail.title} | B2B Services | Secure Airport Transfer Limited`,
    description: detail.subtitle,
  };
}

export default function B2BServiceDetailPage({ params }: { params: { slug: string } }) {
  const detail = getB2BServiceDetail(params.slug);
  if (!detail) notFound();

  return (
    <ServiceDetailPage
      backHref="/b2b-services"
      backLabel="Back to B2B Services"
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
