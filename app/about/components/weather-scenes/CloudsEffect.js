"use client";
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function CloudsEffect({ isDark = false }) {
  const [clouds, setClouds] = useState([]);

  useEffect(() => {
    // Configuration des couches (Vitesse augmentée : durées réduites)
    const layers = [
      { count: 2, speed: 50, scale: { min: 0.4, max: 0.6 }, opacity: 0.3, zIndex: 0, blur: 'blur-xl' }, // Fond (Lent)
      { count: 2, speed: 40, scale: { min: 0.8, max: 1.0 }, opacity: 0.5, zIndex: 10, blur: 'blur-lg' }, // Milieu
      { count: 1, speed: 30, scale: { min: 1.2, max: 1.5 }, opacity: 0.7, zIndex: 20, blur: 'blur-md' }, // Devant (Rapide)
    ];

    const generatedClouds = [];
    let idCounter = 0;

    layers.forEach((layer) => {
      for (let i = 0; i < layer.count; i++) {
        // Calcul de la durée spécifique pour ce nuage
        const duration = layer.speed + Math.random() * 10;
        
        generatedClouds.push({
          id: idCounter++,
          y: Math.random() * 70 + 5, // Position verticale un peu plus étalée
          scale: layer.scale.min + Math.random() * (layer.scale.max - layer.scale.min),
          opacity: layer.opacity,
          duration: duration,
          // ASTUCE : Délai NÉGATIF aléatoire basé sur la durée.
          // Cela force l'animation à démarrer "au milieu" de son cycle.
          // Résultat : les nuages sont déjà dispersés sur l'écran au chargement.
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
          // DÉPART : Hors champ à droite
          initial={{ x: "300%" }} 
          // ARRIVÉE : Hors champ à gauche
          animate={{ x: "-150%" }} 
          transition={{ 
            duration: cloud.duration, 
            repeat: Infinity, 
            ease: "linear",
            delay: cloud.delay // Le délai négatif place le nuage immédiatement quelque part sur le trajet
          }}
          style={{ 
            top: `${cloud.y}%`,
            zIndex: cloud.zIndex,
            width: cloud.width,
            height: cloud.width * 0.45, // Forme légèrement plus arrondie
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