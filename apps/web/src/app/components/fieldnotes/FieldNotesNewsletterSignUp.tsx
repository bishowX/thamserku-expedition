
export const FieldNotesNewsletterSignUp = () => {
  return (
 <section id="newsletter" className="bg-[#2E353C] py-24 px-8 scroll-mt-20">
      <div className="max-w-[880px] mx-auto flex flex-col items-center">
        
        {/* Eyebrow */}
        <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#C8CDD2] text-center mb-10">
          RECEIVE FIELD NOTES — § IV — A QUARTERLY LETTER
        </span>

        {/* Headline */}
        <h2 className="font-['Radley'] font-light text-[56px] md:text-[80px] text-white leading-[1.1] text-center max-w-[26ch] mb-8">
          "Receive Field Notes."<br />
          <span className="text-[#C8CDD2]">Four letters a year, quietly written.</span>
        </h2>

        {/* Sub-paragraph */}
        <div className="flex flex-col gap-4 mb-16">
          <p className="font-['Lexend'] font-light text-[17px] text-[#C8CDD2] leading-[1.65] text-center max-w-[60ch]">
            A quiet quarterly letter from our expedition desk. Field reports, route judgements, Sherpa notes, and Himalayan readings — written by the people who lead our expeditions.
          </p>
          <p className="font-['Lexend'] font-light text-[17px] text-[#C8CDD2] leading-[1.65] text-center max-w-[60ch]">
            No marketing. No frequency beyond what is honest. Unsubscribe anytime.
          </p>
        </div>

        {/* Inline Newsletter Form */}
        <div className="w-full max-w-[560px] flex flex-col md:flex-row mb-12">
          <div className="flex-grow flex flex-col md:border-b md:border-white/30 md:mr-6 mb-6 md:mb-0">
            <input 
              type="email" 
              placeholder="Your email address" 
              className="w-full bg-transparent border-b border-white/30 md:border-none py-4 text-white font-['Lexend'] text-[16px] placeholder:font-['Cormorant_Garamond'] placeholder:italic placeholder:text-[#C8CDD2]/50 focus:outline-none focus:border-white/60 transition-colors"
            />
          </div>
          <div className="md:border-l md:border-white/30 md:pl-6 flex items-center justify-center">
            <button className="w-full md:w-auto border border-white/50 text-white px-8 py-4 flex items-center justify-center font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] hover:bg-white hover:text-[#0A3A77] transition-colors whitespace-nowrap">
              SUBSCRIBE TO FIELD NOTES →
            </button>
          </div>
        </div>

        {/* Small privacy line */}
        <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[10.5px] text-[#C8CDD2] text-center mb-6">
          BY SUBSCRIBING YOU AGREE TO OUR PRIVACY TERMS. WE WILL NEVER SHARE YOUR DETAILS.
        </span>

        {/* Bottom note */}
        <p className="font-['Cormorant_Garamond'] italic text-[#C8CDD2]/80 text-[16px] text-center max-w-[60ch]">
          Our previous letters are not posted publicly. Subscribers receive the full archive on signup.
        </p>

      </div>
    </section>
  );
};