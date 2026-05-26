import type { SanityArchiveRecord } from '../../../lib/queries';

const FEATURED_RECORDS = [
  {
    year: "2021",
    peakCode: "DHA",
    peak: "Dhaulagiri",
    route: "Northeast Ridge",
    detail: "A remote spring expedition emphasising solitude and disciplined logistics. Across thirty-eight days in the field, the team worked through the considered rhythm Dhaulagiri asks of every climber — slow acclimatisation, conservative weather judgement, and a quiet summit window achieved without incident.",
    status: "VERIFIED"
  },
  {
    year: "2017",
    peakCode: "EVR",
    peak: "Everest",
    route: "Khumbu Reconnaissance",
    detail: "A pre-season route preparation expedition by the senior Sirdar team. Documentation, fixed-line scouting, and route-condition assessment ahead of the spring summit window. Recces such as this are the quiet foundation of every Thamserku Everest season.",
    status: "VERIFIED"
  },
  {
    year: "1988",
    peakCode: "MAN",
    peak: "Manaslu",
    route: "Northeast Face",
    detail: "One of the house's earliest 8,000m expeditions. Archival photographs, route fragments, and field notes are being audited; the record will be expanded once verification and permission are complete.",
    status: "[PERMISSION REQUIRED]"
  }
];

export const ArchiveFeaturedRecords = ({ featuredRecords }: { featuredRecords?: SanityArchiveRecord[] }) => {
  const hasSanity = featuredRecords && featuredRecords.length > 0;
  return (
 <section className="bg-[#F4F2EC] py-24 px-8">
      <div className="max-w-[1320px] mx-auto flex flex-col items-center">
        
        {/* Section Header */}
        <div className="flex flex-col items-center mb-24 md:mb-32">
          <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#5A6673] text-center mb-8">
            FEATURED — § III
          </span>
          <h2 className="font-['Radley'] font-light text-[48px] md:text-[56px] lg:text-[72px] text-[#1A1A1A] leading-[1.1] text-center max-w-[22ch] mb-6">
            Three records, read with more time.
          </h2>
          <p className="font-['Cormorant_Garamond'] italic text-[#0A3A77] text-[22px] text-center max-w-[56ch]">
            Expeditions where the story is worth more than a single row.
          </p>
        </div>

        {/* Featured Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 w-full">
          {hasSanity
            ? featuredRecords!.map((record) => {
                const peakCode = record.peak.substring(0, 3).toUpperCase();
                const statusLabel = record.status === 'verified' ? 'VERIFIED' : record.status === 'permissionRequired' ? '[PERMISSION REQUIRED]' : '[PRIVATE]';
                return (
                  <div key={record._id} className="flex flex-col h-full">

                    {/* Top: Image Placeholder */}
                    <div className="w-full aspect-[4/5] border border-[#5A6673] flex flex-col items-center justify-center p-6 mb-8 relative">
                      <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[10px] text-[#5A6673] text-center mb-2">
                        [IMAGE PLACEHOLDER]
                      </span>
                      <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[10px] text-[#5A6673] text-center">
                        FEATURED ARCHIVE — {peakCode}
                      </span>
                    </div>

                    {/* Card Body */}
                    <div className="flex flex-col flex-1">
                      <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#5A6673] mb-6">
                        FEATURED <span className="mx-1">·</span> {record.peak.toUpperCase()} <span className="mx-1">·</span> {record.year}
                      </span>

                      <span className="font-['Radley'] font-light text-[56px] text-[#0A3A77] leading-[1] mb-6">
                        {record.year}
                      </span>

                      <h3 className="font-['Radley'] font-light text-[22px] md:text-[26px] text-[#1A1A1A] leading-[1.2] max-w-[18ch] mb-6">
                        {record.peak} — {record.route}
                      </h3>

                      <p className="font-['Lexend'] font-light text-[15.5px] text-[#5A6673] leading-[1.7] line-clamp-5 mb-8">
                        {record.description}
                      </p>

                      <div className="mt-auto">
                        <button className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#1A1A1A] hover:text-[#0A3A77] transition-colors pb-1 border-b border-transparent hover:border-[#0A3A77]">
                          READ THE RECORD →
                        </button>
                      </div>
                    </div>

                    {/* Card Footer */}
                    <div className="mt-8 pt-6 border-t border-[#C8CDD2]">
                      <span className={`font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[10.5px] ${
                        record.status === 'verified' ? 'text-[#5A6673]' : 'text-[#0A3A77]'
                      }`}>
                        {statusLabel}
                      </span>
                    </div>

                  </div>
                );
              })
            : FEATURED_RECORDS.map((record, index) => (
                <div key={index} className="flex flex-col h-full">

                  {/* Top: Image Placeholder */}
                  <div className="w-full aspect-[4/5] border border-[#5A6673] flex flex-col items-center justify-center p-6 mb-8 relative">
                    <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[10px] text-[#5A6673] text-center mb-2">
                      [IMAGE PLACEHOLDER]
                    </span>
                    <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[10px] text-[#5A6673] text-center">
                      FEATURED ARCHIVE — {record.peakCode}
                    </span>
                  </div>

                  {/* Card Body */}
                  <div className="flex flex-col flex-1">
                    <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#5A6673] mb-6">
                      FEATURED <span className="mx-1">·</span> {record.peak.toUpperCase()} <span className="mx-1">·</span> {record.year}
                    </span>

                    <span className="font-['Radley'] font-light text-[56px] text-[#0A3A77] leading-[1] mb-6">
                      {record.year}
                    </span>

                    <h3 className="font-['Radley'] font-light text-[22px] md:text-[26px] text-[#1A1A1A] leading-[1.2] max-w-[18ch] mb-6">
                      {record.peak} — {record.route}
                    </h3>

                    <p className="font-['Lexend'] font-light text-[15.5px] text-[#5A6673] leading-[1.7] line-clamp-5 mb-8">
                      {record.detail}
                    </p>

                    <div className="mt-auto">
                      <button className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#1A1A1A] hover:text-[#0A3A77] transition-colors pb-1 border-b border-transparent hover:border-[#0A3A77]">
                        READ THE RECORD →
                      </button>
                    </div>
                  </div>

                  {/* Card Footer */}
                  <div className="mt-8 pt-6 border-t border-[#C8CDD2]">
                    <span className={`font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[10.5px] ${
                      record.status === 'VERIFIED' ? 'text-[#5A6673]' : 'text-[#0A3A77]'
                    }`}>
                      {record.status}
                    </span>
                  </div>

                </div>
              ))
          }
        </div>

      </div>
    </section>
  );
};