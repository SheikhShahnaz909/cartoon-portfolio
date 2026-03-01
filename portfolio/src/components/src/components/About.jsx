import EpisodeHeader from "./EpisodeHeader";

function OsWindow() {
  return (
    <div className="os-window">
      <div className="os-titlebar">
        <span className="os-dot red" />
        <span className="os-dot yellow" />
        <span className="os-dot green" />
        <span className="os-title">shahnaz.profile.json</span>
      </div>
      <div className="code-body">
        <span className="c-brace">{"{"}</span>
        <br />
        {[
          ['"name"',     '"Shahnaz"'],
          ['"role"',     '"Frontend Developer"'],
          ['"location"', '"Pakistan 🇵🇰"'],
          ['"passion"',  '"UI/UX & pink things"'],
          ['"coffee"',   'true'],
          ['"available"','true'],
          ['"cats"',     '"obviously 🐱"'],
          ['"bugs_today"','0 /* goals */'],
        ].map(([key, val], i) => (
          <div key={i} className="code-line">
            &nbsp;&nbsp;
            <span className="c-key">{key}</span>:{" "}
            <span className={val === "true" || val.startsWith("0") ? "c-bool" : "c-val"}>{val}</span>
            {i < 7 ? "," : ""}
          </div>
        ))}
        <span className="c-brace">{"}"}</span>
      </div>
    </div>
  );
}

function StatBox({ num, label }) {
  return (
    <div className="stat-box">
      <div className="stat-num">{num}</div>
      <div className="stat-label">{label}</div>
    </div>
  );
}

export default function About() {
  const scrollTo = (id) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section id="about" className="section about-section">
      <div className="section-inner">
        <EpisodeHeader
          ep="📺 Episode 02"
          title="Meet the Developer ☕"
          subtitle="She makes her coffee, opens her editor, and introduces herself to the world."
        />

        <div className="about-grid">
          {/* Left: code card */}
          <div className="reveal" style={{ transitionDelay: "0.1s" }}>
            <OsWindow />
            <div className="stat-row">
              <StatBox num="3+" label="Projects" />
              <StatBox num="5+" label="Skills" />
              <StatBox num="☕∞" label="Coffees" />
            </div>
          </div>

          {/* Right: bio */}
          <div className="reveal about-bio" style={{ transitionDelay: "0.2s" }}>
            <div className="about-emoji">🌸</div>
            <h3 className="about-name">Frontend Developer &amp; UI Enthusiast</h3>
            <p>
              Every day begins the same way — alarm goes off, she groans, makes
              coffee, and suddenly remembers she <em>loves</em> coding. ☕✨
            </p>
            <p>
              Shahnaz specializes in{" "}
              <strong className="highlight">React</strong>,{" "}
              <strong className="highlight">Tailwind CSS</strong>, and{" "}
              <strong className="highlight">Framer Motion</strong>. She turns
              designs into pixel-perfect, animated interfaces that users actually enjoy.
            </p>
            <p>
              When not coding: exploring design systems, perfecting color
              palettes, or convincing her cat that the keyboard is{" "}
              <em>not</em> a bed. 🐱
            </p>
            <button
              className="btn-primary"
              style={{ alignSelf: "flex-start" }}
              onClick={() => scrollTo("contact")}
            >
              Let's Work Together 💌
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
