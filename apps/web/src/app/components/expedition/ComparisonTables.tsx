import { useEffect, useRef, useState } from "react";
import { Link } from "react-router";
import { stegaClean } from "@sanity/client/stega";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { EDITION_LETTERS } from "../../../lib/configMatrix";
import { servicesRows, type RawServicesConfig } from "../../../lib/servicesConfig";
import { useSectionReveal } from "../../hooks/useSectionReveal";

const VISIBLE_ROWS = 5;

interface ComparisonTablesProps {
  name: string;
  servicesConfig?: RawServicesConfig | null;
  editions?: Array<{ letter: string; name: string }>;
}

/**
 * Tabbed per-peak comparison table (Services / Add-on), all five editions as
 * columns. Display-only, driven ENTIRELY by servicesConfig (split by each
 * row's `category`) — designConfig/configMatrix never feeds this component,
 * only the Design configurator (which stays B/C/D-only). Any edition with no
 * servicesConfig rows for the current tab (e.g. Alpine/Explorer left empty)
 * still falls back to a "project dependent" note spanning that column.
 */
export function ComparisonTables({
  servicesConfig,
  editions,
}: ComparisonTablesProps) {
  const core = servicesRows(servicesConfig, "service");
  const addons = servicesRows(servicesConfig, "addon");

  const [tab, setTab] = useState<"core" | "addon">(
    core.length ? "core" : "addon",
  );
  const [expanded, setExpanded] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  useSectionReveal(sectionRef);

  // Toggling rows changes this section's height, which shifts the pinned
  // RouteMap below it. Recompute ScrollTrigger start/end after the DOM
  // reflows so the pin doesn't fire at stale offsets (overlap/jank).
  useEffect(() => {
    let raf2 = 0;
    const raf1 = requestAnimationFrame(() => {
      raf2 = requestAnimationFrame(() => ScrollTrigger.refresh());
    });
    return () => {
      cancelAnimationFrame(raf1);
      cancelAnimationFrame(raf2);
    };
  }, [expanded, tab]);

  if (core.length === 0 && addons.length === 0) return null;

  const nameByLetter = new Map(
    (editions ?? []).map((e) => [e.letter, e.name.replace(/\s*Edition$/i, "")]),
  );
  const present = EDITION_LETTERS.filter((l) => nameByLetter.has(l));
  const cols = present.length ? present : EDITION_LETTERS;

  const rows = tab === "core" ? core : addons;
  // Editions explicitly marked not-offered for this peak read "Unavailable"
  // instead of the "Project dependent" consultation note.
  const unavailable = new Set(
    (servicesConfig?.unavailableEditions ?? []).map((e) =>
      stegaClean(e).trim().toUpperCase(),
    ),
  );
  // A column with no data across the whole category (A/E) → project-dependent note.
  const colMeta = cols.map((letter) => ({
    letter,
    hasData: rows.some((r) => r.cells[letter]),
  }));
  const canExpand = rows.length > VISIBLE_ROWS;
  const visibleRows = expanded ? rows : rows.slice(0, VISIBLE_ROWS);

  const selectTab = (t: "core" | "addon") => {
    setTab(t);
    setExpanded(false);
  };

  return (
    <section ref={sectionRef} className="bg-[#2E353C] text-white px-5 md:px-8 pb-16 md:pb-24">
      <div className="max-w-[1376px] mx-auto flex flex-col gap-10 md:gap-12">
        {/* Tabs */}
        <div data-reveal className="flex gap-8 md:gap-12 items-start justify-center">
          {core.length > 0 && (
            <Tab active={tab === "core"} onClick={() => selectTab("core")}>
              Services
            </Tab>
          )}
          {addons.length > 0 && (
            <Tab active={tab === "addon"} onClick={() => selectTab("addon")}>
              Add-on
            </Tab>
          )}
        </div>

        {/* Table */}
        <div data-reveal className="flex flex-col gap-4 items-center">
          <div className="w-full overflow-x-auto">
            <table className="w-full table-fixed border-collapse min-w-[760px]">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-[10px] pr-4 font-['DM_Mono'] font-normal text-[11px] tracking-[0.22em] uppercase text-[#C8CDD2]">
                    Feature
                  </th>
                  {colMeta.map(({ letter, hasData }) => (
                    <th
                      key={letter}
                      className={`text-left py-[10px] px-4 font-['Fraunces'] font-normal text-display-m leading-9 ${
                        hasData
                          ? "text-white"
                          : "text-[#7E868F] bg-white/[0.02]"
                      }`}
                    >
                      {nameByLetter.get(letter) ?? letter}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {visibleRows.map((r, ri) => (
                  <tr
                    key={r.key}
                    className="h-16 border-b border-white/10 align-middle"
                  >
                    <td className="pr-4 font-['DM_Mono'] text-[11px] tracking-[0.22em] uppercase text-[#C8CDD2]">
                      {r.label}
                    </td>
                    {colMeta.map(({ letter, hasData }) => {
                      if (!hasData) {
                        // Project-dependent column (A/E): render ONE cell spanning
                        // the whole column so the note clearly applies to the entire
                        // edition rather than a single service row. Subsequent rows
                        // are covered by the rowSpan (no per-row dividers drawn).
                        if (ri !== 0) return null;
                        return (
                          <td
                            key={letter}
                            rowSpan={visibleRows.length}
                            className="px-4 text-center align-middle bg-white/[0.02] font-['Fraunces'] italic text-body text-[#8A929B]"
                          >
                            {unavailable.has(letter) ? (
                              "Unavailable"
                            ) : (
                              <Link
                                to="/consultation"
                                className="underline underline-offset-4 decoration-[#8A929B]/50 hover:text-white hover:decoration-white transition-colors"
                              >
                                Project dependent
                              </Link>
                            )}
                          </td>
                        );
                      }
                      const cell = r.cells[letter];
                      const text =
                        cell?.summary || (cell?.state === "na" ? "N/A" : "—");
                      return (
                        <td
                          key={letter}
                          className="px-4 font-['DM_Sans'] font-light text-body leading-5 text-white"
                        >
                          {text}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {canExpand && (
            <button
              type="button"
              onClick={() => setExpanded((v) => !v)}
              className="font-['DM_Sans'] text-body tracking-[0.17em] uppercase text-white hover:text-[#C8CDD2] transition-colors mt-2"
            >
              {expanded ? "See less" : "See more"}
            </button>
          )}
        </div>
      </div>
    </section>
  );
}

function Tab({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`font-['DM_Mono'] text-[18px] tracking-[0.13em] transition-colors font-normal ${
        active
          ? "text-white underline underline-offset-4"
          : "text-[#C8CDD2] hover:text-white"
      }`}
    >
      {children}
    </button>
  );
}

