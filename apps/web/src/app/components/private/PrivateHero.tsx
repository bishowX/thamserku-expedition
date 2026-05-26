import { Link } from "react-router";

type PageData = { heroHeadline?: string; heroSubline?: string };

export const PrivateHero = ({ page }: { page?: PageData }) => {
  return (
    <section className="relative w-full min-h-[90vh] bg-[#1A1A1A] flex flex-col justify-end py-24 px-8 overflow-hidden">
      <div className="relative z-10 w-full max-w-[1440px] mx-auto flex flex-col items-center pt-32 md:pt-0">
        {/* Headline */}
        <h1 className="font-['Radley'] font-light text-fluid-display tracking-tight text-white leading-[1.1] text-center max-w-[32ch] mb-6">
          {page?.heroHeadline}
        </h1>

        {/* Subline */}
        <p className="font-['Lexend'] font-light text-fluid-body text-[#C8CDD2] leading-relaxed max-w-[60ch] text-center mb-20">
          {page?.heroSubline}
        </p>

        {/* Primary CTA */}
        <Link
          to="/consultation?intent=private"
          className="border border-white/50 text-white px-10 py-5 flex items-center justify-center font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] hover:bg-white hover:text-[#1A1A1A] transition-colors whitespace-nowrap"
        >
          SCHEDULE A PRIVATE CONSULTATION →
        </Link>
      </div>
    </section>
  );
};
