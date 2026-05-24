import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Briefcase, X, Calendar, MapPin, Terminal, Cpu, ChevronRight, Activity, Database } from 'lucide-react';
import ImageCarousel from './ImageCarousel';

const experiences = [
  {
    id: "cgs",
    role: "Renewable Energy Support",
    company: "CGS Green Sustainergy Pvt. Ltd.",
    date: "Dec 2025 – Jan 2026",
    location: "Field Operations & Systems Diagnostics",
    desc: "Field operations, solar systems diagnostics, and client interactions bridging sustainable energy and tech.",
    longDesc: "During my time at CGS Green Sustainergy, I was heavily involved in hands-on field operations. I diagnosed deeply technical issues within existing solar installations, engaged directly with clients to map out energy efficiency solutions, and successfully bridged the gap between sustainable energy hardware and modern technological integrations.",
    images: ["/images/CGS Internship on site.jpeg", "/images/CGS Internship.jpeg"],
    blueprintCode: "MCU_PV_SYS_01",
    sysLogs: [
      "INIT: BINDING SOLAR ARRAY DATA REGISTERS",
      "STATUS: OK // RESOLVING PHOTOVOLTAIC EMF DROPS",
      "DIAG: TRACING SYSTEM CONNECTOR IMPEDANCES",
      "OUT: COMPILED CLIENT POWER METRICS DRAW"
    ],
    deliverables: [
      "Diagnosed deeply technical power drops in on-site photovoltaic solar arrays.",
      "Bridged sustainable energy hardware with low-latency monitoring telemetry.",
      "Conducted diagnostic tracing to optimize client electrical layouts."
    ],
    tags: ["Solar Photovoltaics", "Systems Diagnostics", "Telemetry Integration", "Field Engineering"]
  },
  {
    id: "loomkaari",
    role: "eCommerce & Data Developer",
    company: "Loomkaari Studio",
    date: "Dec 2024 – Present",
    location: "Digital Commerce Infrastructure",
    desc: "Spearheading Shopify optimization, product metadata structuring, SEO strategies, and pricing data systems.",
    longDesc: "At Loomkaari Studio, I orchestrate the entire digital commerce pipeline for traditional block-printed fabrics. I implemented rigorous product metadata structures, engineered automated pricing strategies based on analytics, and spearheaded Shopify SEO optimization leading to substantial increases in organic digital traction.",
    images: ["/images/loomkaari_fabric.png"],
    blueprintCode: "DB_SHPFY_ENG_02",
    sysLogs: [
      "INIT: CONNECTING TO SHOPIFY LIQUID API GATEWAY",
      "STATUS: OK // RESOLVED SEO METADATA INDEXES",
      "DIAG: COMPILING PRODUCT CATALOG PRICING MATRIX",
      "OUT: TRAPPING TRAFFIC TRACTION PEAKS (+45%)"
    ],
    deliverables: [
      "Spearheaded complete catalog SEO optimization and Liquid API customization.",
      "Engineered data-driven pricing models to optimize product yields dynamically.",
      "Structured product metadata indexing to maximize search engine crawlers."
    ],
    tags: ["Shopify Liquid API", "Data Architectures", "SEO Optimization", "Dynamic Pricing"]
  }
];

export default function WorkExperience() {
  const [selectedExp, setSelectedExp] = useState(null);

  if (selectedExp) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = 'auto';
  }

  return (
    <section id="experience" className={`py-24 px-6 lg:px-12 xl:px-20 relative w-full max-w-7xl mx-auto ${selectedExp ? 'z-[100]' : 'z-10'}`}>
      
      {/* Background glow layers */}
      <div className="absolute top-[20%] left-[-10%] w-[35vw] h-[35vw] bg-red-950/10 blur-[130px] rounded-full pointer-events-none mix-blend-screen" />

      <div className="text-center mb-20 relative z-10">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-5xl font-bold mb-4 flex items-center justify-center gap-3 text-white"
        >
          <Briefcase className="text-red-500 w-8 h-8 md:w-10 md:h-10 animate-pulse" /> 
          <span>Internship <span className="text-gradient">& Experience</span></span>
        </motion.h2>
        <p className="text-gray-400 font-light text-sm md:text-base max-w-2xl mx-auto">
          Technical systems integration. Click any architectural blueprint module below to examine official logs and case studies.
        </p>
      </div>

      {/* Systems Architecture Blueprint View */}
      <div className="relative w-full z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch max-w-6xl mx-auto">
        
        {/* Experience Node Module 1 */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          onClick={() => setSelectedExp(experiences[0])}
          className="col-span-1 lg:col-span-5 bg-black/60 border border-white/10 rounded-3xl p-6 hover:border-red-500/40 hover:shadow-[0_0_30px_rgba(255,26,26,0.1)] transition-all cursor-pointer flex flex-col justify-between group relative select-none"
        >
          <div className="absolute inset-0 hud-grid opacity-20 pointer-events-none" />

          {/* Module Header */}
          <div className="flex justify-between items-start border-b border-white/10 pb-4 mb-5">
            <div>
              <span className="font-mono text-[9px] text-red-500 font-bold tracking-widest uppercase block">{experiences[0].blueprintCode}</span>
              <h3 className="text-xl font-extrabold text-white group-hover:text-red-200 transition-colors mt-1">{experiences[0].role}</h3>
            </div>
            <div className="p-2 bg-red-950/20 rounded-xl border border-red-500/20 text-red-500 shrink-0">
              <Cpu className="w-5 h-5 animate-pulse" />
            </div>
          </div>

          {/* Visual Hardware Preview Frame */}
          <div className="w-full h-40 rounded-2xl overflow-hidden relative border border-white/5 mb-4 group-hover:border-red-500/30 transition-colors bg-zinc-950 shrink-0">
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-black/40 z-10 pointer-events-none"></div>
            
            {/* Tech scanner lines */}
            <div className="hud-scanline opacity-30" />
            
            <img 
              src={experiences[0].images[0]} 
              alt={experiences[0].company} 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-80 group-hover:opacity-100" 
              onError={(e) => { e.target.src = "https://via.placeholder.com/400x300/0a0a0a/ff0000?text=CGS+Internship"; }}
            />
            
            {/* Tech Corner Crosshairs */}
            <div className="absolute top-2 left-2 w-2 h-2 border-t border-l border-red-500/40 pointer-events-none"></div>
            <div className="absolute top-2 right-2 w-2 h-2 border-t border-r border-red-500/40 pointer-events-none"></div>
            <div className="absolute bottom-2 left-2 w-2 h-2 border-b border-l border-red-500/40 pointer-events-none"></div>
            <div className="absolute bottom-2 right-2 w-2 h-2 border-b border-r border-red-500/40 pointer-events-none"></div>
            
            {/* Status overlay */}
            <div className="absolute bottom-2 left-3 z-20 font-mono text-[8px] text-red-500/80 bg-black/70 px-2 py-0.5 rounded border border-red-500/20 uppercase tracking-widest">
              IMG_REF: ACTIVE
            </div>
          </div>

          {/* Deliverables Specs list */}
          <div className="space-y-3 flex-grow my-2">
            <span className="text-[9px] font-mono font-bold tracking-widest text-gray-500 block uppercase">ENGINEERED SPECS:</span>
            <ul className="space-y-2 text-gray-300 text-sm leading-relaxed font-light font-sans">
              {experiences[0].deliverables.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <span className="text-red-500 font-bold shrink-0">▹</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Live system logs ticker inside module */}
          <div className="mt-6 p-3 bg-black/80 border border-white/5 rounded-xl font-mono text-[9px] text-gray-400 space-y-1">
            <div className="flex justify-between text-[8px] text-red-500 font-bold pb-1 border-b border-white/5 mb-1.5 uppercase">
              <span>System Output Logs</span>
              <span>ONLINE</span>
            </div>
            {experiences[0].sysLogs.map((log, lIdx) => (
              <div key={lIdx} className="flex items-center gap-1.5">
                <span className="text-red-700/60 font-semibold">{`>`}</span>
                <span className="line-clamp-1">{log}</span>
              </div>
            ))}
          </div>

          {/* Explore Button */}
          <div className="flex items-center gap-1 text-[10px] font-mono font-bold text-red-500 uppercase tracking-widest pt-4 mt-4 border-t border-white/5 group-hover:text-red-400 transition-colors">
            <span>Explore Case Details</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>

        </motion.div>

        {/* Central Data Bus Pathways */}
        <div className="col-span-1 lg:col-span-2 flex lg:flex-col items-center justify-center gap-4 py-6 lg:py-0 select-none">
          <div className="h-[1px] lg:h-24 w-12 lg:w-[1px] bg-gradient-to-r lg:bg-gradient-to-b from-red-600/10 via-red-500/40 to-red-600/10"></div>
          
          <div className="p-3 border border-red-500/30 bg-red-950/20 text-red-500 rounded-full shadow-[0_0_20px_rgba(255,26,26,0.2)] animate-pulse flex items-center justify-center">
            <Activity className="w-6 h-6 animate-pulse" />
          </div>

          <div className="h-[1px] lg:h-24 w-12 lg:w-[1px] bg-gradient-to-r lg:bg-gradient-to-b from-red-600/10 via-red-500/40 to-red-600/10"></div>
        </div>

        {/* Experience Node Module 2 */}
        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          onClick={() => setSelectedExp(experiences[1])}
          className="col-span-1 lg:col-span-5 bg-black/60 border border-white/10 rounded-3xl p-6 hover:border-red-500/40 hover:shadow-[0_0_30px_rgba(255,26,26,0.1)] transition-all cursor-pointer flex flex-col justify-between group relative select-none"
        >
          <div className="absolute inset-0 hud-grid opacity-20 pointer-events-none" />

          {/* Module Header */}
          <div className="flex justify-between items-start border-b border-white/10 pb-4 mb-5">
            <div>
              <span className="font-mono text-[9px] text-red-500 font-bold tracking-widest uppercase block">{experiences[1].blueprintCode}</span>
              <h3 className="text-xl font-extrabold text-white group-hover:text-red-200 transition-colors mt-1">{experiences[1].role}</h3>
            </div>
            <div className="p-2 bg-red-950/20 rounded-xl border border-red-500/20 text-red-500 shrink-0">
              <Database className="w-5 h-5 animate-pulse" />
            </div>
          </div>

          {/* Visual Hardware Preview Frame */}
          <div className="w-full h-40 rounded-2xl overflow-hidden relative border border-white/5 mb-4 group-hover:border-red-500/30 transition-colors bg-zinc-950 shrink-0">
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-black/40 z-10 pointer-events-none"></div>
            
            {/* Tech scanner lines */}
            <div className="hud-scanline opacity-30" />
            
            <img 
              src={experiences[1].images[0]} 
              alt={experiences[1].company} 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-80 group-hover:opacity-100" 
              onError={(e) => { e.target.src = "https://via.placeholder.com/400x300/0a0a0a/ff0000?text=Loomkaari+Fabric"; }}
            />
            
            {/* Tech Corner Crosshairs */}
            <div className="absolute top-2 left-2 w-2 h-2 border-t border-l border-red-500/40 pointer-events-none"></div>
            <div className="absolute top-2 right-2 w-2 h-2 border-t border-r border-red-500/40 pointer-events-none"></div>
            <div className="absolute bottom-2 left-2 w-2 h-2 border-b border-l border-red-500/40 pointer-events-none"></div>
            <div className="absolute bottom-2 right-2 w-2 h-2 border-b border-r border-red-500/40 pointer-events-none"></div>
            
            {/* Status overlay */}
            <div className="absolute bottom-2 left-3 z-20 font-mono text-[8px] text-red-500/80 bg-black/70 px-2 py-0.5 rounded border border-red-500/20 uppercase tracking-widest">
              IMG_REF: ACTIVE
            </div>
          </div>

          {/* Deliverables Specs list */}
          <div className="space-y-3 flex-grow my-2">
            <span className="text-[9px] font-mono font-bold tracking-widest text-gray-500 block uppercase">ENGINEERED SPECS:</span>
            <ul className="space-y-2 text-gray-300 text-sm leading-relaxed font-light font-sans">
              {experiences[1].deliverables.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <span className="text-red-500 font-bold shrink-0">▹</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Live system logs ticker inside module */}
          <div className="mt-6 p-3 bg-black/80 border border-white/5 rounded-xl font-mono text-[9px] text-gray-400 space-y-1">
            <div className="flex justify-between text-[8px] text-red-500 font-bold pb-1 border-b border-white/5 mb-1.5 uppercase">
              <span>System Output Logs</span>
              <span>ONLINE</span>
            </div>
            {experiences[1].sysLogs.map((log, lIdx) => (
              <div key={lIdx} className="flex items-center gap-1.5">
                <span className="text-red-700/60 font-semibold">{`>`}</span>
                <span className="line-clamp-1">{log}</span>
              </div>
            ))}
          </div>

          {/* Explore Button */}
          <div className="flex items-center gap-1 text-[10px] font-mono font-bold text-red-500 uppercase tracking-widest pt-4 mt-4 border-t border-white/5 group-hover:text-red-400 transition-colors">
            <span>Explore Case Details</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>

        </motion.div>

      </div>

      {/* Experience Specs Modal */}
      <AnimatePresence>
        {selectedExp && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ zIndex: 99999 }}
            className="fixed inset-0 flex items-center justify-center p-4 sm:p-6"
          >
            <div 
              className="absolute inset-0 bg-black/95 backdrop-blur-md cursor-pointer"
              onClick={() => setSelectedExp(null)}
            ></div>
            
            <motion.div 
              initial={{ y: 50, scale: 0.95, opacity: 0 }}
              animate={{ y: 0, scale: 1, opacity: 1 }}
              exit={{ y: 20, scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="relative w-full max-w-3xl bg-zinc-950 border border-white/10 rounded-2xl overflow-hidden shadow-[0_0_60px_rgba(255,26,26,0.35)] flex flex-col z-10"
            >
              <button 
                onClick={() => setSelectedExp(null)}
                className="absolute top-4 right-4 p-2 bg-black/60 hover:bg-red-600 rounded-full transition-colors z-30 border border-white/10 text-white cursor-pointer flex items-center justify-center"
              >
                <X className="w-5 h-5" />
              </button>
              
              <div className="w-full h-64 sm:h-80 relative border-b border-white/10 bg-black">
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent z-10 pointer-events-none mix-blend-multiply"></div>
                <ImageCarousel images={selectedExp.images} />
              </div>
              
              <div className="p-8 relative z-20 -mt-8 bg-zinc-950/90 backdrop-blur">
                <p className="text-red-500 font-mono text-xs tracking-wider uppercase mb-1 font-bold">{selectedExp.company}</p>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-2 leading-tight">{selectedExp.role}</h3>
                
                <div className="flex flex-wrap items-center gap-4 text-gray-400 font-mono text-[10px] mb-6">
                  <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5 text-red-500" /> {selectedExp.date}</span>
                  <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-red-500" /> {selectedExp.location}</span>
                </div>
                
                <div className="text-gray-300 font-light text-sm md:text-base leading-relaxed space-y-4 pt-4 border-t border-white/5 font-sans">
                  <p>{selectedExp.longDesc}</p>
                </div>

                <div className="flex flex-wrap gap-2 pt-6">
                  {selectedExp.tags && selectedExp.tags.map((tag, i) => (
                    <span key={i} className="text-[10px] font-mono text-gray-400 bg-white/5 px-3 py-1 rounded border border-white/10 flex items-center gap-1.5">
                      <Cpu className="w-3 h-3 text-red-500" />
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
}
