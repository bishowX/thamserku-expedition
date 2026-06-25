import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { stegaClean } from "@sanity/client/stega";
import type { EncodeDataAttributeCallback } from "@sanity/react-loader";
import type {
  AchievementsPageData,
  AchievementDecade,
} from "../../../lib/queries";
import { urlFor } from "../../../lib/sanity";
import { ImageWithFallback } from "../figma/ImageWithFallback";

gsap.registerPlugin(ScrollTrigger);

type PageData = AchievementsPageData["achievementsPage"];

const ROMAN = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X"];

const DEFAULT_DECADES: AchievementDecade[] = [
  {
    _key: "1",
    years: "1987 – 1992",
    title: "Founding Years",
    body: "Thamserku Expedition launched in 1987 with expeditions to Dhaulagiri I, Pumori, and Sita Chuchura — immediately signalling intent to operate at the highest technical levels of Himalayan mountaineering.\n\nIn its very first year, the company facilitated Marc Batard's record-breaking speed ascent of Everest — the fastest ever recorded — and his achievement of summiting four 8,000m peaks in under nine months. The founding years established the operational framework across the Khumbu Himal that would define the company for generations.",
    meta: "17 expeditions · Dhaulagiri, Pumori, Everest, Makalu, Baruntse",
  },
  {
    _key: "2",
    years: "1993 – 2001",
    title: "Growth and Diversification",
    body: "The decade saw Thamserku expand dramatically — adding Cho Oyu (which would become the single most operated peak with 217 expeditions), Kangchenjunga, Nuptse, Tilicho, Putha Hiunchuli, Manaslu, Himlung Himal, and numerous technical objectives across all major regions.\n\n1993: Pasang Lhamu Sherpa becomes the first Nepalese woman to summit Everest — a defining moment for Nepali mountaineering. 1996: Hans Kammerlander completes the first ski descent from Everest's summit. 2000: Jean-Christophe Lafaille's first solo ascent of Manaslu. 2001: First paragliding descent from Everest's summit.",
    meta: "160+ expeditions · 25+ distinct peaks",
  },
  {
    _key: "3",
    years: "2002 – 2011",
    title: "The Peak Years",
    body: "The highest operational volume decade — peaking at 78 expeditions in 2006 alone. Cho Oyu dominated with 20+ simultaneous or sequential expeditions per season, while Everest operations grew in scope and international reach.\n\n2003: Juanito Oiarzabal becomes the first person to summit all fourteen 8,000ers 20 times under Thamserku support. 2004: First Greek citizen on Everest. 2005: First Muslim woman on Everest. 2006: First Philippines expedition, first British couple together, first Type 1 diabetic on the summit. 2009: Piano at 7,400m on Cho Oyu.",
    meta: "444 expeditions · Peak: 78 in 2006",
  },
  {
    _key: "4",
    years: "2012 – Present",
    title: "Selective Excellence",
    body: "A deliberate shift toward fewer expeditions with greater depth of service — reflecting evolving industry standards and a more discerning international client base. The company continued supporting significant expeditions through the 2020s, including notable ascents on Everest in 2022.\n\nThis era represents the transition to the current Thamserku identity: the five-Edition architecture, the focus on luxury expedition experiences, and the integration with the broader Thamserku Group ecosystem (Yeti Airlines, Tara Air, Mountain Lodges of Nepal).",
    meta: "Quality over quantity · New brand architecture",
  },
];

function getNavOffset() {
  const nav = document.querySelector("nav")?.closest<HTMLElement>(".fixed");
  return nav?.offsetHeight ?? 72;
}

function stylePinSpacer(pin: HTMLElement) {
  const spacer = pin.parentElement;
  if (!spacer?.classList.contains("pin-spacer")) return;
  spacer.style.background = "#1A1A1A";
  spacer.style.overflow = "hidden";
  spacer.style.width = "100%";
  spacer.style.maxWidth = "100%";
}

export function AchievementsDecades({
  page,
  encodeDataAttribute,
}: {
  page?: PageData;
  encodeDataAttribute?: EncodeDataAttributeCallback;
}) {
  const decades = page?.decades?.length ? page.decades : DEFAULT_DECADES;
  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const leadingSpacerRef = useRef<HTMLDivElement>(null);
  const trailingSpacerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const pin = pinRef.current!;
      const viewport = viewportRef.current!;
      const track = trackRef.current!;
      const leadingSpacer = leadingSpacerRef.current!;
      const trailingSpacer = trailingSpacerRef.current!;

      const syncLayout = () => {
        const viewportWidth = viewport.clientWidth;
        const firstCard = track.querySelector<HTMLElement>(".timeline-card");
        const cardWidth = firstCard?.offsetWidth ?? 380;
        const spacerWidth = Math.max(0, (viewportWidth - cardWidth) / 2);

        leadingSpacer.style.width = `${spacerWidth}px`;
        trailingSpacer.style.width = `${spacerWidth}px`;

        const cards = track.querySelectorAll<HTMLElement>(".timeline-card");
        let maxCardHeight = 0;
        cards.forEach((card) => {
          maxCardHeight = Math.max(maxCardHeight, card.offsetHeight);
        });

        const navOffset = getNavOffset();
        const availableHeight = window.innerHeight - navOffset;
        pin.style.minHeight = `${Math.max(maxCardHeight, availableHeight)}px`;
      };

      const getScrollAmount = () => {
        const viewportWidth = viewport.clientWidth;
        const trackWidth = track.scrollWidth;
        return viewportWidth >= trackWidth ? 0 : -(trackWidth - viewportWidth);
      };

      const mm = gsap.matchMedia();
      mm.add("(min-width: 768px)", () => {
        syncLayout();
        gsap.set(track, { x: 0 });

        const cards = track.querySelectorAll<HTMLElement>(".timeline-card");
        let maxCardHeight = 0;
        cards.forEach((card) => {
          maxCardHeight = Math.max(maxCardHeight, card.offsetHeight);
        });

        const navOffset = getNavOffset();
        const availableHeight = window.innerHeight - navOffset;
        const scrollDistance = Math.abs(getScrollAmount());

        if (scrollDistance <= 0 || maxCardHeight > availableHeight * 0.95) {
          return;
        }

        gsap.to(track, {
          x: getScrollAmount,
          ease: "none",
          scrollTrigger: {
            trigger: pin,
            start: () => `top ${getNavOffset()}`,
            end: () => `+=${scrollDistance}`,
            pin: true,
            pinSpacing: true,
            scrub: true,
            invalidateOnRefresh: true,
            onEnter: () => stylePinSpacer(pin),
            onEnterBack: () => stylePinSpacer(pin),
            onRefresh: () => {
              syncLayout();
              gsap.set(track, { x: 0 });
              stylePinSpacer(pin);
            },
          },
        });
      });

      ScrollTrigger.addEventListener("refreshInit", syncLayout);
      return () =>
        ScrollTrigger.removeEventListener("refreshInit", syncLayout);
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      className="w-full overflow-hidden bg-[#1A1A1A] text-white py-24"
    >
      <div
        ref={pinRef}
        className="relative w-full min-w-0 overflow-hidden md:flex md:items-center"
      >
        <div
          ref={viewportRef}
          className="w-full min-w-0 overflow-x-auto overflow-y-hidden md:overflow-x-hidden max-md:snap-x max-md:snap-mandatory max-md:px-5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          <div
            ref={trackRef}
            className="flex w-max items-stretch gap-10 md:gap-24 will-change-transform"
          >
            <div
              ref={leadingSpacerRef}
              className="hidden md:block shrink-0"
              aria-hidden
            />

            {decades.map((decade, idx) => {
              const paragraphs = stegaClean(decade.body ?? "")
                .split(/\n\s*\n/)
                .filter(Boolean);
              const imageSrc = decade.image
                ? urlFor(decade.image).width(680).height(510).fit("crop").url()
                : null;
              const roman = ROMAN[idx] ?? String(idx + 1);

              return (
                <div
                  key={decade._key}
                  className="timeline-card flex flex-col gap-6 shrink-0 w-[min(320px,82vw)] md:w-[380px] max-md:snap-start bg-[#1A1A1A]"
                >
                  <div className="h-[200px] md:h-[clamp(190px,26vh,255px)] w-full shrink-0 overflow-hidden bg-[#2A2A2A]">
                    {imageSrc ? (
                      <ImageWithFallback
                        src={imageSrc}
                        alt={decade.title}
                        loading="lazy"
                        className="w-full h-full object-cover"
                      />
                    ) : null}
                  </div>

                  <div className="flex flex-col gap-4 px-2">
                    <span className="font-['DM_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#C8CDD2]">
                      CHAPTER {roman} · {decade.years}
                    </span>
                    <h3 className="font-['Fraunces'] font-normal text-display-m text-white">
                      {decade.title}
                    </h3>

                    {paragraphs.length > 0 && (
                      <div
                        className="flex flex-col gap-[24.375px]"
                        data-sanity={encodeDataAttribute?.([
                          "achievementsPage",
                          "decades",
                          idx,
                          "body",
                        ])}
                      >
                        {paragraphs.map((para, i) => (
                          <p
                            key={i}
                            className="font-['DM_Sans'] font-light text-body leading-[24.375px] text-[#C8CDD2]"
                          >
                            {para}
                          </p>
                        ))}
                      </div>
                    )}

                    {decade.meta && (
                      <span className="font-['DM_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#C8CDD2]">
                        {decade.meta}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}

            <div
              ref={trailingSpacerRef}
              className="hidden md:block shrink-0"
              aria-hidden
            />
          </div>
        </div>
      </div>
    </section>
  );
}
