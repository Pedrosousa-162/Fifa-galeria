import { pad } from "../utils.js";
import SmartImage from "./SmartImage.jsx";
import Placeholder from "./Placeholder.jsx";

export default function TeamCard({ team, index, eager, onOpen }) {
  const number = pad(index + 1);

  return (
    <li className="card">
      <button
        type="button"
        className="card__media"
        onClick={() => onOpen(index)}
        aria-label={`Abrir ${team.name} em ecrã inteiro`}
      >
        <SmartImage
          image={team.image}
          alt={team.name}
          eager={eager}
          thumb
          className="card__img"
          fallback={<Placeholder number={number} />}
        />
        <span className="card__zoom" aria-hidden="true">
          <svg viewBox="0 0 24 24" width="18" height="18">
            <path
              d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </span>
      </button>
      <div className="card__footer">
        <span className="card__num">{number}</span>
        <div className="card__info">
          <h3 className="card__name">{team.name}</h3>
        </div>
      </div>
    </li>
  );
}
