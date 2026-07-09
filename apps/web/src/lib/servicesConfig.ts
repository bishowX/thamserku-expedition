// Services & Add-ons — the per-peak content shown in BOTH tabs of the
// dossier page's comparison table (Services + Add-on). Deliberately a
// SEPARATE pipeline from configMatrix.ts/normalizeDesignConfig: designConfig
// drives the configurator ONLY, never the comparison table. B/C/D only (A/E
// stay "Project dependent", same as designConfig).
import type { EditionLetter, TableRow } from "./configMatrix";

export type ServicesCategory = "service" | "addon";

export type RawServicesRow = {
  name?: string;
  text?: string;
  category?: ServicesCategory;
};

export type RawServicesConfig = {
  b?: RawServicesRow[];
  c?: RawServicesRow[];
  d?: RawServicesRow[];
};

const BCD: EditionLetter[] = ["B", "C", "D"];

const editionOf = (
  sc: RawServicesConfig,
  ed: EditionLetter,
): RawServicesRow[] | undefined =>
  ed === "B" ? sc.b : ed === "C" ? sc.c : ed === "D" ? sc.d : undefined;

const categoryOf = (row: RawServicesRow): ServicesCategory => row.category ?? "service";

/** Union row names for one category across B/C/D, preserving first-seen order. */
function orderedNames(sc: RawServicesConfig, category: ServicesCategory): string[] {
  const seen = new Set<string>();
  const out: string[] = [];
  for (const ed of BCD) {
    for (const row of editionOf(sc, ed) ?? []) {
      if (categoryOf(row) !== category) continue;
      const name = row?.name?.trim();
      if (!name || seen.has(name)) continue;
      seen.add(name);
      out.push(name);
    }
  }
  return out;
}

/**
 * Rows for one comparison-table tab (service|addon), one per unique name
 * across B/C/D. An edition missing a given name simply has no cell (renders
 * blank), matching how designConfig's itemFeatures unions accommodation/
 * guiding rows.
 */
export function servicesRows(
  sc: RawServicesConfig | undefined | null,
  category: ServicesCategory,
): TableRow[] {
  if (!sc) return [];
  return orderedNames(sc, category).map((name) => {
    const cells: TableRow["cells"] = {};
    for (const ed of BCD) {
      const row = (editionOf(sc, ed) ?? []).find(
        (r) => r?.name?.trim() === name && categoryOf(r) === category,
      );
      if (row?.text) cells[ed] = { summary: row.text, state: "fixed" };
    }
    return { key: `${category}-${name}`, label: name, cells };
  });
}
