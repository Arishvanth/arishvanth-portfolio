import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Download, X } from 'lucide-react';

const statLists = {
  projects: {
    title: "Projects",
    items: [
      "Tidal Energy Powered Smart Fishnet System",
      "Smart Urban Sustainability System (SUSS)",
      "Smart Wheelchair Monitoring System",
      "CarePriority – Smart Patient Prioritization",
      "AI-Powered Receipt & Expense Intelligence",
      "AQUA-SENSE – Water Quality Monitoring",
      "Smart Environment Monitoring",
      "CSSR Operations (SIH Project)",
      "Fastest Line Follower Robot"
    ]
  },
  competitions: {
    title: "Competitions & Hackathons",
    items: [
      "Winner – Tirunelveli Innovation Conclave",
      "2nd Prize – Hack Odyssey 2k25",
      "2nd Prize – Gyan Mitra’25",
      "Technoxian World Robotics Championship",
      "National Level Tech Symposium",
      "State Level Hackathon",
      "Robotics Workshop",
      "AI & IoT Expo"
    ]
  },
  patents: {
    title: "Patents",
    items: [
      "Patent No: 202541021013 A - RFID-Based Access Control System"
    ]
  },
  publications: {
    title: "Journal Publications",
    items: [
      "Intersection of IoT arrays and predictive algorithms in water quality monitoring (AQUA-SENSE)"
    ]
  },
  certifications: {
    title: "Certifications",
    items: [
      "Data Analytics (NoviTech)",
      "NPTEL IoT (Elite)",
      "Machine Learning",
      "Data Science",
      "Power BI",
      "Java OOP",
      "Backend Development in Java",
      "Digital Marketing",
      "PCB Designing"
    ]
  },
  courses: {
    title: "Coursework & Focus Areas",
    items: [
      "Embedded Systems Architecture",
      "IoT Full-Stack Development",
      "Microcontroller Programming",
      "Data Structures & Algorithms",
      "Machine Learning Core Concepts"
    ]
  },
  events: {
    title: "Events Coordinated",
    items: [
      "Project Presentation Event - ECSTASY (Event Lead & Organizer)"
    ]
  },
  mentorship: {
    title: "Mentorship & Training",
    items: [
      "Student Trainer - 3D Printing & CAD Designing",
      "Hackathon Team Lead & Hardware Mentor",
      "Technical Lead - Project Development lifecycle"
    ]
  }
};

export default function About() {
  const [activeStat, setActiveStat] = useState(null);

  // Lock body scroll
  if (activeStat) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = 'auto';
  }

  return (
    <div className="relative min-h-screen flex flex-col items-center pt-32 px-6">
      
      {/* Hero Section */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="text-center max-w-4xl mx-auto z-10"
      >
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-4">
          Arishvanth <span className="text-gradient">Sriganesh</span>
        </h1>
        <h2 className="text-xl md:text-2xl text-gray-400 font-medium tracking-wide mb-8">
          Embedded Systems & IoT Engineer
        </h2>
        
        <p className="text-lg md:text-xl text-gray-300 leading-relaxed mb-10 max-w-2xl mx-auto font-light">
          "Building intelligent systems that connect hardware, data, and real-world impact."
        </p>

        <div className="flex flex-col sm:flex-row gap-6 justify-center">
          <a href="#projects" className="px-8 py-4 rounded-lg border border-red-900 text-white font-semibold hover:bg-red-900/20 transition-all inline-flex items-center justify-center tracking-wide">
            View Projects
          </a>
          <a href="#contact" className="px-8 py-4 rounded-lg border border-red-900 text-white font-semibold hover:bg-red-900/20 transition-all inline-flex items-center justify-center tracking-wide">
            Contact Me
          </a>
          <a href="/resume.pdf" target="_blank" className="px-8 py-4 rounded-lg border border-red-900 text-white font-semibold hover:bg-red-900/20 transition-all inline-flex items-center justify-center gap-2 tracking-wide">
            <Download className="w-5 h-5" /> Resume
          </a>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-10 text-red-500 opacity-60 z-10"
      >
        <ChevronDown size={32} />
      </motion.div>

      {/* About Me Section */}
      <div id="about" className="w-full max-w-6xl mx-auto mt-40 pb-20 z-10 p-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="glass-card p-8 md:p-12 flex flex-col md:flex-row gap-12 items-center"
        >
          {/* Profile Image Column */}
          <div className="w-full md:w-1/3 flex justify-center relative">
            <div className="absolute inset-0 bg-red-600 blur-[60px] opacity-20 rounded-full"></div>
            <img 
              src="/images/Profile pic.jpeg" 
              alt="Arishvanth Sriganesh" 
              className="relative w-80 h-80 object-cover rounded-2xl border-2 border-red-900/50 shadow-[0_0_30px_rgba(139,0,0,0.4)] hover:scale-105 transition-transform duration-500"
              onError={(e) => { e.target.src = "https://via.placeholder.com/400x400/0a0a0a/ff0000?text=Profile"; }}
            />
          </div>

          {/* Narrative Column */}
          <div className="w-full md:w-2/3 flex flex-col">
            <h3 className="text-3xl font-bold mb-6 text-white flex items-center gap-3">
              <span className="w-8 h-1 bg-gradient-to-r from-red-600 to-transparent inline-block rounded"></span>
              About Me
            </h3>
            <div className="space-y-4 text-gray-300 text-lg leading-relaxed font-light mb-8">
              <p>
                My passion lies at the intersection of hardware and intelligence. As an Embedded Systems & IoT Engineer, I thrive on designing systems that sense the physical world, process data accurately, and deliver actionable outcomes.
              </p>
              <p>
                With a strong foundational mindset across IoT architecture, AI-based systems, and rigorous data analytics workflows, I build solutions geared toward real-world problems—from smart urban infrastructure to sustainable edge energy systems.
              </p>
            </div>
            
            {/* Interactive Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-auto">
              {Object.keys(statLists).map((key) => (
                <button 
                  key={key}
                  onClick={() => setActiveStat(key)} 
                  className="bg-[#050505] border border-white/10 hover:border-red-500/50 rounded-xl p-4 flex flex-col items-center justify-center gap-1 group transition-all"
                >
                  <span className="text-3xl font-bold text-white group-hover:text-red-500 transition-colors">
                    {statLists[key].items.length}+
                  </span>
                  <span className="text-[10px] sm:text-xs uppercase tracking-wider text-gray-400 font-mono text-center">
                    {key === 'mentorship' ? 'Mentoring' : key === 'publications' ? 'Research' : key}
                  </span>
                </button>
              ))}
            </div>
            
          </div>
        </motion.div>
      </div>

      {/* STATS MODAL POPUP */}
      <AnimatePresence>
        {activeStat && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ zIndex: 99999 }}
            className="fixed inset-0 flex items-center justify-center p-4 sm:p-6"
          >
            <div 
              className="absolute inset-0 bg-black/90 backdrop-blur-md cursor-pointer"
              onClick={() => setActiveStat(null)}
            ></div>
            
            <motion.div 
              initial={{ y: 50, scale: 0.95, opacity: 0 }}
              animate={{ y: 0, scale: 1, opacity: 1 }}
              exit={{ y: 20, scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="relative w-full max-w-lg bg-[#0a0a0a] border border-white/10 rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(139,0,0,0.5)] flex flex-col"
            >
              <div className="p-6 border-b border-white/10 bg-black/50 flex justify-between items-center">
                <h3 className="text-2xl font-bold text-white">{statLists[activeStat].title}</h3>
                <button 
                  onClick={() => setActiveStat(null)}
                  className="p-2 hover:bg-red-600 rounded-full transition-colors"
                >
                  <X className="w-5 h-5 text-white" />
                </button>
              </div>
              
              <div className="p-6 max-h-[60vh] overflow-y-auto">
                <ul className="space-y-3">
                  {statLists[activeStat].items.map((item, idx) => (
                    <li key={idx} className="flex gap-3 text-gray-300 font-light">
                      <span className="text-red-500 font-mono font-bold">{idx + 1}.</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
