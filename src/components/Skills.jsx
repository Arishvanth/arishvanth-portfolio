import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Cpu, Wifi, BrainCircuit, Activity, ShoppingCart, 
  Wrench, Settings, X, Terminal, ArrowUpRight 
} from 'lucide-react';

const skillCategories = [
  {
    title: "Embedded Systems",
    icon: <Cpu className="w-5 h-5 text-red-500" />,
    iconLg: <Cpu className="w-8 h-8 text-red-500 animate-pulse" />,
    mastery: 92,
    skills: ["C", "Embedded C", "ESP32 Core", "AVR Architecture", "UART / SPI Bus Protocols", "EEPROM Register Tuning"],
    desc: "Bare-metal microcontroller programming, custom peripheral mapping, and low-level firmware architecture design."
  },
  {
    title: "IoT Systems",
    icon: <Wifi className="w-5 h-5 text-red-500" />,
    iconLg: <Wifi className="w-8 h-8 text-red-500 animate-pulse" />,
    mastery: 90,
    skills: ["IoT Architecture", "Wireless Comm (MQTT/HTTP)", "Telemetry Serialization", "Blynk System Sync", "Cloud Data Pipelines"],
    desc: "Connecting edge sensors to remote databases via robust telemetry channels, secure networks, and light serialization formats."
  },
  {
    title: "AI & Data",
    icon: <BrainCircuit className="w-5 h-5 text-red-500" />,
    iconLg: <BrainCircuit className="w-8 h-8 text-red-500 animate-pulse" />,
    mastery: 88,
    skills: ["Machine Learning", "Computer Vision", "CNN Image Classifiers", "OCR Text Extraction", "Python Pipeline Design", "Power BI Dashboards"],
    desc: "Deploying intelligent systems (like breed classification algorithms and expense scanning platforms) to automate real-time decisions."
  },
  {
    title: "Hardware & Sensors",
    icon: <Activity className="w-5 h-5 text-red-500" />,
    iconLg: <Activity className="w-8 h-8 text-red-500 animate-pulse" />,
    mastery: 94,
    skills: ["RFID Reader Systems", "Bio-Sensor Vitals Integration", "Energy Harvesting Coils", "3D Printing Prototyping", "PCB Circuit Design & Soldering"],
    desc: "Orchestrating hardware components, designing robust double-sided PCB traces, and engineering customized mechanical enclosures."
  },
  {
    title: "eCommerce Systems",
    icon: <ShoppingCart className="w-5 h-5 text-red-500" />,
    iconLg: <ShoppingCart className="w-8 h-8 text-red-500 animate-pulse" />,
    mastery: 85,
    skills: ["Shopify Customization", "Product Catalog Metadata", "SEO Optimization Strategies", "Pricing Systems Analytics"],
    desc: "Optimizing retail metrics by engineering custom data models, metadata indices, and organic search crawlers."
  },
  {
    title: "Tools & Platforms",
    icon: <Wrench className="w-5 h-5 text-red-500" />,
    iconLg: <Wrench className="w-8 h-8 text-red-500 animate-pulse" />,
    mastery: 87,
    skills: ["VS Code & Eclipse IDEs", "Arduino / Tinkercad", "GitHub Version Control", "FlashPrint 3D Slicing", "AI Workspace Tools"],
    desc: "Leveraging structured local environments to fast-track firmware builds, rapid simulation testing, and secure source control."
  },
  {
    title: "Engineering Skills",
    icon: <Settings className="w-5 h-5 text-red-500" />,
    iconLg: <Settings className="w-8 h-8 text-red-500 animate-pulse" />,
    mastery: 95,
    skills: ["Circuit Debugging", "PID Motor Tuning", "Systems Integration", "Rapid Prototyping Lifecycles", "IEEE Presentation & Team Coordination"],
    desc: "The core bedrock of my technical identity: diagnostic signal tracing, sorting system loops, and coordinating multidisciplinary teams."
  }
];

export default function Skills() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [telemetryJitter, setTelemetryJitter] = useState([]);

  useEffect(() => {
    // Small jitter for telemetry meters to look alive
    setTelemetryJitter(skillCategories.map(() => Math.random() * 4 - 2));
    const interval = setInterval(() => {
      setTelemetryJitter(skillCategories.map(() => Math.random() * 4 - 2));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  if (selectedCategory) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = 'auto';
  }

  return (
    <section id="skills" className={`py-24 px-6 lg:px-12 xl:px-20 relative w-full max-w-7xl mx-auto ${selectedCategory ? 'z-[100]' : 'z-10'}`}>
      
      {/* Red ambient glow layers */}
      <div className="absolute top-[20%] right-[-10%] w-[35vw] h-[35vw] bg-red-950/10 blur-[120px] rounded-full pointer-events-none mix-blend-screen" />

      <div className="text-center mb-16 relative z-10">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-5xl font-bold mb-4 flex items-center justify-center gap-4 text-white"
        >
          <Terminal className="text-red-500 w-8 h-8 md:w-10 md:h-10 animate-pulse" />
          <span>Technical <span className="text-gradient">Arsenal</span></span>
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-gray-400 max-w-2xl mx-auto font-light text-sm"
        >
          Explore interactive diagnostic categories representing deep integrations spanning low-level registers to cognitive models.
        </motion.p>
      </div>

      {/* Skills Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
        {skillCategories.map((category, idx) => {
          const jitter = telemetryJitter[idx] || 0;
          const displayMastery = Math.min(100, Math.max(70, Math.floor(category.mastery + jitter)));
          
          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: idx * 0.05 }}
              onClick={() => setSelectedCategory(category)}
              className="hud-panel p-6 flex flex-col group cursor-pointer border border-white/5 relative overflow-hidden"
            >
              <div className="hud-scanline" />
              <div className="absolute inset-0 hud-grid opacity-20 group-hover:opacity-40 transition-opacity" />

              <div className="flex items-center justify-between gap-4 mb-5 relative z-10">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-red-950/20 rounded-xl border border-red-500/20 group-hover:border-red-500/60 transition-colors shadow-[0_0_15px_rgba(255,26,26,0.1)] shrink-0">
                    {category.icon}
                  </div>
                  <h3 className="text-lg font-bold text-gray-200 group-hover:text-white transition-colors tracking-wide">{category.title}</h3>
                </div>
                <ArrowUpRight className="w-4 h-4 text-gray-500 group-hover:text-red-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0" />
              </div>

              {/* Preview Core sub-skills */}
              <ul className="space-y-1.5 flex-grow pointer-events-none mb-6 relative z-10">
                {category.skills.slice(0, 3).map((skill, sIdx) => (
                  <li key={sIdx} className="text-gray-400 font-mono text-[11px] flex items-center gap-2 group-hover:text-gray-200 transition-colors">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-600 shadow-[0_0_5px_#ff1a1a] shrink-0"></span>
                    <span>{skill}</span>
                  </li>
                ))}
                {category.skills.length > 3 && (
                  <li className="text-[10px] text-red-500/70 font-mono font-bold tracking-widest pl-3.5 uppercase">
                    + {category.skills.length - 3} Diagnostic registers
                  </li>
                )}
              </ul>

              {/* Dynamic Telemetry Bar */}
              <div className="pt-2 border-t border-white/5 relative z-10">
                <div className="flex justify-between items-center text-[9px] font-mono text-gray-500 mb-1.5">
                  <span>SIGNAL STRENGTH:</span>
                  <span className="text-white font-bold">{displayMastery}%</span>
                </div>
                <div className="h-1.5 w-full bg-zinc-950 rounded-full overflow-hidden relative border border-white/5 shadow-inner">
                  <div 
                    className="h-full bg-gradient-to-r from-red-800 to-red-500 rounded-full opacity-60 group-hover:opacity-100 group-hover:shadow-[0_0_10px_#ff1a1a] transition-all duration-500" 
                    style={{ width: `${displayMastery}%` }}
                  />
                </div>
              </div>

            </motion.div>
          );
        })}
      </div>

      {/* Custom Category Modal */}
      <AnimatePresence>
        {selectedCategory && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ zIndex: 99999 }}
            className="fixed inset-0 flex items-center justify-center p-4 sm:p-6"
          >
            <div 
              className="absolute inset-0 bg-black/95 backdrop-blur-md cursor-pointer"
              onClick={() => setSelectedCategory(null)}
            ></div>
            
            <motion.div 
              initial={{ y: 50, scale: 0.95, opacity: 0 }}
              animate={{ y: 0, scale: 1, opacity: 1 }}
              exit={{ y: 20, scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="relative w-full max-w-xl bg-zinc-950 border border-white/10 rounded-2xl overflow-hidden shadow-[0_0_60px_rgba(255,26,26,0.35)] flex flex-col z-10"
            >
              <div className="hud-scanline" />
              <button 
                onClick={() => setSelectedCategory(null)}
                className="absolute top-4 right-4 p-2 bg-white/5 hover:bg-red-600 rounded-full transition-colors z-20 border border-white/10 text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
              
              <div className="bg-[#070707] border-b border-white/5 p-8 flex items-center gap-5 relative">
                <div className="w-16 h-16 rounded-xl bg-red-950/20 border border-red-500/40 flex items-center justify-center shadow-[0_0_20px_rgba(255,26,26,0.15)] shrink-0">
                  {selectedCategory.iconLg}
                </div>
                <div>
                  <p className="text-red-500 font-mono text-[9px] tracking-widest uppercase mb-1 font-bold">Diagnostic Cluster</p>
                  <h3 className="text-2xl font-bold text-white tracking-wide leading-tight">{selectedCategory.title}</h3>
                </div>
              </div>
              
              <div className="p-8 space-y-6">
                <p className="text-gray-300 font-light text-sm leading-relaxed">
                  {selectedCategory.desc}
                </p>
                
                <div>
                  <h4 className="text-white font-mono text-[10px] font-bold mb-4 tracking-widest flex items-center gap-2 uppercase">
                    <span className="w-3 h-1 bg-red-600 rounded"></span> Core Registers
                  </h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {selectedCategory.skills.map((skill, sIdx) => (
                      <li key={sIdx} className="text-gray-400 font-mono text-[10px] flex items-center gap-2 p-2 bg-black/60 rounded border border-white/5 hover:border-red-500/20 transition-all hover:text-white">
                        <span className="w-1.5 h-1.5 rounded-full bg-red-600 shadow-[0_0_5px_#ff1a1a] shrink-0"></span>
                        <span>{skill}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
