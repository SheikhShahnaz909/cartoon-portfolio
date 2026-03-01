import { useState, useEffect } from "react";
import { POSES } from "../data/poses";

export default function WelcomeSplashSimple({ onComplete }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Progress bar
    const timer = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(timer);
          return 100;
        }
        return p + 3;
      });
    }, 50);

    // Auto-dismiss after 3 seconds
    const dismissTimer = setTimeout(() => {
      onComplete();
    }, 3000);

    return () => {
      clearInterval(timer);
      clearTimeout(dismissTimer);
    };
  }, [onComplete]);

  return (
    <div style={{
      position: "fixed",
      inset: 0,
      zIndex: 9999,
      background: "linear-gradient(135deg, #fef3c7 0%, #fce7f3 30%, #ddd6fe 60%, #bfdbfe 100%)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      animation: "fadeIn 0.5s ease-out"
    }}>
      {/* Floating emojis */}
      <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
        {["✨", "💫", "🌸", "⭐", "💗", "🎀"].map((emoji, i) => (
          <span
            key={i}
            style={{
              position: "absolute",
              fontSize: "2rem",
              left: `${15 + i * 14}%`,
              animation: `floatUp ${3 + i * 0.5}s ease-in-out infinite`,
              animationDelay: `${i * 0.3}s`
            }}
          >
            {emoji}
          </span>
        ))}
      </div>

      {/* Main card */}
      <div style={{
        background: "white",
        borderRadius: "2rem",
        border: "3px solid rgba(244, 114, 182, 0.3)",
        boxShadow: "0 20px 60px rgba(236, 72, 153, 0.25)",
        padding: "2.5rem",
        maxWidth: "520px",
        width: "90%",
        textAlign: "center",
        position: "relative",
        zIndex: 1
      }}>
        {/* Character */}
        <div style={{
          width: "140px",
          height: "140px",
          borderRadius: "50%",
          background: "linear-gradient(135deg, #fce7f3, #e9d5ff)",
          border: "4px solid #fbcfe8",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          margin: "0 auto 1.5rem",
          overflow: "hidden",
          boxShadow: "0 0 0 8px rgba(244, 114, 182, 0.1)"
        }}>
          <img 
            src={POSES.excited} 
            alt="Shahnaz" 
            style={{ width: "110%", height: "110%", objectFit: "cover" }}
          />
        </div>

        {/* Title */}
        <h1 style={{
          fontFamily: "'Baloo 2', sans-serif",
          fontSize: "3rem",
          fontWeight: 900,
          background: "linear-gradient(135deg, #ec4899, #c084fc, #60a5fa)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          marginBottom: "0.5rem"
        }}>
          Welcome! 🌸
        </h1>

        <p style={{ fontSize: "1.3rem", color: "#6b7280", fontWeight: 700, marginBottom: "0.5rem" }}>
          to <span style={{
            background: "linear-gradient(135deg, #ec4899, #a855f7)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            fontWeight: 900,
            fontSize: "1.4rem"
          }}>Shahnaz's</span> Portfolio
        </p>

        <p style={{ fontSize: "0.95rem", color: "#9ca3af", fontWeight: 600, marginBottom: "2rem" }}>
          Where code meets creativity ✨
        </p>

        {/* Loading bar */}
        <div style={{ width: "100%", marginBottom: "1.5rem" }}>
          <div style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: "0.85rem",
            fontWeight: 700,
            color: "#ec4899",
            marginBottom: "0.5rem"
          }}>
            <span>Loading magic...</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div style={{
            width: "100%",
            height: "10px",
            background: "linear-gradient(90deg, #fce7f3, #e9d5ff)",
            borderRadius: "100px",
            overflow: "hidden",
            border: "1.5px solid rgba(244, 114, 182, 0.3)"
          }}>
            <div style={{
              height: "100%",
              width: `${progress}%`,
              background: "linear-gradient(90deg, #ec4899, #a855f7, #3b82f6)",
              borderRadius: "100px",
              transition: "width 0.3s ease",
              boxShadow: "0 0 10px rgba(236, 72, 153, 0.5)"
            }} />
          </div>
        </div>

        {/* Skip button */}
        <button
          onClick={onComplete}
          style={{
            background: "linear-gradient(135deg, #fce7f3, #e9d5ff)",
            color: "#be185d",
            border: "2px solid rgba(244, 114, 182, 0.3)",
            fontFamily: "'Nunito', sans-serif",
            fontWeight: 800,
            fontSize: "0.85rem",
            padding: "0.5rem 1.2rem",
            borderRadius: "2rem",
            cursor: "pointer",
            transition: "all 0.2s"
          }}
          onMouseEnter={(e) => {
            e.target.style.background = "linear-gradient(135deg, #fbcfe8, #ddd6fe)";
            e.target.style.transform = "translateY(-2px)";
          }}
          onMouseLeave={(e) => {
            e.target.style.background = "linear-gradient(135deg, #fce7f3, #e9d5ff)";
            e.target.style.transform = "translateY(0)";
          }}
        >
          Skip intro →
        </button>
      </div>

      {/* Bottom text */}
      <div style={{
        position: "absolute",
        bottom: "2rem",
        display: "flex",
        alignItems: "center",
        gap: "0.75rem",
        fontSize: "0.9rem",
        fontWeight: 700,
        color: "#6b7280"
      }}>
        <span style={{ fontSize: "1.3rem" }}>💻</span>
        <span>Prepare for a colorful adventure</span>
        <span style={{ fontSize: "1.3rem" }}>🎨</span>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes floatUp {
          0%, 100% { transform: translateY(0) rotate(0deg); opacity: 0.6; }
          50% { transform: translateY(-30px) rotate(180deg); opacity: 1; }
        }
      `}</style>
    </div>
  );
}
