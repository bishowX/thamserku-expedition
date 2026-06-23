import { useRef } from "react";
import { MoveRight } from "lucide-react";
import { Link } from "react-router";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type UnclaimedPeaksData = {
  unclaimedPeaksEyebrow?: string;
  unclaimedPeaksHeading?: string;
  unclaimedPeaksBody?: string;
};

const CTA_LABEL = "Enquire Now";
const CTA_HREF = "/consultation";

export function UnclaimedPeaks({ data }: { data?: UnclaimedPeaksData }) {
  const eyebrow = data?.unclaimedPeaksEyebrow;
  const heading = data?.unclaimedPeaksHeading;
  const body = data?.unclaimedPeaksBody;

  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const items = sectionRef.current?.querySelectorAll("[data-reveal]");
      if (items && items.length) {
        gsap.from(items, {
          opacity: 0,
          y: 15,
          duration: 0.6,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
        });
      }
    },
    { scope: sectionRef },
  );

  if (!eyebrow && !heading && !body) return null;

  return (
    <section
      ref={sectionRef}
      className="w-full bg-[#2E353C] flex flex-col items-center justify-center gap-8 py-16 md:py-24 px-6 md:px-16"
    >
      <div className="w-full max-w-7xl flex flex-col gap-8">
        {/* Header: eyebrow label + heading */}
        <div className="flex flex-col gap-6 md:flex-row md:gap-16 md:items-start overflow-hidden">
          {eyebrow && (
            <p
              data-reveal
              className="shrink-0 md:w-[280px] font-['DM_Mono'] text-[11px] tracking-[2.4px] uppercase text-[#C8CDD2] whitespace-nowrap"
            >
              {eyebrow}
            </p>
          )}
          {heading && (
            <h2
              data-reveal
              className="font-['Fraunces'] text-display-l tracking-[-0.5px] text-white max-w-[785px]"
            >
              {heading}
            </h2>
          )}
        </div>

        {/* Intro body */}
        {body && (
          <p
            data-reveal
            className="font-['DM_Sans'] font-light text-body leading-[1.4] text-white max-w-[624px] md:ml-[344px]"
          >
            {body}
          </p>
        )}

        {/* CTA */}
        <div data-reveal className="md:ml-[344px]">
          <Link
            to={CTA_HREF}
            className="btn-cta inline-flex items-center gap-5 border border-white bg-white text-[#0A3A77] px-[22px] py-[17px] font-['DM_Mono'] text-[11px] tracking-[2.42px] uppercase"
          >
            <span>{CTA_LABEL}</span>
            <MoveRight className="w-4 h-4 arrow-shift" />
          </Link>
        </div>
      </div>
    </section>
  );
}
