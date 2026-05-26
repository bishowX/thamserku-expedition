import { useEffect } from "react";
import { useLoaderData } from "react-router";
import { getFieldNotesPageData, type FieldNotesPageData } from "../../lib/queries";
import { Nav } from '../components/Nav';
import { FieldNotesHero } from '../components/fieldnotes/FieldNotesHero';
import { FieldNotesCategories } from '../components/fieldnotes/FieldNotesCategories';
import { FieldNotesFeaturedStories } from '../components/fieldnotes/FieldNotesFeaturedStories';
import { FieldNotesAllStories } from '../components/fieldnotes/FieldNotesAllStories';
import { FieldNotesNewsletterSignUp } from '../components/fieldnotes/FieldNotesNewsletterSignUp';
import { FieldNotesClosing } from '../components/fieldnotes/FieldNotesClosing';
import { Footer } from '../components/Footer';

export async function loader() {
  return getFieldNotesPageData();
}

export default function FieldNotes() {
  const { fieldNotesPage: page, fieldNotes } = useLoaderData() as FieldNotesPageData;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="min-h-screen bg-[#1A1A1A]">
      <Nav />
      <FieldNotesHero page={page} />
      <FieldNotesCategories page={page} />
      <FieldNotesFeaturedStories page={page} fieldNotes={fieldNotes} />
      <FieldNotesAllStories page={page} fieldNotes={fieldNotes} />
      <FieldNotesNewsletterSignUp page={page} />
      <FieldNotesClosing page={page} />
      <Footer />
    </main>
  );
};
