import type { SanityEditionFull, SanityExpeditionForMatrix } from "../../../lib/queries";

type PageData = {
  availabilityEyebrow?: string;
  availabilityHeadline?: string;
  availabilityNote?: string;
};

export function EditionsAvailability({
  expeditions,
  editions,
  page,
}: {
  expeditions: SanityExpeditionForMatrix[];
  editions: SanityEditionFull[];
  page?: PageData;
}) {
  const eyebrow = page?.availabilityEyebrow ?? "05 — AVAILABILITY ATLAS";
  const headline = page?.availabilityHeadline ?? "Which editions are offered on which mountains.";
  const note = page?.availabilityNote ?? "Note · Explorer Edition is offered as a separate Everest Base Camp / Everest Experience product, not as a summit climb.";

  if (!expeditions.length || !editions.length) return null;

  return (
 <section className="relative w-full bg-[#1A1A1A] text-white section-padding overflow-hidden">
      <div className="relative z-10 w-full max-w-[1440px] mx-auto">
        <p className="font-['DM_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#C8CDD2] mb-6">
          {eyebrow}
        </p>
        <h2 className="font-['Fraunces'] font-light text-display-l mb-10 md:mb-24 max-w-[20ch]">
          {headline}
        </h2>

        <div className="w-full overflow-x-auto">
          <table className="w-full min-w-[800px] text-center border-collapse">
            <thead>
              <tr>
                <th className="w-1/6"></th>
                {expeditions.map((exp) => (
                  <th key={exp._id} className="pb-12 border-b border-white/10 w-[16.66%]">
                    <span className="font-['DM_Mono'] uppercase tracking-[0.22em] text-[11px] font-normal text-white">
                      {exp.name.toUpperCase()}
                    </span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {editions.map((ed) => (
                <tr key={ed._id}>
                  <td className="py-8 border-b border-white/10 text-left">
                    <span className="font-['Fraunces'] font-light text-display-m text-[#C8CDD2]">
                      {ed.letter}
                    </span>
                  </td>
                  {expeditions.map((exp) => {
                    const available = exp.editionLetters.includes(ed.letter);
                    return (
                      <td key={exp._id} className="py-8 border-b border-white/10 text-center">
                        {available ? (
                          <div className="flex flex-col items-center gap-3">
                            <div className="w-2.5 h-2.5 rounded-full bg-[#C8CDD2]"></div>
                            <span className="font-['DM_Mono'] tracking-[0.22em] text-[11px] text-[#5A6673]">
                              {exp.altitude}
                            </span>
                          </div>
                        ) : (
                          <span className="text-[#5A6673]">—</span>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="font-['Fraunces'] italic text-[#C8CDD2] text-body mt-16 max-w-[80ch]">
          {note}
        </p>
      </div>
    </section>
  );
}
