export function AtlasComparison() {
  const data = [
    {
      name: "Everest",
      altitude: "8,848.86 m",
      region: "Khumbu",
      season: "Spring",
      style: "Disciplined passage",
      editions: "A · B · C · D",
      bestFor: "Disciplined 8,000m aspirants"
    },
    {
      name: "Manaslu",
      altitude: "8,163 m",
      region: "Gorkha",
      season: "Autumn",
      style: "Progression climb",
      editions: "A · B · C",
      bestFor: "Progression climbers seeking scale"
    },
    {
      name: "Dhaulagiri",
      altitude: "8,167 m",
      region: "Dhaulagiri",
      season: "Spring",
      style: "Solitude climb",
      editions: "B · C · D",
      bestFor: "Solitude-led private climbers"
    },
    {
      name: "Makalu",
      altitude: "8,485 m",
      region: "Mahalangur",
      season: "Spring",
      style: "Technical climb",
      editions: "B · C · D",
      bestFor: "Technically experienced climbers"
    },
    {
      name: "Himchuli",
      altitude: "TBC",
      region: "Annapurna",
      season: "Spring · Autumn",
      style: "Quiet objective",
      editions: "A · B · E",
      bestFor: "Quiet, less commercial objectives"
    }
  ];

  return (
    <section className="w-full bg-[#0A3A77] text-white py-32 px-8">
      <div className="max-w-[1440px] mx-auto flex flex-col gap-16">
        <div className="flex flex-col md:flex-row gap-12 justify-between items-start mb-12">
          <div>
            <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#C8CDD2] block mb-6">
              04 — AT A GLANCE
            </span>
            <h2 className="font-['Radley'] font-light text-5xl md:text-[56px] leading-[1.1] max-w-[16ch]">
              Five mountains, read side by side.
            </h2>
          </div>
        </div>

        {/* Comparison Table */}
        <div className="w-full overflow-x-auto">
          <table className="w-full min-w-[1000px] text-left border-collapse">
            <thead>
              <tr className="border-b border-white/20">
                <th className="py-6 font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[10px] text-[#C8CDD2] font-normal w-[18%]">MOUNTAIN</th>
                <th className="py-6 font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[10px] text-[#C8CDD2] font-normal w-[12%]">ALTITUDE</th>
                <th className="py-6 font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[10px] text-[#C8CDD2] font-normal w-[15%]">REGION</th>
                <th className="py-6 font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[10px] text-[#C8CDD2] font-normal w-[15%]">SEASON</th>
                <th className="py-6 font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[10px] text-[#C8CDD2] font-normal w-[15%]">STYLE</th>
                <th className="py-6 font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[10px] text-[#C8CDD2] font-normal w-[10%]">EDITIONS</th>
                <th className="py-6 font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[10px] text-[#C8CDD2] font-normal w-[15%]">BEST FOR</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {data.map((row, idx) => (
                <tr key={idx} className="hover:bg-white/5 transition-colors duration-300 group">
                  <td className="py-8 pr-4 font-['Radley'] text-2xl text-white">
                    {row.name}
                  </td>
                  <td className="py-8 pr-4 font-['Lexend'] font-light text-[14px] text-[#C8CDD2] group-hover:text-white transition-colors">{row.altitude}</td>
                  <td className="py-8 pr-4 font-['Lexend'] font-light text-[14px] text-[#C8CDD2] group-hover:text-white transition-colors">{row.region}</td>
                  <td className="py-8 pr-4 font-['Lexend'] font-light text-[14px] text-[#C8CDD2] group-hover:text-white transition-colors">{row.season}</td>
                  <td className="py-8 pr-4 font-['Lexend'] font-light text-[14px] text-[#C8CDD2] group-hover:text-white transition-colors">{row.style}</td>
                  <td className="py-8 pr-4 font-['JetBrains_Mono'] tracking-[0.22em] text-[10px] text-[#C8CDD2] group-hover:text-white transition-colors">{row.editions}</td>
                  <td className="py-8 pr-4 font-['Lexend'] font-light text-[14px] text-[#C8CDD2] group-hover:text-white transition-colors">
                    {row.bestFor}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="pt-8 border-t border-white/20">
          <p className="font-['Radley'] text-[16px] italic text-[#C8CDD2] max-w-[80ch]">
            Note · Altitude is one variable among many. Speak with the expedition desk to understand which mountain is right for your background and intent.
          </p>
        </div>
      </div>
    </section>
  );
}