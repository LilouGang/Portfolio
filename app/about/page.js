"use client";

import React from 'react';
import { motion } from 'framer-motion';
import AboutHeader from './components/AboutHeader';
import IntroCard from './components/IntroCard';
import PhotoCard from './components/PhotoCard';
import QuoteCard from './components/QuoteCard';
import WeatherCard from './components/WeatherCard';
import AboutFooter from './components/AboutFooter';
import RiverOfInterests from './components/RiverOfInterests';

export default function AboutPage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const cardVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 50 } }
  };

  return (
    <main className="min-h-screen text-neutral-900 font-sans relative overflow-y-auto overflow-x-hidden selection:bg-blue-500/30">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400&family=Lato:wght@300;400;700&display=swap');
      `}</style>
      
      {/* FOND D'ÉCRAN */}
      <div className="fixed inset-0 pointer-events-none z-0">
         <img src="https://images.unsplash.com/photo-1454496522488-7a8e488e8606?ixlib=rb-4.0.3&auto=format&fit=crop&w=2076&q=80" alt="Mountain Background" className="w-full h-full object-cover" />
         <div className="absolute inset-0 bg-white/20"></div>
         <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]"></div>
      </div>

      <div className="relative z-10 p-6 md:p-12">
        <AboutHeader />
        
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-6 auto-rows-min gap-6"
        >
          {/* LIGNE 1 : Intro (4) + Photo (2) */}
          <IntroCard variants={cardVariants} />
          <PhotoCard variants={cardVariants} />
          
          {/* LIGNE 2 : Citation (2) + Rivière (4) */}
          <QuoteCard variants={cardVariants} />
          <RiverOfInterests variants={cardVariants} />
          
          {/* LIGNE 3 : Météo (6 - Pleine largeur en bas) */}
          <motion.div 
            variants={cardVariants} 
            className="md:col-span-3 rounded-3xl shadow-2xl overflow-hidden border border-white/20 h-64"
          >
            <WeatherCard />
          </motion.div>

        </motion.div>
        
        <AboutFooter />
      </div>
    </main>
  );
}