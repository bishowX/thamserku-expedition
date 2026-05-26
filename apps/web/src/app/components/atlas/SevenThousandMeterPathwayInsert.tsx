import { Link } from "react-router";
import { MoveRight } from "lucide-react";

type PathwayData = {
  pathwayEyebrow?: string;
  pathwayHeading?: string;
  pathwaySubheading?: string;
  pathwayBody?: string;
  pathwayCta1Label?: string;
  pathwayCta1Href?: string;
  pathwayCta2Label?: string;
  pathwayCta2Href?: string;
  pathwayFootnote?: string;
};

type Props = { data?: PathwayData };

export function SevenThousandMeterPathwayInsert({ data }: Props) {
  const eyebrow = data?.pathwayEyebrow ?? "BEFORE THE 8,000M PEAKS — A QUALIFYING PATHWAY";
  const heading = data?.pathwayHeading ?? "“Read the 7,000m peaks first.”";
  const subheading = data?.pathwaySubheading ?? "Preparation is the most honest part of an 8,000m expedition.";
  const body = data?.pathwayBody ?? "A 7,000m qualifying ascent can become the ground where altitude, judgement and discipline are properly earned.";
  const cta1Label = data?.pathwayCta1Label ?? "PLAN YOUR QUALIFYING ASCENT";
  const cta1Href = data?.pathwayCta1Href ?? "/consultation?intent=7000m";
  const cta2Label = data?.pathwayCta2Label ?? "READ THE 7,000M QUALIFYING PATHWAY";
  const cta2Href = data?.pathwayCta2Href ?? "/7000m";
  const footnote = data?.pathwayFootnote ?? "[ROUTE TBC] — FIVE 7,000M ROUTE OPTIONS PENDING CLIENT CONFIRMATION.";

  return (
 <section className="w-full bg-[#F4F2EC] py-24 text-[#1A1A1A]">
      <div className="w-full max-w-[1440px] mx-auto px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-12">
          {/* Left column */}
          <div className="md:col-span-5 flex flex-col">
            <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#5A6673] mb-8">
              {eyebrow}
            </span>
            <h2 className="font-['Radley'] font-light text-[56px] md:text-[72px] leading-[1.05] text-[#1A1A1A] max-w-[18ch] mb-8">
              {heading}
            </h2>
            <p className="font-['Cormorant_Garamond'] italic text-[22px] text-[#0A3A77] max-w-[28ch]">
              {subheading}
            </p>
          </div>

          {/* Right column */}
          <div className="md:col-span-7 flex flex-col md:pt-16">
            <div className="font-['Lexend'] font-light text-[16px] text-[#5A6673] leading-[1.75] max-w-[60ch] mb-12">
              <p>{body}</p>
            </div>

            <div className="flex flex-col gap-6 mb-16">
              <Link
                to={cta1Href}
                className="group flex items-center gap-4 font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#1A1A1A] hover:text-[#5A6673] transition-colors w-fit"
              >
                <span className="border-b border-[#1A1A1A]/30 group-hover:border-[#5A6673] pb-1 transition-colors">
                  {cta1Label}
                </span>
                <MoveRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>

              <Link
                to={cta2Href}
                className="group flex items-center gap-4 font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#1A1A1A] hover:text-[#5A6673] transition-colors w-fit"
              >
                <span className="border-b border-[#1A1A1A]/30 group-hover:border-[#5A6673] pb-1 transition-colors">
                  {cta2Label}
                </span>
                <MoveRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>

            <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[10px] text-[#5A6673]">
              {footnote}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
