import { useState, useEffect } from "react";
import { POSES } from "../data/poses";

export default function WelcomeSplash({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Progress bar animation
    const progressTimer = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(progressTimer);
          return 100;
        }
        return p + 2;
      });
    }, 40);

    // Auto-dismiss after 3.5 seconds
    const dismissTimer = setTimeout(() => {
      setFadeOut(true);
      setTimeout(onComplete, 600);
    }, 3500);

    return () => {
      clearInterval(progressTimer);
      clearTimeout(dismissTimer);
    };
  }, [onComplete]);

  return (
    <div className={`welcome-splash${fadeOut ? " fade-out" : ""}`}>
      {/* Particles */}
      <div className="splash-particles">
        {["✨", "💫", "🌸", "⭐", "💗", "🎀"].map((e, i) => (
          <span
            key={i}
            className="splash-particle"
            style={{
              left: `${15 + i * 14}%`,
              animationDelay: `${i * 0.3}s`,
            }}
          >
            {e}
          </span>
        ))}
      </div>

      {/* Main card */}
      <div className="splash-card">
        {/* Character */}
        <div className="splash-character">
          <img src={POSES.excited} alt="Shahnaz waving" />
        </div>

        {/* Text */}
        <div className="splash-content">
          <h1 className="splash-title">
            Welcome! 🌸
          </h1>
          <p className="splash-subtitle">
            to <span className="splash-name">Shahnaz's</span> Portfolio
          </p>
          <p className="splash-tagline">
            Where code meets creativity ✨
          </p>

          {/* Loading bar */}
          <div className="splash-loader">
            <div className="splash-loader-label">
              <span>Loading magic...</span>
              <span>{progress}%</span>
            </div>
            <div className="splash-bar">
              <div
                className="splash-bar-fill"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Skip button */}
          <button
            className="splash-skip"
            onClick={() => {
              setFadeOut(true);
              setTimeout(onComplete, 400);
            }}
          >
            Skip intro →
          </button>
        </div>
      </div>

      {/* Bottom text */}
      <div className="splash-footer">
        <span className="splash-emoji">💻</span>
        <span>Prepare for a colorful adventure</span>
        <span className="splash-emoji">🎨</span>
      </div>

      <style>{`
        .welcome-splash {
          position: fixed;
          inset: 0;
          z-index: 9999;
          background: linear-gradient(135deg, #fef3c7 0%, #fce7f3 30%, #ddd6fe 60%, #bfdbfe 100%);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          animation: splashIn 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
          overflow: hidden;
        }
        .welcome-splash.fade-out {
          animation: splashOut 0.5s ease-out forwards;
        }
        @keyframes splashIn {
          from { opacity: 0; transform: scale(0.9); }
          to   { opacity: 1; transform: scale(1); }
        }
        @keyframes splashOut {
          to { opacity: 0; transform: scale(1.05); }
        }

        .splash-particles {
          position: absolute;
          inset: 0;
          pointer-events: none;
        }
        .splash-particle {
          position: absolute;
          font-size: 2rem;
          animation: splashFloat 3s ease-in-out infinite;
        }
        @keyframes splashFloat {
          0%, 100% { transform: translateY(0) rotate(0deg); opacity: 0.6; }
          50%      { transform: translateY(-30px) rotate(180deg); opacity: 1; }
        }

        .splash-card {
          background: white;
          border-radius: 2rem;
          border: 3px solid rgba(244, 114, 182, 0.3);
          box-shadow: 0 20px 60px rgba(236, 72, 153, 0.25),
                      0 0 0 1px rgba(255, 255, 255, 0.5) inset;
          padding: 2.5rem;
          max-width: 520px;
          width: 90%;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1.5rem;
          animation: cardFloat 3s ease-in-out infinite;
        }
        @keyframes cardFloat {
          0%, 100% { transform: translateY(0); }
          50%      { transform: translateY(-10px); }
        }

        .splash-character {
          width: 140px;
          height: 140px;
          border-radius: 50%;
          background: linear-gradient(135deg, #fce7f3, #e9d5ff);
          border: 4px solid #fbcfe8;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          box-shadow: 0 0 0 8px rgba(244, 114, 182, 0.1);
          animation: charWave 2s ease-in-out infinite;
        }
        .splash-character img {
          width: 110%;
          height: 110%;
          object-fit: cover;
        }
        @keyframes charWave {
          0%, 100% { transform: rotate(-3deg); }
          50%      { transform: rotate(3deg); }
        }

        .splash-content {
          text-align: center;
          width: 100%;
        }

        .splash-title {
          font-family: 'Baloo 2', sans-serif;
          font-size: 3rem;
          font-weight: 900;
          background: linear-gradient(135deg, #ec4899, #c084fc, #60a5fa);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 0.5rem;
          animation: titlePulse 2s ease-in-out infinite;
        }
        @keyframes titlePulse {
          0%, 100% { transform: scale(1); }
          50%      { transform: scale(1.05); }
        }

        .splash-subtitle {
          font-size: 1.3rem;
          color: #6b7280;
          font-weight: 700;
          margin-bottom: 0.5rem;
        }

        .splash-name {
          background: linear-gradient(135deg, #ec4899, #a855f7);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          font-weight: 900;
          font-size: 1.4rem;
        }

        .splash-tagline {
          font-size: 0.95rem;
          color: #9ca3af;
          font-weight: 600;
          margin-bottom: 2rem;
        }

        .splash-loader {
          width: 100%;
          margin-bottom: 1.5rem;
        }

        .splash-loader-label {
          display: flex;
          justify-content: space-between;
          font-size: 0.85rem;
          font-weight: 700;
          color: #ec4899;
          margin-bottom: 0.5rem;
        }

        .splash-bar {
          width: 100%;
          height: 10px;
          background: linear-gradient(90deg, #fce7f3, #e9d5ff);
          border-radius: 100px;
          overflow: hidden;
          border: 1.5px solid rgba(244, 114, 182, 0.3);
        }

        .splash-bar-fill {
          height: 100%;
          background: linear-gradient(90deg, #ec4899, #a855f7, #3b82f6);
          border-radius: 100px;
          transition: width 0.3s ease;
          box-shadow: 0 0 10px rgba(236, 72, 153, 0.5);
        }

        .splash-skip {
          background: linear-gradient(135deg, #fce7f3, #e9d5ff);
          color: #be185d;
          border: 2px solid rgba(244, 114, 182, 0.3);
          font-family: 'Nunito', sans-serif;
          font-weight: 800;
          font-size: 0.85rem;
          padding: 0.5rem 1.2rem;
          border-radius: 2rem;
          cursor: pointer;
          transition: all 0.2s;
        }
        .splash-skip:hover {
          background: linear-gradient(135deg, #fbcfe8, #ddd6fe);
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(236, 72, 153, 0.3);
        }

        .splash-footer {
          position: absolute;
          bottom: 2rem;
          display: flex;
          align-items: center;
          gap: 0.75rem;
          font-size: 0.9rem;
          font-weight: 700;
          color: #6b7280;
        }
        .splash-emoji {
          font-size: 1.3rem;
          animation: emojiSpin 3s linear infinite;
        }
        @keyframes emojiSpin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }

        @media (max-width: 640px) {
          .splash-card { padding: 2rem 1.5rem; }
          .splash-title { font-size: 2.5rem; }
          .splash-character { width: 110px; height: 110px; }
        }
      `}</style>
    </div>
  );
}
