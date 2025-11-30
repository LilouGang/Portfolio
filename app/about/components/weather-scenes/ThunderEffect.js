// Fichier : app/about/components/weather-scenes/ThunderEffect.js
"use client";
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import RainEffect from './RainEffect'; // Importe la scène de pluie

export default function ThunderEffect() {
  const [flash, setFlash] = useState(false);

  useEffect(() => {
    const loop = setInterval(() => {
      if (Math.random() > 0.7) {
        setFlash(true);
        setTimeout(() => setFlash(false), 150 + Math.random() * 200);
      }
    }, 2000);
    return () => clearInterval(loop);
  }, []);

  return (
    <>
      <RainEffect />
      <motion.div 
        className="absolute inset-0 bg-white z-10 pointer-events-none mix-blend-overlay"
        animate={{ opacity: flash ? 0.3 : 0 }}
        transition={{ duration: 0.1 }}
      />
    </>
  );
};