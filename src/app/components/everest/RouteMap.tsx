export function RouteMap() {
  const waypoints = [
    { name: "Kathmandu", alt: "1,400 m" },
    { name: "Lukla", alt: "2,860 m" },
    { name: "Namche", alt: "3,440 m" },
    { name: "Tengboche", alt: "3,860 m" },
    { name: "Dingboche", alt: "4,410 m" },
    { name: "Lobuche", alt: "4,940 m" },
    { name: "Base Camp", alt: "5,364 m" },
    { name: "Camp I", alt: "6,065 m" },
    { name: "Camp II", alt: "6,400 m" },
    { name: "Camp III", alt: "7,200 m" },
    { name: "Camp IV", alt: "7,950 m" },
    { name: "Summit", alt: "8,848.86 m" },
  ];

  return (
    <section className="bg-[#0A3A77] w-full text-white py-24 md:py-32 overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-8 flex flex-col gap-24">
        
        {/* Header */}
        <div className="flex flex-col gap-8">
          <h2 className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#C8CDD2]">
            06 — ROUTE
          </h2>
          <h3 className="font-['Radley'] font-light text-[44px] md:text-[56px] leading-[1.1] max-w-[32ch]">
            From Kathmandu to the summit. Eleven points on the line.
          </h3>
        </div>

        {/* Route Diagram Centerpiece */}
        <div className="relative w-full h-[400px] flex items-center mt-8 mb-16 overflow-x-auto hide-scrollbar">
          <div className="min-w-[1200px] w-full h-full relative flex items-end justify-between px-12">
            {/* The main line connecting points */}
            <div className="absolute left-12 right-12 bottom-[40px] h-[1px] bg-white/30" />
            
            {waypoints.map((wp, idx) => {
              // Creating a climbing curve. Simple logic: higher altitude = higher dot
              const isSummit = idx === waypoints.length - 1;
              const heightFactor = (idx / (waypoints.length - 1)) * 250; 
              
              return (
                <div key={idx} className="relative flex flex-col items-center group" style={{ bottom: `${heightFactor + 40}px` }}>
                  {/* The vertical connection line to the base */}
                  <div className="absolute top-[8px] w-[1px] bg-white/20" style={{ height: `${heightFactor}px` }} />
                  
                  {/* The Point Marker */}
                  <div className="w-2 h-2 rounded-full bg-white relative z-10" />

                  {/* Labels */}
                  <div className="absolute bottom-full mb-6 flex flex-col items-center w-max">
                    <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#C8CDD2] mb-2 text-center">
                      {wp.name}
                    </span>
                    <span className={`font-['Radley'] font-light ${isSummit ? 'text-[24px]' : 'text-[18px]'} text-white`}>
                      {wp.alt}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 3 Caption Modules */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 border-t border-white/20 pt-16">
          <div className="flex flex-col gap-4">
            <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#C8CDD2]">ROUTE PHILOSOPHY</span>
            <p className="font-['Lexend'] font-light text-[#C8CDD2] text-[15px] leading-[1.8] max-w-[40ch]">
              We climb the South Col route, the route most decisively understood by our Sherpa team. We do not improvise.
            </p>
            <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[10.5px] text-[#5A6673]">
              [CLIENT TO CONFIRM] — ROUTE STATEMENT PENDING VERIFICATION.
            </span>
          </div>
          <div className="flex flex-col gap-4">
            <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#C8CDD2]">ACCLIMATISATION CYCLE</span>
            <p className="font-['Lexend'] font-light text-[#C8CDD2] text-[15px] leading-[1.8] max-w-[40ch]">
              Three rotations between Base Camp and the higher camps before any summit attempt is considered.
            </p>
          </div>
          <div className="flex flex-col gap-4">
            <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#C8CDD2]">SUMMIT WINDOW</span>
            <p className="font-['Lexend'] font-light text-[#C8CDD2] text-[15px] leading-[1.8] max-w-[40ch]">
              Read in hours, not days. Weather is the senior decision-maker on Everest, not ambition.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
