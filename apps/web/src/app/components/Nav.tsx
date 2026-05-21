import { useEffect, useState, useRef } from "react";
import { Link, useLocation } from "react-router";
import { Menu, X } from "lucide-react";
import ThamserkuLogo from "./logo/ThamserkuLogo";

interface NavProps {
  hideOnScrollDown?: boolean;
}

export function Nav({ hideOnScrollDown = true }: NavProps) {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const lastScrollY = useRef(0);
  const location = useLocation();

  const getCtaInfo = () => {
    switch (location.pathname) {
      case "/everest":
        return { label: "Schedule a Everest Consultation", link: "/consultation?peak=everest" };
      case "/7000m":
        return { label: "Plan Your Qualifying Ascent", link: "/consultation?intent=7000m" };
      case "/private":
        return { label: "Schedule a Private Consultation", link: "/consultation?intent=private" };
      case "/field-notes":
        return { label: "Receive Field Notes", link: "#newsletter" };
      case "/consultation":
        return { label: "Select a Consultation Time", link: "#calendar" };
      default:
        return { label: "Schedule a Consultation", link: "/consultation" };
    }
  };

  const { label: ctaLabel, link: ctaLink } = getCtaInfo();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrolled(currentScrollY > 50);

      if (hideOnScrollDown) {
        if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
          setHidden(true);
        } else {
          setHidden(false);
        }
        lastScrollY.current = currentScrollY;
      }
    };
    
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hideOnScrollDown]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [mobileMenuOpen]);

  return (
    <>
      <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 flex items-center justify-between px-6 md:px-8 py-5 md:py-6 text-white ${
        scrolled || mobileMenuOpen ? "bg-[#1A1A1A]/90 backdrop-blur-md border-b border-white/5" : "bg-transparent"
      } ${hidden && !mobileMenuOpen ? "-translate-y-full" : "translate-y-0"}`}>
        <div className="w-auto lg:w-[220px] xl:w-[280px] z-50">
          <Link to="/" onClick={() => setMobileMenuOpen(false)} className="block h-7 md:h-8 aspect-[1115.63/208]">
            <ThamserkuLogo />
          </Link>
        </div>
        
        <div className="hidden lg:flex items-center gap-8 font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px]">
          <Link to="/atlas" className="hover:text-[#C8CDD2] transition-colors">Expedition Atlas</Link>
          <Link to="/editions" className="hover:text-[#C8CDD2] transition-colors">Editions</Link>
          <Link to="/yeti-infrastructure" className="hover:text-[#C8CDD2] transition-colors">Yeti Infrastructure</Link>
          <Link to="/legacy" className="hover:text-[#C8CDD2] transition-colors">Legacy</Link>
        </div>

        <div className="hidden lg:flex w-auto lg:w-[220px] xl:w-[280px] justify-end">
          <Link to={ctaLink} className={`border ${scrolled || mobileMenuOpen ? "border-white/50" : "border-white/30"} px-6 xl:px-8 py-3.5 flex items-center justify-center font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[10px] xl:text-[11px] hover:border-white transition-colors whitespace-nowrap`}>
            {ctaLabel}
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className="lg:hidden z-50 p-2 -mr-2 text-white"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle mobile menu"
        >
          {mobileMenuOpen ? <X size={24} strokeWidth={1.5} /> : <Menu size={24} strokeWidth={1.5} />}
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      <div 
        className={`fixed inset-0 bg-[#1A1A1A] z-40 flex flex-col pt-[100px] px-6 pb-8 transition-transform duration-500 ease-in-out ${
          mobileMenuOpen ? "translate-x-0" : "translate-x-full"
        } lg:hidden overflow-y-auto`}
      >
        <div className="flex flex-col mt-4 font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[12px] text-white">
          
          {/* EXPEDITIONS GROUP */}
          <div className="text-[10px] text-[#C8CDD2] mb-6">EXPEDITIONS</div>
          <Link to="/atlas" className="hover:text-[#C8CDD2] transition-colors pb-4" onClick={() => setMobileMenuOpen(false)}>Expedition Atlas</Link>
          <Link to="/everest" className="hover:text-[#C8CDD2] transition-colors pb-4" onClick={() => setMobileMenuOpen(false)}>Everest</Link>
          <Link to="/editions" className="hover:text-[#C8CDD2] transition-colors pb-4" onClick={() => setMobileMenuOpen(false)}>Editions</Link>
          <Link to="/7000m" className="hover:text-[#C8CDD2] transition-colors pb-4" onClick={() => setMobileMenuOpen(false)}>7,000m Qualifying Pathway</Link>
          <Link to="/private" className="hover:text-[#C8CDD2] transition-colors pb-8 mb-8 border-b border-white/10" onClick={() => setMobileMenuOpen(false)}>Private Expeditions</Link>

          {/* THE HOUSE GROUP */}
          <div className="text-[10px] text-[#C8CDD2] mb-6">THE HOUSE</div>
          <Link to="/legacy" className="hover:text-[#C8CDD2] transition-colors pb-4" onClick={() => setMobileMenuOpen(false)}>Legacy</Link>
          <Link to="/yeti-infrastructure" className="hover:text-[#C8CDD2] transition-colors pb-4" onClick={() => setMobileMenuOpen(false)}>Yeti Infrastructure</Link>
          <Link to="/archive" className="hover:text-[#C8CDD2] transition-colors pb-8 mb-8 border-b border-white/10" onClick={() => setMobileMenuOpen(false)}>Expedition Archive</Link>

          {/* EDITORIAL & HELP GROUP */}
          <div className="text-[10px] text-[#C8CDD2] mb-6">EDITORIAL & HELP</div>
          <Link to="/field-notes" className="hover:text-[#C8CDD2] transition-colors pb-4" onClick={() => setMobileMenuOpen(false)}>Field Notes</Link>
          <Link to="/faq" className="hover:text-[#C8CDD2] transition-colors pb-8 mb-8 border-b border-white/10" onClick={() => setMobileMenuOpen(false)}>Main FAQ</Link>

          {/* DIRECT GROUP */}
          <div className="text-[10px] text-[#C8CDD2] mb-6">DIRECT</div>
        </div>

        <div className="mt-2 pb-8">
          <Link 
            to={ctaLink} 
            className="w-full border border-white/30 py-4 flex items-center justify-center font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] hover:border-white transition-colors text-white"
            onClick={() => setMobileMenuOpen(false)}
          >
            {ctaLabel}
          </Link>
        </div>
      </div>
    </>
  );
}