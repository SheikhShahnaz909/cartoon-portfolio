import { useState, useEffect } from "react";
import { useGreeting } from "../hooks/useGreeting";

function LiveClock() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const update = () => {
      const now = new Date();
      const h = String(now.getHours()).padStart(2, "0");
      const m = String(now.getMinutes()).padStart(2, "0");
      setTime(`${h}:${m}`);
    };
    update();
    const id = setInterval(update, 10000);
    return () => clearInterval(id);
  }, []);

  return <span>{time}</span>;
}

function ScheduleCard({ period }) {
  const tasks = {
    morning: [
      { done: true,  text: "☕ Chai — critical" },
      { done: true,  text: "⏰ Wake up (eventually)" },
      { done: false, text: "💻 Write clean code" },
      { done: false, text: "🚀 Ship something cool" },
      { done: false, text: "💌 Talk to humans" },
    ],
    afternoon: [
      { done: true,  text: "☕ Chai (3rd cup)" },
      { done: true,  text: "💻 Morning PRs merged!" },
      { done: false, text: "🐛 Squash those bugs" },
      { done: false, text: "🎨 Design review" },
      { done: false, text: "🚀 Deploy by EOD" },
    ],
    evening: [
      { done: true,  text: "🚀 Shipped today's feature" },
      { done: true,  text: "📝 PR reviewed & merged" },
      { done: false, text: "✨ Side project time" },
      { done: false, text: "🎨 Design exploration" },
      { done: false, text: "🌸 Wind down & relax" },
    ],
    night: [
      { done: true,  text: "🌙 Survived the day!" },
      { done: true,  text: "🚀 Shipped something cool" },
      { done: false, text: "⭐ Late night coding..." },
      { done: false, text: "🐱 Cat.exe is running" },
      { done: false, text: "☕ Decaf this time, maybe" },
    ],
  };

  const list = tasks[period] || tasks.morning;

  return (
    <div className="schedule-card">
      <div className="schedule-label">Today's Schedule</div>
      <div className="schedule-time">
        <LiveClock />
      </div>
      <div className="schedule-tasks">
        {list.map((t, i) => (
          <div key={i} className={`task-item${t.done ? " task-done" : ""}`}>
            {t.done ? "✅" : "⬜"} {t.text}
          </div>
        ))}
      </div>
      <div className="schedule-status">🟢 Available for work!</div>
    </div>
  );
}

export default function Hero() {
  const { text, emoji, period } = useGreeting();

  const scrollTo = (id) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section id="hero" className="section hero-section">
      <div className="section-inner hero-grid">
        {/* Left */}
        <div className="hero-left">
          <div className="reveal hero-eyebrow">
            <span className="alarm-icon">⏰</span>
            <span className="eyebrow-pill">📺 Episode 01 · The Daily Boot-Up</span>
          </div>

          <h1 className="reveal hero-title" style={{ transitionDelay: "0.1s" }}>
            {text}, {emoji}
            <br />
            I'm <span className="gradient-text">Shahnaz</span> —
            <br />
            and it's time to code!
          </h1>

          <p className="reveal hero-desc" style={{ transitionDelay: "0.2s" }}>
            Every {period === "night" ? "night" : period} she opens her laptop,
            sips her tea, and transforms into a{" "}
            <strong>Frontend Developer</strong> on a mission to build beautiful
            digital worlds.
          </p>

          <div className="reveal hero-tags" style={{ transitionDelay: "0.3s" }}>
            {["⚛️ React", "🎨 Tailwind", "✨ Framer Motion", "💻 JavaScript"].map(
              (t) => (
                <span key={t} className="tag">
                  {t}
                </span>
              )
            )}
          </div>

          <div className="reveal hero-btns" style={{ transitionDelay: "0.4s" }}>
            <button
              className="btn-primary"
              onClick={() => scrollTo("projects")}
            >
              See My Work 🚀
            </button>
            <button
              className="btn-outline"
              onClick={() => scrollTo("contact")}
            >
              Say Hello 💌
            </button>
          </div>
        </div>

        {/* Right */}
        <div className="reveal hero-right" style={{ transitionDelay: "0.2s" }}>
          <ScheduleCard period={period} />
        </div>
      </div>

      <div className="scroll-hint" onClick={() => scrollTo("about")}>
        <span>↓</span>
        next episode
      </div>
    </section>
  );
}
