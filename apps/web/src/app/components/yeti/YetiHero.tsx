import { useRef, useEffect, Fragment } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { stegaClean } from "@sanity/client/stega";
import type { EncodeDataAttributeCallback } from "@sanity/react-loader";
import type { YetiPageData } from "../../../lib/queries";
import { urlFor } from "../../../lib/sanity";
import { PartnerCard } from "./PartnerCard";

gsap.registerPlugin(ScrollTrigger);

type PageData = YetiPageData["yetiPage"];

interface Partner {
  id: string;
  name: string;
  logo: string;
  label?: string;
  href?: string;
  fx: number;
  fy: number;
  fr: number;
  fs: number;
  z: number;
  depth: number;
  hero?: boolean;
}

// Deterministic position for the i-th card out of `total`.
//
// Logos sit on concentric elliptical rings around the centred headline, evenly
// spaced by angle. With more than RING_ONE_MAX logos we split into two rings so
// neither gets crowded; the inner ring stays clear of the copy and the outer
// ring hugs the viewport. Upright, no tilt, even angular spacing.
const RING_ONE_MAX = 14;

function computePosition(i: number, total: number) {
  const cx = 50, cy = 50;
  const useTwoRings = total > RING_ONE_MAX;

  // Split the cloud across an inner and outer ring (outer gets the extras).
  const outerCount = useTwoRings ? Math.ceil(total / 2) : total;
  const innerCount = total - outerCount;

  const onOuter = i < outerCount;
  const ringIndex = onOuter ? i : i - outerCount;
  const ringCount = onOuter ? outerCount : innerCount;

  // Ellipse radii (% of width / height). Outer hugs the viewport; inner sits
  // back far enough to leave clear space around the centred headline.
  const Rx = onOuter ? 43 : 34;
  const Ry = onOuter ? 40 : 34;

  // Even angular spacing, starting at the top. Offset the inner ring by half a
  // step so its logos interleave with the outer ring rather than line up.
  const offset = onOuter ? 0 : Math.PI / ringCount;
  const ang = -Math.PI / 2 + (ringIndex / ringCount) * Math.PI * 2 + offset;

  const fx = cx + Rx * Math.cos(ang);
  const fy = cy + Ry * Math.sin(ang);
  const fr = 0; // upright — no tilt

  // Outer ring reads as the nearer/larger layer; inner sits slightly back.
  const depth = onOuter ? 0.98 : 0.86;
  const fs    = parseFloat((0.84 + depth * 0.10).toFixed(2));
  const z     = onOuter ? 10 : 8;

  return { fx, fy, fr, fs, z, depth };
}

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

export const YetiHero = ({
  page,
  encodeDataAttribute,
}: {
  page?: PageData;
  encodeDataAttribute?: EncodeDataAttributeCallback;
}) => {
  const heading = stegaClean(page?.heroHeadline ?? HEADING);
  const subtext = page?.heroSubheading ?? SUBTEXT;

  const partners: Partner[] = (page?.heroPartners ?? []).map((sp, i, arr) => ({
    id: sp._key,
    name: sp.name ?? "",
    logo: sp.logo ? urlFor(sp.logo).width(320).url() : "",
    label: sp.label,
    href: sp.href,
    hero: sp._key === "yeti-world",
    ...computePosition(i, arr.length),
  }));

  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const scrollCueRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(
    () => {
      const section = sectionRef.current;
      const h1 = headingRef.current;
      const sub = subRef.current;
      const glow = glowRef.current;
      const scrollCue = scrollCueRef.current;
      if (!section || !h1 || !sub) return;

      const cards = cardRefs.current.filter(Boolean) as HTMLDivElement[];
      if (cards.length === 0) return;

      const reduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      const cw = section.offsetWidth;
      const ch = section.offsetHeight;
      const isMobile = cw < 768;

      // ── Mobile uses a curated subset (incl. the hero) arranged as top +
      // bottom bands so the headline reads cleanly through the middle. ──
      const mPos: Record<string, { fx: number; fy: number; fr: number }> = {
        "yeti-world": { fx: 50, fy: 12, fr: 0 },
        "yeti-airlines": { fx: 18, fy: 24, fr: 0 },
        "gokarna-forest": { fx: 82, fy: 24, fr: 0 },
        "yeti-holidays": { fx: 18, fy: 86, fr: 0 },
        "shinta-mani": { fx: 50, fy: 88, fr: 0 },
        "lumbini-hokke": { fx: 82, fy: 86, fr: 0 },
      };
      const MS = 0.62; // mobile scale damping

      const finalX = (fx: number) => ((fx - 50) / 100) * cw;
      const finalY = (fy: number) => ((fy - 50) / 100) * ch;

      // ── Continuous "cloud" drift — each card bobs on its own slow loop so the
      // constellation breathes. Runs on the inner [data-float] layer so it
      // composes cleanly with the scroll (outer) and parallax (mid) layers. ──
      const startFloat = (scaleDamp: number) => {
        cards.forEach((card, i) => {
          const floatEl = card.querySelector<HTMLElement>("[data-float]");
          if (!floatEl) return;
          const p = partners[i];
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

      const heroIdx = partners.findIndex((p) => p.hero);

      // Final resting transform for a card (null = not shown on this breakpoint).
      const placeFinal = (p: Partner) => {
        if (isMobile) {
          const m = mPos[p.id];
          return m ? { x: finalX(m.fx), y: finalY(m.fy), fr: m.fr } : null;
        }
        return { x: finalX(p.fx), y: finalY(p.fy), fr: p.fr };
      };

      // ── Reduced motion: skip the choreography, show the settled cloud + copy. ──
      if (reduced) {
        cards.forEach((card, i) => {
          const p = partners[i];
          const f = placeFinal(p);
          if (!f) {
            gsap.set(card, { opacity: 0, scale: 0, pointerEvents: "none" });
            return;
          }
          gsap.set(card, {
            xPercent: -50,
            yPercent: -50,
            x: f.x,
            y: f.y,
            rotation: f.fr,
            scale: p.fs * (isMobile ? MS : 1),
            opacity: p.depth,
            zIndex: p.z,
          });
          const chip = card.querySelector("[data-chip]");
          if (chip) gsap.set(chip, { opacity: 1, y: 0 });
        });
        gsap.set(h1.querySelectorAll("[data-word]"), {
          yPercent: 0,
          opacity: 1,
        });
        gsap.set(sub, { opacity: 1, y: 0, filter: "blur(0px)" });
        if (glow) gsap.set(glow, { opacity: 1 });
        if (scrollCue) gsap.set(scrollCue, { opacity: 0 });
        return;
      }

      // ── Initial state: the hero logo sits centred & large, the rest collapsed
      // into the centre behind it. The headline + subtitle stay hidden and only
      // reveal at the very end of the scroll. ──
      const words = h1.querySelectorAll("[data-word]");
      gsap.set(words, { yPercent: 130, opacity: 0 });
      gsap.set(sub, { opacity: 0, y: 20, filter: "blur(8px)" });
      if (glow) gsap.set(glow, { opacity: 0 });

      cards.forEach((card, i) => {
        const p = partners[i];
        const isHero = i === heroIdx;
        const cut = isMobile && !mPos[p.id];
        gsap.set(card, {
          xPercent: -50,
          yPercent: -50,
          x: 0,
          y: 0,
          rotation: 0,
          scale: cut
            ? 0
            : isHero
              ? isMobile
                ? 1.8
                : 2.1
              : isMobile
                ? 0.45
                : 0.5,
          zIndex: p.z,
          opacity: isHero ? 1 : 0,
          pointerEvents: cut ? "none" : undefined,
        });
        const chip = card.querySelector("[data-chip]");
        if (chip) gsap.set(chip, { opacity: 0, y: 6 });
      });

      startFloat(isMobile ? 0.55 : 1);

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

      // ── Master timeline: hero anticipates, then shrinks & lifts to its cloud
      // slot while the rest expand outward (depth-staggered), and the copy
      // reveals at the very end. ──
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: isMobile ? "+=120%" : "+=160%",
          pin: true,
          scrub: 1,
        },
      });

      if (scrollCue) {
        tl.to(
          scrollCue,
          { opacity: 0, y: 10, duration: 0.08, ease: "power2.in" },
          0,
        );
      }

      // Phase 0/1a: hero anticipation pulse, then shrink/lift to its slot.
      if (cards[heroIdx]) {
        const hp = partners[heroIdx];
        const hf = placeFinal(hp);
        tl.to(
          cards[heroIdx],
          { scale: isMobile ? 1.9 : 2.25, duration: 0.04, ease: "power1.in" },
          0,
        );
        if (hf) {
          tl.to(
            cards[heroIdx],
            {
              x: hf.x,
              y: hf.y,
              rotation: hf.fr,
              scale: hp.fs * (isMobile ? MS : 1),
              opacity: hp.depth,
              duration: 0.5,
              ease: "power3.inOut",
            },
            0.04,
          );
        }
      }

      // Phase 1b: the rest of the cloud expands outward from the centre,
      // depth-staggered so nearer cards settle last and on top.
      cards.forEach((card, i) => {
        if (i === heroIdx) return;
        const p = partners[i];
        const f = placeFinal(p);
        if (!f) return;
        const stagger = (1 - p.depth) * (isMobile ? 0.1 : 0.12);
        tl.to(
          card,
          {
            x: f.x,
            y: f.y,
            rotation: f.fr,
            scale: p.fs * (isMobile ? MS : 1),
            opacity: p.depth,
            duration: 0.46,
            ease: "power3.out",
          },
          (isMobile ? 0.12 : 0.1) + stagger,
        );
      });

      // Phase 2: headline word-by-word reveal (near the end).
      tl.to(
        words,
        {
          yPercent: 0,
          opacity: 1,
          stagger: 0.012,
          duration: 0.18,
          ease: "power3.out",
        },
        isMobile ? 0.42 : 0.46,
      );

      // Center glow.
      if (glow) {
        tl.to(
          glow,
          { opacity: 1, duration: 0.25, ease: "power2.out" },
          isMobile ? 0.42 : 0.44,
        );
      }

      // Phase 3: category chips fade in.
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
        isMobile ? 0.56 : 0.58,
      );

      // Phase 4: subtitle blur-to-clear — the final beat.
      tl.to(
        sub,
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 0.2,
          ease: "power2.out",
        },
        isMobile ? 0.62 : 0.64,
      );
    },
    { scope: sectionRef },
  );

  // ── Pointer parallax — nearer cards (higher depth) track the cursor more,
  // giving the cloud real front-to-back depth. Runs on the [data-parallax]
  // mid-layer so it never fights the scroll or float transforms. ──
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.matchMedia("(max-width: 767px), (pointer: coarse)").matches)
      return;

    const parEls = Array.from(
      section.querySelectorAll<HTMLElement>("[data-parallax]"),
    );
    if (parEls.length === 0) return;

    const setters = parEls.map((el, i) => ({
      x: gsap.quickTo(el, "x", { duration: 0.9, ease: "power3" }),
      y: gsap.quickTo(el, "y", { duration: 0.9, ease: "power3" }),
      depth: partners[i]?.depth ?? 0.8,
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
          className="font-['Fraunces'] font-light text-display-xl tracking-[-0.015em] text-balance text-white text-center max-w-[26ch] mb-6"
          data-sanity={encodeDataAttribute?.(["yetiPage", "heroHeadline"])}
        >
          <SplitWords text={heading} />
        </h1>
        <p
          ref={subRef}
          className="font-['DM_Sans'] font-light text-body text-[#9CA3AF] leading-[1.75] max-w-[50ch] text-center opacity-0"
        >
          {subtext}
        </p>
      </div>

      {/* Scroll cue */}
      <div
        ref={scrollCueRef}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-[7] flex flex-col items-center gap-3"
      >
        <span className="font-['DM_Mono'] uppercase tracking-[0.3em] text-[11px] text-white/20">
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
        {partners.map((partner, i) => (
          <div
            key={partner.id}
            ref={(el) => {
              cardRefs.current[i] = el;
            }}
            className="absolute left-1/2 top-1/2 opacity-0 will-change-transform"
            style={{
              width: "clamp(104px, 9.5vw, 160px)",
              transformStyle: "preserve-3d",
            }}
          >
            {/* mid-layer: pointer parallax */}
            <div data-parallax className="will-change-transform">
              {/* inner layer: continuous float */}
              <div
                data-float
                className="will-change-transform"
                style={
                  partner.depth < 0.8 ? { filter: "blur(0.4px)" } : undefined
                }
              >
                <PartnerCard
                  logo={partner.logo}
                  name={partner.name}
                  label={partner.label}
                  href={partner.href || undefined}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
