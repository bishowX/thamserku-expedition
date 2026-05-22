import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'enquiry',
  title: 'Enquiry',
  type: 'document',
  groups: [
    { name: 'contact', title: 'A — Contact' },
    { name: 'expedition', title: 'B — Expedition' },
    { name: 'timing', title: 'C — Timing & Edition' },
    { name: 'experience', title: 'D — Experience' },
    { name: 'logistics', title: 'E — Logistics' },
    { name: 'message', title: 'F — Message' },
  ],
  fields: [
    defineField({ name: 'submittedAt', title: 'Submitted At', type: 'datetime', readOnly: true }),
    // Chapter A
    defineField({ name: 'fullName', title: 'Full Name', type: 'string', group: 'contact' }),
    defineField({ name: 'email', title: 'Email', type: 'string', group: 'contact' }),
    defineField({ name: 'phone', title: 'Phone / WhatsApp', type: 'string', group: 'contact' }),
    defineField({ name: 'countryOfResidence', title: 'Country of Residence', type: 'string', group: 'contact' }),
    defineField({ name: 'preferredContact', title: 'Preferred Contact Method', type: 'string', group: 'contact' }),
    // Chapter B
    defineField({ name: 'expeditionInterest', title: 'Expedition Interest', type: 'array', of: [{ type: 'string' }], group: 'expedition' }),
    defineField({ name: 'otherExpeditionNote', title: 'Other / Not Sure — Note', type: 'string', group: 'expedition' }),
    // Chapter C
    defineField({ name: 'preferredEdition', title: 'Preferred Edition', type: 'string', group: 'timing' }),
    // Chapter D
    defineField({ name: 'trekkingExperience', title: 'Trekking Experience', type: 'string', group: 'experience' }),
    defineField({ name: 'altitudeExperience', title: 'Altitude Experience', type: 'array', of: [{ type: 'string' }], group: 'experience' }),
    defineField({ name: 'fitnessBackground', title: 'Fitness & Training Background', type: 'text', group: 'experience' }),
    defineField({ name: 'climbingCv', title: 'Climbing CV', type: 'file', group: 'experience' }),
    // Chapter E
    defineField({ name: 'preferredSeason', title: 'Preferred Season', type: 'string', group: 'logistics' }),
    defineField({ name: 'numberOfGuests', title: 'Number of Guests', type: 'number', group: 'logistics' }),
    defineField({ name: 'groupPreference', title: 'Group Preference', type: 'string', group: 'logistics' }),
    defineField({ name: 'privacyLevel', title: 'Privacy Level', type: 'string', group: 'logistics' }),
    defineField({ name: 'medicalConsiderations', title: 'Medical Considerations', type: 'text', group: 'logistics' }),
    // Chapter F
    defineField({ name: 'messageToDesk', title: 'Message to the Desk', type: 'text', group: 'message' }),
  ],
  orderings: [
    { title: 'Newest first', name: 'submittedAtDesc', by: [{ field: 'submittedAt', direction: 'desc' }] },
  ],
  preview: {
    select: { title: 'fullName', subtitle: 'email', date: 'submittedAt' },
    prepare: ({ title, subtitle, date }: { title?: string; subtitle?: string; date?: string }) => ({
      title: title ?? 'Unknown',
      subtitle: date ? `${subtitle} · ${new Date(date).toLocaleDateString('en-GB')}` : subtitle,
    }),
  },
})
