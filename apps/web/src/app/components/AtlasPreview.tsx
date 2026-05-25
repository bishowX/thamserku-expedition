import { MoveRight } from "lucide-react";
import { Link, useNavigate } from "react-router";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { urlFor } from "../../lib/sanity";
import type { SanityExpedition } from "../../lib/queries";

function toPreviewData(exp: SanityExpedition, idx: number) {
  return {
    code: `EXP / ${exp.number} — ${exp.code}`,
    name: exp.name,
    slug: exp.slug?.current ?? '',
    positioning: exp.positioning,
    altitude: exp.altitude,
    region: exp.region,
    season: exp.season,
    style: exp.style,
    editions: exp.editions?.map(e => ({
      id: e._id,
      name: e.name.replace(' Edition', ''),
      slug: e.slug?.current ?? '',
    })) ?? [],
    cols: idx === 0 ? 6 : 3,
    image: exp.image ? urlFor(exp.image).width(1200).url() : '',
  }
}

type AtlasData = {
  atlasHeading?: string
  atlasIntro?: string
}

export function AtlasPreview({ expeditions, data }: { expeditions?: SanityExpedition[]; data?: AtlasData }) {
  const navigate = useNavigate()

  if (!expeditions?.length) return null

  const items = expeditions.map(toPreviewData)

  return (
    <section id="atlas" className="relative w-full bg-[#1A1A1A] text-white py-32 px-8 overflow-hidden">
      <div
        className="absolute inset-0 z-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(to right, #C8CDD2 1px, transparent 1px), linear-gradient(to bottom, #C8CDD2 1px, transparent 1px)`,
          backgroundSize: '64px 64px'
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto flex flex-col gap-16">
        <div className="flex flex-col md:flex-row gap-12 md:gap-24 items-start">
          <div className="md:w-1/4">
            <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#C8CDD2]">
              03 — EXPEDITION ATLAS
            </span>
          </div>
          <div className="md:w-1/2">
            {data?.atlasHeading && (
              <h2 className="font-['Radley'] font-light text-fluid-heading leading-[1.1] mb-6">
                {data.atlasHeading}
              </h2>
            )}
          </div>
          <div className="md:w-1/4">
            {data?.atlasIntro && (
              <p className="font-['Lexend'] font-light text-[#C8CDD2] text-fluid-body leading-[1.6]">
                {data.atlasIntro}
              </p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {items.map((exp, idx) => {
            const href = exp.slug ? `/${exp.slug}` : null
            return (
              <div
                key={idx}
                onClick={() => href && navigate(href)}
                className={`group relative flex flex-col justify-between border border-white/10 bg-[#2E353C]/30 p-8 min-h-[480px] overflow-hidden transition-all duration-500 hover:-translate-y-1 ${href ? 'cursor-pointer' : ''} ${
                  idx >= 3 ? 'md:col-span-6' : exp.cols === 6 ? 'md:col-span-6' : 'md:col-span-3'
                }`}
              >
                <div className="absolute inset-0 z-0">
                  <ImageWithFallback
                    src={exp.image}
                    alt={exp.name}
                    className="w-full h-full object-cover opacity-20 mix-blend-luminosity group-hover:opacity-40 transition-opacity duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A] via-transparent to-transparent opacity-80" />
                </div>

                <div className="relative z-10">
                  <div className="font-['JetBrains_Mono'] text-[10px] uppercase tracking-[0.22em] text-[#C8CDD2] mb-8">
                    {exp.code}
                  </div>
                  <h3 className="font-['Radley'] font-light text-fluid-mountain leading-none mb-4">
                    {exp.name}
                  </h3>
                  <p className="font-['Lexend'] font-light text-[#C8CDD2] text-fluid-body leading-relaxed max-w-[40ch]">
                    {exp.positioning}
                  </p>
                </div>

                <div className="relative z-10 mt-12 flex flex-col gap-4 font-['JetBrains_Mono'] text-[10px] uppercase tracking-[0.1em] text-[#5A6673]">
                  <div className="grid grid-cols-2 gap-y-2 gap-x-4">
                    <div>ALT: {exp.altitude}</div>
                    <div>REG: {exp.region}</div>
                    <div>SEA: {exp.season}</div>
                    <div>STY: {exp.style}</div>
                  </div>
                  <div className="pt-4 border-t border-white/10 text-[#C8CDD2] flex justify-between items-center">
                    <div className="flex flex-wrap gap-x-3 gap-y-1">
                      {exp.editions.map((ed, i) => (
                        <Link
                          key={ed.id || i}
                          to="/editions"
                          onClick={e => e.stopPropagation()}
                          className="hover:text-white transition-colors"
                        >
                          {ed.name}
                        </Link>
                      ))}
                    </div>
                    <MoveRight className="w-4 h-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 shrink-0 ml-4" />
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        <div className="flex justify-end mt-4">
          <Link to="/atlas" className="border border-white/30 px-8 py-4 font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] flex items-center gap-3 hover:border-white transition-colors">
            View the full atlas <MoveRight className="w-3 h-3" />
          </Link>
        </div>
      </div>
    </section>
  );
}
