import { useState } from 'react'
import {
  tableRows,
  EDITION_LETTERS,
  type ConfigMatrix,
} from '../../../lib/configMatrix'

const VISIBLE_ROWS = 5

interface ComparisonTablesProps {
  name: string
  matrix?: ConfigMatrix
  editions?: Array<{ letter: string; name: string }>
}

/**
 * Tabbed per-peak comparison table (Services / Add-on), all five editions as
 * columns. Display-only — same `configMatrix` that drives the Design configurator.
 * Alpine (A) & Explorer (E) carry no matrix data (contact-only), so their columns
 * render a single "project dependent" note spanning the body.
 */
export function ComparisonTables({ matrix = [], editions }: ComparisonTablesProps) {
  const core = tableRows(matrix, 'core')
  const addons = tableRows(matrix, 'addon')

  const [tab, setTab] = useState<'core' | 'addon'>(core.length ? 'core' : 'addon')
  const [expanded, setExpanded] = useState(false)

  if (core.length === 0 && addons.length === 0) return null

  const nameByLetter = new Map(
    (editions ?? []).map((e) => [e.letter, e.name.replace(/\s*Edition$/i, '')]),
  )
  const present = EDITION_LETTERS.filter((l) => nameByLetter.has(l))
  const cols = present.length ? present : EDITION_LETTERS

  const addonCount = countAddonOptions(matrix)

  const rows = tab === 'core' ? core : addons
  // A column with no data across the whole category (A/E) → project-dependent note.
  const colMeta = cols.map((letter) => ({
    letter,
    hasData: rows.some((r) => r.cells[letter]),
  }))
  const canExpand = rows.length > VISIBLE_ROWS
  const visibleRows = expanded ? rows : rows.slice(0, VISIBLE_ROWS)

  const selectTab = (t: 'core' | 'addon') => {
    setTab(t)
    setExpanded(false)
  }

  return (
    <section className="bg-[#2E353C] text-white px-5 md:px-8 pb-16 md:pb-24">
      <div className="max-w-[1376px] mx-auto flex flex-col gap-10 md:gap-12">
        {/* Tabs */}
        <div className="flex gap-8 md:gap-12 items-start justify-center">
          {core.length > 0 && (
            <Tab active={tab === 'core'} onClick={() => selectTab('core')}>
              Services
            </Tab>
          )}
          {addons.length > 0 && (
            <Tab active={tab === 'addon'} onClick={() => selectTab('addon')}>
              <span className="flex items-center gap-2">
                Add-on
                {addonCount > 0 && (
                  <span className="bg-white text-[#5A6673] px-[3px] py-px font-['Lexend'] text-[11px] leading-none uppercase tracking-normal">
                    {addonCount} available
                  </span>
                )}
              </span>
            </Tab>
          )}
        </div>

        {/* Table */}
        <div className="flex flex-col gap-4 items-center">
          <div className="w-full overflow-x-auto">
            <table className="w-full table-fixed border-collapse min-w-[760px]">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-[10px] pr-4 font-['JetBrains_Mono'] font-normal text-[11px] tracking-[0.22em] uppercase text-[#C8CDD2]">
                    Feature
                  </th>
                  {colMeta.map(({ letter, hasData }) => (
                    <th
                      key={letter}
                      className={`text-left py-[10px] px-4 font-['Radley'] font-normal text-[24px] leading-9 ${
                        hasData ? 'text-white' : 'text-[#7E868F] bg-white/[0.02]'
                      }`}
                    >
                      {nameByLetter.get(letter) ?? letter}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {visibleRows.map((r, ri) => (
                  <tr key={r.key} className="h-16 border-b border-white/10 align-middle">
                    <td className="pr-4 font-['JetBrains_Mono'] text-[11px] tracking-[0.22em] uppercase text-[#C8CDD2]">
                      {r.label}
                    </td>
                    {colMeta.map(({ letter, hasData }) => {
                      if (!hasData) {
                        // One note per project-dependent column, spanning the body,
                        // on a faint tint so the column reads as intentional.
                        if (ri !== 0) return null
                        return (
                          <td
                            key={letter}
                            rowSpan={visibleRows.length}
                            className="px-4 text-center align-middle bg-white/[0.02] font-['Cormorant_Garamond'] italic text-[15px] text-[#8A929B]"
                          >
                            Project dependent
                          </td>
                        )
                      }
                      const cell = r.cells[letter]
                      const text = cell?.summary || (cell?.state === 'na' ? 'N/A' : '—')
                      return (
                        <td
                          key={letter}
                          className="px-4 font-['Lexend'] font-light text-[16px] leading-5 text-white"
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

          {canExpand && (
            <button
              type="button"
              onClick={() => setExpanded((v) => !v)}
              className="font-['Lexend'] text-[14px] tracking-[0.17em] uppercase text-white hover:text-[#C8CDD2] transition-colors mt-2"
            >
              {expanded ? 'See less' : 'See more'}
            </button>
          )}
        </div>
      </div>
    </section>
  )
}

function Tab({
  active,
  onClick,
  children,
}: {
  active: boolean
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`font-['Lexend'] text-[18px] tracking-[0.13em] uppercase transition-colors ${
        active ? 'text-white underline underline-offset-4' : 'text-[#C8CDD2] hover:text-white'
      }`}
    >
      {children}
    </button>
  )
}

/** Count of distinct selectable add-on options across the matrix (for the tab badge). */
function countAddonOptions(matrix: ConfigMatrix): number {
  const seen = new Set<string>()
  for (const f of matrix) {
    if (f.category !== 'addon') continue
    for (const c of f.editions ?? []) for (const o of c.options ?? []) seen.add(`${f.key}:${o.value}`)
  }
  return seen.size
}
