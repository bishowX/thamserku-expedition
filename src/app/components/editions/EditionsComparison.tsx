export function EditionsComparison() {
  const tableData = [
    { label: "CHARACTER", a: "Disciplined", b: "Personal", c: "Crafted", d: "Definitive", e: "Cultural" },
    { label: "PRIVACY LEVEL", a: "Standard", b: "Tailored", c: "High", d: "Maximum", e: "Tailored" },
    { label: "COMFORT LEVEL", a: "Essential", b: "Considered", c: "Elevated", d: "Definitive", e: "Considered" },
    { label: "STYLE", a: "Disciplined climb", b: "Personal climb", c: "Service-rich climb", d: "Private flagship", e: "Non-summit reading" },
    { label: "BEST FOR", a: "Experienced climbers", b: "Private groups", c: "Elevated service", d: "UHNW individuals", e: "Cultural explorers" },
    { label: "AVAILABLE ON", a: "EVEREST · MANASLU · HIMCHULI", b: "ALL", c: "EVEREST · MANASLU · DHAULAGIRI · MAKALU", d: "EVEREST · DHAULAGIRI · MAKALU", e: "HIMCHULI · EVEREST B.C." }
  ];

  return (
    <section className="w-full bg-white text-[#1A1A1A] py-32 px-8">
      <div className="w-full max-w-[1440px] mx-auto">
        <p className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#5A6673] mb-6">
          04 — AT A GLANCE
        </p>
        <h2 className="font-['Radley'] font-light text-4xl md:text-[56px] leading-[1.1] mb-24 max-w-[20ch]">
          Five editions, read side by side.
        </h2>

        {/* Comparison Table */}
        <div className="w-full overflow-x-auto">
          <table className="w-full min-w-[1024px] text-left border-collapse">
            <thead>
              <tr className="border-b border-[#1A1A1A]/10">
                <th className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] font-normal text-[#5A6673] py-8 w-1/6">
                  EDITION
                </th>
                {['A', 'B', 'C', 'D', 'E'].map(letter => (
                  <th key={letter} className="font-['Radley'] font-light text-2xl md:text-3xl text-[#1A1A1A] py-8 w-[16.66%]">
                    {letter === 'A' && 'Alpine'}
                    {letter === 'B' && 'Bespoke'}
                    {letter === 'C' && 'Crafted'}
                    {letter === 'D' && 'Definitive'}
                    {letter === 'E' && 'Explorer'}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {tableData.map((row, idx) => (
                <tr key={idx} className="border-b border-[#1A1A1A]/10 transition-colors hover:bg-[#F4F2EC]/50">
                  <td className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#5A6673] py-8">
                    {row.label}
                  </td>
                  <td className="font-['Lexend'] font-light text-[15px] text-[#1A1A1A] py-8 pr-4">
                    {row.a}
                  </td>
                  <td className="font-['Lexend'] font-light text-[15px] text-[#1A1A1A] py-8 pr-4">
                    {row.b}
                  </td>
                  <td className="font-['Lexend'] font-light text-[15px] text-[#1A1A1A] py-8 pr-4">
                    {row.c}
                  </td>
                  <td className="font-['Lexend'] font-light text-[15px] text-[#1A1A1A] py-8 pr-4">
                    {row.d}
                  </td>
                  <td className="font-['Lexend'] font-light text-[15px] text-[#1A1A1A] py-8 pr-4">
                    {row.e}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="font-['Radley'] italic text-[#5A6673] text-[16px] mt-16 max-w-[80ch]">
          Note · Editions are not ranked. They are different ways of reading the same mountain. Speak with the expedition desk to find which edition fits your background and intent.
        </p>
      </div>
    </section>
  );
}
