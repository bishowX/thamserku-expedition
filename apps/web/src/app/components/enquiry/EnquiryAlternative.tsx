import { ArrowRight } from 'lucide-react';
import type { ConsultationPage } from '../../../lib/queries';

export const EnquiryAlternative = ({ data }: { data?: ConsultationPage }) => {
  const heading = data?.alternativeHeading;
  const options = data?.alternativeOptions ?? [];

  return (
 <section className="bg-[#F4F2EC] py-24">
      <div className="max-w-[1440px] mx-auto px-8">

        <div className="mb-10 md:mb-24">
          <p className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#5A6673] mb-6">
            05 — IF A FORM IS NOT YOUR WAY
          </p>
          <h2 className="font-['Cormorant_Garamond'] font-light text-4xl md:text-[36px] lg:text-[48px] leading-[1.1] text-[#1A1A1A] max-w-[28ch]">
            {heading}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 mb-10 md:mb-24">
          {options.map((option) => (
            <div key={option._key} className="flex flex-col group cursor-pointer">
              <p className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#5A6673] mb-4">
                {option.label}
              </p>
              <h3 className="font-['Cormorant_Garamond'] text-[24px] text-[#1A1A1A] mb-8">
                {option.title}
              </h3>
              <div className="mt-auto">
                <span className="inline-flex items-center font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#1A1A1A] border-b border-[#C8CDD2] pb-1 group-hover:border-[#1A1A1A] transition-colors">
                  {option.value} <ArrowRight className="w-3 h-3 ml-2" />
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="pt-12 border-t border-[#C8CDD2]/50">
          <p className="font-['Cormorant_Garamond'] italic text-[#5A6673] text-[16px] max-w-[60ch]">
            We answer in the same way, regardless of the channel — quietly, personally, and within 48 hours.
          </p>
        </div>

      </div>
    </section>
  );
};
