import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Terminal, Download, ShieldCheck, ChevronDown, Activity, Wifi, Thermometer, Database } from 'lucide-react';

export default function Hero() {
  const [cpuTemp, setCpuTemp] = useState(38.2);
  const [latency, setLatency] = useState(0.8);
  const [signal, setSignal] = useState(98);
  const [voltage, setVoltage] = useState(3.31);
  
  // Real-time jitter simulation for telemetry values to feel organic
  useEffect(() => {
    const interval = setInterval(() => {
      setCpuTemp(prev => +(prev + (Math.random() - 0.5) * 0.4).toFixed(1));
      setLatency(prev => Math.max(0.2, +(prev + (Math.random() - 0.5) * 0.1).toFixed(2)));
      setSignal(prev => Math.max(90, Math.min(100, Math.floor(prev + (Math.random() - 0.5) * 2))));
      setVoltage(prev => +(3.30 + Math.random() * 0.03).toFixed(2));
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  const handleScrollTo = (id) => {
    const element = document.querySelector(id);
    if (element) {
      const yOffset = -80;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  // Letter reveal variants for name stagger
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.03,
        delayChildren: 0.2
      }
    }
  };

  const letterVariants = {
    hidden: { opacity: 0, y: 30, filter: 'blur(4px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: { type: "spring", stiffness: 100, damping: 10 }
    }
  };

  return (
    <div id="hero" className="relative min-h-screen flex items-center justify-center pt-24 px-6 lg:px-12 xl:px-20 w-full overflow-hidden bg-[#050505] hud-grid-red select-none">
      
      {/* HUD scan overlay */}
      <div className="hud-scanline" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#050505]/40 to-[#050505] pointer-events-none z-10" />

      {/* Red ambient glow layers */}
      <div className="absolute top-[10%] left-[5%] w-[35vw] h-[35vw] bg-red-900/10 blur-[120px] rounded-full pointer-events-none mix-blend-screen" />
      <div className="absolute bottom-[10%] right-[5%] w-[40vw] h-[40vw] bg-red-950/10 blur-[150px] rounded-full pointer-events-none mix-blend-screen" />

      {/* Main Grid Split */}
      <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-20">
        
        {/* Left Column: Massive Identity */}
        <div className="col-span-1 lg:col-span-7 space-y-8 flex flex-col items-center lg:items-start text-center lg:text-left">
          
          {/* Top Active Status Indicator */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex items-center gap-3 px-4 py-2 border border-red-500/20 bg-red-950/20 rounded-full text-red-500 text-xs font-mono tracking-widest uppercase shadow-[0_0_15px_rgba(255,26,26,0.1)]"
          >
            <div className="w-2.5 h-2.5 rounded-full bg-green-500 animate-ping"></div>
            <span>SECURE SYSTEM LINKED & ACTIVE</span>
          </motion.div>

          {/* Name Reveal */}
          <div className="space-y-3">
            <motion.h1 
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white leading-tight font-sans"
            >
              <div className="block">
                {"ARISHVANTH".split("").map((char, index) => (
                  <motion.span key={index} variants={letterVariants} className="inline-block hover:text-red-500 transition-colors cursor-default">{char}</motion.span>
                ))}
              </div>
              <div className="block mt-1">
                {"SRIGANESH".split("").map((char, index) => (
                  <motion.span key={index} variants={letterVariants} className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-400 hover:text-white transition-colors cursor-default">{char}</motion.span>
                ))}
                {" M N".split("").map((char, index) => (
                  <motion.span key={index} variants={letterVariants} className="inline-block text-white hover:text-red-500 transition-colors cursor-default">{char}</motion.span>
                ))}
              </div>
            </motion.h1>
            
            {/* Subtitle */}
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.9 }}
              className="text-xl md:text-2xl text-gray-400 font-mono tracking-widest uppercase font-light"
            >
              Embedded Systems & IoT Engineer
            </motion.h2>
          </div>

          {/* Tagline */}
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, delay: 1.2 }}
            className="text-gray-300 text-lg leading-relaxed max-w-2xl font-light font-sans tracking-wide"
          >
            "Building intelligent systems that connect hardware, data, and real-world impact."
          </motion.p>

          {/* Interactive Glowing CTAs */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.4 }}
            className="flex flex-wrap gap-4 sm:gap-6 justify-center lg:justify-start w-full pt-4"
          >
            {/* CTA 1: View Case Studies */}
            <button 
              onClick={() => handleScrollTo('#projects')}
              className="relative overflow-hidden rounded-xl px-8 py-4 font-semibold text-white transition-all hover:scale-105 active:scale-95 border border-red-500/50 bg-gradient-to-r from-[#8B0000] to-[#FF1A1A] hover:shadow-[0_0_30px_rgba(255,26,26,0.6)] cursor-pointer group tracking-wider uppercase font-mono text-sm flex items-center gap-2"
            >
              <Activity className="w-4 h-4 animate-pulse text-white group-hover:rotate-12 transition-transform" />
              <span>Launch Case Studies</span>
              {/* Corner tech marks */}
              <span className="absolute top-0 right-0 w-1.5 h-1.5 border-t border-r border-white/50"></span>
              <span className="absolute bottom-0 left-0 w-1.5 h-1.5 border-b border-l border-white/50"></span>
            </button>

            {/* CTA 2: Skills Diagnostics */}
            <button 
              onClick={() => handleScrollTo('#skills')}
              className="relative overflow-hidden rounded-xl px-8 py-4 font-semibold text-gray-300 hover:text-white transition-all hover:scale-105 active:scale-95 border border-white/10 hover:border-red-500/40 bg-zinc-950/40 backdrop-blur-md cursor-pointer tracking-wider uppercase font-mono text-sm flex items-center gap-2"
            >
              <Terminal className="w-4 h-4 text-red-500" />
              <span>Core Diagnostics</span>
              {/* Glow underline */}
              <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-red-600 transition-all duration-300 group-hover:w-full"></span>
            </button>

            {/* CTA 3: Resume */}
            <a 
              href="/resume.pdf" 
              target="_blank" 
              className="relative overflow-hidden rounded-xl px-8 py-4 font-semibold text-gray-300 hover:text-white transition-all hover:scale-105 active:scale-95 border border-white/10 hover:border-red-500/40 bg-zinc-950/40 backdrop-blur-md cursor-pointer tracking-wider uppercase font-mono text-sm flex items-center gap-2"
            >
              <Download className="w-4 h-4 text-red-500" />
              <span>Credentials</span>
            </a>
          </motion.div>
        </div>

        {/* Right Column: Premium Active HUD Console */}
        <div className="col-span-1 lg:col-span-5 w-full flex justify-center items-center relative py-10">
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.8 }}
            className="w-full max-w-[420px] aspect-square rounded-3xl border border-white/10 bg-black/60 backdrop-blur-md p-6 relative overflow-hidden shadow-[0_0_50px_rgba(255,26,26,0.05)] hover:border-red-500/30 transition-all duration-500 group"
          >
            {/* HUD scan overlay */}
            <div className="hud-scanline" />
            
            {/* Spinning holographic circle radar */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] h-[90%] pointer-events-none opacity-20">
              <svg viewBox="0 0 200 200" className="w-full h-full text-red-500 animate-spin-slow">
                <circle cx="100" cy="100" r="95" stroke="currentColor" strokeWidth="0.5" strokeDasharray="3 4" fill="none" />
                <circle cx="100" cy="100" r="85" stroke="currentColor" strokeWidth="0.75" strokeDasharray="12 2" fill="none" />
                <circle cx="100" cy="100" r="60" stroke="currentColor" strokeWidth="0.5" strokeDasharray="100 8" fill="none" />
              </svg>
            </div>
            
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70%] h-[70%] pointer-events-none opacity-20">
              <svg viewBox="0 0 200 200" className="w-full h-full text-red-600 animate-spin-reverse-slow">
                <circle cx="100" cy="100" r="75" stroke="currentColor" strokeWidth="0.5" strokeDasharray="4 8" fill="none" />
                <circle cx="100" cy="100" r="50" stroke="currentColor" strokeWidth="1" strokeDasharray="60 30" fill="none" />
              </svg>
            </div>

            {/* Simulated AI scanning beam */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,26,26,0.1)_0%,transparent_60%)] animate-pulse-glow" />

            {/* Inner Dashboard Display */}
            <div className="relative h-full flex flex-col justify-between font-mono z-10 text-[10px] text-gray-400">
              
              {/* HUD Header */}
              <div className="flex justify-between items-center border-b border-white/10 pb-3">
                <div className="flex items-center gap-2">
                  <Activity className="w-4 h-4 text-red-500 animate-pulse" />
                  <span className="font-bold text-white tracking-widest">TELEMETRY MONITOR</span>
                </div>
                <div className="px-2 py-0.5 bg-red-950/30 border border-red-500/20 text-red-500 text-[8px] rounded uppercase font-bold tracking-wider">
                  LINK: ON
                </div>
              </div>

              {/* Grid diagnostic matrix */}
              <div className="grid grid-cols-2 gap-4 my-4 flex-grow justify-center content-center">
                
                {/* Dial 1: Temperature */}
                <div className="p-3 border border-white/5 bg-zinc-950/40 rounded-xl relative group-hover:border-red-500/20 transition-all flex flex-col justify-between">
                  <div className="flex justify-between items-start mb-1 text-[8px] tracking-wider uppercase text-gray-500">
                    <span>CPU TEMP</span>
                    <Thermometer className="w-3.5 h-3.5 text-red-500" />
                  </div>
                  <div>
                    <span className="text-xl font-bold text-white tracking-tight">{cpuTemp}°C</span>
                    <div className="w-full h-1 bg-zinc-800 rounded-full mt-2 overflow-hidden">
                      <div className="h-full bg-red-600 rounded-full transition-all duration-300" style={{ width: `${Math.min(100, (cpuTemp / 80) * 100)}%` }} />
                    </div>
                  </div>
                </div>

                {/* Dial 2: Latency */}
                <div className="p-3 border border-white/5 bg-zinc-950/40 rounded-xl relative group-hover:border-red-500/20 transition-all flex flex-col justify-between">
                  <div className="flex justify-between items-start mb-1 text-[8px] tracking-wider uppercase text-gray-500">
                    <span>SPI LATENCY</span>
                    <Activity className="w-3.5 h-3.5 text-red-500" />
                  </div>
                  <div>
                    <span className="text-xl font-bold text-white tracking-tight">{latency}ms</span>
                    <div className="w-full h-1 bg-zinc-800 rounded-full mt-2 overflow-hidden">
                      <div className="h-full bg-green-500 rounded-full transition-all duration-300" style={{ width: `${Math.max(15, 100 - latency * 50)}%` }} />
                    </div>
                  </div>
                </div>

                {/* Dial 3: Signal Strength */}
                <div className="p-3 border border-white/5 bg-zinc-950/40 rounded-xl relative group-hover:border-red-500/20 transition-all flex flex-col justify-between">
                  <div className="flex justify-between items-start mb-1 text-[8px] tracking-wider uppercase text-gray-500">
                    <span>WIFI RSSI</span>
                    <Wifi className="w-3.5 h-3.5 text-red-500" />
                  </div>
                  <div>
                    <span className="text-xl font-bold text-white tracking-tight">-{100 - signal}dBm</span>
                    <div className="w-full h-1 bg-zinc-800 rounded-full mt-2 overflow-hidden">
                      <div className="h-full bg-red-600 rounded-full transition-all duration-300" style={{ width: `${signal}%` }} />
                    </div>
                  </div>
                </div>

                {/* Dial 4: Voltage Harvester */}
                <div className="p-3 border border-white/5 bg-zinc-950/40 rounded-xl relative group-hover:border-red-500/20 transition-all flex flex-col justify-between">
                  <div className="flex justify-between items-start mb-1 text-[8px] tracking-wider uppercase text-gray-500">
                    <span>BUS VOLTS</span>
                    <Database className="w-3.5 h-3.5 text-red-500" />
                  </div>
                  <div>
                    <span className="text-xl font-bold text-white tracking-tight">{voltage}V</span>
                    <div className="w-full h-1 bg-zinc-800 rounded-full mt-2 overflow-hidden">
                      <div className="h-full bg-red-500 rounded-full transition-all duration-300" style={{ width: `${(voltage / 5) * 100}%` }} />
                    </div>
                  </div>
                </div>

              </div>

              {/* Simulated active telemetry streams */}
              <div className="border-t border-white/10 pt-3 flex flex-col gap-1 text-[8px] text-gray-500 tracking-wider">
                <div className="flex justify-between items-center">
                  <span className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping"></span>
                    <span>ESP32 TRANSCEIVER PROTOCOL CONNECTED</span>
                  </span>
                  <span className="text-white">RSSI: STRONG</span>
                </div>
                <div className="flex justify-between items-center text-[7px] text-red-400/80 font-mono">
                  <span>PACKETS TX: 84920 // ERR RATE: 0.00%</span>
                  <span>BUFFER: SECURE</span>
                </div>
              </div>

            </div>
          </motion.div>
        </div>

      </div>

      {/* Radar Pulsing Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: [0, 0.7, 0], y: [0, 10, 0] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
        onClick={() => handleScrollTo('#about')}
        className="absolute bottom-6 flex flex-col items-center gap-1.5 text-red-500 cursor-pointer opacity-60 z-20"
      >
        <span className="text-[9px] font-mono tracking-[0.25em] uppercase">VERIFY CORE SYSTEMS</span>
        <ChevronDown size={24} className="animate-bounce" />
      </motion.div>
      
    </div>
  );
}
