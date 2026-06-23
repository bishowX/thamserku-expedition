import { useState } from "react";
import type { FAQQuickItem } from "../../../lib/queries";

type PageData = {
  quickFaqEyebrow?: string;
  quickFaqHeadline?: string;
  quickFaqSubheading?: string;
  quickFaqs?: FAQQuickItem[];
};

export function FAQQuickSection({ page }: { page?: PageData }) {
  const eyebrow = page?.quickFaqEyebrow ?? "FREQUENTLY ASKED — THAMSERKU";
  const headline = page?.quickFaqHeadline ?? "Quiet answers, before you write to us.";
  const subheading = page?.quickFaqSubheading ?? "";
  const faqs = page?.quickFaqs ?? [];

  const [openStates, setOpenStates] = useState<Record<number, boolean>>({});

  const toggleFaq = (idx: number) => {
    setOpenStates((prev) => ({ ...prev, [idx]: !prev[idx] }));
  };

  if (faqs.length === 0) return null;

  return (
    <section className="relative w-full bg-[#1A1A1A] py-24 overflow-hidden">
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(to right, #202121 1px, transparent 1px), linear-gradient(to bottom, #202121 1px, transparent 1px)`,
          backgroundSize: "64px 64px",
        }}
      />

      <div className="relative z-10 w-full max-w-[880px] mx-auto px-8 flex flex-col items-center">
        <div className="flex flex-col items-center text-center mb-24 md:mb-32">
          <span className="font-['DM_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#C8CDD2] mb-8">
            {eyebrow}
          </span>
          <h2 className="font-['Fraunces'] font-light text-display-xl text-white max-w-[22ch] mb-8">
            {headline}
          </h2>
          {subheading && (
            <p className="font-['Fraunces'] italic text-display-m text-[#C8CDD2] max-w-[56ch]">
              {subheading}
            </p>
          )}
        </div>

        <div className="w-full flex flex-col border-b border-[#C8CDD2]/30">
          {faqs.map((faq, idx) => {
            const isOpen = !!openStates[idx];
            const qPrefix = `Q.${String(idx + 1).padStart(2, "0")}`;
            const aPrefix = `A.${String(idx + 1).padStart(2, "0")}`;
            return (
              <div
                key={faq._key}
                className="flex flex-col border-t border-[#C8CDD2]/30"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="flex flex-row items-center justify-between w-full py-5 text-left group focus:outline-none focus-visible:ring-1 focus-visible:ring-[#C8CDD2]"
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-quick-${idx}`}
                  id={`faq-question-quick-${idx}`}
                >
                  <div className="flex flex-col md:flex-row md:items-start gap-4 md:gap-8 flex-1 pr-8">
                    <span className="font-['DM_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#C8CDD2] md:min-w-[80px] md:pt-2">
                      {qPrefix} —
                    </span>
                    <h3 className="font-['Fraunces'] font-light text-display-m text-white group-hover:text-white max-w-[60ch] transition-colors">
                      {faq.question}
                    </h3>
                  </div>
                  <span
                    className={`font-['DM_Mono'] text-[14px] text-[#C8CDD2] group-hover:text-white transition-all duration-[250ms] ease-out transform ${isOpen ? "rotate-180" : "rotate-0"}`}
                  >
                    ▾
                  </span>
                </button>
                <div
                  id={`faq-answer-quick-${idx}`}
                  role="region"
                  aria-labelledby={`faq-question-quick-${idx}`}
                  className="grid transition-all duration-[250ms] ease-out"
                  style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                >
                  <div className="overflow-hidden">
                    <div className="flex flex-col md:flex-row md:items-start gap-4 md:gap-8 pb-8 md:pb-10">
                      <span className="font-['DM_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#C8CDD2] md:min-w-[80px] md:pt-1">
                        {aPrefix} —
                      </span>
                      <p className="font-['DM_Sans'] font-light text-body text-[#C8CDD2] leading-[1.65] max-w-[60ch]">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
