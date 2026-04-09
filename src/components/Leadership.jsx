import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Trophy, Medal, Award, X, ExternalLink, CalendarDays } from 'lucide-react';

const leadershipItems = [
  { title: "Technical Lead – Project Development", image: "", link: "#", detail: "Spearheaded technical architecture and mentored junior members throughout the project lifecycle." },
  { title: "Hackathon Team Lead", image: "", link: "#", detail: "Led multidisciplinary teams in multiple national hackathons, driving the vision and assigning core technical deliverables." },
  { title: "Project Presentation Event Lead – ECSTASY", image: "", link: "#", detail: "Organized and managed the flagship project presentation event, coordinating judging panels and student participants." },
  { title: "Research Publication (AQUA-SENSE)", image: "", link: "#", detail: "Published comprehensive research detailing the intersection of IoT arrays and predictive algorithms in water quality monitoring." },
  { title: "IEEE Conference Presentation", image: "", link: "#", detail: "Presented IoT hardware findings at an IEEE tech conference to an audience of industry professionals." },
  { title: "Student Trainer - 3D Printing & Designing", image: "", link: "#", detail: "Conducted hands-on training sessions for peers focusing on CAD modeling and 3D printing rapid prototyping." }
];

const podiumFinishes = [
  { title: "Winner – Tirunelveli Innovation Conclave", image: "", link: "#" },
  { title: "2nd Prize – Hack Odyssey 2k25", image: "", link: "#" },
  { title: "2nd Prize – Gyan Mitra’25", image: "", link: "#" },
  { title: "Technoxian World Robotics Championship – Semi-Finalist", image: "", link: "#" }
];

const participatedEvents = [
  { title: "National Level Tech Symposium", image: "", link: "#" },
  { title: "State Level Hackathon", image: "", link: "#" },
  { title: "Robotics Workshop", image: "", link: "#" },
  { title: "AI & IoT Expo", image: "", link: "#" }
];

const certs = [
  { title: "Data Analytics (NoviTech)", image: "", link: "#" },
  { title: "NPTEL IoT (Elite)", image: "", link: "#" },
  { title: "Machine Learning", image: "", link: "#" },
  { title: "Data Science", image: "", link: "#" },
  { title: "Power BI", image: "", link: "#" },
  { title: "Java OOP", image: "", link: "#" },
  { title: "Backend Development in Java", image: "", link: "#" },
  { title: "Digital Marketing", image: "", link: "#" },
  { title: "PCB Designing", image: "", link: "#" }
];

export default function Leadership() {
  const [activeModalItem, setActiveModalItem] = useState(null);

  if (activeModalItem) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = 'auto';
  }

  const openModal = (title, description, icon) => {
    setActiveModalItem({ title, description, icon });
  };

  const renderCard = (item, idx, IconComponent, colorClass, placeholderText, modalDescFallback) => (
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
        onClick={() => openModal(item.title, item.detail || modalDescFallback, <IconComponent className={`w-8 h-8 ${colorClass}`} />)}
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
          onClick={() => openModal(item.title, item.detail || modalDescFallback, <IconComponent className={`w-8 h-8 ${colorClass}`} />)}
        >
          {item.title}
        </p>
        <a 
          href={item.link}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 bg-white/5 rounded hover:bg-red-600 hover:text-white text-gray-400 transition-colors shrink-0"
          title="Open Link"
        >
          <ExternalLink className="w-4 h-4" />
        </a>
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
          {leadershipItems.map((item, idx) => renderCard(item, idx, BookOpen, "text-red-500", "Add Image", item.detail))}
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
          {podiumFinishes.map((item, idx) => renderCard(item, idx, Trophy, "text-yellow-500", "Add Image", "Achieved an exemplary podium finish representing elite competitive success."))}
        </div>

        {/* Participated Events */}
        <h3 className="text-2xl font-bold text-gray-300 mb-6 border-l-4 border-blue-500 pl-3">Hackathons & Engagements</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {participatedEvents.map((item, idx) => renderCard(item, idx, CalendarDays, "text-blue-400", "Add Image", "Actively engaged, contributed technical insights, and collaborated with peers during this event."))}
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
          {certs.map((item, idx) => renderCard(item, idx, Award, "text-green-400", "Add Certificate Image", `Verified proficiency and extensive knowledge in ${item.title}.`))}
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
              className="relative w-full max-w-lg bg-zinc-950 border border-white/10 rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(139,0,0,0.5)] p-8 text-center"
            >
              <button 
                onClick={() => setActiveModalItem(null)}
                className="absolute top-4 right-4 p-2 bg-white/5 hover:bg-red-600 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-white" />
              </button>
              
              <div className="w-16 h-16 rounded-full bg-red-900/20 border border-red-500/50 flex items-center justify-center mx-auto mb-6 shadow-[0_0_15px_rgba(255,26,26,0.3)]">
                {activeModalItem.icon}
              </div>
              
              <h3 className="text-2xl font-bold text-white mb-4">{activeModalItem.title}</h3>
              <p className="text-gray-300 font-light leading-relaxed">{activeModalItem.description}</p>
              
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
}
