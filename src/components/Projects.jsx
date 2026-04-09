import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Award, X } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import ImageCarousel from './ImageCarousel';

const featuredProjects = [
  {
    title: "Tidal Energy Powered Smart Fishnet System",
    category: "Sustainable Energy & Embedded Systems",
    problem: "Lack of sustainable fishing data collection methods taking advantage of local ocean environments.",
    solution: "Developed an IoT system powered by tidal energy to monitor and collect fishnet status and telemetry data.",
    tech: ["Embedded C", "IoT Architecture", "Sensors", "Energy Harvesting"],
    images: ["/images/Fishnet project.jpeg"],
    longDesc: "This project addresses the critical need for sustainable data collection in oceanic environments. By harnessing tidal energy, the system continuously powers onboard telemetry units and sensors, resulting in zero external energy dependency while monitoring fishnet yields."
  },
  {
    title: "Smart Urban Sustainability System (SUSS)",
    category: "IoT + AI Smart City Platform",
    problem: "Urban infrastructure lacks real-time, data-driven insight for sustainable maintenance.",
    solution: "Created an integrated dashboard and monitoring platform combining IoT sensors and AI predictive analysis. Won Hackathon Prize.",
    tech: ["ESP32", "Python", "Data Processing", "Dashboard Design"],
    images: ["/images/Smart Urban Sustainability System (SUSS).jpeg", "/images/Smart Urban Sustainability System (SUSS) price.jpeg"],
    longDesc: "Winner of multiple hackathons, SUSS utilizes edge computing with ESP32s strategically deployed in urban environments to relay environmental quality and structural telemetry, visualized through a Python-based intelligent dashboard."
  },
  {
    title: "Smart Wheelchair Monitoring System",
    category: "Healthcare + IoT",
    problem: "Limited autonomous monitoring capabilities for wheelchair users in critical situations.",
    solution: "Built a sensory-equipped wheelchair system with real-time alerts and fall-detection telemetry.",
    tech: ["Arduino", "MPU6050", "Wireless Comm", "Real-time Data"],
    images: ["/images/Cheek Gesture based wheelchair.jpeg"],
    longDesc: "Designed with an empathetic approach to healthcare, this system employs IMUs (MPU6050) and wireless communications to instantly alert caretakers of potential falls or dangerous tilt angles, offering autonomy and safety to users."
  },
  {
    title: "CarePriority – Smart Patient Prioritization",
    category: "Healthcare + IoT + AI",
    problem: "Hospitals struggle with triaging patients dynamically during high-influx situations.",
    solution: "Developed an IoT and AI-driven prioritization system that monitors patient vitals in real-time and dynamically adjusts their priority queue.",
    tech: ["Hardware Integration", "Sensors", "Data Analytics", "Dashboard"],
    images: [
      "/images/CarePriority.jpeg", 
      "/images/CarePriority old dashboard.jpeg", 
      "/images/CarePriority – Smart Patient Prioritization System working.jpeg", 
      "/images/CarePriority – Smart Patient Prioritization System hardware.jpeg"
    ],
    longDesc: "CarePriority fundamentally optimizes the hospital triage queue. By streaming live biometric data directly to an analytics dashboard, it uses vital-sign thresholds and AI analytics to autonomously shift critical cases to the top of the queue."
  }
];

const otherProjects = [
  { 
    title: "AI-Powered Receipt & Expense Intelligence", 
    category: "FinTech + AI",
    images: ["/images/Backend With Java working.jpeg", "/images/Backend With Java.jpeg"],
    problem: "Manual expense tracking is error-prone and time-consuming.",
    solution: "Designed an OCR-based system utilizing machine learning to auto-extract, categorize, and analyze expense data.",
    tech: ["Computer Vision", "OCR", "Data Analytics Workflows"],
    longDesc: "This software streamlines financial pipelines by automating the extraction of data from receipts via optical character recognition, converting unstructured visual data into a classified spending dashboard."
  },
  { 
    title: "AQUA-SENSE – Water Quality Monitoring", 
    category: "IoT + Environment",
    images: ["/images/IoT-Based Smart Environment Monitoring & Alert System hardware setup.jpeg", "/images/IoT-Based Smart Environment Monitoring & Alert System email alert.jpeg"],
    problem: "Remote water reservoirs lack instantaneous contamination detection.",
    solution: "Deployed remote monitoring units to stream real-time chemical balance and turbidity metrics.",
    tech: ["ESP32", "Sensors", "Wireless Comm"],
    longDesc: "A modular, scalable IoT installation capable of operating in remote geographies to provide uninterrupted water quality monitoring, reducing the response time to contamination events."
  },
  { 
    title: "Smart Environment Monitoring", 
    category: "IoT Systems",
    images: ["/images/Smart Enviromental monitoring system.jpeg", "/images/IoT-Based Smart Environment Monitoring & Alert System blynk setup.jpeg"],
    problem: "Lack of integrated micro-climate data for localized agriculture.",
    solution: "Created an array of ambient sensors logging temperature, humidity, and gas levels to a cloud dashboard.",
    tech: ["Arduino", "Sensors", "Cloud Sync"],
    longDesc: "Providing highly localized telemetry, this project bridges the gap between hardware sensors and cloud analytics to deliver real-time environmental alerts for proactive decision-making."
  },
  { 
    title: "CSSR Operations (SIH Project)", 
    category: "AI + Embedded Security",
    images: ["/images/Enhancing Body Detection in CSSR Operations using Advanced Technology (SIH Project) demo1.jpeg", "/images/Enhancing Body Detection in CSSR Operations using Advanced Technology (SIH Project) demo2.jpeg"],
    problem: "Inefficient casualty detection in critical search and rescue missions.",
    solution: "Developed an advanced body detection system using combined visual and thermal intelligence.",
    tech: ["Computer Vision", "Hardware Integration", "Algorithms"],
    longDesc: "A high-stakes integration of visual intelligence aimed at saving lives. By feeding raw camera telemetry through a body-detection AI model, it accelerates the mapping of human presence in chaotic environments."
  },
  { 
    title: "Fastest Line Follower Robot", 
    category: "Robotics & Hardware",
    images: [
      "/images/Fastest line following robot Gyan mitra pic.jpeg", 
      "/images/Fastest line following robot Gyan mitra price.jpeg", 
      "/images/Fastest line following robot erode.jpeg"
    ],
    problem: "Standard line followers lack deterministic optimization for high-speed routing.",
    solution: "Engineered a highly optimized PID-controlled chassis achieving top-tier racing speeds.",
    tech: ["PID Tuning", "Motor Calibration", "Embedded C"],
    longDesc: "A testament to strict hardware-software optimization. By fine-tuning a custom PID controller loop running directly on bare-metal, this robot achieves incredibly fast track-completion times."
  },
  { 
    title: "Research Publication", 
    category: "Academic",
    images: ["/images/Journal Publication.jpeg"],
    problem: "Contributions to the academic community often lack practical hardware validation.",
    solution: "Published comprehensive research detailing the intersection of IoT arrays and predictive algorithms.",
    tech: ["Documentation", "Data Synthesis", "Research"],
    longDesc: "A rigorously vetted academic contribution that formalizes my experimental findings in the scalable IoT analytics sector, pushing the boundary of documented knowledge in my university cohort."
  }
];

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState(null);

  // Lock body scroll when modal is open
  if (selectedProject) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = 'auto';
  }

  return (
    <section id="projects" className={`py-20 px-6 relative w-full max-w-7xl mx-auto ${selectedProject ? 'z-[100]' : 'z-10'}`}>
      


      {/* Patent Highlight */}
      <div className="mb-8 mt-10">
        <motion.h2 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold flex items-center gap-4"
        >
          Patent <span className="text-gradient">& Innovation</span>
          <div className="h-1 flex-grow bg-gradient-to-r from-red-900/50 to-transparent max-w-sm rounded"></div>
        </motion.h2>
      </div>
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="mb-24 relative hover:scale-[1.02] transition-transform cursor-pointer"
        onClick={() => setSelectedProject({
          title: "RFID-Based Access Control System",
          category: "Patent & Innovation",
          problem: "Traditional access control systems lack robust and scalable hardware integration.",
          solution: "A robust embedded security solution utilizing RFID-based authentication for secure, real-world access control applications.",
          tech: ["RFID", "Embedded Systems", "Security"],
          images: ["/images/Patent.jpeg"],
          longDesc: "This patent (No: 202541021013 A) outlines an innovative approach to embedded security. By tying raw RFID authentication into a highly scalable microcontroller framework, it presents a robust method for real-world access control applications and facilities management."
        })}
      >
        <div className="absolute -inset-1 bg-gradient-to-r from-red-900 via-red-500 to-red-900 rounded-2xl blur opacity-30 animate-pulse"></div>
        <div className="relative glass-card p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 border-red-500/50 group">
          <div>
            <div className="flex items-center gap-3 text-red-500 mb-2">
              <Award className="w-6 h-6" />
              <span className="font-semibold tracking-widest uppercase text-sm">Official Patent</span>
            </div>
            <h3 className="text-3xl font-bold text-white mb-2 group-hover:text-red-100 transition-colors">RFID-Based Access Control System</h3>
            <p className="text-red-400 font-mono text-sm mb-4">Patent No: 202541021013 A</p>
            <p className="text-gray-300 font-light max-w-2xl">
              A robust embedded security solution utilizing RFID-based authentication for secure, real-world access control applications.
            </p>
          </div>
          <div className="flex-shrink-0">
            <div className="w-24 h-24 overflow-hidden rounded-full border-4 border-red-900 flex items-center justify-center bg-black/50 shadow-[0_0_20px_rgba(255,26,26,0.5)] group-hover:scale-110 transition-transform">
              <img src="/images/Patent.jpeg" alt="Patent Image" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Featured Projects Header */}
      <div className="mb-16">
        <motion.h2 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold mb-4 flex items-center gap-4"
        >
          Featured <span className="text-gradient">Case Studies</span>
          <div className="h-1 flex-grow bg-gradient-to-r from-red-900/50 to-transparent max-w-sm rounded"></div>
        </motion.h2>
      </div>

      {/* Featured Projects Grid */}
      <div className="space-y-16 mb-24">
        {featuredProjects.map((project, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className={`flex flex-col ${idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-8 items-center group cursor-pointer bg-[#070707] p-6 md:p-8 rounded-3xl border border-white/5 shadow-xl hover:border-red-500/30 transition-all`}
            onClick={() => setSelectedProject(project)}
          >
            {/* Project Image */}
            <div className="w-full md:w-1/2 relative overflow-hidden rounded-xl aspect-video border border-white/10 group-hover:border-red-500/50 transition-colors shadow-lg">
              <div className="absolute inset-0 bg-red-900/20 group-hover:bg-transparent transition-colors z-10 mix-blend-overlay pointer-events-none"></div>
              {/* Carousel logic internally handles rendering */}
              <ImageCarousel images={project.images} />
            </div>

            {/* Project Details */}
            <div className="w-full md:w-1/2 space-y-4">
              <p className="text-red-500 font-mono text-sm tracking-wider uppercase">{project.category}</p>
              <h3 className="text-3xl font-bold text-white group-hover:text-red-100 transition-colors">{project.title}</h3>
              
              <div className="glass-card p-6 !border-white/5 relative z-20 -mx-4 md:mx-0 shadow-2xl space-y-3 pointer-events-none">
                <div>
                  <span className="text-gray-400 text-sm font-semibold uppercase">Problem</span>
                  <p className="text-gray-300 font-light text-sm line-clamp-2">{project.problem}</p>
                </div>
                <div>
                  <span className="text-green-500/80 text-sm font-semibold uppercase">Solution</span>
                  <p className="text-gray-300 font-light text-sm line-clamp-2">{project.solution}</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 pt-2">
                {project.tech.map((t, i) => (
                  <span key={i} className="text-xs font-mono text-gray-400 bg-white/5 px-3 py-1 rounded-full border border-white/10">
                    {t}
                  </span>
                ))}
              </div>

              <div className="flex gap-4 pt-4">
                <button 
                  className="flex items-center gap-2 text-sm font-semibold text-gray-300 group-hover:text-red-500 transition-colors"
                >
                  <ExternalLink className="w-4 h-4" /> Read Case Study
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Other Projects Grid */}
      <div className="mb-16">
        <motion.h3 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-2xl font-bold text-white mb-8 border-l-4 border-red-500 pl-4"
        >
          Other Notable Work
        </motion.h3>
        {/* CHANGED TO 2 COLUMNS PRECISELY AS REQUESTED */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {otherProjects.map((project, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -5 }}
              onClick={() => setSelectedProject(project)}
              className="bg-[#070707] border border-white/10 p-6 rounded-2xl hover:border-red-500/50 hover:shadow-[0_0_20px_rgba(139,0,0,0.2)] transition-all cursor-pointer group flex flex-col gap-4 shadow-xl"
            >
              {/* Image Carousel integrated right into the card! */}
              <div className="w-full aspect-video overflow-hidden rounded-xl border border-white/5 relative bg-zinc-900">
                <div className="absolute inset-0 bg-red-900/10 group-hover:bg-transparent transition-colors z-10 pointer-events-none mix-blend-overlay"></div>
                <ImageCarousel images={project.images} />
              </div>
              
              <div className="space-y-2 flex-grow">
                <p className="text-red-400 font-mono text-xs uppercase tracking-widest">{project.category}</p>
                <h4 className="font-bold text-xl text-gray-100 group-hover:text-white transition-colors">{project.title}</h4>
                <p className="text-gray-400 font-light text-sm line-clamp-2">{project.problem}</p>
              </div>
              
              <div className="flex flex-wrap gap-2 pt-2">
                {project.tech.map((t, i) => (
                  <span key={i} className="text-[10px] font-mono text-gray-400 bg-white/5 px-2 py-1 rounded border border-white/10">
                    {t}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* MODAL PLACED AT THE BOTTOM FOR Z-INDEX FIX */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ zIndex: 99999 }}
            className="fixed inset-0 flex items-center justify-center p-4 sm:p-6"
          >
            <div 
              className="absolute inset-0 bg-black/90 backdrop-blur-md cursor-pointer"
              onClick={() => setSelectedProject(null)}
            ></div>
            
            <motion.div 
              initial={{ y: 50, scale: 0.95, opacity: 0 }}
              animate={{ y: 0, scale: 1, opacity: 1 }}
              exit={{ y: 20, scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="relative w-full max-w-4xl bg-[#0a0a0a] border border-white/10 rounded-2xl overflow-y-auto max-h-[90vh] shadow-[0_0_50px_rgba(139,0,0,0.5)] flex flex-col md:flex-row"
            >
              <button 
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 z-50 p-2 bg-black/50 hover:bg-red-600 rounded-full transition-colors backdrop-blur-md"
              >
                <X className="w-5 h-5 text-white" />
              </button>
              
              <div className="w-full md:w-1/2 bg-black relative border-b md:border-b-0 md:border-r border-white/10 min-h-[300px]">
                {selectedProject.images && selectedProject.images.length > 0 ? (
                  <div className="absolute inset-0">
                    <ImageCarousel images={selectedProject.images} />
                  </div>
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-gray-600 font-mono">No Image Provided</span>
                  </div>
                )}
              </div>

              <div className="w-full md:w-1/2 p-8 md:p-10 space-y-6 flex flex-col justify-center">
                <div>
                  <p className="text-red-500 font-mono text-sm tracking-wider uppercase mb-2">{selectedProject.category}</p>
                  <h3 className="text-3xl font-bold text-white leading-tight">{selectedProject.title}</h3>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <span className="text-gray-400 text-sm font-semibold uppercase block mb-1">Problem</span>
                    <p className="text-gray-300 font-light text-sm">{selectedProject.problem}</p>
                  </div>
                  <div>
                    <span className="text-green-500/80 text-sm font-semibold uppercase block mb-1">Solution</span>
                    <p className="text-gray-300 font-light text-sm">{selectedProject.solution}</p>
                  </div>
                </div>

                <div className="pt-4 border-t border-white/10">
                  <span className="text-white text-sm font-semibold uppercase block mb-3">Full Details</span>
                  <p className="text-gray-400 font-light text-sm leading-relaxed">
                    {selectedProject.longDesc || "Detailed description is being updated. This project showcases deep technical integration and core engineering concepts solved progressively."}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2 pt-2">
                  {selectedProject.tech && selectedProject.tech.map((t, i) => (
                    <span key={i} className="text-[10px] font-mono text-gray-400 bg-white/5 px-2 py-1 rounded border border-white/10">
                      {t}
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
