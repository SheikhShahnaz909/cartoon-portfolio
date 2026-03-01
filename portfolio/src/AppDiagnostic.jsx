import { useState } from "react";
import { useReveal } from "./hooks/useReveal";
import { useScrollSection } from "./hooks/useScrollSection";
import WelcomeSplash from "./components/WelcomeSplash";
import Particles from "./components/Particles";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Companion from "./components/Companion";
import Footer from "./components/Footer";

const SECTIONS = ["hero", "about", "skills", "projects", "contact"];

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  
  useReveal();
  const activeSection = useScrollSection(SECTIONS);

  if (showSplash) {
    return <WelcomeSplash onComplete={() => setShowSplash(false)} />;
  }

  return (
    <div style={{ border: "5px solid red" }}>
      <Particles />
      <Navbar activeSection={activeSection} />

      <main style={{ border: "5px solid blue", minHeight: "200vh" }}>
        <div style={{ border: "3px solid green" }}>
          <Hero />
        </div>
        <div style={{ border: "3px solid yellow" }}>
          <About />
        </div>
        <div style={{ border: "3px solid orange" }}>
          <Skills />
        </div>
        <div style={{ border: "3px solid purple" }}>
          <Projects />
        </div>
        <div style={{ border: "3px solid pink" }}>
          <Contact />
        </div>
      </main>

      <Footer />
      <Companion activeSection={activeSection} />

      {/* Debug info */}
      <div style={{
        position: "fixed",
        bottom: "10px",
        left: "10px",
        background: "black",
        color: "lime",
        padding: "10px",
        zIndex: 9999,
        fontSize: "14px",
        fontFamily: "monospace"
      }}>
        🐛 Debug Info:<br />
        Active: {activeSection}<br />
        Splash: {showSplash ? "YES" : "NO"}<br />
        Components: Loaded ✅
      </div>
    </div>
  );
}
