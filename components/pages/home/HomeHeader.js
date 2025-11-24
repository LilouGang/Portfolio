// Fichier : components/pages/home/HomeHeader.js
"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function HomeHeader() {
  const [isNameHovered, setIsNameHovered] = useState(false);

  const textSpring = { 
    type: 'spring', 
    stiffness: 150,
    damping: 25 
  };

  const layoutSpring = {
    type: 'spring',
    stiffness: 80,
    damping: 20
  };

  const nameVariants = {
    hidden: { 
      opacity: 0, 
      x: -10, 
      width: 0,
      filter: 'blur(5px)',
      transition: { 
        opacity: { duration: 0.2 } 
      }
    },
    visible: { 
      opacity: 1, 
      x: 0, 
      width: "auto", 
      filter: 'blur(0px)' 
    }
  };

  // --- MODIFICATION ICI ---
  const navLinks = [
    { name: "À Propos", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <header
      className="absolute top-0 left-0 w-full p-6 md:p-8 z-40 text-white"
    >
      <div className="flex justify-between items-center">
        <motion.div
          layout 
          className="flex items-baseline cursor-pointer text-lg md:text-xl font-bold"
          onMouseEnter={() => setIsNameHovered(true)}
          onMouseLeave={() => setIsNameHovered(false)}
        >
          
          <motion.span layout="position" transition={layoutSpring}>K</motion.span>
          
          <AnimatePresence> 
            {isNameHovered && (
              <motion.span
                variants={nameVariants} 
                initial="hidden" 
                animate="visible" 
                exit="hidden"
                transition={layoutSpring}
                className="font-normal overflow-hidden whitespace-nowrap inline-block align-bottom"
              >
                illian
              </motion.span>
            )}
          </AnimatePresence>
          
          <motion.span layout="position" transition={layoutSpring}>&nbsp;</motion.span>
          
          <motion.span layout="position" transition={layoutSpring}>L</motion.span>
          
          <AnimatePresence>
            {isNameHovered && (
              <motion.span
                variants={nameVariants} 
                initial="hidden" 
                animate="visible" 
                exit="hidden"
                transition={layoutSpring}
                className="font-normal overflow-hidden whitespace-nowrap inline-block align-bottom"
              >
                acaque
              </motion.span>
            )}
          </AnimatePresence>
        </motion.div>

        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <a key={link.name} href={link.href} className="relative text-md font-medium px-3 py-2 group">
              <div
                className="absolute inset-0 bg-white/30 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ filter: 'blur(30px)' }} 
              />
              <span className="relative z-10">{link.name}</span>
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}