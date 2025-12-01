// Fichier : app/about/components/weather-scenes/SunEffect.js (Version "Haute Visibilité")
"use client";
import { motion } from 'framer-motion';

export default function SunEffect() {
  
  return (
      <div className="relative w-full h-full overflow-hidden rounded-xl">

      {/* 1. LUEUR D'AMBIANCE (Plus intense) */}
      <motion.div 
        className="absolute -top-12 -left-12 w-64 h-64 bg-white rounded-full pointer-events-none"
        initial={{ opacity: 0.4, scale: 1 }}
        animate={{ opacity: [0.4, 0.5, 0.4], scale: [1, 1.05, 1] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        style={{ filter: 'blur(70px)' }}
      />

      {/* 2. LE CONTENEUR GÉANT */}
      <div className="absolute -top-[80%] -left-[80%] w-[250%] h-[250%] rotate-[-45deg] pointer-events-none z-10 flex justify-center">
        
        {/* --- Les rayons avec opacité et flou ajustés --- */}

        {/* Rayon 1 (Gauche) */}
        <motion.div 
          className="absolute h-full w-10 bg-gradient-to-b from-white/70 to-transparent"
          style={{ 
            left: '37%', 
            transform: 'rotate(18deg)',
            filter: 'blur(15px)'
          }}
          variants={{ animate: { opacity: [0.7, 1, 0.7] } }}
          animate="animate"
          transition={{ duration: 6, delay: 0.5, repeat: Infinity, ease: "easeInOut" }}
        />
        
        {/* Rayon 2 (Centre) */}
        <motion.div 
          className="absolute h-full w-20 bg-gradient-to-b from-white/80 to-transparent"
          style={{ 
            left: '47%', 
            transform: 'rotate(-5deg)',
            filter: 'blur(25px)'
          }}
          variants={{ animate: { opacity: [0.8, 1, 0.8] } }}
          animate="animate"
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Rayon 3 (Centre, fin) */}
        <motion.div 
          className="absolute h-full w-6 bg-gradient-to-b from-white/90 to-transparent mix-blend-overlay"
          style={{ 
            left: '44%', 
            transform: 'rotate(5deg)',
            filter: 'blur(13px)' // Nettement moins flou
          }}
          variants={{ animate: { opacity: [0.9, 1, 0.9] } }}
          animate="animate"
          transition={{ duration: 4, delay: 1, repeat: Infinity, ease: "easeInOut" }}
        />
        
        {/* Rayon 4 (Droite) */}
        <motion.div 
          className="absolute h-full w-20 bg-gradient-to-b from-white/70 to-transparent mix-blend-overlay"
          style={{ 
            left: '53%', 
            transform: 'rotate(-20deg)',
            filter: 'blur(15px)'
          }}
          variants={{ animate: { opacity: [0.7, 1, 0.7] } }}
          animate="animate"
          transition={{ duration: 5.5, delay: 0.2, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>
    </div>
  );
};