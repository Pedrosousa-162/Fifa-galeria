import { useMemo, useState } from "react";

const EXTENSIONS = ["png", "jpg", "jpeg", "webp", "avif"];
const BASE = import.meta.env.BASE_URL;

// "foto01" → one URL per supported extension; "foto01.jpg" → just that file.
// With `thumb`, the light copy made by scripts/thumbs.mjs is tried first.
function candidates(image, thumb) {
  if (/^(https?:)?\//.test(image)) return [image];
  const hasExt = /\.[a-z0-9]+$/i.test(image);
  const originals = hasExt
    ? [`${BASE}images/${image}`]
    : EXTENSIONS.map((ext) => `${BASE}images/${image}.${ext}`);
  if (!thumb) return originals;
  const name = hasExt ? image.replace(/\.[^.]+$/, "") : image;
  return [`${BASE}thumbs/${name}.webp`, ...originals];
}

/** Tries each candidate URL in turn and renders `fallback` if none exist. */
export default function SmartImage({ image, alt, eager = false, thumb = false, className = "", fallback = null }) {
  const sources = useMemo(() => candidates(image, thumb), [image, thumb]);
  const [attempt, setAttempt] = useState(0);
  const [loaded, setLoaded] = useState(false);

  if (attempt >= sources.length) return fallback;

  return (
    <img
      src={sources[attempt]}
      alt={alt}
      loading={eager ? "eager" : "lazy"}
      decoding="async"
      draggable="false"
      className={`${className}${loaded ? " is-loaded" : ""}`}
      onLoad={() => setLoaded(true)}
      onError={() => setAttempt((n) => n + 1)}
    />
  );
}
