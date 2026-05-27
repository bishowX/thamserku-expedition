
type ConsultationStep = { step: string; title: string; body: string; _key?: string };
type PageData = { consultationEyebrow?: string; consultationHeadline?: string; consultationTagline?: string; consultationNote?: string };

export const PrivateConsultationPathway = ({ page, consultationSteps }: { page?: PageData; consultationSteps?: ConsultationStep[] }) => {
  const displaySteps = (consultationSteps ?? []).map((s) => ({ marker: s.step, title: s.title, desc: s.body, _key: s._key }));

  return (
    <section className="bg-[#F4F2EC] section-padding">
      <div className="max-w-[1320px] mx-auto flex flex-col items-center">

        {/* Section Header */}
        <div className="flex flex-col items-center mb-24 md:mb-32">
          <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#5A6673] text-center mb-8">
            {page?.consultationEyebrow}
          </span>
          <h2 className="font-['Radley'] font-light text-[48px] md:text-[56px] lg:text-[72px] text-[#1A1A1A] leading-[1.1] text-center max-w-[22ch] mb-6">
            {page?.consultationHeadline}
          </h2>
          <p className="font-['Cormorant_Garamond'] italic text-[#0A3A77] text-[22px] text-center max-w-[56ch]">
            {page?.consultationTagline}
          </p>
        </div>

        {/* Four-step pathway */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {displaySteps.map((step, idx) => (
            <div
              key={step._key ?? idx}
              className="flex flex-col border-t border-[#5A6673]/30 px-6 py-8 md:py-10"
            >
              <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#0A3A77] mb-6 block">
                {step.marker}
              </span>
              <h3 className="font-['Radley'] font-light text-[22px] md:text-[26px] text-[#1A1A1A] leading-[1.2] mb-6">
                {step.title}
              </h3>
              <p className="font-['Lexend'] font-light text-[15px] text-[#5A6673] leading-[1.65]">
                {step.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Bottom Note */}
        {page?.consultationNote && (
          <p className="font-['Cormorant_Garamond'] italic text-[#5A6673] text-[16px] text-center max-w-[60ch]">
            {page.consultationNote}
          </p>
        )}

      </div>
    </section>
  );
};
