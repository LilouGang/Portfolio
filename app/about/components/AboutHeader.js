"use client";
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';

export default function AboutHeader() {
  return (
    <motion.div 
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      className="mb-12"
    >
      <a href="/" className="inline-flex items-center gap-2 px-4 py-2 bg-white/40 backdrop-blur-md rounded-full border border-white/30 hover:bg-white/60 transition-all text-sm font-medium text-neutral-800 shadow-lg">
        <ArrowLeft size={16} /> Retour
      </a>
    </motion.div>
  );
}