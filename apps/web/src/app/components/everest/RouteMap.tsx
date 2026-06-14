import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import terrainBg from "../../../assets/terrain-bg.svg";

gsap.registerPlugin(ScrollTrigger);

type Waypoint = { name: string; altitude: string };

type Props = {
  waypoints?: Waypoint[];
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

      // Desktop: pinned stage with scroll-scrubbed line drawing.
      mm.add(
        "(min-width: 768px) and (prefers-reduced-motion: no-preference)",
        () => {
          const path = pathRef.current;
          const svg = svgRef.current;
          if (!path || !svg) return;
          const len = path.getTotalLength();

          // x is monotonic along the path, so binary-search the arc length
          // where the line reaches each waypoint's x
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

          const pointGroups = gsap.utils.toArray<SVGGElement>(".rm-point", svg);

          gsap.set(path, { strokeDasharray: len, strokeDashoffset: len });
          gsap.set(pointGroups, { opacity: 0, y: 10 });

          // the stage is a viewport-height block-level child of the section,
          // so the pin-spacer reserves its space correctly (pinning a flex
          // child breaks spacing, which is why the chart used to drift)
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: stage,
              start: "top top",
              end: "+=110%",
              pin: true,
              scrub: 0.6,
            },
          });

          // a beat after the lock engages before drawing starts, and a dwell
          // on the finished chart before it releases, so neither boundary
          // coincides with visible motion
          const LEAD = 0.08;
          const TAIL = 0.25;

          tl.to(path, { strokeDashoffset: 0, ease: "none", duration: 1 }, LEAD);
          pointGroups.forEach((g, idx) => {
            tl.to(
              g,
              { opacity: 1, y: 0, duration: 0.06, ease: "power2.out" },
              LEAD + lengthAtX(coords[idx].x) / len,
            );
          });
          tl.to({}, { duration: TAIL });
        },
      );
    },
    {
      scope: sectionRef,
      // key on the actual waypoint data (not just the count) and fully
      // revert the old context — otherwise client-side navigation between
      // peaks leaves stale pins/tweens measured against the previous page
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
        className="relative md:h-[100svh] overflow-hidden flex flex-col justify-center gap-8 md:gap-12 py-16"
      >
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <img
            src={terrainBg}
            alt=""
            className="absolute inset-0 w-full h-full object-cover select-none"
          />
        </div>

        <div className="relative max-w-[1440px] w-full mx-auto px-5 md:px-8 flex flex-col gap-6">
          <p className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#C8CDD2]">
            06 — ROUTE
          </p>
          <h2 className="font-['Radley'] font-light text-[clamp(34px,3.9vw,56px)] leading-[1.1] max-w-[32ch] text-white">
            {n > 0
              ? `From ${points[0].name} to the summit. ${n - 1} points on the line.`
              : "The route."}
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
                    <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[10px] text-[#C8CDD2]">
                      {c.name}
                    </span>
                    <span
                      className={`font-['Radley'] font-light text-white leading-none ${c.isSummit ? "text-[26px]" : "text-[20px]"}`}
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

                {coords.map((c, idx) => (
                  <g key={idx} className="rm-point">
                    <circle
                      cx={c.x}
                      cy={c.y}
                      r={c.isSummit ? 9 : 6}
                      fill="white"
                    />
                    <text
                      x={c.x}
                      y={c.y - 66}
                      textAnchor="middle"
                      fontFamily="'JetBrains Mono', monospace"
                      fontSize="13"
                      fill="#C8CDD2"
                      letterSpacing="2.42"
                      style={{ textTransform: "uppercase" }}
                    >
                      {c.name}
                    </text>
                    <text
                      x={c.x}
                      y={c.y - 42}
                      textAnchor="middle"
                      fontFamily="Radley, serif"
                      fontSize={c.isSummit ? "28" : "21"}
                      fill="white"
                      fontWeight="300"
                    >
                      {c.altitude}
                    </text>
                  </g>
                ))}
              </svg>
            </div>
          </div>
        )}
      </div>

      <div className="relative max-w-[1440px] mx-auto px-8 pb-16 md:pb-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 border-t border-white/20 pt-16">
          <div className="flex flex-col gap-4">
            <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#C8CDD2]">
              ROUTE PHILOSOPHY
            </span>
            {routePhilosophy && (
              <p className="font-['Lexend'] font-light text-[#C8CDD2] text-[15px] leading-[1.8] max-w-[40ch]">
                {routePhilosophy}
              </p>
            )}
          </div>
          <div className="flex flex-col gap-4">
            <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#C8CDD2]">
              ACCLIMATISATION CYCLE
            </span>
            {acclimatisationNote && (
              <p className="font-['Lexend'] font-light text-[#C8CDD2] text-[15px] leading-[1.8] max-w-[40ch]">
                {acclimatisationNote}
              </p>
            )}
          </div>
          <div className="flex flex-col gap-4">
            <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#C8CDD2]">
              SUMMIT WINDOW
            </span>
            {summitWindowNote && (
              <p className="font-['Lexend'] font-light text-[#C8CDD2] text-[15px] leading-[1.8] max-w-[40ch]">
                {summitWindowNote}
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
