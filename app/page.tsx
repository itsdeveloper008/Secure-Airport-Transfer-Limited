import Hero from '@/components/home/Hero';
import HomeCTA from '@/components/home/HomeCTA';
import Network from '@/components/home/Network';
import CorporateServices from '@/components/home/CorporateServices';
import FleetExperience from '@/components/home/FleetExperience';
import TechnologyPlatform from '@/components/home/TechnologyPlatform';
import WhyChooseUs from '@/components/home/WhyChooseUs';
import SectorsWeServe from '@/components/home/SectorsWeServe';
import TrustCompliance from '@/components/home/TrustCompliance';
import FinalCTA from '@/components/home/FinalCTA';

export default function HomePage() {
  return (
    <>
      <Hero />
      <SectorsWeServe />
      <HomeCTA />
      <CorporateServices />
      <FleetExperience />
      <TechnologyPlatform />
      <WhyChooseUs />
      <TrustCompliance />
      <FinalCTA />
      <Network />
    </>
  );
}
