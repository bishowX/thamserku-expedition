import type { FAQPageCategory } from '../../../lib/queries';

const ROMAN = ['I','II','III','IV','V','VI','VII','VIII','IX','X'];

type PageData = { categoryNavEyebrow?: string; categoryNavHeadline?: string };

export const FAQCategoryNavigation = ({ page, categories: sanityCategories }: { page?: PageData; categories?: FAQPageCategory[] }) => {
  const items = (sanityCategories ?? []).map((cat, idx) => ({
    id: `#${cat.label.toLowerCase().replace(/[^a-z0-9]/g, '-')}`,
    num: `CATEGORY ${ROMAN[idx] ?? String(idx + 1)}`,
    label: cat.label,
    title: cat.title,
    count: `${cat.items?.length ?? 0} ${cat.items?.length === 1 ? 'QUESTION' : 'QUESTIONS'}`,
  }));

  if (items.length === 0) return null;
  return (
 <section className="bg-[#F4F2EC] section-padding border-b border-[#5A6673]/30">
      <div className="max-w-[1320px] mx-auto flex flex-col items-center">

        {/* Section Header */}
        <div className="flex flex-col items-center mb-16 md:mb-20">
          <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#5A6673] text-center mb-6">
            {page?.categoryNavEyebrow ?? 'JUMP TO A CATEGORY — § I'}
          </span>
          <h2 className="font-['Radley'] font-light text-[36px] md:text-[44px] text-[#1A1A1A] leading-[1.1] text-center max-w-[24ch]">
            {page?.categoryNavHeadline ?? 'Seven categories of question.'}
          </h2>
        </div>

        {/* Category navigation grid */}
        <div
          className="grid grid-cols-1 md:grid-cols-3 mx-auto"
          style={{ gridTemplateColumns: `repeat(${items.length}, minmax(0, 1fr))` }}
        >
          {items.map((cat, idx) => (
            <a
              key={idx}
              href={cat.id}
              className={`flex flex-col px-5 py-6 border-t border-[#5A6673]/30 hover:bg-black/5 transition-colors cursor-pointer ${idx !== 0 ? 'border-l border-[#5A6673]/30' : ''}`}
            >
              <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[10.5px] text-[#5A6673] mb-4 min-h-[3em]">
                {cat.num} —<br />{cat.label}
              </span>
              <h3 className="font-['Radley'] font-light text-[18px] md:text-[22px] text-[#1A1A1A] leading-[1.2] mb-6 flex-grow">
                {cat.title}
              </h3>
              <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[10.5px] text-[#0A3A77] mt-auto">
                {cat.count}
              </span>
            </a>
          ))}
        </div>

      </div>
    </section>
  );
};