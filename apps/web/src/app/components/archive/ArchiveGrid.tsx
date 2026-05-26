import type { SanityArchiveRecord } from '../../../lib/queries';

export const ArchiveGrid = ({ records }: { records?: SanityArchiveRecord[] }) => {

  return (
 <section className="relative w-full bg-[#1A1A1A] py-24 px-4 md:px-8">
      {/* Faint cartographic grid overlay */}
      <div 
        className="absolute inset-0 z-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(to right, #C8CDD2 1px, transparent 1px),
            linear-gradient(to bottom, #C8CDD2 1px, transparent 1px)
          `,
          backgroundSize: '64px 64px'
        }}
      />
      
      <div className="relative z-10 max-w-[1440px] mx-auto flex flex-col">
        {/* Record List */}
        <div className="flex flex-col border-t border-white/20">
          {records?.map((record) => {
            const peakCode = record.peak.substring(0, 3).toUpperCase();
            const statusLabel = record.status === 'verified' ? 'VERIFIED' : record.status === 'permissionRequired' ? '[PERMISSION REQUIRED]' : '[PRIVATE]';
            return (
              <div key={record._id} className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 py-10 md:py-[80px] lg:py-[100px] border-b border-white/20 items-start">

                {/* Col 1: Image Placeholder (2 cols) */}
                <div className="md:col-span-2 w-full aspect-[4/3] border border-[#5A6673] flex flex-col items-center justify-center p-4">
                  <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[10px] text-[#5A6673] text-center">
                    [IMAGE PLACEHOLDER]
                  </span>
                  <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[10px] text-[#5A6673] text-center mt-2">
                    ARCHIVE SCAN /<br/>ROUTE PHOTO
                  </span>
                </div>

                {/* Col 2: Year (1 col) */}
                <div className="md:col-span-1 hidden md:flex">
                  <span className="font-['Radley'] font-light text-[36px] text-[#0A3A77] leading-none">
                    {record.year}
                  </span>
                </div>

                {/* Col 3: Main Content (6 cols) */}
                <div className="md:col-span-6 flex flex-col gap-3">
                  <div className="md:hidden mb-1">
                    <span className="font-['Radley'] font-light text-[36px] text-[#0A3A77] leading-none">
                      {record.year}
                    </span>
                  </div>
                  <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#C8CDD2]">
                    {peakCode} <span className="mx-1">·</span> {record.editionType.toUpperCase()}
                  </span>
                  <h3 className="font-['Radley'] font-light text-[24px] md:text-[28px] text-white leading-tight">
                    {record.peak} — {record.route}
                  </h3>
                  <p className="font-['Lexend'] font-light text-[15px] text-[#C8CDD2] leading-[1.65] line-clamp-2 mt-2">
                    {record.description}
                  </p>
                </div>

                {/* Col 4: Metadata (2 cols) */}
                <div className="md:col-span-2 flex flex-col gap-6">
                  <div className="flex flex-col gap-1">
                    <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#5A6673]">
                      REGION — {record.region.toUpperCase()}, NEPAL
                    </span>
                    <span className="font-['Radley'] text-[16px] text-white">
                      {record.region}
                    </span>
                  </div>

                  <div className="flex flex-col gap-1">
                    <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#5A6673]">
                      EDITION TYPE
                    </span>
                    <span className="font-['Radley'] text-[16px] text-white">
                      {record.editionType}
                    </span>
                  </div>

                  {record.notableDetail && (
                    <div className="flex flex-col gap-1">
                      <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#5A6673]">
                        NOTE
                      </span>
                      <span className="font-['Radley'] text-[16px] text-white">
                        {record.notableDetail}
                      </span>
                    </div>
                  )}
                </div>

                {/* Col 5: Status Badge (1 col) */}
                <div className="md:col-span-1 flex md:justify-end mt-4 md:mt-0">
                  <span className={`font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[10.5px] whitespace-nowrap md:text-right ${
                    record.status === 'verified' ? 'text-[#5A6673]' : 'text-[#0A3A77]'
                  }`}>
                    {statusLabel}
                  </span>
                </div>

              </div>
            );
          })}
        </div>

        {/* Load More & Disclaimer */}
        <div className="mt-20 md:mt-24 flex flex-col items-center gap-8">
          <button className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#C8CDD2] hover:text-white transition-colors text-center cursor-pointer">
            LOAD OLDER RECORDS →
          </button>
          
          <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[10.5px] text-[#5A6673] text-center max-w-[60ch]">
            [CLIENT TO CONFIRM] — FULL ARCHIVE AUDIT PENDING. EARLIEST RECORDS UNDER REVIEW.
          </span>
        </div>

      </div>
    </section>
  );
};