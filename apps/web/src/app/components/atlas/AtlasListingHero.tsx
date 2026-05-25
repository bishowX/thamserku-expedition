import heroImage from "../../../assets/images/Copy_of_Lukla_(14).jpg";
import { urlFor } from "../../../lib/sanity";

type AtlasHeroData = {
  heroHeadline?: string;
  heroSubheading?: string;
  heroImage?: { asset: { _ref: string } } | null;
};

export function AtlasListingHero({ data }: { data?: AtlasHeroData }) {
  const headline =
    data?.heroHeadline ?? "Five mountains. Five different kinds of preparation.";
  const subheading =
    data?.heroSubheading ??
    "Thamserku reads each Himalayan summit as a passage of its own. Choose by altitude, region, season or character — then begin a private conversation with the expedition desk.";
  const bgSrc = data?.heroImage
    ? urlFor(data.heroImage).width(1920).url()
    : (heroImage as string);

  return (
    <section className="relative w-full min-h-screen bg-[#1A1A1A] flex flex-col justify-end text-white overflow-hidden pb-16 md:pb-32">
      <div className="absolute inset-0 z-0">
        <img
          src={bgSrc}
          alt="Atlas hero background"
          className="w-full h-full object-cover opacity-70"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#1A1A1A]/60 to-[#1A1A1A]" />
      </div>

      <div className="relative z-20 w-full max-w-[1440px] mx-auto px-8 flex flex-col justify-end h-full mt-32 md:mt-48">
        <h1 className="font-['Radley'] font-light text-fluid-display tracking-tight leading-[1.1] mb-6 max-w-[18ch] text-white">
          {headline}
        </h1>
        <p className="font-['Lexend'] font-light text-[#C8CDD2] text-fluid-body max-w-[60ch] leading-relaxed mb-20">
          {subheading}
        </p>
      </div>
    </section>
  );
}
