import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type Partner = {
  name: string;
  logo: string;
  /** Square-ish marks read smaller than wordmarks at the same height. */
  tall?: boolean;
};

const PARTNERS: Partner[] = [
  { name: "Mountain Hardwear", logo: "/images/partners/mountain-hardwear.png?v=7" },
  { name: "Air Dynasty", logo: "/images/partners/air-dynasty.png" },
  { name: "Yeti Airlines", logo: "/images/partners/yeti-airlines.svg" },
  { name: "Tara Air", logo: "/images/partners/tara-air.png" },
  { name: "Mountain Lodges of Nepal", logo: "/images/partners/mln.svg?v=2", tall: true },
  { name: "The Malla Hotel", logo: "/images/partners/malla-hotel.png?v=2", tall: true },
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
              className="shrink-0 px-10 md:px-16"
            >
              <img
                src={partner.logo}
                alt={partner.name}
                className={`w-auto object-contain ${partner.tall ? "h-20 md:h-24" : "h-12 md:h-16"}`}
                draggable={false}
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
