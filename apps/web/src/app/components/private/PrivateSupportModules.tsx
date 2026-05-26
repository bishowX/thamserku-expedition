type SupportModule = {
  _key?: string;
  numeral: string;
  eyebrow: string;
  title: string;
  body: string;
  practice: string;
};

type PageData = {
  supportModulesEyebrow?: string;
  supportModulesHeadline?: string;
  supportModulesTagline?: string;
  supportModules?: SupportModule[];
};

export const PrivateSupportModules = ({ page }: { page?: PageData }) => {
  const modules = page?.supportModules ?? [];

  return (
    <section className="relative w-full bg-[#1A1A1A] py-24 px-8 overflow-hidden">
      <div
        className="absolute inset-0 z-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(to right, #C8CDD2 1px, transparent 1px),
            linear-gradient(to bottom, #C8CDD2 1px, transparent 1px)
          `,
          backgroundSize: '64px 64px',
        }}
      />

      <div className="relative z-10 max-w-[1320px] mx-auto flex flex-col items-center">
        <div className="flex flex-col items-center mb-24 md:mb-32">
          <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#C8CDD2] text-center mb-8">
            {page?.supportModulesEyebrow}
          </span>
          <h2 className="font-['Radley'] font-light text-[48px] md:text-[56px] lg:text-[72px] text-white leading-[1.1] text-center max-w-[22ch] mb-6">
            {page?.supportModulesHeadline}
          </h2>
          <p className="font-['Cormorant_Garamond'] italic text-[#C8CDD2] text-[22px] text-center max-w-[56ch]">
            {page?.supportModulesTagline}
          </p>
        </div>

        <div className="w-full flex flex-col border-t border-[#C8CDD2]/30">
          {modules.map((mod, idx) => (
            <div
              key={mod._key ?? idx}
              className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-0 py-[60px] md:py-[80px] border-b border-[#C8CDD2]/30"
            >
              <div className="md:col-span-3 flex flex-col items-start pr-8">
                <span className="font-['JetBrains_Mono'] font-light text-[32px] text-[#C8CDD2] mb-4">
                  {mod.numeral}
                </span>
                <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#5A6673]">
                  {mod.eyebrow}
                </span>
              </div>
              <div className="md:col-span-6 flex flex-col items-start pr-0 md:pr-12">
                <h3 className="font-['Radley'] font-light text-[32px] md:text-[40px] text-white leading-[1.1] max-w-[18ch] mb-6">
                  {mod.title}
                </h3>
                <p className="font-['Lexend'] font-light text-[15.5px] text-[#C8CDD2] leading-[1.7] max-w-[56ch]">
                  {mod.body}
                </p>
              </div>
              <div className="md:col-span-3 flex flex-col items-start pt-2 md:pt-4">
                <p className="font-['Cormorant_Garamond'] italic text-[#C8CDD2] text-[18px] leading-[1.45] max-w-[28ch]">
                  {mod.practice}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
