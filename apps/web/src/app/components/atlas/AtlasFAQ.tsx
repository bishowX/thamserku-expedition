import { useState } from "react";
import { Link } from "react-router";
import { MoveRight } from "lucide-react";

type FaqItem = {
  _key: string;
  question: string;
  answer: string;
};

type FaqData = {
  faqEyebrow?: string;
  faqHeadline?: string;
  faqSubheading?: string;
  faqCtaLabel?: string;
  faqs?: FaqItem[];
};

type Props = { data?: FaqData };

export function AtlasFAQ({ data }: Props) {
  const eyebrow = data?.faqEyebrow ?? "FREQUENTLY ASKED — ATLAS";
  const headline = data?.faqHeadline ?? "Five quiet answers, before you write to us.";
  const subheading = data?.faqSubheading ?? "Most readers arrive at the Atlas with the same questions. These are the most common.";
  const ctaLabel = data?.faqCtaLabel ?? "READ ALL FAQS ON THE MAIN FAQ PAGE";
  const ctaHref = "/faq";
  const faqs = data?.faqs ?? [];

  const [openStates, setOpenStates] = useState<Record<number, boolean>>({});

  const toggleFaq = (idx: number) => {
    setOpenStates((prev) => ({ ...prev, [idx]: !prev[idx] }));
  };

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
        {/* Section header */}
        <div className="flex flex-col items-center text-center mb-24 md:mb-32">
          <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#C8CDD2] mb-8">
            {eyebrow}
          </span>
          <h2 className="font-['Radley'] font-light text-[48px] md:text-[64px] leading-[1.1] text-white max-w-[22ch] mb-8">
            {headline}
          </h2>
          <p className="font-['Cormorant_Garamond'] italic text-[22px] text-[#C8CDD2] max-w-[56ch]">
            {subheading}
          </p>
        </div>

        {/* FAQ list */}
        <div className="w-full flex flex-col mb-24 border-b border-[#C8CDD2]/30">
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
                  aria-controls={`faq-answer-atlas-${idx}`}
                  id={`faq-question-atlas-${idx}`}
                >
                  <div className="flex flex-col md:flex-row md:items-start gap-4 md:gap-8 flex-1 pr-8">
                    <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#C8CDD2] md:min-w-[80px] md:pt-2">
                      {qPrefix} —
                    </span>
                    <h3 className="font-['Radley'] font-light text-[22px] md:text-[24px] leading-[1.3] text-white group-hover:text-white max-w-[60ch] transition-colors">
                      {faq.question}
                    </h3>
                  </div>
                  <span
                    className={`font-['JetBrains_Mono'] text-[14px] text-[#C8CDD2] group-hover:text-white transition-all duration-[250ms] ease-out transform ${isOpen ? "rotate-180" : "rotate-0"}`}
                  >
                    ▾
                  </span>
                </button>
                <div
                  id={`faq-answer-atlas-${idx}`}
                  role="region"
                  aria-labelledby={`faq-question-atlas-${idx}`}
                  className="grid transition-all duration-[250ms] ease-out"
                  style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                >
                  <div className="overflow-hidden">
                    <div className="flex flex-col md:flex-row md:items-start gap-4 md:gap-8 pb-8 md:pb-10">
                      <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#C8CDD2] md:min-w-[80px] md:pt-1">
                        {aPrefix} —
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

        {/* CTA link */}
        <Link
          to={ctaHref}
          className="group flex items-center justify-center gap-4 font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-white hover:text-[#C8CDD2] transition-colors"
        >
          <span className="border-b border-white/30 group-hover:border-[#C8CDD2] pb-1 transition-colors">
            {ctaLabel}
          </span>
          <MoveRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </section>
  );
}
