import { useEffect, useState, useRef, type CSSProperties } from "react";
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
  { label: "Achievements", href: "/heritage-and-achievements" },
  { label: "YETI INFRASTRUCTURE", href: "/yeti-infrastructure" },
];

function parseAltitudeM(alt: string): number {
  return parseFloat(alt.replace(/[^\d.]/g, "")) || 0;
}

interface NavProps {
  hideOnScrollDown?: boolean;
  /** Scroll offset treated as "page top" — e.g. the cinematic intro's height
   *  on Home, where the hero rests one viewport down. Evaluated per scroll
   *  event so it stays correct across resizes (and SSR-safe). */
  topOffset?: () => number;
  /** Home's cinematic intro choreographs the bar via [data-cinematic-nav]:
   *  hidden over scene 1, fading in with the transition. Since it only ever
   *  shows from the hero down, the dark bg is always on. Opacity is owned by
   *  GSAP, so the CSS transition must not cover it. */
  cinematic?: boolean;
}

export function Nav({
  hideOnScrollDown = true,
  topOffset,
  cinematic = false,
}: NavProps) {
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
    const expeditionMatch = location.pathname.match(/^\/expeditions\/([^/]+)/);
    return {
      label: "Design Your Expedition",
      link: expeditionMatch
        ? `/design-your-expedition?expedition=${expeditionMatch[1]}`
        : "/design-your-expedition",
    };
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
      const offset = topOffset?.() ?? 0;
      // On the cinematic Home, section 2 (the hero) is treated as the page's
      // first screen, so the bar stays transparent/black-text until you've
      // scrolled halfway through it — then it commits to the dark state. Other
      // pages flip almost immediately (50px past their top).
      const darkThreshold = cinematic
        ? offset + window.innerHeight * 0.5
        : offset + 50;
      // Hysteresis: flip to dark only past the threshold, back to transparent
      // only once BELOW it by the same band. Without this dead band, Lenis's
      // momentum settling right on the boundary toggles the state every frame —
      // read on screen as the bar flickering between its two themes.
      const band = 60;
      setScrolled((prev) =>
        currentScrollY > darkThreshold + band
          ? true
          : currentScrollY < darkThreshold - band
            ? false
            : prev,
      );
      if (hideOnScrollDown) {
        if (
          currentScrollY > lastScrollY.current &&
          currentScrollY > offset + 100
        ) {
          setHidden(true);
          setOpenMenu(null);
        } else {
          setHidden(false);
        }
        lastScrollY.current = currentScrollY;
      }
      // Progress is measured from the nav's "page top" (the cinematic hero's
      // rest position on Home), not absolute scroll 0 — so section 2 reads as
      // 0% instead of already showing a sliver of fill one viewport down.
      const progressed = Math.max(0, currentScrollY - offset);
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight - offset;
      setScrollProgress(docHeight > 0 ? (progressed / docHeight) * 100 : 0);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hideOnScrollDown, topOffset, cinematic]);

  useEffect(() => {
    // Lock scroll while the mobile menu is open. On close, CLEAR the inline
    // style (don't set "auto") — "auto" makes <body> a scroll container in both
    // axes, which surfaces a spurious horizontal scrollbar (and overrides the
    // body's overflow-x-clip). Clearing restores the default + the CSS clip.
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
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

  // Scrolled past the Hero, or the mobile overlay is up — the bar is
  // permanently in its dark, white-text state regardless of dropdowns.
  const scrolledDark = scrolled || mobileMenuOpen;
  // Home's Hero (cinematic scene 2) sits over a bright photo — while resting
  // on it (not yet scrolled away) text/logo stay black instead of the
  // white-on-dark used everywhere else. Independent of dropdown state, so
  // opening About/Expedition doesn't flip the text color mid-hover.
  const heroLight = cinematic && !scrolledDark;
  // Whether the bar (and any open dropdown, which always matches the bar)
  // renders a solid/tinted panel at all, vs. staying fully transparent.
  const showBackdrop = scrolledDark || openMenu !== null;
  // Single source of truth for the bar's panel so the bar and its dropdowns
  // never show two different backgrounds stacked on top of each other.
  // Opaque, not translucent: a translucent panel's rendered color depends on
  // whatever photo content sits behind it, and the bar sits over different
  // photo content than the taller dropdown beneath it — so even identical
  // translucent classes visibly mismatched. Solid color is position-independent.
  const barToneClass = showBackdrop
    ? heroLight
      ? "bg-white"
      : "bg-[#1A1A1A]"
    : "bg-transparent";
  const navHoverClass = heroLight ? "hover:text-black/55" : "hover:text-[#C8CDD2]";
  // On the cinematic nav the light↔dark theme flip must be instant (see the
  // bar's transition note): a link's own `transition-colors` would otherwise
  // animate its inherited black↔white through grey and reintroduce the flicker.
  // Elsewhere text is always white, so the flip never fires — keep the smooth
  // hover fade there.
  const navColorTransition = cinematic ? "" : "transition-colors";
  const navActiveClass = heroLight
    ? "text-black/70 border-b border-black/70"
    : "text-[#C8CDD2] border-b border-[#C8CDD2]";
  const submenuAccentClass = heroLight ? "text-black/55" : "text-[#C8CDD2]";
  const submenuCardHoverClass = heroLight
    ? "group-hover:text-black/55"
    : "group-hover:text-[#C8CDD2]";

  return (
    <>
      <div
        data-cinematic-nav={cinematic ? "" : undefined}
        // w-screen (100vw), not w-full: the cinematic intro stops Lenis, which
        // toggles <html> between `overflow: clip` (no scrollbar) and `visible`
        // (scrollbar) at the section-2 hand-off. With w-full the fixed bar
        // reflows by the scrollbar width — the hamburger lurches ~15-20px right
        // and settles a beat later. 100vw is measured against the scrollbar-
        // inclusive viewport, so it stays put across the toggle. (body has
        // overflow-x-clip, so 100vw never spawns a horizontal scrollbar.)
        className={`fixed top-0 left-0 w-screen z-50 ${
          cinematic
            ? "transition-[translate,background-color]" // The BACKGROUND fades smoothly (browsers interpolate transparent↔solid via premultiplied alpha, so it's a clean panel fade-in, no mud). `color` is deliberately EXCLUDED so the text snaps black↔white instead of passing through grey — that grey midpoint over the half-formed bar was the section-2 flicker. Links snap their color too (see navColorTransition).
            : "transition-all"
        } duration-500 ${heroLight ? "text-black" : "text-white"} ${barToneClass} ${
          hidden && !mobileMenuOpen ? "-translate-y-full" : "translate-y-0"
        }`}
        onMouseLeave={handleNavLeave}
      >
        <nav>
          {/* Main row */}
          <div className="flex items-center justify-between px-8 pt-4 pb-1">
            {/* Logo */}
            <div
              className="shrink-0 w-auto lg:w-[196px] z-50"
              onMouseEnter={handleMenuClose}
              style={{ "--fill-0": heroLight ? "#111111" : "#ffffff" } as CSSProperties}
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
            <div className="hidden lg:flex items-center gap-8 font-['DM_Mono'] uppercase tracking-[2.4px]">
              <Link
                to="/"
                className={`text-[11px] nav-link-underline ${navHoverClass} ${navColorTransition}`}
                onMouseEnter={handleMenuClose}
              >
                Home
              </Link>

              <button
                className={`text-[11px] flex items-center gap-[2px] ${navColorTransition} uppercase ${
                  openMenu === "about" ? navActiveClass : navHoverClass
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
                className={`text-[11px] flex items-center gap-[2px] ${navColorTransition} uppercase ${
                  openMenu === "expedition" ? navActiveClass : navHoverClass
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
                className={`text-[11px] nav-link-underline ${navHoverClass} ${navColorTransition}`}
                onMouseEnter={handleMenuClose}
              >
                Editions
              </Link>

              <Link
                to="/safety"
                className={`text-[11px] nav-link-underline ${navHoverClass} ${navColorTransition}`}
                onMouseEnter={handleMenuClose}
              >
                Safety
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
                  heroLight
                    ? "border-black/30"
                    : showBackdrop
                      ? "border-white/50"
                      : "border-white/30"
                } px-6 py-3.5 flex items-center justify-center font-['DM_Mono'] uppercase tracking-[2.4px] text-[10px] whitespace-nowrap`}
              >
                <span>{ctaLabel}</span>
              </Link>
            </div>

            {/* Mobile Toggle */}
            <button
              className="lg:hidden z-50 p-2 -mr-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? (
                <X size={24} strokeWidth={1.5} />
              ) : (
                <Menu size={24} strokeWidth={1.5} />
              )}
            </button>

          </div>
        </nav>

        {/* About Submenu — backdrop mirrors the bar's current light/dark
            state so opening it doesn't have to flip the bar above it.
            grid-template-rows 0fr/1fr (not max-height) so the reveal tracks
            the content's actual height instead of animating toward an
            arbitrary max-h guess. */}
        <div
          className={`hidden lg:grid overflow-hidden transition-[grid-template-rows] duration-300 ease-out ${barToneClass} ${
            openMenu === "about" ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
          }`}
        >
          <div className="min-h-0 overflow-hidden">
            <div className="px-8 lg:px-48 pb-4 flex items-center justify-center gap-10 font-['DM_Mono'] uppercase tracking-[2.4px] flex-wrap">
              {ABOUT_LINKS.map((item) => (
                <Link
                  key={item.label}
                  to={item.href}
                  className={`text-[11px] nav-link-underline transition-colors whitespace-nowrap ${navHoverClass}`}
                  onClick={() => setOpenMenu(null)}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Expedition Submenu — same own-backdrop and grid-rows reasoning as About. */}
        <div
          className={`hidden lg:grid overflow-hidden transition-[grid-template-rows] duration-300 ease-out ${barToneClass} ${
            openMenu === "expedition" ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
          }`}
        >
          {/* pb-8 (not pb-6 + pb-2 split across this div and the collapsing
              wrapper) — fixed padding on the 0fr/1fr wrapper itself can't be
              clipped by overflow-hidden, so it always renders even at 0fr and
              stops the row from ever fully collapsing. */}
          <div className="min-h-0 overflow-hidden">
            <div className="px-8 lg:px-48 pb-8 flex flex-col gap-5">
              {/* Altitude Tabs */}
              <div className="flex items-center justify-center gap-10 font-['DM_Mono'] uppercase tracking-[2.4px]">
                {(["8000", "7000", "6000"] as ExpeditionTab[]).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setExpeditionTab(tab)}
                    className={`text-[11px] transition-colors uppercase ${
                      expeditionTab === tab
                        ? `${submenuAccentClass} underline underline-offset-[6px] ${heroLight ? "decoration-black/55" : "decoration-[#C8CDD2]"}`
                        : navHoverClass
                    }`}
                  >
                    <span className="normal-case">{Number(tab).toLocaleString()}ers</span>
                  </button>
                ))}
              </div>

              {/* Expedition Cards */}
              {expeditionsByTab.length > 0 ? (
                <div className="flex justify-center gap-5 items-start w-full">
                  {expeditionsByTab.slice(0, 6).map((exp) => (
                    <Link
                      key={exp._id}
                      to={`/expeditions/${exp.slug?.current}`}
                      className="flex-[0_0_calc((100%-100px)/6)] flex flex-col gap-5 items-center min-w-0 group"
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
                      <p className={`font-['DM_Mono'] uppercase tracking-[2.4px] text-[11px] text-center w-full transition-colors ${submenuCardHoverClass}`}>
                        {exp.name}
                      </p>
                    </Link>
                  ))}
                </div>
              ) : (
                <p className={`font-['DM_Mono'] uppercase tracking-[2.4px] text-[11px] text-center py-4 ${submenuAccentClass}`}>
                  No expeditions in this category
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Scroll Progress */}
        {showBackdrop && (
          <div className="absolute bottom-0 left-0 w-full h-[1px] bg-white/5" />
        )}
        <div
          className={`absolute bottom-0 left-0 h-[1px] transition-none ${
            heroLight ? "bg-black/30" : "bg-white/40"
          }`}
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 bg-[#1A1A1A] z-40 flex flex-col pt-[88px] px-6 pb-8 transition-transform duration-500 ease-in-out ${
          mobileMenuOpen ? "translate-x-0" : "translate-x-full"
        } lg:hidden overflow-y-auto`}
      >
        <div className="flex flex-col font-['DM_Mono'] uppercase tracking-[0.22em] text-[13px] text-white">
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
                <div className="flex items-center gap-6 font-['DM_Mono'] uppercase tracking-[2.4px]">
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
                      <span className="normal-case">{Number(tab).toLocaleString()}ers</span>
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
                        <p className="font-['DM_Mono'] uppercase tracking-[2.4px] text-[11px] text-white group-hover:text-[#C8CDD2] transition-colors">
                          {exp.name}
                        </p>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <p className="font-['DM_Mono'] uppercase tracking-[2.4px] text-[11px] text-[#C8CDD2]">
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
            to="/safety"
            className="hover:text-[#C8CDD2] transition-colors py-5"
            onClick={() => setMobileMenuOpen(false)}
          >
            Safety
          </Link>
        </div>

        <div className="mt-6 pb-8">
          <Link
            to={ctaLink}
            className="btn-cta btn-cta-secondary w-full border border-white/30 py-4 flex items-center justify-center font-['DM_Mono'] uppercase tracking-[0.22em] text-[11px] text-white"
            onClick={() => setMobileMenuOpen(false)}
          >
            <span>{ctaLabel}</span>
          </Link>
        </div>
      </div>
    </>
  );
}
