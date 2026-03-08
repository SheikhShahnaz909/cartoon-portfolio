import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ── Oreo SVG ──────────────────────────────────────────────────────────────────
const OreoCat = () => (
  <svg width="90" height="100" viewBox="0 0 80 90" fill="none" xmlns="http://www.w3.org/2000/svg"
    style={{ filter: "drop-shadow(0 6px 18px rgba(217,119,6,0.35))" }}>
    <path d="M22 68 Q8 55 11 42" stroke="#d97706" strokeWidth="6" strokeLinecap="round" fill="none"/>
    <circle cx="11" cy="42" r="4" fill="white"/>
    <ellipse cx="40" cy="66" rx="21" ry="17" fill="white" stroke="#e5e7eb" strokeWidth="1.5"/>
    <ellipse cx="52" cy="60" rx="10" ry="8" fill="#f59e0b" opacity="0.72"/>
    <ellipse cx="27" cy="69" rx="8" ry="7" fill="#d97706" opacity="0.60"/>
    <circle cx="40" cy="38" r="20" fill="white" stroke="#e5e7eb" strokeWidth="1.5"/>
    <ellipse cx="29" cy="28" rx="10" ry="8" fill="#f59e0b" opacity="0.68"/>
    <ellipse cx="55" cy="33" rx="8" ry="7" fill="#d97706" opacity="0.62"/>
    <ellipse cx="42" cy="23" rx="6" ry="5" fill="#fbbf24" opacity="0.50"/>
    <polygon points="22,22 15,5 33,18" fill="white" stroke="#e5e7eb" strokeWidth="1.2"/>
    <polygon points="58,22 65,5 47,18" fill="#f59e0b" stroke="#d97706" strokeWidth="1"/>
    <polygon points="24,21 19,9 31,18" fill="#fda4a4" opacity="0.85"/>
    <polygon points="56,21 61,9 49,18" fill="#fda4a4" opacity="0.85"/>
    <path d="M30 39 Q34 34 38 39" stroke="#92400e" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
    <path d="M42 39 Q46 34 50 39" stroke="#92400e" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
    <ellipse cx="40" cy="44" rx="3" ry="2" fill="#f9a8d4"/>
    <path d="M37 46 Q40 50 43 46" stroke="#f9a8d4" strokeWidth="1.8" strokeLinecap="round" fill="none"/>
    <line x1="16" y1="42" x2="33" y2="43" stroke="#9ca3af" strokeWidth="1.2" strokeLinecap="round"/>
    <line x1="16" y1="46" x2="33" y2="46" stroke="#9ca3af" strokeWidth="1.2" strokeLinecap="round"/>
    <line x1="47" y1="43" x2="64" y2="42" stroke="#9ca3af" strokeWidth="1.2" strokeLinecap="round"/>
    <line x1="47" y1="46" x2="64" y2="46" stroke="#9ca3af" strokeWidth="1.2" strokeLinecap="round"/>
    <ellipse cx="26" cy="47" rx="6" ry="3.5" fill="#fda4af" opacity="0.55"/>
    <ellipse cx="54" cy="47" rx="6" ry="3.5" fill="#fda4af" opacity="0.55"/>
    <ellipse cx="18" cy="62" rx="7" ry="6" fill="white" stroke="#e5e7eb" strokeWidth="1"/>
    <ellipse cx="20" cy="60" rx="4" ry="3" fill="#f59e0b" opacity="0.55"/>
    <ellipse cx="62" cy="76" rx="7" ry="6" fill="white" stroke="#e5e7eb" strokeWidth="1"/>
    <ellipse cx="31" cy="82" rx="6" ry="5" fill="white" stroke="#e5e7eb" strokeWidth="1"/>
    <ellipse cx="49" cy="82" rx="6" ry="5" fill="#f59e0b" stroke="#d97706" strokeWidth="1" opacity="0.82"/>
  </svg>
);

// ── Floating emoji particle ───────────────────────────────────────────────────
const EMOJIS = ["🌸","✨","💗","⭐","🎀","💫","🌷","💕"];
function Particle({ delay, left }) {
  const emoji = EMOJIS[Math.floor(Math.random() * EMOJIS.length)];
  return (
    <motion.span
      initial={{ y: "105vh", opacity: 0 }}
      animate={{ y: "-10vh", opacity: [0, 0.9, 0.9, 0] }}
      transition={{ duration: 5 + Math.random() * 3, delay, ease: "linear", repeat: Infinity, repeatDelay: Math.random() * 4 }}
      style={{ position: "absolute", left, bottom: 0, fontSize: "1rem", pointerEvents: "none", zIndex: 0 }}
    >
      {emoji}
    </motion.span>
  );
}

// ── Main component ────────────────────────────────────────────────────────────
export default function SplashScreen({ onComplete }) {
  const [visible, setVisible] = useState(true); // controls AnimatePresence
  const [progress, setProgress] = useState(0);
  const [showEp1, setShowEp1]   = useState(false);
  const [showEp2, setShowEp2]   = useState(false);
  const [showName, setShowName] = useState(false);
  const [showOreo, setShowOreo] = useState(false);
  const [showBar,  setShowBar]  = useState(false);
  const progRef = useRef(0);

  // Staggered content reveals
  useEffect(() => {
    const t1 = setTimeout(() => setShowBar(true),  200);
    const t2 = setTimeout(() => setShowEp1(true),  600);
    const t3 = setTimeout(() => setShowEp2(true),  1300);
    const t4 = setTimeout(() => setShowName(true), 2000);
    const t5 = setTimeout(() => setShowOreo(true), 2200);
    return () => [t1,t2,t3,t4,t5].forEach(clearTimeout);
  }, []);

  // Progress bar: fills over ~3.2s, then triggers exit
  useEffect(() => {
    const id = setInterval(() => {
      progRef.current += 1.2;
      setProgress(Math.min(Math.round(progRef.current), 100));
      if (progRef.current >= 100) {
        clearInterval(id);
        // Wait a beat, then trigger the zoom-out exit
        setTimeout(() => {
          setVisible(false);               // triggers AnimatePresence exit
          setTimeout(onComplete, 900);     // unmount after animation
        }, 400);
      }
    }, 40);
    return () => clearInterval(id);
  }, [onComplete]);

  const particles = Array.from({ length: 16 }, (_, i) => ({
    id: i,
    delay: i * 0.3,
    left: `${(i / 16) * 100}%`,
  }));

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="splash"
          initial={{ opacity: 1, scale: 1 }}
          exit={{
            scale: 2.6,
            opacity: 0,
            filter: "blur(20px)",
            transition: { duration: 0.85, ease: [0.76, 0, 0.24, 1] },
          }}
          style={{
            position: "fixed", inset: 0, zIndex: 99999,
            display: "flex", flexDirection: "column",
            alignItems: "center", justifyContent: "center",
            overflow: "hidden",
            background: "linear-gradient(135deg, #fff0f9 0%, #fce7f3 30%, #ede9fe 65%, #fdf4ff 100%)",
          }}
        >
          {/* Scan-line texture */}
          <div style={{
            position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0,
            backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(236,72,153,0.025) 3px, rgba(236,72,153,0.025) 4px)",
          }}/>

          {/* Floating particles */}
          {particles.map(p => <Particle key={p.id} delay={p.delay} left={p.left} />)}

          {/* ── Top-left: live badge ── */}
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.5, ease: "backOut" }}
            style={{
              position: "absolute",
              top: "clamp(1rem, 3vw, 1.8rem)",
              left: "clamp(1rem, 3vw, 2.2rem)",
              display: "flex", alignItems: "center", gap: "0.45rem",
              zIndex: 2,
            }}
          >
            <motion.span
              animate={{ opacity: [1, 0.15, 1] }}
              transition={{ repeat: Infinity, duration: 1.0 }}
              style={{
                width: 9, height: 9, borderRadius: "50%",
                background: "#f43f5e", display: "inline-block",
                boxShadow: "0 0 8px #f43f5e99",
              }}
            />
            <span style={{
              fontFamily: "monospace", fontSize: "clamp(0.58rem, 1.1vw, 0.68rem)",
              color: "#9d174d", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase",
            }}>Now Streaming</span>
          </motion.div>

          {/* ── Top-right: EP badge ── */}
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5, ease: "backOut" }}
            style={{
              position: "absolute",
              top: "clamp(0.9rem, 2.5vw, 1.6rem)",
              right: "clamp(1rem, 3vw, 2.2rem)",
              background: "linear-gradient(135deg, #f472b6, #a855f7)",
              borderRadius: 999, padding: "0.28rem 0.85rem",
              fontSize: "clamp(0.58rem, 1.1vw, 0.68rem)",
              fontFamily: "monospace", color: "white", fontWeight: 800,
              letterSpacing: "0.1em",
              boxShadow: "0 4px 14px rgba(244,114,182,0.45)",
              zIndex: 2,
            }}
          >
            EP.01 · PILOT
          </motion.div>

          {/* ── Center stage ── */}
          <div style={{
            position: "relative", zIndex: 2,
            display: "flex", flexDirection: "column",
            alignItems: "center", gap: "1.4rem",
            padding: "0 1.5rem", width: "100%", maxWidth: 560,
            textAlign: "center",
          }}>

            {/* Episode label lines */}
            <div style={{ minHeight: "3.8rem" }}>
              <AnimatePresence>
                {showEp1 && (
                  <motion.p key="ep1"
                    initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                    transition={{ duration: 0.45 }}
                    style={{
                      margin: "0 0 0.2rem",
                      fontFamily: "monospace",
                      fontSize: "clamp(0.65rem, 1.3vw, 0.76rem)",
                      color: "#a855f7", fontWeight: 700,
                      letterSpacing: "0.2em", textTransform: "uppercase",
                    }}
                  >📺 &nbsp;Season 01 · Episode 01</motion.p>
                )}
              </AnimatePresence>
              <AnimatePresence>
                {showEp2 && (
                  <motion.p key="ep2"
                    initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                    transition={{ duration: 0.45 }}
                    style={{
                      margin: 0,
                      fontFamily: "Georgia, serif",
                      fontSize: "clamp(0.88rem, 2vw, 1.05rem)",
                      color: "#9d174d", fontWeight: 500,
                      fontStyle: "italic", letterSpacing: "0.05em",
                    }}
                  >The Daily Boot-Up</motion.p>
                )}
              </AnimatePresence>
            </div>

            {/* Name */}
            <AnimatePresence>
              {showName && (
                <motion.div key="name"
                  initial={{ opacity: 0, scale: 0.78, y: 24 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.65, ease: [0.34, 1.4, 0.64, 1] }}
                >
                  {/* Glow blob */}
                  <div style={{
                    position: "absolute", inset: "-30px -50px",
                    background: "radial-gradient(ellipse, rgba(244,114,182,0.25) 0%, transparent 68%)",
                    pointerEvents: "none",
                  }}/>
                  <h1 style={{
                    margin: 0, position: "relative",
                    fontFamily: "Georgia, 'Times New Roman', serif",
                    fontSize: "clamp(3.2rem, 11vw, 6.8rem)",
                    fontWeight: 900, fontStyle: "italic",
                    background: "linear-gradient(135deg, #ec4899 0%, #a855f7 50%, #ec4899 100%)",
                    backgroundSize: "200% 200%",
                    WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
                    lineHeight: 1, letterSpacing: "-0.02em",
                    animation: "splashShimmer 3s ease-in-out infinite",
                    filter: "drop-shadow(0 4px 22px rgba(244,114,182,0.38))",
                  }}>
                    Shahnaz
                  </h1>
                  <p style={{
                    margin: "0.55rem 0 0",
                    fontFamily: "Georgia, serif", fontStyle: "italic",
                    fontSize: "clamp(0.68rem, 1.6vw, 0.88rem)",
                    color: "#be185d", letterSpacing: "0.16em",
                    textTransform: "uppercase", fontWeight: 600,
                  }}>
                    Frontend Developer · UI Enthusiast · Cat Mom
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Oreo + bubble */}
            <AnimatePresence>
              {showOreo && (
                <motion.div key="oreo"
                  initial={{ opacity: 0, y: 28, scale: 0.72 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.55, ease: [0.34, 1.4, 0.64, 1] }}
                  style={{ display: "flex", alignItems: "flex-end", gap: "0.6rem" }}
                >
                  <motion.div
                    animate={{ y: [0, -7, 0] }}
                    transition={{ repeat: Infinity, duration: 1.9, ease: "easeInOut" }}
                  >
                    <OreoCat />
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.6 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3, duration: 0.35, ease: "backOut" }}
                    style={{
                      background: "rgba(255,255,255,0.82)",
                      backdropFilter: "blur(10px)",
                      WebkitBackdropFilter: "blur(10px)",
                      border: "2px solid rgba(244,114,182,0.42)",
                      borderRadius: "14px 14px 14px 4px",
                      padding: "0.48rem 0.8rem",
                      fontSize: "clamp(0.68rem, 1.3vw, 0.78rem)",
                      fontWeight: 700, color: "#9d174d",
                      whiteSpace: "nowrap", marginBottom: 14,
                      boxShadow: "0 4px 14px rgba(244,114,182,0.18)",
                    }}
                  >
                    Let's go! 🐾✨
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Loading bar */}
            <AnimatePresence>
              {showBar && (
                <motion.div key="bar"
                  initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  style={{ width: "clamp(200px, 44vw, 340px)" }}
                >
                  <div style={{
                    display: "flex", justifyContent: "space-between",
                    marginBottom: "0.4rem",
                  }}>
                    <span style={{
                      fontFamily: "monospace", fontSize: "clamp(0.58rem, 1vw, 0.66rem)",
                      color: "#a855f7", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase",
                    }}>Loading portfolio…</span>
                    <span style={{
                      fontFamily: "monospace", fontSize: "clamp(0.58rem, 1vw, 0.66rem)",
                      color: "#ec4899", fontWeight: 800,
                    }}>{progress}%</span>
                  </div>

                  {/* Track */}
                  <div style={{
                    height: 7, borderRadius: 999,
                    background: "rgba(244,114,182,0.14)",
                    border: "1px solid rgba(244,114,182,0.22)",
                    overflow: "hidden",
                  }}>
                    <motion.div
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 0.08, ease: "linear" }}
                      style={{
                        height: "100%", borderRadius: 999,
                        background: "linear-gradient(90deg, #f472b6, #a855f7, #f472b6)",
                        backgroundSize: "200% 100%",
                        animation: "splashBar 1.1s linear infinite",
                        boxShadow: "0 0 10px rgba(244,114,182,0.55)",
                      }}
                    />
                  </div>

                  {/* Bouncing dots */}
                  <div style={{ display: "flex", gap: "0.28rem", justifyContent: "center", marginTop: "0.65rem" }}>
                    {[0,1,2].map(i => (
                      <motion.span key={i}
                        animate={{ y: [0, -5, 0], opacity: [0.35, 1, 0.35] }}
                        transition={{ repeat: Infinity, duration: 0.75, delay: i * 0.16 }}
                        style={{ fontSize: "0.45rem", color: "#f472b6" }}
                      >●</motion.span>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* ── Bottom tech stack ── */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.5 }}
            style={{
              position: "absolute",
              bottom: "clamp(0.9rem, 2.5vw, 1.6rem)",
              display: "flex", gap: "clamp(0.8rem, 2vw, 1.6rem)",
              alignItems: "center", zIndex: 2,
            }}
          >
            {["React", "Tailwind CSS", "Framer Motion"].map((tag, i) => (
              <motion.span key={tag}
                initial={{ opacity: 0 }} animate={{ opacity: 0.55 }}
                transition={{ delay: 0.5 + i * 0.12 }}
                style={{
                  fontFamily: "monospace",
                  fontSize: "clamp(0.52rem, 0.95vw, 0.62rem)",
                  color: "#be185d", letterSpacing: "0.12em", textTransform: "uppercase", fontWeight: 600,
                }}
              >{tag}</motion.span>
            ))}
          </motion.div>

          {/* Keyframe styles */}
          <style>{`
            @keyframes splashShimmer {
              0%,100% { background-position: 0% 50%; }
              50%      { background-position: 100% 50%; }
            }
            @keyframes splashBar {
              0%   { background-position: 200% 0; }
              100% { background-position: -200% 0; }
            }
          `}</style>
        </motion.div>
      )}
    </AnimatePresence>
  );
}