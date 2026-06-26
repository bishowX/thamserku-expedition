import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { RefObject } from "react";

gsap.registerPlugin(ScrollTrigger);

/**
 * Shared entrance-reveal for content sections, matching the homepage feel.
 *
 * Within the scoped section, mark elements with:
 *   - `data-reveal`        → gentle fade + 25px rise as it scrolls into view.
 *   - `data-reveal-group`  → same fade-up, but its direct children stagger in
 *                            sequence (use for header rows, lists, card grids).
 *   - `data-reveal-words`  → word-by-word brightening, scrubbed to scroll.
 *                            Wrap the text in <TextReveal> so the [data-word]
 *                            spans exist. Use on big display headings.
 *   - `data-reveal-prose`  → Manifesto-style brightening across a whole block:
 *                            every [data-word] inside (heading + body) brightens
 *                            as one continuous scrubbed stagger over the block.
 *   - `data-reveal-row`    → list/table rows that cascade in as they enter the
 *                            viewport (ScrollTrigger.batch — rows arriving together
 *                            stagger together). Mark each row element.
 *
 * Always bails out under prefers-reduced-motion.
 */
export function useSectionReveal(scopeRef: RefObject<HTMLElement | null>) {
  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const root = scopeRef.current;
      if (!root) return;

      root.querySelectorAll<HTMLElement>("[data-reveal]").forEach((el) => {
        gsap.from(el, {
          opacity: 0,
          y: 25,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 85%" },
        });
      });

      root.querySelectorAll<HTMLElement>("[data-reveal-group]").forEach((group) => {
        const children = Array.from(group.children);
        if (!children.length) return;
        gsap.from(children, {
          opacity: 0,
          y: 25,
          duration: 0.7,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: { trigger: group, start: "top 85%" },
        });
      });

      root.querySelectorAll<HTMLElement>("[data-reveal-words]").forEach((heading) => {
        const words = heading.querySelectorAll("[data-word]");
        if (!words.length) return;
        gsap.set(words, { opacity: 0.12 });
        gsap.to(words, {
          opacity: 1,
          stagger: 0.02,
          ease: "none",
          scrollTrigger: {
            trigger: heading,
            start: "top 80%",
            end: "top 45%",
            scrub: 0.6,
          },
        });
      });

      const rows = root.querySelectorAll<HTMLElement>("[data-reveal-row]");
      if (rows.length) {
        gsap.set(rows, { opacity: 0, y: 24 });
        ScrollTrigger.batch(rows, {
          start: "top 90%",
          onEnter: (batch) =>
            gsap.to(batch, {
              opacity: 1,
              y: 0,
              duration: 0.6,
              stagger: 0.08,
              ease: "power3.out",
              overwrite: true,
            }),
        });
      }

      root.querySelectorAll<HTMLElement>("[data-reveal-prose]").forEach((scope) => {
        const words = scope.querySelectorAll("[data-word]");
        if (!words.length) return;
        gsap.set(words, { opacity: 0.12 });
        gsap.to(words, {
          opacity: 1,
          stagger: 0.02,
          ease: "none",
          scrollTrigger: {
            trigger: scope,
            start: "top 75%",
            end: "bottom 85%",
            scrub: 0.6,
          },
        });
      });
    },
    { scope: scopeRef },
  );
}
