"use client";

import { motion } from 'framer-motion';

export default function HomeCursor({ mousePosition, cursorVariant }) {
  const variants = {
    default: {
      width: 24, height: 24, border: '2px solid rgba(226, 232, 240, 0.5)',
      x: mousePosition.x - 12, y: mousePosition.y - 12,
    },
    text: {
      width: 80, height: 80, backgroundColor: '#e2e8f0', mixBlendMode: 'difference',
      x: mousePosition.x - 40, y: mousePosition.y - 40,
    },
    image: {
      width: 80, height: 80, border: '2px solid white', backgroundColor: 'rgba(255, 255, 255, 0.1)',
      x: mousePosition.x - 50, y: mousePosition.y - 50,
    }
  };
  
  return (
    <motion.div
      className="fixed top-0 left-0 z-50 rounded-full pointer-events-none"
      variants={variants}
      animate={cursorVariant}
      transition={{ type: 'spring', stiffness: 300, damping: 20, mass: 0.1 }}
    />
  );
};