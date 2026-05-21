import { useState, useEffect, useRef } from "react";
import { X, ArrowRight } from "lucide-react";
import { Link } from "react-router";

export function FloatingContactPrompt() {
  const [isVisible, setIsVisible] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const lastScrollY = useRef(0);
  const lastDirection = useRef<"up" | "down">("up");
  const thresholdY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const heroHeight = window.innerHeight;

      // State A — At top of page
      if (currentScrollY <= heroHeight - 100) {
        setIsVisible(false);
        lastDirection.current = currentScrollY > lastScrollY.current ? "down" : "up";
        lastScrollY.current = currentScrollY;
        return;
      }

      const isScrollingDown = currentScrollY > lastScrollY.current;

      if (isScrollingDown) {
        // Scrolling DOWN
        if (lastDirection.current === "up") {
          lastDirection.current = "down";
        }
        // State B & C — Scrolling past hero or continuously down
        setIsVisible(true);
      } else if (currentScrollY < lastScrollY.current) {
        // Scrolling UP
        if (lastDirection.current === "down") {
          lastDirection.current = "up";
          thresholdY.current = currentScrollY;
        }

        // State D — Direction reversal threshold
        if (thresholdY.current - currentScrollY >= 100) {
          setIsVisible(false);
        }
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle Escape key to close drawer
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isExpanded) {
        setIsExpanded(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isExpanded]);

  return (
    <>
      {/* Collapsed Button */}
      <button
        onClick={() => setIsExpanded(true)}
        className={`fixed z-50 bottom-4 left-4 right-4 md:bottom-6 md:left-auto md:right-6 w-[calc(100%-32px)] md:w-auto bg-[#1A1A1A]/90 backdrop-blur-md border border-white/50 px-[22px] py-[18px] md:py-[16px] flex items-center justify-center transition-all ease-out ${
          isVisible && !isExpanded ? 'opacity-100 pointer-events-auto duration-[250ms] delay-[50ms]' : 'opacity-0 pointer-events-none duration-[200ms]'
        } hover:bg-[#1A1A1A]`}
        aria-label="Open expedition desk contact panel"
        aria-hidden={!isVisible || isExpanded}
        tabIndex={isVisible && !isExpanded ? 0 : -1}
      >
        <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[12px] md:text-[11px] text-white">
          SPEAK WITH THE EXPEDITION DESK
        </span>
      </button>

      {/* Expanded Drawer Backdrop */}
      <div 
        className={`fixed inset-0 bg-black/20 z-40 transition-opacity duration-[250ms] ease-in ${isExpanded ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setIsExpanded(false)}
      />

      {/* Expanded Drawer */}
      <div 
        className={`fixed z-50 bottom-0 left-0 w-full md:left-auto md:bottom-6 md:right-6 md:w-[420px] md:max-w-[92vw] bg-[#1A1A1A]/96 backdrop-blur-lg border-t md:border border-white/20 p-6 md:p-8 transition-all duration-[300ms] ease-out ${
          isExpanded 
            ? 'opacity-100 pointer-events-auto translate-y-0 md:translate-x-0' 
            : 'opacity-0 pointer-events-none translate-y-[120%] md:translate-y-0 md:translate-x-[120%]'
        }`}
        role="dialog"
        aria-modal={isExpanded}
        aria-hidden={!isExpanded}
      >
        {/* Header */}
        <div className="flex justify-between items-start mb-6">
          <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#C8CDD2]">
            THE EXPEDITION DESK
          </span>
          <button 
            onClick={() => setIsExpanded(false)}
            className="border border-transparent hover:border-white/50 p-0.5 transition-colors"
            aria-label="Close contact panel"
          >
            <X className="w-5 h-5 text-white" strokeWidth={1} />
          </button>
        </div>

        {/* Headline */}
        <h2 className="font-['Radley'] font-light text-[24px] md:text-[32px] leading-[1.15] text-white mb-4">
          Need guidance?
        </h2>

        {/* Body */}
        <p className="font-['Lexend'] font-light text-[14px] md:text-[15px] text-[#C8CDD2] leading-[1.6] mb-7">
          Not sure which mountain or edition is right for you? Begin with a private message to the expedition desk.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col gap-2.5 mb-6">
          <a 
            href="#whatsapp-pending"
            className="flex flex-col border border-white/40 hover:border-white/70 px-[18px] py-[14px] transition-colors group text-left"
          >
            <div className="flex justify-between items-center w-full">
              <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-white">
                WHATSAPP THE EXPEDITION DESK
              </span>
              <ArrowRight className="w-3 h-3 text-white transition-transform group-hover:translate-x-1" strokeWidth={1.5} />
            </div>
            <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[10px] text-[#5A6673] mt-1 block">
              [CLIENT TO CONFIRM] — WHATSAPP NUMBER PENDING.
            </span>
          </a>

          <Link 
            to="/consultation"
            className="flex justify-between items-center border border-white/40 hover:border-white/70 px-[18px] py-[14px] transition-colors group"
          >
            <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-white">
              SCHEDULE A CONSULTATION
            </span>
            <ArrowRight className="w-3 h-3 text-white transition-transform group-hover:translate-x-1" strokeWidth={1.5} />
          </Link>

          <a 
            href="#email-pending"
            className="flex flex-col border border-white/40 hover:border-white/70 px-[18px] py-[14px] transition-colors group text-left"
          >
            <div className="flex justify-between items-center w-full">
              <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-white">
                EMAIL THE DESK
              </span>
              <ArrowRight className="w-3 h-3 text-white transition-transform group-hover:translate-x-1" strokeWidth={1.5} />
            </div>
            <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[10px] text-[#5A6673] mt-1 block">
              [CLIENT TO CONFIRM] — EMAIL ADDRESS PENDING.
            </span>
          </a>
        </div>

        {/* Privacy */}
        <p className="font-['Cormorant_Garamond'] italic text-[14px] text-[#C8CDD2]">
          Handled discreetly by senior expedition staff.
        </p>
      </div>
    </>
  );
}