import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import HeroIntro from './components/HeroIntro';
import Hero from './components/Hero';
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
  const audioContextRef = useRef(null);
  const hasPlayedRef = useRef(false);
  const bootStartedRef = useRef(false);

  const playCinematicSound = () => {
    if (hasPlayedRef.current) return;
    
    try {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (!AudioContextClass) return;

      if (!audioContextRef.current) {
        audioContextRef.current = new AudioContextClass();
      }
      
      const ctx = audioContextRef.current;
      
      const runSynthesis = () => {
        if (hasPlayedRef.current) return;
        hasPlayedRef.current = true;
        
        // 1. Deep Sub-Bass Space Hum (55Hz / A1)
        const oscSub = ctx.createOscillator();
        const gainSub = ctx.createGain();
        oscSub.type = 'sine';
        oscSub.frequency.setValueAtTime(55, ctx.currentTime);
        gainSub.gain.setValueAtTime(0.04, ctx.currentTime);
        
        // 2. Harmonic Mid-Range Pad (110Hz / A2)
        const oscMid = ctx.createOscillator();
        const gainMid = ctx.createGain();
        oscMid.type = 'triangle';
        oscMid.frequency.setValueAtTime(110, ctx.currentTime);
        gainMid.gain.setValueAtTime(0.02, ctx.currentTime);

        const filter = ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(150, ctx.currentTime);

        oscSub.connect(filter);
        oscMid.connect(gainMid);
        gainMid.connect(filter);
        filter.connect(gainSub);
        gainSub.connect(ctx.destination);

        oscSub.start();
        oscMid.start();

        gainSub.gain.setValueAtTime(0.04, ctx.currentTime + 2.5);
        gainSub.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 3.2);
        
        setTimeout(() => {
          try {
            oscSub.stop();
            oscMid.stop();
          } catch (err) {}
        }, 3300);

        // 3. Cinematic Resolve Chime (A3 Sweep -> perfect fifth E5)
        const oscResolve1 = ctx.createOscillator();
        const oscResolve2 = ctx.createOscillator();
        const gainResolve = ctx.createGain();
        const filterChime = ctx.createBiquadFilter();

        oscResolve1.type = 'triangle';
        oscResolve1.frequency.setValueAtTime(220, ctx.currentTime + 2.6);
        oscResolve1.frequency.exponentialRampToValueAtTime(440, ctx.currentTime + 3.0);
        
        oscResolve2.type = 'sine';
        oscResolve2.frequency.setValueAtTime(659.25, ctx.currentTime + 2.8);

        filterChime.type = 'lowpass';
        filterChime.frequency.setValueAtTime(900, ctx.currentTime + 2.6);

        gainResolve.gain.setValueAtTime(0.0001, ctx.currentTime + 2.5);
        gainResolve.gain.linearRampToValueAtTime(0.08, ctx.currentTime + 2.8);
        gainResolve.gain.exponentialRampToValueAtTime(0.00001, ctx.currentTime + 3.8);

        oscResolve1.connect(filterChime);
        oscResolve2.connect(filterChime);
        filterChime.connect(gainResolve);
        gainResolve.connect(ctx.destination);

        oscResolve1.start(ctx.currentTime + 2.5);
        oscResolve2.start(ctx.currentTime + 2.6);
        oscResolve1.stop(ctx.currentTime + 3.9);
        oscResolve2.stop(ctx.currentTime + 3.9);
      };

      if (ctx.state === 'suspended') {
        ctx.resume().then(() => {
          if (ctx.state === 'running') {
            runSynthesis();
          }
        });
      } else {
        runSynthesis();
      }

    } catch (e) {
      console.warn("Web Audio API synthesis blocked/failed:", e);
    }
  };

  const showIntroRef = useRef(true);
  
  // Track showIntro state in a ref to prevent stale closure in event listeners
  useEffect(() => {
    showIntroRef.current = showIntro;
  }, [showIntro]);

  // Lock body scroll when the bootloader is active to prevent early page scrolling
  useEffect(() => {
    if (showIntro) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [showIntro]);

  // Listen to document gestures to unlock blocked AudioContext
  useEffect(() => {
    const globalUnlock = () => {
      // ONLY trigger sound synthesis if the boot sequence has started, it hasn't played yet,
      // AND the loading screen is still active. This prevents late sound triggers during main scroll!
      if (bootStartedRef.current && !hasPlayedRef.current && showIntroRef.current) {
        playCinematicSound();
      }
    };
    
    window.addEventListener('click', globalUnlock);
    window.addEventListener('touchstart', globalUnlock);
    window.addEventListener('keydown', globalUnlock);
    
    return () => {
      window.removeEventListener('click', globalUnlock);
      window.removeEventListener('touchstart', globalUnlock);
      window.removeEventListener('keydown', globalUnlock);
    };
  }, []);

  const handleBoot = () => {
    bootStartedRef.current = true;
    playCinematicSound();
  };

  return (
    <div className="bg-[#050505] min-h-screen text-white font-sans selection:bg-red-900 selection:text-white overflow-x-hidden w-full relative">
      <AnimatePresence>
        {showIntro && (
          <HeroIntro 
            key="hero-intro" 
            onBoot={handleBoot}
            onComplete={() => setShowIntro(false)} 
          />
        )}
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
            <Hero />
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
