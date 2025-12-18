"use client";

import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import { icelandData } from '@/lib/icelandData';
import { useEffect } from 'react';
function TrekPoint({ step, index, total, progress }) {
  if (!step.coords) return null;

  const activationProgress = index / (total - 1);

  const pointColor = useTransform(
    progress,
    [activationProgress - 0.001, activationProgress],
    ["rgba(255, 255, 255, 0.5)", "#ff6961"]
  );

  return (
    <g transform={`translate(${step.coords.x}, ${step.coords.y})`}>
      <motion.circle
        r="0.45"
        stroke="none"
        style={{ fill: pointColor }}
      />
    </g>
  );
}

const pathD = icelandData.timeline.map((point, index) => {
  if (!point.coords) return '';
  const command = (index === 0) ? 'M' : 'L';
  return `${command} ${point.coords.x} ${point.coords.y}`;
}).join(' ');

export default function TrekMap() {
  const progress = useMotionValue(0);

  useEffect(() => {
    const animation = animate(progress, [0, 1], {
      duration: 6,
      ease: "linear",
      repeat: Infinity,
      repeatType: "loop"
    });
    return () => animation.stop();
  }, [progress]);

  return (
    <div className="w-full h-full relative rounded-3xl overflow-hidden border border-black/10 shadow-lg">
      <img
        src="/images/iceland/iceland_map.jpg"
        alt="Carte du trek en Islande"
        className="w-full h-full object-cover"
      />
      <svg
        viewBox="0 0 100 100"
        className="absolute top-0 left-0 w-full h-full z-10"
        preserveAspectRatio="none"
      >
        <path d={pathD} fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="0.5" strokeDasharray="1 1" />
        <motion.path
          d={pathD}
          fill="none"
          stroke="#ff6961"
          strokeWidth="0.5"
          style={{ pathLength: progress }}
          strokeLinecap="round"
        />
        
        {icelandData.timeline.map((step, index) => (
          <TrekPoint 
            key={index}
            step={step}
            index={index}
            total={icelandData.timeline.length}
            progress={progress}
          />
        ))}
      </svg>
    </div>
  );
}