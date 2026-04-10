import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Code2, Cpu, Wifi, BrainCircuit, MonitorPlay, 
  Globe, ShoppingCart, Wrench, Settings, Users, X 
} from 'lucide-react';

const skillCategories = [
  {
    title: "Programming",
    icon: <Code2 className="w-6 h-6 text-red-500" />,
    iconLg: <Code2 className="w-10 h-10 text-red-500" />,
    skills: ["C", "Embedded C", "Java"],
    desc: "Low-level system programming capability alongside robust Object-Oriented Java concepts for backend scaling."
  },
  {
    title: "Embedded & Hardware",
    icon: <Cpu className="w-6 h-6 text-red-500" />,
    iconLg: <Cpu className="w-10 h-10 text-red-500" />,
    skills: ["ESP32", "Arduino Uno, Nano", "Sensors", "RFID Systems", "Motor Drivers", "PCB Design", "3D Printing & Prototyping"],
    desc: "Extensive background orchestrating raw hardware, designing PCBs for mass automation, and realizing 3D printed mechanical enclosures."
  },
  {
    title: "IoT & Smart Systems",
    icon: <Wifi className="w-6 h-6 text-red-500" />,
    iconLg: <Wifi className="w-10 h-10 text-red-500" />,
    skills: ["IoT Architecture", "Wireless Communication", "Smart Monitoring", "Real-time Data Systems"],
    desc: "Bridging the gap between the physical and digital world via robust telemetry pipelines and lightweight networking protocols."
  },
  {
    title: "AI & Data Systems",
    icon: <BrainCircuit className="w-6 h-6 text-red-500" />,
    iconLg: <BrainCircuit className="w-10 h-10 text-red-500" />,
    skills: ["Machine Learning", "Computer Vision", "OCR-based Systems", "Data Processing", "Data Analytics", "Insight Generation"],
    desc: "Integrating Python-based intelligence pipelines (like Optical Character Recognition and Predictive Analysis) to autonomously trigger events or decisions."
  },
  {
    title: "Software & Dev",
    icon: <MonitorPlay className="w-6 h-6 text-red-500" />,
    iconLg: <MonitorPlay className="w-10 h-10 text-red-500" />,
    skills: ["Arduino IDE", "Eclipse IDE", "VS Code", "GitHub", "API Integration", "Database Handling"],
    desc: "A completely established digital toolkit driving my local and remote development, version control, and API hooking capabilities."
  },
  {
    title: "Web & Integration",
    icon: <Globe className="w-6 h-6 text-red-500" />,
    iconLg: <Globe className="w-10 h-10 text-red-500" />,
    skills: ["Frontend Basics (HTML/CSS/JS)", "Dashboard Design", "System Integration"],
    desc: "Capable of rendering clean, modern frontend layouts to visually capture and express sensor telemetry."
  },
  {
    title: "eCommerce & Digital",
    icon: <ShoppingCart className="w-6 h-6 text-red-500" />,
    iconLg: <ShoppingCart className="w-10 h-10 text-red-500" />,
    skills: ["Shopify Customization", "Catalog Management", "SEO Optimization", "Metadata Structuring", "Pricing Systems"],
    desc: "Driving real-world enterprise sales through extreme metadata management and structural Shopify upgrades."
  },
  {
    title: "Tools & Platforms",
    icon: <Wrench className="w-6 h-6 text-red-500" />,
    iconLg: <Wrench className="w-10 h-10 text-red-500" />,
    skills: ["Power BI", "Tinkercad", "FlashPrint", "AI Tools"],
    desc: "Accelerating workflows via Power BI visualization pipelines and modern AI enhancement utilities."
  },
  {
    title: "Core Engineering",
    icon: <Settings className="w-6 h-6 text-red-500" />,
    iconLg: <Settings className="w-10 h-10 text-red-500" />,
    skills: ["Debugging", "Rapid Prototyping", "System Integration", "Circuit Design & Soldering", "Problem Solving"],
    desc: "The quintessential bedrock of any deep-tech engineer: soldering, prototyping, tracing shorts, and logically solving blocks."
  },
  {
    title: "Soft Skills",
    icon: <Users className="w-6 h-6 text-red-500" />,
    iconLg: <Users className="w-10 h-10 text-red-500" />,
    skills: ["Leadership", "Communication", "Team Collaboration", "Analytical Thinking", "Adaptability"],
    desc: "A team multiplier providing clear, concise technical communication and leadership across interdisciplinary teams."
  }
];

export default function Skills() {
  const [selectedCategory, setSelectedCategory] = useState(null);

  if (selectedCategory) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = 'auto';
  }

  return (
    <section id="skills" className={`py-20 px-6 lg:px-12 xl:px-20 relative w-full max-w-7xl mx-auto ${selectedCategory ? 'z-[100]' : 'z-10'}`}>
      
      <div className="text-center mb-16">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold mb-4 flex items-center justify-center gap-4"
        >
          <Cpu className="text-red-500 w-10 h-10" />
          <span>Technical <span className="text-gradient">Arsenal</span></span>
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-gray-400 max-w-2xl mx-auto"
        >
          A comprehensive suite of capabilities ranging from bare-metal embedded programming to high-level data intelligence.
        </motion.p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {skillCategories.map((category, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: idx * 0.05 }}
            onClick={() => setSelectedCategory(category)}
            className="glass-card p-6 flex flex-col group relative overflow-hidden cursor-pointer"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-red-600/0 via-red-900/0 to-red-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
            
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-red-900/20 rounded-lg border border-red-500/30 group-hover:border-red-500/80 transition-colors shadow-[0_0_10px_rgba(139,0,0,0.5)]">
                {category.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-100 group-hover:text-white transition-colors">{category.title}</h3>
            </div>
            
            <ul className="space-y-2 flex-grow pointer-events-none">
              {category.skills.map((skill, sIdx) => (
                <li key={sIdx} className="text-gray-400 font-light text-sm flex items-center gap-2 group-hover:text-gray-200 transition-colors">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-600 shadow-[0_0_5px_#ff1a1a]"></span>
                  {skill}
                </li>
              ))}
            </ul>
            
            <div className="h-1 w-full bg-gray-800 rounded-full mt-6 overflow-hidden pointer-events-none">
              <div className="h-full bg-gradient-to-r from-red-800 to-red-500 w-[85%] rounded-full opacity-50 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Universal Category Modal */}
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
              className="absolute inset-0 bg-black/90 backdrop-blur-md cursor-pointer"
              onClick={() => setSelectedCategory(null)}
            ></div>
            
            <motion.div 
              initial={{ y: 50, scale: 0.95, opacity: 0 }}
              animate={{ y: 0, scale: 1, opacity: 1 }}
              exit={{ y: 20, scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="relative w-full max-w-xl bg-zinc-950 border border-white/10 rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(139,0,0,0.5)] flex flex-col z-10"
            >
              <button 
                onClick={() => setSelectedCategory(null)}
                className="absolute top-4 right-4 p-2 bg-white/5 hover:bg-red-600 rounded-full transition-colors z-20"
              >
                <X className="w-5 h-5 text-white" />
              </button>
              
              <div className="bg-zinc-900 border-b border-white/5 p-8 flex items-center gap-6">
                <div className="w-20 h-20 rounded-2xl bg-red-900/20 border border-red-500/50 flex items-center justify-center shadow-[0_0_20px_rgba(255,26,26,0.2)]">
                  {selectedCategory.iconLg}
                </div>
                <div>
                  <p className="text-red-500 font-mono text-sm tracking-widest uppercase mb-1 drop-shadow-sm">Domain Expertise</p>
                  <h3 className="text-3xl font-bold text-white">{selectedCategory.title}</h3>
                </div>
              </div>
              
              <div className="p-8">
                <p className="text-gray-300 font-light text-lg mb-8 leading-relaxed">
                  {selectedCategory.desc}
                </p>
                
                <div>
                  <h4 className="text-white font-bold mb-4 flex items-center gap-2">
                    <span className="w-4 h-1 bg-red-600 rounded"></span> Core Competencies
                  </h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {selectedCategory.skills.map((skill, sIdx) => (
                      <li key={sIdx} className="text-gray-400 font-mono text-sm flex items-center gap-2 p-2 bg-white/5 rounded border border-white/5">
                        <span className="w-1.5 h-1.5 rounded-full bg-red-600 shadow-[0_0_5px_#ff1a1a]"></span>
                        {skill}
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
