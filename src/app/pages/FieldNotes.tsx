import { Nav } from '../components/Nav';
import { FieldNotesHero } from '../components/fieldnotes/FieldNotesHero';
import { FieldNotesCategories } from '../components/fieldnotes/FieldNotesCategories';
import { FieldNotesFeaturedStories } from '../components/fieldnotes/FieldNotesFeaturedStories';
import { FieldNotesAllStories } from '../components/fieldnotes/FieldNotesAllStories';
import { FieldNotesNewsletterSignUp } from '../components/fieldnotes/FieldNotesNewsletterSignUp';
import { FieldNotesClosing } from '../components/fieldnotes/FieldNotesClosing';
import { Footer } from '../components/Footer';

export const FieldNotes = () => {
  return (
    <main className="min-h-screen bg-[#1A1A1A]">
      <Nav />
      <FieldNotesHero />
      <FieldNotesCategories />
      <FieldNotesFeaturedStories />
      <FieldNotesAllStories />
      <FieldNotesNewsletterSignUp />
      <FieldNotesClosing />
      <Footer />
    </main>
  );
};