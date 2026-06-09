import { useState, useEffect, useCallback, useRef } from "react";

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
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (document.body.getAttribute("data-route-pinned") === "1") return;
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
      <div className="max-w-[1440px] mx-auto px-8 flex items-center h-12">
        {NAV_ITEMS.map((item, i) => (
          <div key={item.id} className="flex items-center h-full">
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
    </div>
  );
}
