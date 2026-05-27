
type PageData = { philosophyEyebrow?: string; philosophyHeadline?: string; philosophyTagline?: string; philosophyBody?: string; philosophyFootnote?: string };

export const PrivatePhilosophy = ({ page }: { page?: PageData }) => {
  const paragraphs = (page?.philosophyBody ?? '').split(/\n\n+/).filter(Boolean);

  return (
    <section className="bg-[#F4F2EC] section-padding">
      <div className="max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-8">

        {/* Left column (5 cols) */}
        <div className="md:col-span-5 flex flex-col items-start">
          <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#5A6673] mb-8">
            {page?.philosophyEyebrow}
          </span>
          <h2 className="font-['Radley'] font-light text-[48px] md:text-[56px] lg:text-[72px] text-[#1A1A1A] leading-[1.1] max-w-[18ch] mb-6">
            {page?.philosophyHeadline}
          </h2>
          <p className="font-['Cormorant_Garamond'] italic text-[#0A3A77] text-[22px] max-w-[28ch]">
            {page?.philosophyTagline}
          </p>
        </div>

        {/* Right column (7 cols) */}
        <div className="md:col-span-7 flex flex-col gap-6 pt-2 md:pt-16">
          {paragraphs.map((para, i) => (
            <p key={i} className="font-['Lexend'] font-light text-[17px] text-[#5A6673] leading-[1.75] max-w-[60ch]">
              {para}
            </p>
          ))}

          <p className="font-['Cormorant_Garamond'] italic text-[#5A6673] text-[16px] max-w-[56ch] mt-4">
            {page?.philosophyFootnote}
          </p>
        </div>

      </div>
    </section>
  );
};
