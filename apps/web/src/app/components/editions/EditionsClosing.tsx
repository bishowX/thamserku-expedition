import { Link } from "react-router";

type PageData = {
  closingHeading?: string;
  closingBody?: string;
};

export function EditionsClosing({ page }: { page?: PageData }) {
  return (
    <section className="w-full bg-[#0A3A77] text-white py-32 md:py-48 px-8 flex flex-col items-center justify-center text-center">
      <div className="w-full max-w-[800px] flex flex-col items-center">
        <p className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#C8CDD2] mb-12">
          06 — BEGIN PRIVATELY
        </p>

        {page?.closingHeading && (
          <h2 className="font-['Radley'] font-light text-5xl md:text-[64px] lg:text-[80px] leading-[1.05] tracking-tight mb-8">
            {page.closingHeading}
          </h2>
        )}

        {page?.closingBody && (
          <p className="font-['Lexend'] font-light text-[#C8CDD2] text-[17px] leading-relaxed max-w-[60ch] mb-16">
            {page.closingBody}
          </p>
        )}

        <div className="flex flex-col sm:flex-row items-center gap-6 mb-16 w-full justify-center">
          <Link
            to="/consultation"
            className="w-full sm:w-auto px-8 py-4 font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] transition-colors border border-white text-white hover:bg-white hover:text-[#0A3A77]"
          >
            SCHEDULE A CONSULTATION →
          </Link>
          <Link
            to="/consultation"
            className="w-full sm:w-auto px-8 py-4 font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] transition-colors border border-transparent text-[#C8CDD2] hover:text-white hover:border-white/30"
          >
            SPEAK WITH THE EXPEDITION DESK →
          </Link>
        </div>

        <p className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#C8CDD2] opacity-80">
          RESPONSE WITHIN 48 HOURS · HANDLED BY SENIOR EXPEDITION STAFF
        </p>
      </div>
    </section>
  );
}
