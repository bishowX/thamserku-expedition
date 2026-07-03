// Generates email-ready image assets with headless Chromium (via playwright-core).
// Sources are inlined as data URIs / inline SVG because file:// is blocked in-sandbox.
import { chromium } from 'playwright-core';
import fs from 'node:fs';
import path from 'node:path';

const ROOT = '/Users/user/vynspire/thamserku-expedition/apps/newsletter';
const SRC = path.join(ROOT, 'reference/assets');
const OUT = path.join(ROOT, 'dist/images');

const jpg = (rel) => 'data:image/jpeg;base64,' +
  fs.readFileSync(path.join(SRC, rel)).toString('base64');
const svgText = (rel) => fs.readFileSync(path.join(SRC, rel), 'utf8');

const FONT_LINK = `<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&family=DM+Sans:wght@400;500;600;700&family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,400;0,9..144,500;0,9..144,600;1,9..144,300;1,9..144,400&display=swap" rel="stylesheet">`;

// display width x height ; rendered at 2x. Sources use the pre-resized /r copies.
const PHOTOS = [
  { src: 'r/peak-daylight.jpg',  out: 'hero.jpg',      w: 680, h: 380 },
  { src: 'r/peak-dramatic.jpg',  out: 'manaslu.jpg',   w: 680, h: 290 },
  { src: 'r/ama-dablam-night.jpg', out: 'amadablam.jpg', w: 680, h: 290 },
  { src: 'r/monastery.jpg',      out: 'monastery.jpg', w: 680, h: 250 },
  { src: 'r/goddess-miyolangsangma.jpg', out: 'goddess.jpg', w: 360, h: 558 },
];

const LOGOS = [
  { src: 'logo-color.svg', out: 'logo-color.png', w: 600 },
  { src: 'logo-white.svg', out: 'logo-white.png', w: 600 },
];

const run = async () => {
  const browser = await chromium.launch();
  const ctx = await browser.newContext({ deviceScaleFactor: 1 });

  // ---- logos -> transparent PNG (inline SVG markup) ----
  for (const l of LOGOS) {
    const page = await ctx.newPage();
    const W = l.w * 2;
    await page.setViewportSize({ width: W, height: Math.round(W * 126 / 668) });
    await page.setContent(
      `<style>html,body{margin:0}svg{display:block;width:${W}px;height:auto}</style>` +
      svgText(l.src));
    await page.waitForTimeout(150);
    const el = await page.$('svg');
    await el.screenshot({ path: path.join(OUT, l.out), omitBackground: true });
    console.log('logo', l.out);
    await page.close();
  }

  // ---- photos -> object-fit cover crops @2x ----
  for (const p of PHOTOS) {
    const page = await ctx.newPage();
    const W = p.w * 2, H = p.h * 2;
    await page.setViewportSize({ width: W, height: H });
    await page.setContent(
      `<style>html,body{margin:0}#box{width:${W}px;height:${H}px;overflow:hidden}` +
      `img{width:100%;height:100%;object-fit:cover;object-position:center;display:block}</style>` +
      `<div id="box"><img src="${jpg(p.src)}"></div>`);
    await page.waitForFunction(() => { const i = document.images[0]; return i && i.complete && i.naturalWidth > 0; });
    const el = await page.$('#box');
    await el.screenshot({ path: path.join(OUT, p.out), type: 'jpeg', quality: 82 });
    console.log('photo', p.out);
    await page.close();
  }

  // ---- Api spotlight: photo + gradient + baked headline ----
  {
    const page = await ctx.newPage();
    const W = 680 * 2, H = 440 * 2;
    await page.setViewportSize({ width: W, height: H });
    await page.setContent(`<!doctype html><html><head>${FONT_LINK}<style>
      html,body{margin:0}
      #box{position:relative;width:${W}px;height:${H}px;overflow:hidden;background:#0f0d0b}
      #box>img{width:100%;height:100%;object-fit:cover;display:block}
      #ov{position:absolute;left:0;right:0;bottom:0;padding:68px 80px 52px;
          background:linear-gradient(to top,rgba(15,13,11,.92),rgba(15,13,11,.55) 55%,rgba(15,13,11,0));color:#F4EFE4}
      #lbl{font-family:'DM Mono',monospace;font-size:22px;letter-spacing:.16em;text-transform:uppercase;color:#E4C98A;margin-bottom:20px}
      #hd{font-family:'Fraunces',serif;font-weight:400;font-size:68px;line-height:1.06;letter-spacing:-.015em;margin:0;color:#F4EFE4}
    </style></head><body>
      <div id="box"><img src="${jpg('r/peak-sunset.jpg')}">
        <div id="ov"><div id="lbl">04 — Expedition Spotlight</div>
        <h2 id="hd">Api Himal Exploratory Expedition</h2></div>
      </div></body></html>`);
    await page.waitForFunction(() => { const i = document.images[0]; return i && i.complete && i.naturalWidth > 0; });
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(300);
    const el = await page.$('#box');
    await el.screenshot({ path: path.join(OUT, 'spotlight.jpg'), type: 'jpeg', quality: 84 });
    console.log('spotlight.jpg');
    await page.close();
  }

  await browser.close();
  console.log('done');
};

run().catch((e) => { console.error(e); process.exit(1); });
