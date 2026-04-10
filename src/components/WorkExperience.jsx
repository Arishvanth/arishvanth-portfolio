import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Briefcase, X } from 'lucide-react';
import ImageCarousel from './ImageCarousel';

const experiences = [
  {
    role: "Renewable Energy Support",
    company: "CGS Green Sustainergy Pvt. Ltd.",
    date: "Dec 2025 – Jan 2026",
    desc: "Field operations, solar systems diagnostics, and client interactions bridging sustainable energy and tech.",
    longDesc: "During my time at CGS Green Sustainergy, I was heavily involved in hands-on field operations. I diagnosed deeply technical issues within existing solar installations, engaged directly with clients to map out energy efficiency solutions, and successfully bridged the gap between sustainable energy hardware and modern technological integrations.",
    images: ["/images/CGS Internship on site.jpeg", "/images/CGS Internship.jpeg"]
  },
  {
    role: "eCommerce & Data Developer",
    company: "Loomkaari Studio",
    date: "Dec 2024 – Present",
    desc: "Spearheading Shopify optimization, product metadata structuring, SEO strategies, and pricing data systems.",
    longDesc: "At Loomkaari Studio, I orchestrate the entire digital commerce pipeline for traditional block-printed fabrics. I implemented rigorous product metadata structures, engineered automated pricing strategies based on analytics, and spearheaded Shopify SEO optimization leading to substantial increases in organic digital traction.",
    images: ["/images/loomkaari_fabric.png"]
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
    <section id="experience" className={`py-20 px-6 lg:px-12 xl:px-20 relative w-full max-w-7xl mx-auto ${selectedExp ? 'z-[100]' : 'z-10'}`}>
      
      <motion.h2 
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="text-3xl md:text-4xl font-bold mb-10 flex items-center gap-3"
      >
        <Briefcase className="text-red-500 w-8 h-8" /> 
        Internship <span className="text-gradient">& Work Experience</span>
      </motion.h2>

      <div className="grid md:grid-cols-2 gap-8">
        {experiences.map((exp, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            onClick={() => setSelectedExp(exp)}
            className="glass-card p-6 border-white/5 group cursor-pointer hover:border-red-500/50 flex flex-col gap-4"
          >
            <div className="w-full h-48 rounded-lg overflow-hidden relative">
              <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors z-10 pointer-events-none mix-blend-overlay"></div>
              <img src={exp.images[0]} alt={exp.company} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
            </div>
            
            <div>
              <h3 className="text-2xl font-bold text-white group-hover:text-red-100 transition-colors">{exp.role}</h3>
              <p className="text-red-400 font-mono text-sm mt-1">{exp.company}</p>
              <p className="text-gray-500 font-mono text-xs mb-3">{exp.date}</p>
              <p className="text-gray-400 font-light text-sm line-clamp-2 group-hover:text-gray-300 transition-colors">{exp.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Experience Modal */}
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
              className="absolute inset-0 bg-black/90 backdrop-blur-md cursor-pointer"
              onClick={() => setSelectedExp(null)}
            ></div>
            
            <motion.div 
              initial={{ y: 50, scale: 0.95, opacity: 0 }}
              animate={{ y: 0, scale: 1, opacity: 1 }}
              exit={{ y: 20, scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="relative w-full max-w-3xl bg-zinc-950 border border-white/10 rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(139,0,0,0.3)]"
            >
              <button 
                onClick={() => setSelectedExp(null)}
                className="absolute top-4 right-4 p-2 bg-black/50 hover:bg-red-600 rounded-full transition-colors z-30 flex items-center justify-center"
              >
                <X className="w-5 h-5 text-white" />
              </button>
              
              <div className="w-full h-64 sm:h-80 relative">
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 to-transparent z-10 pointer-events-none mix-blend-multiply"></div>
                <ImageCarousel images={selectedExp.images} />
              </div>
              
              <div className="p-8 relative z-20 -mt-10">
                <p className="text-red-500 font-mono text-sm tracking-wider uppercase mb-1 drop-shadow-lg">{selectedExp.company}</p>
                <h3 className="text-3xl font-bold text-white mb-2">{selectedExp.role}</h3>
                <p className="text-gray-400 font-mono text-xs mb-6">{selectedExp.date}</p>
                
                <div className="text-gray-300 font-light text-lg leading-relaxed space-y-4">
                  <p>{selectedExp.longDesc}</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
}
