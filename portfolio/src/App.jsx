import { useState } from "react"; 
import { useReveal } from "./hooks/useReveal";
import { useScrollSection } from "./hooks/useScrollSection";
import Particles from "./components/Particles";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import PastelCat from "./components/PastelCat";
import CompanionSimple from "./components/CompanionSimple";
import Footer from "./components/Footer";
import SplashScreen from "./components/SplashScreen";

const SECTIONS = ["hero", "about", "skills", "projects", "contact"];

export default function App() {
  useReveal();
  const activeSection = useScrollSection(SECTIONS);
  const [splashDone, setSplashDone] = useState(false);

  return (
    <>
      {!splashDone && <SplashScreen onComplete={() => setSplashDone(true)} />}

      <div style={{ visibility: splashDone ? "visible" : "hidden", height: splashDone ? "auto" : "100vh", overflow: splashDone ? "visible" : "hidden" }}>
        <Particles />
        <Navbar activeSection={activeSection} />

        <main>
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Contact />
        </main>

        <Footer />
        <CompanionSimple activeSection={activeSection} />
        <PastelCat />
      </div>
    </>
  );
}