import { useEffect } from "react";
import { useLoaderData } from "react-router";
import { getPrivateExpeditionsPageData, type PrivateExpeditionsPageData } from "../../lib/queries";
import { Nav } from '../components/Nav';
import { PrivateHero } from '../components/private/PrivateHero';
import { PrivatePhilosophy } from '../components/private/PrivatePhilosophy';
import { PrivateWhoItIsFor } from '../components/private/PrivateWhoItIsFor';
import { PrivateAvailableEditions } from '../components/private/PrivateAvailableEditions';
import { PrivateConsultationPathway } from '../components/private/PrivateConsultationPathway';
import { PrivateFAQ } from '../components/private/PrivateFAQ';
import { PrivateClosing } from '../components/private/PrivateClosing';
import { Footer } from '../components/Footer';

export async function loader() {
  return getPrivateExpeditionsPageData();
}

export default function PrivateExpeditions() {
  const data = useLoaderData() as PrivateExpeditionsPageData;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="min-h-screen bg-[#1A1A1A]">
      <Nav />
      <PrivateHero page={data.privateExpeditionsPage ?? undefined} />
      <PrivatePhilosophy page={data.privateExpeditionsPage ?? undefined} />
      <PrivateWhoItIsFor page={data.privateExpeditionsPage ?? undefined} audiences={data.privateExpeditionsPage?.audiences ?? []} />
      <PrivateAvailableEditions page={data.privateExpeditionsPage ?? undefined} />
<PrivateConsultationPathway page={data.privateExpeditionsPage ?? undefined} consultationSteps={data.privateExpeditionsPage?.consultationSteps ?? []} />
      <PrivateFAQ page={data.privateExpeditionsPage ?? undefined} />
      <PrivateClosing page={data.privateExpeditionsPage ?? undefined} />
      <Footer />
    </main>
  );
};
