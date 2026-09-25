import { useEffect, useRef, useState } from "react";
import { pad } from "../utils.js";
import SmartImage from "./SmartImage.jsx";
import Placeholder from "./Placeholder.jsx";

const Arrow = ({ dir }) => (
  <svg viewBox="0 0 24 24" width="28" height="28" aria-hidden="true">
    <path
      d={dir === "prev" ? "M15 5 8 12l7 7" : "m9 5 7 7-7 7"}
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default function Lightbox({ teams, index, onClose, onStep }) {
  const team = teams[index];
  const number = pad(index + 1);
  const closeRef = useRef(null);
  const touchX = useRef(null);

  // Which image is shown: 0 = the photo itself, n = its nth extra. Resets when the photo changes.
  const views = [team.image, ...team.extras];
  const [selected, setSelected] = useState({ index, view: 0 });
  const view = selected.index === index ? selected.view : 0;

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowRight") onStep(1);
      else if (e.key === "ArrowLeft") onStep(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose, onStep]);

  // Lock page scroll while open and hand focus back to the card on close.
  useEffect(() => {
    const returnTo = document.activeElement;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      document.body.style.overflow = overflow;
      returnTo?.focus?.({ preventScroll: true });
    };
  }, []);

  const onTouchStart = (e) => {
    touchX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e) => {
    if (touchX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchX.current;
    if (Math.abs(dx) > 50) onStep(dx < 0 ? 1 : -1);
    touchX.current = null;
  };
  const closeOnBackdrop = (e) => e.target === e.currentTarget && onClose();

  const neighbours = [(index + 1) % teams.length, (index - 1 + teams.length) % teams.length];

  return (
    <div
      className="lightbox"
      role="dialog"
      aria-modal="true"
      aria-label={team.name}
      onClick={closeOnBackdrop}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <div className="lightbox__bar">
        <div className="lightbox__title">
          <span className="lightbox__num">{number}</span>
          <span className="lightbox__name">{team.name}</span>
        </div>
        <div className="lightbox__right">
          <span className="lightbox__count">
            {number} <span>/ {pad(teams.length)}</span>
          </span>
          <button
            ref={closeRef}
            type="button"
            className="lb-btn lb-btn--close"
            onClick={onClose}
            aria-label="Fechar (Esc)"
          >
            <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
              <path d="M6 6l12 12M18 6 6 18" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      </div>

      <div className="lightbox__stage" onClick={closeOnBackdrop}>
        <SmartImage
          key={views[view]}
          image={views[view]}
          alt={team.name}
          eager
          className="lightbox__img"
          fallback={
            <div className="lightbox__placeholder">
              <Placeholder number={number} />
            </div>
          }
        />
      </div>

      {team.extras.length > 0 && (
        <div className="strip">
          <span className="strip__label">
            Mais imagens <b>{team.extras.length}</b>
          </span>
          <div className="strip__row">
            {views.map((image, i) => (
              <button
                key={image}
                type="button"
                className={`strip__thumb${i === view ? " is-active" : ""}`}
                onClick={() => setSelected({ index, view: i })}
                aria-label={i === 0 ? "Foto principal" : `Imagem extra ${i}`}
                aria-current={i === view}
              >
                <SmartImage image={image} alt="" eager thumb className="strip__img" />
              </button>
            ))}
          </div>
        </div>
      )}

      <button
        type="button"
        className="lb-btn lb-btn--nav lb-btn--prev"
        onClick={() => onStep(-1)}
        aria-label="Foto anterior"
      >
        <Arrow dir="prev" />
      </button>
      <button
        type="button"
        className="lb-btn lb-btn--nav lb-btn--next"
        onClick={() => onStep(1)}
        aria-label="Foto seguinte"
      >
        <Arrow dir="next" />
      </button>

      {/* Preload the next and previous photos so stepping is instant. */}
      <div hidden>
        {neighbours.map((n) => (
          <SmartImage key={n} image={teams[n].image} alt="" eager />
        ))}
      </div>
    </div>
  );
}
