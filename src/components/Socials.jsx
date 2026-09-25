import { useState } from "react";
import { siDiscord, siInstagram, siKick, siTiktok, siTwitch, siYoutube } from "simple-icons";

const ICONS = {
  kick: siKick,
  twitch: siTwitch,
  instagram: siInstagram,
  tiktok: siTiktok,
  youtube: siYoutube,
  discord: siDiscord,
};

export function SocialIcon({ id, size = 20 }) {
  const icon = ICONS[id];
  if (!icon) return null;
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" aria-hidden="true">
      <path d={icon.path} />
    </svg>
  );
}

// Link for URLs, copy-to-clipboard button for plain usernames (Discord).
function SocialLink({ social, className, children }) {
  const [copied, setCopied] = useState(false);

  if (social.url) {
    return (
      <a className={className} href={social.url} target="_blank" rel="noopener noreferrer" aria-label={`${social.name}: ${social.handle}`}>
        {children(false)}
      </a>
    );
  }

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(social.copy);
    } catch {
      window.prompt(`${social.name}:`, social.copy);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <button type="button" className={className} onClick={copy} aria-label={`Copiar ${social.name}: ${social.handle}`}>
      {children(copied)}
    </button>
  );
}

/** Small icons in the top bar. */
export function SocialBar({ socials }) {
  return (
    <div className="socialbar">
      {socials.map((s, i) => (
        <SocialLink key={i} social={s} className="socialbar__link">
          {(copied) => (
            <>
              <SocialIcon id={s.id} size={18} />
              {copied && <span className="socialbar__toast">Copiado!</span>}
            </>
          )}
        </SocialLink>
      ))}
    </div>
  );
}

/** "Segue-me" section at the bottom of the page. */
export function SocialSection({ socials }) {
  return (
    <section className="socials" id="redes" aria-labelledby="redes-title">
      <div className="socials__head">
        <span className="hero__rule" aria-hidden="true" />
        <h2 id="redes-title">SEGUE-ME</h2>
        <span className="hero__rule hero__rule--r" aria-hidden="true" />
      </div>
      <ul className="socials__grid">
        {socials.map((s, i) => (
          <li key={i}>
            <SocialLink social={s} className={`social social--${s.id}`}>
              {(copied) => (
                <>
                  <span className="social__icon">
                    <SocialIcon id={s.id} size={24} />
                  </span>
                  <span className="social__text">
                    <span className="social__name">{s.name}</span>
                    <span className="social__handle">{copied ? "Copiado!" : s.handle}</span>
                  </span>
                  <span className="social__action" aria-hidden="true">
                    {s.url ? "↗" : "Copiar"}
                  </span>
                </>
              )}
            </SocialLink>
          </li>
        ))}
      </ul>
    </section>
  );
}
