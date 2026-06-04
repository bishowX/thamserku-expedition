import { Link } from "react-router";

type PageData = { heroHeadline?: string; heroSubline?: string };

export const PrivateHero = ({ page }: { page?: PageData }) => {
  return (
    <section className="relative w-full min-h-[100vh] bg-[#1A1A1A] flex flex-col justify-end section-padding overflow-hidden">
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(to right, #242424 1px, transparent 1px), linear-gradient(to bottom, #242424 1px, transparent 1px)`,
          backgroundSize: "64px 64px",
        }}
      />
      <div className="relative z-10 w-full max-w-[1440px] mx-auto flex flex-col items-center pt-32 md:pt-0">
        {/* Headline */}
        <h1 className="font-['Radley'] font-light text-fluid-heading tracking-tight text-white leading-[1.1] text-center max-w-[32ch] mb-6">
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
