// Fichier : app/project/[id]/iceland/components/Lightbox.js
"use client";
import React, { useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';

export default function Lightbox({ images, currentIndex, onClose }) {
  const image = images[currentIndex];

  const handleKeyDown = useCallback((event) => {
    if (event.key === 'Escape') {
      onClose();
    }
  }, [onClose]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  if (!image) return null;

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-md" 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.0, ease: "easeInOut" }} 
      onClick={onClose} 
      style={{ WebkitBackdropFilter: 'blur(12px)' }} 
    >
      <div 
        className="relative z-10 max-w-full max-h-full flex items-center justify-center"
        onClick={(e) => e.stopPropagation()} 
      >
        <motion.img
          src={image.src}
          alt={image.description}
          className="max-w-[90vw] max-h-[90vh] object-contain rounded-lg shadow-2xl"
          initial={{ opacity: 0, scale: 0.8 }} 
          animate={{ opacity: 1, scale: 1 }}   
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{
            delay: 1.0, 
            duration: 1.0, 
            ease: "easeInOut" 
          }}
        />
        <motion.button
          onClick={onClose}
          className="absolute top-4 right-4 text-white text-4xl p-2 transition-colors"
          aria-label="Fermer la visionneuse"
          whileHover={{ scale: 1.1, rotate: 90 }} 
          whileTap={{ scale: 0.9 }}
        >
          &times;
        </motion.button>
      </div>
    </motion.div>
  );
}