import { Link } from 'react-router';

type EditionSpec = { _key?: string; label: string; value: string };
type Edition = {
  _key?: string;
  letter: string;
  pullQuote: string;
  headline: string;
  body: string;
  whoItIsFor: string;
  bestReadOn: string;
  specs?: EditionSpec[];
};
type PageData = {
  availableEditionsEyebrow?: string;
  availableEditionsHeadline?: string;
  availableEditionsTagline?: string;
  availableEditions?: Edition[];
};

const EDITION_LABELS: Record<string, string> = {
  C: 'CRAFTED',
  D: 'DEFINITIVE',
  E: 'EXPLORER',
};

const CONSULTATION_LABELS: Record<string, string> = {
  C: 'PRIVATE',
  D: 'DEFINITIVE',
  E: 'PRIVATE',
};

export const PrivateAvailableEditions = ({ page }: { page?: PageData }) => {
  const editions = page?.availableEditions ?? [];

  return (
    <section className="flex flex-col w-full">
      {/* Header */}
      <div className="bg-[#F4F2EC] px-8 py-24">
        <div className="max-w-[1440px] mx-auto flex flex-col items-center gap-7">
          <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#5A6673] text-center">
            {page?.availableEditionsEyebrow}
          </span>
          <h2 className="font-['Radley'] text-[72px] text-[#1A1A1A] leading-[1.1] text-center">
            {page?.availableEditionsHeadline}
          </h2>
          <p className="font-['Cormorant_Garamond'] italic text-[#2E353C] text-[22px] leading-[1.5] text-center max-w-[38ch]">
            {page?.availableEditionsTagline}
          </p>
        </div>
      </div>

      {/* Editions grid */}
      <div className="bg-white px-8 py-24">
        <div className="max-w-[1440px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-20">
            {editions.map((ed, idx) => {
              const paragraphs = ed.body ? ed.body.split(/\n\n+/).filter(Boolean) : [];
              const editionLabel = EDITION_LABELS[ed.letter] ?? ed.letter;
              const consultationLabel = CONSULTATION_LABELS[ed.letter] ?? 'PRIVATE';

              return (
                <div key={ed._key ?? idx} className="flex flex-col gap-6">
                  {/* Large letter */}
                  <span className="font-['Radley'] text-[160px] text-[#2E353C] leading-[1.1] tracking-[-0.1em]">
                    {ed.letter}
                  </span>

                  {/* Pull quote */}
                  <p className="font-['Cormorant_Garamond'] italic text-[#5A6673] text-[22px] leading-[1.5]">
                    "{ed.pullQuote}"
                  </p>

                  {/* Content */}
                  <div className="flex flex-col gap-[43px]">
                    {/* Headline + body */}
                    <div className="flex flex-col gap-6">
                      <h3 className="font-['Radley'] text-[36px] text-[#1A1A1A] leading-none">
                        {ed.headline}
                      </h3>
                      <div>
                        {paragraphs.map((p, pi) => (
                          <p
                            key={pi}
                            className={`font-['Lexend'] font-light text-[17px] text-[#5A6673] leading-[1.75] ${pi < paragraphs.length - 1 ? 'mb-4' : ''}`}
                          >
                            {p}
                          </p>
                        ))}
                      </div>
                    </div>

                    {/* Who it is for + Best read on */}
                    <div className="flex flex-col gap-6">
                      <div className="border-t border-[rgba(90,102,115,0.3)] pt-6 flex flex-col gap-2">
                        <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[10px] text-[#5A6673]">
                          WHO IT IS FOR
                        </span>
                        <p className="font-['Lexend'] font-light text-[15px] text-[#1A1A1A] leading-[1.5]">
                          {ed.whoItIsFor}
                        </p>
                      </div>
                      <div className="border-t border-[rgba(90,102,115,0.3)] pt-6 flex flex-col gap-2">
                        <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[10px] text-[#5A6673]">
                          BEST READ ON
                        </span>
                        <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[12px] text-[#1A1A1A]">
                          {ed.bestReadOn}
                        </span>
                      </div>
                    </div>

                    {/* CTAs */}
                    <div className="flex flex-col gap-6">
                      <Link
                        to="/editions"
                        className="border border-[#2E353C] text-[#2E353C] px-6 py-[17px] font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[10px] text-center hover:bg-[#2E353C] hover:text-white transition-colors"
                      >
                        READ THE {editionLabel} EDITION →
                      </Link>
                      <Link
                        to={`/consultation?intent=${ed.letter === 'D' ? 'definitive' : 'private'}`}
                        className="border border-[rgba(26,26,26,0.3)] text-[#5A6673] px-6 py-[17px] font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[10px] text-center hover:border-[#1A1A1A] hover:text-[#1A1A1A] transition-colors"
                      >
                        SCHEDULE A {consultationLabel} CONSULTATION →
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
