import { motion } from 'framer-motion';
import { Briefcase, Trophy, Medal, BookOpen, Award } from 'lucide-react';

const experiences = [
  {
    role: "Renewable Energy Support",
    company: "CGS Green Sustainergy Pvt. Ltd.",
    date: "Dec 2025 – Jan 2026",
    desc: "Field operations, solar systems diagnostics, and client interactions bridging sustainable energy and tech."
  },
  {
    role: "eCommerce & Data Developer",
    company: "Loomkaari Studio",
    date: "Dec 2024 – Present",
    desc: "Spearheading Shopify optimization, product metadata structuring, SEO strategies, and pricing data systems."
  }
];

const leadership = [
  "Technical Lead – Project Development",
  "Hackathon Team Lead",
  "Project Presentation Event Lead – ECSTASY",
  "Research Publication (AQUA-SENSE)",
  "IEEE Conference Presentation",
  "Student Trainer - 3D Printing & Designing"
];

const achievements = [
  "Winner – Tirunelveli Innovation Conclave",
  "2nd Prize – Hack Odyssey 2k25",
  "2nd Prize – Gyan Mitra’25",
  "Technoxian World Robotics Championship – Semi-Finalist"
];

const certs = [
  "Data Analytics (NoviTech)", "NPTEL IoT (Elite)", "Machine Learning", 
  "Data Science", "Power BI", "Java OOP", 
  "Backend Development in Java", "Digital Marketing", "PCB Designing"
];

export default function Certifications() {
  return (
    <section id="experience" className="py-20 px-6 relative z-10 w-full max-w-7xl mx-auto space-y-32">
      
      {/* Experience & Internships */}
      <div>
        <motion.h2 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold mb-10 flex items-center gap-3"
        >
          <Briefcase className="text-red-500 w-8 h-8" /> 
          Work <span className="text-gradient">& Experience</span>
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-6 relative border-l border-white/10 pl-6 ml-3">
            {experiences.map((exp, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="relative"
              >
                <div className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full bg-red-600 shadow-[0_0_10px_#ff1a1a]"></div>
                <h3 className="text-xl font-bold text-white">{exp.role}</h3>
                <p className="text-red-400 font-mono text-xs mb-2">{exp.company} | {exp.date}</p>
                <p className="text-gray-400 font-light text-sm">{exp.desc}</p>
              </motion.div>
            ))}
          </div>

          <div className="glass-card p-6 border-white/5 space-y-4">
            <h3 className="text-xl font-bold text-gray-200 mb-4 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-red-500" /> Leadership & Research
            </h3>
            <ul className="space-y-3">
              {leadership.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2 text-sm text-gray-300 font-light">
                  <span className="text-red-500 mt-0.5">▹</span> {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Achievements */}
      <div>
        <motion.h2 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold mb-10 flex items-center gap-3"
        >
          <Trophy className="text-red-500 w-8 h-8" /> 
          <span className="text-gradient">Achievements</span>
        </motion.h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {achievements.map((ach, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className={`p-6 rounded-xl border ${idx === 3 ? 'border-red-500/50 bg-red-900/10 shadow-[0_0_15px_rgba(139,0,0,0.3)]' : 'border-white/5 bg-zinc-900/40'} relative group`}
            >
              <Medal className={`w-6 h-6 mb-3 ${idx === 3 ? 'text-red-400' : 'text-gray-500 group-hover:text-red-400'} transition-colors`} />
              <p className="font-medium text-gray-200 text-sm">{ach}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* CertificationsGrid */}
      <div>
        <motion.h2 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold mb-10 flex items-center gap-3"
        >
          <Award className="text-red-500 w-8 h-8" /> 
          Certifications
        </motion.h2>

        <div className="flex flex-wrap gap-3">
          {certs.map((cert, idx) => (
            <motion.span 
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
              className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm text-gray-300 hover:bg-red-900/20 hover:border-red-500/50 hover:text-white transition-all cursor-default"
            >
              {cert}
            </motion.span>
          ))}
        </div>
      </div>

    </section>
  );
}
