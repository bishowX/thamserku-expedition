import type { SafetyPageData } from '../../../lib/queries';

type Props = { page: SafetyPageData['safetyPage'] };

export const SafetyCommunication = ({ page }: Props) => {
  const items = page?.communicationItems ?? [];

  return (
    <section className="bg-white section-padding">
      <div className="max-w-[1440px] mx-auto flex flex-col gap-6">
        <div className="flex flex-col gap-4">
          {page?.communicationEyebrow && (
            <span className="font-['DM_Mono'] font-medium uppercase tracking-[0.22em] text-[11px] text-[#5A6673]">
              {page.communicationEyebrow}
            </span>
          )}
          <h2 className="font-['Fraunces'] text-display-l text-[#1A1A1A]">
            {page?.communicationHeading}
          </h2>
        </div>

        <div className="border-t border-[#1A1A1A]/10 pt-10 md:pt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-12">
          {items.map((item, i) => (
            <div key={i} className="flex flex-col gap-5 md:gap-6">
              <h3 className="font-['Fraunces'] text-display-m text-[#1A1A1A]">
                {item.title}
              </h3>
              <p className="font-['DM_Sans'] font-light text-body text-[#5A6673] leading-[1.6]">
                {item.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
