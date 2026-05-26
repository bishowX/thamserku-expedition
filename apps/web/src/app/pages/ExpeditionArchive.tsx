import { useEffect } from "react";
import { useLoaderData } from "react-router";
import { getArchivePageData, type ArchivePageData } from "../../lib/queries";
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

export async function loader() {
  return getArchivePageData();
}

export default function ExpeditionArchive() {
  const data = useLoaderData() as ArchivePageData;
  const page = data.archivePage;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="min-h-screen bg-[#1A1A1A]">
      <Nav />
      <ArchiveHero page={page} />
      <ArchiveIntro page={page} />
      <ArchiveFilters page={page} />
      <ArchiveGrid records={data.records} page={page} />
      <ArchiveFeaturedRecords featuredRecords={data.records.filter(r => r.isFeatured)} page={page} />
      <ArchiveRecordDetail page={page} />
      <ArchiveVerification page={page} />
      <ArchiveClosing page={page} />
      <Footer />
    </main>
  );
};
