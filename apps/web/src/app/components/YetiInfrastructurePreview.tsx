import { useRef } from "react";
import { Link } from "react-router";
import { MoveRight } from "lucide-react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { SanityYetiPillar } from "../../lib/queries";
import { TextReveal } from "./TextReveal";

gsap.registerPlugin(ScrollTrigger);

type YetiData = {
  infrastructureEyebrow?: string;
  infrastructureHeading?: string;
  infrastructureIntro?: string;
  infrastructurePillars?: SanityYetiPillar[];
};

const FALLBACK_PILLARS = [
  {
    eyebrow: "PILLAR I — AIR SUPPORT",
    title: "Helicopter coordination and aerial logistics.",
    desc: "Helicopter access, rescue support, and aerial logistics coordinated through the Yeti Group's aviation network — among the most experienced in the Nepal Himalaya.",
  },
  {
    eyebrow: "PILLAR II — MOUNTAIN LODGES",
    title: "Rest, recovery, and continuity at altitude.",
    desc: "Operational lodges and rest points along approach routes, allowing acclimatisation rhythm and recovery without compromising on standards or privacy.",
  },
  {
    eyebrow: "PILLAR III — REGIONAL ACCESS",
    title: "Permits, regions, and quiet passage.",
    desc: "Continuous regional presence across Khumbu, Manaslu, Dhaulagiri, Mahalangur, and Annapurna — backed by decades of permits, partnerships, and quiet field relationships.",
  },
  {
    eyebrow: "PILLAR IV — FIELD CONTINUITY",
    title: "Multi-generational, on the ground.",
    desc: "A multi-generational field team supported by Kathmandu-based operations, allowing the same standards of care from first letter to descent.",
  },
];

export function YetiInfrastructurePreview({ data }: { data?: YetiData }) {
  const eyebrow =
    data?.infrastructureEyebrow ?? "SECTION III — YETI INFRASTRUCTURE";
  const heading =
    data?.infrastructureHeading ??
    "An operating foundation behind every expedition.";
  const intro =
    data?.infrastructureIntro ??
    "Thamserku draws on the Yeti Infrastructure: air support, mountain lodges, regional access and field continuity that quietly support every expedition we run.";
  const pillars = data?.infrastructurePillars
    ? data.infrastructurePillars.map((p) => ({
        eyebrow: `PILLAR ${p.number} — ${p.name.toUpperCase()}`,
        title: p.subtitle,
        desc: p.body,
      }))
    : FALLBACK_PILLARS;

  const sectionRef = useRef<HTMLElement>(null);
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLSpanElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const introRef = useRef<HTMLParagraphElement>(null);
  const pillarsRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      if (lineRef.current) {
        gsap.from(lineRef.current, {
          scaleX: 0,
          transformOrigin: "left",
          duration: 0.8,
          ease: "power3.inOut",
          scrollTrigger: { trigger: eyebrowRef.current, start: "top 85%" },
        });
      }

      if (eyebrowRef.current) {
        gsap.from(eyebrowRef.current, {
          opacity: 0,
          x: -10,
          duration: 0.6,
          ease: "power3.out",
          scrollTrigger: { trigger: eyebrowRef.current, start: "top 85%" },
        });
      }

      if (headingRef.current) {
        const words = headingRef.current.querySelectorAll("[data-word]");
        gsap.from(words, {
          yPercent: 100,
          duration: 0.7,
          stagger: 0.03,
          ease: "power4.out",
          scrollTrigger: { trigger: headingRef.current, start: "top 82%" },
        });
      }

      if (introRef.current) {
        gsap.from(introRef.current, {
          opacity: 0,
          y: 20,
          filter: "blur(4px)",
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: { trigger: introRef.current, start: "top 85%" },
        });
      }

      if (pillarsRef.current) {
        const cards = Array.from(pillarsRef.current.children);
        cards.forEach((card, i) => {
          gsap.from(card, {
            clipPath: "inset(100% 0% 0% 0%)",
            duration: 0.8,
            delay: i * 0.12,
            ease: "power3.out",
            scrollTrigger: { trigger: pillarsRef.current, start: "top 85%" },
          });

          gsap.from(card.children, {
            opacity: 0,
            y: 20,
            duration: 0.5,
            stagger: 0.06,
            delay: i * 0.12 + 0.3,
            ease: "power3.out",
            scrollTrigger: { trigger: pillarsRef.current, start: "top 85%" },
          });
        });
      }

      if (ctaRef.current) {
        gsap.from(ctaRef.current, {
          opacity: 0,
          y: 15,
          duration: 0.5,
          ease: "power3.out",
          scrollTrigger: { trigger: ctaRef.current, start: "top 90%" },
        });
      }
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-[#1A1A1A] py-24 overflow-hidden text-white"
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(to right, #202121 1px, transparent 1px), linear-gradient(to bottom, #202121 1px, transparent 1px)`,
          backgroundSize: "96px 96px",
        }}
      />

      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-8 flex flex-col">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 mb-10 md:mb-32">
          <div className="md:col-span-5 flex flex-col">
            <div ref={eyebrowRef} className="flex items-center gap-4 mb-8">
              <span
                ref={lineRef}
                className="hidden md:block h-px w-8 bg-[#C8CDD2]"
              />
              <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#C8CDD2]">
                {eyebrow}
              </span>
            </div>
            <h2
              ref={headingRef}
              className="font-['Radley'] font-light text-fluid-section leading-[1.05] text-white max-w-[18ch]"
            >
              <TextReveal text={heading} />
            </h2>
          </div>

          <div className="md:col-span-7 flex flex-col md:pt-12">
            <p
              ref={introRef}
              className="font-['Lexend'] font-light text-fluid-body text-[#C8CDD2] leading-[1.65] max-w-[56ch]"
            >
              {intro}
            </p>
          </div>
        </div>

        <div
          ref={pillarsRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0 mb-8 md:mb-16"
        >
          {pillars.map((pillar, idx) => (
            <div
              key={idx}
              className="flex flex-col bg-[#24282c59] border-t md:border-r last:border-r-0 border-b lg:border-b-0 border-[#c8cdd24d] p-8"
              style={{ clipPath: "inset(0% 0% 0% 0%)" }}
            >
              <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#C8CDD2] mb-12">
                {pillar.eyebrow}
              </span>
              <h3 className="font-['Radley'] font-light text-fluid-md leading-[1.3] text-white mb-6">
                {pillar.title}
              </h3>
              <p className="font-['Lexend'] font-light text-fluid-body text-[#C8CDD2] leading-[1.65]">
                {pillar.desc}
              </p>
            </div>
          ))}
        </div>

        <div ref={ctaRef} className="w-full mx-auto flex justify-end">
          <Link
            to="/yeti-infrastructure"
            className="group flex items-center gap-4 font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-white hover:text-[#C8CDD2] transition-colors"
          >
            <span className="border-b border-white/30 group-hover:border-[#C8CDD2] pb-1 transition-colors">
              READ THE FULL YETI INFRASTRUCTURE PAGE
            </span>
            <MoveRight className="w-4 h-4 arrow-shift" />
          </Link>
        </div>
      </div>
    </section>
  );
}
