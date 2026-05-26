
type PageData = { introTitle?: string; introBody?: string };

export const ArchiveIntro = ({ page }: { page?: PageData }) => {
  return (
 <section className="bg-[#F4F2EC] py-24 px-8">
      <div className="max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-8">
        
        {/* Left column (5 cols) */}
        <div className="md:col-span-5 flex flex-col items-start">
          <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#5A6673] mb-8">
            THE READING — § I
          </span>
          <h2 className="font-['Radley'] font-light text-[48px] md:text-[56px] lg:text-[72px] text-[#1A1A1A] leading-[1.1] max-w-[16ch] mb-6">
            {page?.introTitle ?? 'An archive, read carefully.'}
          </h2>
          <p className="font-['Cormorant_Garamond'] italic text-[#0A3A77] text-[22px] max-w-[28ch]">
            Stewardship, not celebration.
          </p>
        </div>

        {/* Right column (7 cols) */}
        <div className="md:col-span-7 flex flex-col gap-6 pt-2 md:pt-16">
          <p className="font-['Lexend'] font-light text-[17px] text-[#5A6673] leading-[1.75] max-w-[60ch]">
            The Thamserku archive records the expeditions our house has supported across the Nepal Himalaya since the late 1980s. Each entry is treated as a fact of continuity — not a trophy. We do not summarise our years by counting summits; we summarise them by what we learned, who we walked with, and how we returned.
          </p>
          <p className="font-['Lexend'] font-light text-[17px] text-[#5A6673] leading-[1.75] max-w-[60ch]">
            Names, photographs, and identifying details remain private by default. Records are published only when client permission has been confirmed in writing. Where permission is pending or refused, the record is preserved internally but does not appear in the public archive.
          </p>
          <p className="font-['Lexend'] font-light text-[17px] text-[#5A6673] leading-[1.75] max-w-[60ch]">
            This page is part of an ongoing audit. Records, dates, routes, and details are being verified before publication. Where verification is incomplete, you will see a [CLIENT TO CONFIRM] marker.
          </p>
        </div>

      </div>
    </section>
  );
};