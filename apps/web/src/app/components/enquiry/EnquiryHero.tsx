import { Nav } from '../Nav';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { urlFor } from '../../../lib/sanity';
import type { ConsultationPage } from '../../../lib/queries';

export const EnquiryHero = ({ data }: { data?: ConsultationPage }) => {
  const heroImgSrc = data?.heroImage ? urlFor(data.heroImage).url() : undefined;
  const headline = data?.heroHeadline;
  const subheading = data?.heroSubheading;

  return (
    <section className="relative min-h-screen bg-[#1A1A1A] flex flex-col overflow-hidden p-5 pb-16 md:p-12 xl:p-40">
      <div className="absolute inset-0 z-0 pointer-events-none">
        {heroImgSrc && (
          <ImageWithFallback
            src={heroImgSrc}
            alt="Expedition landscape"
            className="w-full h-full object-cover opacity-30 mix-blend-overlay saturate-[0.8] contrast-110"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A] via-[#1A1A1A]/40 to-transparent" />
      </div>

      <Nav />

      <div className="relative z-20 w-full flex flex-col justify-end flex-grow">
        <span className="font-['DM_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#C8CDD2] block mb-6">
          THE EXPEDITION DESK — SCHEDULE A CONSULTATION
        </span>
        <h1 className="font-['Fraunces'] font-light text-display-xl tracking-tight text-balance mb-6 max-w-[22ch] text-white">
          {headline}
        </h1>
        <p className="font-['DM_Sans'] text-[#C8CDD2] font-light text-body leading-relaxed max-w-[60ch] whitespace-pre-line">
          {subheading}
        </p>
      </div>
    </section>
  );
};
