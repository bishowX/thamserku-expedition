import { urlFor } from '../../../lib/sanity';
import type { SanityImageSource } from '@sanity/image-url';
import type { SafetyPageData } from '../../../lib/queries';

type Props = { page: SafetyPageData['safetyPage'] };

export const SafetyHero = ({ page }: Props) => {
  const imageSrc = page?.heroBgImage
    ? urlFor(page.heroBgImage as SanityImageSource).width(1920).url()
    : null;

  return (
    <section className="relative w-full min-h-[80vh] md:min-h-[90vh] bg-[#1A1A1A] flex flex-col justify-end md:justify-center section-padding overflow-hidden">
      {/* Background image */}
      {imageSrc && (
        <div className="absolute inset-0 z-0 pointer-events-none">
          <img
            src={imageSrc}
            alt=""
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-black/55" />
        </div>
      )}

      {/* Faint cartographic grid overlay */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(to right, #C8CDD2 1px, transparent 1px),
            linear-gradient(to bottom, #C8CDD2 1px, transparent 1px)
          `,
          backgroundSize: '96px 96px',
        }}
      />

      <div className="relative z-10 w-full max-w-[1440px] mx-auto flex flex-col items-start md:items-center">
        <h1 className="font-['Fraunces'] font-light text-display-xl tracking-tight text-balance text-white text-left md:text-center max-w-[22ch] mb-6 mx-auto">
          {page?.heroHeadline}
        </h1>

        <p className="font-['DM_Sans'] font-light text-body-lg text-[#C8CDD2] max-w-[58ch] text-left md:text-center">
          {page?.heroSubline}
        </p>
      </div>
    </section>
  );
};
