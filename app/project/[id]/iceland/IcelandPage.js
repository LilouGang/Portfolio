"use client";

import React, { useRef, useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { icelandData } from '@/lib/icelandData';
import Cursor from './components/Cursor';
import IcelandHeader from './components/IcelandHeader';
import AnimatedStat from './components/AnimatedStat';
import TrekMap from './components/TrekMap';
import PhotoCard from './components/PhotoCard';
import VideoCta from './components/VideoCta';
import IcelandFooter from './components/IcelandFooter';
import Lightbox from './components/Lightbox';

export default function IcelandPage({ project }) {
  const pageRef = useRef(null);
  const { scrollYProgress } = useScroll({ 
    target: pageRef,
    offset: ["start start", "end end"]
  });

  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorVariant, setCursorVariant] = useState('default');

  useEffect(() => {
    const mouseMove = (e) => setMousePosition({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', mouseMove);
    return () => window.removeEventListener('mousemove', mouseMove);
  }, []);

  const openLightbox = useCallback((index) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
    document.body.style.overflow = 'hidden';
  }, []);

  const closeLightbox = useCallback(() => {
    setLightboxOpen(false);
    document.body.style.overflow = '';
  }, []);

  useEffect(() => {
  }, []);

  const heroImageY = useTransform(scrollYProgress, [0, 0.2], ["0%", "-20%"]);
  const heroTitleY = useTransform(scrollYProgress, [0, 0.1], ["0%", "-500%"]);

  return (
    <main ref={pageRef} className="bg-white text-black min-h-screen overflow-x-hidden selection:bg-blue-500 selection:text-white">
      
      {!lightboxOpen && <Cursor mousePosition={mousePosition} cursorVariant={cursorVariant} />}
      <IcelandHeader />

      <section className="relative h-screen w-full">
        <div className="sticky top-0 h-full w-full overflow-hidden">
          <motion.div 
            layoutId={`card-container-${project.id}`}
            className="absolute inset-0 w-full h-full"
            style={{ y: heroImageY }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <img 
              src="/images/iceland/iceland_main.jpg" 
              className="w-full h-full object-cover" 
              alt={project.title}
            />
          </motion.div>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <motion.h1
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 3.0, ease: "easeInOut", delay: 0.5 }} 
                style={{ y: heroTitleY }}
                className="drop-shadow-[0_0_15px_rgba(115,106,98,0.4)] text-[15vw] font-black font-['Boldonse',serif] tracking-tighter leading-[1.4] text-transparent bg-clip-text bg-linear-to-b from-[#736A62] via-[#403E3F]/70 to-transparent"
              >
                ISLANDE
              </motion.h1>
            </div>
        </div>
      </section>

      <section className="relative py-32 px-6 bg-white z-10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-16">
          {icelandData.stats.map((stat, i) => (
            <AnimatedStat key={i} stat={stat} />
          ))}
        </div>
      </section>
      
      <section className="h-auto w-full flex flex-col items-center justify-center bg-white py-20">
        <h2 className="text-3xl md:text-5xl font-['Boldonse',serif] mb-12 text-center px-4">
          Expédition
        </h2>
        <div className="w-[90vw] h-auto aspect-4/3 max-w-4xl">
          <TrekMap />
        </div>
      </section>

      {/* --- Section 4: GALERIE --- */}
      <section className="relative bg-white py-20 z-10">
        {/* Titre de la galerie */}
        <div className="max-w-7xl mx-auto mb-20 text-center px-8">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-3xl md:text-5xl font-['Boldonse',serif]"
          >
            Galerie
          </motion.h2>
        </div>

        {/* Mur d'images asymétrique */}
        <div className="flex flex-row gap-0 items-start w-full">
          
          {/* Colonne 1 */}
          <div className="flex-1 flex flex-col">
            {icelandData.gallery.filter((_, i) => i % 3 === 0).map((photo, i) => (
              <PhotoCard 
                key={`col1-${i}`} 
                photo={photo} 
                onOpenLightbox={() => openLightbox(icelandData.gallery.indexOf(photo))} 
              />
            ))}
          </div>

          {/* Colonne 2 : Décalage haut */}
          <div className="flex-1 flex flex-col pt-24">
            {icelandData.gallery.filter((_, i) => i % 3 === 1).map((photo, i) => (
              <PhotoCard 
                key={`col2-${i}`} 
                photo={photo} 
                onOpenLightbox={() => openLightbox(icelandData.gallery.indexOf(photo))} 
              />
            ))}
          </div>

          {/* Colonne 3 : Décalage haut */}
          <div className="flex-1 flex flex-col pt-12">
            {icelandData.gallery.filter((_, i) => i % 3 === 2).map((photo, i) => (
              <PhotoCard 
                key={`col3-${i}`} 
                photo={photo} 
                onOpenLightbox={() => openLightbox(icelandData.gallery.indexOf(photo))} 
              />
            ))}
          </div>

        </div>
      </section>

      <section className="relative bg-white py-20 px-8">
        <VideoCta videoUrl={icelandData.videoUrl} />
      </section>
      
      <IcelandFooter />

      <AnimatePresence>
        {lightboxOpen && (
          <Lightbox
            images={icelandData.gallery}
            currentIndex={currentImageIndex}
            onClose={closeLightbox}
          />
        )}
      </AnimatePresence>
    </main>
  );
}