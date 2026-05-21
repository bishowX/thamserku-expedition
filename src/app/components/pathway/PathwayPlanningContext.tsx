
export const PathwayPlanningContext = () => {
  return (
    <section className="bg-[#F4F2EC] py-[140px] md:py-[180px] px-8">
      <div className="max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-8">
        
        {/* Left column (5 cols) */}
        <div className="md:col-span-5 flex flex-col items-start">
          <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#5A6673] mb-8">
            THE PLANNING CONTEXT — § I
          </span>
          <h2 className="font-['Radley'] font-light text-[48px] md:text-[56px] lg:text-[72px] text-[#1A1A1A] leading-[1.1] max-w-[16ch] mb-6">
            Preparation is not a hurdle.
          </h2>
          <p className="font-['Cormorant_Garamond'] italic text-[#0A3A77] text-[22px] max-w-[28ch]">
            It is the most honest part of an 8,000m expedition.
          </p>
        </div>

        {/* Right column (7 cols) */}
        <div className="md:col-span-7 flex flex-col gap-6 pt-2 md:pt-16">
          <p className="font-['Lexend'] font-light text-[17px] text-[#5A6673] leading-[1.75] max-w-[60ch]">
            Before an 8,000m expedition with Thamserku, we generally recommend a 7,000m qualifying ascent. Not as a filter or a hurdle, but as the considered ground where altitude, judgement, and field discipline are properly earned.
          </p>
          <p className="font-['Lexend'] font-light text-[17px] text-[#5A6673] leading-[1.75] max-w-[60ch]">
            A 7,000m peak teaches what no training programme can replicate: how your body responds to multi-day altitude, how you make decisions in thin air, and how you walk through a difficult day without losing rhythm. These are the conditions that will define your 8,000m expedition. Better to meet them first on a peak that asks less.
          </p>
          <p className="font-['Lexend'] font-light text-[17px] text-[#5A6673] leading-[1.75] max-w-[60ch]">
            This page describes the pathway. Specific routes, dates, and your personal preparation plan are best worked out in a private consultation with our expedition desk.
          </p>
          
          <p className="font-['Cormorant_Garamond'] italic text-[#5A6673] text-[16px] max-w-[56ch] mt-4">
            We do not require a 7,000m ascent in every case. The right pathway depends on your background, your timing, and the mountain you are preparing for. The consultation is where this is decided.
          </p>
        </div>

      </div>
    </section>
  );
};