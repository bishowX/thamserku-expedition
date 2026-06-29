import type {
  SanityEditionFull,
  SanityExpeditionForMatrix,
} from "../../../lib/queries";

type PageData = {
  comparisonEyebrow?: string;
  comparisonHeadline?: string;
};

type Row = {
  label: string;
  getValue: (
    ed: SanityEditionFull,
    expeditions: SanityExpeditionForMatrix[],
  ) => string;
};

const ROWS: Row[] = [
  { label: "CHARACTER", getValue: (ed) => ed.character ?? "—" },
  { label: "PRIVACY LEVEL", getValue: (ed) => ed.privacyLevel ?? "—" },
  { label: "COMFORT LEVEL", getValue: (ed) => ed.comfortLevel ?? "—" },
  { label: "STYLE", getValue: (ed) => ed.comparisonStyle ?? "—" },
  { label: "BEST FOR", getValue: (ed) => ed.bestFor ?? "—" },
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
  const headline =
    page?.comparisonHeadline ?? "Five editions, read side by side.";
  if (!editions.length) return null;

  return (
    <section className="w-full bg-white text-[#1A1A1A] section-padding">
      <div className="w-full max-w-[1440px] mx-auto">
        <p className="font-['DM_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#5A6673] mb-6">
          {eyebrow}
        </p>
        <h2 className="font-['Fraunces'] font-light text-display-l mb-4 md:mb-6 max-w-[20ch]">
          {headline}
        </h2>

        <div className="w-full overflow-x-auto">
          <table className="w-full min-w-[1024px] text-left border-collapse">
            <thead>
              <tr className="border-b border-[#1A1A1A]/10">
                <th className="font-['DM_Mono'] uppercase tracking-[0.22em] text-[11px] font-normal text-[#5A6673] py-3 md:py-4 w-1/6">
                  EDITION
                </th>
                {editions.map((ed) => (
                  <th
                    key={ed._id}
                    className="font-['Fraunces'] font-light text-display-m text-[#1A1A1A] py-3 md:py-4 w-[16.66%]"
                  >
                    {ed.name.replace(" Edition", "")}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {ROWS.map((row) => (
                <tr
                  key={row.label}
                  className="border-b border-[#1A1A1A]/10 transition-colors hover:bg-[#F4F2EC]/50"
                >
                  <td className="font-['DM_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#5A6673] py-1 md:py-8">
                    {row.label}
                  </td>
                  {editions.map((ed) => (
                    <td
                      key={ed._id}
                      className="font-['DM_Sans'] font-light text-body text-[#1A1A1A] py-1 md:py-8 pr-4"
                    >
                      {row.getValue(ed, expeditions)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>


      </div>
    </section>
  );
}
