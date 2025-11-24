"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import { galleryItems } from '@/lib/data';
import Link from 'next/link';

// --- CONSTANTE DE SYNCHRONISATION ---
// C'est le secret : on utilise la même durée et la même courbe partout.
const colorTransition = { duration: 0.8, ease: "easeInOut" };

// --- Fonction utilitaire (Inchangée) ---
function getContrastingTextColor(hexColor) {
  if (!hexColor) return '#111827'; 
  const r = parseInt(hexColor.substr(1, 2), 16);
  const g = parseInt(hexColor.substr(3, 2), 16);
  const b = parseInt(hexColor.substr(5, 2), 16);
  const yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;
  return (yiq >= 128) ? '#111827' : '#ffffff';
}

// --- Composant "GalleryItem" (Inchangé) ---
function GalleryItem({ item, onImageEnter, onImageLeave, setBgColor, defaultColor }) {
  // ... (Gardez tout le code du GalleryItem tel quel) ...
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x, { stiffness: 100, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 100, damping: 30 });
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7deg", "-7deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7deg", "7deg"]);
  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = (mouseX / width) - 0.5;
    const yPct = (mouseY / height) - 0.5;
    x.set(xPct);
    y.set(yPct);
  };
  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    onImageLeave();
    setBgColor(defaultColor);
  };
  const handleMouseEnter = () => {
    onImageEnter();
    setBgColor(item.color);
  };
  return (
    <Link href={`/project/${item.id}`} className="block w-full h-full" >
      <div className="relative w-full h-full" style={{ perspective: '1000px' }} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave} onMouseEnter={handleMouseEnter}>
        <motion.div className="relative w-full rounded-xl shadow-xl bg-gray-900" style={{ rotateX, rotateY, transformStyle: 'preserve-3d', backfaceVisibility: 'hidden' }}>
          <motion.div transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }} className="w-full h-auto overflow-hidden rounded-xl relative z-0 bg-gray-900" style={{ transform: "translateZ(0px)", backfaceVisibility: 'hidden' }}>
            <motion.img src={item.imageUrl} alt={item.title} className="w-full h-full min-h-[150px] object-cover block pointer-events-none will-change-transform" />
            <motion.div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-500" />
          </motion.div>
          <motion.div className="absolute inset-0 flex flex-col justify-end p-6 z-20" style={{ transform: "translateZ(40px)", pointerEvents: "none" }}>
            <motion.h3 className="text-white text-xl md:text-2xl font-bold tracking-tight drop-shadow-lg">{item.title}</motion.h3>
            <p className="text-gray-200 text-sm mt-2 opacity-0 group-hover:opacity-100 transition-all duration-500 ease-in-out font-medium translate-y-4 group-hover:translate-y-0">Découvrir &rarr;</p>
          </motion.div>
        </motion.div>
      </div>
    </Link>
  );
}

// --- Utils & Variants (Inchangés) ---
function shuffle(array) {
  let currentIndex = array.length,  randomIndex;
  const newArray = [...array]; 
  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [newArray[currentIndex], newArray[randomIndex]] = [newArray[randomIndex], newArray[currentIndex]];
  }
  return newArray;
}
const containerVariants = {
  animate: { transition: { staggerChildren: 0.15 } },
  exit: { transition: { staggerChildren: 0.1, staggerDirection: -1 } }
};
const itemVariants = {
  initial: { opacity: 0, y: 50 },
  animate: { opacity: 1, y: 0, transition: { duration: 1.2, ease: [0.25, 1, 0.5, 1] } },
  exit: { opacity: 0, transition: { duration: 0.5, ease: "easeIn" } }
};

// --- Composant Principal ---
export default function HomeGallery({ onImageEnter, onImageLeave }) {
  const defaultColor = '#f9fafb'; 
  const [bgColor, setBgColor] = useState(defaultColor);
  const textColor = getContrastingTextColor(bgColor);

  const [activeFilter, setActiveFilter] = useState('tout');
  const [generation, setGeneration] = useState(0); 
  const [displayedItems, setDisplayedItems] = useState(galleryItems);
  const [height, setHeight] = useState(undefined);
  const gridRef = useRef(null);

  useEffect(() => {
    const gridEl = gridRef.current;
    if (!gridEl) return;
    const resizeObserver = new ResizeObserver((entries) => {
      if (entries[0]) {
        const newHeight = entries[0].contentRect.height + 150;
        setHeight(newHeight); 
      }
    });
    resizeObserver.observe(gridEl);
    return () => resizeObserver.disconnect();
  }, []);
  
  const handleFilterClick = (filterValue) => {
    const filtered = filterValue === 'tout'
      ? galleryItems
      : galleryItems.filter(item => item.category === filterValue);
    setDisplayedItems(shuffle(filtered));
    setActiveFilter(filterValue);
    setGeneration(g => g + 1); 
  };

  return (
    <motion.section 
      className="relative z-10 pt-16 md:pt-20 pb-20 md:pb-32 px-4 md:px-8 text-gray-900"
      // 1. APPLICATION AU FOND
      animate={{ backgroundColor: bgColor }}
      transition={colorTransition} 
    >
      <div className="max-w-7xl mx-auto">
        
        {/* --- TITRE --- */}
        <motion.h2
          className="text-center text-4xl md:text-5xl font-bold mb-12 md:mb-16 [font-family:'Boldonse',serif]"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          
          // 2. APPLICATION AU TITRE (Couleur)
          animate={{ 
            color: textColor,
            // On s'assure que l'animation d'apparition reste active si elle joue encore
            opacity: 1, 
            y: 0 
          }}
          transition={colorTransition}
        >
          Créations
        </motion.h2>
        
        {/* --- BOUTONS --- */}
        <div className="flex justify-center mb-12 md:mb-16">
          <div className="flex bg-white/30 backdrop-blur-md rounded-full p-0 shadow-sm">
            {[{ label: 'Tout', value: 'tout' }, 
             { label: 'Projets', value: 'projet' }, 
             { label: 'Passions', value: 'passion' }]
             .map((filter) => {
               const isActive = activeFilter === filter.value;
               const activePillText = (textColor === '#ffffff') ? '#111827' : '#ffffff';

               return (
                <button
                  key={filter.value}
                  onClick={() => handleFilterClick(filter.value)}
                  className="relative px-8 py-3 text-sm md:text-base font-medium rounded-full"
                  style={{ WebkitTapHighlightColor: "transparent" }}
                >
                  {isActive && (
                    <motion.span
                      layoutId="activeFilter"
                      className="absolute inset-0 rounded-full z-0" 
                      // 3. APPLICATION A LA PILULE (Fond)
                      animate={{ backgroundColor: textColor }}
                      transition={{
                        // On mélange la transition de couleur ET le ressort du mouvement
                        backgroundColor: colorTransition,
                        layout: { type: "spring", stiffness: 300, damping: 30 }
                      }}
                    />
                  )}
                  
                  <motion.span 
                    className="relative z-10"
                    // 4. APPLICATION AU TEXTE DU BOUTON (Couleur)
                    animate={{ 
                      color: isActive ? activePillText : textColor 
                    }}
                    transition={colorTransition}
                  >
                    {filter.label}
                  </motion.span>
                </button>
              );
            })}
          </div>
        </div>
        
        {/* ... (Reste du code de la grille inchangé) ... */}
        <motion.div
          animate={{ height }}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
          className="overflow-hidden p-6 -mx-6"
        >
          <div ref={gridRef} className="columns-1 md:columns-2 lg:columns-3 gap-8 will-change-transform">
            <AnimatePresence mode="wait">
              <motion.div
                key={`${activeFilter}-${generation}`} 
                className="contents"
                variants={containerVariants}
                initial="initial"
                animate="animate"
                exit="exit"
              >
                {displayedItems.map((item) => (
                  <motion.div key={item.id} className="group break-inside-avoid mb-8 w-full" variants={itemVariants}>
                    <GalleryItem item={item} onImageEnter={onImageEnter} onImageLeave={onImageLeave} setBgColor={setBgColor} defaultColor={defaultColor} />
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}