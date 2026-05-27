import { Link } from 'react-router';
import type { ArchivePageData } from '../../../lib/queries';

type Props = { page: ArchivePageData['archivePage'] };

export const ArchiveRecordDetail = ({ page }: Props) => {
  const record = page?.detailRecord;
  if (!record) return null;

  const peakCode = record.peak.substring(0, 3).toUpperCase();
  const statusLabel = record.status === 'verified'
    ? page?.statusVerifiedLabel
    : record.status === 'permissionRequired'
      ? page?.statusPermissionLabel
      : page?.statusPrivateLabel;
  const permissionDisplay = record.status === 'verified'
    ? `${page?.statusVerifiedLabel} (status published)`
    : statusLabel;
  const related = record.relatedRecord;
  const relatedCode = related ? related.peak.substring(0, 3).toUpperCase() : '';

  return (
 <section className="relative w-full bg-[#1A1A1A] section-padding">
      <div className="max-w-[1440px] mx-auto flex flex-col items-center">

        {/* Section Header */}
        <div className="flex flex-col items-center mb-24 md:mb-32">
          <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#C8CDD2] text-center mb-8">
            {page?.detailEyebrow}
          </span>
          <h2 className="font-['Radley'] font-light text-[48px] md:text-[64px] text-white leading-[1.1] text-center max-w-[26ch] mb-6">
            {page?.detailHeading}
          </h2>
          <p className="font-['Cormorant_Garamond'] italic text-[#C8CDD2] text-[22px] text-center max-w-[56ch]">
            {page?.detailSubline}
          </p>
        </div>

        {/* Detail Body */}
        <div className="w-full max-w-[1180px] grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16">

          {/* Left 5 cols: Image Placeholder */}
          <div className="md:col-span-5 w-full aspect-[4/5] border border-white/20 flex flex-col items-center justify-center p-8">
            <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#C8CDD2] text-center mb-4">
              [IMAGE PLACEHOLDER]
            </span>
            <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#C8CDD2] text-center mb-2">
              RECORD DETAIL IMAGE — {record.peak.toUpperCase()} {record.year}
            </span>
            <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#C8CDD2] text-center opacity-60">
              {record.status !== 'verified' ? statusLabel : ''}
            </span>
          </div>

          {/* Right 7 cols: Data Display */}
          <div className="md:col-span-7 flex flex-col pt-4">
            <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#C8CDD2] mb-6">
              EXPEDITION RECORD <span className="mx-1">·</span> {peakCode} <span className="mx-1">·</span> {record.year}
            </span>

            <h3 className="font-['Radley'] font-light text-[56px] md:text-[72px] text-white leading-[1.05] max-w-[14ch] mb-6">
              {record.year} — {record.peak}
            </h3>

            <p className="font-['Cormorant_Garamond'] italic text-[#C8CDD2] text-[22px] max-w-[30ch] mb-12 md:mb-16">
              {record.route} — a quiet spring expedition.
            </p>

            {/* Structured fields panel */}
            <div className="flex flex-col border-t border-white/20">

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-8 py-6 border-b border-white/20">
                <div className="sm:col-span-1">
                  <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#5A6673]">
                    {page?.detailYearLabel}
                  </span>
                </div>
                <div className="sm:col-span-2">
                  <span className="font-['Radley'] text-[16px] text-white">
                    {record.year}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-8 py-6 border-b border-white/20">
                <div className="sm:col-span-1">
                  <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#5A6673]">
                    {page?.detailPeakLabel}
                  </span>
                </div>
                <div className="sm:col-span-2">
                  <span className="font-['Radley'] text-[16px] text-white">
                    {record.peak} ({record.altitude})
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-8 py-6 border-b border-white/20">
                <div className="sm:col-span-1">
                  <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#5A6673]">
                    {page?.detailRouteLabel}
                  </span>
                </div>
                <div className="sm:col-span-2">
                  <span className="font-['Radley'] text-[16px] text-white">
                    {record.route}, {record.region}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-8 py-6 border-b border-white/20">
                <div className="sm:col-span-1">
                  <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#5A6673]">
                    {page?.detailTypeLabel}
                  </span>
                </div>
                <div className="sm:col-span-2 flex flex-wrap gap-2">
                  <span className="font-['Radley'] text-[16px] text-white">
                    Summit Expedition <span className="mx-1 font-['JetBrains_Mono'] text-[#5A6673] text-[10px]">·</span> {record.editionType}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-8 py-6 border-b border-white/20">
                <div className="sm:col-span-1">
                  <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#5A6673]">
                    {page?.detailNotableLabel}
                  </span>
                </div>
                <div className="sm:col-span-2">
                  <span className="font-['Radley'] text-[16px] text-white leading-[1.6]">
                    {record.description}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-8 py-6 border-b border-white/20">
                <div className="sm:col-span-1">
                  <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#5A6673]">
                    {page?.detailSourceLabel}
                  </span>
                </div>
                <div className="sm:col-span-2">
                  <span className="font-['Radley'] text-[16px] text-white">
                    {record.source}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-8 py-6 border-b border-white/20">
                <div className="sm:col-span-1">
                  <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#5A6673]">
                    {page?.detailPermissionLabel}
                  </span>
                </div>
                <div className="sm:col-span-2">
                  <span className="font-['Radley'] text-[16px] text-[#C8CDD2]">
                    {permissionDisplay}
                  </span>
                </div>
              </div>

              {related && (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-8 py-6 border-b border-white/20">
                  <div className="sm:col-span-1 flex items-center">
                    <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#5A6673]">
                      {page?.detailRelatedLabel}
                    </span>
                  </div>
                  <div className="sm:col-span-2">
                    <Link to="#" className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#0A3A77] hover:text-white transition-colors">
                      → {relatedCode} · {related.year} {related.peak}
                    </Link>
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>

        {/* Below the detail */}
        <div className="mt-24 md:mt-32 w-full flex justify-center">
          <p className="font-['Cormorant_Garamond'] italic text-[#C8CDD2] text-[16px] text-center max-w-[60ch]">
            {page?.detailFooter}
          </p>
        </div>

      </div>
    </section>
  );
};
