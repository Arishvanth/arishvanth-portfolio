import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Briefcase, X, Calendar, MapPin, Code, ChevronRight } from 'lucide-react';
import ImageCarousel from './ImageCarousel';

const experiences = [
  {
    role: "Renewable Energy Support",
    company: "CGS Green Sustainergy Pvt. Ltd.",
    date: "Dec 2025 – Jan 2026",
    location: "Field Operations & Diagnostics",
    desc: "Field operations, solar systems diagnostics, and client interactions bridging sustainable energy and tech.",
    longDesc: "During my time at CGS Green Sustainergy, I was heavily involved in hands-on field operations. I diagnosed deeply technical issues within existing solar installations, engaged directly with clients to map out energy efficiency solutions, and successfully bridged the gap between sustainable energy hardware and modern technological integrations.",
    images: ["/images/CGS Internship on site.jpeg", "/images/CGS Internship.jpeg"],
    tags: ["Solar Diagnostics", "Field Operations", "Grid Integration", "Power Analysis"]
  },
  {
    role: "eCommerce & Data Developer",
    company: "Loomkaari Studio",
    date: "Dec 2024 – Present",
    location: "Digital Infrastructure & Systems",
    desc: "Spearheading Shopify optimization, product metadata structuring, SEO strategies, and pricing data systems.",
    longDesc: "At Loomkaari Studio, I orchestrate the entire digital commerce pipeline for traditional block-printed fabrics. I implemented rigorous product metadata structures, engineered automated pricing strategies based on analytics, and spearheaded Shopify SEO optimization leading to substantial increases in organic digital traction.",
    images: ["/images/loomkaari_fabric.png"],
    tags: ["Shopify Liquid APIs", "SEO Analytics", "Metadata Management", "Pricing Engines"]
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
      
      {/* Background glow node */}
      <div className="absolute top-[30%] left-[-5%] w-[40vw] h-[40vw] bg-red-950/5 blur-[150px] rounded-full pointer-events-none mix-blend-screen" />

      <div className="text-center mb-20 relative z-10">
        <motion.h2 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-5xl font-bold mb-4 flex items-center justify-center gap-3 text-white"
        >
          <Briefcase className="text-red-500 w-8 h-8 md:w-10 md:h-10 animate-pulse" /> 
          <span>Internship <span className="text-gradient">& Experience</span></span>
        </motion.h2>
        <p className="text-gray-400 font-light text-sm max-w-2xl mx-auto">
          Technical engagements bridging hardware operations, solar telemetry diagnostics, and e-commerce database engineering.
        </p>
      </div>

      {/* Vertical Interactive Timeline */}
      <div className="relative w-full max-w-4xl mx-auto z-10">
        
        {/* Timeline spine path */}
        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[1px] bg-gradient-to-b from-red-950 via-red-600/40 to-red-950 transform -translate-x-1/2 pointer-events-none"></div>

        <div className="space-y-16">
          {experiences.map((exp, idx) => {
            const isEven = idx % 2 === 0;
            
            return (
              <div key={idx} className="relative flex flex-col md:flex-row items-stretch md:justify-between w-full">
                
                {/* Center Timeline Node Tag */}
                <div className="absolute left-4 md:left-1/2 top-6 -translate-x-1/2 z-20 flex items-center justify-center">
                  <div className="w-8 h-8 rounded-full border-2 border-red-500 bg-black flex items-center justify-center shadow-[0_0_15px_rgba(255,26,26,0.8)] relative group-hover:scale-110 transition-transform">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping absolute"></div>
                    <Briefcase className="w-3.5 h-3.5 text-red-500" />
                  </div>
                </div>

                {/* Left/Right structural spacer slots */}
                <div className={`w-full md:w-[45%] pl-12 md:pl-0 ${isEven ? 'md:order-1' : 'md:order-3 md:text-right'}`} />
                
                {/* Spacing alignment node */}
                <div className="md:order-2 w-0" />

                {/* Main Card Component */}
                <motion.div 
                  initial={{ opacity: 0, x: isEven ? 50 : -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.7 }}
                  onClick={() => setSelectedExp(exp)}
                  className={`w-full md:w-[45%] pl-12 md:pl-0 ${isEven ? 'md:order-3' : 'md:order-1'} group cursor-pointer`}
                >
                  <div className="hud-panel p-6 border border-white/5 relative overflow-hidden flex flex-col gap-4 shadow-2xl">
                    <div className="hud-scanline" />
                    
                    {/* Visual Cover Carousel */}
                    <div className="w-full h-44 rounded-xl overflow-hidden relative border border-white/10 group-hover:border-red-500/30 transition-colors shadow bg-zinc-950">
                      <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors z-10 pointer-events-none mix-blend-overlay"></div>
                      <img src={exp.images[0]} alt={exp.company} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                    </div>

                    <div className="space-y-2">
                      <span className="text-red-500 font-mono text-[9px] font-bold uppercase tracking-widest flex items-center gap-1.5 justify-start md:group-hover:text-red-400 transition-colors">
                        <Calendar className="w-3 h-3" />
                        {exp.date}
                      </span>
                      <h3 className="text-xl font-extrabold text-white group-hover:text-red-200 transition-colors leading-snug">{exp.role}</h3>
                      <div className="flex items-center gap-1.5 text-gray-400 text-xs font-mono font-bold tracking-wide">
                        <MapPin className="w-3.5 h-3.5 text-red-500" />
                        <span>{exp.company}</span>
                      </div>
                      
                      <p className="text-gray-400 font-light text-xs leading-relaxed pt-2 line-clamp-2 group-hover:text-gray-300 transition-colors">
                        {exp.desc}
                      </p>
                    </div>

                    {/* Tech categories tags */}
                    <div className="flex flex-wrap gap-1 pt-2 border-t border-white/5">
                      {exp.tags.slice(0, 3).map((tag, tIdx) => (
                        <span key={tIdx} className="text-[8px] font-mono text-gray-400 bg-white/5 px-2 py-0.5 rounded border border-white/10">
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Read logs button */}
                    <div className="flex items-center gap-1.5 text-[9px] font-mono font-bold text-red-500/80 group-hover:text-red-400 transition-colors uppercase tracking-widest mt-1">
                      <span>Access logs</span>
                      <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </div>

                  </div>
                </motion.div>

              </div>
            );
          })}
        </div>

      </div>

      {/* Experience Diagnostic Modal */}
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
              className="relative w-full max-w-3xl bg-zinc-950 border border-white/10 rounded-2xl overflow-hidden shadow-[0_0_60px_rgba(255,26,26,0.35)] flex flex-col"
            >
              <div className="hud-scanline" />
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
                
                <div className="text-gray-300 font-light text-sm leading-relaxed space-y-4 pt-4 border-t border-white/5">
                  <p>{selectedExp.longDesc}</p>
                </div>

                <div className="flex flex-wrap gap-2 pt-6">
                  {selectedExp.tags.map((tag, i) => (
                    <span key={i} className="text-[9px] font-mono text-gray-400 bg-white/5 px-3 py-1 rounded border border-white/10 flex items-center gap-1.5">
                      <Code className="w-3 h-3 text-red-500" />
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
