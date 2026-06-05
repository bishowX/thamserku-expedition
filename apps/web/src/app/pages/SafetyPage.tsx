import { useEffect } from "react";
import { useLoaderData } from "react-router";
import { getSafetyPageData, type SafetyPageData } from "../../lib/queries";
import { Nav } from "../components/Nav";
import { SafetyHero } from "../components/safety/SafetyHero";
import { SafetyStats } from "../components/safety/SafetyStats";
import { SafetyNumbersMeaning } from "../components/safety/SafetyNumbersMeaning";
import { SafetyArchitecture } from "../components/safety/SafetyArchitecture";
import { SafetyFoundation } from "../components/safety/SafetyFoundation";
import { SafetyCommunication } from "../components/safety/SafetyCommunication";
import { SafetyEvacuation } from "../components/safety/SafetyEvacuation";
import { SafetyClosing } from "../components/safety/SafetyClosing";
import { Footer } from "../components/Footer";

export async function loader() {
  return getSafetyPageData();
}

export default function SafetyPage() {
  const data = useLoaderData() as SafetyPageData;
  const page = data.safetyPage;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="min-h-screen bg-[#1A1A1A]">
      <Nav />
      <SafetyHero page={page} />
      <SafetyStats page={page} />
      <SafetyNumbersMeaning page={page} />
      <SafetyArchitecture page={page} />
      <SafetyFoundation page={page} />
      <SafetyCommunication page={page} />
      <SafetyEvacuation page={page} />
      <SafetyClosing page={page} />
      <Footer />
    </main>
  );
}
