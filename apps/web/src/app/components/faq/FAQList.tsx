import { useState } from "react";
import { Link } from "react-router";
import type { FAQPageCategory } from "../../../lib/queries";

type PageData = { listEyebrow?: string };

export const FAQList = ({
  page,
  categories: sanityCategories,
}: {
  page?: PageData;
  categories?: FAQPageCategory[];
}) => {
  const [openStates, setOpenStates] = useState<Record<string, boolean>>({});

  const renderData = (sanityCategories ?? []).map((cat, catIdx) => ({
    id: cat.label.toLowerCase().replace(/[^a-z0-9]/g, "-"),
    numLabel: `CATEGORY ${["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X"][catIdx] ?? String(catIdx + 1)}`,
    label: cat.label,
    title: cat.title,
    subtitle: cat.subtitle,
    items: (cat.items ?? []).map((item, itemIdx) => ({
      qNum: `Q.${String(itemIdx + 1).padStart(2, "0")}`,
      question: item.question,
      aNum: `A.${String(itemIdx + 1).padStart(2, "0")}`,
      answer: item.answer,
      linkText: item.linkText,
      linkTo: item.linkTo,
    })),
  }));

  const toggleFaq = (key: string) => {
    setOpenStates((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <section className="relative w-full bg-[#1A1A1A] section-padding overflow-hidden">
      <div className="relative z-10 w-full max-w-[880px] mx-auto flex flex-col items-center">
        <div className="w-full flex justify-center mb-16 md:mb-24">
          <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#C8CDD2]">
            {page?.listEyebrow ?? "FIFTEEN QUIET ANSWERS"}
          </span>
        </div>

        {renderData.map((category, catIdx) => (
          <div
            key={catIdx}
            id={category.id}
            className="w-full flex flex-col scroll-mt-32"
          >
            {/* Category section header */}
            <div className="w-full flex flex-col mb-[50px]">
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
                      className="flex flex-row items-center justify-between w-full py-5 text-left group focus:outline-none focus-visible:ring-1 focus-visible:ring-[#C8CDD2]"
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
                        className={`font-['JetBrains_Mono'] text-[14px] text-[#C8CDD2] group-hover:text-white transition-all duration-[250ms] ease-out transform ${isOpen ? "rotate-180" : "rotate-0"}`}
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
                      style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                    >
                      <div className="overflow-hidden">
                        <div className="flex flex-col md:flex-row items-start md:items-baseline gap-4 md:gap-8 pb-[32px] md:pb-[40px]">
                          <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#5A6673] shrink-0 mt-1 hidden md:block">
                            {item.aNum}
                          </span>
                          <div className="flex flex-col max-w-[60ch]">
                            <p className="font-['Lexend'] font-light text-[15px] text-[#C8CDD2] leading-[1.65] mb-8">
                              <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#5A6673] mr-4 md:hidden">
                                {item.aNum}
                              </span>
                              {item.answer}
                            </p>
                            {/* Bottom row link */}
                            <div className="flex">
                              <Link
                                to={item.linkTo}
                                className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[10.5px] text-[#0A3A77] hover:text-white transition-colors"
                              >
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
      </div>
    </section>
  );
};
