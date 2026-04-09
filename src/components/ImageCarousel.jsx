import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function ImageCarousel({ images }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-shuffle every 3.5 seconds
  useEffect(() => {
    if (!images || images.length <= 1) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
    }, 3500);
    
    return () => clearInterval(interval);
  }, [images]);

  const handlePrev = (e) => {
    e.stopPropagation();
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  const handleNext = (e) => {
    e.stopPropagation();
    setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  };

  // If there's no images, render fallback
  if (!images || images.length === 0) {
    return <div className="w-full h-full bg-zinc-900 flex items-center justify-center">No Image Available</div>;
  }

  // If only 1 image, just render the image natively
  if (images.length === 1) {
    return <img src={images[0]} alt="Project Slide" className="w-full h-full object-cover" />;
  }

  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden group">
      <AnimatePresence mode="popLayout">
        <motion.img
          key={currentIndex}
          src={images[currentIndex]}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="absolute w-full h-full object-cover"
          alt={`Slide ${currentIndex + 1}`}
        />
      </AnimatePresence>

      {/* Navigation Arrows (visible on hover) */}
      <button 
        onClick={handlePrev}
        className="absolute left-2 p-2 bg-black/50 text-white hover:bg-red-600 hover:text-white rounded-full opacity-0 group-hover:opacity-100 transition-all z-20"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button 
        onClick={handleNext}
        className="absolute right-2 p-2 bg-black/50 text-white hover:bg-red-600 hover:text-white rounded-full opacity-0 group-hover:opacity-100 transition-all z-20"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Indicators */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {images.map((_, idx) => (
          <div 
            key={idx} 
            className={`w-2 h-2 rounded-full transition-all ${idx === currentIndex ? 'bg-red-600 w-4 shadow-[0_0_5px_#ff1a1a]' : 'bg-white/50'}`}
          />
        ))}
      </div>
    </div>
  );
}
