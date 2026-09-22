import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type Partner = {
  name: string;
  logo: string;
  tall?: boolean;
  wide?: boolean;
  plate?: "white";
};

type PartnerGroup = {
  label: string;
  partners: Partner[];
};

const GROUPS: PartnerGroup[] = [
  {
    label: "Equipment partners",
    partners: [
      {
        name: "Mountain Hardwear",
        logo: "/images/partners/mountain-hardwear.png?v=6",
        wide: true,
        plate: "white",
      },
    ],
  },
  {
    label: "Helicopter partners",
    partners: [
      { name: "Air Dynasty", logo: "/images/partners/air-dynasty.png" },
    ],
  },
  {
    label: "Airplane partners",
    partners: [
      { name: "Yeti Airlines", logo: "/images/partners/yeti-airlines.svg" },
    ],
  },
  {
    label: "Lodge partners",
    partners: [
      {
        name: "Mountain Lodges of Nepal",
        logo: "/images/partners/mln.svg",
        tall: true,
      },
    ],
  },
  {
    label: "Kathmandu hotel",
    partners: [
      {
        name: "The Malla Hotel",
        logo: "/images/partners/malla-hotel.png",
        tall: true,
      },
    ],
  },
];

function PartnerLogo({ partner }: { partner: Partner }) {
  const sizeClass = partner.tall
    ? "h-16 w-auto max-w-full md:h-20"
    : partner.wide
      ? "h-auto w-full max-w-[12rem]"
      : "h-12 w-auto max-w-full md:h-14";

  const img = (
    <img
      src={partner.logo}
      alt={partner.name}
      className={`object-contain ${sizeClass}`}
      loading="eager"
      draggable={false}
    />
  );

  if (partner.plate === "white") {
    return (
      <div className="flex w-full max-w-[12rem] items-center justify-center bg-white p-3">
        {img}
      </div>
    );
  }

  return img;
}

export function PartnersPreview() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      if (headerRef.current) {
        gsap.from(Array.from(headerRef.current.children), {
          opacity: 0,
          y: 25,
          duration: 0.7,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: { trigger: headerRef.current, start: "top 85%" },
        });
      }

      if (gridRef.current) {
        const cards = Array.from(gridRef.current.children);
        gsap.set(cards, { opacity: 0, y: 20 });
        cards.forEach((card) => {
          gsap.to(card, {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power3.out",
            scrollTrigger: { trigger: card, start: "top 90%" },
          });
        });
      }
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      id="partners"
      className="w-full bg-[#1A1A1A] text-white section-padding"
    >
      <div className="max-w-7xl mx-auto flex flex-col gap-12">
        <div
          ref={headerRef}
          className="flex flex-col md:flex-row gap-6 md:gap-16 items-start"
        >
          <div className="shrink-0 md:w-[280px]">
            <span className="font-['DM_Mono'] uppercase tracking-[2.4px] text-[11px] text-[#C8CDD2]">
              06 — PARTNERS
            </span>
          </div>
          <div className="flex-1 flex flex-col gap-3">
            <h2 className="font-['Fraunces'] text-display-l tracking-[-0.5px] text-white">
              Who we fly, stay, and climb with.
            </h2>
            <p className="font-['DM_Sans'] font-light text-body leading-[1.2] tracking-[-0.5px] text-[#C8CDD2] md:max-w-[70%]">
              Equipment, air support, mountain lodges, and a Kathmandu hotel.
              The same partners, season after season.
            </p>
          </div>
        </div>

        <div
          ref={gridRef}
          className="grid grid-cols-1 lg:grid-cols-5 border-t border-[rgba(200,205,210,0.3)]"
        >
          {GROUPS.map((group, i) => (
            <div
              key={group.label}
              className={`flex flex-col gap-6 p-8 border-[rgba(200,205,210,0.3)] ${
                i > 0 ? "border-t lg:border-t-0 lg:border-l" : ""
              }`}
            >
              <p className="font-['DM_Mono'] text-[11px] tracking-[2.2px] uppercase text-[#C8CDD2]">
                {group.label}
              </p>
              <div className="flex min-h-[8rem] flex-1 flex-col items-center justify-center gap-6">
                {group.partners.map((partner) => (
                  <PartnerLogo key={partner.name} partner={partner} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
