import type { SafetyPageData } from '../../../lib/queries';

type Props = { page: SafetyPageData['safetyPage'] };

export const SafetyStats = ({ page }: Props) => {
  const stats = page?.stats ?? [];

  return (
    <section className="bg-[#2E353C] py-10 md:py-[60px] px-5 md:px-8">
      <div className="max-w-[1738px] mx-auto flex flex-col items-center">
        {page?.statsLabel && (
          <span className="font-['JetBrains_Mono'] font-medium uppercase tracking-[0.22em] text-[11px] text-white text-center mb-12 md:mb-16">
            {page.statsLabel}
          </span>
        )}

        <div className="w-full grid grid-cols-2 gap-y-10 gap-x-6 sm:grid-cols-3 md:flex md:flex-wrap md:justify-center md:gap-x-16 lg:gap-x-24">
          {stats.map((stat, i) => (
            <div key={i} className="flex flex-col items-center justify-center text-center">
              <p className="font-['Radley'] text-[clamp(2rem,1.5rem+1.6vw,2.625rem)] text-white leading-[1.2]">
                {stat.value}
              </p>
              <p className="font-['Lexend'] text-[#C8CDD2] text-[15px] md:text-[16px] mt-1">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
