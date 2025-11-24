// Fichier : app/page.js
"use client";

import React, { useState, useEffect } from 'react';

// Importation des nouveaux composants
import HomeHeader from '@/components/pages/home/HomeHeader';
import HomeFooter from '@/components/pages/home/HomeFooter';
import HomeCursor from '@/components/pages/home/HomeCursor';
import HomeHero from '@/components/pages/home/HomeHero';
import HomeGallery from '@/components/pages/home/HomeGallery';
import HomeNavigation from '@/components/pages/home/HomeNavigation';
import HomeIntro from '@/components/pages/home/HomeIntro';

export default function HomePage() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorVariant, setCursorVariant] = useState('default');

  useEffect(() => {
    const mouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', mouseMove);
    return () => {
      window.removeEventListener('mousemove', mouseMove);
    };
  }, []);

  const textEnter = () => setCursorVariant('text');
  const textLeave = () => setCursorVariant('default');
  const imageEnter = () => setCursorVariant('image');
  const imageLeave = () => setCursorVariant('default');
  
  return (
    <main className="font-sans antialiased overflow-x-hidden">
      <HomeHeader /> {/* Header ajouté ici */}
      <HomeCursor mousePosition={mousePosition} cursorVariant={cursorVariant} />
      <HomeHero onMouseEnter={textEnter} onMouseLeave={textLeave} />
      <HomeIntro />
      <HomeGallery onImageEnter={imageEnter} onImageLeave={imageLeave} />
      <HomeNavigation onMouseEnter={textEnter} onMouseLeave={textLeave} />
      <HomeFooter /> {/* Footer ajouté ici */}
    </main>
  );
}