import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { stegaClean } from "@sanity/client/stega";
import type { EncodeDataAttributeCallback } from "@sanity/react-loader";
import { heroSrcSet, HERO_SIZES } from "../../lib/heroImage";
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

// Local image for the cinematic intro treatment — the CMS heroImage is
// intentionally bypassed on this design.
const HERO_IMAGE = "/images/home-hero-2.jpg";

export function Hero({
  data,
  encodeDataAttribute,
}: {
  data?: HeroData;
  encodeDataAttribute?: EncodeDataAttributeCallback;
}) {
  const headline = stegaClean(data?.heroHeadline ?? DEFAULT_HEADLINE);
  const subheading = data?.heroSubheading ?? DEFAULT_SUBHEADING;

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

      // Reveal containers (FOUC prevention — they start with opacity-0 via CSS).
      // The subheading's fade is choreographed by CinematicIntro (its effect
      // runs first); only take over the sub when no intro exists.
      if (headlineRef.current) gsap.set(headlineRef.current, { opacity: 1 });
      if (subRef.current && !document.querySelector(".cinematic-intro")) {
        gsap.set(subRef.current, { opacity: 1 });
      }

      // No ken-burns drift here: the photo is 2560px and already stretched on
      // retina viewports — any extra upscale reads as blur at rest.

      // Scroll parallax — background drifts down, content fades and drifts up.
      // Targets the outer wrapper, NOT the img: the img is owned by ken-burns
      // and the middle wrapper by the cinematic intro zoom.
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
            invalidateOnRefresh: true,
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
            invalidateOnRefresh: true,
          },
        });
      }
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-screen flex flex-col justify-end text-white p-5 pb-16 md:p-12 xl:px-24 xl:pb-24 xl:pt-12 overflow-hidden"
    >
      <div className="absolute inset-0 z-0">
        {/* Transform ownership, outer → inner: parallax ST / cinematic intro zoom.
            One writer per node — two tweens writing scale on one element flicker. */}
        <div ref={bgWrapRef} className="absolute inset-0 will-change-transform">
          <div
            data-cinematic-zoom
            className="absolute inset-0 will-change-transform"
          >
            <picture className="contents">
              <source type="image/avif" srcSet={heroSrcSet(HERO_IMAGE, "avif")} sizes={HERO_SIZES} />
              <source type="image/webp" srcSet={heroSrcSet(HERO_IMAGE, "webp")} sizes={HERO_SIZES} />
              <img
                ref={bgRef}
                src={HERO_IMAGE}
                alt="Hero background"
                className="w-full h-full object-cover object-[center_35%]"
              />
            </picture>
          </div>
        </div>
        <div
          ref={overlayRef}
          className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#1A1A1A]/55"
        />
      </div>

      <div
        ref={contentRef}
        className="relative z-10 w-full flex flex-col items-start gap-8 will-change-transform"
      >
        {/* Inner wrapper is owned by the cinematic intro (yPercent drift);
            contentRef is owned by the scrubbed parallax — one writer each. */}
        <div data-cinematic-content className="will-change-transform">
          <h1
            ref={headlineRef}
            className="font-['Fraunces'] font-light text-display-xl leading-[0.85] tracking-tight text-balance mb-6 opacity-0 max-w-[26ch] [text-shadow:0_1px_4px_rgba(0,0,0,0.5)]"
            data-sanity={encodeDataAttribute?.(["homePage", "heroHeadline"])}
          >
            <TextReveal text={headline} />
          </h1>
          <p
            ref={subRef}
            data-cinematic-sub
            className="font-['DM_Sans'] font-light text-[#C8CDD2] text-body-lg max-w-[60ch] opacity-0 whitespace-pre-line [text-shadow:0_1px_3px_rgba(0,0,0,0.4)]"
          >
            {subheading}
          </p>
        </div>
      </div>
    </section>
  );
}
