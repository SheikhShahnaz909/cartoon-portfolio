import { useState } from "react";
import { EPISODES } from "../data/episodes";

const NAV_ITEMS = [
  { label: "🌅 Morning",   id: "hero" },
  { label: "☕ About",     id: "about" },
  { label: "⚡ Skills",   id: "skills" },
  { label: "🚀 Projects", id: "projects" },
  { label: "💌 Contact",  id: "contact" },
];

export default function Navbar({ activeSection }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  const ep = EPISODES[activeSection];

  return (
    <nav className="navbar">
      <div className="nav-logo" onClick={() => scrollTo("hero")}>
        🌸 Shahnaz.dev
      </div>

      {/* Desktop links */}
      <ul className="nav-links">
        {NAV_ITEMS.map(({ label, id }) => (
          <li key={id}>
            <button
              className={`nav-btn${activeSection === id ? " active" : ""}`}
              onClick={() => scrollTo(id)}
            >
              {label}
            </button>
          </li>
        ))}
      </ul>

      {/* Episode pill */}
      <div className="nav-episode-pill">
        {ep ? `${ep.num} · ${ep.label}` : "EP.01 · Morning"}
      </div>

      {/* Hamburger */}
      <button
        className="hamburger"
        onClick={() => setMenuOpen((o) => !o)}
        aria-label="Toggle menu"
      >
        <span />
        <span />
        <span />
      </button>

      {/* Mobile drawer */}
      {menuOpen && (
        <div className="mobile-menu">
          {NAV_ITEMS.map(({ label, id }) => (
            <button
              key={id}
              className={`mobile-nav-btn${activeSection === id ? " active" : ""}`}
              onClick={() => scrollTo(id)}
            >
              {label}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}
