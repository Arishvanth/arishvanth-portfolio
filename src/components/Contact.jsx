import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { FaGithub, FaLinkedin, FaInstagram } from 'react-icons/fa';
import { useState } from 'react';

export default function Contact() {
  const [formStatus, setFormStatus] = useState('idle');

  // FormSubmit handles submission natively, so we simply manage button states.
  const handleSubmit = (e) => {
    // FormSubmit intercept: We let the native HTML form submit to the endpoint.
    // To prevent the page looking frozen while redirecting, we just give feedback:
    setFormStatus('submitting');
  };

  return (
    <section id="contact" className="py-20 px-6 relative w-full max-w-5xl mx-auto border-t border-white/5 mt-20 z-10">
      
      <div className="text-center mb-16">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold mb-4"
        >
          Initialize <span className="text-gradient">Contact</span>
        </motion.h2>
        <p className="text-gray-400 font-light">Open for opportunities, collaborations, and architectural discussions.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-stretch">
        {/* Contact Info */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="h-full"
        >
          <div className="glass-card p-8 flex flex-col h-full">
            <h3 className="text-2xl font-bold text-white mb-6">Connect with me</h3>
            
            <div className="space-y-6 flex-grow">
              <a href="mailto:arishvanth.10@gmail.com" className="flex items-center gap-4 text-gray-300 hover:text-red-400 transition-colors group">
                <div className="p-3 bg-white/5 rounded-lg group-hover:bg-red-900/20 group-hover:border-red-500/50 border border-transparent transition-all">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-widest">Email</p>
                  <p className="font-mono text-sm sm:text-base">arishvanth.10@gmail.com</p>
                </div>
              </a>
              
              <a href="tel:+918825802190" className="flex items-center gap-4 text-gray-300 hover:text-red-400 transition-colors group">
                <div className="p-3 bg-white/5 rounded-lg group-hover:bg-red-900/20 group-hover:border-red-500/50 border border-transparent transition-all">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-widest">Phone</p>
                  <p className="font-mono text-sm sm:text-base">+91 8825802190</p>
                </div>
              </a>
              
              <div className="flex items-center gap-4 text-gray-300 group">
                <div className="p-3 bg-white/5 rounded-lg">
                  <MapPin className="w-5 h-5 text-gray-400" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-widest">Location</p>
                  <p className="font-mono text-sm sm:text-base">Tirunelveli, Tamil Nadu, India</p>
                </div>
              </div>
            </div>

            {/* Socials Section */}
            <div className="pt-8 mt-8 border-t border-white/10">
              <p className="text-xs text-gray-500 uppercase tracking-widest mb-4 font-semibold">Socials</p>
              <div className="flex gap-4">
                <a href="https://www.linkedin.com/in/arishvanth" target="_blank" rel="noopener noreferrer" className="p-3 bg-white/5 rounded-lg hover:bg-blue-600/20 hover:border-blue-500/50 border border-transparent transition-all group flex items-center gap-3">
                  <FaLinkedin className="w-5 h-5 text-gray-400 group-hover:text-blue-500" />
                  <span className="text-sm font-mono text-gray-400 group-hover:text-blue-400 w-hidden md:inline">LinkedIn</span>
                </a>
                <a href="https://github.com/Arishvanth" target="_blank" rel="noopener noreferrer" className="p-3 bg-white/5 rounded-lg hover:bg-gray-600/20 hover:border-gray-500/50 border border-transparent transition-all group flex items-center gap-3">
                  <FaGithub className="w-5 h-5 text-gray-400 group-hover:text-white" />
                  <span className="text-sm font-mono text-gray-400 group-hover:text-white w-hidden md:inline">GitHub</span>
                </a>
                <a href="https://www.instagram.com/__the_gt_chad__" target="_blank" rel="noopener noreferrer" className="p-3 bg-white/5 rounded-lg hover:bg-pink-600/20 hover:border-pink-500/50 border border-transparent transition-all group flex items-center gap-3">
                  <FaInstagram className="w-5 h-5 text-gray-400 group-hover:text-pink-500" />
                  <span className="text-sm font-mono text-gray-400 group-hover:text-pink-400 w-hidden md:inline">Instagram</span>
                </a>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Contact Form */}
        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="h-full"
        >
          <form 
            action="https://formsubmit.co/arishvanth.10@gmail.com" 
            method="POST" 
            onSubmit={handleSubmit} 
            className="glass-card p-8 flex flex-col h-full gap-5"
          >
            {/* FormSubmit Configuration */}
            <input type="hidden" name="_subject" value="New Portfolio Transmission!" />
            <input type="hidden" name="_captcha" value="false" />
            <input type="hidden" name="_template" value="table" />
            
            <div>
              <label htmlFor="name" className="block text-xs font-mono text-gray-400 mb-2 uppercase">Identity</label>
              <input 
                type="text" 
                id="name" 
                name="name"
                required
                className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-red-500 transition-colors font-light"
                placeholder="Name"
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-xs font-mono text-gray-400 mb-2 uppercase">Comm Link (Email)</label>
              <input 
                type="email" 
                id="email"
                name="email"
                required 
                className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-red-500 transition-colors font-light"
                placeholder="Email Address"
              />
            </div>
            
            <div className="flex-grow flex flex-col">
              <label htmlFor="message" className="block text-xs font-mono text-gray-400 mb-2 uppercase">Transmissions</label>
              <textarea 
                id="message" 
                name="message"
                required
                className="w-full h-full min-h-[120px] bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-red-500 transition-colors font-light resize-none"
                placeholder="Your message..."
              ></textarea>
            </div>
            
            <button 
              type="submit" 
              disabled={formStatus === 'submitting' || formStatus === 'success'}
              className="glow-button w-full flex items-center justify-center gap-2 mt-4 disabled:opacity-50"
            >
              {formStatus === 'idle' && <><Send className="w-4 h-4" /> Transmit Signal</>}
              {formStatus === 'submitting' && 'Transmitting...'}
              {formStatus === 'success' && 'Transmission Successful'}
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
