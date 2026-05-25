import { Link } from "react-router";
import { MoveRight } from "lucide-react";

export function SevenThousandMeterPathwayInsert() {
  return (
    <section className="w-full bg-[#F4F2EC] py-24 text-[#1A1A1A]">
      <div className="w-full max-w-[1440px] mx-auto px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-12">
          {/* Left column */}
          <div className="md:col-span-5 flex flex-col">
            <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#5A6673] mb-8">
              BEFORE THE 8,000M PEAKS — A QUALIFYING PATHWAY
            </span>
            <h2 className="font-['Radley'] font-light text-[56px] md:text-[72px] leading-[1.05] text-[#1A1A1A] max-w-[18ch] mb-8">
              "Read the 7,000m peaks first."
            </h2>
            <p className="font-['Cormorant_Garamond'] italic text-[22px] text-[#0A3A77] max-w-[28ch]">
              Preparation is the most honest part of an 8,000m expedition.
            </p>
          </div>

          {/* Right column */}
          <div className="md:col-span-7 flex flex-col md:pt-16">
            <div className="font-['Lexend'] font-light text-[16px] text-[#5A6673] leading-[1.75] max-w-[60ch] mb-12">
              <p>
                A 7,000m qualifying ascent can become the ground where altitude,
                judgement and discipline are properly earned.
              </p>
            </div>

            <div className="flex flex-col gap-6 mb-16">
              <Link
                to="/consultation?intent=7000m"
                className="group flex items-center gap-4 font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#1A1A1A] hover:text-[#5A6673] transition-colors w-fit"
              >
                <span className="border-b border-[#1A1A1A]/30 group-hover:border-[#5A6673] pb-1 transition-colors">
                  PLAN YOUR QUALIFYING ASCENT
                </span>
                <MoveRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>

              <Link
                to="/7000m"
                className="group flex items-center gap-4 font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#1A1A1A] hover:text-[#5A6673] transition-colors w-fit"
              >
                <span className="border-b border-[#1A1A1A]/30 group-hover:border-[#5A6673] pb-1 transition-colors">
                  READ THE 7,000M QUALIFYING PATHWAY
                </span>
                <MoveRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>

            <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[10px] text-[#5A6673]">
              [ROUTE TBC] — FIVE 7,000M ROUTE OPTIONS PENDING CLIENT
              CONFIRMATION.
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
