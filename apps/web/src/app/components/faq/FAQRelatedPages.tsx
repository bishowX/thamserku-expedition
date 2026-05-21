import { Link } from 'react-router';

const RELATED_PAGES = [
  {
    eyebrow: "RELATED PAGE — ABOUT",
    title: "Legacy & History",
    desc: "The story of the house, in continuity since 1987.",
    linkText: "READ THE LEGACY PAGE →",
    linkTo: "/legacy"
  },
  {
    eyebrow: "RELATED PAGE — EXPEDITIONS",
    title: "Expedition Atlas",
    desc: "The five mountains we climb.",
    linkText: "EXPLORE THE ATLAS →",
    linkTo: "/atlas"
  },
  {
    eyebrow: "RELATED PAGE — EDITIONS",
    title: "Editions",
    desc: "Five ways of reading the same mountain.",
    linkText: "READ THE EDITIONS PAGE →",
    linkTo: "/editions"
  },
  {
    eyebrow: "RELATED PAGE — INFRASTRUCTURE",
    title: "Yeti Infrastructure",
    desc: "The operating ecosystem behind every expedition.",
    linkText: "READ THE YETI INFRASTRUCTURE PAGE →",
    linkTo: "/yeti-infrastructure"
  },
  {
    eyebrow: "RELATED PAGE — PATHWAY",
    title: "7,000m Qualifying Pathway",
    desc: "Considered preparation for 8,000m objectives.",
    linkText: "READ THE PATHWAY →",
    linkTo: "/7000m"
  },
  {
    eyebrow: "RELATED PAGE — PRIVATE",
    title: "Private Expeditions",
    desc: "UHNI, family office, and principal expeditions.",
    linkText: "READ THE PRIVATE EXPEDITIONS PAGE →",
    linkTo: "/private"
  },
  {
    eyebrow: "RELATED PAGE — CONSULTATION",
    title: "Schedule a Consultation",
    desc: "Begin a private conversation with the expedition desk.",
    linkText: "SCHEDULE A CONSULTATION →",
    linkTo: "/consultation"
  }
];

export const FAQRelatedPages = () => {
  return (
    <section className="bg-[#F4F2EC] py-[100px] md:py-[120px] px-8">
      <div className="max-w-[1320px] mx-auto flex flex-col items-center">
        
        {/* Section Header */}
        <div className="flex flex-col items-center mb-16 md:mb-20">
          <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#5A6673] text-center mb-6">
            READ THE PAGES — § II
          </span>
          <h2 className="font-['Radley'] font-light text-[36px] md:text-[48px] text-[#1A1A1A] leading-[1.1] text-center max-w-[28ch]">
            Each question links to a page.
          </h2>
        </div>

        {/* Related pages grid */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border-t border-[#5A6673]/30">
          {RELATED_PAGES.map((page, idx) => (
            <div 
              key={idx} 
              className={`flex flex-col px-6 py-8 border-[#5A6673]/30 ${idx !== 0 ? 'border-t md:border-t-0 md:border-l' : ''} ${idx >= 4 ? 'lg:border-t' : ''} ${idx === 4 ? 'lg:border-l-0' : ''}`}
            >
              <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[10.5px] text-[#5A6673] mb-6 min-h-[3em]">
                {page.eyebrow}
              </span>
              <h3 className="font-['Radley'] font-light text-[20px] md:text-[24px] text-[#1A1A1A] leading-[1.2] mb-4">
                {page.title}
              </h3>
              <p className="font-['Lexend'] font-light text-[14px] text-[#5A6673] leading-[1.5] mb-8 flex-grow">
                {page.desc}
              </p>
              <Link to={page.linkTo} className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[10.5px] text-[#0A3A77] mt-auto hover:text-[#1A1A1A] transition-colors">
                {page.linkText}
              </Link>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};