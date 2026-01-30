"use client";
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function Lightbox({ images, currentIndex, onClose }) {
  const image = images[currentIndex];
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = 'auto'; };
  }, []);

  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: ((e.clientX - left) / width) * 100,
      y: ((e.clientY - top) / height) * 100,
    });
  };

  if (!image) return null;

  return (
    <motion.div
      // Fond plus clair (30%) et flou très subtil (2px)
      className="fixed inset-0 z-9999 flex items-center justify-center p-4 md:p-12 bg-black/30 backdrop-blur-[2px]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <div className="relative flex flex-col items-center" onClick={(e) => e.stopPropagation()}>
        
        <button 
          onClick={onClose}
          className="absolute -top-3 -right-12 text-white/80 hover:text-white transition-all p-2 hover:rotate-90 duration-300"
        >
          <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
            <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        <div 
          className="relative overflow-hidden rounded-sm shadow-xl bg-[#0D0D0D] max-w-[90vw] max-h-[85vh] cursor-none"
          onMouseMove={handleMouseMove}
        >
          <motion.img
            src={image.src}
            alt="Exploration"
            className="block w-auto h-auto max-w-full max-h-[85vh] object-contain pointer-events-none"
            style={{
              transformOrigin: `${mousePos.x}% ${mousePos.y}%`,
            }}
            initial={{ scale: 1, opacity: 0 }}
            animate={{ scale: 3, opacity: 1 }}
            transition={{ 
              delay: 0.1,
              duration: 1.2, 
              ease: [0.16, 1, 0.3, 1] 
            }}
          />
        </div>
      </div>
    </motion.div>
  );
}