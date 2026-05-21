
export const EnquiryProcess = () => {
  return (
    <section className="relative bg-[#1A1A1A] py-24 md:py-48 overflow-hidden">
      {/* Faint cartographic grid overlay */}
      <div 
        className="absolute inset-0 z-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(to right, #C8CDD2 1px, transparent 1px),
            linear-gradient(to bottom, #C8CDD2 1px, transparent 1px)
          `,
          backgroundSize: '64px 64px'
        }}
      />
      
      <div className="relative z-10 max-w-[1440px] mx-auto px-8">
        <div className="mb-24">
          <p className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#5A6673] mb-6">
            04 — WHAT HAPPENS NEXT
          </p>
          <h2 className="font-['Cormorant_Garamond'] font-light text-4xl md:text-[44px] lg:text-[56px] leading-[1.1] text-white max-w-[22ch]">
            Four quiet steps, after you write to us.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-24">
          
          {/* Step 1 */}
          <div className="flex flex-col">
            <div className="w-12 h-12 rounded-full border border-[#C8CDD2] flex items-center justify-center mb-8">
              <span className="font-['Cormorant_Garamond'] font-light text-[#C8CDD2] text-xl">01</span>
            </div>
            <p className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#5A6673] mb-4">
              STEP 01 <span className="mx-1">·</span> REVIEW
            </p>
            <h3 className="font-['Cormorant_Garamond'] text-[24px] text-white mb-4">
              We read your letter.
            </h3>
            <p className="text-[#C8CDD2] font-light text-base leading-relaxed line-clamp-3">
              Your letter is reviewed by senior expedition staff at our Kathmandu desk, usually within 48 hours. Nothing is automated.
            </p>
          </div>

          {/* Step 2 */}
          <div className="flex flex-col">
            <div className="w-12 h-12 rounded-full border border-[#C8CDD2] flex items-center justify-center mb-8">
              <span className="font-['Cormorant_Garamond'] font-light text-[#C8CDD2] text-xl">02</span>
            </div>
            <p className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#5A6673] mb-4">
              STEP 02 <span className="mx-1">·</span> ADVISOR CONTACT
            </p>
            <h3 className="font-['Cormorant_Garamond'] text-[24px] text-white mb-4">
              An advisor writes back.
            </h3>
            <p className="text-[#C8CDD2] font-light text-base leading-relaxed line-clamp-3">
              A dedicated advisor responds personally — by email, phone, or WhatsApp, depending on your preference. The conversation begins.
            </p>
          </div>

          {/* Step 3 */}
          <div className="flex flex-col">
            <div className="w-12 h-12 rounded-full border border-[#C8CDD2] flex items-center justify-center mb-8">
              <span className="font-['Cormorant_Garamond'] font-light text-[#C8CDD2] text-xl">03</span>
            </div>
            <p className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#5A6673] mb-4">
              STEP 03 <span className="mx-1">·</span> RECOMMENDATION
            </p>
            <h3 className="font-['Cormorant_Garamond'] text-[24px] text-white mb-4">
              A mountain and an edition are recommended.
            </h3>
            <p className="text-[#C8CDD2] font-light text-base leading-relaxed line-clamp-3">
              Based on your background, your timing, and your intention, we recommend the mountain and edition that fit. We may ask a few more questions before recommending.
            </p>
          </div>

          {/* Step 4 */}
          <div className="flex flex-col">
            <div className="w-12 h-12 rounded-full border border-[#C8CDD2] flex items-center justify-center mb-8">
              <span className="font-['Cormorant_Garamond'] font-light text-[#C8CDD2] text-xl">04</span>
            </div>
            <p className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#5A6673] mb-4">
              STEP 04 <span className="mx-1">·</span> TAILORED PROPOSAL
            </p>
            <h3 className="font-['Cormorant_Garamond'] text-[24px] text-white mb-4">
              A private proposal is shaped.
            </h3>
            <p className="text-[#C8CDD2] font-light text-base leading-relaxed line-clamp-3">
              Once the direction is set, a tailored proposal is prepared — itinerary, leadership, logistics, and pricing — written specifically for your expedition.
            </p>
          </div>

        </div>

        <div className="text-center pt-12 border-t border-[#2E353C]">
          <p className="font-['Cormorant_Garamond'] italic text-[#C8CDD2] text-[16px] max-w-[60ch] mx-auto">
            Note · No part of this process is automated. Every step is read, written, and shaped by people.
          </p>
        </div>

      </div>
    </section>
  );
};
