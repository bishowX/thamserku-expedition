import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type Partner = {
  name: string;
  logo: string;
  /** Intrinsic width / height of the artwork. */
  ratio: number;
};

/**
 * Every logo gets the same visual area rather than the same height, so a
 * square mark and a long wordmark read at the same weight. In em² — the <li>
 * font size scales the whole row.
 */
const LOGO_AREA = 16;

const PARTNERS: Partner[] = [
  { name: "Mountain Hardwear", logo: "/images/partners/mountain-hardwear.png?v=7", ratio: 1200 / 608 },
  { name: "Air Dynasty", logo: "/images/partners/air-dynasty.png", ratio: 800 / 234 },
  { name: "Yeti Airlines", logo: "/images/partners/yeti-airlines.svg", ratio: 123.6 / 29.6 },
  { name: "Tara Air", logo: "/images/partners/tara-air.png", ratio: 454 / 140 },
  { name: "Mountain Lodges of Nepal", logo: "/images/partners/mln.svg?v=2", ratio: 214 / 240 },
  { name: "The Malla Hotel", logo: "/images/partners/malla-hotel.png?v=2", ratio: 210 / 217 },
];

export function PartnersPreview() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      gsap.from(sectionRef.current!.children, {
        opacity: 0,
        y: 25,
        duration: 0.7,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 85%" },
      });
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      id="partners"
      className="w-full bg-[#FCF2EC] py-10 px-5 md:py-14 md:px-8 flex flex-col gap-8 md:gap-10"
    >
      <div className="max-w-7xl w-full mx-auto">
        <span className="font-['DM_Mono'] uppercase tracking-[2.4px] text-[11px] text-[#5A6673]">
          06 — PARTNERS
        </span>
      </div>

      <div className="marquee overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
        <ul className="marquee-track flex w-max items-center">
          {[...PARTNERS, ...PARTNERS].map((partner, i) => (
            // The second copy exists only to close the loop — hide it from
            // assistive tech so each partner is announced once.
            <li
              key={i}
              aria-hidden={i >= PARTNERS.length || undefined}
              className="shrink-0 px-8 md:px-12 text-[14px] md:text-[17px]"
            >
              <img
                src={partner.logo}
                alt={partner.name}
                className="w-auto"
                style={{ height: `${Math.sqrt(LOGO_AREA / partner.ratio)}em` }}
                draggable={false}
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
