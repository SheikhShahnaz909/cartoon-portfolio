import { useEffect } from "react";

export function useSkillBars() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.querySelectorAll(".bar-fill").forEach((bar) => {
              bar.style.width = bar.dataset.width;
            });
          }
        }),
      { threshold: 0.3 }
    );
    document.querySelectorAll(".skill-card").forEach((c) => observer.observe(c));
    return () => observer.disconnect();
  }, []);
}
