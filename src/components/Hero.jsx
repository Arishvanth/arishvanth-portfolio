import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Terminal, Download, ChevronDown, Cpu } from 'lucide-react';

export default function Hero() {
  const [activeSub, setActiveSub] = useState('CPU');
  const [coreSpeed, setCoreSpeed] = useState(240); // 80 - 240 MHz

  const handleScrollTo = (id) => {
    const element = document.querySelector(id);
    if (element) {
      const yOffset = -80;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  // Stagger letter variants for name reveal
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.03, delayChildren: 0.2 }
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

  // Dynamic metrics and telemetry logs for the 3D Holographic Silicon Core
  const subInfo = {
    CPU: {
      title: "CORE CPU PROCESSING UNIT",
      metrics: [
        { label: "CLK_FREQ", val: () => `${coreSpeed}.00 MHz` },
        { label: "VCC_CORE", val: () => `${(1.10 + (coreSpeed / 240) * 0.15).toFixed(2)} V` },
        { label: "CORE_TEMP", val: () => `${(38.2 + (coreSpeed / 240) * 8.4).toFixed(1)} °C` }
      ],
      logs: [
        "MOV R0, #0x0A // SETUP BOOT INDEX",
        "ADD R1, R0, R2 // BIND SENSOR REGISTER",
        "STR R1, [SP, #4] // STORAGE STACK SYNC",
        "CMP R1, #0xFF // COMPARE GATEWAY FLAG",
        "BNE 0x0002A4 // JUMP TELEMETRY PIPELINE"
      ]
    },
    RF: {
      title: "RF COMM TRANSCEIVER (ESP32)",
      metrics: [
        { label: "SIGNAL_RSSI", val: () => "-64.2 dBm" },
        { label: "TX_LATENCY", val: () => `${Math.max(5, Math.floor(1800 / coreSpeed))} ms` },
        { label: "PACKET_RATE", val: () => "115200 bps" }
      ],
      logs: [
        "STATUS: CONNECTING TO ESP32 WIFI DRIVER...",
        "CONN: STATION CONNECTED [SSID: ARISH_NET]",
        "COMM: RESOLVING GATEWAY PROTOCOL... OK",
        "TX: SENDING METRIC ENVELOPE [CID_09]: OK",
        "BUFF: BUFFER FLUSHED // STATE: SECURE"
      ]
    },
    ADC: {
      title: "ADC VOLTAGE HARVESTER",
      metrics: [
        { label: "PORT_PIN", val: () => "GPIO_32 (ADC1)" },
        { label: "BUS_VOLTS", val: () => `${(3.28 + Math.sin(Date.now() / 1000) * 0.02).toFixed(3)} V` },
        { label: "BIT_DEPTH", val: () => "12-BIT RES" }
      ],
      logs: [
        "ADC_INIT: CHANNEL CH1 BINDING SECURE",
        "READ: CH1_VAL = 0x0E4D [3.284 V]",
        "TEMP_SENS [0x48]: READ_TEMP = 24.8°C",
        "ACCL_Z [0x53]: LEVEL = +1.024g (STABLE)",
        "WARN: DRIFT COMPENSATION ENGAGED"
      ]
    },
    AI: {
      title: "NEURAL CORE ACCELERATOR",
      metrics: [
        { label: "INF_TIME", val: () => `${(15.4 - (coreSpeed / 240) * 4.2).toFixed(1)} ms` },
        { label: "ACCURACY", val: () => "98.42% CONF" },
        { label: "NEURAL_CORE", val: () => "CNN-TENSOR-v2" }
      ],
      logs: [
        "INIT: LOADING BOVINE WEIGHTS MODEL...",
        "TENSOR: SHAPE BINDING [1, 224, 224, 3]",
        "INFER: CLASSIFIED: BOVINE_A1 [CONF: 98.42%]",
        "AI_CORE: INF_LATENCY COMPACTION STATE: ACTIVE",
        "SYS: INF STATE OK // OUTPUT REGISTER EMITTED"
      ]
    }
  };

  return (
    <div id="hero" className="relative min-h-screen flex items-center justify-center pt-24 px-6 lg:px-12 xl:px-20 w-full overflow-hidden bg-[#050505] hud-grid-red select-none">
      
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
                {" M  N".split("").map((char, index) => (
                  <motion.span key={index} variants={letterVariants} className="inline-block text-white hover:text-red-500 transition-colors cursor-default">{char === ' ' ? '\u00A0' : char}</motion.span>
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
              <Cpu className="w-4 h-4 animate-pulse text-white transition-transform" />
              <span>Launch Case Studies</span>
              {/* Corner tech marks */}
              <span className="absolute top-0 right-0 w-1.5 h-1.5 border-t border-r border-white/50"></span>
              <span className="absolute bottom-0 left-0 w-1.5 h-1.5 border-b border-l border-white/50"></span>
            </button>

            {/* CTA 2: Core Systems */}
            <button 
              onClick={() => handleScrollTo('#skills')}
              className="relative overflow-hidden rounded-xl px-8 py-4 font-semibold text-gray-300 hover:text-white transition-all hover:scale-105 active:scale-95 border border-white/10 hover:border-red-500/40 bg-zinc-950/40 backdrop-blur-md cursor-pointer tracking-wider uppercase font-mono text-sm flex items-center gap-2 group"
            >
              <Terminal className="w-4 h-4 text-red-500" />
              <span>Core Systems</span>
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

        {/* Right Column: Premium Active HUD Holographic Silicon MCU Core */}
        <div className="col-span-1 lg:col-span-5 w-full flex justify-center items-center relative py-10">
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.8 }}
            className="w-full max-w-[430px] rounded-3xl border border-white/10 bg-black/60 backdrop-blur-md p-6 relative overflow-hidden shadow-[0_0_50px_rgba(255,26,26,0.05)] hover:border-red-500/30 transition-all duration-500 group flex flex-col justify-between"
          >
            {/* Spinning decorative background orbits */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[95%] h-[95%] pointer-events-none opacity-5">
              <svg viewBox="0 0 200 200" className="w-full h-full text-red-500 animate-spin-slow">
                <circle cx="100" cy="100" r="95" stroke="currentColor" strokeWidth="0.5" strokeDasharray="3 4" fill="none" />
              </svg>
            </div>

            {/* AI ambient glow backdrop */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,26,26,0.08)_0%,transparent_60%)] animate-pulse-glow pointer-events-none" />

            {/* Inner Dashboard Display */}
            <div className="relative h-full flex flex-col justify-between font-mono z-10 text-[10px] text-gray-400">
              
              {/* HUD Header */}
              <div className="flex justify-between items-center border-b border-white/10 pb-3 mb-4">
                <div className="flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-red-500 animate-pulse" />
                  <span className="font-bold text-white tracking-widest uppercase">HOLOGRAPHIC SILICON CORE</span>
                </div>
                <div className="px-2 py-0.5 bg-red-950/30 border border-red-500/20 text-red-500 text-[8px] rounded uppercase font-bold tracking-wider">
                  ENG CORE V2
                </div>
              </div>

              {/* Silicon Core Visual Simulation */}
              <div className="w-full flex justify-center items-center relative py-2">
                <svg viewBox="0 0 200 160" className="w-full h-44 text-gray-700 select-none">
                  <defs>
                    <linearGradient id="subGlow" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#121212" />
                      <stop offset="100%" stopColor="#050505" />
                    </linearGradient>
                  </defs>

                  {/* Outer coordinate corner marks */}
                  <path d="M 10,10 L 30,10" stroke="rgba(255,26,26,0.25)" strokeWidth="0.75" fill="none" />
                  <path d="M 10,10 L 10,25" stroke="rgba(255,26,26,0.25)" strokeWidth="0.75" fill="none" />
                  <path d="M 190,10 L 170,10" stroke="rgba(255,26,26,0.25)" strokeWidth="0.75" fill="none" />
                  <path d="M 190,10 L 190,25" stroke="rgba(255,26,26,0.25)" strokeWidth="0.75" fill="none" />
                  <path d="M 10,150 L 30,150" stroke="rgba(255,26,26,0.25)" strokeWidth="0.75" fill="none" />
                  <path d="M 10,150 L 10,135" stroke="rgba(255,26,26,0.25)" strokeWidth="0.75" fill="none" />
                  <path d="M 190,150 L 170,150" stroke="rgba(255,26,26,0.25)" strokeWidth="0.75" fill="none" />
                  <path d="M 190,150 L 190,135" stroke="rgba(255,26,26,0.25)" strokeWidth="0.75" fill="none" />

                  {/* Concentric orbital rings */}
                  <ellipse cx="100" cy="80" rx="75" ry="40" stroke="rgba(255,26,26,0.06)" strokeWidth="1" fill="none" strokeDasharray="5 5" />
                  <ellipse cx="100" cy="80" rx="90" ry="48" stroke="rgba(255,26,26,0.04)" strokeWidth="0.5" fill="none" />

                  {/* Bus Pathways */}
                  {/* RF Path (Top Left to Core) */}
                  <path d="M 40,45 L 80,70" stroke="rgba(255,255,255,0.08)" strokeWidth="1.5" fill="none" />
                  <path 
                    d="M 40,45 L 80,70" 
                    stroke="#FF1A1A" 
                    strokeWidth="1.5" 
                    fill="none" 
                    strokeDasharray="4 12"
                    style={{
                      animation: `isometricPulse ${1.8 - (coreSpeed - 80) / 160 * 1.3}s linear infinite`
                    }}
                  />

                  {/* AI Path (Top Right to Core) */}
                  <path d="M 160,45 L 120,70" stroke="rgba(255,255,255,0.08)" strokeWidth="1.5" fill="none" />
                  <path 
                    d="M 160,45 L 120,70" 
                    stroke="#FF1A1A" 
                    strokeWidth="1.5" 
                    fill="none" 
                    strokeDasharray="4 12"
                    style={{
                      animation: `isometricPulse ${1.8 - (coreSpeed - 80) / 160 * 1.3}s linear infinite`
                    }}
                  />

                  {/* ADC Path (Bottom Left to Core) */}
                  <path d="M 40,115 L 80,90" stroke="rgba(255,255,255,0.08)" strokeWidth="1.5" fill="none" />
                  <path 
                    d="M 40,115 L 80,90" 
                    stroke="#FF1A1A" 
                    strokeWidth="1.5" 
                    fill="none" 
                    strokeDasharray="4 12"
                    style={{
                      animation: `isometricPulse ${1.8 - (coreSpeed - 80) / 160 * 1.3}s linear infinite`
                    }}
                  />

                  {/* RAM Path (Bottom Right to Core) */}
                  <path d="M 160,115 L 120,90" stroke="rgba(255,255,255,0.08)" strokeWidth="1.5" fill="none" />
                  <path 
                    d="M 160,115 L 120,90" 
                    stroke="#FF1A1A" 
                    strokeWidth="1.5" 
                    fill="none" 
                    strokeDasharray="4 12"
                    style={{
                      animation: `isometricPulse ${1.8 - (coreSpeed - 80) / 160 * 1.3}s linear infinite`
                    }}
                  />

                  {/* Subsystem 1: RF COMM (Top Left) */}
                  <g 
                    className="cursor-pointer pointer-events-auto" 
                    onClick={() => setActiveSub('RF')}
                  >
                    <polygon 
                      points="40,35 60,45 40,55 20,45" 
                      fill="url(#subGlow)" 
                      stroke={activeSub === 'RF' ? '#FF1A1A' : 'rgba(255,255,255,0.1)'} 
                      strokeWidth={activeSub === 'RF' ? '1.5' : '1'} 
                    />
                    <circle cx="40" cy="45" r="2.5" fill={activeSub === 'RF' ? '#FF1A1A' : 'rgba(255,255,255,0.3)'} className="animate-pulse" />
                    <text x="40" y="28" textAnchor="middle" fill={activeSub === 'RF' ? '#FFFFFF' : '#888888'} fontSize="6.5" fontWeight="bold">RF_COMM</text>
                  </g>

                  {/* Subsystem 2: EDGE AI (Top Right) */}
                  <g 
                    className="cursor-pointer pointer-events-auto" 
                    onClick={() => setActiveSub('AI')}
                  >
                    <polygon 
                      points="160,35 180,45 160,55 140,45" 
                      fill="url(#subGlow)" 
                      stroke={activeSub === 'AI' ? '#FF1A1A' : 'rgba(255,255,255,0.1)'} 
                      strokeWidth={activeSub === 'AI' ? '1.5' : '1'} 
                    />
                    <circle cx="160" cy="45" r="2.5" fill={activeSub === 'AI' ? '#FF1A1A' : 'rgba(255,255,255,0.3)'} className="animate-pulse" />
                    <text x="160" y="28" textAnchor="middle" fill={activeSub === 'AI' ? '#FFFFFF' : '#888888'} fontSize="6.5" fontWeight="bold">EDGE_AI</text>
                  </g>

                  {/* Subsystem 3: ADC DATA (Bottom Left) */}
                  <g 
                    className="cursor-pointer pointer-events-auto" 
                    onClick={() => setActiveSub('ADC')}
                  >
                    <polygon 
                      points="40,105 60,115 40,125 20,115" 
                      fill="url(#subGlow)" 
                      stroke={activeSub === 'ADC' ? '#FF1A1A' : 'rgba(255,255,255,0.1)'} 
                      strokeWidth={activeSub === 'ADC' ? '1.5' : '1'} 
                    />
                    <circle cx="40" cy="115" r="2.5" fill={activeSub === 'ADC' ? '#FF1A1A' : 'rgba(255,255,255,0.3)'} className="animate-pulse" />
                    <text x="40" y="136" textAnchor="middle" fill={activeSub === 'ADC' ? '#FFFFFF' : '#888888'} fontSize="6.5" fontWeight="bold">ADC_DATA</text>
                  </g>

                  {/* Subsystem 4: CENTRAL CPU (Center 3D isometric block) */}
                  <g 
                    className="cursor-pointer pointer-events-auto" 
                    onClick={() => setActiveSub('CPU')}
                  >
                    {/* Top Face */}
                    <polygon 
                      points="100,60 135,78 100,96 65,78" 
                      fill="url(#subGlow)" 
                      stroke={activeSub === 'CPU' ? '#FF1A1A' : 'rgba(255,255,255,0.15)'} 
                      strokeWidth={activeSub === 'CPU' ? '1.5' : '1'} 
                    />
                    {/* Left Isometric Side Face */}
                    <polygon 
                      points="65,78 100,96 100,104 65,86" 
                      fill="rgba(139,0,0,0.2)" 
                      stroke={activeSub === 'CPU' ? '#FF1A1A' : 'rgba(255,255,255,0.1)'} 
                      strokeWidth="0.8" 
                    />
                    {/* Right Isometric Side Face */}
                    <polygon 
                      points="100,96 135,78 135,86 100,104" 
                      fill="rgba(139,0,0,0.1)" 
                      stroke={activeSub === 'CPU' ? '#FF1A1A' : 'rgba(255,255,255,0.1)'} 
                      strokeWidth="0.8" 
                    />

                    {/* Engraved glowing text on silicon */}
                    <text x="100" y="75" textAnchor="middle" fill="#FFFFFF" fontSize="5.5" fontWeight="black" letterSpacing="0.5" className="animate-pulse opacity-90">ARISH_32</text>
                    <text x="100" y="82" textAnchor="middle" fill="#FF1A1A" fontSize="4.5" fontWeight="bold" opacity="0.8">CORE ENGINE</text>

                    {/* Central pulsing core node */}
                    <circle 
                      cx="100" 
                      cy="90" 
                      r="3.5" 
                      fill="#FF1A1A" 
                      style={{
                        animation: `pulseGlow ${1.2 - (coreSpeed - 80) / 160 * 0.8}s ease-in-out infinite`
                      }}
                    />
                  </g>

                  {/* Subsystem 5: MEMORY (Bottom Right) */}
                  <g 
                    className="cursor-pointer pointer-events-auto" 
                    onClick={() => setActiveSub('CPU')}
                  >
                    <polygon 
                      points="160,105 180,115 160,125 140,115" 
                      fill="url(#subGlow)" 
                      stroke="rgba(255,255,255,0.1)" 
                      strokeWidth="1" 
                    />
                    <circle cx="160" cy="115" r="2.5" fill="rgba(255,255,255,0.3)" className="animate-pulse" />
                    <text x="160" y="136" textAnchor="middle" fill="#888888" fontSize="6.5" fontWeight="bold">EDGE_RAM</text>
                  </g>
                </svg>
              </div>

              {/* Dynamic Metrics Panel */}
              <div className="border-t border-white/10 pt-3 space-y-2 mt-2 shrink-0">
                <div className="flex justify-between items-center text-[8px] text-gray-500 uppercase tracking-widest">
                  <span className="font-bold text-red-500">{subInfo[activeSub].title}</span>
                  <span>METRICS_LOG</span>
                </div>
                
                <div className="grid grid-cols-3 gap-3">
                  {subInfo[activeSub].metrics.map((metric, mIdx) => (
                    <div key={mIdx} className="p-2 border border-white/5 bg-zinc-950/60 rounded-xl flex flex-col justify-between items-center text-center">
                      <span className="text-[6.5px] text-gray-500 font-bold uppercase tracking-wider">{metric.label}</span>
                      <span className="text-white text-[10px] font-bold mt-1 tracking-tight">{metric.val()}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Real-time Ticker Logs */}
              <div className="border-t border-white/10 pt-3 space-y-1 shrink-0">
                <span className="text-[7.5px] text-gray-500 uppercase tracking-widest block">TELEMETRY_STREAM_CONSOLE</span>
                <div className="w-full h-[76px] bg-black/80 border border-white/5 rounded-xl p-2.5 font-mono text-[8px] text-gray-400 space-y-1 overflow-hidden select-none">
                  {subInfo[activeSub].logs.map((log, lIdx) => (
                    <div key={lIdx} className="flex items-center gap-1.5 leading-relaxed">
                      <span className="text-red-700/60 font-semibold">{`>`}</span>
                      <span className="text-gray-300 font-light truncate">{log}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Core Stress & Frequency Control Slider */}
              <div className="border-t border-white/10 pt-3 flex flex-col gap-2 mt-1 shrink-0">
                <div className="flex justify-between items-center text-[7.5px] text-gray-500 uppercase tracking-widest">
                  <span>CORE SPEED / CLOCK FREQ</span>
                  <span className="text-red-500 font-bold">{coreSpeed} MHz</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-[7px] text-gray-600 font-bold uppercase shrink-0">80MHZ</span>
                  <input 
                    type="range" 
                    min="80" 
                    max="240" 
                    step="10"
                    value={coreSpeed} 
                    onChange={(e) => setCoreSpeed(parseInt(e.target.value))}
                    className="w-full h-1 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-red-600 outline-none hover:bg-zinc-700 transition-colors"
                  />
                  <span className="text-[7px] text-red-500/80 font-bold uppercase shrink-0">240MHZ</span>
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
