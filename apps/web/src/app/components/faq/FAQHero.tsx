type PageData = { heroHeadline?: string; heroSubline?: string };

export const FAQHero = ({ page }: { page?: PageData }) => {
  return (
    <section className="relative w-full bg-[#1A1A1A] section-padding overflow-hidden">
      <div className="relative z-10 w-full max-w-[1440px] mx-auto flex flex-col items-center pt-24 md:pt-0">
        {/* Headline */}
        <h1 className="font-['Radley'] font-light text-fluid-heading tracking-tight text-white leading-[1.1] text-center max-w-[22ch] mb-6">
          {page?.heroHeadline ?? "Fifteen quiet answers."}
        </h1>

        {/* Subline */}
        <p className="font-['Lexend'] font-light text-fluid-body text-[#C8CDD2] leading-relaxed max-w-[60ch] text-center mb-20">
          {page?.heroSubline ??
            "The questions our expedition desk is asked most often. Short, considered placeholders at this stage — full answers will be drafted with our senior staff."}
        </p>
      </div>
    </section>
  );
};
