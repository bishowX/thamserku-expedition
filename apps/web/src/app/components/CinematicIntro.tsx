import { useRef, type ReactNode } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Observer } from "gsap/Observer";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { getLenis } from "../hooks/useLenis";
import { heroSrcSet, HERO_SIZES } from "../../lib/heroImage";
import ThamserkuLogo from "./logo/ThamserkuLogo";
import "./cinematic-intro.css";

gsap.registerPlugin(Observer, ScrollTrigger);

// Incoming photo settles from this push-in while its text descends out of
// the cloud band into place (reference: playground/scroll/src/observer.ts).
const PHOTO_ZOOM = 1.65;
const DURATION = 1.55;
const EASE = "power2.inOut";

type IntroState = "intro" | "transitioning" | "hero";

/**
 * Faithful port of the reference two-scene snap transition (observer.ts).
 * Scene 1 and the Hero (children) live on one in-flow track; a committed
 * timeline slides the track one viewport while the hero photo settles from
 * 1.65 -> 1 and its text descends from the top into rest at center — pure
 * translation, no scaling. A cloud seam straddles the boundary with a
 * slight lead.
 *
 * Scroll hand-off: during the intro Lenis is stopped and an Observer owns the
 * gestures. When the transition completes, the track transform is swapped for
 * a real scroll position (visually identical), so native scrolling continues
 * into the page — and the seam, sitting in flow, scrolls away naturally.
 * Scrolling back up to the hero re-engages the committed reverse.
 */
export function CinematicIntro({ children }: { children: ReactNode }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const scene1Ref = useRef<HTMLElement>(null);
  const logoWrapRef = useRef<HTMLDivElement>(null);
  const hintRef = useRef<HTMLDivElement>(null);
  const seamRef = useRef<HTMLDivElement>(null);
  const advanceRef = useRef<() => void>(() => {});

  useGSAP(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // Mobile keeps the same gesture-captured ceremony, tuned for touch:
    // a committed swipe is snappier (shorter timeline) and the gesture
    // thresholds are raised so a stray finger drag can't advance/reverse the
    // scene the way a hair-trigger wheel tolerance would.
    const isMobile = window.matchMedia("(max-width: 767px)").matches;
    const dur = isMobile ? 1.25 : DURATION;
    const forwardTolerance = isMobile ? 35 : 10;
    const returnTolerance = isMobile ? 24 : 1;

    const track = trackRef.current;
    const scene1 = scene1Ref.current;
    const seam = seamRef.current;
    const heroZoom = document.querySelector("[data-cinematic-zoom]");
    const heroContent = document.querySelector("[data-cinematic-content]");
    const heroSub = document.querySelector("[data-cinematic-sub]");
    // Nav belongs to scene 2: hidden over the intro, sliding down from the
    // top edge with the settling hero. GSAP owning any transform pins the
    // standalone `translate` property to none inline, which would kill the
    // hide-on-scroll Tailwind classes — so ownership is released (clearProps)
    // whenever the hero state settles.
    const nav = document.querySelector("[data-cinematic-nav]");
    const NAV_CLEAR = "transform,translate,rotate,scale";
    function releaseNav() {
      if (nav) gsap.set(nav, { clearProps: NAV_CLEAR });
    }
    if (!track || !scene1 || !seam || !heroZoom || !heroContent) return;

    // The slide distance is scene 1's real height — robust against
    // vh/innerHeight mismatches (mobile URL bars) and resizes.
    const DIST = () => scene1.offsetHeight;

    // The hero text's drop must EXCEED the track slide for its on-screen
    // motion to read as downward — anything smaller just gets absorbed into
    // the page rising underneath it. The surplus (0.35 · DIST) is the visible
    // descent: the text emerges from the cloud band at the hero's top edge
    // (overflow-hidden clips it until then) and settles down into center.
    const CONTENT_DROP = () => Math.round(DIST() * 1.35);

    let state: IntroState = "intro";
    let tl: gsap.core.Timeline | null = null;
    let observer: Observer | null = null; // blocks scroll during intro + transition
    let heroObserver: Observer | null = null; // passive watcher for the return gesture
    let lenisRetry: ReturnType<typeof setTimeout> | null = null;

    // This layout effect runs before root's useLenis() regular effect, so
    // getLenis() can be null on first engage — retry until Lenis exists.
    function lockScroll() {
      if (lenisRetry) clearTimeout(lenisRetry);
      lenisRetry = null;
      const lenis = getLenis();
      if (lenis) {
        lenis.stop();
      } else if (state !== "hero") {
        lenisRetry = setTimeout(lockScroll, 50);
      }
    }

    function unlockScroll() {
      if (lenisRetry) clearTimeout(lenisRetry);
      lenisRetry = null;
      getLenis()?.start();
    }

    function scrollToImmediate(y: number) {
      const lenis = getLenis();
      if (lenis) {
        lenis.scrollTo(y, { immediate: true, force: true });
      } else {
        window.scrollTo(0, y);
      }
    }

    // Pose the hero as the covered scene while the intro is up.
    function introPose() {
      gsap.set(heroZoom, { scale: PHOTO_ZOOM, transformOrigin: "50% 38%" });
      gsap.set(heroContent, { y: -CONTENT_DROP(), yPercent: 0 });
      if (heroSub) gsap.set(heroSub, { autoAlpha: 0 });
      if (nav) gsap.set(nav, { autoAlpha: 0, yPercent: -100 });
    }

    // Everything at rest in the settled-hero state (also the skip target).
    function settle() {
      gsap.set(track, { y: 0 });
      gsap.set(scene1, { scale: 1 });
      gsap.set(logoWrapRef.current, { yPercent: 0, autoAlpha: 1 });
      gsap.set(hintRef.current, { autoAlpha: 1 });
      gsap.set(seam, { yPercent: -12 });
      gsap.set(heroZoom, { scale: 1 });
      gsap.set(heroContent, { y: 0, yPercent: 0 });
      if (heroSub) gsap.set(heroSub, { autoAlpha: 1 });
      if (nav) gsap.set(nav, { autoAlpha: 1, clearProps: NAV_CLEAR });
    }

    // Ambient fog drift now lives in CSS (transform keyframes on the fog
    // layers' ::before sprites) — composited on the GPU and auto-throttled by
    // the browser when the scene scrolls off-screen, instead of a JS tween
    // repainting blurred layers every frame forever.

    // ---- committed transitions (fresh timeline per gesture, like the
    // reference's gotoScene — always built with the current viewport size)

    function goForward() {
      if (state !== "intro" || tl?.isActive()) return;
      state = "transitioning";
      tl = gsap.timeline({
        defaults: { duration: dur, ease: EASE },
        onComplete: () => enterHeroState(true),
      });
      // the page itself slides one viewport
      tl.to(track, { y: -DIST() }, 0);
      // the seam cloud travels a bit faster than the page (parallax)
      tl.to(seam, { yPercent: -12 }, 0);
      // outgoing scene pushes in; its logo sinks behind the ridge and fades
      tl.to(scene1, { scale: 1.08 }, 0);
      tl.to(logoWrapRef.current, { yPercent: 38 }, 0);
      // the logo stays visible while it sinks, then dissolves into the cloud
      // band as it sweeps across — mirroring the reverse's late fade-in
      tl.to(
        logoWrapRef.current,
        { autoAlpha: 0, duration: 0.8, ease: "power1.in" },
        0.5,
      );
      tl.to(hintRef.current, { autoAlpha: 0, duration: 0.4 }, 0);
      // incoming photo settles out of the push-in while the text (a sibling
      // of the zoom wrapper — it never scales) comes down from the top,
      // dropping out of the clouds into its rest at center
      tl.fromTo(heroZoom, { scale: PHOTO_ZOOM }, { scale: 1 }, 0);
      tl.fromTo(heroContent, { y: -CONTENT_DROP() }, { y: 0 }, 0);
      if (heroSub) {
        tl.fromTo(
          heroSub,
          { autoAlpha: 0 },
          { autoAlpha: 1, duration: 0.7 },
          0.9,
        );
      }
      // the nav belongs to scene 2 — it slides down from the top edge as the
      // hero settles, same motion as its own hide-on-scroll behavior
      if (nav) {
        tl.fromTo(
          nav,
          { yPercent: -100, autoAlpha: 0 },
          { yPercent: 0, duration: 0.85 },
          0.7,
        );
        tl.to(nav, { autoAlpha: 1, duration: 0.5, ease: "power1.out" }, 0.7);
      }
    }
    advanceRef.current = goForward;

    function goBack() {
      if (state !== "hero" || tl?.isActive()) return;
      state = "transitioning";
      heroObserver?.kill();
      heroObserver = null;
      window.removeEventListener("scroll", onHeroScroll);
      window.removeEventListener("wheel", onHeroWheel);
      lockScroll();
      createBlockingObserver();
      // swap real scroll back into a track transform: content at document
      // offset d renders at d - scrollY, so after scroll resets to 0 the
      // track must carry the full -scrollY to keep the same frame on screen
      gsap.set(track, { y: -window.scrollY });
      scrollToImmediate(0);
      tl = gsap.timeline({
        defaults: { duration: dur, ease: EASE },
        onComplete: enterIntroState,
      });
      // .to() everywhere: the reverse continues from whatever state the
      // forward pass (or a mid-scroll re-engage) left the layers in
      tl.to(track, { y: 0 }, 0);
      tl.to(seam, { yPercent: 0 }, 0);
      tl.to(scene1, { scale: 1 }, 0);
      tl.to(logoWrapRef.current, { yPercent: 0 }, 0);
      tl.to(logoWrapRef.current, { autoAlpha: 1, duration: 0.7 }, 0.4);
      tl.to(hintRef.current, { autoAlpha: 1, duration: 0.4 }, 1.0);
      // hero pushes back in; its text lifts up and away into the clouds
      tl.to(heroZoom, { scale: PHOTO_ZOOM }, 0);
      tl.to(heroContent, { y: -CONTENT_DROP() }, 0);
      if (heroSub) tl.to(heroSub, { autoAlpha: 0, duration: 0.5 }, 0);
      if (nav) {
        tl.to(nav, { yPercent: -100, duration: 0.7 }, 0);
        tl.to(nav, { autoAlpha: 0, duration: 0.55, ease: "power1.in" }, 0);
      }
    }

    function createBlockingObserver() {
      if (observer) return;
      observer = Observer.create({
        type: "wheel,touch,pointer",
        wheelSpeed: -1,
        tolerance: forwardTolerance,
        preventDefault: true,
        onUp: goForward, // with wheelSpeed -1 this is scroll-down intent
      });
    }

    // ---- states

    function enterIntroState() {
      state = "intro";
      lockScroll();
      createBlockingObserver();
      window.addEventListener("scroll", onIntroScroll);
    }

    function enterHeroState(swap: boolean) {
      state = "hero";
      observer?.kill();
      observer = null;
      window.removeEventListener("scroll", onIntroScroll);
      if (swap) {
        // swap the track transform for a real scroll position — visually
        // identical, and native scrolling continues from here
        gsap.set(track, { y: 0 });
        scrollToImmediate(DIST());
      }
      // hand the nav's transform back to its hide-on-scroll classes
      releaseNav();
      unlockScroll();
      requestAnimationFrame(() => ScrollTrigger.refresh());
      window.addEventListener("scroll", onHeroScroll);
      // wheel is handled synchronously (see onHeroWheel) so the reverse
      // engages in the same event that would have scrolled — Lenis never
      // gets a head start and the hand-off doesn't stutter
      window.addEventListener("wheel", onHeroWheel, { passive: false });
      heroObserver = Observer.create({
        type: "touch", // swipes; wheel goes through onHeroWheel
        wheelSpeed: -1,
        tolerance: returnTolerance,
        preventDefault: false, // passive — Lenis keeps full control
        onDown: () => {
          if (state === "hero" && window.scrollY <= DIST() + 2) goBack();
        },
      });
    }

    // Nothing can preventDefault a native scrollbar drag — if the page moved
    // while the intro or a transition is engaged, settle instantly and hand
    // over to native scrolling at the dragged position.
    function onIntroScroll() {
      if (state === "hero" || window.scrollY <= 2) return;
      tl?.kill();
      tl = null;
      settle();
      enterHeroState(false);
    }

    // Momentum, scrollbar or keyboard scrolling that crosses above the hero's
    // top re-engages the committed reverse.
    function onHeroScroll() {
      if (state === "hero" && window.scrollY < DIST() - 2) goBack();
    }

    // An upward wheel at the hero's rest position commits the reverse
    // immediately — same task as the event, before Lenis's next raf tick.
    function onHeroWheel(e: WheelEvent) {
      if (state === "hero" && e.deltaY < 0 && window.scrollY <= DIST() + 2) {
        e.preventDefault();
        goBack();
      }
    }

    function onKeyDown(e: KeyboardEvent) {
      if (state === "intro") {
        if (["ArrowDown", "PageDown", " ", "End"].includes(e.key)) {
          e.preventDefault();
          goForward();
        } else if (["ArrowUp", "PageUp", "Home"].includes(e.key)) {
          e.preventDefault(); // nothing above scene 1
        }
      } else if (state === "hero") {
        if (
          ["ArrowUp", "PageUp", "Home"].includes(e.key) &&
          window.scrollY <= DIST() + 2
        ) {
          e.preventDefault();
          goBack();
        }
      } else if (e.key === "Escape") {
        tl?.timeScale(4); // skip affordance — jump to the end of the motion
      }
    }
    document.addEventListener("keydown", onKeyDown);

    if (window.scrollY > 2 || window.location.hash) {
      // Restored mid-page or anchor navigation: skip the ceremony entirely.
      settle();
      enterHeroState(false);
    } else {
      introPose();
      enterIntroState();
    }

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("scroll", onIntroScroll);
      window.removeEventListener("scroll", onHeroScroll);
      window.removeEventListener("wheel", onHeroWheel);
      tl?.kill();
      observer?.kill();
      heroObserver?.kill();
      // Never leave the site scroll-dead when unmounting mid-intro.
      unlockScroll();
    };
  });

  return (
    <div ref={trackRef} className="relative overflow-x-clip will-change-transform">
      <section
        ref={scene1Ref}
        aria-hidden
        className="cinematic-intro relative h-screen overflow-hidden"
        onClick={() => advanceRef.current()}
      >
        <picture className="contents">
          <source
            type="image/avif"
            srcSet={heroSrcSet("/images/hero-cinematic-1.jpg", "avif")}
            sizes={HERO_SIZES}
          />
          <source
            type="image/webp"
            srcSet={heroSrcSet("/images/hero-cinematic-1.jpg", "webp")}
            sizes={HERO_SIZES}
          />
          <img
            src="/images/hero-cinematic-1.jpg"
            alt=""
            className="absolute inset-0 w-full h-full object-cover object-[50%_58%]"
          />
        </picture>
        <div className="ci-fog-back z-[2]" />
        <div
          ref={logoWrapRef}
          className="absolute inset-0 z-[3] grid place-items-center will-change-transform"
        >
          <div className="w-[clamp(260px,64vw,1000px)] aspect-[1115.63/208] -translate-y-[8vh] [filter:drop-shadow(0_4px_16px_rgba(0,0,0,0.35))]">
            <ThamserkuLogo />
          </div>
        </div>
        <div className="ci-haze-bottom z-[5]" />
        <div className="ci-fog-front z-[5]" />
        <div
          ref={hintRef}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 z-[6] font-['DM_Mono'] uppercase tracking-[0.3em] text-[11px] text-white/70"
        >
          scroll
        </div>
      </section>

      {children}

      {/* soft haze baked onto the hero's top edge (reference scene 2's
          haze.top) so the boundary never shows a hard white-to-photo cut */}
      <div className="cinematic-seam ci-haze-top absolute left-0 right-0 top-[100vh] h-[34vh] z-10 pointer-events-none" />

      {/* cloud band straddling the boundary between the two scenes — in flow,
          so after the hand-off it scrolls away with the page */}
      <div
        ref={seamRef}
        className="cinematic-seam absolute left-[-5%] right-[-5%] top-[62vh] h-[76vh] z-20 pointer-events-none will-change-transform"
      >
        <div className="ci-puff-a" />
        <div className="ci-puff-b" />
        <div className="ci-puff-c" />
        <div className="ci-seam-core" />
      </div>
    </div>
  );
}
