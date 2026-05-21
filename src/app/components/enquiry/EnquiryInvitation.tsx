
export const EnquiryInvitation = () => {
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
              Every Thamserku journey begins with a private conversation. <span className="italic text-[#0A3A77]">Not a booking page.</span>
            </h2>
            <p className="text-[#5A6673] text-base md:text-[16px] leading-relaxed max-w-[60ch] font-light">
              The form below is short by design. We would rather understand a few things well — your background, the mountain you have in mind, and the rhythm you are hoping to climb in — than collect details we do not yet need. Anything missing, we will ask in a follow-up letter.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
