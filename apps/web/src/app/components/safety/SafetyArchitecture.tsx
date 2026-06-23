import type { SafetyPageData } from '../../../lib/queries';

type Props = { page: SafetyPageData['safetyPage'] };

export const SafetyArchitecture = ({ page }: Props) => {
  const rows = page?.protocols ?? [];

  return (
    <section className="bg-[#1A1A1A] section-padding">
      <div className="max-w-[1180px] mx-auto flex flex-col items-center gap-12 md:gap-16">
        <div className="flex flex-col items-center gap-6 md:gap-8 text-center">
          {page?.architectureEyebrow && (
            <span className="font-['DM_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#C8CDD2]">
              {page.architectureEyebrow}
            </span>
          )}
          <h2 className="font-['Fraunces'] text-display-l text-white max-w-[18ch]">
            {page?.architectureHeading}
          </h2>
        </div>

        <div className="w-full border-t border-white/30">
          {rows.map((row, i) => (
            <div
              key={i}
              className="flex flex-col md:flex-row border-b border-white/30"
            >
              <div className="md:w-[400px] md:shrink-0 flex items-center md:border-r border-white/30 py-6 md:px-10 md:py-7">
                <p className="font-['DM_Mono'] font-bold uppercase tracking-[0.22em] text-[13px] md:text-[15px] text-white leading-[1.5]">
                  {row.label}
                </p>
              </div>
              <div className="flex-1 flex items-center pb-6 md:px-10 md:py-7">
                <p className="font-['DM_Sans'] font-light text-body text-white leading-[1.5]">
                  {row.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
