import { Link } from 'react-router';

type PageData = { closingHeadline?: string; closingBody?: string };

export const PrivateClosing = ({ page }: { page?: PageData }) => {
  return (
 <section className="bg-[#1A1A1A] py-24 px-8 border-t border-white/10">
      <div className="max-w-[880px] mx-auto flex flex-col items-center">
        
        {/* Eyebrow */}
        <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#C8CDD2] text-center mb-10">
          BEGIN PRIVATELY — § VI
        </span>

        {/* Headline */}
        <h2 className="font-['Radley'] font-light text-[60px] md:text-[80px] text-white leading-[1.05] text-center max-w-[24ch] mb-8">
          {page?.closingHeadline ?? 'Every serious journey begins privately.'}
        </h2>

        {/* Sub-paragraph */}
        <p className="font-['Lexend'] font-light text-[17px] text-[#C8CDD2] leading-[1.65] text-center max-w-[60ch] mb-16">
          {page?.closingBody ?? 'Share your background, your timing, and your level of discretion. A senior advisor will respond personally — within 48 hours, through your preferred channel — and the private conversation begins.'}
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-6 w-full sm:w-auto items-center justify-center mb-16">
          <Link 
            to="/consultation?intent=private" 
            className="w-full sm:w-auto border border-white text-white px-10 py-5 flex items-center justify-center font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] hover:bg-white hover:text-[#1A1A1A] transition-colors whitespace-nowrap"
          >
            SCHEDULE A PRIVATE CONSULTATION →
          </Link>
          
          <Link 
            to="/consultation" 
            className="w-full sm:w-auto border border-white/30 text-[#C8CDD2] px-10 py-5 flex items-center justify-center font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] hover:border-white hover:text-white transition-colors whitespace-nowrap"
          >
            SPEAK WITH THE EXPEDITION DESK →
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