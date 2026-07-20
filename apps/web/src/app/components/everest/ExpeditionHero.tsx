import { useRef, type CSSProperties } from "react";
import { ArrowRight, ArrowDown } from "lucide-react";
import { Link } from "react-router";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { stegaClean } from "@sanity/client/stega";
import { Nav } from "../Nav";
import { urlFor } from "../../../lib/sanity";
import type { SanityImageSource } from "@sanity/image-url";
import { TextReveal } from "../TextReveal";

gsap.registerPlugin(ScrollTrigger);

type ImageCrop = { top?: number; bottom?: number; left?: number; right?: number };

type Props = {
  name: string;
  heroImage?: { asset: { _ref: string }; crop?: ImageCrop | null } | null;
  heroTagline?: string;
  heroSubtext?: string;
  slug: string;
};

// Aspect ratio of the image Sanity will actually serve, so the mobile band can
// match it exactly (object-cover then shows the WHOLE peak — no side crop, no
// letterbox). Source pixel dims live in the asset ref (…-2544x1456-jpg); the
// editor crop is applied on delivery, so fold its rect into the ratio.
function deliveredAspect(img?: Props["heroImage"]): number | null {
  const m = img?.asset?._ref?.match(/-(\d+)x(\d+)-\w+$/);
  if (!m) return null;
  const w = Number(m[1]);
  const h = Number(m[2]);
  if (!w || !h) return null;
  const c = img?.crop;
  const cw = c ? Math.max(0.01, 1 - (c.left ?? 0) - (c.right ?? 0)) : 1;
  const ch = c ? Math.max(0.01, 1 - (c.top ?? 0) - (c.bottom ?? 0)) : 1;
  const ar = (w * cw) / (h * ch);
  return Number.isFinite(ar) && ar > 0 ? ar : null;
}

export function ExpeditionHero({ name, heroImage, heroTagline, heroSubtext, slug }: Props) {
  const imageSrc = heroImage ? urlFor(heroImage as SanityImageSource).width(1920).url() : null;
  const headline = stegaClean(heroTagline || `${name} Expedition`);
  // Mobile band height = the peak photo's own aspect (fallback 1.6 landscape).
  const heroAspect = deliveredAspect(heroImage) ?? 1.6;

  const sectionRef = useRef<HTMLElement>(null);
  const bgWrapRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLImageElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        if (headlineRef.current) gsap.set(headlineRef.current, { opacity: 1 });
        if (subRef.current) gsap.set(subRef.current, { opacity: 1 });
        if (ctaRef.current) gsap.set(ctaRef.current, { opacity: 1 });
        return;
      }

      // Reveal containers (FOUC prevention — they start with opacity-0 via CSS)
      if (headlineRef.current) gsap.set(headlineRef.current, { opacity: 1 });
      if (subRef.current) gsap.set(subRef.current, { opacity: 1 });
      if (ctaRef.current) gsap.set(ctaRef.current, { opacity: 1 });

      // Mobile stacks the hero (image band + text below), so the full-screen
      // ambient ken-burns and scroll parallax are desktop-only — on mobile
      // they'd re-crop the band and hide the peak edges we show whole.
      const desktop = window.matchMedia("(min-width: 768px)").matches;

      const tl = gsap.timeline();

      if (bgRef.current) {
        tl.from(
          bgRef.current,
          { scale: 1.15, duration: 2.2, ease: "power2.out" },
          0,
        );
      }

      if (overlayRef.current) {
        tl.from(
          overlayRef.current,
          { opacity: 0, duration: 1.2, ease: "power2.out" },
          0,
        );
      }

      // Word-by-word masked reveal
      if (headlineRef.current) {
        const words = headlineRef.current.querySelectorAll("[data-word]");
        gsap.set(words, { yPercent: 110 });
        tl.to(
          words,
          { yPercent: 0, duration: 0.8, stagger: 0.04, ease: "power4.out" },
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

      // CTAs fade up
      if (ctaRef.current) {
        gsap.set(ctaRef.current, { opacity: 0, y: 20 });
        tl.to(
          ctaRef.current,
          { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" },
          1.2,
        );
      }

      // Ambient ken-burns drift after entrance
      if (bgRef.current && desktop) {
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
      if (bgWrapRef.current && sectionRef.current && desktop) {
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

      if (contentRef.current && sectionRef.current && desktop) {
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

  // Shared overlaid text (headline + subtext + CTAs); wrapped by the
  // positioned content container below.
  const heroText = (
    <>
      <h1
        ref={headlineRef}
        className="font-['Fraunces'] font-light text-display-xl tracking-tight text-balance mb-6 max-w-[22ch] opacity-0 [text-shadow:0_1px_4px_rgba(0,0,0,0.5)]"
      >
        <TextReveal text={headline} />
      </h1>

      <div className="flex flex-col gap-2 mb-12">
        {heroSubtext && (
          <p
            ref={subRef}
            className="font-['DM_Sans'] font-light text-[#C8CDD2] text-body-lg max-w-[60ch] opacity-0 [text-shadow:0_1px_3px_rgba(0,0,0,0.4)]"
          >
            {heroSubtext}
          </p>
        )}
      </div>

      <div ref={ctaRef} className="flex flex-col sm:flex-row gap-6 opacity-0">
        <Link
          to={`/design-your-expedition?expedition=${slug}`}
          className="border border-white bg-white text-[#0A3A77] px-8 py-4 font-['DM_Mono'] uppercase tracking-[0.22em] text-[11px] hover:bg-transparent hover:text-white transition-colors flex items-center justify-center gap-3"
        >
          Design Your Expedition <ArrowRight className="w-4 h-4" strokeWidth={1} />
        </Link>
        <a
          href="#dossier-facts"
          className="border border-white/30 text-white px-8 py-4 font-['DM_Mono'] uppercase tracking-[0.22em] text-[11px] hover:border-white transition-colors flex items-center justify-center gap-3"
        >
          Expedition Details <ArrowDown className="w-4 h-4" strokeWidth={1} />
        </a>
      </div>
    </>
  );

  // Whole-peak landscape band on mobile, text stacked below; full-screen
  // background with overlaid text on desktop.
  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-[#1A1A1A] flex flex-col text-white overflow-hidden md:h-screen md:justify-end md:p-12 xl:px-24 xl:pb-24 xl:pt-12"
    >
      {/* Peak photo: a full-bleed landscape band on mobile (whole peak visible,
          text stacked below); the full-screen background on desktop (text
          overlaid). The band's aspect matches the delivered image so nothing is
          cropped. */}
      <div
        className="relative w-full shrink-0 aspect-[var(--hero-ar)] overflow-hidden z-0 md:absolute md:inset-0 md:aspect-auto"
        style={{ "--hero-ar": String(heroAspect) } as CSSProperties}
      >
        <div ref={bgWrapRef} className="absolute inset-0 will-change-transform">
          {imageSrc ? (
            <img
              ref={bgRef}
              src={imageSrc}
              alt={`${name} hero`}
              className="w-full h-full object-cover object-center will-change-transform"
            />
          ) : (
            <div className="w-full h-full bg-[#2E353C]" />
          )}
        </div>
        {/* Mobile: soft fade into the page bg at the band's foot. Desktop: full
            darkening so the overlaid headline stays legible. */}
        <div
          ref={overlayRef}
          className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#1A1A1A] md:from-[#1A1A1A]/70 md:via-transparent md:to-[#1A1A1A]/90"
        />
      </div>

      <Nav />

      {/* Decorative column grid — desktop overlay only. */}
      <div className="absolute inset-0 z-10 pointer-events-none mix-blend-overlay opacity-20 hidden md:block">
        <div className="w-full h-full border-l border-r border-[#C8CDD2]/30 max-w-[1440px] mx-auto relative grid grid-cols-4 md:grid-cols-12 gap-5 px-8">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="h-full border-r border-[#C8CDD2]/20 hidden md:block" />
          ))}
        </div>
      </div>

      <div
        ref={contentRef}
        className="relative z-20 w-full flex flex-col items-start will-change-transform p-5 pt-8 pb-16 md:p-0 md:h-full md:justify-end"
      >
        {heroText}
      </div>
    </section>
  );
}
