"use client";
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function RainEffect() {
  const [drops, setDrops] = useState([]);

  useEffect(() => {
    // Génération côté client uniquement
    // Réduit à 20 gouttes pour un effet très léger et subtil
    setDrops(Array.from({ length: 30 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100 + "%",
      delay: Math.random() * 2, 
      duration: 0.6 + Math.random() * 0.4
    })));
  }, []);

  if (drops.length === 0) return null;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      
      {/* --- ATMOSPHÈRE --- */}
      {/* Dégradé simplifié (sans 'via') pour supprimer la barre visible au milieu */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-slate-900/40 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-slate-900/20 to-transparent" />

      {/* --- GOUTTES --- */}
      {drops.map((drop) => (
        <motion.div
          key={drop.id}
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: '110vh', opacity: [0, 1, 0.5, 0] }}
          transition={{ 
            duration: drop.duration, 
            repeat: Infinity, 
            ease: "linear", 
            delay: drop.delay 
          }}
          style={{ left: drop.left }}
          // Goutte plus fine (1px) et moins opaque pour plus de réalisme
          className="absolute top-0 w-[2px] h-20 bg-gradient-to-b from-transparent to-blue-300/50"
        />
      ))}
    </div>
  );
}