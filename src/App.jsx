import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import MiniGame from './components/MiniGame';
import Education from './components/Education';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  return (
    <div className="app-container">
      <div className="bg-grid" />
      <div className="bg-glow-hero" />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <MiniGame />
        <Education />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
