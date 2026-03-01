export default function EpisodeHeader({ ep, title, subtitle, center = false }) {
  return (
    <div className={`ep-header reveal${center ? " ep-header--center" : ""}`}>
      <div className="ep-tag">{ep}</div>
      <h2 className="ep-title">{title}</h2>
      {subtitle && <p className="ep-subtitle">{subtitle}</p>}
    </div>
  );
}
