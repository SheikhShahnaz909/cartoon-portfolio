import { useReveal } from "./hooks/useReveal";
import { useScrollSection } from "./hooks/useScrollSection";
import Particles from "./components/Particles";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import CompanionSimple from "./components/CompanionSimple";
import Footer from "./components/Footer";

const SECTIONS = ["hero", "about", "skills", "projects", "contact"];

export default function App() {
  useReveal();
  const activeSection = useScrollSection(SECTIONS);

  return (
    <>
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
    </>
  );
}
