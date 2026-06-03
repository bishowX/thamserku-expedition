import { useEffect, useState, useRef } from "react";
import { Link, useLocation } from "react-router";
import { Menu, X, ChevronDown } from "lucide-react";
import ThamserkuLogo from "./logo/ThamserkuLogo";
import { sanityClient, urlFor } from "../../lib/sanity";

type OpenMenu = null | "about" | "expedition";
type ExpeditionTab = "8000" | "7000" | "6000";

type NavExpedition = {
  _id: string;
  name: string;
  slug: { current: string };
  altitude: string;
  image?: { asset: { _ref: string } } | null;
};

const ABOUT_LINKS = [
  { label: "Legacy", href: "/legacy" },
  { label: "Heritage & Achievements", href: "/heritage-and-achievements" },
  { label: "YETI INFRASTRUCTURE", href: "/yeti-infrastructure" },
  { label: "News & Blogs", href: "/news-and-blogs" },
];

function parseAltitudeM(alt: string): number {
  return parseInt(alt.replace(/[^0-9]/g, ""), 10) || 0;
}

interface NavProps {
  hideOnScrollDown?: boolean;
}

export function Nav({ hideOnScrollDown = true }: NavProps) {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [openMenu, setOpenMenu] = useState<OpenMenu>(null);
  const [expeditionTab, setExpeditionTab] = useState<ExpeditionTab>("8000");
  const [expeditions, setExpeditions] = useState<NavExpedition[]>([]);
  const [mobileExpanded, setMobileExpanded] = useState<
    "about" | "expedition" | null
  >(null);
  const lastScrollY = useRef(0);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const location = useLocation();

  const getCtaInfo = () => {
    return {
      label: "Design Your Expedition",
      link: "/design-your-expedition",
    };
    switch (location.pathname) {
      case "/expeditions/everest":
        return {
          label: "Schedule an Everest Consultation",
          link: "/consultation?peak=everest",
        };
      case "/7000m":
        return {
          label: "Plan Your Qualifying Ascent",
          link: "/consultation?intent=7000m",
        };
      case "/private":
        return {
          label: "Schedule a Private Consultation",
          link: "/consultation?intent=private",
        };
      case "/field-notes":
        return { label: "Receive Field Notes", link: "#newsletter" };
      case "/consultation":
        return { label: "Select a Consultation Time", link: "#calendar" };
      default:
        return { label: "Design Your Expedition", link: "/consultation" };
    }
  };
  const { label: ctaLabel, link: ctaLink } = getCtaInfo();

  useEffect(() => {
    sanityClient
      .fetch<NavExpedition[]>(
        `*[_type == "expedition"] | order(number asc) { _id, name, slug, altitude, image }`,
      )
      .then(setExpeditions)
      .catch(() => {});
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrolled(currentScrollY > 50);
      if (hideOnScrollDown) {
        if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
          setHidden(true);
          setOpenMenu(null);
        } else {
          setHidden(false);
        }
        lastScrollY.current = currentScrollY;
      }
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(docHeight > 0 ? (currentScrollY / docHeight) * 100 : 0);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hideOnScrollDown]);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [mobileMenuOpen]);

  useEffect(() => {
    setOpenMenu(null);
  }, [location.pathname]);

  const handleMenuEnter = (menu: "about" | "expedition") => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpenMenu(menu);
  };

  const handleMenuClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpenMenu(null);
  };

  const handleNavLeave = () => {
    closeTimer.current = setTimeout(() => setOpenMenu(null), 200);
  };

  useEffect(() => {
    return () => {
      if (closeTimer.current) clearTimeout(closeTimer.current);
    };
  }, []);

  const expeditionsByTab = expeditions.filter((e) => {
    const alt = parseAltitudeM(e.altitude);
    if (expeditionTab === "8000") return alt >= 8000;
    if (expeditionTab === "7000") return alt >= 7000 && alt < 8000;
    return alt >= 6000 && alt < 7000;
  });

  const hasDarkBg = scrolled || mobileMenuOpen || openMenu !== null;

  return (
    <>
      <div
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 text-white ${
          hasDarkBg
            ? "bg-[#1A1A1A]/95 backdrop-blur-md border-b border-white/5"
            : "bg-transparent"
        } ${hidden && !mobileMenuOpen ? "-translate-y-full" : "translate-y-0"}`}
        onMouseLeave={handleNavLeave}
      >
        <nav>
          {/* Main row */}
          <div className="flex items-center justify-between px-8 pt-4 pb-1 relative">
            {/* Logo */}
            <div
              className="shrink-0 w-auto lg:w-[196px] z-50"
              onMouseEnter={handleMenuClose}
            >
              <Link
                to="/"
                onClick={() => setMobileMenuOpen(false)}
                className="block h-9 aspect-[1115.63/208]"
              >
                <ThamserkuLogo />
              </Link>
            </div>

            {/* Desktop Nav Links */}
            <div className="hidden lg:flex items-center gap-8 font-['JetBrains_Mono'] uppercase tracking-[2.4px]">
              <Link
                to="/"
                className="text-[11px] nav-link-underline hover:text-[#C8CDD2] transition-colors"
                onMouseEnter={handleMenuClose}
              >
                Home
              </Link>

              <button
                className={`text-[11px] flex items-center gap-[2px] transition-colors uppercase ${
                  openMenu === "about"
                    ? "text-[#C8CDD2] border-b border-[#C8CDD2]"
                    : "hover:text-[#C8CDD2]"
                }`}
                onMouseEnter={() => handleMenuEnter("about")}
              >
                <span>About</span>
                <ChevronDown
                  size={12}
                  strokeWidth={1.5}
                  className={`transition-transform duration-300 ${
                    openMenu === "about" ? "rotate-180" : ""
                  }`}
                />
              </button>

              <button
                className={`text-[11px] flex items-center gap-[2px] transition-colors uppercase ${
                  openMenu === "expedition"
                    ? "text-[#C8CDD2] border-b border-[#C8CDD2]"
                    : "hover:text-[#C8CDD2]"
                }`}
                onMouseEnter={() => handleMenuEnter("expedition")}
              >
                <span>Expedition</span>
                <ChevronDown
                  size={12}
                  strokeWidth={1.5}
                  className={`transition-transform duration-300 ${
                    openMenu === "expedition" ? "rotate-180" : ""
                  }`}
                />
              </button>

              <Link
                to="/editions"
                className="text-[11px] nav-link-underline hover:text-[#C8CDD2] transition-colors"
                onMouseEnter={handleMenuClose}
              >
                Editions
              </Link>

              <Link
                to="/legacy"
                className="text-[11px] nav-link-underline hover:text-[#C8CDD2] transition-colors"
                onMouseEnter={handleMenuClose}
              >
                Legacy
              </Link>
            </div>

            {/* CTA */}
            <div
              className="hidden lg:flex justify-end shrink-0"
              onMouseEnter={handleMenuClose}
            >
              <Link
                to={ctaLink}
                className={`btn-cta btn-cta-secondary border ${
                  hasDarkBg ? "border-white/50" : "border-white/30"
                } px-6 py-3.5 flex items-center justify-center font-['JetBrains_Mono'] uppercase tracking-[2.4px] text-[10px] whitespace-nowrap`}
              >
                <span>{ctaLabel}</span>
              </Link>
            </div>

            {/* Mobile Toggle */}
            <button
              className="lg:hidden z-50 p-2 -mr-2 text-white"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? (
                <X size={24} strokeWidth={1.5} />
              ) : (
                <Menu size={24} strokeWidth={1.5} />
              )}
            </button>

            {/* Scroll Progress */}
            <div
              className="absolute bottom-0 left-0 h-[2px] bg-white/40 transition-none"
              style={{ width: `${scrollProgress}%` }}
            />
          </div>
        </nav>

        {/* About Submenu */}
        <div
          className={`hidden lg:block overflow-hidden transition-[max-height,opacity] duration-300 ease-out ${
            openMenu === "about" ? "max-h-24 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="px-8 lg:px-48 pb-4 flex items-center justify-center gap-10 font-['JetBrains_Mono'] uppercase tracking-[2.4px] text-white flex-wrap">
            {ABOUT_LINKS.map((item) => (
              <Link
                key={item.label}
                to={item.href}
                className="text-[11px] nav-link-underline hover:text-[#C8CDD2] transition-colors whitespace-nowrap"
                onClick={() => setOpenMenu(null)}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Expedition Submenu */}
        <div
          className={`hidden lg:block overflow-hidden pb-2 transition-[max-height,opacity] duration-300 ease-out ${
            openMenu === "expedition"
              ? "max-h-[500px] opacity-100"
              : "max-h-0 opacity-0"
          }`}
        >
          <div className="px-8 lg:px-48 pb-6 flex flex-col gap-5">
            {/* Altitude Tabs */}
            <div className="flex items-center justify-center gap-10 font-['JetBrains_Mono'] uppercase tracking-[2.4px]">
              {(["8000", "7000", "6000"] as ExpeditionTab[]).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setExpeditionTab(tab)}
                  className={`text-[11px] transition-colors uppercase ${
                    expeditionTab === tab
                      ? "text-[#C8CDD2] underline underline-offset-[6px] decoration-[#C8CDD2]"
                      : "text-white hover:text-[#C8CDD2]"
                  }`}
                >
                  {tab}ers
                </button>
              ))}
            </div>

            {/* Expedition Cards */}
            {expeditionsByTab.length > 0 ? (
              <div className="flex gap-5 items-start w-full">
                {expeditionsByTab.slice(0, 6).map((exp) => (
                  <Link
                    key={exp._id}
                    to={`/expeditions/${exp.slug?.current}`}
                    className="flex-1 flex flex-col gap-5 items-center min-w-0 group"
                    onClick={() => setOpenMenu(null)}
                  >
                    <div className="relative w-full aspect-[3/2] overflow-hidden bg-[#2A2A2A]">
                      {exp.image && (
                        <img
                          src={urlFor(exp.image).width(400).height(267).url()}
                          alt={exp.name}
                          className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      )}
                    </div>
                    <p className="font-['JetBrains_Mono'] uppercase tracking-[2.4px] text-[11px] text-white text-center w-full group-hover:text-[#C8CDD2] transition-colors">
                      {exp.name} Expedition
                    </p>
                  </Link>
                ))}
              </div>
            ) : (
              <p className="font-['JetBrains_Mono'] uppercase tracking-[2.4px] text-[11px] text-[#C8CDD2] text-center py-4">
                No expeditions in this category
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 bg-[#1A1A1A] z-40 flex flex-col pt-[88px] px-6 pb-8 transition-transform duration-500 ease-in-out ${
          mobileMenuOpen ? "translate-x-0" : "translate-x-full"
        } lg:hidden overflow-y-auto`}
      >
        <div className="flex flex-col font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[12px] text-white">
          <Link
            to="/"
            className="hover:text-[#C8CDD2] transition-colors py-5 border-b border-white/10"
            onClick={() => setMobileMenuOpen(false)}
          >
            Home
          </Link>

          {/* About accordion */}
          <div className="border-b border-white/10">
            <button
              className="flex items-center justify-between w-full py-5 hover:text-[#C8CDD2] transition-colors"
              onClick={() =>
                setMobileExpanded(mobileExpanded === "about" ? null : "about")
              }
            >
              <span>About</span>
              <ChevronDown
                size={14}
                strokeWidth={1.5}
                className={`transition-transform duration-300 ${
                  mobileExpanded === "about" ? "rotate-180" : ""
                }`}
              />
            </button>
            {mobileExpanded === "about" && (
              <div className="flex flex-col gap-4 pb-5 pl-4 text-[11px]">
                {ABOUT_LINKS.map((item) => (
                  <Link
                    key={item.label}
                    to={item.href}
                    className="text-[#C8CDD2] hover:text-white transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Expedition accordion */}
          <div className="border-b border-white/10">
            <button
              className="flex items-center justify-between w-full py-5 hover:text-[#C8CDD2] transition-colors"
              onClick={() =>
                setMobileExpanded(
                  mobileExpanded === "expedition" ? null : "expedition",
                )
              }
            >
              <span>Expedition</span>
              <ChevronDown
                size={14}
                strokeWidth={1.5}
                className={`transition-transform duration-300 ${
                  mobileExpanded === "expedition" ? "rotate-180" : ""
                }`}
              />
            </button>
            {mobileExpanded === "expedition" && (
              <div className="flex flex-col gap-5 pb-6">
                {/* Altitude Tabs */}
                <div className="flex items-center gap-6 font-['JetBrains_Mono'] uppercase tracking-[2.4px]">
                  {(["8000", "7000", "6000"] as ExpeditionTab[]).map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setExpeditionTab(tab)}
                      className={`text-[11px] transition-colors uppercase ${
                        expeditionTab === tab
                          ? "text-[#C8CDD2] underline underline-offset-[6px] decoration-[#C8CDD2]"
                          : "text-white hover:text-[#C8CDD2]"
                      }`}
                    >
                      {tab}ers
                    </button>
                  ))}
                </div>

                {/* Expedition Cards */}
                {expeditionsByTab.length > 0 ? (
                  <div className="grid grid-cols-2 gap-4">
                    {expeditionsByTab.map((exp) => (
                      <Link
                        key={exp._id}
                        to={`/expeditions/${exp.slug?.current}`}
                        className="flex flex-col gap-2 group"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <div className="relative w-full aspect-[3/2] overflow-hidden bg-[#2A2A2A]">
                          {exp.image && (
                            <img
                              src={urlFor(exp.image)
                                .width(300)
                                .height(200)
                                .url()}
                              alt={exp.name}
                              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                          )}
                        </div>
                        <p className="font-['JetBrains_Mono'] uppercase tracking-[2.4px] text-[10px] text-white group-hover:text-[#C8CDD2] transition-colors">
                          {exp.name}
                        </p>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <p className="font-['JetBrains_Mono'] uppercase tracking-[2.4px] text-[11px] text-[#C8CDD2]">
                    No expeditions in this category
                  </p>
                )}
              </div>
            )}
          </div>

          <Link
            to="/editions"
            className="hover:text-[#C8CDD2] transition-colors py-5 border-b border-white/10"
            onClick={() => setMobileMenuOpen(false)}
          >
            Editions
          </Link>

          <Link
            to="/legacy"
            className="hover:text-[#C8CDD2] transition-colors py-5"
            onClick={() => setMobileMenuOpen(false)}
          >
            Legacy
          </Link>
        </div>

        <div className="mt-6 pb-8">
          <Link
            to={ctaLink}
            className="btn-cta btn-cta-secondary w-full border border-white/30 py-4 flex items-center justify-center font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-white"
            onClick={() => setMobileMenuOpen(false)}
          >
            <span>{ctaLabel}</span>
          </Link>
        </div>
      </div>
    </>
  );
}
