import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Trophy, Medal, Award, X, ChevronRight, Globe, Layers, Cpu, BrainCircuit } from 'lucide-react';

const leadershipItems = [
  { 
    title: "Technical Lead – Project Development", 
    image: "/images/CGS Internship on site.jpeg", 
    detail: "Spearheaded technical architecture and mentored junior members throughout the project lifecycle." 
  },
  { 
    title: "Hackathon Team Lead", 
    image: "/images/Fastest line following robot Gyan mitra team pic.jpeg", 
    detail: "Led multidisciplinary teams in multiple national hackathons, driving the vision and assigning core technical deliverables." 
  },
  { 
    title: "Project Presentation Event Lead – ECSTASY", 
    image: "/images/ECSTASY 2026 event coordinator.jpeg", 
    detail: "Organized and managed the flagship project presentation event, coordinating judging panels and student participants." 
  },
  { 
    title: "Research Publication (AQUA-SENSE)", 
    image: "/images/Journal Publication.jpeg", 
    detail: "Published comprehensive research detailing the intersection of IoT arrays and predictive algorithms in water quality monitoring." 
  },
  { 
    title: "IEEE Conference Presentation", 
    image: "/images/Conference invitation pic.jpeg", 
    detail: "Presented IoT hardware findings at an IEEE tech conference to an audience of industry professionals." 
  },
  { 
    title: "Student Trainer - 3D Printing", 
    image: "/images/3D Printing & Designing Teaching.jpeg", 
    detail: "Conducted hands-on training sessions for peers focusing on CAD modeling and 3D printing rapid prototyping." 
  }
];

const podiumFinishes = [
  { 
    title: "Hack Odyssey 2k25 – Second Prize Winner", 
    image: "/images/Smart Urban Sustainability System (SUSS) price.jpeg", 
    detail: "Won 2nd prize in the prestigious 24-Hour National Hack Odyssey by engineering SUSS—an integrated ESP32 + edge AI smart city system managing traffic flow, smart waste bins, and sustainable micro-grids.",
    badge: "National Hackathon Podium",
    sub: "24-Hour Hack Odyssey // 2nd Place Winner"
  },
  { 
    title: "Gyan Mitra’25 Project Expo – Second Prize Winner", 
    image: "/images/Fastest line following robot Gyan mitra price.jpeg", 
    detail: "Awarded 2nd prize in the national-level Gyan Mitra'25 Project Expo for engineering and calibrating a high-speed, PID-controlled autonomous line-following robot resolving complex tracking trajectories.",
    badge: "National Project Expo Podium",
    sub: "Technical Project Expo // 2nd Place Winner"
  }
];

const participatedEvents = [
  { title: "Tirunelveli Innovation Conclave – Pitch Fest", image: "/images/TN conclave certificate.jpeg", link: "#", detail: "Presented smart ecological grid concepts at the regional innovation pitch fest." },
  { title: "24 hr Hackathon – Codecraft’25", image: "/images/Codecraft'25 certificate.jpeg", link: "#", detail: "Collaborated on low-latency web database integration systems." },
  { title: "24 hr Hackathon – HACK O’ HOLICS 5.0", image: "/images/hack o' holics 5.0.jpg", link: "#", detail: "Engineered emergency vital alert signals." },
  { title: "12 hr Hackathon – Aura 2025", image: "/images/Aura hackathon.jpeg", link: "#", detail: "Built dynamic sensor telemetry streams." },
  { title: "Project Expo – Techathon’24", image: "/images/Techathon'24.jpg", link: "#", detail: "Presented IoT-based monitoring networks." },
  { title: "24 hr Hackathon – Hack Odyssey 3.0", image: "/images/hack odyssey 3.0 certificate.jpeg", link: "#", detail: "Engineered automated edge detection sensors." },
  { title: "Paper Presentation – Theervu’athon’24", image: "/images/Theervu'athon '24.jpg", link: "#", detail: "Presented papers on smart hydro-current generators." },
  { title: "Project Expo (Line Follower) – BIT V-PRAYUKTI’25", image: "/images/BIT V-PRAYUKTI' 25 certificate.jpg", link: "#", detail: "Navigated autonomous speed tracking courses." },
  { title: "Paper Presentation – Kalam’24", image: "/images/Kalam certificate certificate.jpg", link: "#", detail: "Showcased embedded diagnostics methodologies." },
  { title: "Elecsphere Odyssey 24 hr Hackathon – Euphoria’24", image: "/images/kalasalingam Hackathon certification.jpg", link: "#", detail: "Devised off-grid marine solar arrays." }
];

// Organized Certifications catalog
const groupedCerts = [
  {
    category: "IoT & Hardware Diagnostics",
    icon: <Cpu className="w-5 h-5 text-red-500" />,
    items: [
      { title: "NPTEL IoT (Elite)", image: "/images/Introduction to Industry 4.0 and Industrial Internet of Things certificate.jpg", detail: "Elite certification covering Industry 4.0 standards, industrial networks, and IoT routing frameworks." },
      { title: "PCB Designing", image: "/images/PCB designing.jpg", detail: "Hands-on design of double-layer circuit traces and trace route clearance protocols." },
      { title: "3D Printing Skill Training", image: "/images/3D printing skill training certificate.jpeg", detail: "Slicing, rapid rapid-prototyping, and printing precise structural housings." }
    ]
  },
  {
    category: "Machine Learning & Data Science",
    icon: <BrainCircuit className="w-5 h-5 text-red-500" />,
    items: [
      { title: "Machine Learning Foundations", image: "/images/Basics of Machine Learning certificate.jpg", detail: "Supervised and unsupervised learning, regression trees, and classification pipelines." },
      { title: "Data Science", image: "/images/DATA SCIENCE FOUNDATIONS.jpg", detail: "Data cleaning, statistical models, and pattern extraction on large datasets." },
      { title: "Data Analytics (NoviTech)", image: "/images/Data Analytics certificate.jpg", detail: "Data exploration, feature engineering, and automated analytics routines." },
      { title: "Power BI", image: "/images/Power BI workshop certificate.jpg", detail: "Building interactive corporate business intelligence and diagnostic charts." }
    ]
  },
  {
    category: "Software & Architecture",
    icon: <Layers className="w-5 h-5 text-red-500" />,
    items: [
      { title: "Backend Development in Java", image: "/images/backend developmet in java.jpeg", detail: "Handling multithreaded backend servers, REST APIs, and servlet integration in Java." },
      { title: "Java OOP", image: "/images/OOPs in JAVA certificate.jpg", detail: "Encapsulation, polymorphic routing, and structured database abstraction patterns in Java." },
      { title: "Digital Marketing", image: "/images/Introduction to Digital Marketing certificate.jpg", detail: "SEO customization, search indexing pipelines, and metadata tracking rules." }
    ]
  },
  {
    category: "Specialized Engineering Skills",
    icon: <Award className="w-5 h-5 text-red-500" />,
    items: [
      { title: "Antenna Skill", image: "/images/Antenna skill certificate.jpeg", detail: "RF signal modeling, impedance tuning, and antenna wavelength prototyping." }
    ]
  }
];

export default function Leadership() {
  const [activeModalItem, setActiveModalItem] = useState(null);
  const [openCertCategory, setOpenCertCategory] = useState(null);

  if (activeModalItem) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = 'auto';
  }

  const openModal = (itemProps, iconComponent) => {
    setActiveModalItem({ ...itemProps, icon: iconComponent });
  };

  const renderCard = (item, idx, IconComponent, colorClass, placeholderText, modalDescFallback, statusLabel, isHighlight = false) => (
    <motion.div 
      key={idx}
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: idx * 0.04 }}
      className={`p-5 rounded-xl border ${isHighlight ? 'border-red-500/30 bg-red-950/5' : 'border-white/5 bg-[#070707]'} hover:border-red-500/40 hover:shadow-[0_0_20px_rgba(139,0,0,0.15)] transition-all group flex flex-col h-full shadow-lg relative`}
    >
      <div 
        className="w-full h-40 bg-[#030303] rounded-lg mb-4 overflow-hidden relative border border-white/5 cursor-pointer flex-shrink-0" 
        onClick={() => openModal({ ...item, detail: item.detail || modalDescFallback, status: statusLabel, showLink: true }, <IconComponent className={`w-8 h-8 ${colorClass}`} />)}
      >
        {item.image ? (
          <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        ) : (
          <div className={`w-full h-full flex flex-col items-center justify-center text-gray-600 transition-colors ${colorClass.replace('text-', 'group-hover:text-')}`}>
            <IconComponent className="w-8 h-8 mb-2 animate-pulse" />
            <span className="text-[10px] uppercase tracking-widest font-mono text-center px-4">{placeholderText}</span>
          </div>
        )}
      </div>
      <div className="mt-auto flex items-center justify-between gap-2">
        <p 
          className="font-bold text-gray-200 text-xs sm:text-sm group-hover:text-white transition-colors line-clamp-3 cursor-pointer leading-snug"
          onClick={() => openModal({ ...item, detail: item.detail || modalDescFallback, status: statusLabel, showLink: true }, <IconComponent className={`w-8 h-8 ${colorClass}`} />)}
        >
          {item.title}
        </p>
        <button 
          onClick={() => openModal({ ...item, detail: item.detail || modalDescFallback, status: statusLabel, showLink: true }, <IconComponent className={`w-8 h-8 ${colorClass}`} />)}
          className="p-1.5 bg-white/5 rounded hover:bg-red-600 hover:text-white text-gray-400 transition-colors shrink-0 cursor-pointer"
        >
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </motion.div>
  );

  return (
    <section id="leadership" style={{ zIndex: activeModalItem ? 9999 : 10 }} className="py-24 px-6 lg:px-12 xl:px-20 relative w-full max-w-7xl mx-auto space-y-32">
      
      {/* Background glow layers */}
      <div className="absolute bottom-[20%] left-[-10%] w-[35vw] h-[35vw] bg-red-950/10 blur-[150px] rounded-full pointer-events-none mix-blend-screen" />

      {/* Leadership & Research */}
      <div>
        <motion.h2 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold mb-10 flex items-center gap-3 text-white"
        >
          <BookOpen className="text-red-500 w-8 h-8 animate-pulse" /> 
          <span>Leadership <span className="text-gradient">& Research</span></span>
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {leadershipItems.map((item, idx) => renderCard(item, idx, BookOpen, "text-red-500", "Technical Log", item.detail, "System Leadership", false))}
        </div>
      </div>

      {/* Achievements - Standout horizontal Spotlight Cards */}
      <div id="accolades" className="-mt-10 pt-10 select-none">
        <motion.h2 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold mb-10 flex items-center gap-3 text-white"
        >
          <Trophy className="text-red-500 w-8 h-8 animate-pulse" /> 
          <span>Accolades <span className="text-gradient">& Engagements</span></span>
        </motion.h2>
        
        <div className="space-y-12">
          
          {/* 1. GLOBAL SPOTLIGHT: Technoxian World Cup */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950 border border-red-500/30 rounded-3xl p-6 sm:p-8 md:p-10 shadow-[0_0_40px_rgba(255,26,26,0.15)] overflow-hidden flex flex-col md:flex-row gap-8 items-center group cursor-pointer"
            onClick={() => openModal({
              title: "Technoxian World Cup 2024 – World Robotics Championship",
              image: "/images/TechnoXian World Cup 2024 certificate.jpeg",
              detail: "Competed in the prestigious global World Robotics Championship (Technoxian World Cup 2024), scaling through international divisions to secure a coveted Semi-Finalist rank.",
              status: "Global Competitor",
              showLink: true
            }, <Globe className="w-8 h-8 text-yellow-500" />)}
          >
            {/* Spotlight Glow overlays */}
            <div className="absolute -right-20 -top-20 w-80 h-80 bg-red-600/10 blur-[100px] rounded-full pointer-events-none mix-blend-screen" />

            {/* Image spotlight */}
            <div className="w-full md:w-2/5 aspect-video overflow-hidden rounded-2xl border border-yellow-500/20 group-hover:border-yellow-500/50 shadow-2xl relative shrink-0">
              <div className="absolute inset-0 bg-yellow-500/10 group-hover:bg-transparent transition-colors z-10 pointer-events-none mix-blend-overlay"></div>
              <img src="/images/TechnoXian World Cup 2024 certificate.jpeg" alt="Technoxian World Cup" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
            </div>

            {/* Spotlight text */}
            <div className="flex-grow space-y-4 text-center md:text-left">
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
                <span className="px-3 py-1.5 border border-yellow-500/30 bg-yellow-500/10 text-yellow-500 font-mono text-[10px] font-bold tracking-widest rounded-full uppercase flex items-center gap-1.5 shadow-[0_0_15px_rgba(234,179,8,0.15)]">
                  <Globe className="w-3.5 h-3.5 text-yellow-500 animate-spin-slow" />
                  Global Arena Acquired
                </span>
                <span className="px-3 py-1.5 border border-red-500/20 bg-red-950/30 text-red-500 font-mono text-[10px] font-bold tracking-widest rounded-full uppercase">
                  Robotics Championship
                </span>
              </div>

              <div className="space-y-1">
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight">Technoxian World Cup 2024</h3>
                <h4 className="text-yellow-500 font-mono text-sm uppercase tracking-widest font-bold">World Robotics Championship // Semi-Finals</h4>
              </div>

              <p className="text-gray-300 font-light text-sm md:text-base leading-relaxed max-w-xl">
                Scaled through rigorous international regional divisions to represent elite competitive robotics at the highest global tier. The event evaluated autonomous navigation speeds, sensor processing efficiency, and real-time controller feedback.
              </p>

              <div className="flex items-center justify-center md:justify-start gap-1.5 text-[10px] font-mono font-bold text-yellow-500 uppercase tracking-widest">
                <span>View Spec Log</span>
                <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </motion.div>

          {/* 2. PODIUM SPOTLIGHT 1: Hack Odyssey 2k25 */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950 border border-yellow-500/30 rounded-3xl p-6 sm:p-8 md:p-10 shadow-[0_0_40px_rgba(234,179,8,0.1)] overflow-hidden flex flex-col md:flex-row gap-8 items-center group cursor-pointer"
            onClick={() => openModal({
              title: "Hack Odyssey 2k25 – Second Prize Winner",
              image: "/images/Smart Urban Sustainability System (SUSS) price.jpeg",
              detail: "Won 2nd prize in the prestigious 24-Hour National Hack Odyssey by engineering SUSS—an integrated ESP32 + edge AI smart city system managing traffic flow, smart waste bins, and sustainable micro-grids.",
              status: "Podium Winner",
              showLink: true
            }, <Trophy className="w-8 h-8 text-yellow-500" />)}
          >
            {/* Spotlight Glow overlays */}
            <div className="absolute -right-20 -top-20 w-80 h-80 bg-yellow-500/10 blur-[100px] rounded-full pointer-events-none mix-blend-screen" />

            {/* Image spotlight */}
            <div className="w-full md:w-2/5 aspect-video overflow-hidden rounded-2xl border border-yellow-500/20 group-hover:border-yellow-500/50 shadow-2xl relative shrink-0">
              <div className="absolute inset-0 bg-yellow-500/10 group-hover:bg-transparent transition-colors z-10 pointer-events-none mix-blend-overlay"></div>
              <img src="/images/Smart Urban Sustainability System (SUSS) price.jpeg" alt="Hack Odyssey Winner" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
            </div>

            {/* Spotlight text */}
            <div className="flex-grow space-y-4 text-center md:text-left">
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
                <span className="px-3 py-1.5 border border-yellow-500/30 bg-yellow-500/10 text-yellow-500 font-mono text-[10px] font-bold tracking-widest rounded-full uppercase flex items-center gap-1.5">
                  <Trophy className="w-3.5 h-3.5 text-yellow-500 animate-bounce" />
                  National Hackathon Podium
                </span>
                <span className="px-3 py-1.5 border border-red-500/20 bg-red-950/30 text-red-500 font-mono text-[10px] font-bold tracking-widest rounded-full uppercase">
                  Second Prize
                </span>
              </div>

              <div className="space-y-1">
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight">Hack Odyssey 2k25</h3>
                <h4 className="text-yellow-500 font-mono text-sm uppercase tracking-widest font-bold">24-Hour National Hackathon // 2nd Place</h4>
              </div>

              <p className="text-gray-300 font-light text-sm md:text-base leading-relaxed max-w-xl">
                Competed against top engineering teams to build SUSS—an integrated smart city module that connects ESP32 microcontrollers, waste fill sensors, carbon monoxide telemetry, and smart parking arrays, pushing synchronized logs onto remote dashboards.
              </p>

              <div className="flex items-center justify-center md:justify-start gap-1.5 text-[10px] font-mono font-bold text-yellow-500 uppercase tracking-widest">
                <span>View Spec Log</span>
                <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </motion.div>

          {/* 3. PODIUM SPOTLIGHT 2: Gyan Mitra’25 */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950 border border-yellow-500/30 rounded-3xl p-6 sm:p-8 md:p-10 shadow-[0_0_40px_rgba(234,179,8,0.1)] overflow-hidden flex flex-col md:flex-row gap-8 items-center group cursor-pointer"
            onClick={() => openModal({
              title: "Gyan Mitra’25 Project Expo – Second Prize Winner",
              image: "/images/Fastest line following robot Gyan mitra price.jpeg",
              detail: "Awarded 2nd prize in the national-level Gyan Mitra'25 Project Expo for engineering and calibrating a high-speed, PID-controlled autonomous line-following robot resolving complex tracking trajectories.",
              status: "Podium Winner",
              showLink: true
            }, <Trophy className="w-8 h-8 text-yellow-500" />)}
          >
            {/* Spotlight Glow overlays */}
            <div className="absolute -right-20 -top-20 w-80 h-80 bg-yellow-500/10 blur-[100px] rounded-full pointer-events-none mix-blend-screen" />

            {/* Image spotlight */}
            <div className="w-full md:w-2/5 aspect-video overflow-hidden rounded-2xl border border-yellow-500/20 group-hover:border-yellow-500/50 shadow-2xl relative shrink-0">
              <div className="absolute inset-0 bg-yellow-500/10 group-hover:bg-transparent transition-colors z-10 pointer-events-none mix-blend-overlay"></div>
              <img src="/images/Fastest line following robot Gyan mitra price.jpeg" alt="Gyan Mitra Winner" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
            </div>

            {/* Spotlight text */}
            <div className="flex-grow space-y-4 text-center md:text-left">
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
                <span className="px-3 py-1.5 border border-yellow-500/30 bg-yellow-500/10 text-yellow-500 font-mono text-[10px] font-bold tracking-widest rounded-full uppercase flex items-center gap-1.5">
                  <Trophy className="w-3.5 h-3.5 text-yellow-500 animate-bounce" />
                  National Project Expo Podium
                </span>
                <span className="px-3 py-1.5 border border-red-500/20 bg-red-950/30 text-red-500 font-mono text-[10px] font-bold tracking-widest rounded-full uppercase">
                  Second Prize
                </span>
              </div>

              <div className="space-y-1">
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight">Gyan Mitra’25 Project Expo</h3>
                <h4 className="text-yellow-500 font-mono text-sm uppercase tracking-widest font-bold">Autonomous Robotics Category // 2nd Place</h4>
              </div>

              <p className="text-gray-300 font-light text-sm md:text-base leading-relaxed max-w-xl">
                Designed a high-speed autonomous robot equipped with infrared sensor arrays and micro-geared motors. Tuned real-time proportional-integral-derivative (PID) feedback algorithms to achieve optimal cornering velocities and trajectory stability.
              </p>

              <div className="flex items-center justify-center md:justify-start gap-1.5 text-[10px] font-mono font-bold text-yellow-500 uppercase tracking-widest">
                <span>View Spec Log</span>
                <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </motion.div>

        </div>

        {/* Participated Events Timeline */}
        <div className="space-y-6 mt-16">
          <h3 className="text-xl font-bold text-gray-200 flex items-center gap-2 border-l-4 border-blue-500 pl-3">
            <Layers className="w-5 h-5 text-blue-400" />
            National Hackathons & Engagements
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {participatedEvents.map((item, idx) => renderCard(item, idx, Trophy, "text-blue-400", "Participation Record", item.detail, "Competitor", false))}
          </div>
        </div>
      </div>

      {/* Certifications (Upgraded to Grouped & Expandable Blocks - Scanners Removed) */}
      <div id="certifications" className="-mt-10 pt-10">
        <motion.h2 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold mb-10 flex items-center gap-3 text-white"
        >
          <Award className="text-red-500 w-8 h-8 animate-pulse" /> 
          <span>Professional <span className="text-gradient">Credentials</span></span>
        </motion.h2>

        <p className="text-gray-400 font-light text-sm md:text-base max-w-2xl mb-12">
          Verify verified proficiencies spanning bare-metal PCB layout architectures, machine learning foundations, and enterprise systems optimization.
        </p>

        {/* Expandable Domain Panels */}
        <div className="space-y-4 max-w-4xl mx-auto">
          {groupedCerts.map((group, gIdx) => {
            const isOpen = openCertCategory === gIdx;
            
            return (
              <div 
                key={gIdx} 
                className="hud-panel border border-white/5 overflow-hidden transition-all duration-500"
              >
                {/* Header button triggers collapse */}
                <button 
                  onClick={() => setOpenCertCategory(isOpen ? null : gIdx)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left cursor-pointer bg-[#070707] hover:bg-red-950/5 relative z-10"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-red-950/20 rounded-lg border border-red-500/20 text-red-500">
                      {group.icon}
                    </div>
                    <div>
                      <h4 className="font-bold text-sm sm:text-base text-gray-200">{group.category}</h4>
                      <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">{group.items.length} Credentials Available</span>
                    </div>
                  </div>
                  <ChevronRight className={`w-4 h-4 text-gray-400 transition-transform duration-300 ${isOpen ? 'rotate-90 text-red-500' : ''}`} />
                </button>

                {/* Collapsible item container */}
                <AnimatePresence>
                  {isOpen && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: "easeInOut" }}
                      className="border-t border-white/5 bg-[#030303]/40"
                    >
                      <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        {group.items.map((item, idx) => (
                          <div 
                            key={idx}
                            onClick={() => openModal({ ...item, status: "Verified Certificate", showLink: true }, <Award className="w-8 h-8 text-green-400" />)}
                            className="p-4 rounded-xl border border-white/5 bg-[#070707] hover:border-red-500/30 transition-all cursor-pointer group flex flex-col justify-between h-36"
                          >
                            <div className="space-y-1.5">
                              <span className="text-[9px] font-mono text-red-500 uppercase font-bold tracking-widest">VERIFIED</span>
                              <h5 className="font-extrabold text-sm text-white group-hover:text-red-200 transition-colors line-clamp-2 leading-snug">{item.title}</h5>
                            </div>
                            
                            <div className="flex items-center justify-between gap-2 pt-2 border-t border-white/5">
                              <span className="text-[9px] font-mono text-gray-500 uppercase">View Credentials</span>
                              <ChevronRight className="w-3.5 h-3.5 text-gray-500 group-hover:text-red-500 group-hover:translate-x-0.5 transition-all" />
                            </div>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

      </div>

      {/* Credential Spotlight Modal (Scanner Removed) */}
      <AnimatePresence>
        {activeModalItem && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ zIndex: 99999 }}
            className="fixed inset-0 flex items-center justify-center p-4 sm:p-6"
          >
            <div 
              className="absolute inset-0 bg-black/95 backdrop-blur-md cursor-pointer"
              onClick={() => setActiveModalItem(null)}
            ></div>
            
            <motion.div 
              initial={{ y: 50, scale: 0.95, opacity: 0 }}
              animate={{ y: 0, scale: 1, opacity: 1 }}
              exit={{ y: 20, scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="relative w-full max-w-4xl bg-zinc-950 border border-white/10 rounded-2xl overflow-hidden shadow-[0_0_60px_rgba(255,26,26,0.35)] flex flex-col md:flex-row z-10"
            >
              <button 
                onClick={() => setActiveModalItem(null)}
                className="absolute top-4 right-4 p-2 bg-black/60 hover:bg-red-600 rounded-full transition-colors z-50 backdrop-blur-md border border-white/10 text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
              
              <div className="w-full md:w-1/2 bg-[#030303] relative border-b md:border-b-0 md:border-r border-white/10 min-h-[250px] md:min-h-[400px]">
                {activeModalItem.image ? (
                  <img src={activeModalItem.image} alt={activeModalItem.title} className="absolute inset-0 w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center text-gray-500 absolute inset-0 bg-zinc-950">
                    <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-3 text-red-500 animate-pulse">
                      {activeModalItem.icon}
                    </div>
                    <span className="font-mono text-[10px] uppercase tracking-widest">Image File Unloaded</span>
                  </div>
                )}
              </div>

              <div className="w-full md:w-1/2 p-8 md:p-10 flex flex-col justify-center bg-black/90">
                <div className="flex flex-wrap items-center gap-3 mb-6">
                  <div className="p-2 bg-red-950/20 text-red-500 rounded-lg border border-red-500/30 shrink-0">
                    {activeModalItem.icon}
                  </div>
                  {activeModalItem.status && (
                    <span className="text-[10px] font-mono font-bold tracking-widest uppercase text-yellow-500 bg-yellow-900/20 px-3 py-1.5 rounded-full border border-yellow-500/20">
                      {activeModalItem.status}
                    </span>
                  )}
                  {activeModalItem.title.includes("Prize") || activeModalItem.title.toLowerCase().includes("semi") || activeModalItem.title.toLowerCase().includes("winner") ? (
                    <span className="text-[10px] font-mono font-bold tracking-widest uppercase text-green-400 bg-green-900/20 px-3 py-1.5 rounded-full border border-green-500/30">
                      Award Vetted
                    </span>
                  ) : null}
                </div>

                <h3 className="text-xl md:text-2xl font-extrabold text-white mb-6 leading-tight">{activeModalItem.title}</h3>
                
                <div className="space-y-4 mb-8 flex-grow">
                  <div>
                    <span className="text-red-500 font-mono text-[10px] font-bold uppercase tracking-widest block mb-2">System Intel Summary</span>
                    <p className="text-gray-300 font-light text-sm md:text-base leading-relaxed">{activeModalItem.detail}</p>
                  </div>
                </div>
                
                {activeModalItem.showLink && (
                  <button 
                    onClick={() => setActiveModalItem(null)}
                    className="inline-flex max-w-max items-center justify-center gap-2 px-6 py-3 border border-red-900 bg-red-950/20 text-xs font-mono text-white tracking-widest uppercase rounded-lg hover:border-red-500/50 hover:bg-red-950/40 transition-all cursor-pointer shadow-[0_0_15px_rgba(255,26,26,0.1)]"
                  >
                    <span>Close Diagnostics</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
}
