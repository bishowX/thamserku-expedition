import type { FieldNotesPageFields } from '../../../lib/queries';

export const FieldNotesCategories = ({ page }: { page: FieldNotesPageFields }) => {
  return (
 <section className="bg-[#F4F2EC] py-24 px-8">
      <div className="max-w-[1320px] mx-auto flex flex-col items-center">

        <div className="flex flex-col items-center mb-16 md:mb-20 w-full">
          <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#5A6673] text-center mb-8">
            {page.categoriesEyebrow}
          </span>
          <h2 className="font-['Radley'] font-light text-[40px] md:text-[52px] text-[#1A1A1A] leading-[1.1] text-center max-w-[28ch]">
            {page.categoriesHeadline}
          </h2>
        </div>

        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 border-t border-[#5A6673]/30">
          {page.categories.map((category, idx) => (
            <div
              key={idx}
              className={`flex flex-col px-6 py-8 border-[#5A6673]/30 ${idx !== 0 ? 'border-t md:border-t-0 md:border-l' : ''}`}
            >
              <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[10.5px] text-[#5A6673] mb-6 min-h-[3em] lg:min-h-[4.5em]">
                {category.articleCount}
              </span>
              <h3 className="font-['Radley'] font-light text-[22px] md:text-[26px] text-[#1A1A1A] leading-[1.2] mb-4">
                {category.name}
              </h3>
              <p className="font-['Lexend'] font-light text-[14px] text-[#5A6673] leading-[1.5] flex-grow mb-8">
                {category.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
