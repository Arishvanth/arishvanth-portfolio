import { motion } from 'framer-motion';

export default function HeroIntro() {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
      transition={{ duration: 1.2, ease: "easeInOut" }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black overflow-hidden"
    >
      {/* Background Glow */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.5, 0] }}
        transition={{ duration: 3, ease: "easeInOut" }}
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--color-dragon-red)_0%,_transparent_50%)] opacity-30 mix-blend-screen"
      ></motion.div>

      {/* Cinematic Text Reveal */}
      <motion.div
        initial={{ opacity: 0, y: 50, filter: "blur(10px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }}
        className="relative z-10 text-center"
      >
        <h1 className="text-4xl md:text-7xl font-bold tracking-[0.2em] text-white uppercase drop-shadow-[0_0_15px_rgba(255,26,26,0.8)]">
          Arishvanth <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-400">Sriganesh</span>
        </h1>
        <motion.div 
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 1.2, ease: "circOut" }}
          className="h-[2px] w-full bg-gradient-to-r from-transparent via-red-600 to-transparent mt-6 origin-center shadow-[0_0_10px_rgba(255,26,26,0.8)]"
        ></motion.div>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.8 }}
          className="mt-6 text-sm md:text-lg tracking-widest text-gray-400 font-light uppercase"
        >
          System Initializing...
        </motion.p>
      </motion.div>
    </motion.div>
  );
}
