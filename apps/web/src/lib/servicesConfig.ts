// Services & Add-ons — the per-peak content shown in BOTH tabs of the
// dossier page's comparison table (Services + Add-on), across all five
// editions. Deliberately a SEPARATE pipeline from configMatrix.ts/
// normalizeDesignConfig: designConfig drives the configurator ONLY (which
// stays B/C/D-only), never the comparison table.
import { EDITION_LETTERS, type EditionLetter, type TableRow } from "./configMatrix";

export type ServicesCategory = "service" | "addon";

export type RawServicesRow = {
  name?: string;
  text?: string;
  category?: ServicesCategory;
};

export type RawServicesConfig = {
  a?: RawServicesRow[];
  b?: RawServicesRow[];
  c?: RawServicesRow[];
  d?: RawServicesRow[];
  e?: RawServicesRow[];
};

const editionOf = (
  sc: RawServicesConfig,
  ed: EditionLetter,
): RawServicesRow[] | undefined =>
  ed === "A" ? sc.a : ed === "B" ? sc.b : ed === "C" ? sc.c : ed === "D" ? sc.d : sc.e;

const categoryOf = (row: RawServicesRow): ServicesCategory => row.category ?? "service";

/** Union row names for one category across all editions, preserving first-seen order. */
function orderedNames(sc: RawServicesConfig, category: ServicesCategory): string[] {
  const seen = new Set<string>();
  const out: string[] = [];
  for (const ed of EDITION_LETTERS) {
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
 * across all editions. An edition missing a given name simply has no cell
 * (renders blank), matching how designConfig's itemFeatures unions
 * accommodation/guiding rows.
 */
export function servicesRows(
  sc: RawServicesConfig | undefined | null,
  category: ServicesCategory,
): TableRow[] {
  if (!sc) return [];
  return orderedNames(sc, category).map((name) => {
    const cells: TableRow["cells"] = {};
    for (const ed of EDITION_LETTERS) {
      const row = (editionOf(sc, ed) ?? []).find(
        (r) => r?.name?.trim() === name && categoryOf(r) === category,
      );
      if (row?.text) cells[ed] = { summary: row.text, state: "fixed" };
    }
    return { key: `${category}-${name}`, label: name, cells };
  });
}
