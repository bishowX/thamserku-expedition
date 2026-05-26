
export const PathwayTwoExpeditionDiagram = () => {
  return (
 <section className="bg-[#2E353C] py-24 px-8">
      <div className="max-w-[1320px] mx-auto flex flex-col items-center">
        
        {/* Section Header */}
        <div className="flex flex-col items-center mb-24 md:mb-32">
          <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#C8CDD2] text-center mb-8">
            THE TWO-EXPEDITION PATHWAY — § V
          </span>
          <h2 className="font-['Radley'] font-light text-[48px] md:text-[56px] lg:text-[72px] text-white leading-[1.1] text-center max-w-[22ch] mb-6">
            Two expeditions. One considered path.
          </h2>
          <p className="font-['Cormorant_Garamond'] italic text-[#C8CDD2] text-[22px] text-center max-w-[56ch]">
            A typical preparation path moves from a 7,000m qualifying ascent to an 8,000m flagship objective — separated by recovery, reflection, and consultation.
          </p>
        </div>

        {/* Pathway Diagram (Desktop) */}
        <div className="hidden lg:flex w-full relative mb-32 pt-12 pb-12">
          
          {/* Connecting Line & Altitude Markers */}
          <div className="absolute top-[48px] left-[16.66%] right-[16.66%] h-[1px] bg-white z-0 flex justify-between px-8" />
          
          {/* Waypoint 1 */}
          <div className="flex-1 flex flex-col items-center relative z-10 px-4">
            <span className="absolute -top-10 font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[10px] text-white bg-[#2E353C] px-2">
              7,000 M
            </span>
            <div className="w-4 h-4 rounded-full border border-white bg-[#2E353C] mb-8" />
            <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#C8CDD2] text-center mb-4">
              STEP I — QUALIFYING ASCENT
            </span>
            <h3 className="font-['Radley'] font-light text-[28px] text-white leading-[1.2] mb-4">
              7,000m Peak
            </h3>
            <p className="font-['Lexend'] font-light text-[14px] text-[#C8CDD2] leading-[1.65] text-center max-w-[28ch]">
              Earned altitude. Earned judgement. Earned discipline. Climbed with our Sherpa team for the first time.
            </p>
          </div>

          {/* Waypoint 2 */}
          <div className="flex-1 flex flex-col items-center relative z-10 px-4">
            <span className="absolute -top-10 font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[10px] text-white bg-[#2E353C] px-2">
              RECOVERY · KATHMANDU
            </span>
            <div className="w-3 h-3 rounded-full border border-white bg-[#2E353C] mb-[34px]" />
            <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#C8CDD2] text-center mb-4">
              STEP II — RECOVERY & REVIEW
            </span>
            <h3 className="font-['Radley'] font-light text-[24px] text-[#C8CDD2] leading-[1.2] mb-4">
              Recovery · Consultation
            </h3>
            <p className="font-['Lexend'] font-light text-[14px] text-[#C8CDD2] leading-[1.65] text-center max-w-[28ch]">
              Body recovers. The expedition is reviewed. A private consultation with the desk decides whether and when to proceed to the 8,000m objective.
            </p>
          </div>

          {/* Waypoint 3 */}
          <div className="flex-1 flex flex-col items-center relative z-10 px-4">
            <span className="absolute -top-10 font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[10px] text-white bg-[#2E353C] px-2">
              8,000 M+
            </span>
            <div className="w-4 h-4 rounded-full border border-white bg-[#2E353C] mb-8" />
            <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#C8CDD2] text-center mb-4">
              STEP III — FLAGSHIP OBJECTIVE
            </span>
            <h3 className="font-['Radley'] font-light text-[28px] text-white leading-[1.2] mb-4">
              8,000m Peak
            </h3>
            <p className="font-['Lexend'] font-light text-[14px] text-[#C8CDD2] leading-[1.65] text-center max-w-[28ch]">
              Everest, Manaslu, Dhaulagiri, or Makalu. Climbed with the same Sherpa team. The mountain meets a climber who is ready.
            </p>
          </div>

        </div>

        {/* Pathway Diagram (Mobile Fallback) */}
        <div className="lg:hidden flex flex-col gap-16 mb-24 w-full px-4 relative">
          <div className="absolute top-0 bottom-0 left-[23px] w-[1px] bg-white z-0" />
          
          <div className="flex gap-8 relative z-10">
            <div className="flex flex-col items-center pt-2">
              <div className="w-4 h-4 rounded-full border border-white bg-[#2E353C]" />
            </div>
            <div className="flex flex-col">
              <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[10px] text-white mb-2">
                7,000 M
              </span>
              <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#C8CDD2] mb-2">
                STEP I — QUALIFYING ASCENT
              </span>
              <h3 className="font-['Radley'] font-light text-[28px] text-white leading-[1.2] mb-4">
                7,000m Peak
              </h3>
              <p className="font-['Lexend'] font-light text-[14px] text-[#C8CDD2] leading-[1.65]">
                Earned altitude. Earned judgement. Earned discipline. Climbed with our Sherpa team for the first time.
              </p>
            </div>
          </div>

          <div className="flex gap-8 relative z-10">
            <div className="flex flex-col items-center pt-2 w-[16px] pl-[2px]">
              <div className="w-3 h-3 rounded-full border border-white bg-[#2E353C]" />
            </div>
            <div className="flex flex-col">
              <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[10px] text-white mb-2">
                RECOVERY · KATHMANDU
              </span>
              <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#C8CDD2] mb-2">
                STEP II — RECOVERY & REVIEW
              </span>
              <h3 className="font-['Radley'] font-light text-[24px] text-[#C8CDD2] leading-[1.2] mb-4">
                Recovery · Consultation
              </h3>
              <p className="font-['Lexend'] font-light text-[14px] text-[#C8CDD2] leading-[1.65]">
                Body recovers. The expedition is reviewed. A private consultation with the desk decides whether and when to proceed to the 8,000m objective.
              </p>
            </div>
          </div>

          <div className="flex gap-8 relative z-10">
            <div className="flex flex-col items-center pt-2">
              <div className="w-4 h-4 rounded-full border border-white bg-[#2E353C]" />
            </div>
            <div className="flex flex-col">
              <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[10px] text-white mb-2">
                8,000 M+
              </span>
              <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#C8CDD2] mb-2">
                STEP III — FLAGSHIP OBJECTIVE
              </span>
              <h3 className="font-['Radley'] font-light text-[28px] text-white leading-[1.2] mb-4">
                8,000m Peak
              </h3>
              <p className="font-['Lexend'] font-light text-[14px] text-[#C8CDD2] leading-[1.65]">
                Everest, Manaslu, Dhaulagiri, or Makalu. Climbed with the same Sherpa team. The mountain meets a climber who is ready.
              </p>
            </div>
          </div>

        </div>

        {/* Timing Notes */}
        <div className="w-full max-w-[1180px] grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[10px] text-[#C8CDD2] mb-4">
              TIMING I · 6 — 12 months apart
            </span>
            <p className="font-['Lexend'] font-light text-[14px] text-[#C8CDD2] leading-[1.65]">
              Most climbers complete the qualifying ascent and the 8,000m objective in different seasons within the same year, or in consecutive years.
            </p>
          </div>
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[10px] text-[#C8CDD2] mb-4">
              TIMING II · Recovery is a stage
            </span>
            <p className="font-['Lexend'] font-light text-[14px] text-[#C8CDD2] leading-[1.65]">
              Between expeditions, recovery is treated as a stage of preparation — not as a gap. We use this window for consultation, training, and planning.
            </p>
          </div>
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[10px] text-[#C8CDD2] mb-4">
              TIMING III · Continuity is the gift
            </span>
            <p className="font-['Lexend'] font-light text-[14px] text-[#C8CDD2] leading-[1.65]">
              By the time you arrive at the 8,000m base camp, you have already climbed with us. This is the deepest layer of safety we offer.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};