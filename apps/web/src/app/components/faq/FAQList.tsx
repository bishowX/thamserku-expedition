import { useState } from 'react';
import { Link } from 'react-router';

type FAQItem = {
  qNum: string;
  question: string;
  aNum: string;
  answer: string;
  linkText: string;
  linkTo: string;
};

type FAQCategory = {
  id: string;
  numLabel: string;
  label: string;
  title: string;
  subtitle: string;
  items: FAQItem[];
};

const FAQ_DATA: FAQCategory[] = [
  {
    id: "about",
    numLabel: "CATEGORY I",
    label: "ABOUT",
    title: "About Thamserku.",
    subtitle: "Who we are, who leads us, and where we sit in the Yeti Group.",
    items: [
      {
        qNum: "Q.01",
        question: "What is Thamserku Expedition?",
        aNum: "A.01",
        answer: "Thamserku is a heritage Himalayan expedition house, founded in the late 1980s and continuing today under the Yeti Group. We climb five Himalayan mountains carefully — Everest, Manaslu, Dhaulagiri, Makalu, and Himchuli — across five editions: Alpine, Bespoke, Crafted, Definitive, and Explorer. [Placeholder answer — full text to be drafted with senior expedition staff.]",
        linkText: "READ THE LEGACY PAGE →",
        linkTo: "/legacy"
      },
      {
        qNum: "Q.02",
        question: "Is Thamserku Sherpa-led?",
        aNum: "A.02",
        answer: "Yes. Sherpa leadership is the knowledge base of our house, not a feature we add. Senior Sirdars and climbing Sherpas lead every expedition, and our senior team has been part of our house multi-generationally. [Placeholder answer — full text to be drafted with senior expedition staff.]",
        linkText: "READ THE LEGACY PAGE →",
        linkTo: "/legacy"
      },
      {
        qNum: "Q.03",
        question: "How is Thamserku connected to Yeti Group?",
        aNum: "A.03",
        answer: "Thamserku operates as part of the Yeti Group — the wider Nepali Himalayan group whose operating ecosystem (air support, mountain lodges, regional access, field continuity) supports every expedition we run. The relationship is one of stewardship rather than ownership. [Placeholder answer.]",
        linkText: "READ THE YETI INFRASTRUCTURE PAGE →",
        linkTo: "/yeti-infrastructure"
      }
    ]
  },
  {
    id: "planning",
    numLabel: "CATEGORY II",
    label: "EXPEDITION PLANNING",
    title: "Choosing & Planning an Expedition.",
    subtitle: "How to choose the right Himalayan expedition for your background.",
    items: [
      {
        qNum: "Q.04",
        question: "How do I choose the right Himalayan expedition?",
        aNum: "A.04",
        answer: "We recommend beginning with a private consultation. Our senior advisors listen to your background, your timing, and your intention — then recommend the mountain and edition that fit. The consultation is exploratory; nothing is sold during the call. [Placeholder answer.]",
        linkText: "EXPLORE THE EXPEDITION ATLAS →",
        linkTo: "/atlas"
      }
    ]
  },
  {
    id: "everest",
    numLabel: "CATEGORY III",
    label: "EVEREST & 8,000M",
    title: "Everest and 8,000m Preparation.",
    subtitle: "Preparation context for Everest and 8,000m climbs.",
    items: [
      {
        qNum: "Q.05",
        question: "What experience do I need before Everest?",
        aNum: "A.05",
        answer: "We typically recommend prior altitude experience above 6,000m or 7,000m before an Everest expedition. The 7,000m Qualifying Pathway page describes the considered preparation context. Specific recommendations depend on your background and are discussed in private consultation. [Placeholder answer.]",
        linkText: "READ THE EVEREST PAGE →",
        linkTo: "/expeditions/everest"
      }
    ]
  },
  {
    id: "pathway",
    numLabel: "CATEGORY IV",
    label: "7,000M PATHWAY",
    title: "Qualifying Ascents & Preparation.",
    subtitle: "7,000m peaks as qualifying preparation ground.",
    items: [
      {
        qNum: "Q.06",
        question: "Do I need a 7,000m ascent before Everest?",
        aNum: "A.06",
        answer: "Not in every case. The right pathway depends on your background and the mountain you are preparing for. For many climbers, a 7,000m qualifying ascent is the most honest preparation. For climbers with strong existing altitude experience, a different path may be appropriate. [Placeholder answer.]",
        linkText: "READ THE 7,000M QUALIFYING PATHWAY →",
        linkTo: "/7000m"
      },
      {
        qNum: "Q.07",
        question: "What is the difference between an 8,000m expedition and a 7,000m qualifying ascent?",
        aNum: "A.07",
        answer: "An 8,000m expedition (Everest, Manaslu, Dhaulagiri, Makalu) is a flagship objective. A 7,000m qualifying ascent is the considered preparation peak — where altitude, judgement, and field discipline are properly earned before the larger objective. [Placeholder answer.]",
        linkText: "READ THE 7,000M QUALIFYING PATHWAY →",
        linkTo: "/7000m"
      }
    ]
  },
  {
    id: "editions",
    numLabel: "CATEGORY V",
    label: "EDITIONS",
    title: "The Thamserku Editions.",
    subtitle: "The five editions — Alpine, Bespoke, Crafted, Definitive, Explorer.",
    items: [
      {
        qNum: "Q.08",
        question: "What are the Thamserku Editions?",
        aNum: "A.08",
        answer: "The Thamserku Editions are five ways of reading the same mountain — not pricing tiers. From Alpine discipline to the Definitive private expedition, each edition is shaped around intent, privacy, and preparation. Specific recommendations come from a private consultation. [Placeholder answer.]",
        linkText: "READ THE EDITIONS PAGE →",
        linkTo: "/editions"
      },
      {
        qNum: "Q.09",
        question: "Which edition is best for a private expedition?",
        aNum: "A.09",
        answer: "The Crafted, Definitive, and Explorer editions are most often commissioned privately. The Definitive Edition is our most exclusive private expedition — with a private camp configuration, concierge planning, and maximum discretion. [Placeholder answer.]",
        linkText: "READ THE PRIVATE EXPEDITIONS PAGE →",
        linkTo: "/private"
      },
      {
        qNum: "Q.10",
        question: "What is the Definitive Edition?",
        aNum: "A.10",
        answer: "The most exclusive private Thamserku expedition. Built around a single climber, family, or principal. Private base camp, concierge planning, maximum contracted discretion, and the senior leadership of the house. Public attribution is by your written invitation only. [Placeholder answer.]",
        linkText: "READ THE EDITIONS PAGE →",
        linkTo: "/editions"
      },
      {
        qNum: "Q.11",
        question: "What is the Explorer Edition?",
        aNum: "A.11",
        answer: "The Explorer Edition is for the Himalayas beyond the summit — cultural journeys, base-camp experiences, photographic expeditions, and non-climbing readings of the mountains we climb on other editions. Available privately or as part of curated journeys. [Placeholder answer.]",
        linkText: "READ THE EDITIONS PAGE →",
        linkTo: "/editions"
      }
    ]
  },
  {
    id: "yeti",
    numLabel: "CATEGORY VI",
    label: "YETI INFRASTRUCTURE",
    title: "Operating Ecosystem & Support.",
    subtitle: "The Yeti operating ecosystem behind every expedition.",
    items: [
      {
        qNum: "Q.12",
        question: "What is the Yeti Infrastructure?",
        aNum: "A.12",
        answer: "The operating ecosystem of the Yeti Group that supports every Thamserku expedition — air support, mountain lodges, regional access, and field continuity. It is not a marketing partnership; it is the operational fabric the group has maintained in Nepal for decades. [Placeholder answer.]",
        linkText: "READ THE YETI INFRASTRUCTURE PAGE →",
        linkTo: "/yeti-infrastructure"
      },
      {
        qNum: "Q.13",
        question: "How does Yeti Infrastructure support expedition safety and coordination?",
        aNum: "A.13",
        answer: "Helicopter access and rescue coordination, operational lodges along approach routes, regional permits and partnerships, and a multi-generational field team — all working continuously, not only during a season. Field continuity is the deepest layer of expedition safety. [Placeholder answer.]",
        linkText: "READ THE YETI INFRASTRUCTURE PAGE →",
        linkTo: "/yeti-infrastructure"
      }
    ]
  },
  {
    id: "consultation",
    numLabel: "CATEGORY VII",
    label: "CONSULTATION",
    title: "Booking & Consultation Process.",
    subtitle: "How a private consultation begins and runs.",
    items: [
      {
        qNum: "Q.14",
        question: "Can assistants or family offices schedule consultations?",
        aNum: "A.14",
        answer: "Yes. We regularly work with family offices, chiefs-of-staff, and executive assistants planning expeditions on behalf of principals. The consultation is handled with the same discretion that defines the rest of your engagements. [Placeholder answer.]",
        linkText: "READ THE PRIVATE EXPEDITIONS PAGE →",
        linkTo: "/private"
      },
      {
        qNum: "Q.15",
        question: "What happens during a Thamserku consultation?",
        aNum: "A.15",
        answer: "A 45-minute private conversation by video, phone, or WhatsApp. A senior advisor listens to your background, timing, and intention before recommending a mountain and edition. The consultation is exploratory — nothing is sold during the call. A tailored proposal follows only if direction is set. [Placeholder answer.]",
        linkText: "SCHEDULE A CONSULTATION →",
        linkTo: "/consultation"
      }
    ]
  }
];

export const FAQList = () => {
  const [openStates, setOpenStates] = useState<Record<string, boolean>>({});

  const toggleFaq = (key: string) => {
    setOpenStates(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  return (
    <section className="relative w-full bg-[#1A1A1A] py-[140px] md:py-[180px] px-8 overflow-hidden">
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
      
      <div className="relative z-10 w-full max-w-[880px] mx-auto flex flex-col items-center">
        
        <div className="w-full flex justify-center mb-16 md:mb-24">
          <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#C8CDD2]">
            FIFTEEN QUIET ANSWERS
          </span>
        </div>

        {FAQ_DATA.map((category, catIdx) => (
          <div key={catIdx} id={category.id} className="w-full flex flex-col scroll-mt-32">
            
            {/* Category section header */}
            <div className="w-full flex flex-col mb-[80px] md:mb-[100px]">
              <div className="h-[1px] w-full bg-[#C8CDD2]/30 mb-8" />
              <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#C8CDD2] mb-6">
                {category.numLabel} — {category.label}
              </span>
              <h3 className="font-['Radley'] font-light text-[32px] md:text-[40px] text-white leading-[1.1] max-w-[24ch] mb-4">
                {category.title}
              </h3>
              <p className="font-['Cormorant_Garamond'] italic text-[#C8CDD2] text-[18px] max-w-[56ch]">
                {category.subtitle}
              </p>
            </div>

            {/* Questions List */}
            <div className="w-full flex flex-col mb-16 md:mb-24">
              {category.items.map((item, itemIdx) => {
                const key = `${catIdx}-${itemIdx}`;
                const isOpen = !!openStates[key];
                return (
                  <div 
                    key={itemIdx} 
                    className="flex flex-col border-b border-[#5A6673]/30 last:border-b-0"
                  >
                    <button
                      onClick={() => toggleFaq(key)}
                      className="flex flex-row items-center justify-between w-full py-[32px] md:py-[40px] text-left group focus:outline-none focus-visible:ring-1 focus-visible:ring-[#C8CDD2]"
                      aria-expanded={isOpen}
                      aria-controls={`faq-answer-main-${key}`}
                      id={`faq-question-main-${key}`}
                    >
                      {/* Top row */}
                      <div className="flex flex-col md:flex-row items-start md:items-baseline gap-4 md:gap-8 flex-1 pr-8">
                        <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#C8CDD2] shrink-0 mt-2">
                          {item.qNum}
                        </span>
                        <h4 className="font-['Radley'] font-light text-[22px] md:text-[26px] text-white leading-[1.3] group-hover:text-white transition-colors max-w-[60ch]">
                          {item.question}
                        </h4>
                      </div>
                      <span 
                        className={`font-['JetBrains_Mono'] text-[14px] text-[#C8CDD2] group-hover:text-white transition-all duration-[250ms] ease-out transform ${isOpen ? 'rotate-180' : 'rotate-0'}`}
                      >
                        ▾
                      </span>
                    </button>
                    
                    {/* Answer text & Link */}
                    <div 
                      id={`faq-answer-main-${key}`}
                      role="region"
                      aria-labelledby={`faq-question-main-${key}`}
                      className="grid transition-all duration-[250ms] ease-out"
                      style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}
                    >
                      <div className="overflow-hidden">
                        <div className="flex flex-col md:flex-row items-start md:items-baseline gap-4 md:gap-8 pb-[32px] md:pb-[40px]">
                          <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#5A6673] shrink-0 mt-1 hidden md:block">
                            {item.aNum}
                          </span>
                          <div className="flex flex-col max-w-[60ch]">
                            <p className="font-['Lexend'] font-light text-[15px] text-[#C8CDD2] leading-[1.65] mb-8">
                              <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[10px] text-[#5A6673] mr-2">
                                [DUMMY FAQ]
                              </span>
                              <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#5A6673] mr-4 md:hidden">
                                {item.aNum}
                              </span>
                              {item.answer}
                            </p>
                            {/* Bottom row link */}
                            <div className="flex">
                              <Link to={item.linkTo} className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[10.5px] text-[#0A3A77] hover:text-white transition-colors">
                                {item.linkText}
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            
          </div>
        ))}

        {/* Footer Note */}
        <div className="w-full flex justify-center pt-8 border-t border-[#C8CDD2]/30">
          <p className="font-['Cormorant_Garamond'] italic text-[#C8CDD2] text-[16px] text-center max-w-[60ch]">
            Placeholder answers at this stage. Full Q&A content will be drafted by our senior expedition desk before publication.
          </p>
        </div>

      </div>
    </section>
  );
};