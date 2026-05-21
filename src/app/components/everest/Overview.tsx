export function Overview() {
  return (
    <section className="bg-[#F4F2EC] w-full text-[#1A1A1A] py-24 md:py-32">
      <div className="max-w-[1440px] mx-auto px-8 grid grid-cols-1 md:grid-cols-12 gap-12">
        {/* Left Column */}
        <div className="md:col-span-4 lg:col-span-3">
          <h2 className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#5A6673]">
            03 — OVERVIEW
          </h2>
        </div>

        {/* Right Column */}
        <div className="md:col-span-8 lg:col-span-7 flex flex-col gap-12">
          <h3 className="font-['Radley'] font-light text-[44px] md:text-[52px] leading-[1.1] max-w-[28ch]">
            The highest mountain on earth asks for more than strength. <i className="text-[#0A3A77] italic">It asks for patience, judgement and respect.</i>
          </h3>

          <div className="flex flex-col gap-6">
            <p className="font-['Lexend'] font-light text-[#5A6673] text-[16px] leading-[1.8] max-w-[60ch]">
              At Thamserku, Everest is not framed as conquest. It is framed as a passage — through altitude, weather and inner discipline. We approach the mountain slowly, attentively and led by the people who know it best.
            </p>
          </div>
        </div>

        {/* Marginal Photograph (Optional, but let's include it for editorial feel) */}
        <div className="md:col-span-12 lg:col-span-2 flex items-end justify-end hidden lg:flex">
          <div className="w-full aspect-[3/4] overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1579971043200-9bbde2f26006?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYXNlJTIwY2FtcCUyMHRlbnQlMjBkYXJrfGVufDF8fHx8MTc3NzQ0ODg4NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="Sherpa kitchen tent at Base Camp"
              className="w-full h-full object-cover grayscale-[30%] opacity-80"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
