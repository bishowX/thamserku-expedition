import { Link } from "react-router";

type PageData = { closingHeadline?: string; closingBody?: string };

export function TeamClosing({ page }: { page?: PageData }) {
  return (
 <section className="w-full bg-[#2E353C] text-white section-padding">
      <div className="max-w-[1440px] mx-auto flex flex-col items-center text-center gap-12 md:gap-16">
        
        {/* Eyebrow */}
        <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#C8CDD2] block">
          06 — BEGIN PRIVATELY
        </span>

        {/* Content */}
        <div className="flex flex-col items-center gap-8 w-full max-w-[800px]">
          <h2 className="font-['Cormorant_Garamond'] font-light text-5xl md:text-[60px] lg:text-[80px] leading-[1.05] text-white tracking-tight">
            {page?.closingHeadline ?? 'Schedule a consultation. Meet the team that will guide your journey.'}
          </h2>

          <p className="font-['Inter'] font-light text-[#C8CDD2] text-[17px] leading-relaxed max-w-[60ch] mx-auto mt-4">
            {page?.closingBody ?? 'Every Thamserku expedition begins with a private conversation. We will introduce the team — the leadership, the sirdar, and the climbing Sherpas — who will walk with you through the season.'}
          </p>
        </div>

        {/* CTAs */}
        <div className="flex flex-col gap-6 w-full items-center mt-8">
          <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-center justify-center w-full md:w-auto">
            <Link to="/consultation" className="border border-white text-white px-8 py-4 font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] hover:bg-white hover:text-[#0A3A77] transition-colors w-full md:w-auto text-center">
              Schedule a Consultation →
            </Link>
            <Link to="/consultation" className="border border-white/20 text-[#C8CDD2] px-8 py-4 font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] hover:border-white hover:text-white transition-colors w-full md:w-auto text-center">
              Speak with the Expedition Desk →
            </Link>
          </div>
          
          <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#C8CDD2] mt-4 opacity-60">
            RESPONSE WITHIN 48 HOURS · HANDLED BY SENIOR EXPEDITION STAFF
          </span>
        </div>

      </div>
    </section>
  );
}
