import { Nav } from "../components/Nav";
import { Hero } from "../components/Hero";
import { Manifesto } from "../components/Manifesto";
import { YetiInfrastructurePreview } from "../components/YetiInfrastructurePreview";
import { AtlasPreview } from "../components/AtlasPreview";
import { FieldNotesPreview } from "../components/FieldNotesPreview";
import { EditionsPreview } from "../components/EditionsPreview";
import { LegacyPreview } from "../components/LegacyPreview";
import { Closing } from "../components/Closing";
import { Footer } from "../components/Footer";

export function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Manifesto />
        <YetiInfrastructurePreview />
        <AtlasPreview />
        <EditionsPreview />
        <LegacyPreview />
        <FieldNotesPreview />
        <Closing />
      </main>
      <Footer />
    </>
  );
}