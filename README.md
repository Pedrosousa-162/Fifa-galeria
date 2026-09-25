# EA SPORTS FC 27 — Fotos

Static photo gallery (React + Vite). No backend, no database.

## Swap the photos

1. Drop your images in `public/images/` named `foto01` … `foto13`
   (`.png`, `.jpg`, `.jpeg`, `.webp` and `.avif` all work; the extension is detected automatically).
2. Edit the captions in `src/teams.js`.

Any size or aspect ratio is fine. Images are always shown in full and never cropped or stretched.
Slots without an image show an "Em breve" placeholder.
To change the shape of the image box (e.g. for landscape screenshots), set `CARD_ASPECT` in `src/teams.js`.

## Run locally

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # production build in dist/
```

## Deploy to Vercel

Push the folder to GitHub and import it in Vercel. It detects Vite automatically
(build: `npm run build`, output: `dist`). Or from the terminal: `npx vercel --prod`.
