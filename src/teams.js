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

/*
 * Social links. `copy` instead of `url` shows a button that copies the text
 * (used for Discord, which is a username, not a link).
 * featured: true → also shown as a big button under the title.
 */
export const SOCIALS = [
  { id: "kick", name: "Kick", handle: "pedrosousa162", url: "https://kick.com/pedrosousa162", featured: true },
  { id: "twitch", name: "Twitch", handle: "pedrosousa162", url: "https://www.twitch.tv/pedrosousa162" },
  { id: "instagram", name: "Instagram", handle: "@pedrosousa_79", url: "https://www.instagram.com/pedrosousa_79" },
  { id: "tiktok", name: "TikTok", handle: "@pedrosousa_79", url: "https://www.tiktok.com/@pedrosousa_79" },
  { id: "tiktok", name: "TikTok Clipes", handle: "@pedrosousa162clipes", url: "https://www.tiktok.com/@pedrosousa162clipes" },
  { id: "youtube", name: "YouTube", handle: "@ClipesPedrosousa162", url: "https://www.youtube.com/@ClipesPedrosousa162" },
  { id: "discord", name: "Discord", handle: "Pedrosousa162", copy: "Pedrosousa162" },
];
