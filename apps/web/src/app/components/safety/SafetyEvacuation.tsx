import type { SafetyPageData } from '../../../lib/queries';

type Props = { page: SafetyPageData['safetyPage'] };

export const SafetyEvacuation = ({ page }: Props) => {
  const cards = page?.evacuationCards ?? [];
  const body = page?.evacuationBody ?? [];

  return (
    <section className="relative bg-[#1A1A1A] section-padding overflow-hidden">
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

      <div className="relative z-10 max-w-[1376px] mx-auto flex flex-col items-center gap-10 md:gap-12">
        <div className="w-full flex flex-col gap-4">
          {page?.evacuationEyebrow && (
            <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#C8CDD2]">
              {page.evacuationEyebrow}
            </span>
          )}
          <h2 className="font-['Radley'] text-fluid-heading text-white leading-[1.2]">
            {page?.evacuationHeading}
          </h2>
        </div>

        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-white/[0.12] border border-white/[0.12]">
          {cards.map((card, i) => (
            <div
              key={i}
              className="bg-[#202121]/50 backdrop-blur-sm flex flex-col gap-3 px-8 py-7 md:px-10 md:py-8"
            >
              <h3 className="font-['Radley'] text-[24px] md:text-[28px] text-white leading-[1.2]">
                {card.title}
              </h3>
              <p className="font-['Lexend'] font-light text-[15px] text-[#C8CDD2] leading-[1.65]">
                {card.body}
              </p>
            </div>
          ))}
        </div>

        {page?.evacuationQuote && (
          <p className="font-['Cormorant_Garamond'] italic text-[18px] md:text-[16px] text-[#C8CDD2] text-center max-w-[44ch]">
            {page.evacuationQuote}
          </p>
        )}

        {body.length > 0 && (
          <div className="flex flex-col gap-5 max-w-[1080px]">
            {body.map((para, i) => (
              <p key={i} className="font-['Lexend'] font-light text-[16px] md:text-[17px] text-[#C8CDD2] leading-[1.65] text-center">
                {para}
              </p>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
