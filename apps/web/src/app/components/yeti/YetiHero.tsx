import { useRef, useCallback, Fragment } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { YetiPageData } from "../../../lib/queries";

import yetiAirlinesImg from "../../../assets/logos/yeti-airlines.png";
import taraAirImg from "../../../assets/logos/tara-air.png";
import gokarnaImg from "../../../assets/logos/gokarna-forest.png";
import kerDowneyImg from "../../../assets/logos/ker-downey.png";
import dynastyImg from "../../../assets/logos/dynasty.png";
import himalayaImg from "../../../assets/logos/himalaya-airlines.png";
import lumbiniImg from "../../../assets/logos/lumbini-hokke.png";
import yetiAdventureImg from "../../../assets/logos/yeti-adventure.png";
import yetiHolidaysImg from "../../../assets/logos/yeti-holidays.png";
import koraImg from "../../../assets/logos/kora-tours.png";
import yetiTravelImg from "../../../assets/logos/yeti-travel.png";
import yetiWorldImg from "../../../assets/logos/yeti-world.png";

gsap.registerPlugin(ScrollTrigger);

type PageData = YetiPageData["yetiPage"];

interface Partner {
  id: string;
  name: string;
  img: string;
  fx: number;
  fy: number;
  fr: number;
  fs: number;
  z: number;
  hasDarkBg?: boolean;
}

const P: Partner[] = [
  { id: "yeti-airlines",  name: "Yeti Airlines",     img: yetiAirlinesImg,  fx: 14, fy: 14, fr: -2,   fs: 0.9,  z: 11 },
  { id: "tara-air",       name: "Tara Air",          img: taraAirImg,       fx: 34, fy: 11, fr: 1.5,  fs: 0.95, z: 10, hasDarkBg: true },
  { id: "gokarna",        name: "Gokarna Forest",    img: gokarnaImg,       fx: 58, fy: 13, fr: -1,   fs: 0.88, z: 8 },
  { id: "ker-downey",     name: "Ker & Downey",      img: kerDowneyImg,     fx: 82, fy: 15, fr: 2,    fs: 0.92, z: 7 },
  { id: "dynasty",        name: "Air Dynasty",       img: dynastyImg,       fx: 12, fy: 38, fr: -2.5, fs: 1.0,  z: 6 },
  { id: "himalaya",       name: "Himalaya Airlines", img: himalayaImg,      fx: 13, fy: 65, fr: 2,    fs: 0.88, z: 2 },
  { id: "yeti-world",     name: "Yeti World",        img: yetiWorldImg,     fx: 87, fy: 28, fr: 1,    fs: 1.08, z: 12 },
  { id: "yeti-adventure", name: "Yeti Adventure",    img: yetiAdventureImg, fx: 85, fy: 55, fr: -1.5, fs: 0.95, z: 9, hasDarkBg: true },
  { id: "yeti-travel",    name: "Yeti Expeditions",  img: yetiTravelImg,    fx: 12, fy: 82, fr: 2.5,  fs: 0.82, z: 1 },
  { id: "kora",           name: "Kora Tours",        img: koraImg,          fx: 35, fy: 80, fr: -1.5, fs: 0.88, z: 3, hasDarkBg: true },
  { id: "yeti-holidays",  name: "Yeti Holidays",     img: yetiHolidaysImg,  fx: 62, fy: 82, fr: 2,    fs: 0.9,  z: 4, hasDarkBg: true },
  { id: "lumbini",        name: "Lumbini Hokke",     img: lumbiniImg,       fx: 86, fy: 76, fr: -2,   fs: 0.85, z: 5, hasDarkBg: true },
];

const HEADING = "The operating ecosystem behind every expedition.";
const SUBTEXT =
  "Air support, mountain lodges, regional access, and field continuity — quietly maintained by the Yeti Group, so the climb in front of you receives our full attention.";

function SplitWords({ text }: { text: string }) {
  return (
    <>
      {text.split(" ").map((word, i, arr) => (
        <Fragment key={i}>
          <span className="inline-block overflow-hidden align-top pb-[0.08em]">
            <span className="inline-block will-change-transform" data-word>
              {word}
            </span>
          </span>
          {i < arr.length - 1 ? " " : null}
        </Fragment>
      ))}
    </>
  );
}

export const YetiHero = ({ page }: { page?: PageData }) => {
  const heading = page?.heroHeadline ?? HEADING;
  const subtext = page?.heroSubheading ?? SUBTEXT;

  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const scrollCueRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const setCardRef = useCallback(
    (i: number) => (el: HTMLDivElement | null) => {
      cardRefs.current[i] = el;
    },
    [],
  );

  useGSAP(
    () => {
      const section = sectionRef.current;
      const h1 = headingRef.current;
      const sub = subRef.current;
      const glow = glowRef.current;
      const scrollCue = scrollCueRef.current;
      if (!section || !h1 || !sub) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const cards = cardRefs.current.filter(Boolean) as HTMLDivElement[];
      if (cards.length === 0) return;

      const cw = section.offsetWidth;
      const ch = section.offsetHeight;
      const isMobile = cw < 768;

      if (isMobile) {
        const words = h1.querySelectorAll("[data-word]");
        gsap.set(words, { yPercent: 0, opacity: 1 });
        gsap.set(sub, { opacity: 1, y: 0 });
        cards.forEach((card, i) => {
          const p = P[i];
          gsap.set(card, {
            xPercent: -50,
            yPercent: -50,
            x: ((p.fx - 50) / 100) * cw,
            y: ((p.fy - 50) / 100) * ch,
            opacity: 0.6,
            scale: p.fs * 0.75,
          });
          const chip = card.querySelector("[data-chip]");
          if (chip) gsap.set(chip, { opacity: 1 });
        });
        if (scrollCue) gsap.set(scrollCue, { opacity: 0 });
        return;
      }

      // ── Scroll cue pulse ──
      if (scrollCue) {
        const line = scrollCue.querySelector("[data-scroll-line]");
        if (line) {
          gsap.fromTo(
            line,
            { yPercent: -100 },
            { yPercent: 200, duration: 2, repeat: -1, ease: "power1.inOut" },
          );
        }
      }

      // ── Initial state: ONE hero card centered, others hidden ──
      const heroIdx = P.findIndex((p) => p.z === 12);

      cards.forEach((card, i) => {
        const isHero = i === heroIdx;

        gsap.set(card, {
          xPercent: -50,
          yPercent: -50,
          x: 0,
          y: 0,
          rotation: 0,
          scale: isHero ? 2.2 : 0.6,
          zIndex: P[i].z,
          opacity: isHero ? 1 : 0,
        });

        const chip = card.querySelector("[data-chip]");
        if (chip) gsap.set(chip, { opacity: 0, y: 6 });
      });

      const words = h1.querySelectorAll("[data-word]");
      gsap.set(words, { yPercent: 130, opacity: 0 });
      gsap.set(sub, { opacity: 0, y: 20, filter: "blur(8px)" });
      if (glow) gsap.set(glow, { opacity: 0 });

      // ── Master timeline ──
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=150%",
          pin: true,
          scrub: 1,
          anticipatePin: 1,
        },
      });

      // Scroll cue fadeout
      if (scrollCue) {
        tl.to(
          scrollCue,
          { opacity: 0, y: 10, duration: 0.08, ease: "power2.in" },
          0,
        );
      }

      // Phase 0 (0→0.04): Hero anticipation — subtle scale pulse
      if (cards[heroIdx]) {
        tl.to(
          cards[heroIdx],
          { scale: 2.3, duration: 0.04, ease: "power1.in" },
          0,
        );
      }

      // Phase 1a (0.04→0.52): Hero shrinks + moves to final position
      if (cards[heroIdx]) {
        const hp = P[heroIdx];
        tl.to(
          cards[heroIdx],
          {
            x: ((hp.fx - 50) / 100) * cw,
            y: ((hp.fy - 50) / 100) * ch,
            rotation: hp.fr,
            scale: hp.fs,
            duration: 0.48,
            ease: "power2.inOut",
          },
          0.04,
        );
      }

      // Phase 1b (0.08→0.52): Other cards emerge from center
      cards.forEach((card, i) => {
        if (i === heroIdx) return;
        const p = P[i];
        const finalX = ((p.fx - 50) / 100) * cw;
        const finalY = ((p.fy - 50) / 100) * ch;
        const stagger = (((i * 137.508) % 100) / 100) * 0.05;

        tl.to(
          card,
          {
            x: finalX,
            y: finalY,
            rotation: p.fr,
            scale: p.fs,
            opacity: 1,
            duration: 0.40,
            ease: "power2.inOut",
          },
          0.08 + stagger,
        );
      });

      // Phase 2 (0.44→0.66): Heading word-by-word reveal
      tl.to(
        words,
        {
          yPercent: 0,
          opacity: 1,
          stagger: 0.012,
          duration: 0.18,
          ease: "power3.out",
        },
        0.44,
      );

      // Center glow
      if (glow) {
        tl.to(
          glow,
          { opacity: 1, duration: 0.25, ease: "power2.out" },
          0.42,
        );
      }

      // Phase 3 (0.56→0.74): Chips fade in on all cards
      const chipEls = cards
        .map((c) => c.querySelector("[data-chip]"))
        .filter((el): el is Element => el !== null);
      tl.to(
        chipEls,
        {
          opacity: 1,
          y: 0,
          stagger: 0.005,
          duration: 0.12,
          ease: "power2.out",
        },
        0.56,
      );

      // Phase 4 (0.64→0.84): Subtitle blur-to-clear
      tl.to(
        sub,
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 0.20,
          ease: "power2.out",
        },
        0.64,
      );

      // Phase 5 (0.88→1.0): Micro-settle — barely perceptible drift
      cards.forEach((card, i) => {
        const seed = i * 137.508;
        const dx = Math.sin(seed) * 2;
        const dy = Math.cos(seed) * 1.5;
        tl.to(
          card,
          {
            x: `+=${dx}`,
            y: `+=${dy}`,
            duration: 0.12,
            ease: "sine.inOut",
          },
          0.88,
        );
      });
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen bg-[#1A1A1A] overflow-hidden"
    >
      {/* Grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.018]"
        style={{
          backgroundImage: `
            linear-gradient(to right, #C8CDD2 1px, transparent 1px),
            linear-gradient(to bottom, #C8CDD2 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px",
        }}
      />

      {/* Film grain */}
      <svg className="absolute w-0 h-0" aria-hidden="true">
        <filter id="yeti-grain">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.75"
            numOctaves="4"
            stitchTiles="stitch"
          />
        </filter>
      </svg>
      <div
        className="absolute inset-0 z-[1] pointer-events-none opacity-[0.03] mix-blend-overlay"
        style={{ filter: "url(#yeti-grain)" }}
      />

      {/* Vignette */}
      <div
        className="absolute inset-0 pointer-events-none z-[3]"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 48%, transparent 0%, rgba(26,26,26,0.55) 100%)",
        }}
      />

      {/* Center glow — appears with text */}
      <div
        ref={glowRef}
        className="absolute inset-0 pointer-events-none z-[4]"
        style={{
          background:
            "radial-gradient(ellipse 35% 30% at 50% 48%, rgba(255,255,255,0.025) 0%, transparent 70%)",
        }}
      />

      {/* Center text */}
      <div className="absolute inset-0 z-[6] flex flex-col items-center justify-center px-8 pointer-events-none select-none">
        <h1
          ref={headingRef}
          className="font-['Radley'] font-light text-[clamp(2rem,4.8vw,4.75rem)] tracking-[-0.015em] text-white leading-[1.06] text-center max-w-[16ch] mb-6"
        >
          <SplitWords text={heading} />
        </h1>
        <p
          ref={subRef}
          className="font-['Lexend'] font-light text-[clamp(0.825rem,0.95vw,1rem)] text-[#9CA3AF] leading-[1.75] max-w-[50ch] text-center opacity-0"
        >
          {subtext}
        </p>
      </div>

      {/* Scroll cue */}
      <div
        ref={scrollCueRef}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-[7] flex flex-col items-center gap-3"
      >
        <span className="font-['JetBrains_Mono'] uppercase tracking-[0.3em] text-[9px] text-white/20">
          Scroll
        </span>
        <div className="w-px h-8 bg-white/[0.08] relative overflow-hidden rounded-full">
          <div
            data-scroll-line
            className="absolute inset-x-0 h-1/3 bg-white/30 rounded-full"
          />
        </div>
      </div>

      {/* Logo cards */}
      <div
        className="absolute inset-0 z-10"
        style={{ perspective: "1200px", perspectiveOrigin: "50% 48%" }}
      >
        {P.map((partner, i) => (
          <div
            key={partner.id}
            ref={setCardRef(i)}
            className="absolute left-1/2 top-1/2 opacity-0 will-change-transform"
            style={{
              width: "clamp(110px, 10.5vw, 168px)",
              transformStyle: "preserve-3d",
            }}
          >
            <div
              className={`w-full rounded-xl overflow-hidden ${
                partner.hasDarkBg
                  ? "border border-white/[0.06] shadow-[0_4px_24px_rgba(0,0,0,0.35),0_1px_2px_rgba(0,0,0,0.15)]"
                  : "bg-white/[0.97] border border-white/[0.08] shadow-[0_4px_24px_rgba(0,0,0,0.1),0_1px_2px_rgba(0,0,0,0.05)]"
              }`}
            >
              <img
                src={partner.img}
                alt={partner.name}
                className="w-full h-auto block"
                loading="eager"
                draggable={false}
              />
            </div>
            <div data-chip className="mt-2.5 flex justify-center">
              <span className="inline-block bg-white/[0.06] backdrop-blur-md border border-white/[0.06] rounded-full px-2.5 py-1 font-['JetBrains_Mono'] uppercase tracking-[0.12em] text-[8px] text-white/50 whitespace-nowrap">
                {partner.name}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
