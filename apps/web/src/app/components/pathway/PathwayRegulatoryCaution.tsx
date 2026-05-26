type PageData = {
  cautionEyebrow?: string;
  cautionHeadline?: string;
  cautionBody?: string;
  cautionNote?: string;
  cautionFootnote?: string;
};

export const PathwayRegulatoryCaution = ({ page }: { page?: PageData }) => {
  const eyebrow = page?.cautionEyebrow;
  const headline = page?.cautionHeadline;
  const body = page?.cautionBody;
  const note = page?.cautionNote;
  const footnote = page?.cautionFootnote;

  if (!eyebrow || !headline || !body) return null;

  return (
    <section className="bg-[#F4F2EC] py-24 px-8">
      <div className="max-w-[1080px] mx-auto flex flex-col items-center">

        <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#5A6673] text-center mb-6">
          {eyebrow}
        </span>

        <h2 className="font-['Radley'] font-light text-[36px] md:text-[48px] text-[#1A1A1A] leading-[1.1] text-center max-w-[26ch] mb-8">
          {headline}
        </h2>

        <p className="font-['Lexend'] font-light text-[16px] text-[#5A6673] leading-[1.75] text-center max-w-[60ch] mb-6">
          {body}
        </p>

        {note && (
          <p className="font-['Cormorant_Garamond'] italic text-[#5A6673] text-[16px] text-center max-w-[60ch] mb-12">
            {note}
          </p>
        )}

        {footnote && (
          <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[10.5px] text-[#5A6673] text-center">
            {footnote}
          </span>
        )}

      </div>
    </section>
  );
};
