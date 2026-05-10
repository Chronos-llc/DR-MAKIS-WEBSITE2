# Dr Makis Website (Vite + Netlify + Secure Formspree)

Mobile-first static website implementation based on provided reference screenshots.

## Tech Stack

- Vite (vanilla JS)
- Multi-page routing:
  - `/` (home)
  - `/checkout` (checkout)
- Netlify Functions for secure Formspree proxy (`/.netlify/functions/checkout`)

## Project Structure

- `index.html` - home route
- `checkout/index.html` - checkout route
- `src/data/content.js` - all page copy + content models
- `src/components/homeApp.js` - homepage rendering + interactions
- `src/components/checkoutApp.js` - checkout rendering + submit flow
- `src/components/cartStore.js` - localStorage cart logic
- `src/styles/main.css` - full site styles
- `netlify/functions/checkout.js` - secure Formspree serverless handler
- `public/placeholders/` - placeholder images

## Local Setup

1. Install dependencies:

```bash
npm install
```

2. Create `.env` from `.env.example`:

```bash
cp .env.example .env
```

3. Fill required env values:

- `FORMSPREE_FORM_ID`
- `FORMSPREE_BEARER_TOKEN`
- `SITE_BASE_URL`

4. Run dev server:

```bash
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

## Deployment (Netlify)

This repo includes `netlify.toml` with:

- `publish = "dist"`
- `functions = "netlify/functions"`
- redirect `/checkout -> /checkout/`

Add the same environment variables in Netlify site settings.

## Security Notes

- No Formspree secret/token is exposed in client-side code.
- Checkout form submits to Netlify function, which forwards sanitized data to Formspree.

## Content Notes

- Contact details are updated globally:
  - Email: `contact@makisweb.org`
  - Telegram: `https://t.me/Makis_Consult`
- Existing address text is retained from references.
- Any ambiguous screenshot text is marked with `TODO_COPY_*` in `src/data/content.js`.
