import { PROJECTS } from "../data/episodes";
import EpisodeHeader from "./EpisodeHeader";

function ProjectCard({ emoji, bg, title, desc, stack, demo, repo, delay }) {
  return (
    <div
      className="proj-card reveal"
      style={{ transitionDelay: `${delay}s` }}
    >
      <div className="proj-thumb" style={{ background: bg }}>
        {emoji}
      </div>
      <div className="proj-body">
        <h3 className="proj-title">{title}</h3>
        <p className="proj-desc">{desc}</p>
        <div className="proj-stack">
          {stack.map((t) => (
            <span key={t} className="tag tag--sm">
              {t}
            </span>
          ))}
        </div>
        <div className="proj-links">
          <a
            href={demo}
            className="btn-xs btn-xs--solid"
            target="_blank"
            rel="noreferrer"
          >
            🚀 Live Demo
          </a>
          <a
            href={repo}
            className="btn-xs btn-xs--ghost"
            target="_blank"
            rel="noreferrer"
          >
            📁 GitHub
          </a>
        </div>
      </div>
    </div>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="section projects-section">
      <div className="section-inner">
        <EpisodeHeader
          ep="📺 Episode 04"
          title="Shipping Day 🚀"
          subtitle="The best part of the day — deploying things. Here are her proudest launches."
          center
        />
        <div className="proj-grid">
          {PROJECTS.map((p, i) => (
            <ProjectCard key={p.title} {...p} delay={i * 0.07} />
          ))}

          {/* GitHub card */}
          <a
            href="https://github.com/SheikhShahnaz909"
            target="_blank"
            rel="noreferrer"
            className="proj-card proj-card--github reveal"
            style={{ transitionDelay: `${PROJECTS.length * 0.07}s` }}
          >
            <div className="github-card-inner">
              <span className="github-card-cat">🐱</span>
              <div className="github-card-title">More on GitHub</div>
              <div className="github-card-sub">github.com/SheikhShahnaz909</div>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}
