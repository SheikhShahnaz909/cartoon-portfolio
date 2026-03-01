import { useState } from "react";
import { useReveal } from "./hooks/useReveal";
import { useScrollSection } from "./hooks/useScrollSection";
import WelcomeSplashSimple from "./components/WelcomeSplashSimple";
import Particles from "./components/Particles";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import CompanionAnimated from "./components/CompanionAnimated";
import Footer from "./components/Footer";

// Only hero and about are active, but navbar shows all
const SECTIONS = ["hero", "about"];

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  
  useReveal();
  const activeSection = useScrollSection(SECTIONS);

  if (showSplash) {
    return <WelcomeSplashSimple onComplete={() => setShowSplash(false)} />;
  }

  return (
    <>
      <Particles />
      <Navbar activeSection={activeSection} />

      <main>
        <Hero />
        <About />
        
        {/* Placeholder sections - "Coming Soon" */}
        <section id="skills" className="section" style={{
          background: "linear-gradient(135deg, #e9d5ff 0%, #dbeafe 50%, #fef3c7 100%)",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          zIndex: 1
        }}>
          <div style={{
            textAlign: "center",
            padding: "2rem"
          }}>
            <div style={{
              fontSize: "4rem",
              marginBottom: "1rem",
              animation: "pulse 2s ease-in-out infinite"
            }}>⚡</div>
            <h2 style={{
              fontFamily: "'Baloo 2', sans-serif",
              fontSize: "2.5rem",
              fontWeight: 800,
              background: "linear-gradient(135deg, #ec4899, #c084fc)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              marginBottom: "1rem"
            }}>
              Skills Section
            </h2>
            <p style={{
              fontSize: "1.2rem",
              color: "#6b7280",
              fontWeight: 700
            }}>
              Coming in Week 6! 🚧
            </p>
          </div>
        </section>

        <section id="projects" className="section" style={{
          background: "linear-gradient(135deg, #fce7f3 0%, #fef3c7 50%, #dbeafe 100%)",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          zIndex: 1
        }}>
          <div style={{
            textAlign: "center",
            padding: "2rem"
          }}>
            <div style={{
              fontSize: "4rem",
              marginBottom: "1rem",
              animation: "pulse 2s ease-in-out infinite"
            }}>🚀</div>
            <h2 style={{
              fontFamily: "'Baloo 2', sans-serif",
              fontSize: "2.5rem",
              fontWeight: 800,
              background: "linear-gradient(135deg, #ec4899, #c084fc)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              marginBottom: "1rem"
            }}>
              Projects Section
            </h2>
            <p style={{
              fontSize: "1.2rem",
              color: "#6b7280",
              fontWeight: 700
            }}>
              Coming in Week 6! 🚧
            </p>
          </div>
        </section>

        <section id="contact" className="section" style={{
          background: "linear-gradient(135deg, #fef3c7 0%, #dbeafe 50%, #e9d5ff 100%)",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          zIndex: 1
        }}>
          <div style={{
            textAlign: "center",
            padding: "2rem"
          }}>
            <div style={{
              fontSize: "4rem",
              marginBottom: "1rem",
              animation: "pulse 2s ease-in-out infinite"
            }}>💌</div>
            <h2 style={{
              fontFamily: "'Baloo 2', sans-serif",
              fontSize: "2.5rem",
              fontWeight: 800,
              background: "linear-gradient(135deg, #ec4899, #c084fc)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              marginBottom: "1rem"
            }}>
              Contact Section
            </h2>
            <p style={{
              fontSize: "1.2rem",
              color: "#6b7280",
              fontWeight: 700
            }}>
              Coming in Week 7! 🚧
            </p>
          </div>
        </section>
      </main>

      <Footer />
      <CompanionAnimated activeSection={activeSection} />
    </>
  );
}
