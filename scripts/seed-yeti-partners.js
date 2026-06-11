const { createClient } = require('/Users/user/vynspire/thamserku-expedition/node_modules/.pnpm/@sanity+client@7.22.1/node_modules/@sanity/client');
const fs = require('fs');
const path = require('path');
const os = require('os');

const authToken = JSON.parse(
  fs.readFileSync(path.join(os.homedir(), '.config/sanity/config.json'), 'utf-8')
).authToken;

const client = createClient({
  projectId: 'dh94bf5m',
  dataset: 'production',
  apiVersion: '2026-05-21',
  token: authToken,
  useCdn: false,
});

const LOGOS_DIR = path.join(__dirname, '../apps/web/src/assets/logos');

// Content data — order matches the cloud position slots in YetiHero.tsx
const PARTNERS = [
  { id: 'hamro-safar',        name: 'Hamro Safar',              logo: 'hamro-safar.svg',              label: 'Travel'      },
  { id: 'yeti-airlines',      name: 'Yeti Airlines',            logo: 'yeti-airlines.svg',            label: 'Airlines'    },
  { id: 'himalaya-airlines',  name: 'Himalaya Airlines',        logo: 'himalaya-airlines.svg',        label: 'Airlines'    },
  { id: 'tara-air',           name: 'Tara Air',                 logo: 'tara-air.svg',                 label: 'Airlines'    },
  { id: 'mountain-lodges',    name: 'Mountain Lodges of Nepal', logo: 'mountain-lodges.svg',          label: 'Hotel'       },
  { id: 'gokarna-forest',     name: 'Gokarna Forest Resort',    logo: 'gokarna-forest.svg',           label: 'Hotel'       },
  { id: 'yeti-adventure',     name: 'Yeti Adventure',           logo: 'yeti-adventure.svg',           label: 'Travel'      },
  { id: 'kora-tours',         name: 'Kora Tours',               logo: 'kora-tours.svg',               label: 'Travel'      },
  { id: 'yeti-world',         name: 'Yeti World',               logo: 'yeti-world.png',               label: null          },
  { id: 'kasara',             name: 'Kasara',                   logo: 'kasara.svg',                   label: 'Hotel'       },
  { id: 'adventure-quest',    name: 'Adventure Quest',          logo: 'adventure-quest.svg',          label: 'Travel'      },
  { id: 'sherpa-hospitality', name: 'Sherpa Hospitality Group', logo: 'sherpa-hospitality.svg',       label: 'Travel'      },
  { id: 'pasang-lhamu',       name: 'Pasang Lhamu Foundation',  logo: 'pasang-lhamu-foundation.svg',  label: 'Foundation'  },
  { id: 'nomad-hotel',        name: 'Nomad Hotel',              logo: 'nomad-hotel.svg',              label: 'Hotel'       },
  { id: 'shinta-mani',        name: 'Shinta Mani Mustang',      logo: 'shinta-mani-mustang.svg',      label: 'Travel'      },
  { id: 'thamserku-travel',   name: 'Thamserku Travel',         logo: 'thamserku-travel.svg',         label: 'Travel'      },
  { id: 'thamserku-adventure',name: 'Thamserku Adventure',      logo: 'thamserku-adventure.svg',      label: 'Travel'      },
  { id: 'yeti-holidays',      name: 'Yeti Holidays',            logo: 'yeti-holidays.svg',            label: 'Travel'      },
  { id: 'le-sherpa',          name: 'Le Sherpa',                logo: 'le-sherpa.svg',                label: 'Restaurant'  },
  { id: 'lumbini-hokke',      name: 'Lumbini Hokke',            logo: 'lumbini-hokke.svg',            label: 'Hotel'       },
];

async function uploadLogo(logoFile) {
  const ext = path.extname(logoFile).toLowerCase();
  const contentType = ext === '.svg' ? 'image/svg+xml' : 'image/png';
  const stream = fs.createReadStream(path.join(LOGOS_DIR, logoFile));
  const result = await client.assets.upload('image', stream, { filename: logoFile, contentType });
  return result._id;
}

async function main() {
  // Get the existing document ID (singleton)
  const docId = await client.fetch('*[_type == "yetiInfrastructurePage"][0]._id');
  if (!docId) {
    console.error('No yetiInfrastructurePage document found. Create it in the Studio first.');
    process.exit(1);
  }
  console.log(`Patching document: ${docId}\n`);

  const heroPartners = [];
  for (const p of PARTNERS) {
    process.stdout.write(`  ${p.name.padEnd(30)}`);
    const assetId = await uploadLogo(p.logo);
    process.stdout.write(`→ ${assetId}\n`);

    const entry = {
      _key: p.id,
      _type: 'partner',
      name: p.name,
      logo: { _type: 'image', asset: { _type: 'reference', _ref: assetId } },
    };
    if (p.label) entry.label = p.label;
    heroPartners.push(entry);
  }

  await client.patch(docId).set({ heroPartners }).commit();
  console.log('\n✓ heroPartners written to Sanity.');
}

main().catch((err) => { console.error(err); process.exit(1); });
