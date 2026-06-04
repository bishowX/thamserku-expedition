type TimelineItem = { year: string; title: string; description: string };

type LegacyData = {
  legacyEyebrow?: string;
  legacyHeading?: string;
  legacyIntro?: string;
  legacyTimelineItems?: TimelineItem[];
};

export function LegacyPreview({ data }: { data?: LegacyData }) {
  const items = data?.legacyTimelineItems;

  return (
    <section id="legacy" className="w-full bg-[#C8CDD2] section-padding">
      <div className="max-w-7xl mx-auto text-center mb-16">
        {data?.legacyEyebrow && (
          <p className="font-['JetBrains_Mono'] text-[11px] tracking-[2.4px] uppercase text-[#1A1A1A] mb-6">
            {data.legacyEyebrow}
          </p>
        )}
        {data?.legacyHeading && (
          <h2 className="font-['Radley'] text-fluid-heading leading-[1.1] text-[#1A1A1A] mb-6">
            {data.legacyHeading}
          </h2>
        )}
        {data?.legacyIntro && (
          <p className="font-['Lexend'] font-light text-[15px] leading-[1.6] text-[#202121] max-w-[540px] mx-auto">
            {data.legacyIntro}
          </p>
        )}
      </div>

      {items && items.length > 0 && (
        <div className="max-w-7xl mx-auto relative">
          {/* Horizontal connector line — desktop only, sits at dot centre */}
          <div className="hidden md:block absolute left-0 right-0 h-px bg-white top-[47px]" />

          <div className="grid grid-cols-1 gap-12 md:grid-cols-3 md:gap-0">
            {items.map((item, i) => {
              const dotAlign =
                i === 0 ? 'md:items-start' : i === items.length - 1 ? 'md:items-end' : 'md:items-center';
              return (
                <div key={item.year} className={`flex flex-col items-center ${dotAlign}`}>
                  <div className="bg-[#2E353C] px-2 h-[15px] flex items-center mt-2 mb-4">
                    <span className="font-['JetBrains_Mono'] text-[10px] text-white tracking-[2.2px] uppercase whitespace-nowrap">
                      {item.year}
                    </span>
                  </div>
                  <div className="w-4 h-4 rounded-full bg-[#2E353C] border border-white relative z-10 mb-6 md:mb-16" />
                  <div className="flex flex-col gap-4 items-center text-center px-8">
                    <h3 className="font-['Radley'] text-[24px] leading-[1.4] text-[#1A1A1A]">
                      {item.title}
                    </h3>
                    <p className="font-['Lexend'] font-light text-[15px] leading-[1.75] text-[#5A6673]">
                      {item.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </section>
  );
}
