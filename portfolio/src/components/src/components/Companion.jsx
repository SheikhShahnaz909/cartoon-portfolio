import { useState, useEffect, useCallback, useRef } from "react";
import { POSES } from "../data/poses";
import { EPISODES } from "../data/episodes";

export default function Companion({ activeSection }) {
  const [minimized, setMinimized] = useState(false);
  const [currentLine, setCurrentLine] = useState(0);
  const [bubbleVisible, setBubbleVisible] = useState(true);
  const [animClass, setAnimClass] = useState("");
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isFollowing, setIsFollowing] = useState(true);
  const smoothPosRef = useRef({ x: 0, y: 0 });

  const ep = EPISODES[activeSection] || EPISODES.hero;
  const pose = POSES[ep.pose] || POSES.idle;

  // Mouse follow effect (smooth)
  useEffect(() => {
    if (!isFollowing || minimized) return;

    const handleMouseMove = (e) => {
      // Target position: cursor but with offset so character doesn't cover it
      const targetX = e.clientX - window.innerWidth + 180;
      const targetY = e.clientY - 100;
      
      setPosition({ x: targetX, y: targetY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [isFollowing, minimized]);

  // Smooth position interpolation
  useEffect(() => {
    if (!isFollowing || minimized) {
      smoothPosRef.current = { x: 0, y: 0 };
      return;
    }

    let animFrame;
    const smoothMove = () => {
      smoothPosRef.current.x += (position.x - smoothPosRef.current.x) * 0.08;
      smoothPosRef.current.y += (position.y - smoothPosRef.current.y) * 0.08;
      animFrame = requestAnimationFrame(smoothMove);
    };
    animFrame = requestAnimationFrame(smoothMove);
    return () => cancelAnimationFrame(animFrame);
  }, [position, isFollowing, minimized]);

  // Cycle dialogue lines
  useEffect(() => {
    setCurrentLine(0);
    triggerAnim(ep.anim);

    const timer = setInterval(() => {
      setBubbleVisible(false);
      setTimeout(() => {
        setCurrentLine((prev) => (prev + 1) % ep.lines.length);
        setBubbleVisible(true);
      }, 350);
    }, 6000);

    return () => clearInterval(timer);
  }, [activeSection]);

  const triggerAnim = useCallback((anim) => {
    setAnimClass(anim);
    setTimeout(() => setAnimClass(""), 900);
  }, []);

  const handleClick = () => {
    setBubbleVisible(false);
    setTimeout(() => {
      setCurrentLine((prev) => (prev + 1) % ep.lines.length);
      setBubbleVisible(true);
    }, 300);
    triggerAnim("bounce");
  };

  const toggleFollow = () => {
    setIsFollowing((f) => !f);
    if (isFollowing) {
      setPosition({ x: 0, y: 0 });
    }
  };

  return (
    <div
      className={`companion${minimized ? " minimized" : ""}${
        isFollowing ? " following" : ""
      }`}
      style={
        isFollowing && !minimized
          ? {
              transform: `translate(${smoothPosRef.current.x}px, ${smoothPosRef.current.y}px)`,
              transition: "none",
            }
          : undefined
      }
    >
      {/* Controls */}
      <div className="companion-controls">
        <button
          className="companion-control-btn"
          onClick={toggleFollow}
          title={isFollowing ? "Stop following" : "Follow cursor"}
        >
          {isFollowing ? "📍" : "🎯"}
        </button>
        <button
          className="companion-control-btn"
          onClick={() => setMinimized((m) => !m)}
          title={minimized ? "Expand" : "Minimize"}
        >
          {minimized ? "+" : "−"}
        </button>
      </div>

      {/* Speech bubble */}
      {!minimized && (
        <div
          className="companion-bubble"
          style={{ opacity: bubbleVisible ? 1 : 0 }}
        >
          <span>{ep.lines[currentLine]}</span>
        </div>
      )}

      {/* Character image */}
      <img
        src={pose}
        alt={`Shahnaz — ${ep.pose}`}
        className={`companion-img ${animClass}`}
        onClick={handleClick}
        title="Click me! 🌸"
      />

      <div className="companion-shadow" />
    </div>
  );
}
