import { useLoaderData } from "react-router";
import { Nav } from '../components/Nav';
import { YetiHero } from '../components/yeti/YetiHero';
import { YetiDefinition } from '../components/yeti/YetiDefinition';
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
      <YetiClosing page={page} />
      <Footer />
    </main>
  );
}
