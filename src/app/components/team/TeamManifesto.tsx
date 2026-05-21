export function TeamManifesto() {
  return (
    <section className="w-full bg-[#F4F2EC] text-[#1A1A1A] py-24 md:py-40 px-8">
      <div className="max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16">
        
        {/* Left Column */}
        <div className="col-span-1 md:col-span-3 lg:col-span-4">
          <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#5A6673] block mt-2">
            02 — THE READING
          </span>
        </div>

        {/* Right Column */}
        <div className="col-span-1 md:col-span-9 lg:col-span-8 flex flex-col gap-12">
          
          {/* Pull Quote */}
          <h2 className="font-['Cormorant_Garamond'] font-light text-4xl md:text-[52px] leading-tight text-[#1A1A1A] max-w-[32ch]">
            Sherpa knowledge is not a feature of a Thamserku expedition. <span className="italic text-[#0A3A77]">It is the knowledge base on which the house is built.</span>
          </h2>
          
          {/* Paragraph */}
          <p className="font-['Inter'] font-light text-[#5A6673] text-[16px] leading-relaxed max-w-[60ch]">
            The team you read on this page is the team that climbs with you. Senior sirdars whose decades of route judgement decide what is and is not a climbing day. Climbing Sherpas who carry, fix, and lead. A base camp team that holds the rhythm of the season. And a quiet leadership group, in Kathmandu, that protects all of it.
          </p>

        </div>

      </div>
    </section>
  );
}
