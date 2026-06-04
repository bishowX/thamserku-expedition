import { useRef, useCallback, useEffect, Fragment } from "react";
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
  fx: number; // final x position (% of container, 0–100)
  fy: number; // final y position (% of container, 0–100)
  fr: number; // final rotation (deg)
  fs: number; // final scale
  z: number; // stacking order
  depth: number; // 0–1, 1 = nearest (brighter, more parallax)
  hero?: boolean; // the central anchor logo
  hasDarkBg?: boolean;
}

// Organic cloud — scattered around the centre, denser at the edges so the
// headline reads cleanly through the middle. `depth` drives opacity, scale
// nudge and parallax strength so the cloud has a sense of front-to-back.
const P: Partner[] = [
  { id: "yeti-world",     name: "Yeti World",        img: yetiWorldImg,     fx: 50, fy: 13, fr: 0,    fs: 1.0,  z: 12, depth: 1.0, hero: true },
  { id: "yeti-airlines",  name: "Yeti Airlines",     img: yetiAirlinesImg,  fx: 16, fy: 21, fr: -2,   fs: 0.92, z: 9,  depth: 0.95 },
  { id: "tara-air",       name: "Tara Air",          img: taraAirImg,       fx: 31, fy: 12, fr: 1.5,  fs: 0.84, z: 6,  depth: 0.78, hasDarkBg: true },
  { id: "himalaya",       name: "Himalaya Airlines", img: himalayaImg,      fx: 70, fy: 12, fr: -1,   fs: 0.86, z: 7,  depth: 0.84 },
  { id: "ker-downey",     name: "Ker & Downey",      img: kerDowneyImg,     fx: 85, fy: 22, fr: 2,    fs: 0.9,  z: 8,  depth: 0.9 },
  { id: "dynasty",        name: "Air Dynasty",       img: dynastyImg,       fx: 9,  fy: 45, fr: -2.5, fs: 0.95, z: 10, depth: 1.0 },
  { id: "gokarna",        name: "Gokarna Forest",    img: gokarnaImg,       fx: 91, fy: 41, fr: 1,    fs: 0.92, z: 9,  depth: 0.95 },
  { id: "yeti-holidays",  name: "Yeti Holidays",     img: yetiHolidaysImg,  fx: 12, fy: 71, fr: 2,    fs: 0.85, z: 5,  depth: 0.78, hasDarkBg: true },
  { id: "yeti-adventure", name: "Yeti Adventure",    img: yetiAdventureImg, fx: 88, fy: 65, fr: -1.5, fs: 0.9,  z: 7,  depth: 0.84, hasDarkBg: true },
  { id: "kora",           name: "Kora Tours",        img: koraImg,          fx: 27, fy: 85, fr: -1.5, fs: 0.83, z: 4,  depth: 0.74, hasDarkBg: true },
  { id: "yeti-travel",    name: "Yeti Expeditions",  img: yetiTravelImg,    fx: 50, fy: 88, fr: 2.5,  fs: 0.82, z: 3,  depth: 0.72 },
  { id: "lumbini",        name: "Lumbini Hokke",     img: lumbiniImg,       fx: 74, fy: 84, fr: -2,   fs: 0.85, z: 6,  depth: 0.8, hasDarkBg: true },
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

      const finalX = (p: Partner) => ((p.fx - 50) / 100) * cw;
      const finalY = (p: Partner) => ((p.fy - 50) / 100) * ch;

      // ── Continuous "cloud" drift — each logo bobs on its own slow loop so
      // the constellation breathes. Applied to the inner [data-float] layer so
      // it composes cleanly with the scroll (outer) and parallax (mid) layers.
      const startFloat = (scaleDamp: number) => {
        cards.forEach((card, i) => {
          const floatEl = card.querySelector<HTMLElement>("[data-float]");
          if (!floatEl) return;
          const p = P[i];
          const amp = (5 + p.depth * 7) * scaleDamp;
          const dur = 4.5 + (i % 4) * 0.8;
          gsap.to(floatEl, {
            y: amp,
            duration: dur,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            delay: (i % 5) * 0.4,
          });
          gsap.to(floatEl, {
            x: (i % 2 ? 1 : -1) * (3 + p.depth * 3) * scaleDamp,
            duration: dur * 1.3,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            delay: (i % 3) * 0.5,
          });
        });
      };

      if (isMobile) {
        // ── Portrait mini-reveal: a curated 6-logo subset arranged as a top
        // band + bottom band so the headline reads cleanly through the middle.
        // Same beats as desktop (hero lifts, cloud emerges, copy reveals) but
        // lighter, with a shorter pin and no pointer parallax.
        const MS = 0.62; // mobile scale damping
        const mPos: Record<string, { fx: number; fy: number; fr: number }> = {
          "yeti-world":     { fx: 50, fy: 12, fr: 0 },
          "yeti-airlines":  { fx: 17, fy: 25, fr: -2 },
          "ker-downey":     { fx: 83, fy: 26, fr: 2 },
          "dynasty":        { fx: 18, fy: 79, fr: -2.5 },
          "yeti-adventure": { fx: 82, fy: 80, fr: -1.5 },
          "lumbini":        { fx: 50, fy: 89, fr: -2 },
        };
        const mX = (m: { fx: number }) => ((m.fx - 50) / 100) * cw;
        const mY = (m: { fy: number }) => ((m.fy - 50) / 100) * ch;
        const heroIdx = P.findIndex((p) => p.hero);

        cards.forEach((card, i) => {
          const p = P[i];
          const m = mPos[p.id];
          if (!m) {
            // not part of the mobile subset — keep it out of the way
            gsap.set(card, { opacity: 0, scale: 0, pointerEvents: "none" });
            return;
          }
          const isHero = i === heroIdx;
          gsap.set(card, {
            xPercent: -50,
            yPercent: -50,
            x: 0,
            y: 0,
            rotation: 0,
            scale: isHero ? 1.8 : 0.45,
            zIndex: p.z,
            opacity: isHero ? 1 : 0,
          });
          const chip = card.querySelector("[data-chip]");
          if (chip) gsap.set(chip, { opacity: 0, y: 6 });
        });

        const words = h1.querySelectorAll("[data-word]");
        gsap.set(words, { yPercent: 130, opacity: 0 });
        gsap.set(sub, { opacity: 0, y: 16, filter: "blur(6px)" });
        if (glow) gsap.set(glow, { opacity: 0 });

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

        startFloat(0.55);

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "+=120%",
            pin: true,
            scrub: 1,
            anticipatePin: 1,
          },
        });

        if (scrollCue) {
          tl.to(scrollCue, { opacity: 0, y: 10, duration: 0.08, ease: "power2.in" }, 0);
        }

        // hero anticipation + shrink/lift to its slot
        if (cards[heroIdx]) {
          const hm = mPos["yeti-world"];
          tl.to(cards[heroIdx], { scale: 1.9, duration: 0.04, ease: "power1.in" }, 0);
          tl.to(
            cards[heroIdx],
            {
              x: mX(hm),
              y: mY(hm),
              rotation: hm.fr,
              scale: P[heroIdx].fs * MS,
              opacity: P[heroIdx].depth,
              duration: 0.5,
              ease: "power3.inOut",
            },
            0.04,
          );
        }

        // the rest of the subset emerges from the centre
        cards.forEach((card, i) => {
          const p = P[i];
          const m = mPos[p.id];
          if (!m || i === heroIdx) return;
          tl.to(
            card,
            {
              x: mX(m),
              y: mY(m),
              rotation: m.fr,
              scale: p.fs * MS,
              opacity: p.depth,
              duration: 0.46,
              ease: "power3.out",
            },
            0.12,
          );
        });

        // headline → glow → chips → subtitle
        tl.to(
          words,
          { yPercent: 0, opacity: 1, stagger: 0.012, duration: 0.18, ease: "power3.out" },
          0.42,
        );
        if (glow) {
          tl.to(glow, { opacity: 1, duration: 0.25, ease: "power2.out" }, 0.42);
        }
        const mChipEls = cards
          .map((c) => c.querySelector("[data-chip]"))
          .filter((el): el is Element => el !== null);
        tl.to(
          mChipEls,
          { opacity: 1, y: 0, stagger: 0.005, duration: 0.12, ease: "power2.out" },
          0.56,
        );
        tl.to(
          sub,
          { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.2, ease: "power2.out" },
          0.62,
        );

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

      // ── Initial state: hero logo centred & large, the rest collapsed in ──
      const heroIdx = P.findIndex((p) => p.hero);

      cards.forEach((card, i) => {
        const p = P[i];
        const isHero = i === heroIdx;
        gsap.set(card, {
          xPercent: -50,
          yPercent: -50,
          x: 0,
          y: 0,
          rotation: 0,
          scale: isHero ? 2.1 : 0.5,
          zIndex: p.z,
          opacity: isHero ? 1 : 0,
        });
        const chip = card.querySelector("[data-chip]");
        if (chip) gsap.set(chip, { opacity: 0, y: 6 });
      });

      const words = h1.querySelectorAll("[data-word]");
      gsap.set(words, { yPercent: 130, opacity: 0 });
      gsap.set(sub, { opacity: 0, y: 20, filter: "blur(8px)" });
      if (glow) gsap.set(glow, { opacity: 0 });

      // Continuous drift runs independently of scroll — start it now.
      startFloat(1);

      // ── Master timeline ──
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=160%",
          pin: true,
          scrub: 1,
          anticipatePin: 1,
        },
      });

      if (scrollCue) {
        tl.to(scrollCue, { opacity: 0, y: 10, duration: 0.08, ease: "power2.in" }, 0);
      }

      // Phase 0: hero anticipation pulse
      if (cards[heroIdx]) {
        tl.to(cards[heroIdx], { scale: 2.25, duration: 0.04, ease: "power1.in" }, 0);
      }

      // Phase 1a: hero shrinks & lifts to its cloud position
      if (cards[heroIdx]) {
        const hp = P[heroIdx];
        tl.to(
          cards[heroIdx],
          {
            x: finalX(hp),
            y: finalY(hp),
            rotation: hp.fr,
            scale: hp.fs,
            opacity: hp.depth,
            duration: 0.5,
            ease: "power3.inOut",
          },
          0.04,
        );
      }

      // Phase 1b: the rest of the cloud expands outward from the centre,
      // depth-staggered so nearer logos settle last and on top.
      cards.forEach((card, i) => {
        if (i === heroIdx) return;
        const p = P[i];
        const stagger = (1 - p.depth) * 0.12;
        tl.to(
          card,
          {
            x: finalX(p),
            y: finalY(p),
            rotation: p.fr,
            scale: p.fs,
            opacity: p.depth,
            duration: 0.46,
            ease: "power3.out",
          },
          0.1 + stagger,
        );
      });

      // Phase 2: headline word-by-word reveal
      tl.to(
        words,
        { yPercent: 0, opacity: 1, stagger: 0.012, duration: 0.18, ease: "power3.out" },
        0.46,
      );

      // Center glow
      if (glow) {
        tl.to(glow, { opacity: 1, duration: 0.25, ease: "power2.out" }, 0.44);
      }

      // Phase 3: category chips fade in
      const chipEls = cards
        .map((c) => c.querySelector("[data-chip]"))
        .filter((el): el is Element => el !== null);
      tl.to(
        chipEls,
        { opacity: 1, y: 0, stagger: 0.005, duration: 0.12, ease: "power2.out" },
        0.58,
      );

      // Phase 4: subtitle blur-to-clear
      tl.to(
        sub,
        { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.2, ease: "power2.out" },
        0.64,
      );
    },
    { scope: sectionRef },
  );

  // ── Pointer parallax — nearer logos (higher depth) track the cursor more,
  // giving the cloud real front-to-back depth. Runs on the [data-parallax]
  // mid-layer so it never fights the scroll or float transforms.
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.matchMedia("(max-width: 767px), (pointer: coarse)").matches) return;

    const parEls = Array.from(
      section.querySelectorAll<HTMLElement>("[data-parallax]"),
    );
    if (parEls.length === 0) return;

    const setters = parEls.map((el, i) => ({
      x: gsap.quickTo(el, "x", { duration: 0.9, ease: "power3" }),
      y: gsap.quickTo(el, "y", { duration: 0.9, ease: "power3" }),
      depth: P[i]?.depth ?? 0.8,
    }));

    const MAX = 28;
    const onMove = (e: PointerEvent) => {
      const r = section.getBoundingClientRect();
      const nx = (e.clientX - r.left) / r.width - 0.5;
      const ny = (e.clientY - r.top) / r.height - 0.5;
      setters.forEach((s) => {
        s.x(-nx * MAX * s.depth);
        s.y(-ny * MAX * s.depth);
      });
    };

    section.addEventListener("pointermove", onMove);
    return () => section.removeEventListener("pointermove", onMove);
  }, []);

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

      {/* Logo cloud */}
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
            {/* mid-layer: pointer parallax */}
            <div data-parallax className="will-change-transform">
              {/* inner layer: continuous float */}
              <div data-float className="will-change-transform">
                <div
                  className={`w-full rounded-xl overflow-hidden ${
                    partner.hasDarkBg
                      ? "border border-white/[0.06] shadow-[0_4px_24px_rgba(0,0,0,0.35),0_1px_2px_rgba(0,0,0,0.15)]"
                      : "bg-white/[0.97] border border-white/[0.08] shadow-[0_4px_24px_rgba(0,0,0,0.1),0_1px_2px_rgba(0,0,0,0.05)]"
                  }`}
                  style={
                    partner.depth < 0.8
                      ? { filter: "blur(0.4px)" }
                      : undefined
                  }
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
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
