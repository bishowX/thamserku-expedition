import { Link } from 'react-router';
import type { SanityArchiveRecord } from '../../../lib/queries';

// Dummy data defined according to prompt
const DUMMY_RECORDS = [
  {
    id: 1,
    year: "2024",
    peak: "Everest",
    route: "South Col Route",
    region: "Khumbu",
    type: "Summit Expedition",
    detail: "A spring season expedition supported by a private Definitive configuration; full Sherpa leadership across rotations and summit window.",
    edition: "D — DEFINITIVE [CLIENT TO CONFIRM]",
    relatedLabel: "EVR · 2017 RECCE",
    relatedLink: "#",
    status: "[PERMISSION REQUIRED]"
  },
  {
    id: 2,
    year: "2023",
    peak: "Manaslu",
    route: "Northeast Face",
    region: "Gorkha",
    type: "Summit Expedition",
    detail: "An autumn expedition with a small private group; conservative weather judgement informed a phased summit window.",
    edition: "B — BESPOKE [CLIENT TO CONFIRM]",
    relatedLabel: "MAN · 2015",
    relatedLink: "#",
    status: "[CLIENT TO CONFIRM]"
  },
  {
    id: 3,
    year: "2022",
    peak: "Makalu",
    route: "West Pillar",
    region: "Mahalangur",
    type: "Summit Expedition",
    detail: "A technical spring expedition for an experienced private climber; full senior Sirdar leadership.",
    edition: "D — DEFINITIVE [CLIENT TO CONFIRM]",
    relatedLabel: "MAK · 2019 RECCE",
    relatedLink: "#",
    status: "[PERMISSION REQUIRED]"
  },
  {
    id: 4,
    year: "2021",
    peak: "Dhaulagiri",
    route: "Northeast Ridge",
    region: "Myagdi",
    type: "Summit Expedition",
    detail: "A remote spring expedition emphasising solitude and disciplined logistics.",
    edition: "E — EXPLORER [CLIENT TO CONFIRM]",
    relatedLabel: "DHA · 2008 ATTEMPT",
    relatedLink: "#",
    status: "VERIFIED"
  },
  {
    id: 5,
    year: "2019",
    peak: "Everest",
    route: "South Col Route",
    region: "Khumbu",
    type: "Summit Expedition",
    detail: "A Bespoke edition spring expedition shaped around an individual climber's preparation rhythm.",
    edition: "B — BESPOKE [CLIENT TO CONFIRM]",
    relatedLabel: "EVR · 2017 RECCE",
    relatedLink: "#",
    status: "VERIFIED"
  },
  {
    id: 6,
    year: "2017",
    peak: "Everest",
    route: "Base Camp",
    region: "Khumbu",
    type: "Reconnaissance",
    detail: "A pre-season route preparation expedition by senior Sirdar team.",
    edition: "SUPPORT [CLIENT TO CONFIRM]",
    relatedLabel: "EVR · 2019",
    relatedLink: "#",
    status: "VERIFIED"
  },
  {
    id: 7,
    year: "2015",
    peak: "Manaslu",
    route: "Standard Route",
    region: "Gorkha",
    type: "Summit Expedition",
    detail: "An autumn expedition; the season for which we now consider Manaslu the autumn flagship of the house.",
    edition: "D — DEFINITIVE [CLIENT TO CONFIRM]",
    relatedLabel: "MAN · 2023",
    relatedLink: "#",
    status: "[CLIENT TO CONFIRM]"
  },
  {
    id: 8,
    year: "2008",
    peak: "Dhaulagiri",
    route: "Northeast Ridge",
    region: "Myagdi",
    type: "Attempt",
    detail: "A spring attempt halted by sustained high winds in the summit window; descent executed without incident.",
    edition: "SUPPORT [CLIENT TO CONFIRM]",
    relatedLabel: "DHA · 2021",
    relatedLink: "#",
    status: "VERIFIED"
  },
  {
    id: 9,
    year: "1998",
    peak: "Everest",
    route: "North Col Route",
    region: "Tibet",
    type: "Support Expedition",
    detail: "A support expedition for a visiting international team; logistics and Sherpa leadership provided by Thamserku.",
    edition: "SUPPORT [CLIENT TO CONFIRM]",
    relatedLabel: "EVR · 2017 RECCE",
    relatedLink: "#",
    status: "[CLIENT TO CONFIRM]"
  },
  {
    id: 10,
    year: "1988",
    peak: "Manaslu",
    route: "Northeast Face",
    region: "Gorkha",
    type: "Summit Expedition",
    detail: "One of the house's earliest 8,000m expeditions; archival record under audit.",
    edition: "HISTORIC [CLIENT TO CONFIRM]",
    relatedLabel: "MAN · 2015",
    relatedLink: "#",
    status: "[PERMISSION REQUIRED]"
  }
];

export const ArchiveGrid = ({ records }: { records?: SanityArchiveRecord[] }) => {
  const hasSanity = records && records.length > 0;

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
          {hasSanity
            ? records!.map((record) => {
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
              })
            : DUMMY_RECORDS.map((record) => {
                const peakCode = record.peak.substring(0, 3).toUpperCase();

                return (
                  <div key={record.id} className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 py-10 md:py-[80px] lg:py-[100px] border-b border-white/20 items-start">

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
                        {peakCode} <span className="mx-1">·</span> {record.type.toUpperCase()}
                      </span>
                      <h3 className="font-['Radley'] font-light text-[24px] md:text-[28px] text-white leading-tight">
                        {record.peak} — {record.route}
                      </h3>
                      <p className="font-['Lexend'] font-light text-[15px] text-[#C8CDD2] leading-[1.65] line-clamp-2 mt-2">
                        {record.detail}
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
                          EDITION
                        </span>
                        <span className="font-['Radley'] text-[16px] text-white">
                          {record.edition}
                        </span>
                      </div>

                      <div className="flex flex-col gap-1">
                        <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#5A6673]">
                          RELATED
                        </span>
                        <Link to={record.relatedLink} className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#0A3A77] hover:text-white transition-colors">
                          → {record.relatedLabel}
                        </Link>
                      </div>
                    </div>

                    {/* Col 5: Status Badge (1 col) */}
                    <div className="md:col-span-1 flex md:justify-end mt-4 md:mt-0">
                      <span className={`font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[10.5px] whitespace-nowrap md:text-right ${
                        record.status === 'VERIFIED' ? 'text-[#5A6673]' : 'text-[#0A3A77]'
                      }`}>
                        {record.status}
                      </span>
                    </div>

                  </div>
                );
              })
          }
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