"use client";
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const interests = [
  "Astrophysique", "Randonnée", "Cinéma", "Physique", "Mathématiques",
  "Musique", "Programmation", "Photographie", "Voyages", 
  "Intelligence Artificielle", "Écologie", "Nature", "Psychologie", 
  "Cosmologie", "Peinture", "Sport", "Trekking", "Jeux de Société", 
];

// Fonction pour mélanger (Fisher-Yates)
const shuffle = (array) => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

// Composant pour une ligne de défilement
const MarqueeLine = ({ items, direction = "left", speed = 20 }) => {
  return (
    <div className="flex overflow-hidden relative w-full group/line py-2">
      <motion.div
        // CORRECTION 1 : On enlève le gap-8 ici pour éviter le saut
        className="flex whitespace-nowrap"
        animate={{
          x: direction === "left" ? ["0%", "-50%"] : ["-50%", "0%"],
        }}
        transition={{
          duration: speed,
          ease: "linear",
          repeat: Infinity,
        }}
        style={{ animationPlayState: "running" }}
      >
        {/* On double la liste pour créer une boucle infinie */}
        {[...items, ...items].map((item, idx) => (
          <span
            key={`${item}-${idx}`}
            className="text-2xl font-bold text-gray-400 pr-8 transition-all duration-300 cursor-default
                       hover:text-gray-600 hover:scale-110 hover:z-10"
          >
            {item}
          </span>
        ))}
      </motion.div>
    </div>
  );
};

export default function RiverOfInterests({ variants }) {
  const [rows, setRows] = useState([[], [], []]);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    setRows([
      shuffle(interests),
      shuffle(interests),
      shuffle(interests)
    ]);
  }, []);

  return (
    <motion.div 
      variants={variants}
      // CORRECTION 2 : Fond bg-white/40 (comme les autres cartes) au lieu de bg-white/80
      className="md:col-span-4 bg-white/60 backdrop-blur-xl border border-white/20 p-6 rounded-3xl shadow-sm relative overflow-hidden h-64 flex flex-col justify-center gap-4 group"
    >
      
      {isClient && (
        <>
          <div className="group-hover:opacity-100 transition-opacity duration-500">
             <MarqueeLine items={rows[0]} speed={60} direction="left" />
          </div>

          <div className="group-hover:opacity-100 transition-opacity duration-500 delay-75">
             <MarqueeLine items={rows[1]} speed={100} direction="left" />
          </div>

          <div className="group-hover:opacity-100 transition-opacity duration-500 delay-150">
             <MarqueeLine items={rows[2]} speed={85} direction="left" />
          </div>
        </>
      )}

      {/* Titre discret */}
      <div className="absolute bottom-3 right-5 pointer-events-none">
        <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-600">Rivière d'intérêts</span>
      </div>
    </motion.div>
  );
}