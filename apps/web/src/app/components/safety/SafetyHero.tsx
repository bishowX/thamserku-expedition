import type { SafetyPageData } from '../../../lib/queries';

type Props = { page: SafetyPageData['safetyPage'] };

export const SafetyHero = ({ page }: Props) => {
  return (
    <section className="relative w-full min-h-[80vh] md:min-h-[90vh] bg-[#1A1A1A] flex flex-col justify-center section-padding overflow-hidden">
      {/* Faint cartographic grid overlay */}
      <div
        className="absolute inset-0 z-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(to right, #C8CDD2 1px, transparent 1px),
            linear-gradient(to bottom, #C8CDD2 1px, transparent 1px)
          `,
          backgroundSize: '96px 96px',
        }}
      />

      <div className="relative z-10 w-full max-w-[1440px] mx-auto flex flex-col items-center">
        <h1 className="font-['Radley'] font-light text-fluid-display tracking-tight text-white leading-[1.1] text-center max-w-[18ch] mb-6">
          {page?.heroHeadline}
        </h1>

        <p className="font-['Lexend'] font-light text-[18px] text-[#C8CDD2] leading-[1.55] max-w-[58ch] text-center">
          {page?.heroSubline}
        </p>
      </div>
    </section>
  );
};
