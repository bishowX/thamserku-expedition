
type ConsultationStep = { step: string; title: string; body: string; _key?: string };

const STEPS = [
  {
    marker: "STEP I",
    title: "Discreet Enquiry",
    desc: "You write to us directly, or via a trusted introduction. Your enquiry is reviewed by a senior advisor within 48 hours. Nothing is logged in shared systems."
  },
  {
    marker: "STEP II",
    title: "Private Conversation",
    desc: "A private video, phone, or in-person consultation. We listen first. We discuss your background, your timing, and the level of discretion you require — before we recommend anything."
  },
  {
    marker: "STEP III",
    title: "Tailored Proposal",
    desc: "A tailored proposal is shaped specifically for your expedition — itinerary, leadership, logistics, hospitality, discretion protocols, and pricing — written only for you, delivered through your preferred channel."
  },
  {
    marker: "STEP IV",
    title: "Ongoing Engagement",
    desc: "Once direction is set, your senior advisor becomes your single point of contact for the duration of the engagement — and remains the natural point of contact for any future expedition you plan with us."
  }
];

export const PrivateConsultationPathway = ({ consultationSteps }: { consultationSteps?: ConsultationStep[] }) => {
  const displaySteps = consultationSteps && consultationSteps.length > 0
    ? consultationSteps.map((s) => ({ marker: s.step, title: s.title, desc: s.body }))
    : STEPS;

  return (
 <section className="bg-[#F4F2EC] py-24 px-8">
      <div className="max-w-[1320px] mx-auto flex flex-col items-center">
        
        {/* Section Header */}
        <div className="flex flex-col items-center mb-24 md:mb-32">
          <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#5A6673] text-center mb-8">
            THE CONSULTATION PATHWAY — § V
          </span>
          <h2 className="font-['Radley'] font-light text-[48px] md:text-[56px] lg:text-[72px] text-[#1A1A1A] leading-[1.1] text-center max-w-[22ch] mb-6">
            How a private consultation begins.
          </h2>
          <p className="font-['Cormorant_Garamond'] italic text-[#0A3A77] text-[22px] text-center max-w-[56ch]">
            Different from the standard consultation. Quieter. More carefully held.
          </p>
        </div>

        {/* Four-step pathway */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {displaySteps.map((step, idx) => (
            <div 
              key={idx} 
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
        <p className="font-['Cormorant_Garamond'] italic text-[#5A6673] text-[16px] text-center max-w-[60ch]">
          Your senior advisor's name and contact details are shared after the first consultation. We do not list staff names on this page.
        </p>

      </div>
    </section>
  );
};