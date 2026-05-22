import type { ConsultationPage } from '../../../lib/queries';

export const EnquiryInvitation = ({ data }: { data?: ConsultationPage }) => {
  const heading = data?.invitationHeading;
  const body = data?.invitationBody;

  return (
    <section className="bg-[#F4F2EC] py-24 md:py-48">
      <div className="max-w-[1440px] mx-auto px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8">
          <div className="md:col-span-4 lg:col-span-3">
            <p className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#5A6673]">
              02 — THE INVITATION
            </p>
          </div>
          <div className="md:col-span-8 lg:col-span-7">
            <h2 className="font-['Cormorant_Garamond'] font-light text-4xl md:text-[40px] lg:text-[48px] leading-[1.2] mb-12 max-w-[32ch] text-[#1A1A1A]">
              {heading}
            </h2>
            <p className="text-[#5A6673] text-base md:text-[16px] leading-relaxed max-w-[60ch] font-light">
              {body}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
