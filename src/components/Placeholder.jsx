export default function Placeholder({ number }) {
  return (
    <div className="placeholder" aria-hidden="true">
      <svg viewBox="0 0 120 140" className="placeholder__crest">
        <path
          d="M60 6 108 22v42c0 32-20 55-48 70C32 119 12 96 12 64V22Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <path
          d="M60 18 96 30v34c0 25-15 43-36 55-21-12-36-30-36-55V30Z"
          fill="currentColor"
          opacity=".07"
        />
        <text x="60" y="84" textAnchor="middle" className="placeholder__num">
          {number}
        </text>
      </svg>
      <span className="placeholder__label">Em breve</span>
    </div>
  );
}
