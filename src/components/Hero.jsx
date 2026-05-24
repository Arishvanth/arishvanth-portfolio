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
    const height = 36;
    for (let x = 0; x <= width; x += 4) {
      // Oscilloscope frequency and amplitude responds organically to coreSpeed!
      // Limit amplitude to prevent any vertical clipping within the 36px SVG boundaries
      const amp = 4 + (coreSpeed / 240) * 5.5;
      const y = height / 2 + 
                Math.sin(x * 0.06 + waveOffset) * amp + 
                Math.cos(x * 0.12 - waveOffset * 0.5) * 1.5;
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
    <div id="hero" className="relative min-h-screen flex items-center justify-center pt-28 pb-20 px-6 lg:px-12 xl:px-20 w-full overflow-hidden bg-[#050505] hud-grid-red select-none">
      
      {/* Dynamic ambient red background glow layers */}
      <div className="absolute top-[10%] left-[5%] w-[40vw] h-[40vw] bg-red-900/10 blur-[130px] rounded-full pointer-events-none mix-blend-screen" />
      <div className="absolute bottom-[10%] right-[5%] w-[45vw] h-[45vw] bg-red-950/10 blur-[160px] rounded-full pointer-events-none mix-blend-screen" />

      {/* Spacious 2-Column Responsive Split Deck Layout */}
      <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center relative z-20">
        
        {/* COLUMN 1: THE FLOATING IDENTITY PCB MODULE (Left - 60% spacious cockpit layout) */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="col-span-1 lg:col-span-7 bg-black/60 border border-white/10 rounded-3xl p-8 backdrop-blur-md relative overflow-hidden shadow-[0_0_55px_rgba(255,26,26,0.06)] hover:border-red-500/30 transition-all duration-500 group flex flex-col justify-between gap-6"
        >
          {/* Ambient pulse glow backdrop */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,26,26,0.08)_0%,transparent_60%)] animate-pulse-glow pointer-events-none" />
          <div className="absolute inset-0 hud-grid-red opacity-20 pointer-events-none" />
          <div className="hud-scanline opacity-30 z-20 pointer-events-none" />

          {/* High-tech corner bracket ticks */}
          <span className="absolute top-3 left-4 w-2.5 h-2.5 border-t border-l border-red-500/40 pointer-events-none"></span>
          <span className="absolute top-3 right-4 w-2.5 h-2.5 border-t border-r border-red-500/40 pointer-events-none"></span>
          <span className="absolute bottom-3 left-4 w-2.5 h-2.5 border-b border-l border-red-500/40 pointer-events-none"></span>
          <span className="absolute bottom-3 right-4 w-2.5 h-2.5 border-b border-r border-red-500/40 pointer-events-none"></span>

          {/* Left vertical pin array header */}
          <div className="absolute left-0 top-1/4 bottom-1/4 w-6 flex flex-col justify-between items-center pointer-events-none z-10">
            <div className="w-[1px] h-full bg-red-600/30 absolute left-1/2 -translate-x-1/2"></div>
            {['VCC', 'GND', 'TX', 'RX'].map((pin, pIdx) => (
              <div key={pIdx} className="relative flex items-center justify-center">
                <div className="w-2.5 h-2.5 rounded-full border border-red-500 bg-black flex items-center justify-center shadow-[0_0_8px_rgba(255,26,26,0.4)] group-hover:bg-red-900 group-hover:scale-110 transition-all">
                  <div className="w-1 h-1 rounded-full bg-red-500 animate-pulse"></div>
                </div>
                <span className="absolute left-4 text-[5.5px] font-mono text-red-500/40 uppercase font-bold tracking-widest opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">{pin}</span>
              </div>
            ))}
          </div>

          {/* Mounted silicon chip graphic top right */}
          <div className="absolute top-4 right-4 z-10 hidden sm:flex items-center gap-2 pointer-events-none">
            <div className="w-9 h-9 bg-zinc-900 border border-white/20 rounded flex items-center justify-center shadow-[0_0_15px_rgba(0,0,0,0.8)] relative group-hover:border-red-500/40 transition-colors">
              {/* Tiny copper legs */}
              <span className="absolute -left-1 top-1.5 w-1 h-0.5 bg-gray-500 rounded"></span>
              <span className="absolute -left-1 top-3.5 w-1 h-0.5 bg-gray-500 rounded"></span>
              <span className="absolute -left-1 top-5.5 w-1 h-0.5 bg-gray-500 rounded"></span>
              <span className="absolute -left-1 top-7.5 w-1 h-0.5 bg-gray-500 rounded"></span>
              
              <span className="absolute -right-1 top-1.5 w-1 h-0.5 bg-gray-500 rounded"></span>
              <span className="absolute -right-1 top-3.5 w-1 h-0.5 bg-gray-500 rounded"></span>
              <span className="absolute -right-1 top-5.5 w-1 h-0.5 bg-gray-500 rounded"></span>
              <span className="absolute -right-1 top-7.5 w-1 h-0.5 bg-gray-500 rounded"></span>

              <span className="absolute -top-1 left-1.5 w-0.5 h-1 bg-gray-500 rounded"></span>
              <span className="absolute -top-1 left-3.5 w-0.5 h-1 bg-gray-500 rounded"></span>
              <span className="absolute -top-1 left-5.5 w-0.5 h-1 bg-gray-500 rounded"></span>
              <span className="absolute -top-1 left-7.5 w-0.5 h-1 bg-gray-500 rounded"></span>

              <span className="absolute -bottom-1 left-1.5 w-0.5 h-1 bg-gray-500 rounded"></span>
              <span className="absolute -bottom-1 left-3.5 w-0.5 h-1 bg-gray-500 rounded"></span>
              <span className="absolute -bottom-1 left-5.5 w-0.5 h-1 bg-gray-500 rounded"></span>
              <span className="absolute -bottom-1 left-7.5 w-0.5 h-1 bg-gray-500 rounded"></span>

              <Cpu className="w-5 h-5 text-red-500/50 group-hover:text-red-500 transition-colors animate-pulse" />
              <span className="absolute inset-0.5 rounded border border-dashed border-red-500/10 pointer-events-none"></span>
            </div>
            <div className="flex flex-col text-[6.5px] font-mono text-gray-500 text-right uppercase">
              <span>CHIP ID: ARISH_ID</span>
              <span>VCC: +3.3V REG</span>
            </div>
          </div>

          {/* Active Status Ribbon Pill */}
          <div className="flex items-center gap-2.5 px-4 py-2 border border-red-500/20 bg-red-950/20 rounded-full text-red-500 text-xs font-mono tracking-widest uppercase shadow-[0_0_15px_rgba(255,26,26,0.1)] w-fit pl-10">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-ping"></div>
            <span>SECURE SYSTEM LINKED & ACTIVE</span>
          </div>

          {/* Stately, Spacious Typography */}
          <div className="space-y-4 pl-10">
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white leading-[1.08] font-sans">
              <span className="block hover:text-red-500 transition-colors cursor-default">ARISHVANTH</span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-400 hover:text-white transition-colors cursor-default mt-1">SRIGANESH</span>
            </h1>
            
            <h2 className="text-lg md:text-2xl text-gray-400 font-mono tracking-[0.25em] uppercase font-light pt-2">
              Embedded Systems & IoT Engineer
            </h2>
          </div>

          {/* Project Tagline */}
          <p className="text-gray-300 text-lg md:text-xl leading-relaxed max-w-2xl font-sans font-light tracking-wide pt-4 border-t border-white/5 w-full lg:w-4/5 pl-10">
            "Building intelligent systems that connect hardware, data, and real-world impact."
          </p>

          {/* Spacious Horizontal HUD CTA Deck */}
          <div className="flex flex-wrap gap-4 sm:gap-6 justify-center lg:justify-start w-full pt-4 pl-10">
            <button 
              onClick={() => handleScrollTo('#projects')}
              className="relative overflow-hidden rounded-xl px-8 py-4 font-semibold text-white transition-all hover:scale-105 active:scale-95 border border-red-500/50 bg-gradient-to-r from-[#8B0000] to-[#FF1A1A] hover:shadow-[0_0_30px_rgba(255,26,26,0.6)] cursor-pointer group tracking-widest uppercase font-mono text-xs flex items-center gap-2"
            >
              <Cpu className="w-4 h-4 animate-pulse text-white" />
              <span>Launch Case Studies</span>
              {/* Corner tick details */}
              <span className="absolute top-0 right-0 w-1.5 h-1.5 border-t border-r border-white/50"></span>
              <span className="absolute bottom-0 left-0 w-1.5 h-1.5 border-b border-l border-white/50"></span>
            </button>

            <button 
              onClick={() => handleScrollTo('#skills')}
              className="relative overflow-hidden rounded-xl px-8 py-4 font-semibold text-gray-300 hover:text-white transition-all hover:scale-105 active:scale-95 border border-white/10 hover:border-red-500/40 bg-zinc-950/40 backdrop-blur-md cursor-pointer tracking-widest uppercase font-mono text-xs flex items-center gap-2 group animate-none"
            >
              <Terminal className="w-4 h-4 text-red-500" />
              <span>Core Systems</span>
              <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-red-600 transition-all duration-300 group-hover:w-full"></span>
            </button>

            <a 
              href="/resume.pdf" 
              target="_blank" 
              className="relative overflow-hidden rounded-xl px-8 py-4 font-semibold text-gray-300 hover:text-white transition-all hover:scale-105 active:scale-95 border border-white/10 hover:border-red-500/40 bg-zinc-950/40 backdrop-blur-md cursor-pointer tracking-widest uppercase font-mono text-xs flex items-center gap-2"
            >
              <Download className="w-4 h-4 text-red-500" />
              <span>Credentials</span>
            </a>
          </div>
        </motion.div>

        {/* COLUMN 2: THE FLOATING SILICON COMMAND CONSOLE (Right - 40% clean split) */}
        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
          className="col-span-1 lg:col-span-5 w-full flex justify-center items-center py-6"
        >
          <div className="w-full max-w-[430px] rounded-3xl border border-white/10 bg-black/60 backdrop-blur-md p-6 relative overflow-hidden shadow-[0_0_55px_rgba(255,26,26,0.06)] hover:border-red-500/30 transition-all duration-500 group flex flex-col justify-between gap-5">
            
            {/* Ambient pulse glow backdrop */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,26,26,0.08)_0%,transparent_60%)] animate-pulse-glow pointer-events-none" />
            <span className="absolute top-3 left-4 w-2.5 h-2.5 border-t border-l border-red-500/40 pointer-events-none"></span>
            <span className="absolute top-3 right-4 w-2.5 h-2.5 border-t border-r border-red-500/40 pointer-events-none"></span>
            <span className="absolute bottom-3 left-4 w-2.5 h-2.5 border-b border-l border-red-500/40 pointer-events-none"></span>
            <span className="absolute bottom-3 right-4 w-2.5 h-2.5 border-b border-r border-red-500/40 pointer-events-none"></span>

            {/* Inner Console Content */}
            <div className="relative w-full h-full flex flex-col justify-between font-mono z-10 text-[10px] text-gray-400">
              
              {/* Console Header */}
              <div className="flex justify-between items-center border-b border-white/10 pb-3 mb-2.5">
                <div className="flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-red-500 animate-pulse" />
                  <span className="font-bold text-white tracking-widest uppercase">HOLOGRAPHIC SILICON CORE</span>
                </div>
                <div className="px-2 py-0.5 bg-red-950/30 border border-red-500/20 text-red-500 text-[8px] rounded uppercase font-bold tracking-wider">
                  LINK: ACTIVE
                </div>
              </div>

              {/* Real-time Oscilloscope Signals */}
              <div className="w-full space-y-1 mb-2">
                <div className="flex justify-between items-center text-[7px] text-gray-500 uppercase tracking-widest">
                  <span>ADC_CH1 OSCILLOSCOPE SIGNALS</span>
                  <span className="text-red-500 font-bold flex items-center gap-1">
                    <Activity className="w-3 h-3 animate-pulse" />
                    REAL-TIME
                  </span>
                </div>
                <div className="w-full h-11 bg-black/80 border border-white/5 rounded-xl overflow-hidden relative flex items-center">
                  <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:10px_10px] pointer-events-none" />
                  <svg width="100%" height="36" className="text-red-500 relative z-10 w-full">
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
                <svg viewBox="0 0 200 150" className="w-full h-40 text-gray-700 select-none">
                  <defs>
                    <linearGradient id="coreSubGlow" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#121212" />
                      <stop offset="100%" stopColor="#050505" />
                    </linearGradient>
                  </defs>

                  {/* Concentric orbital rings */}
                  <ellipse cx="100" cy="75" rx="70" ry="36" stroke="rgba(255,26,26,0.06)" strokeWidth="1" fill="none" strokeDasharray="5 5" />
                  <ellipse cx="100" cy="75" rx="85" ry="44" stroke="rgba(255,26,26,0.04)" strokeWidth="0.5" fill="none" />

                  {/* Bus Pathways */}
                  {/* RF Path (Top Left to Core) */}
                  <path d="M 40,40 L 80,65" stroke="rgba(255,255,255,0.08)" strokeWidth="1.5" fill="none" />
                  <path 
                    d="M 40,40 L 80,65" 
                    stroke="#FF1A1A" 
                    strokeWidth="1.5" 
                    fill="none" 
                    strokeDasharray="4 12"
                    style={{
                      animation: `isometricPulse ${1.8 - (coreSpeed - 80) / 160 * 1.3}s linear infinite`
                    }}
                  />

                  {/* AI Path (Top Right to Core) */}
                  <path d="M 160,40 L 120,65" stroke="rgba(255,255,255,0.08)" strokeWidth="1.5" fill="none" />
                  <path 
                    d="M 160,40 L 120,65" 
                    stroke="#FF1A1A" 
                    strokeWidth="1.5" 
                    fill="none" 
                    strokeDasharray="4 12"
                    style={{
                      animation: `isometricPulse ${1.8 - (coreSpeed - 80) / 160 * 1.3}s linear infinite`
                    }}
                  />

                  {/* ADC Path (Bottom Left to Core) */}
                  <path d="M 40,110 L 80,85" stroke="rgba(255,255,255,0.08)" strokeWidth="1.5" fill="none" />
                  <path 
                    d="M 40,110 L 80,85" 
                    stroke="#FF1A1A" 
                    strokeWidth="1.5" 
                    fill="none" 
                    strokeDasharray="4 12"
                    style={{
                      animation: `isometricPulse ${1.8 - (coreSpeed - 80) / 160 * 1.3}s linear infinite`
                    }}
                  />

                  {/* RAM Path (Bottom Right to Core) */}
                  <path d="M 160,110 L 120,85" stroke="rgba(255,255,255,0.08)" strokeWidth="1.5" fill="none" />
                  <path 
                    d="M 160,110 L 120,85" 
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
                      points="40,30 60,40 40,50 20,40" 
                      fill="url(#coreSubGlow)" 
                      stroke={activeSub === 'RF' ? '#FF1A1A' : 'rgba(255,255,255,0.1)'} 
                      strokeWidth={activeSub === 'RF' ? '1.5' : '1'} 
                    />
                    <circle cx="40" cy="40" r="2.5" fill={activeSub === 'RF' ? '#FF1A1A' : 'rgba(255,255,255,0.3)'} className="animate-pulse" />
                    <text x="40" y="24" textAnchor="middle" fill={activeSub === 'RF' ? '#FFFFFF' : '#888888'} fontSize="6.5" fontWeight="bold">RF_COMM</text>
                  </g>

                  {/* Subsystem 2: EDGE AI (Top Right) */}
                  <g 
                    className="cursor-pointer pointer-events-auto" 
                    onClick={() => setActiveSub('AI')}
                  >
                    <polygon 
                      points="160,30 180,40 160,50 140,40" 
                      fill="url(#coreSubGlow)" 
                      stroke={activeSub === 'AI' ? '#FF1A1A' : 'rgba(255,255,255,0.1)'} 
                      strokeWidth={activeSub === 'AI' ? '1.5' : '1'} 
                    />
                    <circle cx="160" cy="40" r="2.5" fill={activeSub === 'AI' ? '#FF1A1A' : 'rgba(255,255,255,0.3)'} className="animate-pulse" />
                    <text x="160" y="24" textAnchor="middle" fill={activeSub === 'AI' ? '#FFFFFF' : '#888888'} fontSize="6.5" fontWeight="bold">EDGE_AI</text>
                  </g>

                  {/* Subsystem 3: ADC DATA (Bottom Left) */}
                  <g 
                    className="cursor-pointer pointer-events-auto" 
                    onClick={() => setActiveSub('ADC')}
                  >
                    <polygon 
                      points="40,100 60,110 40,120 20,110" 
                      fill="url(#coreSubGlow)" 
                      stroke={activeSub === 'ADC' ? '#FF1A1A' : 'rgba(255,255,255,0.1)'} 
                      strokeWidth={activeSub === 'ADC' ? '1.5' : '1'} 
                    />
                    <circle cx="40" cy="110" r="2.5" fill={activeSub === 'ADC' ? '#FF1A1A' : 'rgba(255,255,255,0.3)'} className="animate-pulse" />
                    <text x="40" y="130" textAnchor="middle" fill={activeSub === 'ADC' ? '#FFFFFF' : '#888888'} fontSize="6.5" fontWeight="bold">ADC_DATA</text>
                  </g>

                  {/* Subsystem 4: CENTRAL CPU (Center 3D isometric block) */}
                  <g 
                    className="cursor-pointer pointer-events-auto" 
                    onClick={() => setActiveSub('CPU')}
                  >
                    {/* Top Face */}
                    <polygon 
                      points="100,55 135,73 100,91 65,73" 
                      fill="url(#coreSubGlow)" 
                      stroke={activeSub === 'CPU' ? '#FF1A1A' : 'rgba(255,255,255,0.15)'} 
                      strokeWidth={activeSub === 'CPU' ? '1.5' : '1'} 
                    />
                    {/* Left Isometric Side Face */}
                    <polygon 
                      points="65,73 100,91 100,99 65,81" 
                      fill="rgba(139,0,0,0.2)" 
                      stroke={activeSub === 'CPU' ? '#FF1A1A' : 'rgba(255,255,255,0.1)'} 
                      strokeWidth="0.8" 
                    />
                    {/* Right Isometric Side Face */}
                    <polygon 
                      points="100,91 135,73 135,81 100,99" 
                      fill="rgba(139,0,0,0.1)" 
                      stroke={activeSub === 'CPU' ? '#FF1A1A' : 'rgba(255,255,255,0.1)'} 
                      strokeWidth="0.8" 
                    />

                    {/* Engraved glowing text on silicon */}
                    <text x="100" y="70" textAnchor="middle" fill="#FFFFFF" fontSize="5.5" fontWeight="black" letterSpacing="0.5" className="animate-pulse opacity-90">ARISH_32</text>
                    <text x="100" y="77" textAnchor="middle" fill="#FF1A1A" fontSize="4.5" fontWeight="bold" opacity="0.8">CORE ENGINE</text>

                    {/* Central pulsing core node */}
                    <circle 
                      cx="100" 
                      cy="85" 
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
                      points="160,100 180,110 160,120 140,110" 
                      fill="url(#coreSubGlow)" 
                      stroke="rgba(255,255,255,0.1)" 
                      strokeWidth="1" 
                    />
                    <circle cx="160" cy="110" r="2.5" fill="rgba(255,255,255,0.3)" className="animate-pulse" />
                    <text x="160" y="130" textAnchor="middle" fill="#888888" fontSize="6.5" fontWeight="bold">EDGE_RAM</text>
                  </g>
                </svg>
              </div>

              {/* Core Stress & Frequency Control Slider */}
              <div className="border-t border-white/10 pt-3 flex flex-col gap-2 shrink-0">
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

              {/* Integrated Telemetry scanner panel inside the Console */}
              <div className="border-t border-white/10 pt-3 space-y-2.5 mt-3 shrink-0">
                <div className="flex justify-between items-center text-[7.5px] text-gray-500 uppercase tracking-widest font-bold">
                  <span className="text-red-500">{subInfo[activeSub].title}</span>
                  <span>SYS_LOG</span>
                </div>
                
                {/* Metrics row */}
                <div className="grid grid-cols-3 gap-2">
                  {subInfo[activeSub].metrics.map((metric, mIdx) => (
                    <div key={mIdx} className="p-1.5 border border-white/5 bg-zinc-950/60 rounded-xl flex flex-col justify-between items-center text-center">
                      <span className="text-[5.5px] text-gray-500 font-bold uppercase tracking-wider">{metric.label}</span>
                      <span className="text-white text-[9px] font-bold mt-0.5 tracking-tight">{metric.val()}</span>
                    </div>
                  ))}
                </div>

                {/* Console Logs Box */}
                <div className="w-full h-16 bg-black/85 border border-white/5 rounded-xl p-2 font-mono text-[7.5px] text-gray-400 space-y-1 overflow-hidden select-none">
                  {subInfo[activeSub].logs.slice(0, 3).map((log, lIdx) => (
                    <div key={lIdx} className="flex items-center gap-1 truncate">
                      <span className="text-red-700/60 font-semibold">{`>`}</span>
                      <span className="text-gray-300 font-light truncate">{log}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </motion.div>

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
