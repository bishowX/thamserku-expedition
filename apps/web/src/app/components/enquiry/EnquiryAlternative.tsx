import { ArrowRight } from 'lucide-react';

export const EnquiryAlternative = () => {
  return (
    <section className="bg-[#F4F2EC] py-24 md:py-48">
      <div className="max-w-[1440px] mx-auto px-8">
        
        <div className="mb-24">
          <p className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#5A6673] mb-6">
            05 — IF A FORM IS NOT YOUR WAY
          </p>
          <h2 className="font-['Cormorant_Garamond'] font-light text-4xl md:text-[36px] lg:text-[48px] leading-[1.1] text-[#1A1A1A] max-w-[28ch]">
            Some readers prefer to write directly. We welcome that.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 lg:gap-12 mb-24">
          
          {/* Option 1 */}
          <div className="flex flex-col group cursor-pointer">
            <p className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#5A6673] mb-4">
              EXPEDITION DESK
            </p>
            <h3 className="font-['Cormorant_Garamond'] text-[24px] text-[#1A1A1A] mb-8">
              Write directly to our desk.
            </h3>
            <div className="mt-auto">
              <span className="inline-flex items-center font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#1A1A1A] border-b border-[#C8CDD2] pb-1 group-hover:border-[#1A1A1A] transition-colors">
                desk@thamserkuexpeditions.com <ArrowRight className="w-3 h-3 ml-2" />
              </span>
            </div>
          </div>

          {/* Option 2 */}
          <div className="flex flex-col group cursor-pointer">
            <p className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#5A6673] mb-4">
              BY PHONE OR WHATSAPP
            </p>
            <h3 className="font-['Cormorant_Garamond'] text-[24px] text-[#1A1A1A] mb-8">
              Speak with a senior advisor.
            </h3>
            <div className="mt-auto">
              <span className="inline-flex items-center font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#1A1A1A] border-b border-[#C8CDD2] pb-1 group-hover:border-[#1A1A1A] transition-colors">
                +977 [PLACEHOLDER NUMBER] <ArrowRight className="w-3 h-3 ml-2" />
              </span>
            </div>
          </div>

          {/* Option 3 */}
          <div className="flex flex-col group cursor-pointer">
            <p className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#5A6673] mb-4">
              IN PERSON <span className="mx-1">·</span> KATHMANDU
            </p>
            <h3 className="font-['Cormorant_Garamond'] text-[24px] text-[#1A1A1A] mb-8">
              Visit us when you arrive in Nepal.
            </h3>
            <div className="mt-auto">
              <span className="inline-flex items-center font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#1A1A1A] border-b border-[#C8CDD2] pb-1 group-hover:border-[#1A1A1A] transition-colors">
                BY APPOINTMENT <span className="mx-1">·</span> YETI GROUP <span className="mx-1">·</span> KATHMANDU <ArrowRight className="w-3 h-3 ml-2" />
              </span>
            </div>
          </div>

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
