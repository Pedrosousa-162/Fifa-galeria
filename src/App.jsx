import { useCallback, useState } from "react";
import { TEAMS, CARD_ASPECT, CTA } from "./teams.js";
import { pad } from "./utils.js";
import TeamCard from "./components/TeamCard.jsx";
import Lightbox from "./components/Lightbox.jsx";

export default function App() {
  const [openIndex, setOpenIndex] = useState(null);

  const close = useCallback(() => setOpenIndex(null), []);
  const step = useCallback(
    (dir) => setOpenIndex((i) => (i === null ? i : (i + dir + TEAMS.length) % TEAMS.length)),
    []
  );

  return (
    <>
      <div className="bg" aria-hidden="true">
        <span className="bg__light bg__light--l" />
        <span className="bg__light bg__light--r" />
        <span className="bg__pitch" />
      </div>

      <header className="topbar" id="topo">
        <div className="topbar__inner">
          <a href="#topo" className="brand" aria-label="FC 27">
            <span className="brand__mark">FC</span>
            <span className="brand__num">27</span>
          </a>
          <nav className="nav" aria-label="Principal">
            <a href="#fotos">Fotos</a>
            <a href="#galeria">Galeria</a>
          </nav>
        </div>
      </header>

      <section className="hero" id="fotos">
        <p className="hero__kicker">EA SPORTS</p>
        <h1 className="hero__title">
          <span className="sr-only">EA SPORTS </span>FC 27
        </h1>
        <div className="hero__sub">
          <span className="hero__rule" aria-hidden="true" />
          <h2>FOTOS</h2>
          <span className="hero__rule hero__rule--r" aria-hidden="true" />
        </div>
        <p className="hero__meta">
          Galeria de Fotos <span className="hero__sep" aria-hidden="true" /> {pad(TEAMS.length)} Fotos
        </p>
        <a className="cta" href={CTA.url} target="_blank" rel="noopener noreferrer">
          {CTA.label}
          <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
            <path d="M7 17 17 7M9 7h8v8" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>
      </section>

      <main className="gallery" id="galeria">
        <ol className="grid" style={{ "--card-aspect": CARD_ASPECT }}>
          {TEAMS.map((team, i) => (
            <TeamCard key={i} team={team} index={i} eager={i < 4} onOpen={setOpenIndex} />
          ))}
        </ol>
      </main>

      <footer className="footer">
        <span>EA SPORTS FC 27</span>
        <span className="hero__sep" aria-hidden="true" />
        <span>Galeria de Fotos</span>
      </footer>

      {openIndex !== null && (
        <Lightbox teams={TEAMS} index={openIndex} onClose={close} onStep={step} />
      )}
    </>
  );
}
