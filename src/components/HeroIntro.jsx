import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Volume2, VolumeX, ShieldAlert, Cpu } from 'lucide-react';

const BOOT_LOGS = [
  { text: "CORE-BIOS v2.84 // ARCHITECTURE: DUAL-CORE XTENSA LX6", type: "system" },
  { text: "INITIALIZING HARDWARE LAYER REGISTERS...", type: "system" },
  { text: "[ OK ] MOUNTING MCU: ESP32-WROOM-32E TRANSCEIVER", type: "success" },
  { text: "[ OK ] BINDING SECURE RFID AUTHENTICATOR [RC522] VIA SPI_BUS_0", type: "success" },
  { text: "ESTABLISHING CLOUD DATABASES TELEMETRY BINDINGS...", type: "system" },
  { text: "[ OK ] AQUA-SENSE TELEMETRY PIPELINE SYNCED WITH CLOUD DB", type: "success" },
  { text: "CALIBRATING ANALOG ENERGY ACQUISITION HARVESTERS...", type: "system" },
  { text: "[ OK ] TIDAL HYDRO-INDUCTION TURBINE SENSOR LINK ESTABLISHED", type: "success" },
  { text: "LOADING MACHINE LEARNING INFRASTRUCTURE...", type: "system" },
  { text: "[ OK ] ALLOCATING CNN TENSORS FOR BOVINE_V4 CLASSIFIER MODEL", type: "success" },
  { text: "[ OK ] RESOLVING COGNITIVE WEIGHTS FOR AI RECEIPT INTELLIGENCE", type: "success" },
  { text: "TUNING HIGH-SPEED PID REGULATORS FOR ACTIVE WHEELCHAIR GYROS...", type: "system" },
  { text: "[ OK ] DUAL-CORE ROTOR ANGLE FEEDBACK CALIBRATED IN 12ms", type: "success" },
  { text: "ALL EMBEDDED CHANNELS ONLINE. SECURE SHELL ESTABLISHED.", type: "highlight" }
];

export default function HeroIntro() {
  const [logs, setLogs] = useState([]);
  const [logIndex, setLogIndex] = useState(0);
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [bootReady, setBootReady] = useState(false);
  const audioContextRef = useRef(null);
  const oscillatorsRef = useRef([]);

  // Handle typing sequence of logs
  useEffect(() => {
    if (logIndex < BOOT_LOGS.length) {
      const delay = logIndex === 0 ? 300 : Math.random() * 150 + 80;
      const timer = setTimeout(() => {
        setLogs(prev => [...prev, BOOT_LOGS[logIndex]]);
        setLogIndex(prev => prev + 1);
        
        // Play small high-tech diagnostic clicks for each log (Web Audio API synth)
        if (audioEnabled) {
          playLogBeep(logIndex);
        }
      }, delay);
      return () => clearTimeout(timer);
    } else {
      // Boot logs complete
      setBootReady(true);
      if (audioEnabled) {
        playBootResolveSound();
      }
    }
  }, [logIndex, audioEnabled]);

  // Synthesize log click/beep
  const playLogBeep = (index) => {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return;
      
      if (!audioContextRef.current) {
        audioContextRef.current = new AudioContext();
      }
      
      const ctx = audioContextRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.type = 'sine';
      // Vary frequency slightly to make it sound like a dynamic read
      osc.frequency.setValueAtTime(index % 2 === 0 ? 800 : 1200, ctx.currentTime);
      
      gain.gain.setValueAtTime(0.015, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.00001, ctx.currentTime + 0.05);
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.05);
    } catch (e) {
      console.warn("Audio synthesis blocked/failed: ", e);
    }
  };

  // Synthesize the main cinematic boot sound
  useEffect(() => {
    // Start ambient hum when page is active (if audioEnabled)
    if (audioEnabled) {
      startAmbientHum();
    }
    return () => {
      stopOscillators();
    };
  }, [audioEnabled]);

  const startAmbientHum = () => {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return;

      if (!audioContextRef.current) {
        audioContextRef.current = new AudioContext();
      }
      const ctx = audioContextRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      stopOscillators();

      // Deep 55Hz sub hum (A1)
      const osc1 = ctx.createOscillator();
      const gain1 = ctx.createGain();
      osc1.type = 'sawtooth';
      osc1.frequency.setValueAtTime(55, ctx.currentTime);
      gain1.gain.setValueAtTime(0.02, ctx.currentTime);
      
      // Filter out high harsh noise for a smooth warm space hum
      const filter1 = ctx.createBiquadFilter();
      filter1.type = 'lowpass';
      filter1.frequency.setValueAtTime(120, ctx.currentTime);

      // Deep 110Hz octave overlay (A2)
      const osc2 = ctx.createOscillator();
      const gain2 = ctx.createGain();
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(110, ctx.currentTime);
      gain2.gain.setValueAtTime(0.03, ctx.currentTime);

      osc1.connect(filter1);
      filter1.connect(gain1);
      gain1.connect(ctx.destination);

      osc2.connect(gain2);
      gain2.connect(ctx.destination);

      osc1.start();
      osc2.start();

      oscillatorsRef.current = [
        { osc: osc1, gain: gain1 },
        { osc: osc2, gain: gain2 }
      ];
    } catch (e) {
      console.warn("Ambient hum synthesis failed", e);
    }
  };

  const stopOscillators = () => {
    oscillatorsRef.current.forEach(item => {
      try {
        item.gain.gain.setValueAtTime(item.gain.gain.value, audioContextRef.current.currentTime);
        item.gain.gain.exponentialRampToValueAtTime(0.0001, audioContextRef.current.currentTime + 0.1);
        setTimeout(() => item.osc.stop(), 100);
      } catch (e) {}
    });
    oscillatorsRef.current = [];
  };

  const playBootResolveSound = () => {
    try {
      const ctx = audioContextRef.current;
      if (!ctx) return;
      
      stopOscillators();

      const osc = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const filter = ctx.createBiquadFilter();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(220, ctx.currentTime); // A3
      osc.frequency.exponentialRampToValueAtTime(440, ctx.currentTime + 0.4); // Sweep to A4
      
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(659.25, ctx.currentTime); // E5 perfect fifth chime

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(800, ctx.currentTime);

      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.00001, ctx.currentTime + 1.2);

      osc.connect(filter);
      osc2.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc2.start();
      osc.stop(ctx.currentTime + 1.5);
      osc2.stop(ctx.currentTime + 1.5);
    } catch (e) {}
  };

  const toggleAudio = () => {
    if (audioEnabled) {
      stopOscillators();
      setAudioEnabled(false);
    } else {
      setAudioEnabled(true);
      // Wait a moment then start hum
      setTimeout(() => startAmbientHum(), 50);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, filter: "blur(15px)" }}
      transition={{ duration: 1.2, ease: "easeInOut" }}
      className="fixed inset-0 w-screen h-screen z-[999] flex flex-col justify-between bg-black overflow-hidden hud-grid-red px-6 py-10 font-mono text-xs select-none"
    >
      {/* HUD scan line overlays */}
      <div className="hud-scanline" />
      <div className="absolute inset-0 bg-gradient-to-b from-red-600/5 via-transparent to-red-600/5 pointer-events-none" />

      {/* Top HUD bar */}
      <div className="w-full flex justify-between items-center border-b border-red-900/30 pb-4 relative z-10">
        <div className="flex items-center gap-3">
          <Cpu className="w-5 h-5 text-red-500 animate-pulse" />
          <div>
            <span className="text-white font-bold tracking-widest uppercase">ARISH-SYSTEM-BOOT-v2.0</span>
            <span className="text-red-500/70 ml-3 text-[10px] hidden sm:inline">STATE: IN_PROGRESS</span>
          </div>
        </div>

        {/* Audio Mute HUD Button */}
        <button 
          onClick={toggleAudio}
          className="p-2 border border-red-500/30 hover:border-red-500 rounded bg-red-950/20 text-red-500 hover:text-white transition-all flex items-center gap-2 cursor-pointer shadow-[0_0_10px_rgba(255,26,26,0.1)] active:scale-95"
        >
          {audioEnabled ? (
            <>
              <Volume2 className="w-4 h-4 text-green-400" />
              <span className="text-[10px] uppercase font-bold tracking-wider hidden sm:inline">AUDIO ON</span>
            </>
          ) : (
            <>
              <VolumeX className="w-4 h-4 text-red-500" />
              <span className="text-[10px] uppercase font-bold tracking-wider hidden sm:inline">AUDIO MUTED</span>
            </>
          )}
        </button>
      </div>

      {/* Terminal Screen Area */}
      <div className="flex-1 w-full max-w-4xl mx-auto flex flex-col justify-center gap-2 my-10 max-h-[60vh] overflow-y-auto pr-2 relative z-10 scrollbar-thin">
        {logs.map((log, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.15 }}
            className={`flex items-start gap-3 py-1 font-light tracking-wide ${
              log.type === 'success' 
                ? 'text-green-400 font-medium' 
                : log.type === 'highlight' 
                ? 'text-red-400 font-bold glow-text-red text-sm mt-3 border-t border-red-900/30 pt-3' 
                : 'text-gray-400'
            }`}
          >
            <span className="text-red-600/60 font-semibold">{`>>`}</span>
            <span>{log.text}</span>
          </motion.div>
        ))}
      </div>

      {/* Footer Boot Progress */}
      <div className="w-full border-t border-red-900/30 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4 relative z-10">
        <div className="flex items-center gap-3">
          <div className="w-2.5 h-2.5 rounded-full bg-red-600 animate-ping"></div>
          <span className="text-gray-500 uppercase tracking-widest text-[10px]">COGNITIVE NETWORK SEARCH ACTIVE</span>
        </div>

        {/* Loading Telemetry Bar */}
        <div className="w-full sm:w-64 flex items-center gap-3">
          <div className="flex-1 h-2 bg-zinc-900 rounded-full border border-red-900/20 overflow-hidden relative shadow-[0_0_10px_rgba(0,0,0,0.8)]">
            <motion.div
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 3.2, ease: "easeInOut" }}
              className="h-full bg-gradient-to-r from-red-800 to-red-500 shadow-[0_0_15px_#ff1a1a]"
            ></motion.div>
          </div>
          <span className="text-[10px] text-red-500 font-mono font-bold tracking-wider">
            {bootReady ? "100%" : `${Math.min(99, Math.floor((logs.length / BOOT_LOGS.length) * 100))}%`}
          </span>
        </div>
      </div>
    </motion.div>
  );
}
