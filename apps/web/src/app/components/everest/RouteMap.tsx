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
    return { x, y, name: wp.name, altitude: wp.altitude, isSummit: idx === n - 1 };
  });

  const sectionRef = useRef<HTMLElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const pathRef = useRef<SVGPathElement>(null);

  useGSAP(
    () => {
      const path = pathRef.current;
      const section = sectionRef.current;
      if (!path || !section || n < 2) return;

      const len = path.getTotalLength();
      gsap.set(path, { strokeDasharray: len, strokeDashoffset: len });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${window.innerHeight}`,
          pin: true,
          scrub: 1,
          pinSpacing: true,
        },
      });

      tl.to(path, { strokeDashoffset: 0, ease: "none" });
    },
    { scope: sectionRef, dependencies: [n] }
  );

  return (
    <section ref={sectionRef} id="route" className="bg-[#191919] w-full text-white py-24 overflow-hidden relative scroll-mt-28">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <img
          src={terrainBg}
          alt=""
          className="absolute inset-0 w-full h-full object-cover select-none"
        />
      </div>

      <div className="relative max-w-[1440px] mx-auto px-8 flex flex-col gap-8 md:gap-16">
        <div className="flex flex-col gap-8">
          <p className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#C8CDD2]">
            06 — ROUTE
          </p>
          <h2 className="font-['Radley'] font-light text-[56px] leading-[1.1] max-w-[32ch] text-white">
            {n > 0
              ? `From ${points[0].name} to the summit. ${n - 1} points on the line.`
              : "The route."}
          </h2>
        </div>

        {n > 0 && (
          <div className="w-full overflow-x-auto">
            <svg
              ref={svgRef}
              viewBox={`0 0 ${SVG_W} ${SVG_H}`}
              className="w-full min-w-[700px]"
              aria-hidden="true"
            >
              <path
                ref={pathRef}
                d={smoothPath(coords)}
                fill="none"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeDasharray="10000"
                strokeDashoffset="10000"
              />

              {coords.map((c, idx) => (
                <g key={idx}>
                  <circle cx={c.x} cy={c.y} r={c.isSummit ? 6 : 4} fill="white" />
                  <text
                    x={c.x}
                    y={c.y - 56}
                    textAnchor="middle"
                    fontFamily="'JetBrains Mono', monospace"
                    fontSize="11"
                    fill="#C8CDD2"
                    letterSpacing="2.42"
                    style={{ textTransform: "uppercase" }}
                  >
                    {c.name}
                  </text>
                  <text
                    x={c.x}
                    y={c.y - 34}
                    textAnchor="middle"
                    fontFamily="Radley, serif"
                    fontSize={c.isSummit ? "24" : "18"}
                    fill="white"
                    fontWeight="300"
                  >
                    {c.altitude}
                  </text>
                </g>
              ))}
            </svg>
          </div>
        )}

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
