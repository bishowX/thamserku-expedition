import type { SanityEditionFull, SanityExpeditionForMatrix } from "../../../lib/queries";

type PageData = {
  comparisonEyebrow?: string;
  comparisonHeadline?: string;
  comparisonNote?: string;
};

type Row = {
  label: string;
  getValue: (ed: SanityEditionFull, expeditions: SanityExpeditionForMatrix[]) => string;
};

const ROWS: Row[] = [
  { label: 'CHARACTER', getValue: (ed) => ed.character ?? '—' },
  { label: 'PRIVACY LEVEL', getValue: (ed) => ed.privacyLevel ?? '—' },
  { label: 'COMFORT LEVEL', getValue: (ed) => ed.comfortLevel ?? '—' },
  { label: 'STYLE', getValue: (ed) => ed.comparisonStyle ?? '—' },
  { label: 'BEST FOR', getValue: (ed) => ed.bestFor ?? '—' },
  {
    label: 'AVAILABLE ON',
    getValue: (ed, expeditions) =>
      expeditions
        .filter((exp) => exp.editionLetters.includes(ed.letter))
        .map((exp) => exp.name.toUpperCase())
        .join(' · ') || '—',
  },
];

export function EditionsComparison({
  editions,
  expeditions,
  page,
}: {
  editions: SanityEditionFull[];
  expeditions: SanityExpeditionForMatrix[];
  page?: PageData;
}) {
  const eyebrow = page?.comparisonEyebrow ?? "04 — AT A GLANCE";
  const headline = page?.comparisonHeadline ?? "Five editions, read side by side.";
  const note = page?.comparisonNote ?? "Note · Editions are not ranked. They are different ways of reading the same mountain. Speak with the expedition desk to find which edition fits your background and intent.";

  if (!editions.length) return null;

  return (
    <section className="w-full bg-white text-[#1A1A1A] py-24 px-8">
      <div className="w-full max-w-[1440px] mx-auto">
        <p className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#5A6673] mb-6">
          {eyebrow}
        </p>
        <h2 className="font-['Radley'] font-light text-4xl md:text-[56px] leading-[1.1] mb-24 max-w-[20ch]">
          {headline}
        </h2>

        <div className="w-full overflow-x-auto">
          <table className="w-full min-w-[1024px] text-left border-collapse">
            <thead>
              <tr className="border-b border-[#1A1A1A]/10">
                <th className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] font-normal text-[#5A6673] py-8 w-1/6">
                  EDITION
                </th>
                {editions.map((ed) => (
                  <th key={ed._id} className="font-['Radley'] font-light text-2xl md:text-3xl text-[#1A1A1A] py-8 w-[16.66%]">
                    {ed.name.replace(' Edition', '')}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {ROWS.map((row) => (
                <tr key={row.label} className="border-b border-[#1A1A1A]/10 transition-colors hover:bg-[#F4F2EC]/50">
                  <td className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#5A6673] py-8">
                    {row.label}
                  </td>
                  {editions.map((ed) => (
                    <td key={ed._id} className="font-['Lexend'] font-light text-[15px] text-[#1A1A1A] py-8 pr-4">
                      {row.getValue(ed, expeditions)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="font-['Radley'] italic text-[#5A6673] text-[16px] mt-16 max-w-[80ch]">
          {note}
        </p>
      </div>
    </section>
  );
}
