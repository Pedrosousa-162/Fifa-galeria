# EA SPORTS FC 27 — Fotos

Static photo gallery (React + Vite). No backend, no database.

## Swap the photos

1. Drop your images in `public/images/` named `1` … `13`
   (`.png`, `.jpg`, `.jpeg`, `.webp` and `.avif` all work; the extension is detected automatically).
2. Edit the captions in `src/teams.js`.

## Extra images per photo

Put extra images for a photo in `public/images/extras/<photo>/`, e.g. `public/images/extras/1/` for photo 1.
They appear as a strip under the photo when it is opened, in file-name order.
The list and small preview copies are generated automatically by `npm run dev` / `npm run build`
(or run `npm run thumbs` while the dev server is already running).

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
