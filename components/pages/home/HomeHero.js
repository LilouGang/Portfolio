'use client';

import { motion } from 'framer-motion';
import { userName } from '@/lib/data';

export default function HomeHero({ onMouseEnter, onMouseLeave }) {
  return (
    <section className="relative h-screen w-screen flex items-center justify-center text-center text-white overflow-hidden">
      <motion.img
        src="/images/background.jpg"
        alt="Paysage"
        className="absolute inset-0 w-full h-full object-cover"
        initial={{ scale: 1.0 }}
        animate={{ scale: 1.4 }}
        transition={{ duration: 40, ease: 'easeOut', repeat: Infinity, repeatType: 'mirror' }}
      />
      <div className="absolute inset-0 bg-black/50" />
      <div className="relative z-10" onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
        <motion.h1
          className="text-5xl md:text-7xl lg:text-8xl font-bold [font-family:'Playfair_Display',serif]"
          initial={{ opacity: 0, filter: 'blur(10px)' }}
          animate={{ opacity: 1, filter: 'blur(0px)' }}
          transition={{ duration: 1.5, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          {userName}
        </motion.h1>
        <motion.p
          className="text-lg md:text-2xl mt-4 text-gray-150 max-w-2xl font-light [font-family:'Lato',serif] "
          initial={{ opacity: 0, filter: 'blur(5px)' }}
          animate={{ opacity: 1, filter: 'blur(0px)' }}
          transition={{ duration: 1.5, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          Curieux par nature. La découverte pour passion.
        </motion.p>
      </div>
      <motion.div
        className="absolute bottom-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 1 }}
      >
        <motion.div
          className="w-6 h-10 border-2 border-white rounded-full flex justify-center pt-2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <div className="w-1 h-2 bg-white rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
}