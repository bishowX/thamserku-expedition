export function JourneyStages() {
  const stages = [
    {
      num: "01",
      title: "Before Arrival",
      desc: "Pre-departure preparation, training guidance, medical screening, kit consultation, and a private orientation call with the expedition desk.",
      img: "https://images.unsplash.com/photo-1662563060383-d598d24d5956?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrYXRobWFuZHUlMjBwcmF5ZXIlMjBmbGFnc3xlbnwxfHx8fDE3Nzc0NDg4NzR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    },
    {
      num: "02",
      title: "Kathmandu",
      desc: "Arrival, gear check, briefing with the expedition leadership, blessings at Boudhanath, and final logistics.",
      img: "https://images.unsplash.com/photo-1662563060383-d598d24d5956?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrYXRobWFuZHUlMjBwcmF5ZXIlMjBmbGFnc3xlbnwxfHx8fDE3Nzc0NDg4NzR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    },
    {
      num: "03",
      title: "Khumbu Approach",
      desc: "The walk-in through Lukla, Namche, Tengboche, Dingboche, and Lobuche — where altitude is earned slowly and attentively.",
      img: "https://images.unsplash.com/photo-1719482969294-4d791f9d51f1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuYW1jaGUlMjBiYXphYXIlMjBuZXBhbHxlbnwxfHx8fDE3Nzc0NDg4NzZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    },
    {
      num: "04",
      title: "Base Camp",
      desc: "Settling at 5,364 m: the camp system, the rhythm of life, the role of the kitchen team, and the first acclimatisation cycles.",
      img: "https://images.unsplash.com/photo-1664520835396-07ac1fe41782?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3VudGFpbiUyMGJhc2UlMjBjYW1wJTIwZm9nfGVufDF8fHx8MTc3NzQ0ODg4NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    },
    {
      num: "05",
      title: "Rotations",
      desc: "Climbing rotations between Camps I–III, refining the body and the route. The mountain is read carefully, not rushed.",
      img: "https://images.unsplash.com/photo-1692303366066-14e7115341a7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpY2VmYWxsJTIwY2xpbWJlcnMlMjBsYWRkZXIlMjBldmVyZXN0fGVufDF8fHx8MTc3NzQ0ODg3Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    },
    {
      num: "06",
      title: "Summit Strategy",
      desc: "Weather windows, oxygen plans, Sherpa judgement, and the moment a single quiet decision is made: this is the day, or it is not.",
      img: "https://images.unsplash.com/photo-1759776037670-8290e9bf0524?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3VudGFpbiUyMHN1bW1pdCUyMHJpZGdlJTIwc2lsaG91ZXR0ZXxlbnwxfHx8fDE3Nzc0NDg4Nzd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    },
    {
      num: "07",
      title: "Return",
      desc: "Descent, debrief, transit back to Kathmandu, and the long calm that follows a Himalayan expedition.",
      img: "https://images.unsplash.com/photo-1741383382869-334001cb0086?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjbGltYmVycyUyMGRlc2NlbmRpbmclMjBzbm93JTIwbW91bnRhaW58ZW58MXx8fHwxNzc3NDQ4ODc3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    }
  ];

  return (
    <section className="bg-[#1A1A1A] w-full text-white py-24 md:py-32 relative overflow-hidden">
      {/* Background Cartographic Grid */}
      <div className="absolute inset-0 pointer-events-none opacity-5 bg-[linear-gradient(rgba(255,255,255,0.2)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.2)_1px,transparent_1px)] bg-[size:64px_64px]" />
      
      <div className="relative z-10 max-w-[1440px] mx-auto px-8 flex flex-col gap-24">
        
        {/* Header */}
        <div className="flex flex-col gap-8">
          <h2 className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#5A6673]">
            05 — THE JOURNEY
          </h2>
          <h3 className="font-['Radley'] font-light text-[44px] md:text-[56px] leading-[1.1] max-w-[32ch]">
            Seven stages, read in sequence.
          </h3>
        </div>

        {/* Stages Vertical Sequence */}
        <div className="flex flex-col border-t border-white/10">
          {stages.map((stage, idx) => (
            <div key={idx} className="grid grid-cols-1 lg:grid-cols-12 gap-8 py-16 border-b border-white/10 items-center">
              {/* Left Column: Number */}
              <div className="lg:col-span-2">
                <span className="font-['Radley'] font-light text-[56px] lg:text-[80px] text-[#C8CDD2] leading-none block">
                  {stage.num}
                </span>
              </div>
              
              {/* Middle Column: Info */}
              <div className="lg:col-span-6 flex flex-col gap-4 pr-8 lg:pr-16">
                <h4 className="font-['Radley'] font-light text-[32px] text-white">
                  {stage.title}
                </h4>
                <p className="font-['Lexend'] font-light text-[#C8CDD2] text-[16px] leading-[1.8] max-w-[50ch]">
                  {stage.desc}
                </p>
              </div>

              {/* Right Column: Image */}
              <div className="lg:col-span-4 mt-8 lg:mt-0">
                <div className="w-full aspect-[4/3] overflow-hidden bg-[#2E353C]">
                  <img
                    src={stage.img}
                    alt={stage.title}
                    className="w-full h-full object-cover grayscale-[20%] opacity-90"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
