import { MoveRight } from "lucide-react";
import { Link } from "react-router";
import { urlFor } from "../../lib/sanity";

type HeroData = {
  heroHeadline?: string;
  heroSubheading?: string;
  heroImage?: { asset: { _ref: string } } | null;
};

const DEFAULT_HEADLINE = "The Himalayas, understood through generations.";
const DEFAULT_SUBHEADING =
  "Private expeditions shaped by Sherpa wisdom, Himalayan discipline and nearly four decades of legacy.";

export function Hero({ data }: { data?: HeroData }) {
  const headline = data?.heroHeadline ?? DEFAULT_HEADLINE;
  const subheading = data?.heroSubheading ?? DEFAULT_SUBHEADING;
  const bgImage = data?.heroImage ? urlFor(data.heroImage).width(1920).url() : undefined;

  return (
    <section className="relative w-full min-h-screen flex flex-col justify-center text-white pb-32 pt-48 px-8 overflow-hidden">
      <div className="absolute inset-0 z-0">
        {bgImage && (
          <img
            src={bgImage}
            alt="Hero background"
            className="w-full h-full object-cover"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-[#1A1A1A]/60 via-transparent to-[#1A1A1A]/90 mix-blend-multiply" />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col gap-8">
        <div className="max-w-4xl">
          <h1 className="font-['Radley'] font-light text-fluid-display tracking-tight leading-[1.1] mb-6">
            {headline}
          </h1>
          <p className="font-['Lexend'] font-light text-[#C8CDD2] text-fluid-body max-w-[56ch] leading-relaxed">
            {subheading}
          </p>
        </div>

        <div className="flex flex-wrap gap-4 mt-4">
          <Link
            to="/atlas"
            className="border border-white bg-white text-[#0A3A77] px-8 py-4 font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] flex items-center gap-3 hover:bg-transparent hover:text-white transition-colors"
          >
            Explore the Atlas <MoveRight className="w-3 h-3" />
          </Link>
          <Link
            to="/consultation"
            className="border border-white/30 px-8 py-4 font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] flex items-center gap-3 hover:border-white transition-colors"
          >
            Schedule a Consultation <MoveRight className="w-3 h-3" />
          </Link>
        </div>
      </div>
    </section>
  );
}
