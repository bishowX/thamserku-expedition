import { Link } from 'react-router';

export const ArchiveClosing = () => {
  return (
    <section className="bg-[#1A1A1A] py-[160px] md:py-[200px] px-8 border-t border-white/10">
      <div className="max-w-[880px] mx-auto flex flex-col items-center">
        
        {/* Eyebrow */}
        <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#C8CDD2] text-center mb-10">
          CONTINUE READING — § VI
        </span>

        {/* Headline */}
        <h2 className="font-['Radley'] font-light text-[60px] md:text-[80px] text-white leading-[1.05] text-center max-w-[24ch] mb-8">
          Read the mountains the house climbs today.
        </h2>

        {/* Sub-paragraph */}
        <p className="font-['Lexend'] font-light text-[17px] text-[#C8CDD2] leading-[1.65] text-center max-w-[56ch] mb-16">
          The archive records where we have been. The Expedition Atlas describes where we climb now. Begin a private consultation when you are ready.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-6 w-full sm:w-auto items-center justify-center">
          <Link 
            to="/consultation" 
            className="w-full sm:w-auto border border-white text-white px-10 py-5 flex items-center justify-center font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] hover:bg-white hover:text-[#1A1A1A] transition-colors whitespace-nowrap"
          >
            SCHEDULE A CONSULTATION →
          </Link>
          
          <Link 
            to="/atlas" 
            className="w-full sm:w-auto border border-white/30 text-[#C8CDD2] px-10 py-5 flex items-center justify-center font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] hover:border-white hover:text-white transition-colors whitespace-nowrap"
          >
            EXPLORE THE ATLAS →
          </Link>
        </div>

      </div>
    </section>
  );
};