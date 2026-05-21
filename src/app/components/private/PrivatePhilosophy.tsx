
export const PrivatePhilosophy = () => {
  return (
    <section className="bg-[#F4F2EC] py-[140px] md:py-[180px] px-8">
      <div className="max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-8">
        
        {/* Left column (5 cols) */}
        <div className="md:col-span-5 flex flex-col items-start">
          <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#5A6673] mb-8">
            THE PHILOSOPHY — § I
          </span>
          <h2 className="font-['Radley'] font-light text-[48px] md:text-[56px] lg:text-[72px] text-[#1A1A1A] leading-[1.1] max-w-[18ch] mb-6">
            Discretion is the standard.
          </h2>
          <p className="font-['Cormorant_Garamond'] italic text-[#0A3A77] text-[22px] max-w-[28ch]">
            Not a feature. Not an upgrade. The default.
          </p>
        </div>

        {/* Right column (7 cols) */}
        <div className="md:col-span-7 flex flex-col gap-6 pt-2 md:pt-16">
          <p className="font-['Lexend'] font-light text-[17px] text-[#5A6673] leading-[1.75] max-w-[60ch]">
            Every Thamserku expedition can be made private. For some clients — principals, families, executives — privacy is not a preference. It is a requirement of how they live, work, and travel. This page describes the support, the editions, and the consultation pathway designed for those expeditions.
          </p>
          <p className="font-['Lexend'] font-light text-[17px] text-[#5A6673] leading-[1.75] max-w-[60ch]">
            Privacy with Thamserku is not a marketing layer. It is operational: protected communications, contracted staff discretion, by-default opt-out from public attribution, and the kind of presence that does not photograph itself. Every detail of a private expedition — schedule, route, camp, hospitality, communications, aftercare — is shaped around the climber.
          </p>
          <p className="font-['Lexend'] font-light text-[17px] text-[#5A6673] leading-[1.75] max-w-[60ch]">
            These expeditions are not faster than our other editions. They are slower, more considered, and more carefully held. Speed is not a luxury at altitude. Care is.
          </p>
          
          <p className="font-['Cormorant_Garamond'] italic text-[#5A6673] text-[16px] max-w-[56ch] mt-4">
            We do not publish examples of private expeditions. Every record on our Expedition Archive that is not marked verified remains internal by default.
          </p>
        </div>

      </div>
    </section>
  );
};