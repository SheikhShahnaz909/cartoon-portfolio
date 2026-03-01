import { useState, useEffect } from "react";
import { POSES } from "../data/poses";
import { EPISODES } from "../data/episodes";

export default function CompanionSimple({ activeSection }) {
  const [minimized, setMinimized] = useState(false);
  const [currentLine, setCurrentLine] = useState(0);
  const [bubbleVisible, setBubbleVisible] = useState(true);

  const ep = EPISODES[activeSection] || EPISODES.hero;
  const pose = POSES[ep.pose] || POSES.idle;

  useEffect(() => {
    setCurrentLine(0);

    const timer = setInterval(() => {
      setBubbleVisible(false);
      setTimeout(() => {
        setCurrentLine((prev) => (prev + 1) % ep.lines.length);
        setBubbleVisible(true);
      }, 350);
    }, 6000);

    return () => clearInterval(timer);
  }, [activeSection, ep.lines.length]);

  const handleClick = () => {
    setBubbleVisible(false);
    setTimeout(() => {
      setCurrentLine((prev) => (prev + 1) % ep.lines.length);
      setBubbleVisible(true);
    }, 300);
  };

  return (
    <div
      style={{
        position: "fixed",
        bottom: 0,
        right: "2rem",
        zIndex: 300,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        transition: "all 0.5s cubic-bezier(0.34, 1.2, 0.64, 1)"
      }}
    >
      <button
        onClick={() => setMinimized((m) => !m)}
        style={{
          position: "absolute",
          top: "-28px",
          right: 0,
          background: "white",
          border: "2px solid #fce7f3",
          borderRadius: "50%",
          width: "26px",
          height: "26px",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "0.8rem",
          boxShadow: "0 8px 32px rgba(244,114,182,0.18)",
          transition: "all 0.2s",
          color: "#6b7280",
          fontWeight: 800,
          lineHeight: 1,
          padding: 0
        }}
        title={minimized ? "Expand" : "Minimize"}
      >
        {minimized ? "+" : "−"}
      </button>

      {!minimized && (
        <div
          style={{
            position: "absolute",
            bottom: "195px",
            right: "10px",
            background: "white",
            border: "2px solid #fce7f3",
            borderRadius: "1.2rem",
            padding: "0.7rem 1rem",
            maxWidth: "220px",
            minWidth: "155px",
            boxShadow: "0 8px 32px rgba(244,114,182,0.25)",
            fontSize: "0.8rem",
            fontWeight: 700,
            color: "#374151",
            lineHeight: 1.5,
            opacity: bubbleVisible ? 1 : 0,
            transition: "opacity 0.3s"
          }}
        >
          <span>{ep.lines[currentLine]}</span>
    
          <div
            style={{
              position: "absolute",
              bottom: "-11px",
              right: "26px",
              width: 0,
              height: 0,
              borderLeft: "10px solid transparent",
              borderRight: "10px solid transparent",
              borderTop: "12px solid white"
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: "-14px",
              right: "24px",
              width: 0,
              height: 0,
              borderLeft: "12px solid transparent",
              borderRight: "12px solid transparent",
              borderTop: "14px solid #fce7f3"
            }}
          />
        </div>
      )}

      <img
        src={pose}
        alt={`Shahnaz — ${ep.pose}`}
        onClick={handleClick}
        style={{
          width: minimized ? "60px" : "165px",
          height: minimized ? "75px" : "205px",
          objectFit: "contain",
          objectPosition: "top",
          filter: "drop-shadow(0 8px 24px rgba(236,72,153,0.3))",
          transition: "all 0.4s cubic-bezier(0.34, 1.2, 0.64, 1)",
          cursor: "pointer",
          transformOrigin: "bottom center"
        }}
        title="Click me! 🌸"
      />

      <div
        style={{
          width: minimized ? "25px" : "60px",
          height: "8px",
          background: "linear-gradient(90deg, transparent, rgba(244,114,182,0.25), transparent)",
          borderRadius: "50%",
          marginTop: "-4px",
          filter: "blur(3px)"
        }}
      />
    </div>
  );
}
