export function AtlasSeasonalGuide() {
  const months = [
    "JAN",
    "FEB",
    "MAR",
    "APR",
    "MAY",
    "JUN",
    "JUL",
    "AUG",
    "SEP",
    "OCT",
    "NOV",
    "DEC",
  ];

  return (
    <section className="w-full bg-white text-[#1A1A1A] py-24 px-8">
      <div className="max-w-[1440px] mx-auto flex flex-col gap-24">
        <div>
          <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#5A6673] block mb-6">
            05 — SEASONAL GUIDE
          </span>
          <h2 className="font-['Radley'] font-light text-5xl md:text-[56px] leading-[1.1] max-w-[24ch]">
            When the Himalaya is read, and when it is rested.
          </h2>
        </div>

        {/* Calendar Strip */}
        <div className="relative w-full border-t border-[#1A1A1A]/10 pt-4">
          {/* Header row */}
          <div className="grid grid-cols-12 mb-8 md:mb-16 gap-x-2">
            {months.map((month, i) => (
              <div
                key={i}
                className="font-['JetBrains_Mono'] text-[10px] uppercase tracking-[0.22em] text-[#5A6673] border-l border-[#1A1A1A]/10 pl-2 h-[480px] md:h-[240px]"
              >
                {month}
              </div>
            ))}
          </div>

          {/* Bands overlay */}
          <div className="absolute top-16 md:top-24 left-0 w-full h-full pointer-events-none">
            {/* Spring Band (Apr-May is idx 3-4, approx 16.666% width, starts at 25%) */}
            <div className="absolute top-0 left-[25%] w-[16.666%] pr-4 border-l border-transparent pl-2 hidden md:block">
              <div className="h-[4px] bg-[#0A3A77] w-full mb-3" />
              <div className="font-['JetBrains_Mono'] text-[10px] uppercase tracking-[0.22em] text-[#0A3A77] leading-[1.8]">
                EVEREST
                <br />
                DHAULAGIRI
                <br />
                MAKALU
                <br />
                HIMCHULI
              </div>
            </div>

            {/* Autumn Band (Sep-Nov is idx 8-10, approx 25% width, starts at 66.666%) */}
            <div className="absolute top-0 left-[66.666%] w-[25%] pr-4 border-l border-transparent pl-2 hidden md:block">
              <div className="h-[4px] bg-[#5A6673] w-full mb-3" />
              <div className="font-['JetBrains_Mono'] text-[10px] uppercase tracking-[0.22em] text-[#5A6673] leading-[1.8]">
                MANASLU
                <br />
                HIMCHULI
              </div>
            </div>

            {/* Mobile Fallback Bands */}
            <div className="md:hidden absolute top-0 left-[25%] w-[16.666%] pl-1">
              <div className="h-[120px] bg-[#0A3A77] w-[4px]" />
            </div>
            <div className="md:hidden absolute top-0 left-[66.666%] w-[25%] pl-1">
              <div className="h-[120px] bg-[#5A6673] w-[4px]" />
            </div>
          </div>
        </div>

        {/* Captions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16 pt-12 border-t border-[#1A1A1A]/10">
          <div>
            <div className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[10px] text-[#1A1A1A] mb-4">
              SPRING WINDOW
            </div>
            <p className="font-['Lexend'] font-light text-[#5A6673] text-[15px] leading-relaxed">
              "The most established Himalayan summit window. Long days, stable
              weather patterns, and the season most 8,000m expeditions are run."
            </p>
          </div>
          <div>
            <div className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[10px] text-[#1A1A1A] mb-4">
              AUTUMN WINDOW
            </div>
            <p className="font-['Lexend'] font-light text-[#5A6673] text-[15px] leading-relaxed">
              "A drier, clearer season favoured by Manaslu and quieter
              objectives. Cold sets in early; the window is shorter."
            </p>
          </div>
          <div>
            <div className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[10px] text-[#1A1A1A] mb-4">
              OFF-SEASON
            </div>
            <p className="font-['Lexend'] font-light text-[#5A6673] text-[15px] leading-relaxed">
              "Monsoon and deep winter are not climbing seasons at Thamserku.
              The mountain is at rest, and so are we."
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
