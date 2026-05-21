import { useState } from 'react';
import { Link } from 'react-router';

const FAQS = [
  {
    q: "What is Yeti Infrastructure, and how does it relate to Thamserku?",
    a: "[DUMMY FAQ] — Placeholder answer. Yeti Infrastructure is the operating ecosystem Thamserku draws on across every Himalayan expedition — air support, mountain lodges, regional access, and field continuity. Thamserku operates as part of the Yeti Group, the wider Nepali Himalayan group through which this infrastructure is continuously maintained."
  },
  {
    q: "How does the Yeti Group support a Thamserku expedition specifically?",
    a: "[DUMMY FAQ] — Placeholder answer. Practical operational support: helicopter access and rescue coordination, mountain lodges along approach routes, regional permits and partnerships, and a multi-generational field team. None of this is visible during a successful expedition — which is the point."
  },
  {
    q: "How does the helicopter and air coordination work?",
    a: "[DUMMY FAQ] — Placeholder answer. Helicopter access between Kathmandu, Lukla, and Himalayan valleys, coordinated through the Yeti Group's aviation network. Used for client transfer to and from base camps, high-camp staging where conditions allow, and medical evacuation or rescue support if required."
  },
  {
    q: "How are lodges, regional access, and logistics handled?",
    a: "[DUMMY FAQ] — Placeholder answer. Operational lodges along approach routes are maintained year-round with continuous staffing. Regional permits are handled by Kathmandu operations across all five Himalayan regions where we climb. Logistics — transport, supply chains, and field movement — are coordinated end-to-end by senior staff."
  },
  {
    q: "How does Yeti Infrastructure improve safety and coordination during an expedition?",
    a: "[DUMMY FAQ] — Placeholder answer. Field continuity matters most for safety: the same senior Sherpa team, the same medical advisor, and the same regional partners across seasons. Decisions made at altitude are made by people whose judgement has been earned year after year. This is the deepest layer of expedition safety, and it is the layer we do not improvise on."
  }
];

export const YetiFAQ = () => {
  const [openStates, setOpenStates] = useState<Record<number, boolean>>({});

  const toggleFaq = (idx: number) => {
    setOpenStates(prev => ({
      ...prev,
      [idx]: !prev[idx]
    }));
  };

  return (
    <section className="bg-[#F4F2EC] py-[140px] md:py-[180px] px-8">
      <div className="max-w-[880px] mx-auto flex flex-col items-center">
        
        {/* Section Header */}
        <div className="flex flex-col items-center mb-20 md:mb-24 w-full">
          <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#5A6673] text-center mb-8">
            FREQUENTLY ASKED — INFRASTRUCTURE
          </span>
          <h2 className="font-['Radley'] font-light text-[48px] md:text-[64px] text-[#1A1A1A] leading-[1.1] text-center max-w-[22ch] mb-6">
            Five quiet answers, before you write to us.
          </h2>
          <p className="font-['Cormorant_Garamond'] italic text-[#0A3A77] text-[22px] text-center max-w-[56ch]">
            The most common questions about the Yeti operating ecosystem.
          </p>
        </div>

        {/* FAQ List */}
        <div className="w-full flex flex-col border-b border-[#5A6673]/30">
          {FAQS.map((faq, idx) => {
            const num = (idx + 1).toString().padStart(2, '0');
            const isOpen = !!openStates[idx];
            return (
              <div key={idx} className="flex flex-col border-t border-[#5A6673]/30">
                <button
                  onClick={() => toggleFaq(idx)}
                  className="flex flex-row items-center justify-between w-full py-8 md:py-10 text-left group focus:outline-none focus-visible:ring-1 focus-visible:ring-[#1A1A1A]"
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-yeti-${idx}`}
                  id={`faq-question-yeti-${idx}`}
                >
                  {/* Question */}
                  <div className="flex items-start gap-4 md:gap-8 flex-1 pr-8">
                    <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#5A6673] mt-2 whitespace-nowrap">
                      Q.{num} —
                    </span>
                    <h3 className="font-['Radley'] font-light text-[22px] md:text-[24px] text-[#1A1A1A] leading-[1.3] group-hover:text-[#1A1A1A] transition-colors max-w-[60ch]">
                      {faq.q}
                    </h3>
                  </div>
                  <span 
                    className={`font-['JetBrains_Mono'] text-[14px] text-[#5A6673] group-hover:text-[#1A1A1A] transition-all duration-[250ms] ease-out transform ${isOpen ? 'rotate-180' : 'rotate-0'}`}
                  >
                    ▾
                  </span>
                </button>
                
                {/* Answer */}
                <div 
                  id={`faq-answer-yeti-${idx}`}
                  role="region"
                  aria-labelledby={`faq-question-yeti-${idx}`}
                  className="grid transition-all duration-[250ms] ease-out"
                  style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}
                >
                  <div className="overflow-hidden">
                    <div className="flex items-start gap-4 md:gap-8 pb-8 md:pb-10">
                      <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#5A6673] mt-1 whitespace-nowrap">
                        A.{num} —
                      </span>
                      <p className="font-['Lexend'] font-light text-[15px] text-[#5A6673] leading-[1.65] max-w-[60ch]">
                        {faq.a}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Link */}
        <div className="mt-20 flex justify-center w-full">
          <Link 
            to="/faq" 
            className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#1A1A1A] hover:text-[#0A3A77] transition-colors pb-1 border-b border-transparent hover:border-[#0A3A77]"
          >
            READ ALL FAQS ON THE MAIN FAQ PAGE →
          </Link>
        </div>

      </div>
    </section>
  );
};