"use client";

import Link from 'next/link'; // 1. Importer Link
import { motion } from 'framer-motion';

const MotionLink = motion(Link);

export default function HomeNavigation({ onMouseEnter, onMouseLeave }) {
  return (
    <section className="relative z-10 w-screen bg-black flex flex-col items-center space-y-10 pt-55 pb-45">
      <MotionLink
        href="/about"
        className="text-6xl md:text-8xl font-extrabold text-gray-700 cursor-pointer"
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        whileHover={{ 
          letterSpacing: '0.05em',
          color: '#ffffff'
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 10 }}
      >
        À PROPOS
      </MotionLink>
      <MotionLink
        href="/contact"
        className="text-6xl md:text-8xl font-extrabold text-gray-700 cursor-pointer"
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        whileHover={{ 
          letterSpacing: '0.05em',
          color: '#ffffff'
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 10 }}
      >
        CONTACT
      </MotionLink>
    </section>
  );
}