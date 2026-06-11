import { urlFor } from '../../../lib/sanity';
import type { SanityImageSource } from '@sanity/image-url';
import type { ConsultationPage } from '../../../lib/queries';

export const EnquiryClosing = ({ data }: { data?: ConsultationPage }) => {
  const label = data?.closingLabel;
  const heading = data?.closingHeading;
  const body = data?.closingBody;
  const imageSrc = data?.closingImage
    ? urlFor(data.closingImage as SanityImageSource).width(1920).url()
    : null;

  return (
    <section className="relative bg-[#191919] py-24 flex items-center justify-center overflow-hidden">
      {imageSrc && (
        <div className="absolute inset-0 z-0 pointer-events-none">
          <img
            src={imageSrc}
            alt=""
            loading="lazy"
            className="w-full h-full object-cover opacity-20 mix-blend-luminosity"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#191919] via-transparent to-[#191919] opacity-80" />
        </div>
      )}

      <div className="relative z-10 max-w-[880px] mx-auto px-8 text-center flex flex-col items-center">
        <p className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#C8CDD2] mb-12">
          {label}
        </p>

        <h2 className="font-['Radley'] font-light text-5xl md:text-[56px] lg:text-[80px] leading-[1.1] text-white max-w-[24ch] mb-12">
          {heading}
        </h2>

        <p className="text-[#C8CDD2] font-light text-base md:text-[17px] leading-relaxed max-w-[56ch] mb-8 md:mb-16">
          {body}
        </p>

        <p className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#C8CDD2]">
          THAMSERKU EXPEDITIONS <span className="mx-2">·</span> YETI GROUP <span className="mx-2">·</span> KATHMANDU <span className="mx-2">·</span> NEPAL HIMALAYA
        </p>
      </div>
    </section>
  );
};
