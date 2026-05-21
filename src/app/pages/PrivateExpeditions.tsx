import { Nav } from '../components/Nav';
import { PrivateHero } from '../components/private/PrivateHero';
import { PrivatePhilosophy } from '../components/private/PrivatePhilosophy';
import { PrivateWhoItIsFor } from '../components/private/PrivateWhoItIsFor';
import { PrivateAvailableEditions } from '../components/private/PrivateAvailableEditions';
import { PrivateSupportModules } from '../components/private/PrivateSupportModules';
import { PrivateConsultationPathway } from '../components/private/PrivateConsultationPathway';
import { PrivateClosing } from '../components/private/PrivateClosing';
import { Footer } from '../components/Footer';

export const PrivateExpeditions = () => {
  return (
    <main className="min-h-screen bg-[#1A1A1A]">
      <Nav />
      <PrivateHero />
      <PrivatePhilosophy />
      <PrivateWhoItIsFor />
      <PrivateAvailableEditions />
      <PrivateSupportModules />
      <PrivateConsultationPathway />
      <PrivateClosing />
      <Footer />
    </main>
  );
};