import { useRef } from "react";
import { PortableText } from "@portabletext/react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { urlFor } from "../../lib/sanity";
import type { ChairmanLetterData } from "../../lib/queries";

gsap.registerPlugin(ScrollTrigger);

type LegacyData = {
  legacyEyebrow?: string;
  chairmanLetter?: ChairmanLetterData | null;
  legacyHeading?: string;
};

function splitAtLastSentence(text: string): [string, string] {
  const idx = text.lastIndexOf(". ");
  if (idx === -1) return [text, ""];
  return [text.slice(0, idx + 1), text.slice(idx + 2)];
}

const bodyComponents = {
  block: {
    normal: ({ children }: { children?: React.ReactNode }) => (
      <p className="font-['Lexend'] font-light text-fluid-body text-[#5A6673] leading-[1.8]">
        {children}
      </p>
    ),
  },
};

export function LegacyPreview({ data }: { data?: LegacyData }) {
  const [headingPart1, headingPart2] = splitAtLastSentence(
    data?.legacyHeading ?? "",
  );
  const letter = data?.chairmanLetter;
  const imgSrc = letter?.image ? urlFor(letter.image).width(800).url() : null;
  const quote = letter?.signature;
  const attribution = letter?.organization;

  const sectionRef = useRef<HTMLElement>(null);
  const imageWrapRef = useRef<HTMLDivElement>(null);
  const curtainRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      if (imageWrapRef.current && curtainRef.current) {
        const img = imageWrapRef.current.querySelector("img");
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: imageWrapRef.current,
            start: "top 78%",
          },
        });

        if (img) gsap.set(img, { opacity: 0, scale: 1.08 });

        // Curtain slides in from left
        tl.from(curtainRef.current, {
          scaleX: 0,
          transformOrigin: "left",
          duration: 0.6,
          ease: "power3.inOut",
        });

        // Image appears and curtain slides out to right
        if (img) {
          tl.set(img, { opacity: 1 });
        }
        tl.to(curtainRef.current, {
          scaleX: 0,
          transformOrigin: "right",
          duration: 0.6,
          ease: "power3.inOut",
        });

        // Image zoom settles
        if (img) {
          tl.to(img, { scale: 1, duration: 1.2, ease: "power2.out" }, "-=0.6");
        }

        // Parallax within the image container
        if (img) {
          gsap.fromTo(
            img,
            { yPercent: -4 },
            {
              yPercent: 4,
              ease: "none",
              scrollTrigger: {
                trigger: imageWrapRef.current,
                start: "top bottom",
                end: "bottom top",
                scrub: true,
              },
            },
          );
        }
      }

      if (textRef.current) {
        const children = Array.from(textRef.current.children);
        children.forEach((child, i) => {
          gsap.from(child, {
            opacity: 0,
            y: 30,
            duration: 0.7,
            delay: i * 0.12,
            ease: "power3.out",
            scrollTrigger: { trigger: child, start: "top 88%" },
          });
        });
      }
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      id="legacy"
      className="w-full bg-[#C8CDD2] text-[#1A1A1A] py-24 px-8"
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-16 md:gap-24 items-start">
        <div className="w-full md:w-5/12">
          <div
            ref={imageWrapRef}
            className="relative aspect-[4/5] bg-[#E5E7EB] overflow-hidden"
          >
            {imgSrc && (
              <ImageWithFallback
                src={imgSrc}
                alt="Legacy"
                className="w-full h-full object-cover saturate-[0.6] contrast-110 sepia-[0.2] will-change-transform"
              />
            )}
            <div
              ref={curtainRef}
              className="absolute inset-0 bg-[#1A1A1A] z-10"
            />
          </div>
        </div>

        <div ref={textRef} className="w-full md:w-7/12 flex flex-col gap-12">
          <div className="flex flex-col gap-6">
            <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#5A6673]">
              {data?.legacyEyebrow ?? "05 — LEGACY"}
            </span>
            <h2 className="font-['Radley'] font-light text-fluid-xl leading-[1.1] text-[#1A1A1A]">
              {headingPart1}{" "}
              <em className="text-[#0A3A77] not-italic italic">
                {headingPart2}
              </em>
            </h2>
          </div>

          {letter?.body && (
            <div className="flex flex-col gap-6 max-w-[56ch]">
              <PortableText value={letter.body} components={bodyComponents} />
            </div>
          )}

          {(quote || attribution) && (
            <div className="mt-4 border-l-2 border-[#C8CDD2] pl-6 py-2">
              {quote && (
                <div className="font-['Radley'] italic text-fluid-lg text-[#1A1A1A] leading-none mb-2">
                  {quote}
                </div>
              )}
              {attribution && (
                <div className="font-['JetBrains_Mono'] text-[10px] uppercase tracking-[0.22em] text-[#5A6673]">
                  {attribution}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
