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
  const heroTitleY = useTransform(scrollYProgress, [0, 0.2], ["0%", "-500%"]);
  const heroTitleOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);

  return (
    <main ref={pageRef} className="bg-white text-black min-h-screen overflow-x-hidden selection:bg-blue-500 selection:text-white">
      
      <Cursor mousePosition={mousePosition} cursorVariant={cursorVariant} />
      <IcelandHeader />

      <section className="relative h-screen w-full">
        <div className="sticky top-0 h-full w-full overflow-hidden">
          <motion.div 
            layoutId={`card-container-${project.id}`}
            className="absolute inset-0 w-full h-full"
            style={{ y: heroImageY }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <img src={project.imageUrl} className="w-full h-full object-cover" alt={project.title} />
          </motion.div>
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 3.0, ease: "easeInOut", delay: 0.5 }} 
              style={{ opacity: heroTitleOpacity, y: heroTitleY }}
              className="text-[15vw] font-black [font-family:'Boldonse',serif] tracking-tighter [line-height:1.4] text-transparent bg-clip-text bg-gradient-to-b from-white/80 to-black/5"
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
        <h2 className="text-3xl md:text-5xl [font-family:'Boldonse',serif] mb-12 text-center px-4">
          Expédition
        </h2>
        <div className="w-[90vw] h-auto aspect-[4/3] max-w-4xl">
          <TrekMap />
        </div>
      </section>

      <section className="relative bg-white py-20 px-8 z-10">
        <div className="max-w-7xl mx-auto mb-16 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-5xl [font-family:'Boldonse',serif]"
          >
            Galerie
          </motion.h2>
        </div>
        <div className="max-w-7xl mx-auto columns-1 sm:columns-2 md:columns-3 gap-8 space-y-8">
          {icelandData.gallery.map((photo, i) => ( 
            <PhotoCard key={i} photo={photo} index={i} onOpenLightbox={openLightbox} />
          ))}
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