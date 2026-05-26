import type { YetiPageData } from '../../../lib/queries';

type PageData = YetiPageData['yetiPage'];

export const YetiHero = ({ page }: { page?: PageData }) => {
  return (
 <section className="relative w-full min-h-[90vh] bg-[#1A1A1A] flex flex-col justify-end py-24 px-8 overflow-hidden">
      <div
        className="absolute inset-0 z-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(to right, #C8CDD2 1px, transparent 1px),
            linear-gradient(to bottom, #C8CDD2 1px, transparent 1px)
          `,
          backgroundSize: '64px 64px'
        }}
      />

      <div className="relative z-10 w-full max-w-[1440px] mx-auto flex flex-col items-center pt-32 md:pt-0">
        {page?.heroHeadline && (
          <h1 className="font-['Radley'] font-light text-fluid-display tracking-tight text-white leading-[1.1] text-center max-w-[22ch] mb-6">
            {page.heroHeadline}
          </h1>
        )}

        {page?.heroSubheading && (
          <p className="font-['Lexend'] font-light text-fluid-body text-[#C8CDD2] leading-relaxed max-w-[60ch] text-center mb-20">
            {page.heroSubheading}
          </p>
        )}
      </div>
    </section>
  );
};
