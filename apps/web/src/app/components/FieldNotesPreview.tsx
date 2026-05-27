import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { urlFor } from "../../lib/sanity";
import type { SanityFieldNote } from "../../lib/queries";

gsap.registerPlugin(ScrollTrigger);

const FALLBACK_NOTES = [
  {
    code: "FN / 01 — APPROACH",
    title: "The Khumbu Approach",
    excerpt:
      "A walk-in is never only a walk-in. It is the first read of weather, of body, of crew, and of how the mountain is breathing this season.",
    byline: "EXPEDITION DESK · 8 MIN READ",
    image: null,
  },
  {
    code: "FN / 02 — CAMP",
    title: "Life at Base Camp",
    excerpt:
      "What an expedition actually feels like when the noise is removed.",
    byline: "FIELD TEAM · 6 MIN READ",
    image: null,
  },
  {
    code: "FN / 03 — JUDGEMENT",
    title: "Sherpa Route Judgement",
    excerpt:
      "The quiet calculations that decide whether a day is a climbing day.",
    byline: "SIRDAR NOTES · 9 MIN READ",
    image: null,
  },
  {
    code: "FN / 04 — WEATHER",
    title: "Weather Windows",
    excerpt:
      "Understanding the brief moments when the atmosphere allows passage to the summit.",
    byline: "METEOROLOGY · 7 MIN READ",
    image: null,
  },
];

function toDisplayNote(note: SanityFieldNote) {
  return {
    code: note.code,
    title: note.title,
    excerpt: note.excerpt,
    byline: note.readTime
      ? `${note.byline} · ${note.readTime} MIN READ`
      : note.byline,
    image: note.coverImage ? urlFor(note.coverImage).width(800).url() : null,
  };
}

type FieldNotesData = {
  fieldNotesEyebrow?: string;
  fieldNotesHeading?: string;
  newsletterEyebrow?: string;
  newsletterHeading?: string;
  newsletterBody?: string;
  newsletterCta?: string;
  newsletterPrivacyNote?: string;
};

export function FieldNotesPreview({
  fieldNotes,
  data,
}: {
  fieldNotes?: SanityFieldNote[];
  data?: FieldNotesData;
}) {
  const notes =
    fieldNotes && fieldNotes.length > 0
      ? fieldNotes.slice(0, 4).map((n) => toDisplayNote(n))
      : FALLBACK_NOTES;

  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const newsletterRef = useRef<HTMLDivElement>(null);

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
        cards.forEach((card, i) => {
          gsap.from(card, {
            opacity: 0,
            scale: 0.94,
            y: 30,
            duration: 0.8,
            delay: i * 0.1,
            ease: "power3.out",
            scrollTrigger: { trigger: gridRef.current, start: "top 85%" },
          });

          // Image entrance + scroll parallax
          const imgWrap = card.querySelector(".overflow-hidden");
          const img = imgWrap?.querySelector("img");
          if (img) {
            gsap.from(img, {
              scale: 1.2,
              duration: 1.2,
              delay: i * 0.1 + 0.2,
              ease: "power2.out",
              scrollTrigger: { trigger: gridRef.current, start: "top 85%" },
            });

            gsap.fromTo(
              img,
              { yPercent: -6 },
              {
                yPercent: 6,
                ease: "none",
                scrollTrigger: {
                  trigger: card,
                  start: "top bottom",
                  end: "bottom top",
                  scrub: true,
                },
              },
            );
          }
        });
      }

      if (newsletterRef.current) {
        gsap.from(newsletterRef.current, {
          opacity: 0,
          y: 30,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: newsletterRef.current, start: "top 88%" },
        });
      }
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      id="field-notes"
      className="w-full bg-[#F4F2EC] text-[#1A1A1A] py-24 px-8"
    >
      <div className="max-w-7xl mx-auto flex flex-col gap-6">
        <div
          ref={headerRef}
          className="flex flex-col md:flex-row gap-12 md:gap-24 items-start"
        >
          <div className="md:w-1/4">
            <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#5A6673]">
              {data?.fieldNotesEyebrow ?? "06 — FIELD NOTES"}
            </span>
          </div>
          <div className="md:w-1/2">
            <h2 className="font-['Radley'] font-light text-fluid-heading leading-[1.1] mb-6">
              {data?.fieldNotesHeading ??
                "Short studies in Himalayan judgement."}
            </h2>
          </div>
        </div>

        <div
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 items-start"
        >
          {notes.map((note, idx) => (
            <article
              key={idx}
              className="flex flex-col gap-4 group cursor-pointer"
            >
              <div className="w-full overflow-hidden bg-[#E5E7EB] aspect-square">
                {note.image && (
                  <ImageWithFallback
                    src={note.image}
                    alt={note.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 will-change-transform"
                  />
                )}
              </div>

              <div className="flex flex-col gap-4">
                <div className="font-['JetBrains_Mono'] text-[10px] uppercase tracking-[0.22em] text-[#5A6673]">
                  {note.code}
                </div>
                <h3 className="font-['Radley'] font-light text-fluid-lg leading-[1.2] line-clamp-1">
                  {note.title}
                </h3>
                <p
                  className="font-['Lexend'] font-light text-[#5A6673] text-fluid-body leading-relaxed line-clamp-3"
                  style={{ minHeight: "calc(3 * 1.625em)" }}
                >
                  {note.excerpt}
                </p>
                <div className="font-['JetBrains_Mono'] text-[10px] uppercase tracking-[0.22em] text-[#C8CDD2] pt-4 border-t border-[#E5E7EB]">
                  {note.byline}
                </div>
              </div>
            </article>
          ))}
        </div>

        <div
          ref={newsletterRef}
          id="newsletter"
          className="w-full mt-6 pt-12 pb-6 border-t border-[#E5E7EB]"
        >
          <div className="max-w-[720px] mx-auto flex flex-col items-center text-center">
            <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#5A6673] mb-8">
              {data?.newsletterEyebrow ?? "FIELD NOTES — NEWSLETTER"}
            </span>

            <h3 className="font-['Radley'] font-light text-fluid-xl leading-[1.1] text-[#1A1A1A] max-w-[22ch] mb-6">
              {data?.newsletterHeading ??
                "Receive Field Notes from the expedition desk."}
            </h3>

            <p className="font-['Lexend'] font-light text-fluid-body text-[#5A6673] leading-[1.65] max-w-[56ch] mb-12">
              {data?.newsletterBody ??
                "A quiet quarterly letter of field reports, route judgement and Himalayan readings."}
            </p>

            <form
              className="w-full flex flex-col md:flex-row gap-6 justify-center items-center mb-10"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="email"
                placeholder="Your email address"
                required
                className="w-full md:w-auto flex-1 max-w-[320px] bg-transparent border-0 border-b border-[#1A1A1A]/30 pb-3 px-0 font-['Cormorant_Garamond'] italic text-[20px] text-[#1A1A1A] placeholder:text-[#5A6673]/60 focus:outline-none focus:ring-0 focus:border-[#1A1A1A] transition-colors"
              />
              <button
                type="submit"
                className="btn-cta w-full md:w-auto border border-[#0A3A77]/30 px-8 py-3.5 font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#0A3A77] hover:border-[#0A3A77] transition-colors"
              >
                <span>{data?.newsletterCta ?? "Subscribe →"}</span>
              </button>
            </form>

            <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[10.5px] text-[#5A6673]">
              {data?.newsletterPrivacyNote ??
                "BY SUBSCRIBING YOU AGREE TO OUR PRIVACY TERMS. WE WILL NEVER SHARE YOUR DETAILS."}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
