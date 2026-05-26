
export const ArchiveVerification = () => {
  return (
 <section className="bg-[#F4F2EC] py-24 px-8">
      <div className="max-w-[1440px] mx-auto flex flex-col items-center">
        
        {/* Section Header */}
        <div className="flex flex-col items-start md:items-center w-full max-w-[1180px] mb-20 md:mb-24">
          <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#5A6673] mb-6">
            VERIFICATION & PERMISSION — § V
          </span>
          <h2 className="font-['Radley'] font-light text-[44px] md:text-[56px] text-[#1A1A1A] leading-[1.1] max-w-[22ch] md:text-center">
            How this archive is verified.
          </h2>
        </div>

        {/* Three-column transparency grid */}
        <div className="w-full max-w-[1180px] grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-0 md:divide-x divide-[#C8CDD2] border-t border-[#C8CDD2] pt-12 md:pt-16 mb-20 md:mb-24">
          
          {/* Column 1 */}
          <div className="flex flex-col md:pr-12 lg:pr-16">
            <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#5A6673] mb-6 md:mb-8 min-h-[28px]">
              VERIFICATION <span className="mx-1">·</span> Records are audited.
            </span>
            <p className="font-['Lexend'] font-light text-[15px] text-[#5A6673] leading-[1.65] line-clamp-4">
              Every record is reviewed against internal expedition logs, field notes, and seasonal documentation before publication. Where dates, routes, or details are uncertain, the record is marked [CLIENT TO CONFIRM] until verification is complete.
            </p>
          </div>

          {/* Column 2 */}
          <div className="flex flex-col md:px-12 lg:px-16 pt-8 md:pt-0 border-t md:border-t-0 border-[#C8CDD2]">
            <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#5A6673] mb-6 md:mb-8 min-h-[28px]">
              PERMISSION <span className="mx-1">·</span> Privacy by default.
            </span>
            <p className="font-['Lexend'] font-light text-[15px] text-[#5A6673] leading-[1.65] line-clamp-4">
              Client names, photographs, and identifying details are not published without written permission. Records marked [PERMISSION REQUIRED] exist internally but are not visible in this public archive. Many of our expeditions remain entirely private.
            </p>
          </div>

          {/* Column 3 */}
          <div className="flex flex-col md:pl-12 lg:pl-16 pt-8 md:pt-0 border-t md:border-t-0 border-[#C8CDD2]">
            <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#5A6673] mb-6 md:mb-8 min-h-[28px]">
              ATTRIBUTION <span className="mx-1">·</span> Quietly noted, never claimed.
            </span>
            <p className="font-['Lexend'] font-light text-[15px] text-[#5A6673] leading-[1.65] line-clamp-4">
              Where credit belongs to a Sherpa team, a partner, or a visiting expedition, the record names them. The Thamserku archive credits the people who climbed, not the company that supported them.
            </p>
          </div>

        </div>

        {/* Below the grid */}
        <div className="w-full flex justify-center pt-8 border-t border-[#C8CDD2] md:border-none md:pt-0">
          <p className="font-['Cormorant_Garamond'] italic text-[#5A6673] text-[16px] text-center max-w-[60ch]">
            Inviting a record to be published — or asking for one to remain private — can be done at any time. Write to the expedition desk.
          </p>
        </div>

      </div>
    </section>
  );
};