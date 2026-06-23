type PageData = {
  newsletterEyebrow?: string;
  newsletterHeadline?: string;
  newsletterBody?: string;
  newsletterPrivacyLine?: string;
  newsletterBottomNote?: string;
};

export const FAQNewsletterBanner = ({ page }: { page?: PageData }) => {
  return (
    <section className="bg-[#2E353C] section-padding">
      <div className="max-w-[880px] mx-auto flex flex-col items-center">
        {/* Eyebrow */}
        <span className="font-['DM_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#C8CDD2] text-center mb-8">
          {page?.newsletterEyebrow ?? "FIELD NOTES — NEWSLETTER"}
        </span>

        {/* Headline */}
        <h2 className="font-['Fraunces'] font-light text-display-l text-white text-center max-w-[26ch] mb-6">
          {page?.newsletterHeadline ??
            "Receive Field Notes from the expedition desk."}
        </h2>

        {/* Sub-paragraph */}
        <p className="font-['DM_Sans'] font-light text-body text-[#C8CDD2] leading-[1.7] text-center max-w-[60ch] mb-12">
          {page?.newsletterBody ??
            "A quiet quarterly letter — field reports, route judgements, Sherpa notes, and Himalayan readings. No marketing. Unsubscribe anytime."}
        </p>

        {/* Inline Newsletter Form */}
        <div className="w-full max-w-[560px] flex flex-col md:flex-row mb-10">
          <div className="flex-grow flex flex-col md:border-b md:border-[#C8CDD2]/30 md:mr-6 mb-6 md:mb-0">
            <input
              type="email"
              autoComplete="email"
              placeholder="Your email address"
              className="w-full bg-transparent border-b border-[#C8CDD2]/30 md:border-none py-4 text-white font-['DM_Sans'] text-body placeholder:font-['Fraunces'] placeholder:italic placeholder:text-[#C8CDD2]/70 focus:outline-none focus:border-white/60 transition-colors"
            />
          </div>
          <div className="md:border-l md:border-[#C8CDD2]/30 md:pl-6 flex items-center justify-center">
            <button className="w-full md:w-auto border border-[#C8CDD2]/50 text-white px-8 py-4 flex items-center justify-center font-['DM_Mono'] uppercase tracking-[0.22em] text-[11px] hover:bg-white hover:text-[#1A1A1A] transition-colors whitespace-nowrap">
              SUBSCRIBE →
            </button>
          </div>
        </div>

        {/* Small privacy line */}
        <span className="font-['DM_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#C8CDD2] text-center mb-6">
          {page?.newsletterPrivacyLine ??
            "BY SUBSCRIBING YOU AGREE TO OUR PRIVACY TERMS. WE WILL NEVER SHARE YOUR DETAILS."}
        </span>
      </div>
    </section>
  );
};
