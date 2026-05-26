import { useState } from 'react';
import { Link } from 'react-router';
import type { YetiPageData } from '../../../lib/queries';

type PageData = YetiPageData['yetiPage'];

export const YetiFAQ = ({ page }: { page?: PageData }) => {
  const faqs = page?.faqs ?? [];
  const [openStates, setOpenStates] = useState<Record<number, boolean>>({});

  const toggleFaq = (idx: number) => {
    setOpenStates((prev: Record<number, boolean>) => ({ ...prev, [idx]: !prev[idx] }));
  };

  return (
 <section className="bg-[#F4F2EC] py-24 px-8">
      <div className="max-w-[880px] mx-auto flex flex-col items-center">

        <div className="flex flex-col items-center mb-20 md:mb-24 w-full">
          <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#5A6673] text-center mb-8">
            FREQUENTLY ASKED — INFRASTRUCTURE
          </span>
          {page?.faqHeading && (
            <h2 className="font-['Radley'] font-light text-[48px] md:text-[64px] text-[#1A1A1A] leading-[1.1] text-center max-w-[22ch] mb-6">
              {page.faqHeading}
            </h2>
          )}
          {page?.faqTagline && (
            <p className="font-['Cormorant_Garamond'] italic text-[#0A3A77] text-[22px] text-center max-w-[56ch]">
              {page.faqTagline}
            </p>
          )}
        </div>

        {faqs.length > 0 && (
          <div className="w-full flex flex-col border-b border-[#5A6673]/30">
            {faqs.map((faq, idx) => {
              const num = (idx + 1).toString().padStart(2, '0');
              const isOpen = !!openStates[idx];
              return (
                <div key={faq._key} className="flex flex-col border-t border-[#5A6673]/30">
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="flex flex-row items-center justify-between w-full py-8 md:py-10 text-left group focus:outline-none focus-visible:ring-1 focus-visible:ring-[#1A1A1A]"
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-yeti-${idx}`}
                    id={`faq-question-yeti-${idx}`}
                  >
                    <div className="flex items-start gap-4 md:gap-8 flex-1 pr-8">
                      <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#5A6673] mt-2 whitespace-nowrap">
                        Q.{num} —
                      </span>
                      <h3 className="font-['Radley'] font-light text-[22px] md:text-[24px] text-[#1A1A1A] leading-[1.3] group-hover:text-[#1A1A1A] transition-colors max-w-[60ch]">
                        {faq.question}
                      </h3>
                    </div>
                    <span
                      className={`font-['JetBrains_Mono'] text-[14px] text-[#5A6673] group-hover:text-[#1A1A1A] transition-all duration-[250ms] ease-out transform ${isOpen ? 'rotate-180' : 'rotate-0'}`}
                    >
                      ▾
                    </span>
                  </button>

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
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

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
