export function TeamLeadership() {
  const leadershipTeam = [
    {
      role: "CHAIRMAN",
      name: "[Placeholder Name]",
      desc: "The principal of the house.",
      based: "Kathmandu",
      years: "35+",
      expertise: "Stewardship, lineage, philosophy",
      languages: "Nepali · English · Sherpa",
      philosophy: "We do not conquer the mountain. We learn from it.",
      image: "https://images.unsplash.com/photo-1610862784762-330117108fec?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvbGRlciUyMG5lcGFsaSUyMHNoZXJwYSUyMG1hbiUyMHBvcnRyYWl0JTIwdmludGFnZXxlbnwxfHx8fDE3Nzc0NTY2MTN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    },
    {
      role: "MANAGING DIRECTOR",
      name: "[Placeholder Name]",
      desc: "The day-to-day stewardship of the house.",
      based: "Kathmandu",
      years: "18",
      expertise: "Operations, partnerships, group strategy",
      languages: "Nepali · English · Hindi",
      philosophy: "The house is here to outlast us. That changes how we run it.",
      image: "https://images.unsplash.com/photo-1708364171715-16eaf0b2d8dc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuZXBhbGVzZSUyMGJ1c2luZXNzbWFuJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzc3NDYwMDAzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    },
    {
      role: "EXPEDITION DIRECTOR",
      name: "[Placeholder Name]",
      desc: "The link between Kathmandu and the field.",
      based: "Kathmandu / On Expedition",
      years: "22",
      expertise: "Expedition design, Sherpa leadership coordination",
      languages: "Nepali · English · Sherpa",
      philosophy: "Every expedition is a conversation between the desk and the mountain.",
      image: "https://images.unsplash.com/photo-1622694610506-99fb955aad24?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrYXRobWFuZHUlMjBwb3J0cmFpdCUyMG1hbnxlbnwxfHx8fDE3Nzc0NTk5OTl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    },
    {
      role: "HEAD OF OPERATIONS",
      name: "[Placeholder Name]",
      desc: "Logistics, permits, and field continuity.",
      based: "Kathmandu",
      years: "15",
      expertise: "Permitting, transport, supplier networks",
      languages: "Nepali · English",
      philosophy: "Operations is invisible when it is done well — and that is the point.",
      image: "https://images.unsplash.com/photo-1542800951-9613782be1fa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuZXBhbGklMjBtb3VudGFpbiUyMHdvcmtlciUyMHBvcnRyYWl0fGVufDF8fHx8MTc3NzQ1OTk2OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    },
    {
      role: "SAFETY & MEDICAL ADVISOR",
      name: "[Placeholder Name]",
      desc: "Medical planning and safety standards.",
      based: "Kathmandu / Base Camp",
      years: "14",
      expertise: "High-altitude medicine, evacuation protocols",
      languages: "English · Nepali",
      philosophy: "Safety is not a feature. It is the floor we build the expedition on.",
      image: "https://images.unsplash.com/photo-1763479168262-509a40bd0479?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvbGQlMjBtYW4lMjBuZXBhbGklMjB0cmFkaXRpb25hbCUyMHBvcnRyYWl0fGVufDF8fHx8MTc3NzQ1OTk3M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    },
    {
      role: "CLIENT EXPERIENCE LEAD",
      name: "[Placeholder Name]",
      desc: "The first private conversation, and the last.",
      based: "Kathmandu",
      years: "11",
      expertise: "Private enquiries, expedition desk",
      languages: "English · Nepali · French",
      philosophy: "Every expedition begins and ends with a quiet conversation.",
      image: "https://images.unsplash.com/photo-1752732673663-e1da5e4677db?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoaW1hbGF5YW4lMjBndWlkZSUyMHBvcnRyYWl0fGVufDF8fHx8MTc3NzQ1OTk2Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    },
  ];

  return (
    <section className="w-full bg-white text-[#1A1A1A] py-24 md:py-40 px-8">
      <div className="max-w-[1440px] mx-auto flex flex-col gap-16 md:gap-24">
        
        {/* Header */}
        <div className="flex flex-col gap-6">
          <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#5A6673] block">
            05 — LEADERSHIP
          </span>
          <h2 className="font-['Cormorant_Garamond'] font-light text-4xl md:text-[56px] leading-tight text-[#1A1A1A] max-w-[22ch]">
            The house behind the field.
          </h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-24">
          {leadershipTeam.map((member, idx) => (
            <div key={idx} className="flex flex-col gap-8">
              
              {/* Portrait */}
              <div className="w-full aspect-[4/5] bg-gray-200 overflow-hidden grayscale-[0.6] sepia-[0.1] contrast-[0.95]">
                <img 
                  src={member.image} 
                  alt={member.role} 
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="flex flex-col gap-6">
                
                {/* Header info */}
                <div className="flex flex-col">
                  <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#5A6673] mb-4">
                    {member.role}
                  </span>
                  <h3 className="font-['Cormorant_Garamond'] text-[28px] text-[#1A1A1A] mb-2 flex items-center gap-3">
                    {member.name}
                    <span className="text-[9px] text-[#5A6673] tracking-widest uppercase font-['JetBrains_Mono'] border border-[#5A6673]/30 px-1.5 py-[2px] inline-block">PLACEHOLDER</span>
                  </h3>
                  <p className="font-['Cormorant_Garamond'] italic text-[18px] text-[#5A6673]">
                    {member.desc}
                  </p>
                </div>
                
                {/* 4-row field-note strip */}
                <div className="flex flex-col border-y border-[#1A1A1A]/10 divide-y divide-[#1A1A1A]/10 font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#5A6673] mt-2 mb-2">
                  <div className="py-4">
                    BASED IN · {member.based}
                  </div>
                  <div className="py-4">
                    YEARS WITH HOUSE · {member.years}
                  </div>
                  <div className="py-4">
                    EXPERTISE · {member.expertise}
                  </div>
                  <div className="py-4">
                    LANGUAGES · {member.languages}
                  </div>
                </div>

                {/* Philosophy Line */}
                <p className="font-['Cormorant_Garamond'] italic text-[16px] text-[#5A6673] max-w-[32ch] mt-2">
                  "{member.philosophy}"
                </p>

              </div>

            </div>
          ))}
        </div>

        {/* Note */}
        <div className="mt-8 border-t border-[#1A1A1A]/10 pt-8">
          <p className="font-['Cormorant_Garamond'] italic text-[16px] text-[#5A6673] max-w-[60ch]">
            Note · Profile names are placeholders. The full leadership names and biographies will be set by Thamserku at content stage.
          </p>
        </div>

      </div>
    </section>
  );
}
