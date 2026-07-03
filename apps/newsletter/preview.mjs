import { chromium } from 'playwright-core';
import fs from 'node:fs';
import path from 'node:path';

const ROOT = '/Users/user/vynspire/thamserku-expedition/apps/newsletter';
const IMG = path.join(ROOT, 'dist/images');
const html0 = fs.readFileSync(path.join(ROOT, 'dist/thamserku-newsletter-vol01.html'), 'utf8');

const mime = (f) => f.endsWith('.png') ? 'image/png' : 'image/jpeg';
const dataUri = (f) => `data:${mime(f)};base64,` + fs.readFileSync(path.join(IMG, f)).toString('base64');

// swap absolute URLs -> local data URIs
const html = html0.replace(/https:\/\/thamserkuexpedition\.com\/newsletter\/images\/([\w.-]+)/g,
  (_, f) => fs.existsSync(path.join(IMG, f)) ? dataUri(f) : _);

const run = async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 720, height: 1000 }, deviceScaleFactor: 1 });
  await page.setContent(html, { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts && document.fonts.ready);
  await page.waitForTimeout(400);
  await page.screenshot({ path: path.join(ROOT, 'dist/preview-full.png'), fullPage: true });
  // mobile
  await page.setViewportSize({ width: 380, height: 800 });
  await page.waitForTimeout(200);
  await page.screenshot({ path: path.join(ROOT, 'dist/preview-mobile.png'), fullPage: true });
  await browser.close();
  console.log('preview done');
};
run().catch((e) => { console.error(e); process.exit(1); });
