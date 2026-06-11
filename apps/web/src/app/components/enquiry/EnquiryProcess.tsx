import { urlFor } from '../../../lib/sanity';
import type { SanityImageSource } from '@sanity/image-url';
import type { ConsultationPage } from '../../../lib/queries';

export const EnquiryProcess = ({ data }: { data?: ConsultationPage }) => {
  const heading = data?.processHeading;
  const steps = data?.processSteps ?? [];
  const footnote = data?.processFootnote;
  const imageSrc = data?.processBgImage
    ? urlFor(data.processBgImage as SanityImageSource).width(1920).url()
    : null;

  return (
    <section className="relative py-24 overflow-hidden" style={{ background: 'linear-gradient(90deg, #2E353C 0%, #2E353C 100%)' }}>
      {imageSrc && (
        <div className="absolute inset-0 z-0 pointer-events-none">
          <img
            src={imageSrc}
            alt=""
            loading="lazy"
            className="w-full h-full object-cover opacity-10 mix-blend-luminosity"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#2E353C] via-transparent to-[#2E353C] opacity-70" />
        </div>
      )}
      <div className="relative z-10 max-w-[1440px] mx-auto px-8">
        <div className="mb-10 md:mb-24">
          <p className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#C8CDD2] mb-6">
            04 — WHAT HAPPENS NEXT
          </p>
          <h2 className="font-['Cormorant_Garamond'] font-light text-4xl md:text-[44px] lg:text-[56px] leading-[1.1] text-white max-w-[22ch]">
            {heading}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-8 mb-10 md:mb-24">
          {steps.map((step) => (
            <div key={step._key} className="flex flex-col">
              <div className="w-12 h-12 rounded-full border border-[#C8CDD2] flex items-center justify-center mb-8">
                <span className="font-['Cormorant_Garamond'] font-light text-[#C8CDD2] text-xl">{step.stepNumber}</span>
              </div>
              <p className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#5A6673] mb-4">
                {step.marker}
              </p>
              <h3 className="font-['Cormorant_Garamond'] text-[24px] text-white mb-4">
                {step.title}
              </h3>
              <p className="text-[#C8CDD2] font-light text-base leading-relaxed line-clamp-3">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center pt-12 border-t border-[#2E353C]">
          <p className="font-['Cormorant_Garamond'] italic text-[#C8CDD2] text-[16px] max-w-[60ch] mx-auto">
            {footnote}
          </p>
        </div>
      </div>
    </section>
  );
};
