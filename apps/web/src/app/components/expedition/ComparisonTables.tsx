import {
  tableRows,
  type ConfigMatrix,
  type EditionLetter,
  type TableRow,
} from '../../../lib/configMatrix'

// The configurable matrix covers B/C/D only — Alpine (A) & Explorer (E) are
// "Project Dependent" (contact-only), so they get a blanket note, not columns.
const TABLE_COLUMNS: EditionLetter[] = ['B', 'C', 'D']

interface ComparisonTablesProps {
  name: string
  matrix?: ConfigMatrix
  editions?: Array<{ letter: string; name: string }>
}

/**
 * The two per-peak comparison tables (core features + add-on services), all five
 * editions as columns. Display-only — same `configMatrix` that drives the
 * Design configurator.
 */
export function ComparisonTables({ name, matrix, editions }: ComparisonTablesProps) {
  const core = tableRows(matrix ?? [], 'core')
  const addons = tableRows(matrix ?? [], 'addon')
  if (core.length === 0 && addons.length === 0) return null

  const nameByLetter = new Map((editions ?? []).map((e) => [e.letter, e.name.replace(/\s*Edition$/i, '')]))
  const columns = TABLE_COLUMNS

  return (
    <section className="px-6 md:px-12 py-20 border-t border-[#1F1F1F]">
      <div className="max-w-[1100px] mx-auto space-y-16">
        {core.length > 0 && (
          <Table title="Edition Comparison" subtitle={name} columns={columns} nameByLetter={nameByLetter} rows={core} />
        )}
        {addons.length > 0 && (
          <Table title={`Add-on Services — ${name}`} columns={columns} nameByLetter={nameByLetter} rows={addons} />
        )}
        <p className="font-['Cormorant_Garamond'] italic text-[#5A6673] text-[15px]">
          Alpine (A) &amp; Explorer (E) are configured on a project-dependent basis — speak with our desk.
        </p>
      </div>
    </section>
  )
}

function Table({
  title,
  subtitle,
  columns,
  nameByLetter,
  rows,
}: {
  title: string
  subtitle?: string
  columns: EditionLetter[]
  nameByLetter: Map<string, string>
  rows: TableRow[]
}) {
  return (
    <div>
      <p className="font-['JetBrains_Mono'] text-[10px] uppercase tracking-[0.2em] text-[#5A6673] mb-8">
        {title}
      </p>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse min-w-[720px]">
          <thead>
            <tr className="border-b border-[#2A2A2A]">
              <th className="text-left py-4 pr-4 w-[18%] font-['JetBrains_Mono'] text-[10px] uppercase tracking-[0.14em] text-[#5A6673] font-normal">
                Feature
              </th>
              {columns.map((letter) => (
                <th
                  key={letter}
                  className="text-left py-4 px-4 font-['Cormorant_Garamond'] font-light text-xl text-white"
                >
                  {nameByLetter.get(letter) ?? letter}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.key} className="border-b border-[#1F1F1F] align-top">
                <td className="py-4 pr-4 font-['JetBrains_Mono'] text-[10px] uppercase tracking-[0.12em] text-[#5A6673]">
                  {r.label}
                </td>
                {columns.map((letter) => {
                  const cell = r.cells[letter]
                  const text = cell?.summary || (cell?.state === 'na' ? 'N/A' : '—')
                  return (
                    <td
                      key={letter}
                      className="py-4 px-4 font-['Cormorant_Garamond'] text-[15px] text-[#C8CDD2] leading-snug"
                    >
                      {text}
                    </td>
                  )
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
