import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Power } from 'lucide-react';

export default function HeroIntro() {
  const [activated, setActivated] = useState(false);
  const [bootReady, setBootReady] = useState(false);
  const audioContextRef = useRef(null);
  const autoBootTimerRef = useRef(null);

  // Set up a 3-second auto-boot timer to guarantee the site loads even without a click interaction
  useEffect(() => {
    autoBootTimerRef.current = setTimeout(() => {
      if (!activated) {
        handleActivate(true); // Trigger auto-boot
      }
    }, 3000);

    return () => {
      if (autoBootTimerRef.current) {
        clearTimeout(autoBootTimerRef.current);
      }
    };
  }, [activated]);

  const handleActivate = (isAutoBoot = false) => {
    if (autoBootTimerRef.current) {
      clearTimeout(autoBootTimerRef.current);
    }
    setActivated(true);
    
    // Play the boot audio hum in both explicit-click and auto-boot cases (tries to unlock context in both)
    playCinematicSound();
    
    // Auto transition to portfolio after 3.5 seconds
    setTimeout(() => {
      setBootReady(true);
    }, 3500);
  };

  const playCinematicSound = () => {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return;

      audioContextRef.current = new AudioContext();
      const ctx = audioContextRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

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
      oscMid.connect(filter);
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
      oscResolve1.frequency.setValueAtTime(220, ctx.currentTime + 2.6); // Sweep from A3
      oscResolve1.frequency.exponentialRampToValueAtTime(440, ctx.currentTime + 3.0); // to A4
      
      oscResolve2.type = 'sine';
      oscResolve2.frequency.setValueAtTime(659.25, ctx.currentTime + 2.8); // High E5 chime

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

    } catch (e) {
      console.warn("Web Audio API synthesis blocked/failed:", e);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, filter: "blur(15px)" }}
      transition={{ duration: 1.2, ease: "easeInOut" }}
      className="fixed inset-0 w-screen h-screen z-[999] flex flex-col justify-center items-center bg-black overflow-hidden hud-grid-red px-6 text-white font-mono text-xs select-none"
    >
      <AnimatePresence mode="wait">
        {!activated ? (
          // Initial Engage Button Overlay (Unlocks Browser Audio API)
          <motion.div 
            key="activator"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center gap-6 text-center max-w-sm"
          >
            {/* Spinning decorative concentric scopes */}
            <div className="relative w-32 h-32 flex items-center justify-center">
              <div className="absolute inset-0 border border-red-500/20 rounded-full animate-spin-slow"></div>
              <div className="absolute inset-2 border border-dashed border-red-600/30 rounded-full animate-spin-reverse-slow"></div>
              
              <button 
                onClick={() => handleActivate(false)}
                className="w-20 h-20 rounded-full border border-red-500/40 bg-red-950/20 hover:bg-red-600/30 text-red-500 hover:text-white transition-all shadow-[0_0_25px_rgba(255,26,26,0.3)] hover:shadow-[0_0_45px_rgba(255,26,26,0.7)] flex items-center justify-center cursor-pointer active:scale-95 group z-10"
              >
                <Power className="w-8 h-8 group-hover:scale-115 transition-transform" />
              </button>
            </div>
            
            <div className="space-y-2">
              <h2 className="text-sm font-bold tracking-[0.25em] text-white uppercase">LAUNCH SYSTEM CORE</h2>
              <p className="text-gray-500 text-[10px] leading-relaxed uppercase">
                TAP TO UNLOCK HIGH-FIDELITY AUDIO & ACTIVE HUD VISUALS
              </p>
              <p className="text-red-500/50 text-[9px] font-mono tracking-wider pt-2 uppercase">
                AUTO-BOOT INITIATES IN 3 SECONDS
              </p>
            </div>
          </motion.div>
        ) : (
          // Immersive Clean Name Reveal (Centered and Initial M N Removed for Perfect Alignment)
          <motion.div 
            key="reveal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center relative max-w-3xl z-10"
          >
            {/* Pulsing visual halo */}
            <div className="absolute -inset-10 bg-[radial-gradient(circle_at_center,rgba(255,26,26,0.12)_0%,transparent_60%)] animate-pulse-glow pointer-events-none" />

            <h1 className="text-4xl md:text-7xl font-extrabold tracking-[0.2em] text-white uppercase drop-shadow-[0_0_20px_rgba(255,26,26,0.6)] font-sans">
              ARISHVANTH <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-400">SRIGANESH</span>
            </h1>
            
            <motion.div 
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.4, delay: 0.4, ease: "circOut" }}
              className="h-[2px] w-full bg-gradient-to-r from-transparent via-red-600 to-transparent mt-8 origin-center shadow-[0_0_15px_rgba(255,26,26,0.7)]"
            ></motion.div>
            
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: [0.3, 0.9, 0.3] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
              className="mt-8 text-xs tracking-[0.35em] text-red-500 font-bold uppercase"
            >
              SYSTEM CORE INITIALIZING...
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
