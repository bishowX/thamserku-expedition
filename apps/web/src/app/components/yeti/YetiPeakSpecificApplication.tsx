import type { SanityExpeditionForYeti, YetiPageData } from '../../../lib/queries';

type PageData = YetiPageData['yetiPage'];

export const YetiPeakSpecificApplication = ({
  expeditions,
  page,
}: {
  expeditions: SanityExpeditionForYeti[];
  page?: PageData;
}) => {
  if (!expeditions.length) return null;

  return (
    <section className="bg-[#1A1A1A] py-[140px] md:py-[180px] px-8">
      <div className="max-w-[1320px] mx-auto flex flex-col items-center">

        <div className="flex flex-col items-center mb-24 md:mb-32">
          <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#C8CDD2] text-center mb-8">
            PEAK-SPECIFIC APPLICATION — § II
          </span>
          {page?.peakSectionHeading && (
            <h2 className="font-['Radley'] font-light text-[48px] md:text-[56px] lg:text-[72px] text-white leading-[1.1] text-center max-w-[22ch] mb-6">
              {page.peakSectionHeading}
            </h2>
          )}
          {page?.peakSectionTagline && (
            <p className="font-['Cormorant_Garamond'] italic text-[#C8CDD2] text-[22px] text-center max-w-[56ch]">
              {page.peakSectionTagline}
            </p>
          )}
        </div>

        <div className="w-full flex flex-col border-t border-white/20">
          {expeditions.map((exp) => (
            <div key={exp._id} className="grid grid-cols-1 md:grid-cols-12 gap-8 py-[60px] md:py-[80px] border-b border-white/20">

              <div className="md:col-span-1 hidden md:block">
                <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#C8CDD2]">
                  {exp.code}
                </span>
              </div>

              <div className="md:col-span-3 flex flex-col gap-2">
                <div className="md:hidden mb-2">
                  <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#C8CDD2]">
                    {exp.code}
                  </span>
                </div>
                <h3 className="font-['Radley'] font-light text-[28px] md:text-[32px] text-white leading-none">
                  {exp.name}
                </h3>
                <span className="font-['Lexend'] text-[14px] text-[#C8CDD2]">
                  {exp.altitude}{exp.region ? ` · ${exp.region}` : ''}
                </span>
              </div>

              <div className="md:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
                {[
                  { label: 'AIR', value: exp.yetiAirNote },
                  { label: 'LODGES', value: exp.yetiLodgesNote },
                  { label: 'ACCESS', value: exp.yetiAccessNote },
                  { label: 'CONTINUITY', value: exp.yetiContinuityNote },
                ].map(({ label, value }) => (
                  <div key={label} className="flex flex-col gap-1">
                    <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[10.5px] text-[#5A6673]">
                      {label}
                    </span>
                    <span className="font-['Lexend'] text-[14px] text-[#C8CDD2]">
                      {value ?? '—'}
                    </span>
                  </div>
                ))}
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
