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
          ['"location"', '"India"'],
          ['"passion"',  '"UI/UX Design and Web Development"'],
          ['"coffee"',   'false'],
          ['"tea"',      'true'],
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
          subtitle="She makes her tea, opens her editor, and introduces herself to the world."
        />

        <div className="about-grid">
         
          <div className="reveal" style={{ transitionDelay: "0.1s" }}>
            <OsWindow />
            <div className="stat-row">
              <StatBox num="10+" label="Projects" />
              <StatBox num="5+" label="Skills" />
              <StatBox num="☕∞" label="Chai" />
            </div>
          </div>

          
          <div className="reveal about-bio" style={{ transitionDelay: "0.2s" }}>
            <div className="about-emoji">🌸</div>
            <h3 className="about-name">Frontend Developer &amp; UI Enthusiast</h3>
            <p>
              Every day begins the same way — alarm goes off, she groans, makes
              tea, and suddenly remembers she <em>loves</em> coding. ☕✨
            </p>
            <p>
              Shahnaz specializes in{" "}
              <strong className="highlight">React</strong>,{" "}
              <strong className="highlight">Tailwind CSS</strong>, and{" "}
              <strong className="highlight">JavaScript</strong>. She has a passion for crafting
              beautiful, user-friendly interfaces and bringing designs to life on the web.
            </p>
            <p>
              When not coding: she reads, listens to music, spends time with her cat and
              enjoys the little things in her life and goes back 
              to coding.{" "}
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
