
export function LegacyNewsletterBanner() {
  return (
    <section className="w-full bg-[#F4F2EC] py-[120px] md:py-[160px] px-8 flex justify-center">
      <div className="w-full max-w-[880px] flex flex-col items-center text-center">
        <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#5A6673] mb-8">
          FIELD NOTES — NEWSLETTER FROM THE EXPEDITION DESK
        </span>
        
        <h2 className="font-['Radley'] font-light text-[44px] md:text-[56px] text-[#1A1A1A] leading-tight max-w-[26ch] mb-6">
          "A quiet letter, four times a year."
        </h2>
        
        <p className="font-['Lexend'] text-[#5A6673] text-[16px] leading-[1.7] max-w-[60ch] mb-12">
          Field reports, route judgements, and Himalayan readings from our expedition desk. No marketing. No frequency beyond what is honest. Unsubscribe anytime.
        </p>
        
        <form 
          className="w-full max-w-[600px] flex flex-col md:flex-row items-center justify-center gap-6 md:gap-0 mb-8"
          onSubmit={(e) => e.preventDefault()}
        >
          <input 
            type="email" 
            placeholder="Your email address"
            className="w-full md:flex-1 bg-transparent border-b border-[#5A6673]/30 py-4 px-2 focus:outline-none focus:border-[#1A1A1A] transition-colors placeholder:text-[#5A6673]/50 placeholder:font-['Cormorant_Garamond'] placeholder:italic placeholder:text-[18px] text-[16px] text-[#1A1A1A] font-['Lexend']"
            required
          />
          <div className="hidden md:block w-[1px] h-[30px] bg-[#5A6673]/30 mx-6"></div>
          <button 
            type="submit"
            className="w-full md:w-auto shrink-0 px-8 py-4 font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#0A3A77] border border-[#0A3A77] hover:bg-[#0A3A77] hover:text-white transition-colors"
          >
            SUBSCRIBE TO FIELD NOTES →
          </button>
        </form>

        <p className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[10.5px] text-[#5A6673]">
          BY SUBSCRIBING YOU AGREE TO OUR PRIVACY TERMS. WE WILL NEVER SHARE YOUR DETAILS.
        </p>
      </div>
    </section>
  );
}
