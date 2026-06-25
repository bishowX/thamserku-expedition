import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { stegaClean } from "@sanity/client/stega";
import type { EncodeDataAttributeCallback } from "@sanity/react-loader";
import { urlFor } from "../../lib/sanity";
import { TextReveal } from "./TextReveal";

gsap.registerPlugin(ScrollTrigger);

type HeroData = {
  heroHeadline?: string;
  heroSubheading?: string;
  heroImage?: { asset: { _ref: string } } | null;
};

const DEFAULT_HEADLINE = "The Himalayas, understood through generations.";
const DEFAULT_SUBHEADING =
  "Private expeditions shaped by Sherpa wisdom, Himalayan discipline and nearly four decades of legacy.";

export function Hero({
  data,
  encodeDataAttribute,
}: {
  data?: HeroData;
  encodeDataAttribute?: EncodeDataAttributeCallback;
}) {
  const headline = stegaClean(data?.heroHeadline ?? DEFAULT_HEADLINE);
  const subheading = data?.heroSubheading ?? DEFAULT_SUBHEADING;
  const bgImage = data?.heroImage
    ? urlFor(data.heroImage).width(1920).url()
    : undefined;

  const sectionRef = useRef<HTMLElement>(null);
  const bgWrapRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLImageElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        if (headlineRef.current) gsap.set(headlineRef.current, { opacity: 1 });
        if (subRef.current) gsap.set(subRef.current, { opacity: 1 });
        return;
      }

      // Reveal containers (FOUC prevention — they start with opacity-0 via CSS)
      if (headlineRef.current) gsap.set(headlineRef.current, { opacity: 1 });
      if (subRef.current) gsap.set(subRef.current, { opacity: 1 });

      const tl = gsap.timeline();

      // Background entrance
      if (bgRef.current) {
        tl.from(
          bgRef.current,
          {
            scale: 1.15,
            duration: 2.2,
            ease: "power2.out",
          },
          0,
        );
      }

      if (overlayRef.current) {
        tl.from(
          overlayRef.current,
          {
            opacity: 0,
            duration: 1.2,
            ease: "power2.out",
          },
          0,
        );
      }

      // Word-by-word masked reveal
      if (headlineRef.current) {
        const words = headlineRef.current.querySelectorAll("[data-word]");
        gsap.set(words, { yPercent: 110 });
        tl.to(
          words,
          {
            yPercent: 0,
            duration: 0.8,
            stagger: 0.04,
            ease: "power4.out",
          },
          0.5,
        );
      }

      // Subheading with blur clear
      if (subRef.current) {
        gsap.set(subRef.current, { opacity: 0, y: 20, filter: "blur(6px)" });
        tl.to(
          subRef.current,
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 0.7,
            ease: "power3.out",
          },
          1.0,
        );
      }

      // Ambient ken-burns drift after entrance
      if (bgRef.current) {
        tl.call(() => {
          if (!bgRef.current) return;
          gsap.to(bgRef.current, {
            scale: 1.04,
            xPercent: 1.5,
            duration: 25,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
          });
        });
      }

      // Scroll parallax — background drifts down, content fades and drifts up.
      // Targets the wrapper, NOT the img: the img is owned by the entrance +
      // ken-burns tweens, and two tweens writing scale on one element flicker.
      if (bgWrapRef.current && sectionRef.current) {
        gsap.to(bgWrapRef.current, {
          yPercent: 35,
          scale: 1.1,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      }

      if (contentRef.current && sectionRef.current) {
        gsap.to(contentRef.current, {
          yPercent: -15,
          opacity: 0,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      }
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-screen flex flex-col justify-end text-white p-5 pb-16 md:p-12 xl:p-40 overflow-hidden"
    >
      <div className="absolute inset-0 z-0">
        {bgImage && (
          <div ref={bgWrapRef} className="absolute inset-0 will-change-transform">
            <img
              ref={bgRef}
              src={bgImage}
              alt="Hero background"
              className="w-full h-full object-cover will-change-transform"
            />
          </div>
        )}
        <div
          ref={overlayRef}
          className="absolute inset-0 bg-gradient-to-b from-[#1A1A1A]/60 via-transparent to-[#1A1A1A]/90 mix-blend-multiply"
        />
      </div>

      <div
        ref={contentRef}
        className="relative z-10 w-full flex flex-col items-start gap-8 will-change-transform"
      >
        <div>
          <h1
            ref={headlineRef}
            className="font-['Fraunces'] font-light text-display-xl tracking-tight text-balance mb-6 opacity-0 max-w-[26ch]"
            data-sanity={encodeDataAttribute?.(["homePage", "heroHeadline"])}
          >
            <TextReveal text={headline} />
          </h1>
          <p
            ref={subRef}
            className="font-['DM_Sans'] font-light text-[#C8CDD2] text-body max-w-[60ch] leading-relaxed opacity-0"
          >
            {subheading}
          </p>
        </div>

       
      </div>
    </section>
  );
}
