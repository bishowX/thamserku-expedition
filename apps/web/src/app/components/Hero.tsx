import { MoveRight } from "lucide-react";
import { Link } from "react-router";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import heroImage from "../../assets/images/Copy_of_Majgaon_View_(13).JPG";

type HeroData = {
  heroHeadline?: string;
  heroSubheading?: string;
};

const DEFAULT_HEADLINE = "The Himalayas, understood through generations.";
const DEFAULT_SUBHEADING =
  "Private expeditions shaped by Sherpa wisdom, Himalayan discipline and nearly four decades of legacy.";

export function Hero({ data }: { data?: HeroData }) {
  const headline = data?.heroHeadline ?? DEFAULT_HEADLINE;
  const subheading = data?.heroSubheading ?? DEFAULT_SUBHEADING;

  return (
    <section className="relative w-full min-h-screen flex flex-col justify-center text-white pb-32 pt-48 px-8 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <ImageWithFallback
          src={heroImage}
          alt="Majgaon View"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#1A1A1A]/60 via-transparent to-[#1A1A1A]/90 mix-blend-multiply" />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col gap-8">
        <div className="max-w-4xl">
          <h1 className="font-['Radley'] font-light text-6xl md:text-8xl tracking-tight leading-[1.1] mb-6">
            {headline}
          </h1>
          <p className="font-['Lexend'] font-light text-[#C8CDD2] text-xl md:text-2xl max-w-[56ch] leading-relaxed">
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

      <div className="hidden md:block absolute bottom-0 left-0 w-full border-t border-white/10 bg-[#1A1A1A]/40 backdrop-blur-sm z-20">
        <div className="max-w-7xl mx-auto flex flex-wrap md:flex-nowrap divide-y md:divide-y-0 md:divide-x divide-white/10 font-['JetBrains_Mono'] text-[10px] uppercase tracking-[0.22em] text-[#C8CDD2]">
          <div className="p-4 flex-1">REGION · Khumbu — Nepal Himalaya</div>
          <div className="p-4 flex-1">SEASON · Spring · Autumn</div>
          <div className="p-4 flex-1">INDEX · EVR · MAN · DHA · MAK · HIM</div>
          <div className="p-4 flex-1">EDITION · A · B · C · D · E</div>
        </div>
      </div>
    </section>
  );
}
