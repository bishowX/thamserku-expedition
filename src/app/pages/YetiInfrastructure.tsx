import { Nav } from '../components/Nav';
import { YetiHero } from '../components/yeti/YetiHero';
import { YetiDefinition } from '../components/yeti/YetiDefinition';
import { YetiAirSupport } from '../components/yeti/YetiAirSupport';
import { YetiMountainLodges } from '../components/yeti/YetiMountainLodges';
import { YetiRegionalAccess } from '../components/yeti/YetiRegionalAccess';
import { YetiFieldContinuity } from '../components/yeti/YetiFieldContinuity';
import { YetiPeakSpecificApplication } from '../components/yeti/YetiPeakSpecificApplication';
import { YetiFAQ } from '../components/yeti/YetiFAQ';
import { YetiClosing } from '../components/yeti/YetiClosing';
import { Footer } from '../components/Footer';

export const YetiInfrastructure = () => {
  return (
    <main className="min-h-screen bg-[#1A1A1A]">
      <Nav />
      <YetiHero />
      <YetiDefinition />
      <YetiAirSupport />
      <YetiMountainLodges />
      <YetiRegionalAccess />
      <YetiFieldContinuity />
      <YetiPeakSpecificApplication />
      <YetiFAQ />
      <YetiClosing />
      <Footer />
    </main>
  );
};