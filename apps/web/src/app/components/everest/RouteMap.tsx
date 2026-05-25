type Waypoint = { name: string; altitude: string };

type Props = {
  waypoints?: Waypoint[];
  routePhilosophy?: string;
  acclimatisationNote?: string;
  summitWindowNote?: string;
};

export function RouteMap({
  waypoints,
  routePhilosophy,
  acclimatisationNote,
  summitWindowNote,
}: Props) {
  const points = waypoints ?? [];
  return (
    <section className="bg-[#2E353C] w-full text-white py-24 overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-8 flex flex-col gap-24">
        <div className="flex flex-col gap-8">
          <h2 className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#C8CDD2]">
            06 — ROUTE
          </h2>
          <h3 className="font-['Radley'] font-light text-[44px] md:text-[56px] leading-[1.1] max-w-[32ch]">
            {points.length > 0
              ? `From ${points[0].name} to the summit. ${points.length - 1} points on the line.`
              : "The route."}
          </h3>
        </div>

        {points.length > 0 && (
          <div className="relative w-full h-[400px] flex items-center mt-8 mb-16 overflow-x-auto hide-scrollbar">
            <div className="min-w-[1200px] w-full h-full relative flex items-end justify-between px-12">
              <div className="absolute left-12 right-12 bottom-[40px] h-[1px] bg-white/30" />
              {points.map((wp, idx) => {
                const isSummit = idx === points.length - 1;
                const heightFactor = (idx / (points.length - 1)) * 250;
                return (
                  <div
                    key={idx}
                    className="relative flex flex-col items-center group"
                    style={{ bottom: `${heightFactor + 40}px` }}
                  >
                    <div
                      className="absolute top-[8px] w-[1px] bg-white/20"
                      style={{ height: `${heightFactor}px` }}
                    />
                    <div className="w-2 h-2 rounded-full bg-white relative z-10" />
                    <div className="absolute bottom-full mb-6 flex flex-col items-center w-max">
                      <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#C8CDD2] mb-2 text-center">
                        {wp.name}
                      </span>
                      <span
                        className={`font-['Radley'] font-light ${isSummit ? "text-[24px]" : "text-[18px]"} text-white`}
                      >
                        {wp.altitude}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 border-t border-white/20 pt-16">
          <div className="flex flex-col gap-4">
            <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#C8CDD2]">
              ROUTE PHILOSOPHY
            </span>
            {routePhilosophy && (
              <p className="font-['Lexend'] font-light text-[#C8CDD2] text-[15px] leading-[1.8] max-w-[40ch]">
                {routePhilosophy}
              </p>
            )}
          </div>
          <div className="flex flex-col gap-4">
            <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#C8CDD2]">
              ACCLIMATISATION CYCLE
            </span>
            {acclimatisationNote && (
              <p className="font-['Lexend'] font-light text-[#C8CDD2] text-[15px] leading-[1.8] max-w-[40ch]">
                {acclimatisationNote}
              </p>
            )}
          </div>
          <div className="flex flex-col gap-4">
            <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#C8CDD2]">
              SUMMIT WINDOW
            </span>
            {summitWindowNote && (
              <p className="font-['Lexend'] font-light text-[#C8CDD2] text-[15px] leading-[1.8] max-w-[40ch]">
                {summitWindowNote}
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
