import { useLoaderData } from "react-router";
import { Nav } from '../components/Nav';
import { YetiHero } from '../components/yeti/YetiHero';
import { YetiDefinition } from '../components/yeti/YetiDefinition';
import { YetiClosing } from '../components/yeti/YetiClosing';
import { Footer } from '../components/Footer';
import { getYetiPageData, type YetiPageData } from '../../lib/queries';
import type { Route } from "./+types/YetiInfrastructure";
import { pageMeta } from "../../lib/seo";

export async function loader() {
  return getYetiPageData();
}

export function meta({ data }: Route.MetaArgs) {
  const d = data as YetiPageData | undefined;
  return pageMeta({
    title: d?.yetiPage?.heroHeadline ?? "Yeti Infrastructure",
    description: d?.yetiPage?.heroSubheading,
  });
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
