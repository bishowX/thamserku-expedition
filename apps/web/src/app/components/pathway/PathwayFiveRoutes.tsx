import { Link } from 'react-router';
import type { PathwayRoute } from '../../../lib/queries';

type PageData = {
  routesSectionEyebrow?: string;
  routesSectionHeadline?: string;
  routesSectionSubtitle?: string;
  routes?: PathwayRoute[];
};

export const PathwayFiveRoutes = ({ page }: { page?: PageData }) => {
  const routes = page?.routes ?? [];
  if (!page?.routesSectionHeadline || routes.length === 0) return null;

  return (
    <section className="bg-[#F4F2EC] py-24 px-8">
      <div className="max-w-[1440px] mx-auto flex flex-col items-center">

        <div className="flex flex-col items-center mb-24 md:mb-32">
          {page.routesSectionEyebrow && (
            <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#5A6673] text-center mb-8">
              {page.routesSectionEyebrow}
            </span>
          )}
          <h2 className="font-['Radley'] font-light text-[48px] md:text-[56px] lg:text-[72px] text-[#1A1A1A] leading-[1.1] text-center max-w-[22ch] mb-6">
            {page.routesSectionHeadline}
          </h2>
          {page.routesSectionSubtitle && (
            <p className="font-['Cormorant_Garamond'] italic text-[#0A3A77] text-[22px] text-center max-w-[56ch]">
              {page.routesSectionSubtitle}
            </p>
          )}
        </div>

        <div className="w-full max-w-[1320px] grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {routes.map((route, idx) => (
            <div
              key={route._key ?? idx}
              className="flex flex-col border-y border-[#5A6673]/30 px-6 py-8"
            >
              <div className="w-full aspect-[4/3] border border-[#5A6673] flex flex-col items-center justify-center p-4 mb-8">
                <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[9px] text-[#5A6673] text-center mb-1">
                  [IMAGE PLACEHOLDER]
                </span>
                <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[9px] text-[#5A6673] text-center opacity-60">
                  {route.peakName}
                </span>
              </div>

              <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#5A6673] mb-4">
                ROUTE {idx + 1} — {route.peakName}
              </span>
              <h3 className="font-['Radley'] font-light text-[24px] md:text-[28px] text-[#1A1A1A] leading-[1.1] mb-8">
                {route.peakName}
              </h3>

              <div className="flex flex-col border-t border-[#5A6673]/30 mb-8">
                <div className="flex justify-between items-center py-3 border-b border-[#5A6673]/30">
                  <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[10px] text-[#5A6673]">ALTITUDE</span>
                  <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[10px] text-[#1A1A1A]">{route.altitude}</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-[#5A6673]/30">
                  <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[10px] text-[#5A6673]">REGION</span>
                  <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[10px] text-[#1A1A1A]">{route.region}</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-[#5A6673]/30">
                  <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[10px] text-[#5A6673]">CHARACTER</span>
                  <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[10px] text-[#1A1A1A]">{route.character}</span>
                </div>
              </div>

              <p className="font-['Lexend'] font-light text-[15px] text-[#5A6673] leading-[1.65] mb-10 flex-grow">
                {route.description}
              </p>

              <Link
                to="/consultation?intent=7000m"
                className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#0A3A77] mt-auto whitespace-nowrap"
              >
                READ THE ROUTE →
              </Link>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
