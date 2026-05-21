import { useState } from "react";
import { Link } from "react-router";
import { MoveRight } from "lucide-react";

const faqs = [
  {
    qPrefix: "Q.01",
    question: "How do I choose the right expedition for my background and intention?",
    aPrefix: "A.01",
    answer: "[DUMMY FAQ] Placeholder answer. Final response to be drafted by the expedition desk after peak data, edition availability and route guidance are confirmed."
  },
  {
    qPrefix: "Q.02",
    question: "What is the difference between a private expedition and a small group expedition?",
    aPrefix: "A.02",
    answer: "[DUMMY FAQ] Placeholder answer. Final response to be drafted by the expedition desk after peak data, edition availability and route guidance are confirmed."
  },
  {
    qPrefix: "Q.03",
    question: "What experience do I need before attempting Everest?",
    aPrefix: "A.03",
    answer: "[DUMMY FAQ] Placeholder answer. Final response to be drafted by the expedition desk after peak data, edition availability and route guidance are confirmed."
  },
  {
    qPrefix: "Q.04",
    question: "What is the difference between an 8,000m expedition and a 7,000m qualifying ascent?",
    aPrefix: "A.04",
    answer: "[DUMMY FAQ] Placeholder answer. Final response to be drafted by the expedition desk after peak data, edition availability and route guidance are confirmed."
  },
  {
    qPrefix: "Q.05",
    question: "How are private expeditions planned, and how does the consultation begin?",
    aPrefix: "A.05",
    answer: "[DUMMY FAQ] Placeholder answer. Final response to be drafted by the expedition desk after peak data, edition availability and route guidance are confirmed."
  }
];

export function AtlasFAQ() {
  const [openStates, setOpenStates] = useState<Record<number, boolean>>({});

  const toggleFaq = (idx: number) => {
    setOpenStates(prev => ({
      ...prev,
      [idx]: !prev[idx]
    }));
  };

  return (
    <section className="relative w-full bg-[#1A1A1A] py-[140px] md:py-[180px] overflow-hidden">
      {/* Background cartographic grid overlay */}
      <div 
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(to right, #C8CDD2 1px, transparent 1px), linear-gradient(to bottom, #C8CDD2 1px, transparent 1px)`,
          backgroundSize: '64px 64px'
        }}
      />

      <div className="relative z-10 w-full max-w-[880px] mx-auto px-8 flex flex-col items-center">
        {/* Section header */}
        <div className="flex flex-col items-center text-center mb-24 md:mb-32">
          <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#C8CDD2] mb-8">
            FREQUENTLY ASKED — ATLAS
          </span>
          <h2 className="font-['Radley'] font-light text-[48px] md:text-[64px] leading-[1.1] text-white max-w-[22ch] mb-8">
            "Five quiet answers, before you write to us."
          </h2>
          <p className="font-['Cormorant_Garamond'] italic text-[22px] text-[#C8CDD2] max-w-[56ch]">
            Most readers arrive at the Atlas with the same questions. These are the most common.
          </p>
        </div>

        {/* FAQ list */}
        <div className="w-full flex flex-col mb-24 border-b border-[#C8CDD2]/30">
          {faqs.map((faq, idx) => {
            const isOpen = !!openStates[idx];
            return (
              <div 
                key={idx}
                className="flex flex-col border-t border-[#C8CDD2]/30"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="flex flex-row items-center justify-between w-full py-8 md:py-10 text-left group focus:outline-none focus-visible:ring-1 focus-visible:ring-[#C8CDD2]"
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-atlas-${idx}`}
                  id={`faq-question-atlas-${idx}`}
                >
                  <div className="flex flex-col md:flex-row md:items-start gap-4 md:gap-8 flex-1 pr-8">
                    <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#C8CDD2] md:min-w-[80px] md:pt-2">
                      {faq.qPrefix} —
                    </span>
                    <h3 className="font-['Radley'] font-light text-[22px] md:text-[24px] leading-[1.3] text-white group-hover:text-white max-w-[60ch] transition-colors">
                      {faq.question}
                    </h3>
                  </div>
                  <span 
                    className={`font-['JetBrains_Mono'] text-[14px] text-[#C8CDD2] group-hover:text-white transition-all duration-[250ms] ease-out transform ${isOpen ? 'rotate-180' : 'rotate-0'}`}
                  >
                    ▾
                  </span>
                </button>
                <div 
                  id={`faq-answer-atlas-${idx}`}
                  role="region"
                  aria-labelledby={`faq-question-atlas-${idx}`}
                  className="grid transition-all duration-[250ms] ease-out"
                  style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}
                >
                  <div className="overflow-hidden">
                    <div className="flex flex-col md:flex-row md:items-start gap-4 md:gap-8 pb-8 md:pb-10">
                      <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#C8CDD2] md:min-w-[80px] md:pt-1">
                        {faq.aPrefix} —
                      </span>
                      <p className="font-['Lexend'] font-light text-[15px] text-[#C8CDD2] leading-[1.65] max-w-[60ch]">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Link */}
        <Link 
          to="/faq" 
          className="group flex items-center justify-center gap-4 font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-white hover:text-[#C8CDD2] transition-colors"
        >
          <span className="border-b border-white/30 group-hover:border-[#C8CDD2] pb-1 transition-colors">
            READ ALL FAQS ON THE MAIN FAQ PAGE
          </span>
          <MoveRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </section>
  );
}