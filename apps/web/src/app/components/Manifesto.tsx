import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TextReveal } from "./TextReveal";

gsap.registerPlugin(ScrollTrigger);

type ManifestoData = {
  manifestoEyebrow?: string;
  manifestoHeading?: string;
  manifestoBody?: string;
};

const DEFAULT_HEADING_PART1 =
  "The Himalayas are not entered through ambition alone.";
const DEFAULT_HEADING_PART2 = "They are entered through knowledge.";
const DEFAULT_BODY =
  "Thamserku is a heritage Himalayan expedition house, refined for a global audience. We guide through trust, safety, Sherpa mastery and transformation — not adrenaline, not volume, not noise.";

function splitAtLastSentence(text: string): [string, string] {
  const idx = text.lastIndexOf(". ");
  if (idx === -1) return [text, ""];
  return [text.slice(0, idx + 1), text.slice(idx + 2)];
}

export function Manifesto({ data }: { data?: ManifestoData }) {
  const [part1, part2] = data?.manifestoHeading
    ? splitAtLastSentence(data.manifestoHeading)
    : [DEFAULT_HEADING_PART1, DEFAULT_HEADING_PART2];
  const body = data?.manifestoBody ?? DEFAULT_BODY;
  const eyebrow = data?.manifestoEyebrow ?? "02 — MANIFESTO";

  const sectionRef = useRef<HTMLElement>(null);
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLSpanElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const bodyRef = useRef<HTMLParagraphElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      if (lineRef.current) {
        gsap.from(lineRef.current, {
          scaleX: 0,
          transformOrigin: "left",
          duration: 0.8,
          ease: "power3.inOut",
          scrollTrigger: {
            trigger: eyebrowRef.current,
            start: "top 85%",
          },
        });
      }

      if (eyebrowRef.current) {
        gsap.from(eyebrowRef.current, {
          opacity: 0,
          x: -10,
          duration: 0.6,
          ease: "power3.out",
          scrollTrigger: {
            trigger: eyebrowRef.current,
            start: "top 85%",
          },
        });
      }

      const headingWords = headingRef.current?.querySelectorAll("[data-word]");
      const bodyWords = bodyRef.current?.querySelectorAll("[data-word]");

      if (headingWords?.length && bodyWords?.length) {
        const allWords = [...Array.from(headingWords), ...Array.from(bodyWords)];

        gsap.set(allWords, { opacity: 0.12 });

        gsap.to(allWords, {
          opacity: 1,
          stagger: 0.02,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            end: "bottom 85%",
            scrub: 0.6,
          },
        });
      }
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      className="w-full bg-[#F4F2EC] text-[#1A1A1A] py-16 px-5 md:py-32 md:px-8"
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-12 md:gap-24">
        <div className="md:w-1/4">
          <div ref={eyebrowRef} className="flex items-center gap-4">
            <span
              ref={lineRef}
              className="hidden md:block h-px w-8 bg-[#5A6673]"
            />
            <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#5A6673]">
              {eyebrow}
            </span>
          </div>
        </div>
        <div className="md:w-3/4 flex flex-col gap-10">
          <h2
            ref={headingRef}
            className="font-['Radley'] font-light text-fluid-heading leading-[1.2] max-w-3xl"
          >
            <TextReveal text={part1} />{" "}
            <em className="text-[#0A3A77] italic">
              <TextReveal text={part2} />
            </em>
          </h2>
          <p
            ref={bodyRef}
            className="font-['Lexend'] font-light text-[#5A6673] text-fluid-body leading-[1.8] max-w-[56ch]"
          >
            <TextReveal text={body} />
          </p>
        </div>
      </div>
    </section>
  );
}
