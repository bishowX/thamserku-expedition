const { createClient } = require('/Users/user/vynspire/thamserku-expedition/node_modules/.pnpm/@sanity+client@7.22.0/node_modules/@sanity/client');

const client = createClient({
  projectId: 'ugjhuor8',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: 'skU2iieZR2unpJF94QA2tzz4KwiVR9aMqxkCoYDAkIINQhjxDCuTEylGCGb3aB0lw91BF3432dSWF1F7g',
  useCdn: false,
});

async function seed() {
  // Delete old random-ID documents
  const old = await client.fetch(`*[_type == "fieldNotesPage" && _id != "fieldNotesPage"]{ _id }`);
  for (const doc of old) {
    console.log(`Deleting old document: ${doc._id}`);
    await client.delete(doc._id);
  }

  // Delete any drafts that may have been created
  const drafts = await client.fetch(`*[_type == "fieldNotesPage" && _id match "drafts.*"]{ _id }`);
  for (const doc of drafts) {
    console.log(`Deleting draft: ${doc._id}`);
    await client.delete(doc._id);
  }

  // Create or replace the singleton at the correct ID
  const result = await client.createOrReplace({
    _id: 'fieldNotesPage',
    _type: 'fieldNotesPage',
    heroHeadline: 'Quiet dispatches from the mountain.',
    heroSubline: 'Field reports, route judgements, Sherpa notes, and Himalayan readings — written by the people who lead our expeditions, four times a year.',
    categoriesEyebrow: 'CATEGORIES — § I',
    categoriesHeadline: 'Six readings of the Himalaya.',
    categories: [
      { _key: 'cat-approach', name: 'THE APPROACH', description: 'Preparation, gear, training, and the walk-in to Base Camp.', articleCount: '4' },
      { _key: 'cat-field', name: 'FIELD REPORTS', description: 'Base Camp dispatches, route stages, and expedition diaries from the field.', articleCount: '5' },
      { _key: 'cat-sherpa', name: 'SHERPA NOTES', description: 'Readings from Senior Sirdars and climbing Sherpas — the knowledge of the mountain.', articleCount: '4' },
      { _key: 'cat-route', name: 'ROUTE JUDGEMENT', description: 'Weather windows, summit decisions, and condition reports from our forecast desk.', articleCount: '4' },
      { _key: 'cat-cultural', name: 'CULTURAL READINGS', description: 'The Himalayan regions, their peoples, and the traditions that shape our expeditions.', articleCount: '3' },
      { _key: 'cat-legacy', name: 'LEGACY & ARCHIVE', description: 'Heritage pieces, house history, and the long view across four decades of expeditions.', articleCount: '4' },
    ],
    featuredEyebrow: 'FEATURED — § II',
    featuredHeadline: 'Three stories, read first.',
    featuredSubline: 'Recent dispatches from the expedition desk and field team.',
    archiveEyebrow: 'ALL STORIES — § III',
    archiveHeadline: 'The archive.',
    archiveSubline: 'Every Field Notes piece, from the expedition desk and the field. Filtered by category, sorted by most recent.',
    newsletterEyebrow: 'RECEIVE FIELD NOTES — § IV — A QUARTERLY LETTER',
    newsletterHeadline: 'Receive Field Notes.',
    newsletterHeadlineAccent: 'Four letters a year, quietly written.',
    newsletterBody: 'A quiet quarterly letter from our expedition desk. Field reports, route judgements, Sherpa notes, and Himalayan readings — written by the people who lead our expeditions.',
    newsletterBodySecondary: 'No marketing. No frequency beyond what is honest. Unsubscribe anytime.',
    newsletterInputPlaceholder: 'Your email address',
    newsletterPrivacyLine: 'BY SUBSCRIBING YOU AGREE TO OUR PRIVACY TERMS. WE WILL NEVER SHARE YOUR DETAILS.',
    newsletterBottomNote: 'Our previous letters are not posted publicly. Subscribers receive the full archive on signup.',
    closingEyebrow: 'READ THE HOUSE — § V',
    closingHeadline: 'When you are ready, the conversation is private.',
    closingBody: 'Every serious expedition begins with a private conversation. Our senior advisors listen to your background, your timing, and your intention before recommending anything.',
  });

  console.log('Created fieldNotesPage at ID:', result._id);
}

seed().catch(console.error);
