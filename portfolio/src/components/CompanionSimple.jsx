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
    <div style={{
      position: "fixed",
      bottom: 0,
      right: "clamp(0.4rem, 2vw, 2rem)",  /* responsive right margin */
      zIndex: 300,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      transition: "all 0.5s cubic-bezier(0.34, 1.2, 0.64, 1)",
    }}>

      {/* Minimize button — pink gradient, always visible, sits ABOVE bubble */}
      <button
        onClick={() => setMinimized((m) => !m)}
        title={minimized ? "Expand" : "Minimize"}
        onMouseEnter={e => e.currentTarget.style.transform = "scale(1.18)"}
        onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
        style={{
          position: "absolute",
          top: "-38px",           /* above the bubble so it's never covered */
          right: 0,
          background: "linear-gradient(135deg, #f472b6, #a855f7)",
          border: "none",
          borderRadius: "50%",
          width: "30px",
          height: "30px",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "1rem",
          color: "white",
          fontWeight: 900,
          boxShadow: "0 4px 16px rgba(244,114,182,0.65)",
          transition: "transform 0.2s",
          padding: 0,
          lineHeight: 1,
          zIndex: 10,
        }}
      >
        {minimized ? "＋" : "－"}
      </button>

      {/* Frosted glass bubble — raised high enough to not cover button */}
      {!minimized && (
        <div style={{
          position: "absolute",
          bottom: "clamp(140px, 17vw, 215px)",  /* scales with image size */
          right: "8px",
          background: "rgba(255,255,255,0.7)",
          backdropFilter: "blur(14px)",
          WebkitBackdropFilter: "blur(14px)",
          border: "1.5px solid rgba(244,114,182,0.38)",
          borderRadius: "1.1rem",
          padding: "0.65rem 0.9rem",
          maxWidth: "clamp(130px, 26vw, 215px)",
          minWidth: "120px",
          boxShadow: "0 8px 28px rgba(244,114,182,0.2), 0 2px 8px rgba(0,0,0,0.05)",
          fontSize: "clamp(0.7rem, 1.2vw, 0.8rem)",
          fontWeight: 700,
          color: "#6b21a8",
          lineHeight: 1.55,
          opacity: bubbleVisible ? 1 : 0,
          transition: "opacity 0.3s",
          pointerEvents: "none",
        }}>
          <span>{ep.lines[currentLine]}</span>
          <div style={{
            position: "absolute", bottom: "-10px", right: "26px",
            width: 0, height: 0,
            borderLeft: "9px solid transparent", borderRight: "9px solid transparent",
            borderTop: "11px solid rgba(255,255,255,0.7)",
          }} />
          <div style={{
            position: "absolute", bottom: "-13px", right: "24px",
            width: 0, height: 0,
            borderLeft: "11px solid transparent", borderRight: "11px solid transparent",
            borderTop: "13px solid rgba(244,114,182,0.38)",
          }} />
        </div>
      )}

      {/* Character — transparent bg, drop-shadow only, responsive size */}
      <img
        src={pose}
        alt={`Shahnaz — ${ep.pose}`}
        onClick={handleClick}
        onMouseEnter={e => e.currentTarget.style.filter =
          "drop-shadow(0 10px 30px rgba(236,72,153,0.58)) drop-shadow(0 2px 8px rgba(236,72,153,0.28))"}
        onMouseLeave={e => e.currentTarget.style.filter =
          "drop-shadow(0 8px 24px rgba(236,72,153,0.38)) drop-shadow(0 2px 6px rgba(236,72,153,0.18))"}
        style={{
          width:  minimized ? "52px"  : "clamp(100px, 13vw, 165px)",
          height: minimized ? "65px"  : "clamp(125px, 16vw, 205px)",
          objectFit: "contain",
          objectPosition: "top",
          background: "transparent",
          filter: "drop-shadow(0 8px 24px rgba(236,72,153,0.38)) drop-shadow(0 2px 6px rgba(236,72,153,0.18))",
          transition: "all 0.4s cubic-bezier(0.34, 1.2, 0.64, 1)",
          cursor: "pointer",
          transformOrigin: "bottom center",
          display: "block",
        }}
        title="Click me! 🌸"
      />

      {/* Ground glow */}
      <div style={{
        width: minimized ? "20px" : "clamp(36px, 5vw, 60px)",
        height: "9px",
        background: "linear-gradient(90deg, transparent, rgba(244,114,182,0.3), transparent)",
        borderRadius: "50%",
        marginTop: "-5px",
        filter: "blur(4px)",
        transition: "width 0.4s",
      }} />
    </div>
  );
}