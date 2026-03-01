import { useEffect, useRef } from "react";

const EMOJIS = ["💗", "✨", "🌸", "⭐", "💫", "🎀", "🌷", "💕"];

export default function Particles() {
  const ref = useRef(null);

  useEffect(() => {
    const container = ref.current;
    if (!container) return;

    for (let i = 0; i < 22; i++) {
      const p = document.createElement("div");
      p.className = "particle";
      p.textContent = EMOJIS[Math.floor(Math.random() * EMOJIS.length)];
      p.style.left = Math.random() * 100 + "%";
      p.style.animationDuration = 9 + Math.random() * 10 + "s";
      p.style.animationDelay = Math.random() * 15 + "s";
      p.style.fontSize = 0.8 + Math.random() * 0.9 + "rem";
      container.appendChild(p);
    }

    return () => { container.innerHTML = ""; };
  }, []);

  return <div className="particles" ref={ref} />;
}
