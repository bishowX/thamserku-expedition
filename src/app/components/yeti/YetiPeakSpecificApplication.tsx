
const PEAK_DATA = [
  {
    code: 'EVR',
    name: 'Everest',
    altitude: '8,848.86 m · Khumbu, Nepal',
    notes: [
      { label: 'AIR', desc: 'Kathmandu / Lukla / Khumbu helicopter network' },
      { label: 'LODGES', desc: 'Lukla, Namche, Tengboche, Dingboche, Lobuche approach lodges' },
      { label: 'ACCESS', desc: 'Khumbu / Solukhumbu regional partnerships' },
      { label: 'CONTINUITY', desc: 'Senior Sherpa team continuous across Everest seasons' }
    ]
  },
  {
    code: 'MAN',
    name: 'Manaslu',
    altitude: '8,163 m · Gorkha, Nepal',
    notes: [
      { label: 'AIR', desc: 'Kathmandu / Gorkha helicopter coordination' },
      { label: 'LODGES', desc: 'Approach lodges along the Manaslu Conservation Area' },
      { label: 'ACCESS', desc: 'Gorkha district permits and regional access' },
      { label: 'CONTINUITY', desc: 'Autumn-season specialist team, Sherpas from Solukhumbu' }
    ]
  },
  {
    code: 'DHA',
    name: 'Dhaulagiri',
    altitude: '8,167 m · Myagdi, Nepal',
    notes: [
      { label: 'AIR', desc: 'Kathmandu / Pokhara / Myagdi helicopter coordination' },
      { label: 'LODGES', desc: 'Approach lodges along the Dhaulagiri circuit' },
      { label: 'ACCESS', desc: 'Myagdi district permits, remote-mountain logistics' },
      { label: 'CONTINUITY', desc: 'Solitude-specialist Sherpa team across seasons' }
    ]
  },
  {
    code: 'MAK',
    name: 'Makalu',
    altitude: '8,485 m · Mahalangur, Nepal',
    notes: [
      { label: 'AIR', desc: 'Kathmandu / Tumlingtar / Mahalangur helicopter coordination' },
      { label: 'LODGES', desc: 'Approach lodges along the Makalu Barun corridor' },
      { label: 'ACCESS', desc: 'Mahalangur regional partnerships and permit handling' },
      { label: 'CONTINUITY', desc: 'Technical-climb specialist Sherpa team' }
    ]
  },
  {
    code: 'HIM',
    name: 'Himchuli',
    altitude: '6,441 m · Annapurna, Nepal',
    notes: [
      { label: 'AIR', desc: 'Kathmandu / Pokhara helicopter coordination' },
      { label: 'LODGES', desc: 'Approach lodges along the Annapurna Conservation Area' },
      { label: 'ACCESS', desc: 'Annapurna regional permits and cultural-route partnerships' },
      { label: 'CONTINUITY', desc: 'Quieter-objective and Explorer Edition support team' }
    ]
  }
];

export const YetiPeakSpecificApplication = () => {
  return (
    <section className="bg-[#1A1A1A] py-[140px] md:py-[180px] px-8">
      <div className="max-w-[1320px] mx-auto flex flex-col items-center">
        
        {/* Section Header */}
        <div className="flex flex-col items-center mb-24 md:mb-32">
          <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#C8CDD2] text-center mb-8">
            PEAK-SPECIFIC APPLICATION — § II
          </span>
          <h2 className="font-['Radley'] font-light text-[48px] md:text-[56px] lg:text-[72px] text-white leading-[1.1] text-center max-w-[22ch] mb-6">
            How the infrastructure applies, peak by peak.
          </h2>
          <p className="font-['Cormorant_Garamond'] italic text-[#C8CDD2] text-[22px] text-center max-w-[56ch]">
            Five mountains. Same operational foundation. Different operational shapes.
          </p>
        </div>

        {/* Table */}
        <div className="w-full flex flex-col border-t border-white/20">
          {PEAK_DATA.map((peak, idx) => (
            <div key={idx} className="grid grid-cols-1 md:grid-cols-12 gap-8 py-[60px] md:py-[80px] border-b border-white/20">
              
              {/* Col 1 */}
              <div className="md:col-span-1 hidden md:block">
                <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#C8CDD2]">
                  {peak.code}
                </span>
              </div>

              {/* Col 2 */}
              <div className="md:col-span-3 flex flex-col gap-2">
                <div className="md:hidden mb-2">
                  <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#C8CDD2]">
                    {peak.code}
                  </span>
                </div>
                <h3 className="font-['Radley'] font-light text-[28px] md:text-[32px] text-white leading-none">
                  {peak.name}
                </h3>
                <span className="font-['Lexend'] text-[14px] text-[#C8CDD2]">
                  {peak.altitude}
                </span>
              </div>

              {/* Col 3 */}
              <div className="md:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
                {peak.notes.map((note, nIdx) => (
                  <div key={nIdx} className="flex flex-col gap-1">
                    <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[10.5px] text-[#5A6673]">
                      {note.label}
                    </span>
                    <span className="font-['Lexend'] text-[14px] text-[#C8CDD2]">
                      {note.desc}
                    </span>
                  </div>
                ))}
              </div>

            </div>
          ))}
        </div>

        {/* Bottom text */}
        <div className="mt-16 w-full flex justify-center">
          <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[10.5px] text-[#5A6673] text-center max-w-[60ch]">
            [CLIENT TO CONFIRM] — PEAK-SPECIFIC OPERATIONAL DETAILS PENDING CONFIRMATION.
          </span>
        </div>

      </div>
    </section>
  );
};