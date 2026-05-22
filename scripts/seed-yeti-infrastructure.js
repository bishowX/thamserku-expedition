const { createClient } = require('/Users/user/vynspire/thamserku-expedition/node_modules/.pnpm/@sanity+client@7.22.0/node_modules/@sanity/client');

const client = createClient({
  projectId: 'ugjhuor8',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: 'skU2iieZR2unpJF94QA2tzz4KwiVR9aMqxkCoYDAkIINQhjxDCuTEylGCGb3aB0lw91BF3432dSWF1F7g',
  useCdn: false,
});

const YETI_NOTES = {
  EVR: {
    yetiAirNote: 'Sanity - Kathmandu / Lukla / Khumbu helicopter network',
    yetiLodgesNote: 'Sanity - Lukla, Namche, Tengboche, Dingboche approach lodges',
    yetiAccessNote: 'Sanity - Khumbu / Solukhumbu regional partnerships',
    yetiContinuityNote: 'Sanity - Senior Sherpa team continuous across Everest seasons',
  },
  MAN: {
    yetiAirNote: 'Sanity - Kathmandu / Gorkha helicopter coordination',
    yetiLodgesNote: 'Sanity - Approach lodges along the Manaslu Conservation Area',
    yetiAccessNote: 'Sanity - Gorkha district permits and regional access',
    yetiContinuityNote: 'Sanity - Autumn-season specialist team, Sherpas from Solukhumbu',
  },
  DHA: {
    yetiAirNote: 'Sanity - Kathmandu / Pokhara / Myagdi helicopter coordination',
    yetiLodgesNote: 'Sanity - Approach lodges along the Dhaulagiri circuit',
    yetiAccessNote: 'Sanity - Myagdi district permits, remote-mountain logistics',
    yetiContinuityNote: 'Sanity - Solitude-specialist Sherpa team across seasons',
  },
  MAK: {
    yetiAirNote: 'Sanity - Kathmandu / Tumlingtar / Mahalangur helicopter coordination',
    yetiLodgesNote: 'Sanity - Approach lodges along the Makalu Barun corridor',
    yetiAccessNote: 'Sanity - Mahalangur regional partnerships and permit handling',
    yetiContinuityNote: 'Sanity - Technical-climb specialist Sherpa team',
  },
  HIM: {
    yetiAirNote: 'Sanity - Kathmandu / Pokhara helicopter coordination',
    yetiLodgesNote: 'Sanity - Approach lodges along the Annapurna Conservation Area',
    yetiAccessNote: 'Sanity - Annapurna regional permits and cultural-route partnerships',
    yetiContinuityNote: 'Sanity - Quieter-objective and Explorer Edition support team',
  },
};

async function seed() {
  // 1. Seed the yetiInfrastructurePage singleton
  await client.createOrReplace({
    _id: 'yetiInfrastructurePage',
    _type: 'yetiInfrastructurePage',

    heroHeadline: 'Sanity - The operating ecosystem behind every expedition.',
    heroSubheading: 'Sanity - Air support, mountain lodges, regional access, and field continuity — quietly maintained by the Yeti Group, so the climb in front of you receives our full attention.',
    heroStatOperations: 'Sanity - KATHMANDU',
    heroStatRegions: 'Sanity - 5 HIMALAYAN',
    heroStatContinuity: 'Sanity - MULTI-GENERATIONAL',
    heroStatStatus: 'Sanity - UHNI-LEVEL ASSURANCE',

    definitionHeading: 'Sanity - Infrastructure is what you do not see.',
    definitionTagline: 'Sanity - Quietly held, behind every season.',
    definitionBody1: 'Sanity - Yeti Infrastructure is the operating ecosystem Thamserku draws on across every Himalayan season. It is not a marketing partnership or a co-branded service. It is the operational fabric — aviation, hospitality, regional presence, and field continuity — that the Yeti Group has maintained in Nepal for decades.',
    definitionBody2: 'Sanity - For the climber, it means an expedition is supported by infrastructure that exists year-round, not only during a season. For our senior expedition staff, it means continuity: the same crews, the same lodges, the same regional partners, season after season.',
    definitionBody3: 'Sanity - This page describes the four operational pillars that matter most to a Himalayan expedition. None of them are positioning claims. All are working operations.',

    airHeading: 'Sanity - Aerial coordination, when it matters.',
    airTagline: 'Sanity - Helicopter access. Aerial logistics. Rescue support.',
    airBody: "Sanity - Helicopter access between Kathmandu, Lukla, and base camps across the Khumbu, Gorkha, and Annapurna regions — coordinated through the Yeti Group's aviation network. Aerial logistics for high-camp staging where conditions allow. Medical evacuation and rescue support coordinated through the same operational channel.",
    airChannels: 'Sanity - KATHMANDU · LUKLA · HIMALAYAN VALLEYS',
    airUseCases: 'Sanity - ACCESS · STAGING · RESCUE',
    airAvailability: 'Sanity - SEASONAL',
    airCoordination: 'Sanity - YETI GROUP AVIATION',

    lodgesHeading: 'Sanity - Rest, before the route.',
    lodgesTagline: 'Sanity - Acclimatisation rhythm. Recovery. Quiet continuity.',
    lodgesBody: 'Sanity - Operational lodges along approach routes — Lukla, Namche, Tengboche, Dingboche, and beyond — used for considered acclimatisation rhythm and recovery. These are not destination hotels. They are operational rest points maintained year-round, with the same teams, the same standards, and the discretion expected of every Thamserku expedition.',
    lodgesRegions: 'Sanity - KHUMBU · GORKHA · ANNAPURNA',
    lodgesUseCases: 'Sanity - APPROACH · ACCLIMATISATION · RECOVERY',
    lodgesStandard: 'Sanity - OPERATIONAL · DISCREET',
    lodgesStaffing: 'Sanity - YEAR-ROUND TEAMS',

    accessHeading: 'Sanity - Permits, regions, and quiet passage.',
    accessTagline: 'Sanity - Decades of regional presence.',
    accessBody: 'Sanity - Continuous regional presence across the five Himalayan regions where Thamserku operates — Khumbu, Gorkha, Dhaulagiri, Mahalangur, and Annapurna. Backed by decades of permits, partnerships, and quiet field relationships. This is the layer of an expedition no client should have to think about; it is also the layer that fails most often elsewhere.',
    accessRegions: 'Sanity - KHUMBU · GORKHA · DHAULAGIRI · MAHALANGUR · ANNAPURNA',
    accessUseCases: 'Sanity - PERMITS · PARTNERSHIPS · ACCESS',
    accessContinuity: 'Sanity - NEARLY FOUR DECADES',
    accessHandling: 'Sanity - KATHMANDU OPERATIONS',

    continuityHeading: 'Sanity - The same hands, season after season.',
    continuityTagline: 'Sanity - Multi-generational. Nepal-based. On the ground.',
    continuityBody1: 'Sanity - Yeti Infrastructure is operated by a multi-generational field team supported from Kathmandu. The same senior Sherpas, the same base camp managers, the same logistics coordinators — across seasons, across peaks, across the years. This continuity is what allows the same standards of care from first letter to descent.',
    continuityBody2: 'Sanity - It is also the reason our judgement on the mountain extends as far as it does. Field knowledge is earned slowly. We do not rotate teams. We grow them.',

    peakSectionHeading: 'Sanity - How the infrastructure applies, peak by peak.',
    peakSectionTagline: 'Sanity - Five mountains. Same operational foundation. Different operational shapes.',

    faqHeading: 'Sanity - Five quiet answers, before you write to us.',
    faqTagline: 'Sanity - The most common questions about the Yeti operating ecosystem.',
    faqs: [
      {
        _key: 'faq1',
        question: 'Sanity - What is Yeti Infrastructure, and how does it relate to Thamserku?',
        answer: 'Sanity - Yeti Infrastructure is the operating ecosystem Thamserku draws on across every Himalayan expedition — air support, mountain lodges, regional access, and field continuity. Thamserku operates as part of the Yeti Group, the wider Nepali Himalayan group through which this infrastructure is continuously maintained.',
      },
      {
        _key: 'faq2',
        question: 'Sanity - How does the Yeti Group support a Thamserku expedition specifically?',
        answer: "Sanity - Practical operational support: helicopter access and rescue coordination, mountain lodges along approach routes, regional permits and partnerships, and a multi-generational field team. None of this is visible during a successful expedition — which is the point.",
      },
      {
        _key: 'faq3',
        question: 'Sanity - How does the helicopter and air coordination work?',
        answer: "Sanity - Helicopter access between Kathmandu, Lukla, and Himalayan valleys, coordinated through the Yeti Group's aviation network. Used for client transfer to and from base camps, high-camp staging where conditions allow, and medical evacuation or rescue support if required.",
      },
      {
        _key: 'faq4',
        question: 'Sanity - How are lodges, regional access, and logistics handled?',
        answer: 'Sanity - Operational lodges along approach routes are maintained year-round with continuous staffing. Regional permits are handled by Kathmandu operations across all five Himalayan regions where we climb. Logistics — transport, supply chains, and field movement — are coordinated end-to-end by senior staff.',
      },
      {
        _key: 'faq5',
        question: 'Sanity - How does Yeti Infrastructure improve safety and coordination during an expedition?',
        answer: 'Sanity - Field continuity matters most for safety: the same senior Sherpa team, the same medical advisor, and the same regional partners across seasons. Decisions made at altitude are made by people whose judgement has been earned year after year. This is the deepest layer of expedition safety, and it is the layer we do not improvise on.',
      },
    ],

    closingHeading: 'Sanity - The infrastructure is here. The conversation is private.',
    closingBody: 'Sanity - Share your background, your timing, and your intention. A senior advisor will walk you through how the infrastructure applies to your specific expedition — quietly, and within 48 hours.',
  });
  console.log('✓ yetiInfrastructurePage seeded');

  // 2. Fetch expeditions and patch yeti notes onto each
  const expeditions = await client.fetch('*[_type == "expedition"] | order(number asc) { _id, code, name }');
  console.log(`Found ${expeditions.length} expeditions:`, expeditions.map(e => e.code).join(', '));

  const tx = client.transaction();
  for (const exp of expeditions) {
    const notes = YETI_NOTES[exp.code];
    if (notes) {
      tx.patch(exp._id, p => p.set(notes));
      console.log(`  Queuing yeti notes for ${exp.code} — ${exp.name}`);
    } else {
      console.log(`  Skipping ${exp.code} (no notes defined)`);
    }
  }
  await tx.commit();
  console.log('✓ Expedition yeti notes seeded');
}

seed().catch(err => {
  console.error('Seed failed:', err.message);
  process.exit(1);
});
