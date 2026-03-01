import { useSkillBars } from "../hooks/useSkillBars";
import { SKILLS } from "../data/episodes";
import EpisodeHeader from "./EpisodeHeader";

function SkillCard({ icon, name, pct, tags, delay }) {
  return (
    <div
      className="skill-card reveal"
      style={{ transitionDelay: `${delay}s` }}
    >
      <div className="sk-icon">{icon}</div>
      <div className="sk-row">
        <span className="sk-name">{name}</span>
        <span className="sk-pct">{pct}%</span>
      </div>
      <div className="bar-bg">
        <div className="bar-fill" data-width={`${pct}%`} />
      </div>
      <div className="sk-tags">
        {tags.map((t) => (
          <span key={t} className="sk-tag">
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Skills() {
  useSkillBars();

  return (
    <section id="skills" className="section skills-section">
      <div className="section-inner">
        <EpisodeHeader
          ep="📺 Episode 03"
          title="The Training Arc ⚡"
          subtitle="Like every good protagonist, she spent years levelling up her skills. Here's her current stat sheet."
          center
        />
        <div className="skills-grid">
          {SKILLS.map((s, i) => (
            <SkillCard key={s.name} {...s} delay={i * 0.07} />
          ))}
        </div>
      </div>
    </section>
  );
}
