import { Nav } from '../components/Nav';
import { ArchiveHero } from '../components/archive/ArchiveHero';
import { ArchiveIntro } from '../components/archive/ArchiveIntro';
import { ArchiveFilters } from '../components/archive/ArchiveFilters';
import { ArchiveGrid } from '../components/archive/ArchiveGrid';
import { ArchiveFeaturedRecords } from '../components/archive/ArchiveFeaturedRecords';
import { ArchiveRecordDetail } from '../components/archive/ArchiveRecordDetail';
import { ArchiveVerification } from '../components/archive/ArchiveVerification';
import { ArchiveClosing } from '../components/archive/ArchiveClosing';
import { Footer } from '../components/Footer';

export default function ExpeditionArchive() {
  return (
    <main className="min-h-screen bg-[#1A1A1A]">
      <Nav />
      <ArchiveHero />
      <ArchiveIntro />
      <ArchiveFilters />
      <ArchiveGrid />
      <ArchiveFeaturedRecords />
      <ArchiveRecordDetail />
      <ArchiveVerification />
      <ArchiveClosing />
      <Footer />
    </main>
  );
};