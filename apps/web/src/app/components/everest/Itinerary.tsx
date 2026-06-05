type ItineraryDay = {
  days: string;
  activity: string;
  accommodation: string;
  meals: string;
};

type Props = {
  itineraryHeading?: string;
  itinerary?: ItineraryDay[];
};

export function Itinerary({ itineraryHeading, itinerary }: Props) {
  const rows = itinerary ?? [];

  if (rows.length === 0 && !itineraryHeading) return null;

  return (
    <section className="bg-[#2E353C] w-full text-white py-16 md:py-24 px-5 md:px-8">
      <div className="max-w-[1320px] mx-auto flex flex-col gap-10 md:gap-14">
        <div className="flex flex-col gap-6 md:gap-8">
          <span className="font-['JetBrains_Mono'] font-medium uppercase tracking-[0.22em] text-[11px] text-[#C8CDD2]">
            05 — Program
          </span>
          {itineraryHeading && (
            <h2 className="font-['Radley'] text-[32px] md:text-[44px] lg:text-[48px] leading-[1.2] text-white">
              {itineraryHeading}
            </h2>
          )}
        </div>

        {rows.length > 0 && (
          <div className="border-t border-white/20">
            {rows.map((row, i) => (
              <div
                key={i}
                className="grid grid-cols-[40px_minmax(0,1fr)] md:grid-cols-[56px_minmax(0,1fr)_150px_72px] gap-x-5 md:gap-x-12 items-baseline md:items-center border-b border-white/20 py-5 md:py-4 md:min-h-[63px]"
              >
                <span className="font-['Radley'] text-[18px] md:text-[24px] leading-none text-[#C8CDD2]">
                  {row.days}
                </span>
                <span className="font-['Radley'] text-[18px] md:text-[24px] leading-[1.35] md:leading-[1.4] text-white">
                  {row.activity}
                </span>
                {row.accommodation && (
                  <span className="col-start-2 md:col-start-3 font-['Lexend'] font-light text-[13px] md:text-[15px] leading-[1.6] text-white/60 md:text-white mt-2 md:mt-0">
                    {row.accommodation}
                  </span>
                )}
                {row.meals && (
                  <span className="col-start-2 md:col-start-4 font-['Lexend'] font-light text-[13px] leading-[1.6] text-white/60 md:text-white mt-1 md:mt-0">
                    {row.meals}
                  </span>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
