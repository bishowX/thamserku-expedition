import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import terrainBg from "../../../assets/terrain-bg.svg";

gsap.registerPlugin(ScrollTrigger);

type Waypoint = { name: string; altitude: string };

type Props = {
  waypoints?: Waypoint[];
  routeHeadline?: string;
  routeHeadlineSuffix?: string;
  routePhilosophy?: string;
  acclimatisationNote?: string;
  summitWindowNote?: string;
};

const SVG_W = 1440;
const SVG_H = 650;
const PAD_X = 48;
const PAD_Y_TOP = 130;
const PAD_Y_BOT = 60;

function parseAlt(s: string): number {
  return parseFloat(s.replace(/[^\d.]/g, "")) || 0;
}

function smoothPath(pts: { x: number; y: number }[]): string {
  if (pts.length < 2) return "";
  let d = `M ${pts[0].x},${pts[0].y}`;
  for (let i = 1; i < pts.length; i++) {
    const p0 = pts[i - 1];
    const p1 = pts[i];
    const cp1x = p0.x + (p1.x - p0.x) / 3;
    const cp2x = p1.x - (p1.x - p0.x) / 3;
    d += ` C ${cp1x},${p0.y} ${cp2x},${p1.y} ${p1.x},${p1.y}`;
  }
  return d;
}

export function RouteMap({
  waypoints,
  routeHeadline,
  routeHeadlineSuffix,
  routePhilosophy,
  acclimatisationNote,
  summitWindowNote,
}: Props) {
  const points = waypoints ?? [];
  const alts = points.map((wp) => parseAlt(wp.altitude));
  const minAlt = alts.length > 0 ? Math.min(...alts) : 0;
  const maxAlt = alts.length > 0 ? Math.max(...alts) : 1;
  const altRange = maxAlt - minAlt || 1;
  const chartW = SVG_W - PAD_X * 2;
  const chartH = SVG_H - PAD_Y_TOP - PAD_Y_BOT;
  const n = points.length;

  const headline =
    routeHeadline?.trim() ||
    (n > 0
      ? [
          `From ${points[0].name} to the summit.`,
          routeHeadlineSuffix?.trim() || `${n} points on the line.`,
        ].join(" ")
      : "The route.");

  const coords = points.map((wp, idx) => {
    const x = PAD_X + (n > 1 ? (idx / (n - 1)) * chartW : chartW / 2);
    const y = PAD_Y_TOP + chartH - ((alts[idx] - minAlt) / altRange) * chartH;
    return {
      x,
      y,
      name: wp.name,
      altitude: wp.altitude,
      isSummit: idx === n - 1,
    };
  });

  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const pathRef = useRef<SVGPathElement>(null);

  useGSAP(
    () => {
      const stage = stageRef.current;
      if (!stage || n < 2) return;

      const mm = gsap.matchMedia();

      // Mobile: ascent-ladder rows fade up as they enter the viewport.
      mm.add(
        "(max-width: 767px) and (prefers-reduced-motion: no-preference)",
        () => {
          const rows = gsap.utils.toArray<HTMLElement>(".rm-ladder-row", stage);
          rows.forEach((row) => {
            gsap.from(row, {
              opacity: 0,
              y: 16,
              duration: 0.5,
              ease: "power2.out",
              scrollTrigger: { trigger: row, start: "top 85%", once: true },
            });
          });
        },
      );

      const prepChart = () => {
        const path = pathRef.current;
        const svg = svgRef.current;
        if (!path || !svg) return null;
        const len = path.getTotalLength();
        const pointGroups = gsap.utils.toArray<SVGGElement>(".rm-point", svg);
        gsap.set(path, { strokeDasharray: len, strokeDashoffset: len });
        gsap.set(pointGroups, { opacity: 0, y: 10 });
        return { path, len, pointGroups };
      };

      // Desktop: ScrollTrigger pin + scrubbed line draw.
      mm.add(
        "(min-width: 1024px) and (min-height: 700px) and (prefers-reduced-motion: no-preference)",
        () => {
          const chart = prepChart();
          if (!chart) return;
          const { path, len, pointGroups } = chart;

          const lengthAtX = (x: number) => {
            let lo = 0;
            let hi = len;
            for (let i = 0; i < 24; i++) {
              const mid = (lo + hi) / 2;
              if (path.getPointAtLength(mid).x < x) lo = mid;
              else hi = mid;
            }
            return (lo + hi) / 2;
          };

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: stage,
              start: "top top",
              end: "+=110%",
              pin: true,
              anticipatePin: 1,
              scrub: 0.6,
            },
          });

          const LEAD = 0.08;
          const TAIL = 0.25;

          tl.to(path, { strokeDashoffset: 0, ease: "none", duration: 1 }, LEAD);
          pointGroups.forEach((g, idx) => {
            tl.to(
              g,
              { opacity: 1, y: 0, duration: 0.1, ease: "power2.out" },
              LEAD + lengthAtX(coords[idx].x) / len,
            );
          });
          tl.to({}, { duration: TAIL });
        },
      );

      const drawOnce = () => {
        const chart = prepChart();
        if (!chart) return;
        const { path, pointGroups } = chart;
        const tl = gsap.timeline({
          scrollTrigger: { trigger: stage, start: "top 75%", once: true },
        });
        tl.to(path, {
          strokeDashoffset: 0,
          ease: "power1.inOut",
          duration: 1.4,
        });
        tl.to(
          pointGroups,
          { opacity: 1, y: 0, duration: 0.4, stagger: 0.08, ease: "power2.out" },
          "<0.4",
        );
      };
      mm.add(
        "(min-width: 768px) and (max-width: 1023px) and (prefers-reduced-motion: no-preference)",
        drawOnce,
      );
      mm.add(
        "(min-width: 1024px) and (max-height: 699px) and (prefers-reduced-motion: no-preference)",
        drawOnce,
      );
    },
    {
      scope: sectionRef,
      dependencies: [points.map((p) => `${p.name}@${p.altitude}`).join("|")],
      revertOnUpdate: true,
    },
  );

  return (
    <section
      ref={sectionRef}
      id="route"
      className="scroll-mt-28 bg-[#191919] w-full text-white relative"
    >
      <div
        ref={stageRef}
        className="relative md:min-h-[100svh] overflow-hidden flex flex-col justify-center gap-8 md:gap-12 py-16"
      >
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <img
            src={terrainBg}
            alt=""
            className="absolute inset-0 w-full h-full object-cover select-none"
          />
        </div>

        <div className="relative max-w-[1440px] w-full mx-auto px-5 md:px-8 flex flex-col gap-6">
          <p className="font-['DM_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#C8CDD2]">
            07 — ROUTE
          </p>
          <h2 className="font-['Fraunces'] font-light text-display-l max-w-[32ch] text-white">
            {headline}
          </h2>
        </div>

        {/* Mobile — ascent ladder */}
        {n > 0 && (
          <div className="relative md:hidden max-w-[1440px] w-full mx-auto px-5 pt-4">
            <div className="flex flex-col">
              {coords.map((c, idx) => (
                <div
                  key={idx}
                  className="rm-ladder-row relative flex gap-5 pb-10 last:pb-0"
                >
                  {idx < n - 1 && (
                    <span
                      className="absolute left-[5px] top-4 bottom-0 w-px bg-white/25"
                      aria-hidden
                    />
                  )}
                  <span
                    className={`relative mt-[7px] shrink-0 rounded-full bg-white ${
                      c.isSummit
                        ? "w-[11px] h-[11px]"
                        : "ml-[2px] w-[7px] h-[7px]"
                    }`}
                    aria-hidden
                  />
                  <div className="flex flex-col gap-1">
                    <span className="font-['DM_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#C8CDD2]">
                      {c.name}
                    </span>
                    <span
                      className={`font-['Fraunces'] font-light text-white leading-none ${c.isSummit ? "text-display-m" : "text-body-lg"}`}
                    >
                      {c.altitude}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Desktop — elevation chart */}
        {n > 0 && (
          <div className="relative hidden md:block flex-1 min-h-0 max-w-[1440px] w-full mx-auto px-8">
            <div className="w-full h-full overflow-x-auto">
              <svg
                ref={svgRef}
                viewBox={`0 0 ${SVG_W} ${SVG_H}`}
                preserveAspectRatio="xMidYMid meet"
                className="w-full h-full min-w-[700px]"
                aria-hidden="true"
              >
                <path
                  ref={pathRef}
                  d={smoothPath(coords)}
                  fill="none"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />

                {coords.map((c, idx) => {
                  const isLast = idx === n - 1;
                  const anchor = isLast ? "end" : "middle";
                  const labelX = isLast ? SVG_W - 16 : c.x;
                  return (
                  <g key={idx} className="rm-point">
                    <circle
                      cx={c.x}
                      cy={c.y}
                      r={c.isSummit ? 9 : 6}
                      fill="white"
                    />
                    <text
                      x={labelX}
                      y={c.y - 66}
                      textAnchor={anchor}
                      fontFamily="'DM Mono', monospace"
                      fontSize="13"
                      fill="#C8CDD2"
                      letterSpacing="2.42"
                      style={{ textTransform: "uppercase" }}
                    >
                      {c.name}
                    </text>
                    <text
                      x={labelX}
                      y={c.y - 42}
                      textAnchor={anchor}
                      fontFamily="Fraunces, serif"
                      fontSize={c.isSummit ? "28" : "21"}
                      fill="white"
                      fontWeight="300"
                    >
                      {c.altitude}
                    </text>
                  </g>
                  );
                })}
              </svg>
            </div>
          </div>
        )}
      </div>

      <div className="relative max-w-[1440px] mx-auto px-8 pb-16 md:pb-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 border-t border-white/20 pt-16">
          <div className="flex flex-col gap-4">
            <span className="font-['DM_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#C8CDD2]">
              ROUTE PHILOSOPHY
            </span>
            {routePhilosophy && (
              <p className="font-['DM_Sans'] font-light text-[#C8CDD2] text-body leading-[1.8] max-w-[40ch]">
                {routePhilosophy}
              </p>
            )}
          </div>
          <div className="flex flex-col gap-4">
            <span className="font-['DM_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#C8CDD2]">
              ACCLIMATISATION CYCLE
            </span>
            {acclimatisationNote && (
              <p className="font-['DM_Sans'] font-light text-[#C8CDD2] text-body leading-[1.8] max-w-[40ch]">
                {acclimatisationNote}
              </p>
            )}
          </div>
          <div className="flex flex-col gap-4">
            <span className="font-['DM_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#C8CDD2]">
              SUMMIT WINDOW
            </span>
            {summitWindowNote && (
              <p className="font-['DM_Sans'] font-light text-[#C8CDD2] text-body leading-[1.8] max-w-[40ch]">
                {summitWindowNote}
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
