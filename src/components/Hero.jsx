import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Terminal, Download, ChevronDown, Cpu, Activity, Radio, ShieldCheck } from 'lucide-react';

export default function Hero() {
  const [activeSub, setActiveSub] = useState('CPU');
  const [coreSpeed, setCoreSpeed] = useState(240); // 80 - 240 MHz
  const [waveOffset, setWaveOffset] = useState(0);

  // Animate the ADC Oscilloscope sweep continuously
  useEffect(() => {
    const waveInterval = setInterval(() => {
      // Sweep speed scales with coreSpeed stress!
      setWaveOffset(prev => (prev + (coreSpeed / 240) * 0.25) % (Math.PI * 2));
    }, 30);

    return () => clearInterval(waveInterval);
  }, [coreSpeed]);

  const handleScrollTo = (id) => {
    const element = document.querySelector(id);
    if (element) {
      const yOffset = -80;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  // Generate real-time composite sine path for the oscilloscope above the chip
  const generateOscilloscopePath = () => {
    let points = [];
    const width = 240;
    const height = 30;
    for (let x = 0; x <= width; x += 4) {
      // Oscilloscope frequency and amplitude responds organically to coreSpeed!
      const amp = 6 + (coreSpeed / 240) * 4;
      const y = height / 2 + 
                Math.sin(x * 0.06 + waveOffset) * amp + 
                Math.cos(x * 0.12 - waveOffset * 0.5) * 2;
      points.push(`${x},${y}`);
    }
    return `M ${points.join(' L ')}`;
  };

  // Dynamic metrics datasets for the Subsystem Telemetry panel
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
    <div id="hero" className="relative min-h-screen flex items-center justify-center pt-28 pb-20 px-6 lg:px-12 xl:px-16 w-full overflow-hidden bg-[#050505] hud-grid-red select-none">
      
      {/* Dynamic ambient red background glow layers */}
      <div className="absolute top-[10%] left-[5%] w-[40vw] h-[40vw] bg-red-900/10 blur-[130px] rounded-full pointer-events-none mix-blend-screen" />
      <div className="absolute bottom-[10%] right-[5%] w-[45vw] h-[45vw] bg-red-950/10 blur-[160px] rounded-full pointer-events-none mix-blend-screen" />

      {/* Main command deck container */}
      <div className="w-full max-w-[1500px] mx-auto flex flex-col gap-8 relative z-20">
        
        {/* Top Active Systems Ribbon Status */}
        <div className="w-full flex flex-col md:flex-row justify-between items-center px-6 py-3 bg-black/60 border border-white/10 rounded-2xl backdrop-blur-md gap-4 text-[9px] font-mono text-gray-500 tracking-wider">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-ping"></span>
            <span className="text-white font-bold uppercase">COMMAND CENTER HUD V2.8 // SECURE CONNECTION STABLE</span>
          </div>
          <div className="flex flex-wrap justify-center gap-6 text-[8.5px] uppercase">
            <span>CORE_VOLTS: <span className="text-red-500">{(1.10 + (coreSpeed / 240) * 0.15).toFixed(2)} V</span></span>
            <span>SYSTEM_STRESS: <span className="text-red-500">{((coreSpeed - 80) / 1.6).toFixed(0)}%</span></span>
            <span>CORE_CLOCK: <span className="text-red-500">{coreSpeed} MHz</span></span>
            <span>HARDWARE_LINK: <span className="text-green-400">SECURE</span></span>
          </div>
        </div>

        {/* The 3-Column Panoramic Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch w-full">
          
          {/* COLUMN 1: CORE IDENTITY PANEL (Left) */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="col-span-1 lg:col-span-4 bg-black/55 border border-white/10 p-8 rounded-3xl backdrop-blur-md shadow-2xl relative flex flex-col justify-between overflow-hidden group hover:border-red-500/20 transition-colors"
          >
            {/* Tech grid and corner tick marks */}
            <div className="absolute inset-0 hud-grid opacity-15 pointer-events-none" />
            <span className="absolute top-3 left-4 w-2.5 h-2.5 border-t border-l border-red-500/40 pointer-events-none"></span>
            <span className="absolute top-3 right-4 w-2.5 h-2.5 border-t border-r border-red-500/40 pointer-events-none"></span>
            <span className="absolute bottom-3 left-4 w-2.5 h-2.5 border-b border-l border-red-500/40 pointer-events-none"></span>
            <span className="absolute bottom-3 right-4 w-2.5 h-2.5 border-b border-r border-red-500/40 pointer-events-none"></span>

            <div className="space-y-6">
              {/* Active System Link Pill */}
              <div className="flex max-w-max items-center gap-2 px-3 py-1.5 border border-red-500/20 bg-red-950/20 rounded-lg text-red-500 text-[9px] font-mono tracking-widest uppercase">
                <ShieldCheck className="w-3.5 h-3.5 text-red-500 animate-pulse" />
                <span>CORE INTERFACE LINKED</span>
              </div>

              {/* Massive Centered Clean Typography Reveal */}
              <div className="space-y-3 pt-4">
                <h1 className="text-4xl sm:text-5xl xl:text-6xl font-extrabold tracking-tight text-white leading-tight font-sans">
                  <span className="block hover:text-red-500 transition-colors cursor-default">ARISHVANTH</span>
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-400 hover:text-white transition-colors cursor-default mt-1">SRIGANESH</span>
                </h1>
                
                <h2 className="text-sm xl:text-base text-gray-400 font-mono tracking-[0.25em] uppercase font-light pt-2">
                  Embedded Systems & IoT Engineer
                </h2>
              </div>

              <p className="text-gray-300 text-sm leading-relaxed font-sans font-light tracking-wide pt-4 border-t border-white/5">
                "Building intelligent systems that connect hardware, data, and real-world impact."
              </p>
            </div>

            {/* Glowing HUD Call-To-Action Panel */}
            <div className="space-y-3.5 pt-8 border-t border-white/5 w-full mt-8">
              <button 
                onClick={() => handleScrollTo('#projects')}
                className="w-full relative overflow-hidden rounded-xl py-3.5 font-bold text-white transition-all hover:scale-[1.02] active:scale-98 border border-red-500/50 bg-gradient-to-r from-[#8B0000] to-[#FF1A1A] hover:shadow-[0_0_35px_rgba(255,26,26,0.55)] cursor-pointer group tracking-widest uppercase font-mono text-[9.5px] flex items-center justify-between px-5"
              >
                <div className="flex items-center gap-2">
                  <Cpu className="w-3.5 h-3.5 animate-pulse text-white" />
                  <span>Launch Case Studies</span>
                </div>
                <span className="text-[8px] opacity-75 font-normal tracking-wide">[4 PORTALS ACTIVE]</span>
              </button>

              <button 
                onClick={() => handleScrollTo('#skills')}
                className="w-full relative overflow-hidden rounded-xl py-3.5 font-bold text-gray-300 hover:text-white transition-all hover:scale-[1.02] active:scale-98 border border-white/10 hover:border-red-500/40 bg-zinc-950/40 backdrop-blur-md cursor-pointer tracking-widest uppercase font-mono text-[9.5px] flex items-center justify-between px-5 group"
              >
                <div className="flex items-center gap-2">
                  <Terminal className="w-3.5 h-3.5 text-red-500" />
                  <span>Core Systems</span>
                </div>
                <span className="text-[8px] text-gray-500 tracking-wide group-hover:text-red-400">[7 CLUSTERS]</span>
              </button>

              <a 
                href="/resume.pdf" 
                target="_blank" 
                className="w-full relative overflow-hidden rounded-xl py-3.5 font-bold text-gray-300 hover:text-white transition-all hover:scale-[1.02] active:scale-98 border border-white/10 hover:border-red-500/40 bg-zinc-950/40 backdrop-blur-md cursor-pointer tracking-widest uppercase font-mono text-[9.5px] flex items-center justify-between px-5"
              >
                <div className="flex items-center gap-2">
                  <Download className="w-3.5 h-3.5 text-red-500" />
                  <span>Credentials</span>
                </div>
                <span className="text-[8px] text-gray-500 tracking-wide">[11 CERTIFIED]</span>
              </a>
            </div>
          </motion.div>

          {/* COLUMN 2: SILICON CORE INTERACTIVE ENGINE (Center) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
            className="col-span-1 lg:col-span-4 bg-black/55 border border-white/10 p-6 rounded-3xl backdrop-blur-md shadow-2xl relative flex flex-col justify-between overflow-hidden group hover:border-red-500/20 transition-colors"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,26,26,0.06)_0%,transparent_60%)] animate-pulse-glow pointer-events-none" />
            <span className="absolute top-3 left-4 w-2.5 h-2.5 border-t border-l border-red-500/40 pointer-events-none"></span>
            <span className="absolute top-3 right-4 w-2.5 h-2.5 border-t border-r border-red-500/40 pointer-events-none"></span>

            <div className="space-y-4">
              {/* Real-time Oscilloscope Wave Scope above the Chip */}
              <div className="w-full space-y-1">
                <div className="flex justify-between items-center text-[7.5px] text-gray-500 uppercase tracking-widest">
                  <span>ADC_CH1 SIGNALS OSCILLOSCOPE</span>
                  <span className="text-red-500 font-bold flex items-center gap-1">
                    <Activity className="w-3 h-3 animate-pulse" />
                    REAL-TIME
                  </span>
                </div>
                <div className="w-full h-10 bg-black/80 border border-white/5 rounded-xl overflow-hidden relative flex items-center">
                  <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:12px_12px] pointer-events-none" />
                  <svg width="100%" height="30" className="text-red-500 relative z-10 w-full">
                    <path 
                      d={generateOscilloscopePath()} 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="1.25"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
              </div>

              {/* Silicon Core Visual Simulation */}
              <div className="w-full flex justify-center items-center relative py-1">
                <svg viewBox="0 0 200 160" className="w-full h-44 text-gray-700 select-none">
                  <defs>
                    <linearGradient id="mcuSubGlow" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#121212" />
                      <stop offset="100%" stopColor="#050505" />
                    </linearGradient>
                  </defs>

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
                      fill="url(#mcuSubGlow)" 
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
                      fill="url(#mcuSubGlow)" 
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
                      fill="url(#mcuSubGlow)" 
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
                      fill="url(#mcuSubGlow)" 
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
                      fill="url(#mcuSubGlow)" 
                      stroke="rgba(255,255,255,0.1)" 
                      strokeWidth="1" 
                    />
                    <circle cx="160" cy="115" r="2.5" fill="rgba(255,255,255,0.3)" className="animate-pulse" />
                    <text x="160" y="136" textAnchor="middle" fill="#888888" fontSize="6.5" fontWeight="bold">EDGE_RAM</text>
                  </g>
                </svg>
              </div>
            </div>

            {/* Core Stress & Frequency Control Slider (Reactor Throttle styled) */}
            <div className="border-t border-white/10 pt-4 flex flex-col gap-2 shrink-0">
              <div className="flex justify-between items-center text-[7.5px] text-gray-500 uppercase tracking-widest">
                <span>CORE THROTTLE / CLOCK FREQ</span>
                <span className="text-red-500 font-bold">{coreSpeed} MHz</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-[7px] text-gray-600 font-bold uppercase shrink-0">MIN_CLK</span>
                <input 
                  type="range" 
                  min="80" 
                  max="240" 
                  step="10"
                  value={coreSpeed} 
                  onChange={(e) => setCoreSpeed(parseInt(e.target.value))}
                  className="w-full h-1.5 bg-zinc-900 rounded-lg appearance-none cursor-pointer accent-red-600 outline-none hover:bg-zinc-800 transition-colors border border-white/5"
                />
                <span className="text-[7px] text-red-500 font-bold uppercase shrink-0">MAX_CLK</span>
              </div>
            </div>
          </motion.div>

          {/* COLUMN 3: SUBSYSTEM TELEMETRY PANEL (Right) */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
            className="col-span-1 lg:col-span-4 bg-black/55 border border-white/10 p-6 rounded-3xl backdrop-blur-md shadow-2xl relative flex flex-col justify-between overflow-hidden group hover:border-red-500/20 transition-colors"
          >
            <div className="absolute inset-0 hud-grid opacity-15 pointer-events-none" />
            <span className="absolute top-3 left-4 w-2.5 h-2.5 border-t border-l border-red-500/40 pointer-events-none"></span>
            <span className="absolute top-3 right-4 w-2.5 h-2.5 border-t border-r border-red-500/40 pointer-events-none"></span>
            <span className="absolute bottom-3 left-4 w-2.5 h-2.5 border-b border-l border-red-500/40 pointer-events-none"></span>
            <span className="absolute bottom-3 right-4 w-2.5 h-2.5 border-b border-r border-red-500/40 pointer-events-none"></span>

            <div className="space-y-6 h-full flex flex-col justify-between">
              {/* Dynamic Telemetry Header */}
              <div className="flex justify-between items-center border-b border-white/10 pb-3">
                <div className="flex items-center gap-2">
                  <Radio className="w-4 h-4 text-red-500 animate-pulse" />
                  <span className="font-extrabold text-white tracking-widest text-[9.5px] uppercase">ACTIVE TELEMETRY SCANNER</span>
                </div>
                <span className="px-2 py-0.5 bg-red-950/20 border border-red-500/20 text-red-500 text-[7px] rounded font-bold uppercase tracking-wider">
                  LINK: OK
                </span>
              </div>

              {/* Sub-metrics Grid */}
              <div className="space-y-2 mt-2">
                <div className="flex justify-between items-center text-[7px] text-gray-500 uppercase tracking-widest font-bold">
                  <span className="text-red-500">{subInfo[activeSub].title}</span>
                  <span>REG_SPECS</span>
                </div>
                
                <div className="grid grid-cols-3 gap-2.5">
                  {subInfo[activeSub].metrics.map((metric, mIdx) => (
                    <div key={mIdx} className="p-2 border border-white/5 bg-zinc-950/60 rounded-xl flex flex-col justify-between items-center text-center">
                      <span className="text-[6px] text-gray-500 font-bold uppercase tracking-wider">{metric.label}</span>
                      <span className="text-white text-[9px] font-bold mt-1 tracking-tight">{metric.val()}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Live Ticker Console Logs */}
              <div className="space-y-1.5 flex-grow mt-4 flex flex-col justify-end">
                <div className="flex justify-between text-[7px] text-gray-500 uppercase tracking-widest font-bold pb-1 border-b border-white/5">
                  <span>TELEMETRY_STREAM_CONSOLE</span>
                  <span className="text-green-500">LIVE FEED</span>
                </div>
                <div className="w-full h-24 bg-black/85 border border-white/5 rounded-xl p-3 font-mono text-[8px] text-gray-400 space-y-1.5 overflow-hidden select-none">
                  {subInfo[activeSub].logs.map((log, lIdx) => (
                    <div key={lIdx} className="flex items-center gap-1.5 leading-relaxed">
                      <span className="text-red-700/60 font-semibold">{`>`}</span>
                      <span className="text-gray-300 font-light truncate">{log}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bounding System Metadata info */}
              <div className="pt-4 border-t border-white/5 text-[7px] font-mono text-gray-600 flex justify-between uppercase">
                <span>BUFFER: 1024KB CLEAR</span>
                <span>INTR: MULTI_INDEX STABLE</span>
              </div>
            </div>
          </motion.div>

        </div>

      </div>

      {/* Pulsing Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: [0, 0.7, 0], y: [0, 10, 0] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
        onClick={() => handleScrollTo('#about')}
        className="absolute bottom-4 flex flex-col items-center gap-1 text-red-500 cursor-pointer opacity-60 z-20"
      >
        <span className="text-[8.5px] font-mono tracking-[0.25em] uppercase font-bold">VERIFY SYSTEMS ENG</span>
        <ChevronDown size={20} className="animate-bounce" />
      </motion.div>
      
    </div>
  );
}
