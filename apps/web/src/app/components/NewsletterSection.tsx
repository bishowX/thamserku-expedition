type NewsletterData = {
  newsletterEyebrow?: string;
  newsletterHeading?: string;
  newsletterBody?: string;
  newsletterCta?: string;
  newsletterPrivacyNote?: string;
};

export function NewsletterSection({ data }: { data?: NewsletterData }) {
  return (
    <section id="newsletter" className="w-full bg-[#F4F2EC] py-24 px-6 md:px-16">
      <div className="flex flex-col items-center text-center gap-6">
        <p className="font-['JetBrains_Mono'] uppercase tracking-[2.4px] text-[11px] text-[#5A6673]">
          {data?.newsletterEyebrow ?? "07 — FIELD NOTES — NEWSLETTER"}
        </p>

        <h2 className="font-['Radley'] text-[40px] leading-[1.1] text-[#1A1A1A] max-w-[480px]">
          {data?.newsletterHeading ?? "Receive Field Notes from the expedition desk."}
        </h2>

        <p className="font-['Lexend'] font-light text-[16px] leading-[1.1] text-[#5A6673] max-w-[540px]">
          {data?.newsletterBody ??
            "A quiet quarterly letter of field reports, route judgment and Himalayan readings."}
        </p>

        <form
          className="flex flex-col md:flex-row gap-6 items-end justify-center w-full max-w-[485px] mt-2"
          onSubmit={(e) => e.preventDefault()}
        >
          <div className="flex-1 w-full flex flex-col gap-2 items-start">
            <input
              type="email"
              placeholder="Your email address"
              required
              className="w-full bg-transparent border-b border-[#C8CDD2] pb-2 font-['Radley'] italic text-[14px] tracking-[2.4px] text-[#1A1A1A] placeholder:text-[#C8CDD2] focus:outline-none focus:border-[#1A1A1A] transition-colors"
            />
          </div>
          <button
            type="submit"
            className="w-full md:w-auto border border-[rgba(10,58,119,0.35)] px-8 py-[14px] font-['JetBrains_Mono'] uppercase tracking-[2.4px] text-[11px] text-[#0A3A77] hover:border-[#0A3A77] transition-colors whitespace-nowrap"
          >
            {data?.newsletterCta ?? "SUBSCRIBE →"}
          </button>
        </form>

        <p className="font-['JetBrains_Mono'] font-light text-[12px] text-[#5A6673] leading-[1.1] uppercase tracking-[1px]">
          {data?.newsletterPrivacyNote ??
            "BY SUBSCRIBING YOU AGREE TO OUR PRIVACY TERMS. WE WILL NEVER SHARE YOUR DETAILS."}
        </p>
      </div>
    </section>
  );
}
