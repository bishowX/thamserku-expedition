
type PageData = { audiencesEyebrow?: string; audiencesHeadline?: string; audiencesTagline?: string };
type PrivateAudience = { title: string; subtitle: string; body: string; _key?: string };

export const PrivateWhoItIsFor = ({ page, audiences }: { page?: PageData; audiences?: PrivateAudience[] }) => {
  const displayAudiences = (audiences ?? []).map((a) => ({ eyebrow: a.title, title: a.subtitle, desc: a.body, _key: a._key }));

  return (
    <section className="bg-[#1A1A1A] section-padding">
      <div className="max-w-[1440px] mx-auto flex flex-col items-center">

        {/* Section Header */}
        <div className="flex flex-col items-center mb-24 md:mb-32">
          <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#C8CDD2] text-center mb-8">
            {page?.audiencesEyebrow}
          </span>
          <h2 className="font-['Radley'] font-light text-[48px] md:text-[56px] lg:text-[72px] text-white leading-[1.1] text-center max-w-[22ch] mb-6">
            {page?.audiencesHeadline}
          </h2>
          <p className="font-['Cormorant_Garamond'] italic text-[#C8CDD2] text-[22px] text-center max-w-[56ch]">
            {page?.audiencesTagline}
          </p>
        </div>

        {/* Audience grid */}
        <div className="w-full max-w-[1320px] grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
          {displayAudiences.map((audience, idx) => (
            <div
              key={audience._key ?? idx}
              className="flex flex-col bg-[#2E353C]/30 border-t border-[#C8CDD2]/30 px-6 py-10"
            >
              <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#C8CDD2] mb-6 block min-h-[3em]">
                {audience.eyebrow}
              </span>
              <h3 className="font-['Radley'] font-light text-[22px] md:text-[26px] text-white leading-[1.2] mb-6">
                {audience.title}
              </h3>
              <p className="font-['Lexend'] font-light text-[15px] text-[#C8CDD2] leading-[1.65]">
                {audience.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
