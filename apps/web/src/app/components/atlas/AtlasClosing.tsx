import { MoveRight } from "lucide-react";
import { Link } from "react-router";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { urlFor } from "../../../lib/sanity";

type ClosingData = {
  closingEyebrow?: string;
  closingHeadline?: string;
  closingBody?: string;
  closingFootnote?: string;
  closingImage?: { asset: { _ref: string } } | null;
};

type Props = { data?: ClosingData };

export function AtlasClosing({ data }: Props) {
  const eyebrow = data?.closingEyebrow ?? "07 — BEGIN PRIVATELY";
  const headline = data?.closingHeadline ?? "Not sure which mountain is yours? That is exactly why we begin with a conversation.";
  const body = data?.closingBody ?? "Share your background, your timing, and your intention. Our expedition desk will respond with the mountain — and the edition — that fits.";
  const footnote = data?.closingFootnote ?? "RESPONSE WITHIN 48 HOURS · HANDLED BY SENIOR EXPEDITION STAFF";

  const bgSrc = data?.closingImage
    ? urlFor(data.closingImage).width(1920).url()
    : "https://images.unsplash.com/photo-1745252288608-ed7c56a8d15e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxIaW1hbGF5YW4lMjByaWRnZWxpbmUlMjBzaWxob3VldHRlfGVufDF8fHx8MTc3NzQ1MjE0N3ww&ixlib=rb-4.1.0&q=80&w=1080";

  return (
    <section className="relative w-full bg-[#1A1A1A] text-white py-24 px-8 overflow-hidden min-h-[800px] flex flex-col justify-center items-center text-center">
      <div className="absolute inset-0 z-0 opacity-40 mix-blend-luminosity">
        <ImageWithFallback
          src={bgSrc}
          alt="Himalayan Silhouette"
          className="w-full h-full object-cover object-bottom"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#1A1A1A] via-[#1A1A1A]/80 to-transparent" />
      </div>

      <div className="relative z-10 max-w-[800px] mx-auto flex flex-col items-center">
        <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#5A6673] mb-12">
          {eyebrow}
        </span>

        <h2 className="font-['Radley'] font-light text-5xl md:text-[80px] leading-[1.05] text-white tracking-tight mb-8">
          {headline}
        </h2>

        <p className="font-['Lexend'] font-light text-[#C8CDD2] text-[17px] leading-relaxed max-w-[60ch] mb-16">
          {body}
        </p>

        <div className="flex flex-col sm:flex-row gap-6 mb-12">
          <Link
            to="/consultation"
            className="border border-white bg-white text-[#0A3A77] px-8 py-4 font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] hover:bg-transparent hover:text-white transition-colors flex items-center justify-center gap-3"
          >
            Schedule a Consultation <MoveRight className="w-4 h-4" strokeWidth={1} />
          </Link>
          <Link
            to="/expeditions/everest"
            className="border border-white/30 text-white px-8 py-4 font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] hover:border-white transition-colors flex items-center justify-center gap-3"
          >
            View Everest <MoveRight className="w-4 h-4" strokeWidth={1} />
          </Link>
        </div>

        <div className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#C8CDD2]">
          {footnote}
        </div>
      </div>
    </section>
  );
}
