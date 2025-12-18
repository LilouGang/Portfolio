"use client";
import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';

export default function QuoteCard({ variants }) {
  return (
    <motion.div 
      variants={variants}
      className="md:col-span-2 bg-gradient-to-br from-yellow-100/30 to-blue-200/40 backdrop-blur-xl border border-white/20 p-6 rounded-3xl relative overflow-hidden flex flex-col justify-center text-center shadow-2xl"
    >
      <Quote className="absolute top-4 left-4 text-indigo-900/20 w-8 h-8" />
      <div className="relative z-10 flex flex-col items-center justify-center h-full">
        <p className="font-serif font-medium text-xl text-indigo-950 leading-relaxed italic">
          « L'œuvre d'art naît du renoncement de l'intelligence à raisonner le concret. »
        </p>
        <p className="[font-family:'Lato',sans-serif] font-medium text-xs uppercase text-rose-800 tracking-widest mt-4">
          - Albert Camus
        </p>
      </div>
    </motion.div>
  );
}