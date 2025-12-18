"use client";
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import RainEffect from './RainEffect';

export default function ThunderEffect() {
  const [activeBolt, setActiveBolt] = useState(null);

  const BOLT_PATHS = useMemo(() => [
    "M50,-10 L48,15 L52,25 L49,40 L55,55 L45,90 L60,105 L50,140 L55,160 L45,210",
    "M50,-10 L55,30 L45,60 L50,100 L40,150 L60,200 M50,100 L70,120", 
    "M60,-10 L50,40 L65,70 L55,120 L40,160 L45,190",
    "M45,-10 L50,50 L40,100 L55,160 L45,210 M55,20 L60,40" 
  ], []);

  const triggerLightning = useCallback(() => {
    const positions = ['left', 'center', 'right'];
    const randomPos = positions[Math.floor(Math.random() * positions.length)];
    const randomPath = Math.floor(Math.random() * BOLT_PATHS.length);

    setActiveBolt({ pos: randomPos, pathIndex: randomPath });

    setTimeout(() => {
      setActiveBolt(null);
    }, 200); 
  }, [BOLT_PATHS]);

  useEffect(() => {
    let timeout;
    const loop = () => {
      const randomDelay = Math.random() * 2000 + 2000;
      timeout = setTimeout(() => {
        triggerLightning();
        loop();
      }, randomDelay);
    };
    loop();
    return () => clearTimeout(timeout);
  }, [triggerLightning]);

  return (
    <>
      <RainEffect />
      
      <div className="absolute inset-0 bg-slate-900/15 pointer-events-none" />

      <AnimatePresence>
        {activeBolt && (
          <div className={`absolute top-0 w-full h-full pointer-events-none z-20 overflow-hidden
            ${activeBolt.pos === 'left' ? '-left-16' : activeBolt.pos === 'right' ? '-right-16' : 'left-0'}`}>
            
            <motion.svg
              viewBox="0 0 100 200"
              preserveAspectRatio="none"
              className="absolute top-[-10%] w-full h-[120%]"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0, 0.8, 0] }}
              transition={{ duration: 0.25 }}
            >
              <path
                d={BOLT_PATHS[activeBolt.pathIndex]}
                fill="none"
                stroke="#818cf8" 
                strokeWidth="15" 
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ filter: 'blur(12px)', opacity: 0.4 }} 
              />
              
              <path
                d={BOLT_PATHS[activeBolt.pathIndex]}
                fill="none"
                stroke="#a5b4fc"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ filter: 'blur(2px)', opacity: 0.8 }}
              />

              <path
                d={BOLT_PATHS[activeBolt.pathIndex]}
                fill="none"
                stroke="white"
                strokeWidth="0.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </motion.svg>
          </div>
        )}
      </AnimatePresence>

      <motion.div 
        className="absolute inset-0 bg-indigo-50 z-30 pointer-events-none mix-blend-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: activeBolt ? [0, 0.3, 0.1, 0] : 0 }} 
        transition={{ duration: 0.2 }}
      />
    </>
  );
};