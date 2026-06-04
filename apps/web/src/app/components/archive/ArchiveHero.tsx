import type { ArchivePageData } from '../../../lib/queries';

type Props = { page: ArchivePageData['archivePage'] };

export const ArchiveHero = ({ page }: Props) => {
  return (
 <section className="relative w-full min-h-[90vh] bg-[#1A1A1A] flex flex-col justify-center section-padding overflow-hidden">
      {/* Faint cartographic grid overlay */}
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

      <div className="relative z-10 w-full max-w-[1440px] mx-auto flex flex-col items-center">
        <h1 className="font-['Radley'] font-light text-fluid-heading tracking-tight text-white leading-[1.1] text-center max-w-[18ch] mb-6">
          {page?.heroHeadline}
        </h1>

        <p className="font-['Lexend'] font-light text-fluid-body text-[#C8CDD2] leading-relaxed max-w-[60ch] text-center mb-20">
          {page?.heroSubline}
        </p>
      </div>
    </section>
  );
};
