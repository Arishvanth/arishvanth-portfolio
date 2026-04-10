import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Trophy, Medal, Award, X, ExternalLink, CalendarDays } from 'lucide-react';

const leadershipItems = [
  { title: "Technical Lead – Project Development", image: "/images/CGS Internship on site.jpeg", link: "#", detail: "Spearheaded technical architecture and mentored junior members throughout the project lifecycle." },
  { title: "Hackathon Team Lead", image: "/images/Fastest line following robot Gyan mitra team pic.jpeg", link: "#", detail: "Led multidisciplinary teams in multiple national hackathons, driving the vision and assigning core technical deliverables." },
  { title: "Project Presentation Event Lead – ECSTASY", image: "/images/ECSTASY 2026 event coordinator.jpeg", link: "#", detail: "Organized and managed the flagship project presentation event, coordinating judging panels and student participants." },
  { title: "Research Publication (AQUA-SENSE)", image: "/images/Journal Publication.jpeg", link: "#", detail: "Published comprehensive research detailing the intersection of IoT arrays and predictive algorithms in water quality monitoring." },
  { title: "IEEE Conference Presentation", image: "/images/Conference invitation pic.jpeg", link: "#", detail: "Presented IoT hardware findings at an IEEE tech conference to an audience of industry professionals." },
  { title: "Student Trainer - 3D Printing", image: "/images/3D Printing & Designing Teaching.jpeg", link: "#", detail: "Conducted hands-on training sessions for peers focusing on CAD modeling and 3D printing rapid prototyping." }
];

const podiumFinishes = [
  { title: "24 hr Hackathon – Hack Odyssey 2k25 – Second Prize", image: "/images/Smart Urban Sustainability System (SUSS) price.jpeg", link: "#" },
  { title: "Project Expo – Gyan Mitra’25 – Second Prize", image: "/images/Fastest line following robot Gyan mitra price.jpeg", link: "#" },
  { title: "Technoxian World Cup 2024 – World Robotics Championship – Semi Finals", image: "/images/TechnoXian World Cup 2024 certificate.jpeg", link: "#" }
];

const participatedEvents = [
  { title: "Tirunelveli Innovation Conclave – Pitch Fest", image: "/images/TN Conclave.jpeg", link: "#" },
  { title: "24 hr Hackathon – Codecraft’25", image: "/images/Codecraft'25 certificate.jpeg", link: "#" },
  { title: "24 hr Hackathon – HACK O’ HOLICS 5.0", image: "/images/hack o' holics 5.0.jpg", link: "#" },
  { title: "12 hr Hackathon – Aura 2025", image: "/images/Aura hackathon.jpeg", link: "#" },
  { title: "Project Expo – Techathon’24", image: "/images/Techathon'24.jpg", link: "#" },
  { title: "24 hr Hackathon – Hack Odyssey 3.0", image: "/images/hack odyssey 3.0 certificate.jpeg", link: "#" },
  { title: "Paper Presentation – Theervu’athon’24", image: "/images/Theervu'athon '24.jpg", link: "#" },
  { title: "Project Expo (Line Follower) – BIT V-PRAYUKTI’25", image: "/images/BIT V-PRAYUKTI' 25 certificate.jpg", link: "#" },
  { title: "Paper Presentation – Kalam’24", image: "/images/Kalam certificate certificate.jpg", link: "#" },
  { title: "Elecsphere Odyssey 24 hr Hackathon – Euphoria’24", image: "/images/kalasalingam Hackathon certification.jpg", link: "#" }
];

const certs = [
  { title: "Backend Development in Java", image: "/images/backend developmet in java.jpeg", link: "#" },
  { title: "PCB Designing", image: "/images/PCB designing.jpg", link: "#" },
  { title: "3D Printing Skill Training", image: "/images/3D printing skill training certificate.jpeg", link: "#" },
  { title: "Antenna Skill", image: "/images/Antenna skill certificate.jpeg", link: "#" },
  { title: "Data Analytics (NoviTech)", image: "/images/Data Analytics certificate.jpg", link: "#" },
  { title: "NPTEL IoT (Elite)", image: "/images/Introduction to Industry 4.0 and Industrial Internet of Things certificate.jpg", link: "#" },
  { title: "Machine Learning", image: "/images/Basics of Machine Learning certificate.jpg", link: "#" },
  { title: "Data Science", image: "/images/DATA SCIENCE FOUNDATIONS.jpg", link: "#" },
  { title: "Power BI", image: "/images/Power BI workshop certificate.jpg", link: "#" },
  { title: "Java OOP", image: "/images/OOPs in JAVA certificate.jpg", link: "#" },
  { title: "Digital Marketing", image: "/images/Introduction to Digital Marketing certificate.jpg", link: "#" }
];

export default function Leadership() {
  const [activeModalItem, setActiveModalItem] = useState(null);

  if (activeModalItem) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = 'auto';
  }

  const openModal = (itemProps, iconComponent) => {
    setActiveModalItem({ ...itemProps, icon: iconComponent });
  };

  const renderCard = (item, idx, IconComponent, colorClass, placeholderText, modalDescFallback, statusLabel, showLinkProp) => (
    <motion.div 
      key={idx}
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: idx * 0.05 }}
      className="p-5 rounded-xl border border-white/5 bg-[#070707] hover:border-red-500/50 hover:shadow-[0_0_15px_rgba(139,0,0,0.2)] transition-all group flex flex-col h-full shadow-lg"
    >
      <div 
        className="w-full h-40 bg-[#030303] rounded-lg mb-4 overflow-hidden relative border border-white/5 cursor-pointer flex-shrink-0" 
        onClick={() => openModal({ ...item, detail: item.detail || modalDescFallback, status: statusLabel, showLink: showLinkProp }, <IconComponent className={`w-8 h-8 ${colorClass}`} />)}
      >
        {item.image ? (
          <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
        ) : (
          <div className={`w-full h-full flex flex-col items-center justify-center text-gray-600 transition-colors ${colorClass.replace('text-', 'group-hover:text-')}`}>
            <IconComponent className="w-8 h-8 mb-2" />
            <span className="text-xs uppercase tracking-widest font-mono text-center px-4">{placeholderText}</span>
          </div>
        )}
      </div>
      <div className="mt-auto flex items-center justify-between gap-2">
        <p 
          className="font-bold text-gray-200 text-sm group-hover:text-white transition-colors line-clamp-3 cursor-pointer"
          onClick={() => openModal({ ...item, detail: item.detail || modalDescFallback, status: statusLabel, showLink: showLinkProp }, <IconComponent className={`w-8 h-8 ${colorClass}`} />)}
        >
          {item.title}
        </p>
        {showLinkProp && (
          <a 
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 bg-white/5 rounded hover:bg-red-600 hover:text-white text-gray-400 transition-colors shrink-0"
            title="Open Link"
          >
            <ExternalLink className="w-4 h-4" />
          </a>
        )}
      </div>
    </motion.div>
  );

  return (
    <section id="leadership" style={{ zIndex: activeModalItem ? 9999 : 10 }} className="py-20 px-6 relative w-full max-w-7xl mx-auto space-y-32">
      
      {/* Leadership & Research */}
      <div>
        <motion.h2 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold mb-10 flex items-center gap-3"
        >
          <BookOpen className="text-red-500 w-8 h-8" /> 
          Leadership <span className="text-gradient">& Research</span>
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {leadershipItems.map((item, idx) => renderCard(item, idx, BookOpen, "text-red-500", "Add Image", item.detail, null, false))}
        </div>
      </div>

      {/* Achievements - Split into Podium Finishes & Participated */}
      <div id="accolades" className="-mt-10 pt-10">
        <motion.h2 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold mb-10 flex items-center gap-3"
        >
          <Trophy className="text-red-500 w-8 h-8" /> 
          <span className="text-gradient">Accolades & Engagements</span>
        </motion.h2>
        
        {/* Podium Finishes */}
        <h3 className="text-2xl font-bold text-gray-300 mb-6 border-l-4 border-yellow-500 pl-3">Podium Finishes</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-16">
          {podiumFinishes.map((item, idx) => renderCard(item, idx, Trophy, "text-yellow-500", "Add Image", "Achieved an exemplary podium finish representing elite competitive success.", "Winner / Podium", true))}
        </div>

        {/* Participated Events */}
        <h3 className="text-2xl font-bold text-gray-300 mb-6 border-l-4 border-blue-500 pl-3">Hackathons & Engagements</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {participatedEvents.map((item, idx) => renderCard(item, idx, CalendarDays, "text-blue-400", "Add Image", "Actively engaged, contributed technical insights, and collaborated with peers during this event.", "Participant", true))}
        </div>
      </div>

      {/* Certifications (Upgraded to Image Boxes) */}
      <div id="certifications" className="-mt-10 pt-10">
        <motion.h2 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold mb-10 flex items-center gap-3"
        >
          <Award className="text-red-500 w-8 h-8" /> 
          Certifications
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {certs.map((item, idx) => renderCard(item, idx, Award, "text-green-400", "Add Certificate Image", `Verified proficiency and extensive knowledge in ${item.title}.`, "Certified", true))}
        </div>
      </div>

      {/* MODAL PLACED AT THE VERY BOTTOM OF THE DOM FOR Z-INDEX FIX */}
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
              className="absolute inset-0 bg-black/90 backdrop-blur-md cursor-pointer"
              onClick={() => setActiveModalItem(null)}
            ></div>
            
            <motion.div 
              initial={{ y: 50, scale: 0.95, opacity: 0 }}
              animate={{ y: 0, scale: 1, opacity: 1 }}
              exit={{ y: 20, scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="relative w-full max-w-4xl bg-zinc-950 border border-white/10 rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(139,0,0,0.5)] flex flex-col md:flex-row"
            >
              <button 
                onClick={() => setActiveModalItem(null)}
                className="absolute top-4 right-4 p-2 bg-black/50 hover:bg-red-600 rounded-full transition-colors z-50 backdrop-blur-md border border-white/10"
              >
                <X className="w-5 h-5 text-white" />
              </button>
              
              <div className="w-full md:w-1/2 bg-[#030303] relative border-b md:border-b-0 md:border-r border-white/10 min-h-[250px] md:min-h-[400px]">
                {activeModalItem.image ? (
                  <img src={activeModalItem.image} alt={activeModalItem.title} className="absolute inset-0 w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center text-gray-500 absolute inset-0">
                    <div className="w-20 h-20 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-4">
                      {activeModalItem.icon}
                    </div>
                    <span className="font-mono text-sm uppercase tracking-widest">Image Unavailable</span>
                  </div>
                )}
              </div>

              <div className="w-full md:w-1/2 p-8 md:p-10 flex flex-col justify-center bg-[#070707]">
                <div className="flex flex-wrap items-center gap-3 mb-6">
                  <div className="p-2 bg-red-900/20 text-red-500 rounded-lg border border-red-500/30">
                    {activeModalItem.icon}
                  </div>
                  {activeModalItem.status && (
                    <span className="text-xs font-mono font-bold tracking-widest uppercase text-yellow-500 bg-yellow-900/10 px-3 py-1.5 rounded-full border border-yellow-500/20">
                      {activeModalItem.status}
                    </span>
                  )}
                  {activeModalItem.title.includes("Second Prize") || activeModalItem.title.toLowerCase().includes("winner") ? (
                    <span className="text-xs font-mono font-bold tracking-widest uppercase text-green-400 bg-green-900/20 px-3 py-1.5 rounded-full border border-green-500/30">
                      Prize Secured
                    </span>
                  ) : null}
                </div>

                <h3 className="text-2xl md:text-3xl font-bold text-white mb-6 leading-tight">{activeModalItem.title}</h3>
                
                <div className="space-y-4 mb-8 flex-grow">
                  <div>
                    <span className="text-gray-500 text-xs font-semibold uppercase tracking-widest block mb-2">Event / Certification Details</span>
                    <p className="text-gray-300 font-light leading-relaxed">{activeModalItem.detail}</p>
                  </div>
                </div>
                
                {activeModalItem.showLink && (
                  <a 
                    href={activeModalItem.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex max-w-max items-center gap-2 glow-button !py-3 !px-6 disabled:opacity-50"
                  >
                    View Official Credential <ExternalLink className="w-4 h-4" />
                  </a>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
}
