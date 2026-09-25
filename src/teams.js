/*
 * ─── EDIT THIS FILE TO CHANGE THE PHOTOS ───────────────────────────────
 *
 * name  → text shown under the image
 * image → file name inside /public/images
 *         Without an extension ("1") the site tries
 *         .png, .jpg, .jpeg, .webp and .avif automatically.
 *         You can also write it in full: "1.jpg"
 *
 * Add or remove lines to change the number of photos.
 */
export const TEAMS = [
  { name: "Foto 01", image: "1" },
  { name: "Foto 02", image: "2" },
  { name: "Foto 03", image: "3" },
  { name: "Foto 04", image: "4" },
  { name: "Foto 05", image: "5" },
  { name: "Foto 06", image: "6" },
  { name: "Foto 07", image: "7" },
  { name: "Foto 08", image: "8" },
  { name: "Foto 09", image: "9" },
  { name: "Foto 10", image: "10" },
  { name: "Foto 11", image: "11" },
  { name: "Foto 12", image: "12" },
  { name: "Foto 13", image: "13" },
];

/*
 * Shape of the image box on each card (width / height).
 * Images always fit fully inside it and are never cropped.
 *   "16 / 9" → landscape photos (default)
 *   "1 / 1"  → square
 *   "4 / 5"  → portrait
 */
export const CARD_ASPECT = "16 / 9";

/* Button under the title. */
export const CTA = {
  label: "Vê os jogadores que precisas de comprar aqui",
  url: "https://www.fut.gg/fut-gallery/",
};
