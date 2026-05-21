export function TeamSherpaLeadership() {
  const sherpaProfiles = [
    {
      name: "[Sherpa Leader 01]",
      role: "Senior Sirdar · Khumbu Region",
      image: "https://images.unsplash.com/photo-1752732673663-e1da5e4677db?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoaW1hbGF5YW4lMjBndWlkZSUyMHBvcnRyYWl0fGVufDF8fHx8MTc3NzQ1OTk2Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      region: "Khumbu, Solukhumbu",
      years: "28",
      mountains: "Everest · Manaslu · Makalu",
      expertise: "Route preparation · Summit decisioning · Weather judgement",
      languages: "Sherpa · Nepali · English",
      philosophy: "The mountain decides the day. We only decide whether we are ready to listen.",
    },
    {
      name: "[Sherpa Leader 02]",
      role: "Lead Climbing Sherpa · Mahalangur Region",
      image: "https://images.unsplash.com/photo-1542800951-9613782be1fa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuZXBhbGklMjBtb3VudGFpbiUyMHdvcmtlciUyMHBvcnRyYWl0fGVufDF8fHx8MTc3NzQ1OTk2OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      region: "Mahalangur, Solukhumbu",
      years: "22",
      mountains: "Everest · Makalu · Cho Oyu",
      expertise: "Fixed-line technical leadership · High-camp logistics",
      languages: "Sherpa · Nepali · English",
      philosophy: "A summit is the easiest part of an expedition to talk about, and the smallest part of why we climb.",
    },
    {
      name: "[Sherpa Leader 03]",
      role: "Sirdar · Manaslu Region",
      image: "https://images.unsplash.com/photo-1763479168262-509a40bd0479?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvbGQlMjBtYW4lMjBuZXBhbGklMjB0cmFkaXRpb25hbCUyMHBvcnRyYWl0fGVufDF8fHx8MTc3NzQ1OTk3M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      region: "Gorkha, Manaslu Conservation Area",
      years: "24",
      mountains: "Manaslu · Annapurna · Himchuli",
      expertise: "Autumn season operations · Acclimatisation pacing",
      languages: "Sherpa · Nepali · English",
      philosophy: "You earn altitude slowly. Anyone who tells you otherwise has not been to one yet.",
    },
    {
      name: "[Sherpa Leader 04]",
      role: "Senior Climbing Sherpa · Dhaulagiri Region",
      image: "https://images.unsplash.com/photo-1545918204-393c233d5a5c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzaGVycGElMjBjbGltYmluZyUyMG1vdW50YWluJTIwZ2VhcnxlbnwxfHx8fDE3Nzc0NTk5Nzl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      region: "Dhaulagiri, Myagdi",
      years: "19",
      mountains: "Dhaulagiri · Manaslu · Makalu",
      expertise: "Remote-mountain logistics · Solitude expedition leadership",
      languages: "Sherpa · Nepali · English",
      philosophy: "The mountains that are quietest are not the easiest. They simply ask different questions.",
    },
    {
      name: "[Sherpa Leader 05]",
      role: "Lead Climbing Sherpa · Everest South Col Specialist",
      image: "https://images.unsplash.com/photo-1613713569254-7fee3cbb1afa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3VudGFpbiUyMGNsaW1iZXIlMjByZXN0aW5nJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzc3NDU5OTgzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      region: "Khumbu, Solukhumbu",
      years: "17",
      mountains: "Everest · Lhotse · Cho Oyu",
      expertise: "South Col route · Oxygen-system leadership · Summit-day pacing",
      languages: "Sherpa · Nepali · English",
      philosophy: "The summit window is read in hours, not days. Patience is the most undervalued piece of equipment we carry.",
    },
    {
      name: "[Sherpa Leader 06]",
      role: "Sirdar · Annapurna · Himchuli Region",
      image: "https://images.unsplash.com/photo-1658288098101-84f074c292a8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzZW5pb3IlMjBzaGVycGElMjBwb3J0cmFpdCUyMHZpbnRhZ2V8ZW58MXx8fHwxNzc3NDU5OTU5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      region: "Annapurna Conservation Area",
      years: "21",
      mountains: "Himchuli · Annapurna · Manaslu",
      expertise: "Quieter-objective expeditions · Cultural and base-camp leadership",
      languages: "Sherpa · Nepali · English",
      philosophy: "There are mountains that ask to be summited, and mountains that ask to be visited. Both are worth the journey.",
    }
  ];

  return (
    <section className="relative w-full bg-[#1A1A1A] text-white py-24 md:py-40 overflow-hidden">
      {/* Background cartographic grid overlay */}
      <div 
        className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(to right, #C8CDD2 1px, transparent 1px), linear-gradient(to bottom, #C8CDD2 1px, transparent 1px)`,
          backgroundSize: '64px 64px'
        }}
      />

      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-8 flex flex-col gap-32">
        
        {/* Section Header */}
        <div className="flex flex-col gap-6 border-b border-white/10 pb-16">
          <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#C8CDD2] block">
            03 — SHERPA LEADERSHIP
          </span>
          <h2 className="font-['Cormorant_Garamond'] font-light text-5xl md:text-[72px] leading-tight text-white max-w-[22ch]">
            Read by the people who lead it.
          </h2>
          <p className="font-['Cormorant_Garamond'] italic text-[22px] text-[#C8CDD2] max-w-[60ch] mt-4">
            "Senior Sherpas whose judgement has been earned, season by season, across the 8,000m peaks of Nepal."
          </p>
        </div>

        {/* Sherpa Dossier Bands */}
        <div className="flex flex-col gap-24 md:gap-40">
          {sherpaProfiles.map((profile, idx) => (
            <div key={idx} className="grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-24 w-full">
              
              {/* Left Column: Portrait & Caption (5 cols) */}
              <div className="col-span-1 md:col-span-5 flex flex-col gap-4">
                <div className="w-full aspect-[4/5] bg-gray-800 overflow-hidden grayscale-[0.6] sepia-[0.2] contrast-[0.95]">
                  <img 
                    src={profile.image} 
                    alt={`Sherpa Leader ${idx + 1}`} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex justify-between items-center w-full">
                  <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#5A6673]">
                    REGION · {profile.region}
                  </span>
                  <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#5A6673]">
                    YEARS · {profile.years}
                  </span>
                </div>
              </div>

              {/* Right Column: Dossier Details (7 cols) */}
              <div className="col-span-1 md:col-span-7 flex flex-col pt-4 md:pt-12">
                <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#5A6673] block mb-8">
                  SHERPA LEADERSHIP / 0{idx + 1}
                </span>
                
                <h3 className="font-['Cormorant_Garamond'] font-light text-5xl md:text-[56px] leading-tight text-white mb-4">
                  {profile.name} <span className="text-[14px] text-[#5A6673] tracking-widest uppercase font-['JetBrains_Mono'] ml-4 inline-block align-middle border border-[#5A6673] px-2 py-1">PLACEHOLDER NAME</span>
                </h3>
                
                <p className="font-['Cormorant_Garamond'] italic text-[22px] mb-16 text-[#b2b2b2]">
                  {profile.role}
                </p>

                {/* 2x2 Field Note Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-white mb-16">
                  
                  {/* Top Left */}
                  <div className="flex flex-col gap-2 py-6 md:pr-8 border-t md:border-b-0 border-b border-white/20 md:border-r">
                    <span className="text-[#5A6673]">EXPERIENCE</span>
                    <span>{profile.years} YEARS</span>
                  </div>
                  
                  {/* Top Right */}
                  <div className="flex flex-col gap-2 py-6 md:pl-8 md:border-t md:border-b-0 border-b border-white/20">
                    <span className="text-[#5A6673]">MOUNTAINS SUPPORTED</span>
                    <span className="leading-relaxed">{profile.mountains}</span>
                  </div>
                  
                  {/* Bottom Left */}
                  <div className="flex flex-col gap-2 py-6 md:pr-8 border-y md:border-r border-white/20">
                    <span className="text-[#5A6673]">EXPERTISE</span>
                    <span className="leading-relaxed">{profile.expertise}</span>
                  </div>
                  
                  {/* Bottom Right */}
                  <div className="flex flex-col gap-2 py-6 md:pl-8 border-b md:border-t md:border-b border-white/20">
                    <span className="text-[#5A6673]">LANGUAGES</span>
                    <span className="leading-relaxed">{profile.languages}</span>
                  </div>

                </div>

                {/* Philosophy Line */}
                <div className="flex flex-col gap-6 pt-8 border-t border-white/20 md:border-t-0">
                  <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#5A6673]">
                    THE READING
                  </span>
                  <p className="font-['Cormorant_Garamond'] italic text-[22px] text-[#C8CDD2] max-w-[40ch] leading-relaxed">
                    "{profile.philosophy}"
                  </p>
                </div>

              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
