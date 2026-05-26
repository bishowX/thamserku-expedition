import { urlFor } from "../../../lib/sanity";
import type { SanityImageSource } from "@sanity/image-url";

type Sherpa = {
  name: string;
  portrait?: { asset: { _ref: string } } | null;
  region?: string;
  yearsActive?: string;
  mountainsSupported?: string;
  philosophyLine?: string;
};

type Props = {
  sherpa?: Sherpa | null;
  expeditionName?: string;
};

export function LeadSherpa({ sherpa, expeditionName }: Props) {
  const portraitSrc = sherpa?.portrait ? urlFor(sherpa.portrait as SanityImageSource).width(800).url() : null;

  return (
 <section className="w-full bg-[#F4F2EC] py-24 text-[#1A1A1A]">
      <div className="w-full max-w-[1440px] mx-auto px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-12">
          <div className="md:col-span-5 flex flex-col gap-6">
            {portraitSrc ? (
              <div className="w-full aspect-[4/5] overflow-hidden">
                <img src={portraitSrc} alt={sherpa?.name} className="w-full h-full object-cover" />
              </div>
            ) : (
              <div className="w-full aspect-[4/5] border border-[#5A6673] flex items-center justify-center p-8 text-center">
                <div className="flex flex-col gap-3 font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[10.5px] text-[#5A6673]">
                  <span>[IMAGE PLACEHOLDER] — LEAD SHERPA PORTRAIT — NO AI-GENERATED IMAGE PERMITTED. CLIENT TO PROVIDE.</span>
                </div>
              </div>
            )}
          </div>

          <div className="md:col-span-7 flex flex-col md:pt-16">
            <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#5A6673] mb-8">
              LEAD SHERPA{expeditionName ? ` — ${expeditionName.toUpperCase()} EXPEDITION` : ''}
            </span>

            <h2 className="font-['Radley'] font-light text-[56px] md:text-[72px] leading-[1.05] text-[#1A1A1A] max-w-[18ch] mb-8">
              "Led by the people who know the mountain."
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8 border-t border-[#5A6673]/30 pt-8 mb-16">
              <div className="flex flex-col gap-2">
                <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#5A6673]">NAME</span>
                <span className="font-['Radley'] font-light text-[22px] text-[#1A1A1A]">
                  {sherpa?.name || '[CLIENT TO CONFIRM]'}
                </span>
              </div>
              <div className="flex flex-col gap-2">
                <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#5A6673]">REGION</span>
                <span className="font-['Radley'] font-light text-[22px] text-[#1A1A1A]">
                  {sherpa?.region || '—'}
                </span>
              </div>
              <div className="flex flex-col gap-2">
                <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#5A6673]">YEARS</span>
                <span className="font-['Radley'] font-light text-[22px] text-[#1A1A1A]">
                  {sherpa?.yearsActive || '—'}
                </span>
              </div>
              <div className="flex flex-col gap-2">
                <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#5A6673]">MOUNTAINS SUPPORTED</span>
                <span className="font-['Radley'] font-light text-[22px] text-[#1A1A1A]">
                  {sherpa?.mountainsSupported || '—'}
                </span>
              </div>
            </div>

            {sherpa?.philosophyLine && (
              <p className="font-['Cormorant_Garamond'] italic text-[20px] text-[#0A3A77] max-w-[40ch]">
                "{sherpa.philosophyLine}"
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
