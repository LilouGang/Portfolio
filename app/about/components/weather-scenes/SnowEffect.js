"use client";
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function SnowEffect() {
  const [flakes, setFlakes] = useState([]);

  useEffect(() => {
    setFlakes(Array.from({ length: 150 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100 + "%",
      delay: Math.random() * 5,
      duration: 5 + Math.random() * 10,
      size: 2 + Math.random() * 5
    })));
  }, []);

  if (flakes.length === 0) return null;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      
      <div className="absolute inset-0 bg-gradient-to-b from-white/40 to-blue-200/50" />

      {flakes.map((flake) => (
        <motion.div
          key={flake.id}
          initial={{ y: -20, x: 0, opacity: 0 }}
          animate={{ 
            y: '120vh', 
            x: [0, 25, -25, 0], 
            opacity: [0, 1, 0.8, 0]
          }}
          transition={{ 
            duration: flake.duration, 
            repeat: Infinity, 
            ease: "linear", 
            delay: flake.delay 
          }}
          style={{ left: flake.left, width: flake.size, height: flake.size }}
          className="absolute top-0 bg-white rounded-full blur-[1px] shadow-[0_0_4px_rgba(255,255,255,0.8)]"
        />
      ))}
    </div>
  );
};