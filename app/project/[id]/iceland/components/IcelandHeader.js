"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

export default function IcelandHeader() {
  const [isHovered, setIsHovered] = useState(false);
  const layoutSpring = { type: 'spring', stiffness: 300, damping: 20 };
  const textVariants = {
    hidden: { opacity: 0, x: -10, width: 0 },
    visible: { opacity: 1, x: 0, width: 'auto' }
  };

  return (
    <motion.header
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1, duration: 0.5 }}
      className="fixed top-8 left-8 z-50 mix-blend-difference text-white"
    >
      <Link href="/" className="cursor-pointer" aria-label="Retour à l'accueil">
        <motion.div 
          layout
          className="flex items-center gap-0 text-white"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          transition={layoutSpring} 
        >
          <motion.div layout="position">
            <svg 
              width="24" height="24" viewBox="0 0 24 24" 
              fill="none" stroke="currentColor" strokeWidth="2" 
              className="m-2 box-content"
            >
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
          </motion.div>
          
          <AnimatePresence>
            {isHovered && (
              <motion.span
                variants={textVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                transition={layoutSpring}
                className="font-semibold whitespace-nowrap overflow-hidden"
              >
                Retour
              </motion.span>
            )}
          </AnimatePresence>
        </motion.div>
      </Link>
    </motion.header>
  );
}