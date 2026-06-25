import { useRef } from "react";
import { MoveRight } from "lucide-react";
import { Link } from "react-router";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { stegaClean } from "@sanity/client/stega";
import type { EncodeDataAttributeCallback } from "@sanity/react-loader";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { urlFor } from "../../lib/sanity";
import { TextReveal } from "./TextReveal";

gsap.registerPlugin(ScrollTrigger);

type ClosingData = {
  closingEyebrow?: string;
  closingHeading?: string;
  closingBody?: string;
  closingImage?: { asset: { _ref: string } } | null;
};

export function Closing({ data, encodeDataAttribute }: { data?: ClosingData; encodeDataAttribute?: EncodeDataAttributeCallback }) {
  const eyebrow = data?.closingEyebrow ?? "07 — BEGIN PRIVATELY";
  const heading = stegaClean(
    data?.closingHeading ?? "Begin with knowledge. Move with respect.");
  const body =
    data?.closingBody ??
    "Every Thamserku journey begins with a private conversation — with our expedition desk, not a booking page.";
  const bgSrc = data?.closingImage
    ? urlFor(data.closingImage).width(1920).url()
    : null;

  const sectionRef = useRef<HTMLElement>(null);
  const eyebrowRef = useRef<HTMLSpanElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const bodyRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      // Background parallax
      if (bgRef.current) {
        const img = bgRef.current.querySelector("img");
        if (img) {
          gsap.to(img, {
            yPercent: 12,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          });
        }
      }

      if (eyebrowRef.current) {
        gsap.from(eyebrowRef.current, {
          opacity: 0,
          y: 15,
          duration: 0.5,
          ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 70%" },
        });
      }

      // Masked word reveal
      if (headingRef.current) {
        const words = headingRef.current.querySelectorAll("[data-word]");
        gsap.from(words, {
          yPercent: 100,
          duration: 0.7,
          stagger: 0.03,
          ease: "power4.out",
          scrollTrigger: { trigger: headingRef.current, start: "top 75%" },
        });
      }

      // Body blur clear
      if (bodyRef.current) {
        gsap.from(bodyRef.current, {
          opacity: 0,
          y: 15,
          filter: "blur(4px)",
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: { trigger: bodyRef.current, start: "top 80%" },
        });
      }

      // CTAs stagger
      if (ctaRef.current) {
        gsap.from(Array.from(ctaRef.current.children), {
          opacity: 0,
          y: 15,
          stagger: 0.08,
          duration: 0.5,
          ease: "power3.out",
          scrollTrigger: { trigger: ctaRef.current, start: "top 85%" },
        });
      }
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-[#1A1A1A] text-white section-padding overflow-hidden flex flex-col items-center justify-center text-center"
    >
      {bgSrc && (
        <div ref={bgRef} className="absolute inset-0 z-0">
          <ImageWithFallback
            src={bgSrc}
            alt="Closing background"
            className="w-full h-full object-cover opacity-20 mix-blend-luminosity will-change-transform"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A] via-transparent to-[#1A1A1A] opacity-80" />
        </div>
      )}

      <div className="relative z-10 w-full max-w-[880px] mx-auto flex flex-col items-center gap-8">
        <span
          ref={eyebrowRef}
          className="font-['DM_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#C8CDD2]"
        >
          {eyebrow}
        </span>

        <h2
          ref={headingRef}
          className="font-['Fraunces'] font-light text-display-l mb-2"
          data-sanity={encodeDataAttribute?.(['homePage', 'closingHeading'])}
        >
          <TextReveal text={heading} />
        </h2>

        <p
          ref={bodyRef}
          className="font-['DM_Sans'] font-light text-[#C8CDD2] text-body leading-[1.8] max-w-[48ch] mb-4 whitespace-pre-line"
        >
          {body}
        </p>

        <div ref={ctaRef} className="flex flex-wrap justify-center gap-4 mt-8">
          <Link
            to="/design-your-expedition"
            className="btn-cta btn-cta-primary border border-white bg-white text-[#0A3A77] px-8 py-4 font-['DM_Mono'] uppercase tracking-[0.22em] text-[11px] flex items-center gap-3"
          >
            <span>Design Your Expedition</span>
            <MoveRight className="w-3 h-3 arrow-shift" />
          </Link>
          <Link
            to="/consultation"
            className="btn-cta btn-cta-secondary border border-white/30 px-8 py-4 font-['DM_Mono'] uppercase tracking-[0.22em] text-[11px] flex items-center gap-3"
          >
            <span>Enquire</span>
            <MoveRight className="w-3 h-3 arrow-shift" />
          </Link>
        </div>
      </div>
    </section>
  );
}
