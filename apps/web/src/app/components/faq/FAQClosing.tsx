import { Link } from 'react-router';

type PageData = { closingHeadline?: string; closingBody?: string };

export const FAQClosing = ({ page }: { page?: PageData }) => {
  return (
 <section className="bg-[#2E353C] py-24 px-8">
      <div className="max-w-[880px] mx-auto flex flex-col items-center">
        
        {/* Eyebrow */}
        <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#C8CDD2] text-center mb-10">
          BEGIN PRIVATELY — § III
        </span>

        {/* Headline */}
        <h2 className="font-['Radley'] font-light text-[60px] md:text-[80px] text-white leading-[1.1] text-center max-w-[26ch] mb-8">
          {page?.closingHeadline ?? 'Your question is not on this page?'}
        </h2>

        {/* Sub-paragraph */}
        <p className="font-['Lexend'] font-light text-[17px] text-[#C8CDD2] leading-[1.65] text-center max-w-[60ch] mb-16">
          {page?.closingBody ?? 'Write to the expedition desk. A senior advisor will respond personally — quietly, and within 48 hours — and the conversation begins.'}
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-6 w-full sm:w-auto items-center justify-center mb-16">
          <Link 
            to="/consultation" 
            className="w-full sm:w-auto border border-white text-white px-10 py-5 flex items-center justify-center font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] hover:bg-white hover:text-[#0A3A77] transition-colors whitespace-nowrap"
          >
            SCHEDULE A CONSULTATION →
          </Link>
          
          <Link 
            to="/atlas" 
            className="w-full sm:w-auto border border-white/50 text-[#C8CDD2] px-10 py-5 flex items-center justify-center font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] hover:border-white hover:text-white transition-colors whitespace-nowrap"
          >
            EXPLORE THE ATLAS →
          </Link>
        </div>

        {/* Small bottom line */}
        <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#C8CDD2] text-center">
          ALL ENQUIRIES ARE HANDLED DISCREETLY BY SENIOR EXPEDITION STAFF.
        </span>

      </div>
    </section>
  );
};