# Thamserku Expedition — Newsletter Vol. 01 (email-ready)

Bulletproof HTML email built from the "1a — The Standard" design. Table-based
layout with inline styles; tested to render in **Gmail, Outlook (desktop + web),
Zoho, Apple Mail, Yahoo** and mobile clients.

## Files
- `thamserku-newsletter-vol01.html` — the email. Ready to paste into an ESP.
- `images/` — 8 optimized assets (crops rendered @2x for retina; text baked into
  the Api spotlight image; logos are transparent PNG).
- `preview-full.png` — a full-length screenshot of the rendered email (reference only; do not send).

## Handoff — 2 steps

### 1. Deploy the images (REQUIRED)
Email clients cannot load local/relative images — they must live on a public URL.
The images are already committed to the web app at `apps/web/public/newsletter/images/`,
so they go live on the next deploy of the web app and resolve at:

```
https://thamserku-expedition-web-alpha.vercel.app/newsletter/images/logo-color.png
https://thamserku-expedition-web-alpha.vercel.app/newsletter/images/hero.jpg
...etc
```

The HTML already points at that base URL. **Deploy the web app first**, then open one
of the URLs above in a browser to confirm the image loads before sending the campaign.
If you later move to the production domain, find-and-replace the base URL in the HTML.

### 2. Send
Paste the full HTML into the campaign editor (Mailchimp / Zoho Campaigns / Brevo /
"paste code" option) and send. Send yourself a test first.

## Notes for whoever sends it
- **Fonts:** Apple Mail / iOS show the real brand fonts (Fraunces / DM Sans / DM Mono).
  Outlook & Gmail fall back to Georgia / Arial / Courier — this is expected and normal
  for email; the layout and hierarchy are preserved either way.
- **Images off:** every image has descriptive `alt` text for recipients who block images.
- **"View in browser" / "Unsubscribe":** these link to the homepage as placeholders.
  Your ESP will normally auto-insert real hosted-version and unsubscribe links — wire
  them to the ESP's merge tags before sending a real campaign.
- **Width:** 680px on desktop, fluid down to a single column on phones.
- Do not open the HTML file expecting images to appear locally — they only load once
  hosted at the URL above.

## Regenerating the images (optional, dev only)
From the repo root:
```
NODE_PATH=./node_modules node apps/newsletter/build-assets.mjs   # rebuild images/
NODE_PATH=./node_modules node apps/newsletter/preview.mjs        # rebuild preview-full.png
```
Sources live in `apps/newsletter/reference/assets/`.
