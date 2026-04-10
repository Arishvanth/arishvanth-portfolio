import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Award, X, Lightbulb, Rocket, FolderOpen } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import ImageCarousel from './ImageCarousel';

const featuredProjects = [
  {
    title: "Tidal Energy Powered Smart Fishnet",
    category: "Sustainable Energy",
    images: ["/images/Fishnet project.jpeg"],
    problem: "Overfishing & bycatch issues, High fuel cost for fishermen, Lack of sustainable energy.",
    solution: "Smart fishnet with LED-based fish attraction and Tidal energy generation.",
    tech: ["Embedded C", "IoT Architecture", "Sensors", "Energy Harvesting"],
    longDesc: "A dual-purpose system combining sustainable fishing and renewable energy generation. The fishnet attracts target species while generating electricity from ocean tides, reducing environmental impact and operational cost."
  },
  {
    title: "Smart Urban Sustainability System (SUSS)",
    category: "IoT + AI Smart City",
    images: ["/images/Smart Urban Sustainability System (SUSS).jpeg", "/images/Smart Urban Sustainability System (SUSS) price.jpeg"],
    problem: "Urban areas face issues like traffic congestion, pollution, inefficient waste management, and energy wastage.",
    solution: "An integrated IoT + AI smart city system managing waste, traffic, air quality, lighting, water, and parking.",
    tech: ["ESP32", "Python", "Data Processing", "Dashboard Design"],
    longDesc: "SUSS is a multi-module smart city platform that uses IoT sensors and AI algorithms to optimize urban systems. It improves efficiency, reduces environmental impact, and enhances the quality of life in cities."
  },
  {
    title: "CarePriority – Smart Patient Prioritization System",
    category: "Healthcare + IoT + AI",
    images: [
      "/images/CarePriority.jpeg", 
      "/images/CarePriority old dashboard.jpeg", 
      "/images/CarePriority – Smart Patient Prioritization System working.jpeg", 
      "/images/CarePriority – Smart Patient Prioritization System hardware.jpeg",
      "/images/CarePriority – Smart Patient Prioritization System hardware1.jpeg"
    ],
    problem: "Hospitals follow first-come-first-serve, risking delays for critical patients.",
    solution: "A system that prioritizes patients based on vital signs and severity analysis.",
    tech: ["Hardware Integration", "Sensors", "Data Analytics", "Dashboard"],
    longDesc: "CarePriority is a healthcare system that evaluates patient conditions using real-time data and assigns priority levels. It improves emergency response and ensures critical cases receive immediate attention."
  },
  { 
    title: "AI-Powered Indian Bovine Breed Classifier", 
    category: "Computer Vision & ML",
    images: [],
    problem: "Manual cattle breed identification is time-consuming and error-prone.",
    solution: "Use deep learning + computer vision for automatic classification.",
    tech: ["Machine Learning", "Image Processing", "Classification"],
    longDesc: "A machine learning-based system that classifies Indian cattle breeds using image inputs. It enhances accuracy and supports agricultural management through automated breed identification."
  }
];

const otherProjects = [
  {
    title: "Enhancing Body Detection in CSSR Operations",
    category: "AI + Embedded Security",
    images: ["/images/Enhancing Body Detection in CSSR Operations using Advanced Technology (SIH Project) demo1.jpeg", "/images/Enhancing Body Detection in CSSR Operations using Advanced Technology (SIH Project) demo2.jpeg"],
    problem: "Rescue teams struggle to detect survivors in disaster zones due to low visibility, debris, and time constraints.",
    solution: "Use thermal drones + AI to detect human presence and prioritize rescue operations.",
    tech: ["Computer Vision", "Thermal AI", "Hardware Setup"],
    longDesc: "A smart disaster response system that integrates thermal imaging and AI to identify human heat signatures in real time. The system differentiates between live and non-live bodies, enabling faster and safer rescue operations."
  },
  { 
    title: "Cheek Gesture-Controlled Wheelchair System", 
    category: "Healthcare + Assistive AI",
    images: ["/images/Cheek Gesture based wheelchair.jpeg"],
    problem: "Paralysed individuals cannot use traditional wheelchair controls.",
    solution: "Control wheelchair using cheek/facial gestures.",
    tech: ["Gesture Recognition", "Hardware Integ", "Wireless Comm"],
    longDesc: "This assistive system uses sensors to detect facial movements and convert them into navigation commands, enabling hands-free mobility for individuals with severe physical limitations."
  },
  { 
    title: "Cheek Gesture-Based Health Monitoring Wheelchair", 
    category: "Healthcare + Embedded IoT",
    images: [],
    problem: "Wheelchairs lack health monitoring and emergency alert systems.",
    solution: "Combine gesture control + real-time health monitoring.",
    tech: ["Sensors", "IoT Data", "Alert Algorithms", "Microcontroller"],
    longDesc: "An advanced wheelchair system integrating movement control with health sensors. It monitors vital parameters and triggers alerts emergencies, improving safety for elderly and paralysed users."
  },
  { 
    title: "Crop Health Detection System", 
    category: "Smart Agriculture",
    images: [],
    problem: "Farmers struggle to detect diseases early, leading to crop loss.",
    solution: "Use image processing and ML to detect plant diseases.",
    tech: ["Image Processing", "ML", "Edge Compute", "Vision"],
    longDesc: "A smart agriculture system that analyzes leaf images to identify diseases at early stages. It helps farmers take timely action and improve crop yield."
  },
  { 
    title: "Smart Environment Monitoring System", 
    category: "IoT Systems",
    images: ["/images/Smart Enviromental monitoring system.jpeg", "/images/IoT-Based Smart Environment Monitoring & Alert System blynk setup.jpeg"],
    problem: "Environmental conditions are not monitored continuously, leading to pollution risks and unsafe conditions.",
    solution: "Use IoT sensors to monitor and alert in real time.",
    tech: ["Arduino", "Sensors", "Cloud Sync", "Data Logging"],
    longDesc: "An IoT-based system that tracks environmental parameters like temperature, humidity, and air quality. It provides real-time alerts and supports data-driven environmental monitoring."
  },
  { 
    title: "High-Speed Line Follower Robot", 
    category: "Robotics",
    images: [
      "/images/Fastest line following robot Gyan mitra pic.jpeg", 
      "/images/Fastest line following robot Gyan mitra price.jpeg", 
      "/images/Fastest line following robot erode.jpeg"
    ],
    problem: "Traditional robots lack speed and efficiency in path tracking.",
    solution: "Develop a high-speed, optimized line-following robot.",
    tech: ["PID Tuning", "Motor Calibration", "Embedded C"],
    longDesc: "A fast autonomous robot that uses sensor feedback and control algorithms to follow paths accurately at high speeds, improving efficiency in robotic navigation tasks."
  },
  { 
    title: "AQUA-SENSE: Water Quality & Disease Alert System", 
    category: "IoT + Public Health",
    images: ["/images/IoT-Based Smart Environment Monitoring & Alert System hardware setup.jpeg", "/images/IoT-Based Smart Environment Monitoring & Alert System email alert.jpeg"],
    problem: "Unsafe water leads to waterborne diseases and health risks.",
    solution: "Monitor water quality and provide early alerts using IoT.",
    tech: ["ESP32", "Hardware Integration", "Algorithms"],
    longDesc: "AQUA-SENSE is an IoT-driven system that monitors water parameters like pH and turbidity. It predicts potential health risks and alerts users, ensuring safe water consumption."
  },
  { 
    title: "Low-Voltage Line Breakage Detection System", 
    category: "Hardware Grid Security",
    images: [],
    problem: "Electrical faults go unnoticed, causing power loss and safety hazards.",
    solution: "Detect voltage drops and trigger instant alerts.",
    tech: ["Grid Sensors", "Signal Analysys", "Telemetry"],
    longDesc: "A safety system that continuously monitors electrical lines and detects breakages or faults. It enhances reliability and prevents accidents in power systems."
  },
  { 
    title: "AI-Powered Receipt Management Platform", 
    category: "FinTech + AI",
    images: ["/images/Backend With Java working.jpeg", "/images/Backend With Java.jpeg", "/images/Backend With Java1.jpeg"],
    problem: "Manual expense tracking is time-consuming and inaccurate.",
    solution: "Use AI to extract and analyze receipt data automatically.",
    tech: ["Computer Vision", "OCR", "Data Analytics Workflows"],
    longDesc: "A fintech platform that uses OCR and AI to extract data from receipts, categorize expenses, and provide financial insights. It simplifies expense tracking and improves financial awareness."
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
    <section id="projects" className={`py-20 px-6 lg:px-12 xl:px-20 relative w-full max-w-7xl mx-auto ${selectedProject ? 'z-[100]' : 'z-10'}`}>
      


      {/* Patent & Publications Highlight */}
      <div className="mb-8 mt-10">
        <motion.h2 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold flex items-center gap-4"
        >
          <Lightbulb className="text-red-500 w-10 h-10" />
          <span>Patent <span className="text-gradient">and Journal Publications</span></span>
          <div className="h-1 flex-grow bg-gradient-to-r from-red-900/50 to-transparent max-w-sm rounded hidden md:block"></div>
        </motion.h2>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-24">
        {/* Patent Card */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative hover:scale-[1.02] transition-transform cursor-pointer h-full"
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
          <div className="relative glass-card p-8 flex flex-col items-center text-center gap-6 border-red-500/50 group h-full justify-center">
            <div className="w-24 h-24 overflow-hidden rounded-full border-4 border-red-900 flex items-center justify-center bg-black/50 shadow-[0_0_20px_rgba(255,26,26,0.5)] group-hover:scale-110 transition-transform">
              <img src="/images/Patent.jpeg" alt="Patent Image" className="w-full h-full object-cover" />
            </div>
            <div>
              <div className="flex items-center justify-center gap-3 text-red-500 mb-2">
                <Award className="w-6 h-6" />
                <span className="font-semibold tracking-widest uppercase text-sm">Official Patent</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-red-100 transition-colors">RFID-Based Access Control System</h3>
              <p className="text-red-400 font-mono text-sm mb-4">Patent No: 202541021013 A</p>
              <p className="text-gray-300 font-light text-sm">
                A robust embedded security solution utilizing RFID-based authentication for secure, real-world access control applications.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Journal Publication Card */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="relative hover:scale-[1.02] transition-transform cursor-pointer h-full"
          onClick={() => setSelectedProject({
            title: "AQUA-SENSE Water Quality Monitoring",
            category: "Academic Journal",
            problem: "Contributions to the academic community often lack practical hardware validation.",
            solution: "Published comprehensive research detailing the intersection of IoT arrays and predictive algorithms.",
            tech: ["Documentation", "Data Synthesis", "Research"],
            images: ["/images/Journal Publication.jpeg"],
            longDesc: "A rigorously vetted academic contribution that formalizes my experimental findings in the scalable IoT analytics sector, pushing the boundary of documented knowledge in my university cohort."
          })}
        >
          <div className="absolute -inset-1 bg-gradient-to-r from-red-900 via-red-500 to-red-900 rounded-2xl blur opacity-30 animate-pulse"></div>
          <div className="relative glass-card p-8 flex flex-col items-center text-center gap-6 border-red-500/50 group h-full justify-center">
            <div className="w-24 h-24 overflow-hidden rounded-full border-4 border-red-900 flex items-center justify-center bg-black/50 shadow-[0_0_20px_rgba(255,26,26,0.5)] group-hover:scale-110 transition-transform">
              <img src="/images/Journal Publication.jpeg" alt="Journal Image" className="w-full h-full object-cover" />
            </div>
            <div>
              <div className="flex items-center justify-center gap-3 text-red-500 mb-2">
                <Award className="w-6 h-6" />
                <span className="font-semibold tracking-widest uppercase text-sm">Journal Publication</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-red-100 transition-colors">AQUA-SENSE Water Quality Monitoring</h3>
              <p className="text-red-400 font-mono text-sm mb-4">Academic Research Analysis</p>
              <p className="text-gray-300 font-light text-sm">
                Published comprehensive research detailing the intersection of IoT arrays and predictive algorithms in water quality monitoring.
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Featured Projects Header */}
      <div className="mb-16">
        <motion.h2 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold mb-4 flex items-center gap-4"
        >
          <Rocket className="text-red-500 w-10 h-10" />
          <span>Featured <span className="text-gradient">Case Studies</span></span>
          <div className="h-1 flex-grow bg-gradient-to-r from-red-900/50 to-transparent max-w-sm rounded hidden md:block"></div>
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
          className="text-2xl font-bold text-white mb-8 border-l-4 border-red-500 pl-4 flex items-center gap-3"
        >
          <FolderOpen className="text-red-500 w-6 h-6" />
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
