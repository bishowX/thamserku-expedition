import type { ConsultationPage } from '../../../lib/queries';

export const WhatTheCallCovers = ({ data }: { data?: ConsultationPage }) => {
  const heading = data?.callCoversHeading;
  const subheading = data?.callCoversSubheading;
  const moments = data?.callCoversMoments ?? [];
  const footnote = data?.callCoversFootnote;

  return (
    <section className="w-full bg-[#1A1A1A] py-[140px] md:py-[180px] px-8 flex justify-center">
      <div className="w-full max-w-[1180px] flex flex-col items-center">

        <div className="flex flex-col items-center text-center mb-24">
          <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#C8CDD2] mb-8">
            WHAT THE CONVERSATION COVERS
          </span>
          <h2 className="font-['Radley'] font-light text-[56px] md:text-[72px] text-white leading-[1.1] max-w-[22ch] mb-6">
            "{heading}"
          </h2>
          <p className="font-['Cormorant_Garamond'] italic text-[#C8CDD2] text-[22px] max-w-[56ch]">
            {subheading}
          </p>
        </div>

        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-24">
          {moments.map((moment) => (
            <div key={moment._key} className="border-t border-[#C8CDD2]/20 bg-[#2E353C]/20 p-8 md:p-10 flex flex-col items-start text-left">
              <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#C8CDD2] mb-6">
                {moment.marker}
              </span>
              <h3 className="font-['Radley'] font-light text-[22px] md:text-[26px] text-white leading-tight mb-4">
                {moment.title}
              </h3>
              <p className="font-['Lexend'] text-[#C8CDD2] text-[15px] leading-[1.65]">
                {moment.description}
              </p>
            </div>
          ))}
        </div>

        <p className="font-['Cormorant_Garamond'] italic text-[#C8CDD2] text-[16px] max-w-[60ch] text-center">
          {footnote}
        </p>

      </div>
    </section>
  );
};
