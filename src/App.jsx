import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import HeroIntro from './components/HeroIntro';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import WorkExperience from './components/WorkExperience';
import Leadership from './components/Leadership';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ParticleBackground from './components/ParticleBackground';

function App() {
  const [showIntro, setShowIntro] = useState(true);

  useEffect(() => {
    // Hide intro after 3.5 seconds
    const timer = setTimeout(() => {
      setShowIntro(false);
    }, 3500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="bg-[#050505] min-h-screen text-white font-sans selection:bg-red-900 selection:text-white overflow-x-hidden w-full relative">
      <AnimatePresence>
        {showIntro && <HeroIntro key="hero-intro" />}
      </AnimatePresence>

      {!showIntro && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="relative"
        >
          <Navbar />
          
          {/* Global Background FX - MILKY WAY GALAXY */}
          <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-[#030303]">
            {/* Supermassive Glowing Core */}
            <motion.div 
              animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.5, 0.3] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[20vw] h-[20vw] min-w-[300px] min-h-[300px] rounded-full bg-red-600/70 blur-[100px] mix-blend-screen"
            ></motion.div>
            
            {/* The Interactive Canvas Galaxy */}
            <ParticleBackground />

            {/* Soft Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#020202] via-transparent to-[#020202] opacity-80 mix-blend-overlay"></div>
          </div>

          {/* Main Content */}
          <div className="relative z-10 w-full">
            <About />
            <Skills />
            <Projects />
            <WorkExperience />
            <Leadership />
            <Contact />
            <Footer />
          </div>
        </motion.div>
      )}
    </div>
  );
}

export default App;
