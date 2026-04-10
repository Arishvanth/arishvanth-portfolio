import { Mail, PhoneCall } from 'lucide-react';
import { FaGithub, FaLinkedin, FaInstagram } from 'react-icons/fa';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full relative z-10 border-t border-white/5 bg-black/80 backdrop-blur-xl mt-32">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 md:px-12 2xl:px-0 py-12 flex flex-col md:flex-row justify-between items-center gap-8">
        
        <div className="flex flex-col items-center md:items-start">
          <span className="text-2xl font-bold tracking-widest uppercase mb-2">
            Arishvanth <span className="text-red-500">.</span>
          </span>
          <p className="text-gray-500 text-sm font-mono tracking-widest">EMBEDDED SYSTEMS / IOT / AI</p>
        </div>

        <div className="flex gap-6">
          <a href="https://github.com/Arishvanth" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-white hover:scale-110 transition-all p-2 bg-white/5 rounded-full hover:bg-white/10 hover:shadow-[0_0_10px_rgba(255,26,26,0.3)]">
            <FaGithub className="w-5 h-5" />
          </a>
          <a href="https://www.linkedin.com/in/arishvanth" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-[rgb(10,102,194)] hover:scale-110 transition-all p-2 bg-white/5 rounded-full hover:bg-white/10">
            <FaLinkedin className="w-5 h-5" />
          </a>
          <a href="https://www.instagram.com/__the_gt_chad__" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-pink-500 hover:scale-110 transition-all p-2 bg-white/5 rounded-full hover:bg-white/10">
            <FaInstagram className="w-5 h-5" />
          </a>
          <a href="mailto:arishvanth.10@gmail.com" className="text-gray-400 hover:text-red-500 hover:scale-110 transition-all p-2 bg-white/5 rounded-full hover:bg-white/10 hover:shadow-[0_0_10px_rgba(255,26,26,0.3)]">
            <Mail className="w-5 h-5" />
          </a>
          <a href="tel:+918825802190" className="text-gray-400 hover:text-green-500 hover:scale-110 transition-all p-2 bg-white/5 rounded-full hover:bg-white/10">
            <PhoneCall className="w-5 h-5" />
          </a>
        </div>

      </div>
      
      <div className="w-full border-t border-white/5 py-6 text-center bg-black">
        <p className="text-gray-600 text-xs font-mono">
          &copy; {currentYear} ARISHVANTH SRIGANESH M N. ALL RIGHTS RESERVED.
        </p>
      </div>
    </footer>
  );
}
