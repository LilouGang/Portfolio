// Fichier : app/project/[id]/iceland/components/AnimatedStat.js
"use client";
import React, { useRef, useEffect } from 'react';
import { motion, useMotionValue, useTransform, animate, useInView } from 'framer-motion';

export default function AnimatedStat({ stat }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const count = useMotionValue(0);
  const rounded = useTransform(count, latest => Math.round(latest));

  const runAnimation = () => {
    count.set(0);
    animate(count, stat.value, { 
      duration: 3, 
      ease: "easeInOut" 
    });
  };

  useEffect(() => {
    if (isInView) {
      runAnimation();
    }
  }, [isInView]);

  return (
    <motion.div 
      ref={ref}
      className="flex flex-col items-center justify-center text-center cursor-pointer"
      whileHover={{ scale: 1.1 }}
      transition={{ type: 'spring', stiffness: 300 }}
      onClick={runAnimation}
    >
      <div className="flex items-baseline space-x-2">
        <motion.div className="text-8xl md:text-9xl font-bold text-black">
          {rounded}
        </motion.div>
        <span className="text-2xl md:text-3xl font-light text-blue-500 -mb-4">{stat.unit}</span>
      </div>
      <span className="mt-4 text-gray-500 uppercase tracking-widest text-sm border-t border-gray-200 pt-4 w-3/4">
        {stat.label}
      </span>
    </motion.div>
  );
}