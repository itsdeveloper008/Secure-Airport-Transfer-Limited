import Link from 'next/link';
import PageHero from '@/components/layout/PageHero';
import Button from '@/components/ui/Button';

export default function NotFound() {
  return (
    <>
      <PageHero
        label="Page Not Found"
        title="This Page Could Not Be Located"
        subtitle="The page you are looking for may have been moved or no longer exists. Return to our homepage or contact our corporate team."
        backgroundImage="/images/hero-cinematic.jpg"
      />
      <section className="section-full section-pad w-full bg-brand-white text-center">
        <div className="zone">
          <div className="flex flex-wrap justify-center gap-4">
            <Button href="/" variant="gold" showArrow aria-label="Return to homepage">
              Return to Homepage
            </Button>
            <Link
              href="/contact"
              className="btn-outline-light"
            >
              Contact Corporate Team
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
