export function WhoItIsFor() {
  return (
    <section className="bg-[#FFFFFF] w-full text-[#1A1A1A] py-24 md:py-32">
      <div className="max-w-[1440px] mx-auto px-8 flex flex-col gap-16">
        
        {/* Header */}
        <div className="flex flex-col gap-8">
          <h2 className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#5A6673]">
            04 — WHO IT IS FOR
          </h2>
          <h3 className="font-['Radley'] font-light text-[40px] md:text-[52px] leading-[1.1] max-w-[32ch]">
            Everest is not for everyone. It is for the prepared.
          </h3>
        </div>

        {/* 4 Audience Tiles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-12 border-t border-[#1A1A1A]/10 pt-16">
          <AudienceTile
            label="01 / EXPERIENCED CLIMBERS"
            subline="With prior 6,000m or 7,000m altitude experience"
            description="Climbers with prior 6,000m or 7,000m experience and a serious altitude record."
          />
          <AudienceTile
            label="02 / 8,000m ASPIRANTS"
            subline="Approaching the death zone systematically"
            description="Prepared climbers approaching their first 8,000m peak with a structured, professionally-led house."
          />
          <AudienceTile
            label="03 / PRIVATE CLIENTS & LEADERS"
            subline="Requiring discretion and tailored itineraries"
            description="Executives, principals, and private climbers who require discretion, tailoring, and senior-level support."
          />
          <AudienceTile
            label="04 / PROGRESSION CLIMBERS"
            subline="Graduating through the Thamserku portfolio"
            description="Returning Thamserku clients moving from earlier expeditions into their flagship Himalayan objective."
          />
        </div>

      </div>
    </section>
  );
}

function AudienceTile({ label, subline, description }: { label: string; subline: string; description: string }) {
  return (
    <div className="flex flex-col gap-6">
      <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#5A6673]">
        {label}
      </span>
      <h4 className="font-['Radley'] font-light text-[24px] leading-[1.3] text-[#1A1A1A] italic">
        "{subline}"
      </h4>
      <p className="font-['Lexend'] font-light text-[#5A6673] text-[15px] leading-[1.6]">
        {description}
      </p>
    </div>
  );
}
