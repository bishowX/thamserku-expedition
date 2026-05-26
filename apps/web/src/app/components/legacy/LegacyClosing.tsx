import { Link } from "react-router";
import { urlFor } from "../../../lib/sanity";
import type { LegacyPageData } from "../../../lib/queries";

type PageData = LegacyPageData['legacyPage'];

export function LegacyClosing({ page }: { page?: PageData }) {
  const bgImage = page?.closingImage ? urlFor(page.closingImage).width(1920).url() : null;

  return (
 <section className="relative w-full bg-[#1A1A1A] text-white py-24 overflow-hidden min-h-[600px] flex flex-col justify-center">
      {/* Background silhouette */}
      <div className="absolute inset-0 z-0 pointer-events-none flex items-end">
        <div
          className="w-full h-[60%] bg-cover bg-bottom bg-no-repeat opacity-[0.15] mix-blend-screen"
          style={bgImage ? { backgroundImage: `url('${bgImage}')` } : {}}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A] via-[#1A1A1A]/80 to-transparent" />
      </div>

      <div className="relative z-10 max-w-[1440px] mx-auto w-full px-8 flex flex-col gap-16 md:gap-24 mt-32">

        {/* Header */}
        <div className="flex flex-col gap-6">
          <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#C8CDD2] block">
            {page?.closingEyebrow ?? "08 — CONTINUE READING"}
          </span>
          <h2 className="font-['Cormorant_Garamond'] font-light text-5xl md:text-[72px] leading-tight text-white max-w-[24ch]">
            {page?.closingHeading ?? "Read the rest of the house."}
          </h2>
        </div>

        {/* Pathway Tiles */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full mt-4 md:mt-12">
          
          <Link to="/atlas" className="flex flex-col gap-6 border border-white/20 p-8 hover:border-white/60 transition-colors group bg-[#1A1A1A]/50 backdrop-blur-sm min-h-[280px]">
            <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#C8CDD2] block">
              § NEXT — EXPEDITIONS
            </span>
            <h3 className="font-['Radley'] font-light text-[24px] md:text-[28px] leading-tight text-white">
              The Expedition Atlas
            </h3>
            <p className="font-['Lexend'] font-light text-[#C8CDD2] text-[16px] leading-relaxed mb-12">
              "Read the five mountains carefully."
            </p>
            <div className="mt-auto">
              <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-white border-b border-white/30 pb-1 group-hover:border-white transition-colors">
                READ THE EXPEDITION ATLAS →
              </span>
            </div>
          </Link>

          <Link to="/yeti-infrastructure" className="flex flex-col gap-6 border border-white/20 p-8 hover:border-white/60 transition-colors group bg-[#1A1A1A]/50 backdrop-blur-sm min-h-[280px]">
            <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#C8CDD2] block">
              § NEXT — INFRASTRUCTURE
            </span>
            <h3 className="font-['Radley'] font-light text-[24px] md:text-[28px] leading-tight text-white">
              Yeti Infrastructure
            </h3>
            <p className="font-['Lexend'] font-light text-[#C8CDD2] text-[16px] leading-relaxed mb-12">
              "The operating ecosystem behind every expedition."
            </p>
            <div className="mt-auto">
              <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-white border-b border-white/30 pb-1 group-hover:border-white transition-colors">
                READ YETI INFRASTRUCTURE →
              </span>
            </div>
          </Link>

          <Link to="/consultation" className="flex flex-col gap-6 border border-white/20 p-8 hover:border-white/60 transition-colors group bg-[#1A1A1A]/50 backdrop-blur-sm min-h-[280px]">
            <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#C8CDD2] block">
              § NEXT — CONSULTATION
            </span>
            <h3 className="font-['Radley'] font-light text-[24px] md:text-[28px] leading-tight text-white">
              Begin Privately
            </h3>
            <p className="font-['Lexend'] font-light text-[#C8CDD2] text-[16px] leading-relaxed mb-12">
              "Speak with the expedition desk."
            </p>
            <div className="mt-auto">
              <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-white border-b border-white/30 pb-1 group-hover:border-white transition-colors">
                SCHEDULE A CONSULTATION →
              </span>
            </div>
          </Link>

        </div>

      </div>
    </section>
  );
}