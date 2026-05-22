import { useLoaderData } from "react-router";
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
import { getYetiPageData, type YetiPageData } from '../../lib/queries';

export async function loader() {
  return getYetiPageData();
}

export default function YetiInfrastructure() {
  const data = useLoaderData() as YetiPageData;
  const page = data.yetiPage ?? undefined;

  return (
    <main className="min-h-screen bg-[#1A1A1A]">
      <Nav />
      <YetiHero page={page} />
      <YetiDefinition page={page} />
      <YetiAirSupport page={page} />
      <YetiMountainLodges page={page} />
      <YetiRegionalAccess page={page} />
      <YetiFieldContinuity page={page} />
      <YetiPeakSpecificApplication expeditions={data.expeditions} page={page} />
      <YetiFAQ page={page} />
      <YetiClosing page={page} />
      <Footer />
    </main>
  );
}
