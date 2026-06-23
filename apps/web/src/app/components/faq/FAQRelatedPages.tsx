import { Link } from 'react-router';
import type { FAQRelatedPage } from '../../../lib/queries';

type PageData = { relatedPagesEyebrow?: string; relatedPagesHeadline?: string; relatedPages?: FAQRelatedPage[] };

export const FAQRelatedPages = ({ page }: { page?: PageData }) => {
  const pages = page?.relatedPages ?? [];
  return (
 <section className="bg-[#F4F2EC] section-padding">
      <div className="max-w-[1320px] mx-auto flex flex-col items-center">

        {/* Section Header */}
        <div className="flex flex-col items-center mb-16 md:mb-20">
          <span className="font-['DM_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#5A6673] text-center mb-6">
            {page?.relatedPagesEyebrow ?? 'READ THE PAGES — § II'}
          </span>
          <h2 className="font-['Fraunces'] font-light text-display-l text-[#1A1A1A] text-center max-w-[28ch]">
            {page?.relatedPagesHeadline ?? 'Each question links to a page.'}
          </h2>
        </div>

        {/* Related pages grid */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border-t border-[#5A6673]/30">
          {pages.map((item, idx) => (
            <div
              key={idx}
              className={`flex flex-col px-6 py-8 border-[#5A6673]/30 ${idx !== 0 ? 'border-t md:border-t-0 md:border-l' : ''} ${idx >= 4 ? 'lg:border-t' : ''} ${idx === 4 ? 'lg:border-l-0' : ''}`}
            >
              <span className="font-['DM_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#5A6673] mb-6 min-h-[3em]">
                {item.eyebrow}
              </span>
              <h3 className="font-['Fraunces'] font-light text-display-m text-[#1A1A1A] mb-4">
                {item.title}
              </h3>
              <p className="font-['DM_Sans'] font-light text-body text-[#5A6673] leading-[1.5] mb-8 flex-grow">
                {item.desc}
              </p>
              <Link to={item.linkTo} className="font-['DM_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#0A3A77] mt-auto hover:text-[#1A1A1A] transition-colors">
                {item.linkText}
              </Link>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};