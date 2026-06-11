import { useState, useEffect, useCallback, useRef } from "react";
import { getLenis } from "../../hooks/useLenis";

const NAV_ITEMS = [
  { label: "OVERVIEW", id: "overview" },
  { label: "WHY THIS EXPEDITION", id: "why-this-expedition" },
  { label: "PROGRAM", id: "program" },
  { label: "INCLUDE/EXCLUDE", id: "include-exclude" },
  { label: "EXPEDITION TYPE", id: "expedition-type" },
  { label: "ROUTE", id: "route" },
  { label: "FAQ", id: "faq" },
  { label: "CONFIGURE", id: "configure" },
];

const NAV_HEIGHT = 64;

export function StickySubNav() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [navHidden, setNavHidden] = useState(false);
  const lastScrollY = useRef(0);

  const handleClick = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const lenis = getLenis();
    if (lenis) {
      // -112 mirrors the sections' scroll-mt-28 (main nav + subnav)
      lenis.scrollTo(el, { offset: -112 });
    } else {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        setNavHidden(true);
      } else {
        setNavHidden(false);
      }
      lastScrollY.current = currentScrollY;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const sectionIds = NAV_ITEMS.map((item) => item.id);
    const observers: IntersectionObserver[] = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveId(id);
        },
        { rootMargin: "-30% 0px -60% 0px", threshold: 0 }
      );
      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <div
      className="sticky z-40 w-full bg-[#1A1A1A] border-b border-white/10 transition-[top] duration-500"
      style={{ top: navHidden ? 0 : NAV_HEIGHT }}
    >
      <div className="relative max-w-[1440px] mx-auto">
        <div className="px-8 flex items-center h-12 overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {NAV_ITEMS.map((item, i) => (
            <div key={item.id} className="flex items-center h-full flex-shrink-0">
              {i > 0 && (
                <span className="text-white/20 mx-4 font-['JetBrains_Mono'] text-[11px] select-none">
                  |
                </span>
              )}
              <button
                onClick={() => handleClick(item.id)}
                className={`font-['JetBrains_Mono'] uppercase tracking-[0.18em] text-[10px] whitespace-nowrap transition-colors duration-200 ${
                  activeId === item.id
                    ? "text-white"
                    : "text-[#5A6673] hover:text-[#C8CDD2]"
                }`}
              >
                {item.label}
              </button>
            </div>
          ))}
        </div>
        <div className="pointer-events-none absolute right-0 top-0 h-full w-16 bg-gradient-to-l from-[#1A1A1A] to-transparent md:hidden" />
      </div>
    </div>
  );
}
