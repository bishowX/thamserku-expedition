type PageData = {
  planningContextEyebrow?: string;
  planningContextHeadline?: string;
  planningContextSubtitle?: string;
  planningContextBody?: string;
  planningContextNote?: string;
};

export const PathwayPlanningContext = ({ page }: { page?: PageData }) => {
  if (!page?.planningContextHeadline || !page?.planningContextBody) return null;

  const paragraphs = page.planningContextBody.split(/\n\n+/).filter(Boolean);

  return (
    <section className="bg-[#F4F2EC] section-padding">
      <div className="max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-8">

        <div className="md:col-span-5 flex flex-col items-start">
          {page.planningContextEyebrow && (
            <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#5A6673] mb-8">
              {page.planningContextEyebrow}
            </span>
          )}
          <h2 className="font-['Radley'] font-light text-[48px] md:text-[56px] lg:text-[72px] text-[#1A1A1A] leading-[1.1] max-w-[16ch] mb-6">
            {page.planningContextHeadline}
          </h2>
          {page.planningContextSubtitle && (
            <p className="font-['Cormorant_Garamond'] italic text-[#0A3A77] text-[22px] max-w-[28ch]">
              {page.planningContextSubtitle}
            </p>
          )}
        </div>

        <div className="md:col-span-7 flex flex-col gap-6 pt-2 md:pt-16">
          {paragraphs.map((para, i) => (
            <p key={i} className="font-['Lexend'] font-light text-[17px] text-[#5A6673] leading-[1.75] max-w-[60ch]">
              {para}
            </p>
          ))}
          {page.planningContextNote && (
            <p className="font-['Cormorant_Garamond'] italic text-[#5A6673] text-[16px] max-w-[56ch] mt-4">
              {page.planningContextNote}
            </p>
          )}
        </div>

      </div>
    </section>
  );
};
