import type { ConsultationPage } from '../../../lib/queries';

export const EnquiryClosing = ({ data }: { data?: ConsultationPage }) => {
  const label = data?.closingLabel;
  const heading = data?.closingHeading;
  const body = data?.closingBody;

  return (
    <section className="bg-[#0A3A77] py-32 md:py-48 flex items-center justify-center">
      <div className="max-w-[880px] mx-auto px-8 text-center flex flex-col items-center">

        <p className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#C8CDD2] mb-12">
          {label}
        </p>

        <h2 className="font-['Radley'] font-light text-5xl md:text-[56px] lg:text-[80px] leading-[1.1] text-white max-w-[24ch] mb-12">
          {heading}
        </h2>

        <p className="text-[#C8CDD2] font-light text-base md:text-[17px] leading-relaxed max-w-[56ch] mb-16">
          {body}
        </p>

        <p className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#C8CDD2]">
          THAMSERKU EXPEDITIONS <span className="mx-2">·</span> YETI GROUP <span className="mx-2">·</span> KATHMANDU <span className="mx-2">·</span> NEPAL HIMALAYA
        </p>

      </div>
    </section>
  );
};
