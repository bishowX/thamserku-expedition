import type { SanityExpedition } from "../../../lib/queries";

type ComparisonData = {
  comparisonEyebrow?: string;
  comparisonHeadline?: string;
  comparisonNote?: string;
};

type Props = {
  expeditions: SanityExpedition[];
  data?: ComparisonData;
};

export function AtlasComparison({ expeditions, data }: Props) {
  const eyebrow = data?.comparisonEyebrow ?? "04 — AT A GLANCE";
  const headline =
    data?.comparisonHeadline ?? "Five mountains, read side by side.";
  const note =
    data?.comparisonNote ??
    "Note · Altitude is one variable among many. Speak with the expedition desk to understand which mountain is right for your background and intent.";

  return (
    <section className="w-full bg-[#2E353C] text-white section-padding">
      <div className="max-w-[1440px] mx-auto flex flex-col gap-8 md:gap-16">
        <div className="flex flex-col md:flex-row gap-12 justify-between items-start mb-12">
          <div>
            <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#C8CDD2] block mb-6">
              {eyebrow}
            </span>
            <h2 className="font-['Radley'] font-light text-5xl md:text-[56px] leading-[1.1] max-w-[16ch]">
              {headline}
            </h2>
          </div>
        </div>

        <div className="w-full overflow-x-auto">
          <table className="w-full min-w-[1000px] text-left border-collapse">
            <thead>
              <tr className="border-b border-white/20">
                {[
                  "MOUNTAIN",
                  "ALTITUDE",
                  "REGION",
                  "SEASON",
                  "STYLE",
                  "BEST FOR",
                ].map((col) => (
                  <th
                    key={col}
                    className="py-6 font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[10px] text-[#C8CDD2] font-normal"
                  >
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {expeditions.map((exp) => (
                <tr
                  key={exp._id}
                  className="hover:bg-white/5 transition-colors duration-300 group"
                >
                  <td className="py-4 md:py-8 pr-3 font-['Radley'] text-base md:text-2xl text-white">
                    {exp.name}
                  </td>
                  <td className="py-1 md:py-8 min-w-25 pr-3 font-['Lexend'] font-light text-base text-[#C8CDD2] group-hover:text-white transition-colors">
                    {exp.altitude ?? "TBC"}
                  </td>
                  <td className="py-1 md:py-8 pr-3 font-['Lexend'] font-light text-base text-[#C8CDD2] group-hover:text-white transition-colors">
                    {exp.region ?? "—"}
                  </td>
                  <td className="py-1 md:py-8 pr-3 font-['Lexend'] font-light text-base text-[#C8CDD2] group-hover:text-white transition-colors">
                    {exp.season ?? "—"}
                  </td>
                  <td className="py-1 md:py-8 pr-3 font-['Lexend'] font-light text-base text-[#C8CDD2] group-hover:text-white transition-colors">
                    {exp.style ?? "—"}
                  </td>

                  <td className="py-1 md:py-8 pr-3 font-['Lexend'] font-light text-base text-[#C8CDD2] group-hover:text-white transition-colors">
                    {exp.bestFor ?? "—"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="pt-8 border-t border-white/20">
          <p className="font-['Radley'] text-[16px] italic text-[#C8CDD2] max-w-[80ch]">
            {note}
          </p>
        </div>
      </div>
    </section>
  );
}
