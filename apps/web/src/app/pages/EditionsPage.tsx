import { useEffect } from "react";
import { Footer } from "../components/Footer";
import { EditionsHero } from "../components/editions/EditionsHero";
import { EditionsManifesto } from "../components/editions/EditionsManifesto";
import { EditionsBands } from "../components/editions/EditionsBands";
import { EditionsComparison } from "../components/editions/EditionsComparison";
import { EditionsAvailability } from "../components/editions/EditionsAvailability";
import { EditionsClosing } from "../components/editions/EditionsClosing";

export default function EditionsPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="w-full min-h-screen bg-[#1A1A1A] text-white">
      <EditionsHero />
      <EditionsManifesto />
      <EditionsBands />
      <EditionsComparison />
      <EditionsAvailability />
      <EditionsClosing />
      <Footer />
    </div>
  );
}
