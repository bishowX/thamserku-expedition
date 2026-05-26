
type PageData = { heroHeadline?: string; heroSubline?: string };

export const ArchiveHero = ({ page }: { page?: PageData }) => {
  return (
 <section className="relative w-full min-h-[90vh] bg-[#1A1A1A] flex flex-col justify-end py-24 px-8 overflow-hidden">
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
      
      <div className="relative z-10 w-full max-w-[1440px] mx-auto flex flex-col items-center">
        {/* Headline */}
        <h1 className="font-['Radley'] font-light text-fluid-display tracking-tight text-white leading-[1.1] text-center max-w-[18ch] mb-6">
          {page?.heroHeadline ?? 'A history written in altitude.'}
        </h1>

        {/* Subline */}
        <p className="font-['Lexend'] font-light text-fluid-body text-[#C8CDD2] leading-relaxed max-w-[60ch] text-center mb-20">
          {page?.heroSubline ?? 'A structured record of the Himalayan expeditions our house has been part of — across nearly four decades of seasons, summits, and quiet days on the mountain.'}
        </p>
      </div>
    </section>
  );
};