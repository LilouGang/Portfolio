"use client";
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function CloudsEffect({ isDark = false }) {
  const [clouds, setClouds] = useState([]);

  useEffect(() => {
    const layers = [
      { count: 2, speed: 50, scale: { min: 0.4, max: 0.6 }, opacity: 0.3, zIndex: 0, blur: 'blur-xl' },
      { count: 2, speed: 40, scale: { min: 0.8, max: 1.0 }, opacity: 0.5, zIndex: 10, blur: 'blur-lg' },
      { count: 1, speed: 30, scale: { min: 1.2, max: 1.5 }, opacity: 0.7, zIndex: 20, blur: 'blur-md' },
    ];

    const generatedClouds = [];
    let idCounter = 0;

    layers.forEach((layer) => {
      for (let i = 0; i < layer.count; i++) {
        const duration = layer.speed + Math.random() * 10;
        
        generatedClouds.push({
          id: idCounter++,
          y: Math.random() * 70 + 5,
          scale: layer.scale.min + Math.random() * (layer.scale.max - layer.scale.min),
          opacity: layer.opacity,
          duration: duration,
          delay: -Math.random() * duration, 
          zIndex: layer.zIndex,
          blur: layer.blur,
          width: 150 + Math.random() * 200,
        });
      }
    });

    setClouds(generatedClouds);
  }, []);

  const cloudColor = isDark ? "bg-gray-400" : "bg-white";

  if (clouds.length === 0) return null;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      
      
      {clouds.map((cloud) => (
        <motion.div
          key={cloud.id}
          initial={{ x: "350%" }} 
          animate={{ x: "-150%" }} 
          transition={{ 
            duration: cloud.duration, 
            repeat: Infinity, 
            ease: "linear",
            delay: cloud.delay
          }}
          style={{ 
            top: `${cloud.y}%`,
            zIndex: cloud.zIndex,
            width: cloud.width,
            height: cloud.width * 0.45,
          }}
          className={`absolute rounded-full ${cloudColor} ${cloud.blur}`}
        >
          <div 
            className="w-full h-full rounded-full" 
            style={{ opacity: cloud.opacity }}
          />
          
          <div 
            className={`absolute -top-[40%] left-[20%] w-[60%] h-[80%] rounded-full ${cloudColor}`} 
            style={{ opacity: cloud.opacity }}
          />
        </motion.div>
      ))}
    </div>
  );
};