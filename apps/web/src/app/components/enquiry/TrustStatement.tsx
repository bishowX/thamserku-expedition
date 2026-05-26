import type { ConsultationPage } from '../../../lib/queries';

export const TrustStatement = ({ data }: { data?: ConsultationPage }) => {
  const quote = data?.trustQuote;
  const body = data?.trustBody;

  return (
 <section className="w-full bg-[#1A1A1A] py-24 px-8 flex justify-center">
      <div className="w-full max-w-[880px] flex flex-col items-center text-center">
        <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#C8CDD2] mb-8">
          HANDLED PERSONALLY — BY THE SENIOR EXPEDITION TEAM
        </span>
        <h2 className="font-['Radley'] font-light text-[40px] md:text-[52px] text-white leading-[1.15] max-w-[28ch] mb-6">
          {quote}
        </h2>
        <p className="font-['Lexend'] text-[#C8CDD2] text-[16px] leading-[1.65] max-w-[60ch]">
          {body}
        </p>
      </div>
    </section>
  );
};
